// backfill-image-url.js
// Run: node --experimental-vm-modules backfill-image-url.js
// Copies images[0] into image_url for all cars that have images but no image_url

import fs from 'fs';

const envConfig = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
    const eqIdx = line.indexOf('=');
    if (eqIdx > 0) {
        const k = line.substring(0, eqIdx).trim();
        const v = line.substring(eqIdx + 1).trim();
        if (k && v) acc[k] = v;
    }
    return acc;
}, {});

const supabaseUrl = envConfig['VITE_SUPABASE_URL'];
const supabaseKey = envConfig['SUPABASE_SERVICE_ROLE_KEY'] || envConfig['VITE_SUPABASE_ANON_KEY'];

console.log('URL:', supabaseUrl?.substring(0, 40) + '...');
console.log('Key:', supabaseKey?.substring(0, 20) + '...');

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const headers = {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json'
};

async function run() {
    // 1. Fetch all cars
    console.log('\n📦 Fetching all cars...');
    const resp = await fetch(`${supabaseUrl}/rest/v1/cars?select=id,brand,model,image_url,images&limit=1000`, { headers });
    const cars = await resp.json();

    if (!Array.isArray(cars)) {
        console.error('Unexpected response:', JSON.stringify(cars).substring(0, 300));
        process.exit(1);
    }

    console.log(`Total cars: ${cars.length}`);

    const withUrl = cars.filter(c => c.image_url && c.image_url.startsWith('https://')).length;
    const withImages = cars.filter(c => Array.isArray(c.images) && c.images.length > 0).length;
    const needsFix = cars.filter(c => (!c.image_url || !c.image_url.startsWith('https://')) && Array.isArray(c.images) && c.images.length > 0);

    console.log(`✅ Cars with image_url: ${withUrl}`);
    console.log(`📋 Cars with images[]: ${withImages}`);
    console.log(`🔧 Cars needing fix (have images[] but no image_url): ${needsFix.length}`);

    if (needsFix.length === 0) {
        console.log('\n✅ All cars already have image_url set. No backfill needed.');
        // Print a sample to confirm the URLs look right
        const sample = cars.slice(0, 3);
        sample.forEach(c => console.log(`  ${c.brand} ${c.model}: ${c.image_url?.substring(0, 60)}`));
        return;
    }

    // 2. Patch each car that needs it
    console.log('\n🔧 Backfilling image_url from images[0]...');
    let fixed = 0;
    let failed = 0;

    for (const car of needsFix) {
        const imageUrl = car.images[0];
        if (!imageUrl || !imageUrl.startsWith('https://')) {
            console.log(`  ⚠️  Skip ${car.brand} ${car.model}: bad URL in images[0]: ${imageUrl}`);
            continue;
        }

        const patchResp = await fetch(`${supabaseUrl}/rest/v1/cars?id=eq.${car.id}`, {
            method: 'PATCH',
            headers: { ...headers, 'Prefer': 'return=representation' },
            body: JSON.stringify({ image_url: imageUrl })
        });

        if (patchResp.ok) {
            console.log(`  ✅ Fixed: ${car.brand} ${car.model} → ${imageUrl.substring(0, 60)}`);
            fixed++;
        } else {
            const err = await patchResp.text();
            console.log(`  ❌ Failed: ${car.brand} ${car.model}: ${patchResp.status} ${err.substring(0, 100)}`);
            failed++;
        }
    }

    console.log(`\n✅ Done. Fixed: ${fixed}, Failed: ${failed}`);
}

run().catch(console.error);
