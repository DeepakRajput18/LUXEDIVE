// diagnose-images.js
// Run: node diagnose-images.js
// Reads .env.local and queries Supabase to diagnose the image display issue

const fs = require('fs')
const path = require('path')

// Read .env.local
const envPath = path.join(__dirname, '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
    const [key, ...vals] = line.split('=')
    if (key && vals.length) env[key.trim()] = vals.join('=').trim()
})

const SUPABASE_URL = env['VITE_SUPABASE_URL']
const SUPABASE_KEY = env['VITE_SUPABASE_ANON_KEY']

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Could not read VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY from .env.local')
    console.log('Env keys found:', Object.keys(env))
    process.exit(1)
}

console.log('✅ Supabase URL:', SUPABASE_URL)
console.log('✅ Key starts with:', SUPABASE_KEY.substring(0, 20) + '...')

async function query(url, options = {}) {
    const resp = await fetch(url, {
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    })
    const text = await resp.text()
    try { return JSON.parse(text) } catch { return text }
}

async function main() {
    console.log('\n═══════════════════════════════════════════')
    console.log('STEP 1: Check cars table columns')
    console.log('═══════════════════════════════════════════')
    const cols = await query(
        `${SUPABASE_URL}/rest/v1/rpc/columns`,
        {
            method: 'POST',
            body: JSON.stringify({ table_name: 'cars' })
        }
    )
    console.log('Columns response:', JSON.stringify(cols).substring(0, 500))

    console.log('\n═══════════════════════════════════════════')
    console.log('STEP 2: Sample 5 cars - check image fields')
    console.log('═══════════════════════════════════════════')
    const cars = await query(
        `${SUPABASE_URL}/rest/v1/cars?select=id,brand,model,image_url,images&limit=5`
    )
    if (Array.isArray(cars)) {
        cars.forEach(car => {
            console.log(`\n🚗 ${car.brand} ${car.model}`)
            console.log('   image_url:', car.image_url || '⚠️  NULL / EMPTY')
            console.log('   images:', JSON.stringify(car.images)?.substring(0, 100) || '⚠️  NULL')
        })
    } else {
        console.log('Unexpected response:', JSON.stringify(cars).substring(0, 500))
    }

    console.log('\n═══════════════════════════════════════════')
    console.log('STEP 3: Check if vehicles storage bucket exists')
    console.log('═══════════════════════════════════════════')
    const buckets = await query(`${SUPABASE_URL}/storage/v1/bucket`)
    if (Array.isArray(buckets)) {
        const vehiclesBucket = buckets.find(b => b.id === 'vehicles')
        if (vehiclesBucket) {
            console.log('✅ vehicles bucket exists:', JSON.stringify(vehiclesBucket))
        } else {
            console.log('❌ vehicles bucket NOT FOUND. Existing buckets:', buckets.map(b => b.id).join(', '))
        }
    } else {
        console.log('Buckets response:', JSON.stringify(buckets).substring(0, 300))
    }

    console.log('\n═══════════════════════════════════════════')
    console.log('STEP 4: Count cars with image_url vs without')
    console.log('═══════════════════════════════════════════')
    const allCars = await query(`${SUPABASE_URL}/rest/v1/cars?select=image_url,images`)
    if (Array.isArray(allCars)) {
        const withUrl = allCars.filter(c => c.image_url && c.image_url.startsWith('https://')).length
        const withImages = allCars.filter(c => Array.isArray(c.images) && c.images.length > 0).length
        const total = allCars.length
        console.log(`Total cars: ${total}`)
        console.log(`Cars with valid image_url: ${withUrl} / ${total}`)
        console.log(`Cars with images[] array: ${withImages} / ${total}`)
        console.log(`Cars with NOTHING: ${allCars.filter(c => !c.image_url && (!c.images || c.images.length === 0)).length}`)
    }
}

main().catch(console.error)
