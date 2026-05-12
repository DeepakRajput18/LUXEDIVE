import fs from 'fs';

// Load environment variables manually
const envConfig = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) return acc;
    const firstEq = trimmedLine.indexOf('=');
    if (firstEq === -1) return acc;
    const k = trimmedLine.substring(0, firstEq).trim();
    const v = trimmedLine.substring(firstEq + 1).trim().replace(/^["']|["']$/g, '');
    if (k && v) acc[k] = v;
    return acc;
}, {});

const supabaseUrl = envConfig['VITE_SUPABASE_URL'];
const supabaseKey = envConfig['SUPABASE_SERVICE_ROLE_KEY'] || envConfig['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Key in .env.local");
    process.exit(1);
}

const getImageUrl = (type) => {
    const urls = {
        'luxury': 'https://images.unsplash.com/photo-1563720225384-9a087d0d0ed3?auto=format&fit=crop&q=80',
        'sports': 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80',
        'suv': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80',
        'convertible': 'https://images.unsplash.com/photo-1585011664466-b7bcc63132e4?auto=format&fit=crop&q=80',
        'electric': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80',
        'hypercar': 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80'
    };
    return urls[type] || urls['luxury'];
};

const NEW_CARS = [
    // --- LUXURY ---
    { brand: 'Mercedes-Benz', model: 'S-Class', category: 'LUXURY', daily_rate: 55000, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.4s', hp: '429', engine: '3.0L I6' }, image_url: getImageUrl('luxury') },
    { brand: 'BMW', model: '7 Series', category: 'LUXURY', daily_rate: 52125, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.6s', hp: '375', engine: '3.0L I6' }, image_url: getImageUrl('luxury') },
    { brand: 'Audi', model: 'A8 L', category: 'LUXURY', daily_rate: 45000, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.4s', hp: '453', engine: '4.0L V8' }, image_url: getImageUrl('luxury') },
    { brand: 'Lexus', model: 'LS 500', category: 'LUXURY', daily_rate: 58125, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.6s', hp: '416', engine: '3.5L V6' }, image_url: getImageUrl('luxury') },
    { brand: 'Porsche', model: 'Panamera', category: 'LUXURY', daily_rate: 52500, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.0s', hp: '620', engine: '4.0L V8' }, image_url: getImageUrl('luxury') },
    { brand: 'Maserati', model: 'Quattroporte', category: 'LUXURY', daily_rate: 58750, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.2s', hp: '580', engine: '3.8L V8' }, image_url: getImageUrl('luxury') },
    { brand: 'Genesis', model: 'G90', category: 'LUXURY', daily_rate: 37500, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '5.1s', hp: '409', engine: '3.5L V6' }, image_url: getImageUrl('luxury') },
    { brand: 'Rolls-Royce', model: 'Ghost', category: 'LUXURY', daily_rate: 215000, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.6s', hp: '563', engine: '6.8L V12' }, image_url: getImageUrl('luxury') },
    { brand: 'Bentley', model: 'Mulsanne', category: 'LUXURY', daily_rate: 150000, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.8s', hp: '530', engine: '6.8L V8' }, image_url: getImageUrl('luxury') },
    { brand: 'Mercedes-Maybach', model: 'S680', category: 'LUXURY', daily_rate: 107500, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.5s', hp: '621', engine: '6.0L V12' }, image_url: getImageUrl('luxury') },
    { brand: 'Jaguar', model: 'XJ', category: 'LUXURY', daily_rate: 37500, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.9s', hp: '470', engine: '5.0L V8' }, image_url: getImageUrl('luxury') },
    { brand: 'Bentley', model: 'Flying Spur', category: 'LUXURY', daily_rate: 167500, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.7s', hp: '626', engine: '6.0L W12' }, image_url: getImageUrl('luxury') },

    // --- SPORTS ---
    { brand: 'Porsche', model: '911 Carrera S', category: 'SPORTS', daily_rate: 61875, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.5s', hp: '443', engine: '3.0L Flat-6' }, image_url: getImageUrl('sports') },
    { brand: 'Chevrolet', model: 'Corvette Z06', category: 'SPORTS', daily_rate: 52500, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '2.6s', hp: '670', engine: '5.5L V8' }, image_url: getImageUrl('sports') },
    { brand: 'Aston Martin', model: 'Vantage', category: 'SPORTS', daily_rate: 111250, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.5s', hp: '503', engine: '4.0L V8' }, image_url: getImageUrl('sports') },
    { brand: 'Audi', model: 'R8 V10 Performance', category: 'SPORTS', daily_rate: 60000, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.1s', hp: '602', engine: '5.2L V10' }, image_url: getImageUrl('sports') },
    { brand: 'BMW', model: 'M8 Competition', category: 'SPORTS', daily_rate: 73500, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.0s', hp: '617', engine: '4.4L V8' }, image_url: getImageUrl('sports') },
    { brand: 'Nissan', model: 'GT-R Nismo', category: 'SPORTS', daily_rate: 75000, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '2.5s', hp: '600', engine: '3.8L V6' }, image_url: getImageUrl('sports') },
    { brand: 'Mercedes-AMG', model: 'GT Black Series', category: 'SPORTS', daily_rate: 150000, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.1s', hp: '720', engine: '4.0L V8' }, image_url: getImageUrl('sports') },
    { brand: 'McLaren', model: 'Artura', category: 'SPORTS', daily_rate: 143750, seating: 2, transmission: 'automatic', fuel_type: 'hybrid', specifications: { acceleration: '2.9s', hp: '671', engine: '3.0L V6 Hybrid' }, image_url: getImageUrl('sports') },
    { brand: 'Ferrari', model: 'Roma', category: 'SPORTS', daily_rate: 125000, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.4s', hp: '612', engine: '3.9L V8' }, image_url: getImageUrl('sports') },
    { brand: 'Maserati', model: 'MC20', category: 'SPORTS', daily_rate: 115000, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '2.8s', hp: '621', engine: '3.0L V6' }, image_url: getImageUrl('sports') },
    { brand: 'Lotus', model: 'Emira', category: 'SPORTS', daily_rate: 81250, seating: 2, transmission: 'manual', fuel_type: 'petrol', specifications: { acceleration: '4.3s', hp: '400', engine: '3.5L V6' }, image_url: getImageUrl('sports') },
    { brand: 'BMW', model: 'M2', category: 'SPORTS', daily_rate: 29375, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.9s', hp: '453', engine: '3.0L I6' }, image_url: getImageUrl('sports') },
    { brand: 'Porsche', model: '911 Turbo S', category: 'SPORTS', daily_rate: 98750, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '2.7s', hp: '640', engine: '3.8L Flat-6' }, image_url: getImageUrl('sports') },

    // --- SUV ---
    { brand: 'Range Rover', model: 'Autobiography', category: 'SUV', daily_rate: 101250, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.4s', hp: '523', engine: '4.4L V8' }, image_url: getImageUrl('suv') },
    { brand: 'Bentley', model: 'Bentayga', category: 'SUV', daily_rate: 162500, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.8s', hp: '542', engine: '4.0L V8' }, image_url: getImageUrl('suv') },
    { brand: 'Lamborghini', model: 'Urus Performante', category: 'SUV', daily_rate: 128125, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.3s', hp: '657', engine: '4.0L V8' }, image_url: getImageUrl('suv') },
    { brand: 'Porsche', model: 'Cayenne Turbo GT', category: 'SUV', daily_rate: 93125, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.1s', hp: '631', engine: '4.0L V8' }, image_url: getImageUrl('suv') },
    { brand: 'Rolls-Royce', model: 'Cullinan', category: 'SUV', daily_rate: 221250, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.8s', hp: '563', engine: '6.7L V12' }, image_url: getImageUrl('suv') },
    { brand: 'Mercedes-Benz', model: 'GLS 600 Maybach', category: 'SUV', daily_rate: 100625, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.8s', hp: '550', engine: '4.0L V8' }, image_url: getImageUrl('suv') },
    { brand: 'Aston Martin', model: 'DBX 707', category: 'SUV', daily_rate: 128750, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.1s', hp: '697', engine: '4.0L V8' }, image_url: getImageUrl('suv') },
    { brand: 'BMW', model: 'X7 M60i', category: 'SUV', daily_rate: 58750, seating: 7, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.5s', hp: '523', engine: '4.4L V8' }, image_url: getImageUrl('suv') },
    { brand: 'Audi', model: 'RS Q8', category: 'SUV', daily_rate: 63750, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.7s', hp: '591', engine: '4.0L V8' }, image_url: getImageUrl('suv') },
    { brand: 'Ferrari', model: 'Purosangue', category: 'SUV', daily_rate: 331250, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.3s', hp: '715', engine: '6.5L V12' }, image_url: getImageUrl('suv') },
    { brand: 'Cadillac', model: 'Escalade V', category: 'SUV', daily_rate: 121250, seating: 7, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.4s', hp: '682', engine: '6.2L V8' }, image_url: getImageUrl('suv') },
    { brand: 'Mercedes-Benz', model: 'G63 AMG', category: 'SUV', daily_rate: 117500, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.5s', hp: '577', engine: '4.0L V8' }, image_url: getImageUrl('suv') },

    // --- CONVERTIBLE ---
    { brand: 'Ferrari', model: 'Portofino M', category: 'CONVERTIBLE', daily_rate: 112500, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.45s', hp: '612', engine: '3.9L V8' }, image_url: getImageUrl('convertible') },
    { brand: 'McLaren', model: '720S Spider', category: 'CONVERTIBLE', daily_rate: 151250, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '2.8s', hp: '710', engine: '4.0L V8' }, image_url: getImageUrl('convertible') },
    { brand: 'Porsche', model: '911 Turbo S Cabriolet', category: 'CONVERTIBLE', daily_rate: 105000, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '2.7s', hp: '640', engine: '3.8L Flat-6' }, image_url: getImageUrl('convertible') },
    { brand: 'Aston Martin', model: 'DBS Volante', category: 'CONVERTIBLE', daily_rate: 162500, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.6s', hp: '715', engine: '5.2L V12' }, image_url: getImageUrl('convertible') },
    { brand: 'Bentley', model: 'Continental GT Convertible', category: 'CONVERTIBLE', daily_rate: 181250, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.7s', hp: '542', engine: '4.0L V8' }, image_url: getImageUrl('convertible') },
    { brand: 'Mercedes-Benz', model: 'SL 63 AMG', category: 'CONVERTIBLE', daily_rate: 71250, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.5s', hp: '577', engine: '4.0L V8' }, image_url: getImageUrl('convertible') },
    { brand: 'Lexus', model: 'LC 500 Convertible', category: 'CONVERTIBLE', daily_rate: 68125, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.6s', hp: '471', engine: '5.0L V8' }, image_url: getImageUrl('convertible') },
    { brand: 'BMW', model: '8 Series Convertible', category: 'CONVERTIBLE', daily_rate: 60000, seating: 4, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '4.9s', hp: '335', engine: '3.0L I6' }, image_url: getImageUrl('convertible') },
    { brand: 'Audi', model: 'R8 Spyder', category: 'CONVERTIBLE', daily_rate: 56250, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.2s', hp: '602', engine: '5.2L V10' }, image_url: getImageUrl('convertible') },
    { brand: 'Chevrolet', model: 'Corvette Convertible', category: 'CONVERTIBLE', daily_rate: 45000, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '2.9s', hp: '495', engine: '6.2L V8' }, image_url: getImageUrl('convertible') },

    // --- ELECTRIC ---
    { brand: 'Porsche', model: 'Taycan Turbo S', category: 'ELECTRIC', daily_rate: 74375, seating: 4, transmission: 'automatic', fuel_type: 'electric', specifications: { acceleration: '2.6s', hp: '750', engine: 'Dual Motor EV' }, image_url: getImageUrl('electric') },
    { brand: 'Rimac', model: 'Nevera', category: 'ELECTRIC', daily_rate: 875000, seating: 2, transmission: 'automatic', fuel_type: 'electric', specifications: { acceleration: '1.85s', hp: '1914', engine: 'Quad Motor EV' }, image_url: getImageUrl('electric') },
    { brand: 'Tesla', model: 'Model S Plaid', category: 'ELECTRIC', daily_rate: 75000, seating: 5, transmission: 'automatic', fuel_type: 'electric', specifications: { acceleration: '1.99s', hp: '1020', engine: 'Tri Motor EV' }, image_url: getImageUrl('electric') },
    { brand: 'Lucid', model: 'Air Sapphire', category: 'ELECTRIC', daily_rate: 75000, seating: 5, transmission: 'automatic', fuel_type: 'electric', specifications: { acceleration: '1.89s', hp: '1234', engine: 'Tri Motor EV' }, image_url: getImageUrl('electric') },
    { brand: 'Audi', model: 'RS e-tron GT', category: 'ELECTRIC', daily_rate: 55250, seating: 5, transmission: 'automatic', fuel_type: 'electric', specifications: { acceleration: '3.1s', hp: '637', engine: 'Dual Motor EV' }, image_url: getImageUrl('electric') },
    { brand: 'Mercedes-Benz', model: 'EQS 580', category: 'ELECTRIC', daily_rate: 45000, seating: 5, transmission: 'automatic', fuel_type: 'electric', specifications: { acceleration: '4.1s', hp: '516', engine: 'Dual Motor EV' }, image_url: getImageUrl('electric') },
    { brand: 'BMW', model: 'i7 xDrive60', category: 'ELECTRIC', daily_rate: 62500, seating: 5, transmission: 'automatic', fuel_type: 'electric', specifications: { acceleration: '4.5s', hp: '536', engine: 'Dual Motor EV' }, image_url: getImageUrl('electric') },
    { brand: 'Pininfarina', model: 'Battista', category: 'ELECTRIC', daily_rate: 937500, seating: 2, transmission: 'automatic', fuel_type: 'electric', specifications: { acceleration: '1.89s', hp: '1900', engine: 'Quad Motor EV' }, image_url: getImageUrl('electric') },
    { brand: 'Rolls-Royce', model: 'Spectre', category: 'ELECTRIC', daily_rate: 230000, seating: 4, transmission: 'automatic', fuel_type: 'electric', specifications: { acceleration: '4.4s', hp: '584', engine: 'Dual Motor EV' }, image_url: getImageUrl('electric') },
    { brand: 'Lotus', model: 'Evija', category: 'ELECTRIC', daily_rate: 875000, seating: 2, transmission: 'automatic', fuel_type: 'electric', specifications: { acceleration: 'under 3s', hp: '2000', engine: 'Quad Motor EV' }, image_url: getImageUrl('electric') },

    // --- HYPERCAR ---
    { brand: 'Bugatti', model: 'Chiron Super Sport', category: 'HYPERCAR', daily_rate: 1750000, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '2.4s', hp: '1578', engine: '8.0L Quad-Turbo W16' }, image_url: getImageUrl('hypercar') },
    { brand: 'Koenigsegg', model: 'Jesko Absolut', category: 'HYPERCAR', daily_rate: 1687500, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '2.5s', hp: '1600', engine: '5.0L Twin-Turbo V8' }, image_url: getImageUrl('hypercar') },
    { brand: 'Pagani', model: 'Huayra Roadster BC', category: 'HYPERCAR', daily_rate: 937500, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '2.8s', hp: '791', engine: '6.0L Twin-Turbo V12' }, image_url: getImageUrl('hypercar') },
    { brand: 'Aston Martin', model: 'Valkyrie', category: 'HYPERCAR', daily_rate: 1000000, seating: 2, transmission: 'automatic', fuel_type: 'hybrid', specifications: { acceleration: '2.5s', hp: '1140', engine: '6.5L V12 Hybrid' }, image_url: getImageUrl('hypercar') },
    { brand: 'Mercedes-AMG', model: 'ONE', category: 'HYPERCAR', daily_rate: 1125000, seating: 2, transmission: 'automatic', fuel_type: 'hybrid', specifications: { acceleration: '2.9s', hp: '1049', engine: '1.6L V6 Hybrid' }, image_url: getImageUrl('hypercar') },
    { brand: 'McLaren', model: 'Speedtail', category: 'HYPERCAR', daily_rate: 625000, seating: 3, transmission: 'automatic', fuel_type: 'hybrid', specifications: { acceleration: '2.9s', hp: '1036', engine: '4.0L V8 Hybrid' }, image_url: getImageUrl('hypercar') },
    { brand: 'Ferrari', model: 'LaFerrari', category: 'HYPERCAR', daily_rate: 875000, seating: 2, transmission: 'automatic', fuel_type: 'hybrid', specifications: { acceleration: '2.4s', hp: '950', engine: '6.3L V12 Hybrid' }, image_url: getImageUrl('hypercar') },
    { brand: 'Maserati', model: 'MC12', category: 'HYPERCAR', daily_rate: 1000000, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '3.8s', hp: '621', engine: '6.0L V12' }, image_url: getImageUrl('hypercar') },
    { brand: 'Lamborghini', model: 'Sian FKP 37', category: 'HYPERCAR', daily_rate: 750000, seating: 2, transmission: 'automatic', fuel_type: 'hybrid', specifications: { acceleration: '2.8s', hp: '808', engine: '6.5L V12 Hybrid' }, image_url: getImageUrl('hypercar') },
    { brand: 'Bugatti', model: 'Divo', category: 'HYPERCAR', daily_rate: 2000000, seating: 2, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '2.4s', hp: '1479', engine: '8.0L Quad-Turbo W16' }, image_url: getImageUrl('hypercar') },
    { brand: 'Rolls Royce', model: 'Phantom', category: 'HYPERCAR', daily_rate: 285000, seating: 5, transmission: 'automatic', fuel_type: 'petrol', specifications: { acceleration: '5.3s', hp: '563', engine: '6.75L V12' }, image_url: getImageUrl('hypercar') }
];

async function seed() {
    console.log(`Seeding ${NEW_CARS.length} vehicles into Supabase...`);

    // Fetch existing cars to avoid duplicates
    let existingNames = new Set();
    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/cars?select=model,brand`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        });
        const existingCars = await response.json();
        existingNames = new Set((existingCars || []).map(c => `${c.brand} ${c.model}`));
    } catch (e) {
        console.error("Failed to fetch existing cars", e.message);
        process.exit(1);
    }

    let addedCount = 0;

    for (const car of NEW_CARS) {
        if (existingNames.has(`${car.brand} ${car.model}`)) {
            console.log(`Skipping existing: ${car.brand} ${car.model}`);
            continue;
        }

        const payload = {
            ...car,
            year: 2024,
            status: 'available',
            images: [car.image_url]
        };
        // DB does NOT expect image_url, only images array
        delete payload.image_url;

        try {
            const resp = await fetch(`${supabaseUrl}/rest/v1/cars`, {
                withCredentials: true,
                method: 'POST',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(payload)
            });

            if (!resp.ok) {
                const text = await resp.text();
                console.error(`Failed to insert ${car.brand} ${car.model}: ${resp.status} ${text}`);
            } else {
                console.log(`Inserted: ${car.brand} ${car.model}`);
                addedCount++;
            }
        } catch (e) {
            console.error(`Request failed for ${car.brand} ${car.model}: `, e.message);
        }
    }

    console.log(`Seeding complete. Added ${addedCount} new cars.`);
}

seed();
