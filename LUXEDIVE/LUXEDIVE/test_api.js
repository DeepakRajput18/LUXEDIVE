import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing URL or Key in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCars() {
    console.log("Testing cars endpoint...");
    const { data, error } = await supabase.from('cars').select('*').order('daily_rate', { ascending: true });
    if (error) {
        console.error("cars error:", JSON.stringify(error, null, 2));
    } else {
        console.log("cars success:", data?.length, "records found.");
    }
}

async function testPrefs() {
    console.log("\nTesting notification preferences...");
    // Just fetch without auth first (should be empty or error)
    const { data, error } = await supabase.from('notification_preferences').select('*');
    if (error) {
        console.error("prefs error:", JSON.stringify(error, null, 2));
    } else {
        console.log("prefs success:", data?.length, "records found.");
    }
}

async function testAll() {
    await testCars();
    await testPrefs();
}

testAll();
