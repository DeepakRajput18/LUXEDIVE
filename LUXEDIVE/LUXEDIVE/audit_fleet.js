import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://txxguqcuirkcvtfbcgak.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eGd1cWN1aXJrY3Z0ZmJjZ2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODk1NDMsImV4cCI6MjA4NDY2NTU0M30.YQxb99PYyhQjHU-yQEng9RD_vS_e11kB4QUeCbhvRaQ'

const supabase = createClient(supabaseUrl, supabaseKey)

async function auditFleet() {
    const { data: cars, error } = await supabase.from('cars').select('id, brand, model, year, images').order('brand');

    if (error) {
        console.error("Error fetching cars:", error);
        return;
    }

    console.log(`Found ${cars.length} cars in the fleet. Starting audit...\n`);

    cars.forEach(car => {
        console.log(`ID: ${car.id}`);
        console.log(`Car: ${car.year ? car.year + ' ' : ''}${car.brand} ${car.model}`);
        console.log(`Image: ${car.images && car.images.length > 0 ? car.images[0] : 'No images'}`);
        console.log(`---`);
    });
}

auditFleet();
