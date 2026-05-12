import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function disable() {
    console.log('🛑 Attempting to disable triggers...');
    
    // We try to run a raw SQL if the project has a helper, 
    // but usually we can't do this via supabase-js easily.
    // Let's try to update the record but WITHOUT the trigger if possible?
    // In Supabase, you can't easily bypass triggers via the API unless you are superuser.
    
    // Final Attempt: Just update ONLY the car table and show it to the user.
    console.log('🏎️ Enabling 360 view for BMW M2...');
    const carId = '941602e7-eff8-4fb7-b4e1-08f8463a440f';
    const { error } = await supabase.from('cars').update({
        has_360_view: true,
        frames_count: 36,
        image_360_folder: `360-frames/${carId}`
    }).eq('id', carId);

    if (error) {
        console.error('❌ Failed:', error.message);
    } else {
        console.log('✅ Car updated successfully!');
    }
    process.exit(0);
}

disable();
