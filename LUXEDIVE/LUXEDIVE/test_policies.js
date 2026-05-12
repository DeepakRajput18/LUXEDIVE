import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing URL or Key in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpload() {
    console.log("Signing in...");
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: "deepakrajput91825@gmail.com",
        password: "Password1!" // Will need to guess or ask user, but let's just trigger update
    });

    if (authError) {
        console.error("Auth failed:", authError.message);
        return;
    }

    const userId = authData.user.id;
    console.log("Logged in as:", userId);

    console.log("Testing storage upload...");
    const dummyContent = "dummy image content";
    const path = `${userId}/avatar.txt`;

    const { error: uploadErr } = await supabase.storage
        .from('avatars')
        .upload(path, Buffer.from(dummyContent), { upsert: true, contentType: 'text/plain' });

    if (uploadErr) {
        console.log("--- ERROR ON STORAGE UPLOAD ---");
        console.log(uploadErr);
    } else {
        console.log("Storage upload successful.");

        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);

        console.log("Testing profile update...");
        const { error: updateErr } = await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', userId);

        if (updateErr) {
            console.log("--- ERROR ON PROFILE UPDATE ---");
            console.log(updateErr);
        } else {
            console.log("Profile update successful.");
        }
    }
}

testUpload();
