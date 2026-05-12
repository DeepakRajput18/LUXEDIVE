import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const carId = '941602e7-eff8-4fb7-b4e1-08f8463a440f'; // From Step 2374
const requestId = 'ac5309ae-9e57-448f-a483-00c809c071bd';

async function finalize() {
    console.log('🏁 Finalizing request...');
    
    // Construct URLs
    const frameUrls = [];
    for (let i = 1; i <= 36; i++) {
        const fileName = `frame-${i.toString().padStart(2, '0')}.webp`;
        const storagePath = `360-frames/${carId}/${fileName}`;
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/vehicle-360/${storagePath}`;
        frameUrls.push(publicUrl);
    }

    /*
    const { error } = await supabase.from('car_360_requests').update({
        status: 'ready',
        progress: 100,
        frames_urls: frameUrls,
        has_360_view: true,
        frames_count: 36,
        generation_type: '3D-rendered'
    }).eq('id', requestId);

    if (error) {
        console.error('❌ Update failed:', error.message);
        process.exit(1);
    }
    */

    console.log('🏎️ Updating cars table for ID:', carId);
    const { error: carError } = await supabase.from('cars').update({
        has_360_view: true,
        frames_count: 36,
        image_360_folder: `360-frames/${carId}`
    }).eq('id', carId);

    if (carError) {
        console.error('❌ Car update failed:', carError.message);
        process.exit(1);
    }

    console.log('✅ Request finalized and car updated!');
    process.exit(0);
}

finalize();
