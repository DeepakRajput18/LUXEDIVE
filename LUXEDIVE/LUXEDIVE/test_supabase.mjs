import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf-8');
let supabaseUrl = '';
let supabaseKey = '';

envFile.split('\n').forEach(line => {
    if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim().replace(/['"]/g, '').replace(/(\r\n|\n|\r)/gm, "");
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim().replace(/['"]/g, '').replace(/(\r\n|\n|\r)/gm, "");
});

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ENVIROMENT VARIABLES MISSING IN .env.local");
    process.exit(1);
}

async function test() {
    console.log("Testing connection to: " + supabaseUrl);
    try {
        const res = await fetch(`${supabaseUrl}/rest/v1/cars?select=id&limit=1`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log("✅ DATABASE CONNECTED SUCCESSFULLY!");
            console.log("Cars API returned:", data);
        } else {
            console.error("❌ DATABASE CONNECTION FAILED!");
            console.error(await res.text());
        }
    } catch (err) {
        console.error("Network error:", err);
    }
}

test();
