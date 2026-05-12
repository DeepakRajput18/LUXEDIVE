import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function check() {
    const { data, error } = await supabase
        .from('car_360_requests')
        .select('id, status, progress, error_message')
        .eq('id', 'ac5309ae-9e57-448f-a483-00c809c071bd')
        .single();

    if (error) {
        console.error('❌ Check failed:', error.message);
        process.exit(1);
    }
    console.log('📊 Status:', data.status);
    console.log('📈 Progress:', data.progress + '%');
    if (data.frames_urls) console.log('🖼️ Frames Uploaded:', data.frames_urls.length + '/36');
    if (data.error_message) console.log('⚠️ Error:', data.error_message);
    process.exit(0);
}

check();
