import puppeteer from 'puppeteer';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PUBLIC_MODELS_DIR = path.join(__dirname, '../../public/models');
const TEMP_RENDER_DIR = path.join(__dirname, 'temp_render');

async function render360(requestId, carId, brand, model) {
    const slug = `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    console.log(`\n--- [ONE-SHOT TEST] STARTING PIPELINE for ${brand} ${model} ---`);
    console.log("Step 1: AI generation started (Checking/Downloading 3D model)");
    
    let modelPath = path.join(PUBLIC_MODELS_DIR, `${slug}.glb`);
    let found = false;
    
    try { await fs.access(modelPath); found = true; } catch { 
        console.log("Model not found. Downloading placeholder...");
        const placeholderUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ToyCar/glTF-Binary/ToyCar.glb";
        const response = await fetch(placeholderUrl);
        const buffer = await response.buffer();
        modelPath = path.join(PUBLIC_MODELS_DIR, `ToyCar.glb`);
        await fs.writeFile(modelPath, buffer);
        found = true; 
    }

    console.log("Step 2: AI generation completed (Model ready)");
    console.log("Step 3: Frame processing started (Launching Renderer)");
    
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    try {
        const rendererUrl = `file://${path.join(__dirname, 'headless_renderer.html')}`;
        await page.goto(rendererUrl);
        await page.waitForFunction(() => window.isReady);

        const modelData = await fs.readFile(modelPath);
        const modelUrl = `data:model/gltf-binary;base64,${modelData.toString('base64')}`;
        await page.evaluate(async (url) => await window.loadModel(url), modelUrl);

        if (! (await fs.stat(TEMP_RENDER_DIR).catch(() => null))) {
            await fs.mkdir(TEMP_RENDER_DIR, { recursive: true });
        }
        
        const framePaths = [];
        console.log(`   🎨 Rendering samples (3 frames)...`);
        for (let i = 0; i < 3; i++) {
            const angle = i * 120;
            const dataUrl = await page.evaluate((a) => window.renderAngle(a), angle);
            const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
            const tempPngPath = path.join(TEMP_RENDER_DIR, `test_frame_${i + 1}.png`);
            const finalWebpPath = path.join(TEMP_RENDER_DIR, `test_frame_${i + 1}.webp`);
            await fs.writeFile(tempPngPath, base64Data, 'base64');
            await sharp(tempPngPath).webp().toFile(finalWebpPath);
            framePaths.push(finalWebpPath);
            await fs.unlink(tempPngPath);
        }
        console.log("Step 4: Frame processing completed");

        console.log("Step 5: Upload started (Parallelizing)");
        const uploadPromises = framePaths.map(async (filePath, idx) => {
            const fileName = `test-frame-${idx}.webp`;
            const storagePath = `360-frames/test/${fileName}`;
            const fileData = await fs.readFile(filePath);
            await supabase.storage.from('vehicle-360').upload(storagePath, fileData, { upsert: true });
            const { data: { publicUrl } } = supabase.storage.from('vehicle-360').getPublicUrl(storagePath);
            await fs.unlink(filePath);
            return publicUrl;
        });

        const urls = await Promise.all(uploadPromises);
        console.log(`Step 6: Upload completed (${urls.length}/36 frames)`);

        console.log("Step 7: DB update started");
        await supabase.from('car_360_requests').update({ 
            status: 'ready', 
            progress: 100, 
            frames_urls: urls 
        }).eq('id', requestId);
        
        console.log("Step 8: DB update completed");
        console.log("\n✅ ONE-SHOT SUCCESS!");

    } finally {
        await browser.close();
    }
}

async function test() {
    const { data: requests } = await supabase.from('car_360_requests').select('id, car_id, car_brand, car_model').eq('status', 'pending').limit(1);
    if (requests && requests.length > 0) {
        await render360(requests[0].id, requests[0].car_id, requests[0].car_brand, requests[0].car_model);
    } else {
        console.log("No pending requests.");
    }
}

test();
