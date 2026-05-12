import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function diagnose() {
    console.log("--- SUPABASE STORAGE DIAGNOSIS ---");
    console.log("URL:", SUPABASE_URL);

    // 1. List All Buckets
    const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
    if (bErr) {
        console.error("Error listing buckets:", bErr.message);
        return;
    }

    console.log("Available Buckets:");
    buckets.forEach(b => console.log(` - ${b.name} (Public: ${b.public})`));

    const targetBucket = buckets.find(b => b.name === 'vehicle-360') || buckets[0];
    if (!targetBucket) {
        console.error("No buckets found at all!");
        return;
    }

    console.log(`\nInspecting Bucket: ${targetBucket.name}`);

    // 2. List Root Items
    const { data: items, error: iErr } = await supabase.storage.from(targetBucket.name).list('', { limit: 20 });
    if (iErr) {
        console.error("Error listing items:", iErr.message);
    } else {
        console.log("Items in root:");
        items.forEach(item => {
            const type = item.metadata ? 'FILE' : 'FOLDER';
            console.log(` [${type}] ${item.name}`);
        });
        
        // 3. Inspect first folder
        const folder = items.find(i => !i.metadata);
        if (folder) {
            console.log(`\nInspecting Folder: ${folder.name}`);
            const { data: frames, error: fErr } = await supabase.storage.from(targetBucket.name).list(folder.name, { limit: 5 });
            if (fErr) {
                console.error("Error listing frames:", fErr.message);
            } else {
                frames.forEach(f => {
                    const url = `${SUPABASE_URL}/storage/v1/object/public/${targetBucket.name}/${folder.name}/${f.name}`;
                    console.log(` - ${f.name} -> URL: ${url}`);
                });
            }
        }
    }
}

diagnose();
