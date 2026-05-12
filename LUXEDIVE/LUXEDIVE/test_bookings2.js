const fs = require('fs');
const url = "https://txxguqcuirkcvtfbcgak.supabase.co/rest/v1/bookings?select=*&limit=1";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eGd1cWN1aXJrY3Z0ZmJjZ2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODk1NDMsImV4cCI6MjA4NDY2NTU0M30.YQxb99PYyhQjHU-yQEng9RD_vS_e11kB4QUeCbhvRaQ";

fetch(url, {
    headers: {
        "apikey": anonKey,
        "Authorization": `Bearer ${anonKey}`
    }
})
    .then(res => res.json())
    .then(data => {
        if (data.length > 0) {
            fs.writeFileSync('bookings_cols.txt', Object.keys(data[0]).join(', '));
            console.log("Wrote to bookings_cols.txt");
        } else {
            console.log("No data");
        }
    })
    .catch(err => console.error("Error:", err));
