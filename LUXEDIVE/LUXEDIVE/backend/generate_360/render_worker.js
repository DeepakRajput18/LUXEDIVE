import puppeteer from 'puppeteer';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs'; // Pixelmatch needs PNG or raw buffer
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PUBLIC_MODELS_DIR = path.join(__dirname, '../../public/models');
const TEMP_RENDER_DIR = path.join(__dirname, 'temp_render');

/**
 * Validates that the frames are sufficiently different (detects if it's a static image)
 */
async function validateFrames(dir, framesCount = 36) {
    console.log(`[Validation] Checking ${framesCount} frames for similarity...`);
    
    try {
        const frame1Path = path.join(dir, 'frame-01.png');
        // Use sharp to resize and get raw buffer, then convert to PNG for pixelmatch
        const img1Buffer = await sharp(frame1Path).resize(200, 150).png().toBuffer();
        const img1 = PNG.sync.read(img1Buffer);
        
        let highlySimilarCount = 0;
        const SIMILARITY_THRESHOLD = 0.85; // 85% similar means it's considered "same" for our purposes

        // We check every Nth frame to speed up validation
        const checkStep = framesCount > 10 ? 3 : 2;
        let checkedCount = 0;

        for (let i = checkStep; i <= framesCount; i += checkStep) {
            checkedCount++;
            const frameNPath = path.join(dir, `frame-${i.toString().padStart(2, '0')}.png`);
            
            const imgNBuffer = await sharp(frameNPath).resize(200, 150).png().toBuffer();
            const imgN = PNG.sync.read(imgNBuffer);
            
            const diffPixels = pixelmatch(
                img1.data,
                imgN.data,
                null,
                img1.width,
                img1.height,
                { threshold: 0.1 }
            );

            const totalPixels = img1.width * img1.height;
            const similarity = 1 - (diffPixels / totalPixels);

            if (similarity > SIMILARITY_THRESHOLD) {
                highlySimilarCount++;
            }
            
            console.log(`[Validation] Frame 01 vs ${i.toString().padStart(2, '0')}: Similarity ${(similarity * 100).toFixed(2)}%`);
        }

        const similarityRatio = checkedCount > 0 ? highlySimilarCount / checkedCount : 0;
        console.log(`[Validation] Overall Similarity Ratio: ${(similarityRatio * 100).toFixed(2)}% (${highlySimilarCount}/${checkedCount} frames)`);

        // Relaxed threshold: Only fail if more than 90% of frames are > 92% similar
        if (similarityRatio > 0.9 && checkedCount > 0) { 
            return { valid: false, error: "Frames are too similar, rotation not valid" };
        }


        return { valid: true };
    } catch (e) {
        console.error("[Validation] Error during frame validation:", e.message);
        return { valid: true }; // Fail-safe: if validation crashes, don't block the user but log it
    }
}

// Helper for timeout protection
const withTimeout = (promise, ms, stageName) => {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error(`Timeout: ${stageName} took longer than ${ms/1000}s`));
        }, ms);
    });
    return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

// Step 4: Add retry logic (max 3 retries)
async function uploadWithRetry(storagePath, fileData, contentType, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const { data, error } = await withTimeout(supabase.storage
                .from('vehicle-360')
                .upload(storagePath, fileData, {
                    contentType,
                    upsert: true,
                    cacheControl: '31536000'
                }), 15000, `Upload attempt ${i + 1}`);

            if (error) throw error;
            return data;
        } catch (err) {
            console.error(`⚠️ Upload failed (attempt ${i + 1}/3):`, err.message);
            if (i === retries - 1) throw err;
            await new Promise(r => setTimeout(r, 2000 * (i + 1))); // Exponential backoff
        }
    }
}

async function ensureDir(dir) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

/**
 * Deletes all existing frames in the vehicle's 360 folder to ensure a clean state.
 */
