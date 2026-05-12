import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf-8');
let supabaseUrl = '';
let supabaseKey = '';

envFile.split('\n').forEach(line => {
    if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim().replace(/['"]/g, '').replace(/(\r\n|\n|\r)/gm, "");
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim().replace(/['"]/g, '').replace(/(\r\n|\n|\r)/gm, "");
});

async function test() {
    try {
        const res = await fetch(`${supabaseUrl}/rest/v1/bookings?select=*&limit=1`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        });

        if (res.ok) {
            console.log("✅ bookings table is readable by anon.");
        } else {
            const text = await res.text();
            console.error("❌ bookings table error: ", text);
        }
    } catch (err) { }
}
test();
