import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function migrate() {
    console.log("--- MIGRATING 360 FOLDER PATHS (ESM) ---");
    
    const { data: cars, error: fErr } = await supabase.from('cars').select('id, brand, model, image_360_folder');
    if (fErr) {
        console.error("Error fetching cars:", fErr.message);
        return;
    }

    console.log(`Found ${cars.length} cars. Checking paths...`);

    for (const car of cars) {
        if (!car.image_360_folder) continue;

        const slug = `${car.brand}-${car.model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        let current = car.image_360_folder;
        let normalized = slug;

        if (current.includes('http')) {
            console.log(`🔨 Normalizing URL for ${car.brand} ${car.model}: ${current}`);
            if (current.includes('/vehicle-360/')) {
                normalized = current.split('/vehicle-360/')[1].replace(/\/$/, '');
            } else {
                normalized = slug;
            }
        } else {
            // If it's already a relative path, just trim slashes
            normalized = current.replace(/\/$/, '').trim();
        }

        if (normalized !== current) {
            console.log(`✅ Updating ${car.brand} ${car.model}: "${current}" -> "${normalized}"`);
            const { error: uErr } = await supabase.from('cars').update({ image_360_folder: normalized }).eq('id', car.id);
            if (uErr) console.error(`❌ Update failed for ${car.id}:`, uErr.message);
        }
    }
    
    console.log("--- MIGRATION COMPLETE ---");
}

migrate();