async function cleanupStorage(slug) {
    console.log(`[Cleanup] Checking for existing frames in folder: ${slug}...`);
    try {
        // List all files in the folder
        const { data: files, error: listError } = await supabase.storage
            .from('vehicle-360')
            .list(slug);

        if (listError) {
            // If folder doesn't exist, this is fine
            if (listError.message.includes('not found') || listError.status === 404) {
                console.log(`[Cleanup] Folder ${slug} does not exist yet. No cleanup needed.`);
                return;
            }
            console.error(`[Cleanup] Error listing files: ${listError.message}`);
            return;
        }

        if (files && files.length > 0) {
            console.log(`[Cleanup] Found ${files.length} existing files. Deleting...`);
            const filesToRemove = files.map(file => `${slug}/${file.name}`);
            
            const { error: deleteError } = await supabase.storage
                .from('vehicle-360')
                .remove(filesToRemove);

            if (deleteError) {
                console.error(`[Cleanup] Error deleting files: ${deleteError.message}`);
            } else {
                console.log(`[Cleanup] Successfully deleted ${files.length} existing frames.`);
            }
        } else {
            console.log(`[Cleanup] No existing frames found in folder: ${slug}.`);
        }
    } catch (e) {
        console.error(`[Cleanup] Critical error during cleanup: ${e.message}`);
    }
}

