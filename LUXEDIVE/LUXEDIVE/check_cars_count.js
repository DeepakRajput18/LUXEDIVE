import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, 'backend/generate_360/.env') })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials in .env")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkCars() {
    console.log("🔍 Checking cars in Supabase...")
    const { data, count, error } = await supabase
        .from('cars')
        .select('*', { count: 'exact' })
    
    if (error) {
        console.error("❌ Error fetching cars:", error.message)
    } else {
        console.log(`✅ Found ${count} cars in database.`)
        if (data.length > 0) {
            console.log("Sample car:", data[0].brand, data[0].model)
        }
    }
}

checkCars()
