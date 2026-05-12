
import fs from 'fs';
const firstNames = ["Aarav", "Vihaan", "Vivaan", "Anaya", "Diya", "Aanya", "Pranjal", "Saanvi", "Krishna", "Ishani", "Advait", "Arjun", "Aaryahi", "Reyansh", "Kavya", "Ayaan", "Kyra", "Zoya", "Siddharth", "Myra", "Dhairya", "Aadhya", "Kabir", "Shanaya", "Hridaan", "Inaya", "Atharv", "Sia", "Ishaan", "Kiara", "Dev", "Riya", "Arnav", "Anika", "Shaurya", "Tara", "Veer", "Amaira", "Ranveer", "Sara", "Darsh", "Vanya", "Yuvraj", "Anvi", "Tushar", "Navya", "Naitik", "Ira", "Ayan", "Amyra", "Pratik", "Sonal", "Jayant", "Manisha", "Ketan", "Hemangini", "Bhavesh", "Urvashi", "Yogesh", "Pinal", "Dhiren", "Jagruti", "Lalit", "Seema", "Narendra", "Komal", "Vinod", "Gita", "Ashish", "Maya", "Dinesh", "Alpa", "Ramesh", "Sushma", "Paresh", "Bindiya", "Mahesh", "Rekha", "Suresh", "Nayna", "Bharat", "Heena", "Rajesh", "Rita", "Girish", "Panna", "Vimal", "Usha", "Indrajit", "Smita", "Amrat", "Varsha", "Magan", "Kokila", "Ratilal", "Dayaben", "Ravji", "Kankuben", "Popat", "Santok"];
const lastNames = ["Patel", "Shah", "Joshi", "Desai", "Mehta", "Trivedi", "Parmar", "Bhatt", "Vyas", "Pandya", "Shukla", "Vaghela", "Jadeja", "Chauhan", "Solanki", "Rathod", "Makwana", "Gohel", "Jani", "Parikh", "Modi", "Kapadia", "Darji", "Soni", "Panchal", "Mistry", "Thaker", "Luhar", "Raval", "Chokshi", "Khatri", "Gajjar", "Suthar", "Brahmbhatt", "Amin", "Dani", "Doshi", "Sheth", "Zala", "Sanghvi", "Kumbhar", "Bhavsar", "Mer", "Jhala", "Kansara", "Rabari", "Bharwad", "Koli", "Vanza", "Gadhvi"];
const cities = ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari", "Morbi", "Nadiad", "Mehsana", "Surendranagar", "Gandhidham", "Veraval", "Bharuch", "Porbandar", "Godhra", "Patan", "Botad", "Jetpur", "Kalol", "Gondal", "Deesa", "Amreli", "Mahuva", "Somnath"];

const names = new Set();
const pool = [];

while (pool.length < 500) {
    const f = firstNames[Math.floor(Math.random() * firstNames.length)];
    const l = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${f} ${l}`;
    if (!names.has(fullName)) {
        names.add(fullName);
        const city = cities[Math.floor(Math.random() * cities.length)];
        pool.push(`('${fullName}', '${f}', '${l}', 'gujarati', '${city}', 'India')`);
    }
}

const sql = "INSERT INTO reviewer_names_pool (full_name, first_name, last_name, ethnicity, city, country) VALUES\n" + 
            pool.join(",\n") + "\nON CONFLICT (full_name) DO NOTHING;";

fs.writeFileSync('more_guj_names.sql', sql, 'utf8');
console.log("Done");
