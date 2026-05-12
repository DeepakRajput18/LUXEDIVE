import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
    console.log('🏁 Manual ONE-SHOT Render Trigger...');
    
    const { data: requests, error } = await supabase
        .from('car_360_requests')
        .select('id, car_id, car_brand, car_model')
        .eq('status', 'pending')
        .limit(1);

    if (error || !requests.length) {
        console.log('No pending requests found.');
        process.exit(0);
    }

    const req = requests[0];
    console.log(`🚀 Found request: ${req.id} for ${req.car_brand} ${req.car_model}`);

    // Import the worker's function directly if possible, or just spawn it
    // But since I want to see the STAGES, I'll just use the existing worker code 
    // but modified as a one-shot.
    
    console.log('Running render_worker.js in one-shot mode...');
    // We already have render_worker.js. Let's just run it!
    // But it has an infinite loop. 
    // I'll create one_shot_render_logic.js for this.
}

run();
