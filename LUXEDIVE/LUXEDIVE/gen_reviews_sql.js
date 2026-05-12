
import fs from 'fs';

const GOOD_COMMENTS = [
    'Very smooth and professional. Exactly what luxury driving should feel like.',
    'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.',
    'Reached on time, car was spotless, and the drive was extremely comfortable.',
    'Excellent service. Driver was courteous, well-spoken and discreet.',
    'My entire family was comfortable throughout the trip. Highly recommended.',
    'Would book again without hesitation. Best chauffeur experience in Ahmedabad.',
    'Navigated seamlessly through traffic. No stress whatsoever.',
    'Perfect ride for our corporate event. Professional attire and great manner.',
    'Smooth driving on highway, knew all the rest stops. Very helpful.',
    'Driver was extremely polite and even helped with heavy luggage at the hotel.',
    'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.',
    'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.',
    'Long distance trip was made comfortable. Great company throughout the journey.',
    'Five stars without a doubt. Handled the route expertly and safely.',
];

const AVG_COMMENTS = [
    'Decent driver but arrived about 15 minutes late. Overall okay experience.',
    'Driving style is acceptable, not very smooth on speed breakers. Serviceable.',
    'Communication could be better. Didn\'t know English well but manageable.',
    'The car was clean but the music was too loud initially. Asked to lower it.',
    'Adequate service. Expected more from a luxury service. Nothing extraordinary.',
    'Slight delay at pickup but compensated by taking a faster route. Average.',
];

const BAD_COMMENTS = [
    'Driver came late by 30 minutes with no prior intimation. Very unprofessional.',
    'Driving was a bit rash on the highway, accelerating too aggressively.',
    'Behavior was not very polite when I asked about a route change. Rude tone.',
    'Car smelled of cigarette smoke. Request LUXEDIVE to check vehicle standards.',
    'Driver took a longer route and was non-responsive to feedback during the trip.',
];

const chauffeurs = [
    {"id":"cc107ecb-48d6-4fa5-90e5-c2939de63802","legacy_id":1,"total_trips_completed":1250},
    {"id":"032416ae-0a92-4361-8f2b-3683b6d6b87c","legacy_id":2,"total_trips_completed":850},
    {"id":"e63db808-73e0-48e8-8689-3c1e4f35f0db","legacy_id":3,"total_trips_completed":600},
    {"id":"07b1acce-f7e7-4731-8052-c8879f1b1b97","legacy_id":4,"total_trips_completed":750},
    {"id":"0aeafa65-f006-4547-9c35-dc516924ed06","legacy_id":5,"total_trips_completed":1500},
    {"id":"f17df373-f27d-459d-9f1d-76734de903b2","legacy_id":6,"total_trips_completed":3000},
    {"id":"637ba102-dafa-4f00-81f0-50d815bf7081","legacy_id":7,"total_trips_completed":420},
    {"id":"fdce45c8-50f2-485b-bb23-21548113051f","legacy_id":8,"total_trips_completed":560},
    {"id":"5fa5360f-d389-4203-9a80-e867e79267df","legacy_id":9,"total_trips_completed":280},
    {"id":"8b52987b-77c8-4eae-abef-0a85e2c107b9","legacy_id":10,"total_trips_completed":900},
    {"id":"5dee1a2d-4851-431c-8e77-6d36606f01d3","legacy_id":11,"total_trips_completed":180},
    {"id":"480a5547-ecaf-48e2-a3c5-2672f54cbf39","legacy_id":12,"total_trips_completed":1100},
    {"id":"20f78374-dc4d-4771-8f57-a9c9a2b474fa","legacy_id":13,"total_trips_completed":2100},
    {"id":"c7988e83-95ae-4903-bcd5-e419f13bb555","legacy_id":14,"total_trips_completed":320},
    {"id":"a5c51005-0123-47bc-871e-bb6a09cd0abd","legacy_id":15,"total_trips_completed":240},
    {"id":"91cbc847-9d22-4952-ab40-9e2fd0c3863d","legacy_id":16,"total_trips_completed":490},
    {"id":"b33a5bab-66c3-41d7-8cf1-564a330ece1b","legacy_id":17,"total_trips_completed":1300},
    {"id":"0c3c0cd5-d31a-4c08-baca-ecf141eb6c53","legacy_id":18,"total_trips_completed":120},
    {"id":"eee58812-c101-4c5a-9628-b2c0283bc396","legacy_id":19,"total_trips_completed":820},
    {"id":"3b92916d-025b-4cc4-b63e-d2dda5970b68","legacy_id":20,"total_trips_completed":640}
];

let sql = "DO $$\nDECLARE\n  r_user RECORD;\nBEGIN\n";

chauffeurs.forEach(c => {
    const count = Math.min(50, Math.floor(c.total_trips_completed * 0.05 + 5)); // Cap at 50 per chauffeur to be safe
    const goodCount = Math.round(count * 0.90); // 90% good for LUXEDIVE
    const avgCount = Math.round(count * 0.07);
    const badCount = count - goodCount - avgCount;

    for (let i = 0; i < goodCount; i++) {
        const rating = Math.random() > 0.5 ? 5 : 4;
        const comment = GOOD_COMMENTS[Math.floor(Math.random() * GOOD_COMMENTS.length)];
        sql += `  SELECT * INTO r_user FROM assign_unique_reviewer_name('${c.id}');\n`;
        sql += `  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) \n`;
        sql += `  VALUES ('${c.id}', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, ${rating}, '${comment.replace(/'/g, "''")}', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));\n`;
    }

    for (let i = 0; i < avgCount; i++) {
        const comment = AVG_COMMENTS[Math.floor(Math.random() * AVG_COMMENTS.length)];
        sql += `  SELECT * INTO r_user FROM assign_unique_reviewer_name('${c.id}');\n`;
        sql += `  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) \n`;
        sql += `  VALUES ('${c.id}', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, '${comment.replace(/'/g, "''")}', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));\n`;
    }

    for (let i = 0; i < badCount; i++) {
        const rating = Math.floor(Math.random() * 2) + 1;
        const comment = BAD_COMMENTS[Math.floor(Math.random() * BAD_COMMENTS.length)];
        sql += `  SELECT * INTO r_user FROM assign_unique_reviewer_name('${c.id}');\n`;
        sql += `  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) \n`;
        sql += `  VALUES ('${c.id}', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, ${rating}, '${comment.replace(/'/g, "''")}', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));\n`;
    }
});

sql += "END $$;";

fs.writeFileSync('populate_reviews.sql', sql);

