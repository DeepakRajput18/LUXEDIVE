import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const requestId = '7fa98e6c-9d30-4524-b49c-3203919a185a'; // Corrected from preview

async function reset() {
    console.log('🔄 Resetting request:', requestId);
    const { error } = await supabase
        .from('car_360_requests')
        .update({ status: 'pending', error_message: null, progress: 0 })
        .eq('id', requestId);

    if (error) {
        console.error('❌ Reset failed:', error.message);
        process.exit(1);
    }
    console.log('✅ Reset successful!');
    process.exit(0);
}

reset();
