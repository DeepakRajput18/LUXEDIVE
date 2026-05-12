import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function update() {
    console.log('🔄 Updating request ac5309ae-9e57-448f-a483-00c809c071bd to pending...');
    const { data, error } = await supabase
        .from('car_360_requests')
        .update({ status: 'pending', error_message: null })
        .eq('id', 'ac5309ae-9e57-448f-a483-00c809c071bd');

    if (error) {
        console.error('❌ Update failed:', error.message);
        process.exit(1);
    }
    console.log('✅ Update successful!');
    process.exit(0);
}

update();
