const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envFile = fs.readFileSync('.env.local', 'utf-8');
let supabaseUrl = '';
let supabaseKey = '';

envFile.split('\n').forEach(line => {
    if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim().replace(/['"]/g, '');
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim().replace(/['"]/g, '');
});

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ENVIROMENT VARIABLES MISSING");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log("Testing connection to:", supabaseUrl);

    const { data, error } = await supabase.from('cars').select('id').limit(1);
    if (error) {
        console.error("❌ DATABASE CONNECTION FAILED:", error);
    } else {
        // If we reach here, Supabase is undeniably connected
        console.log("✅ DATABASE CONNECTED SUCCESSFULLY! (Cars table is responsive)");
    }

    const { error: aErr } = await supabase.auth.getSession();
    if (aErr) {
        console.error("⚠️ AUTHENTICATION WARNING:", aErr);
    } else {
        console.log("✅ AUTHENTICATION SERVICE CONNECTED SUCCESSFULLY!");
    }
}

test();
