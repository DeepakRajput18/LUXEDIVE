import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function doFetch() {
    const url = "https://txxguqcuirkcvtfbcgak.supabase.co/rest/v1/cars?select=*&order=daily_rate.asc";
    const headers = {
        "apikey": process.env.VITE_SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`
    };

    console.log("Fetching cars...");
    const res = await fetch(url, { headers });
    const text = await res.text();
    console.log("CARS STATUS:", res.status);
    console.log("CARS BODY:", text);

    console.log("\nFetching notification_preferences...");
    const prefUrl = "https://txxguqcuirkcvtfbcgak.supabase.co/rest/v1/notification_preferences?select=*";
    const res2 = await fetch(prefUrl, { headers });
    const text2 = await res2.text();
    console.log("PREFS STATUS:", res2.status);
    console.log("PREFS BODY:", text2);
}

doFetch();
