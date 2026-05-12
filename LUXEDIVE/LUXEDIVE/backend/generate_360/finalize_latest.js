import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const carId = '941602e7-eff8-4fb7-b4e1-08f8463a440f';
const requestId = 'edbfcbb6-e976-49a0-a785-66dda8b9f000';

async function finalize() {
    console.log('🏁 Finalizing request:', requestId);

    // Update car table
    const { error: carError } = await supabase.from('cars').update({
        has_360_view: true,
        frames_count: 36,
        image_360_folder: `360-frames/${carId}`
    }).eq('id', carId);

    if (carError) {
        console.error('❌ Car update failed:', carError.message);
        process.exit(1);
    }

    console.log('✅ Car updated and 360 view enabled!');
    process.exit(0);
}

finalize();
