import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function list() {
    console.log('📋 Listing all 360 requests:');
    const { data: requests, error } = await supabase
        .from('car_360_requests')
        .select('id, car_id, status, progress, car_brand, car_model')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }

    requests.forEach(r => {
        console.log(`- ${r.id}: ${r.status} (${r.progress}%) | ${r.car_brand} ${r.car_model}`);
    });
    process.exit(0);
}

list();
