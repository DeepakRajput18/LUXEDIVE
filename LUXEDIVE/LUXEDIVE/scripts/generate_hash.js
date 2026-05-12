
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://txxguqcuirkcvtfbcgak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eGd1cWN1aXJrY3Z0ZmJjZ2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODk1NDMsImV4cCI6MjA4NDY2NTU0M30.YQxb99PYyhQjHU-yQEng9RD_vS_e11kB4QUeCbhvRaQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateHash() {
    const email = `temp_${Date.now()}@example.com`;
    const password = 'Luxedive@123';

    console.log('Attempting to create user:', email);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error('Error creating temp user:', error);
    } else {
        console.log('SUCCESS_USER_CREATED:', email);
        console.log('User ID:', data.user.id);
    }
}

generateHash();
