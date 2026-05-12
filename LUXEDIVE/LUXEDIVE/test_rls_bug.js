import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://txxguqcuirkcvtfbcgak.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eGd1cWN1aXJrY3Z0ZmJjZ2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODk1NDMsImV4cCI6MjA4NDY2NTU0M30.YQxb99PYyhQjHU-yQEng9RD_vS_e11kB4QUeCbhvRaQ'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testFetch() {
    console.log("1. Fetching without auth (Anon)...");
    const { data: anonData, error: anonError } = await supabase.from('cars').select('id, brand, model')
    console.log("Anon Result:", anonError ? anonError.message : `Success, got ${anonData.length} cars.\n`);

    console.log("2. Signing in as test user...");
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        phone: "+911234567890", // Or any user the system has
        password: "testpassword" // Whatever password might exist, actually I'll just sign up a random user
    })

    if (authError) {
        // Sign up instead
        console.log("Sign in failed, trying to sign up a temp user...");
        const { error: signUpErr } = await supabase.auth.signUp({
            email: "test.rls.bug@example.com",
            password: "TestPassword123!"
        });
        if (signUpErr) console.log("Sign up err:", signUpErr.message);
    }

    const { data: sessionData } = await supabase.auth.getSession();
    console.log("Has Session?", !!sessionData.session);

    if (sessionData.session) {
        console.log("3. Fetching WITH auth...");
        const res = await fetch(`${supabaseUrl}/rest/v1/cars?select=id,brand,model&order=daily_rate.asc`, {
            headers: {
                "apikey": supabaseKey,
                "Authorization": `Bearer ${sessionData.session.access_token}`
            }
        });

        console.log("Auth Fetch Status:", res.status);
        const text = await res.text();
        console.log("Auth Fetch Body:", text);
    }
}

testFetch();
