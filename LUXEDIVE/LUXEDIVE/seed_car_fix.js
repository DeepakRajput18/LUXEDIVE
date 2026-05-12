import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://txxguqcuirkcvtfbcgak.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eGd1cWN1aXJrY3Z0ZmJjZ2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODk1NDMsImV4cCI6MjA4NDY2NTU0M30.YQxb99PYyhQjHU-yQEng9RD_vS_e11kB4QUeCbhvRaQ'

const supabase = createClient(supabaseUrl, supabaseKey)

const car = {
    brand: 'Bentley',
    model: 'Mulsanne Wedding',
    category: 'WEDDING',
    daily_rate: 130000,
    is_available: true
    // Removed arrays/json/license_plate to ensure success
}

async function seed() {
    console.log('Seeding ULTRA minimal car...')
    const { data, error } = await supabase.from('cars').insert(car).select()
    if (error) {
        console.error('Error:', JSON.stringify(error, null, 2))
    } else {
        console.log('Success:', data)
    }
}

seed()
