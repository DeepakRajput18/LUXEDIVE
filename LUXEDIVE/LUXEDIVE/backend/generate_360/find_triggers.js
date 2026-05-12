import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function findTriggers() {
    console.log('🔍 Listing triggers for car_360_requests...');
    
    // Note: rpc or direct query via supabase-js might not work for system tables if not superuser
    // But let's try a direct SQL through a helper if the project allows it
    const { data, error } = await supabase.rpc('execute_sql', { 
        sql: "SELECT trigger_name FROM information_schema.triggers WHERE event_object_table = 'car_360_requests';" 
    });

    if (error) {
        console.error('❌ Query failed:', error.message);
        // Fallback: Try a different approach if rpc is not available
        process.exit(1);
    }
    console.log('🎯 Triggers found:', data);
    process.exit(0);
}

findTriggers();
