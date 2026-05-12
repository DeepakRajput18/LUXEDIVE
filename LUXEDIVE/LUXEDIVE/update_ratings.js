import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function patchChauffeurRatings() {
    console.log("Recalculating ratings...");
    const headers = {
        "apikey": process.env.VITE_SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    };

    // 1. Get all chauffeurs
    const chauffeursRes = await fetch('https://txxguqcuirkcvtfbcgak.supabase.co/rest/v1/chauffeurs?select=id', { headers });
    const chauffeurs = await chauffeursRes.json();
    console.log(`Found ${chauffeurs.length} chauffeurs`);

    // 2. Get all reviews
    const reviewsRes = await fetch('https://txxguqcuirkcvtfbcgak.supabase.co/rest/v1/chauffeur_reviews?select=*', { headers });
    const reviews = await reviewsRes.json();
    console.log(`Found ${reviews.length} reviews`);

    // 3. Recalculate and update
    for (const chauffeur of chauffeurs) {
        const chauffeurReviews = reviews.filter(r => r.chauffeur_id === chauffeur.id);
        const reviewCount = chauffeurReviews.length;
        
        let avgRating = 0;
        if (reviewCount > 0) {
            const sum = chauffeurReviews.reduce((acc, curr) => acc + curr.rating, 0);
            avgRating = parseFloat((sum / reviewCount).toFixed(1));
        }

        console.log(`Updating ${chauffeur.id} -> Count: ${reviewCount}, Rating: ${avgRating}`);

        await fetch(`https://txxguqcuirkcvtfbcgak.supabase.co/rest/v1/chauffeurs?id=eq.${chauffeur.id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                rating: avgRating,
                review_count: reviewCount
            })
        });
    }

    console.log("Finished updating ratings.");
}

patchChauffeurRatings();
