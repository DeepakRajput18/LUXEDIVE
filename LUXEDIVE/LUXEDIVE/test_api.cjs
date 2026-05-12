const dotenv = require('dotenv');
const https = require('https');
dotenv.config({ path: '.env.local' });

const options = {
    hostname: 'txxguqcuirkcvtfbcgak.supabase.co',
    port: 443,
    path: '/rest/v1/cars?select=*',
    method: 'GET',
    headers: {
        'apikey': process.env.VITE_SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + process.env.VITE_SUPABASE_ANON_KEY
    }
};

const req = https.request(options, res => {
    console.log(`CARS STATUS: ${res.statusCode}`);
    res.on('data', d => process.stdout.write("CARS BODY: " + d));
});
req.on('error', error => console.error(error));
req.end();

const opts2 = { ...options, path: '/rest/v1/notification_preferences?select=*' };
const req2 = https.request(opts2, res => {
    console.log(`PREFS STATUS: ${res.statusCode}`);
    res.on('data', d => process.stdout.write("PREFS BODY: " + d));
});
req2.on('error', error => console.error(error));
req2.end();
