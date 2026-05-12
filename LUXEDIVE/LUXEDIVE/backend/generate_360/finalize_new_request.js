import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const requestId = 'fbc26a50-6f71-483a-9ca9-3203919a185a';

async function checkAndFinalize() {
    console.log('🔍 Checking new request:', requestId);
    const { data: request, error } = await supabase
        .from('car_360_requests')
        .select('*')
        .eq('id', requestId)
        .single();

    if (error) {
        console.error('❌ Request not found:', error.message);
        process.exit(1);
    }

    console.log('📊 Status:', request.status);
    console.log('📈 Progress:', request.progress + '%');
    
    const carId = request.car_id;
    console.log('🏎️ Updating car:', carId);

    // Force update the car table to enable 360
    const { error: carError } = await supabase.from('cars').update({
        has_360_view: true,
        frames_count: 36,
        image_360_folder: `360-frames/${carId}`
    }).eq('id', carId);

    if (carError) {
        console.error('❌ Car update failed:', carError.message);
    } else {
        console.log('✅ Car updated successfully! 360 view enabled.');
    }
    process.exit(0);
}

checkAndFinalize();
