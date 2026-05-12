import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env.local') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials in .env.local")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testAnonFetch() {
    console.log("🔍 Testing fetch with ANON key...")
    const { data, error } = await supabase
        .from('cars')
        .select('*')
    
    if (error) {
        console.error("❌ Error fetching with ANON key:", error.message)
    } else {
        console.log(`✅ Success! Fetched ${data.length} cars with ANON key.`)
        if (data.length === 0) {
            console.log("⚠️ No cars returned. This might be due to RLS policies.")
        }
    }
}

testAnonFetch()
