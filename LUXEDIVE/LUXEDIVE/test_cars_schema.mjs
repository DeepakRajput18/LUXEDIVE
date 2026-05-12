import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function testColumns() {
    const allColumns = ['id', 'brand', 'model', 'category', 'daily_rate', 'images', 'image_url', 'year', 'seats', 'transmission', 'fuel_type', 'is_available']

    for (const col of allColumns) {
        console.log(`Testing column: ${col}...`)
        const { data, error } = await supabase.from('cars').select(col).limit(1)
        if (error) {
            console.log(`❌ Column ${col} FAILED:`, error.message)
        } else {
            console.log(`✅ Column ${col} SUCCESS`)
        }
    }
}

testColumns()