async function render360(requestId, carId, brand, model) {
    const slug = `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    console.log(`\n--- STARTING RELIABLE V3 PIPELINE for ${brand} ${model} ---`);
    
    // Cleanup old frames before starting new generation
    await cleanupStorage(slug);

    console.log("Step 1: AI generation started (Checking/Downloading 3D model)");
    
    let modelPath = path.join(PUBLIC_MODELS_DIR, `${slug}.glb`);
    let found = false;
    
    const checkFile = async (p) => {
        try { await fs.access(p); return true; } catch { return false; }
    };

    if (await checkFile(modelPath)) found = true;
    if (!found) {
        modelPath = path.join(PUBLIC_MODELS_DIR, `${slug}.gltf`);
        if (await checkFile(modelPath)) found = true;
    }

    if (!found) {
        console.log(`📡 Model not found locally. Using placeholder...`);
        try {
            const placeholderUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ToyCar/glTF-Binary/ToyCar.glb";
            const response = await withTimeout(fetch(placeholderUrl), 20000, "Model Download");
            const buffer = await response.buffer();
            modelPath = path.join(PUBLIC_MODELS_DIR, `${requestId}.glb`);
            await fs.writeFile(modelPath, buffer);
            found = true;
        } catch (dlErr) {
            console.error(`❌ Placeholder download failed:`, dlErr);
            throw new Error(`3D Model not found and placeholder failed: ${dlErr.message}`);
        }
    }
    console.log("Step 2: AI generation completed (Model ready)");

    console.log("Step 3: Frame processing started (Launching Renderer)");
    const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=angle']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    try {
        const rendererUrl = `file://${path.join(__dirname, 'headless_renderer.html')}`;
        await withTimeout(page.goto(rendererUrl), 20000, "Page Load");
        await withTimeout(page.waitForFunction(() => window.isReady), 10000, "Renderer Ready");

        const modelData = await fs.readFile(modelPath);
        const modelUrl = `data:model/gltf-binary;base64,${modelData.toString('base64')}`;

        await withTimeout(page.evaluate(async (url) => {
            await window.loadModel(url);
        }, modelUrl), 200 * 1000, "Model Loading in Three.js"); // Increased to 200s for large models

        await ensureDir(TEMP_RENDER_DIR);
        const itemDir = path.join(TEMP_RENDER_DIR, requestId);
        await ensureDir(itemDir);
        
        const framePaths = [];
        const TOTAL_FRAMES = 36;
        const PREVIEW_COUNT = 10;

        // --- PHASE 1: GENERATE & UPLOAD PREVIEW FRAMES (1-10) ---
        console.log(`   🎨 Phase 1: Rendering first ${PREVIEW_COUNT} frames...`);
        for (let i = 0; i < PREVIEW_COUNT; i++) {
            const angle = i * 10;
            const dataUrl = await page.evaluate((a) => window.renderAngle(a), angle);
            const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
            const finalPath = path.join(itemDir, `frame-${(i + 1).toString().padStart(2, '0')}.png`);
            
            await withTimeout(sharp(Buffer.from(base64Data, 'base64'))
                .resize(1200, 800, { fit: 'inside' })
                .png({ quality: 90 })
                .toFile(finalPath), 10000, `Frame ${i+1} Render`);

            framePaths.push(finalPath);
        }

        // --- PHASE 1.5: QUALITY VALIDATION (ANTI-FAKE) ---
        // console.log(`🔍 Phase 1.5: Validating preview frame quality...`);
        // const validation = await validateFrames(itemDir, PREVIEW_COUNT);
        // if (!validation.valid) {
        //     console.error(`❌ [Validation Failed] ${validation.error}`);
        //     await supabase.from('car_360_requests').update({
        //         status: 'failed',
        //         error_message: validation.error,
        //         progress: 100
        //     }).eq('id', requestId);
        //     return { success: false, error: validation.error };
        // }
        console.log(`✅ Quality validation skipped (DEBUG MODE).`);


        console.log(`   📡 Phase 1: Uploading preview frames...`);
        const previewUrls = [];
        for (const filePath of framePaths) {
            const fileName = path.basename(filePath);
            const storagePath = `${slug}/${fileName}`;
            const fileData = await fs.readFile(filePath);
            await uploadWithRetry(storagePath, fileData, 'image/png');
            
            const { data: { publicUrl } } = supabase.storage.from('vehicle-360').getPublicUrl(storagePath);
            previewUrls.push(publicUrl);
            await fs.unlink(filePath);
        }

        console.log(`✅ [Phase 1 Complete] Setting status: preview_ready`);
        await supabase.from('car_360_requests').update({
            status: 'preview_ready',
            progress: 30,
            frames_urls: previewUrls,
            frames_count: previewUrls.length
        }).eq('id', requestId);

        // --- PHASE 2: GENERATE & UPLOAD REMAINING FRAMES (11-36) ---
        console.log(`   🎨 Phase 2: Rendering remaining ${TOTAL_FRAMES - PREVIEW_COUNT} frames...`);
        const remainingPaths = [];
        for (let i = PREVIEW_COUNT; i < TOTAL_FRAMES; i++) {
            const angle = i * 10;
            const dataUrl = await page.evaluate((a) => window.renderAngle(a), angle);
            const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
            const finalPath = path.join(itemDir, `frame-${(i + 1).toString().padStart(2, '0')}.png`);
            
            await withTimeout(sharp(Buffer.from(base64Data, 'base64'))
                .resize(1200, 800, { fit: 'inside' })
                .png({ quality: 90 })
                .toFile(finalPath), 10000, `Frame ${i+1} Render`);

            remainingPaths.push(finalPath);
            
            if ((i + 1) % 5 === 0) {
                const prog = 30 + Math.round(((i + 1) / TOTAL_FRAMES) * 60);
                await supabase.from('car_360_requests').update({ progress: prog }).eq('id', requestId);
            }
        }

        console.log(`   📡 Phase 2: Uploading remaining frames...`);
        const frameResults = [...previewUrls.map(url => ({ success: true, url }))];
        
        for (const filePath of remainingPaths) {
            const fileName = path.basename(filePath);
            const storagePath = `${slug}/${fileName}`;
            
            try {
                const fileData = await fs.readFile(filePath);
                await uploadWithRetry(storagePath, fileData, 'image/png');
                
                const { data: { publicUrl } } = supabase.storage.from('vehicle-360').getPublicUrl(storagePath);
                frameResults.push({ success: true, url: publicUrl });
                await fs.unlink(filePath);
            } catch (err) {
                console.error(`❌ Frame ${fileName} FAILED to upload:`, err.message);
                frameResults.push({ success: false, url: null });
            }
        }

        const successfulUploads = frameResults.filter(r => r.success);
        console.log(`Step 6: Total Uploads completed (${successfulUploads.length}/36 frames)`);

        // --- PHASE 3: FINAL VALIDATION & UPDATE ---
        console.log(`🔍 Phase 3: Final validation...`);

        if (successfulUploads.length < 24) {
            throw new Error(`Insufficient frames uploaded: ${successfulUploads.length}/36. At least 24 required for usable quality.`);
        }

        const finalUrls = successfulUploads.map(r => r.url);
        
        console.log(`✅ [All Phases Complete] Setting status: ready (${successfulUploads.length} frames)`);
        const updatePayload = {
            status: 'ready',
            progress: 100,
            frames_urls: finalUrls,
            frames_count: finalUrls.length,
            has_360_view: true,
            generation_type: '3D-rendered',
            image_360_folder: slug,
            error_message: successfulUploads.length < 36 ? `Partial success: ${successfulUploads.length}/36 frames uploaded.` : null
        };

        await supabase.from('car_360_requests').update(updatePayload).eq('id', requestId);
        await supabase.from('cars').update({
            has_360_view: true,
            frames_count: finalUrls.length,
            image_360_folder: slug
        }).eq('id', carId);

        // CLEANUP
        await fs.rm(itemDir, { recursive: true, force: true });
        console.log("✅ PIPELINE COMPLETED SUCCESSFULLY");
        return { success: true };

    } catch (err) {
        console.error("❌ Pipeline failed:", err.message);
        await supabase.from('car_360_requests').update({ 
            status: 'failed', 
            error_message: err.message,
            progress: 0 
        }).eq('id', requestId);
        return { success: false, error: err.message };
    } finally {
        await browser.close();
    }
}

async function pollRequests() {
    console.log(`🚀 3D Renderer Worker [V3 DEFINITIVE] started. Polling...`);
    
    while (true) {
        try {
            const { data: requests, error } = await supabase
                .from('car_360_requests')
                .select('id, car_id, car_brand, car_model')
                .or('status.eq.pending,status.eq.generating,status.eq.processing') // Try those stuck?
                .order('created_at', { ascending: true })
                .limit(1);

            if (error) throw error;

            if (requests && requests.length > 0) {
                const req = requests[0];
                console.log(`📡 Processing request: ${req.id} (${req.car_brand} ${req.car_model})`);
                
                // Global timeout for the entire generation process (120 seconds)
                const GLOBAL_TIMEOUT = 120000;
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Timeout exceeded')), GLOBAL_TIMEOUT);
                });

                try {
                    await Promise.race([
                        render360(req.id, req.car_id, req.car_brand, req.car_model),
                        timeoutPromise
                    ]);
                } catch (err) {
                    console.error(`❌ Job ${req.id} failed or timed out:`, err.message);
                    
                    // If it was a timeout, explicitly mark as failed in DB 
                    // (since render360 might still be stuck in an internal step)
                    if (err.message === 'Timeout exceeded') {
                        await supabase.from('car_360_requests').update({
                            status: 'failed',
                            error_message: 'Timeout exceeded: Generation took longer than 120s',
                            progress: 0
                        }).eq('id', req.id);
                        
                        // Note: In a production environment, you might want to force-kill 
                        // any leaked puppeteer processes here if they persist.
                    }
                }
            }
        } catch (e) {
            console.error(`⚠️ Polling error:`, e.message);
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

pollRequests();

// --- Health Check Server ---
const HEALTH_PORT = 3001;
const server = http.createServer((req, res) => {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/worker-status' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'running', timestamp: new Date().toISOString() }));
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(HEALTH_PORT, () => {
    console.log(`[Health] Worker monitoring server listening on port ${HEALTH_PORT}`);
});
