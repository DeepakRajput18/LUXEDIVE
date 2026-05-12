import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// ─────────────────────────────────────────────────────────────────────────────
// LUXEDIVE Fleet Demand Forecast — Edge Function
//
// Generates demand predictions for all cars in the DB using a rule-based
// scoring engine (events calendar + category weights + seasonal multipliers).
//
// Trigger:
//   POST /functions/v1/generate-demand-predictions
//   Authorization: Bearer <SUPABASE_ANON_KEY>
//
// Can also be set up as a CRON job via pg_cron (runs weekly at 3am Monday).
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

/** Category base demand scores (0-1) */
const CATEGORY_BASE: Record<string, number> = {
    EXOTIC: 0.65,
    LUXURY: 0.55,
    SPORTS: 0.50,
    WEDDING: 0.45,
    PREMIUM: 0.42,
};

/** Event type boost amounts */
const EVENT_BOOSTS: Record<string, number> = {
    very_high: 0.25,
    high: 0.18,
    medium: 0.10,
    low: 0.05,
};

interface Car {
    id: string;
    brand: string;
    model: string;
    category: string;
    daily_rate: number;
}

interface Event {
    event_name: string;
    event_type: string;
    start_date: string;
    end_date: string;
    impact_level: string;
    affected_categories: string[];
}

function addDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

function dateToStr(date: Date): string {
    return date.toISOString().split("T")[0];
}

function isDateBetween(date: Date, start: string, end: string): boolean {
    const d = date.getTime();
    return d >= new Date(start).getTime() && d <= new Date(end + "T23:59:59Z").getTime();
}

function computeDemandScore(
    car: Car,
    date: Date,
    events: Event[]
): { score: number; eventNames: string[] } {
    const month = date.getMonth() + 1; // 1-12
    const dow = date.getDay(); // 0=Sun,6=Sat
    const isWeekend = dow === 0 || dow === 6;

    // Base score by category
    let score = CATEGORY_BASE[car.category?.toUpperCase()] ?? 0.40;

    const eventNames: string[] = [];

    // Seasonal boosts
    if ([11, 12, 1, 2].includes(month) && ["LUXURY", "WEDDING"].includes(car.category)) {
        score += 0.20;
        eventNames.push("wedding_season");
    }
    if ([10, 11].includes(month)) {
        score += 0.10;
        eventNames.push("festival_month");
    }
    if ([4, 5].includes(month) && ["SPORTS", "EXOTIC", "LUXURY"].includes(car.category)) {
        score += 0.15;
        eventNames.push("ipl_season");
    }
    if (isWeekend) {
        score += 0.08;
        eventNames.push("weekend");
    }

    // Event-based boosts
    for (const event of events) {
        if (isDateBetween(date, event.start_date, event.end_date)) {
            const catMatch = event.affected_categories.some(
                (c) => c.toUpperCase() === car.category?.toUpperCase()
            );
            if (catMatch) {
                const boost = EVENT_BOOSTS[event.impact_level] ?? 0.05;
                score += boost;
                if (!eventNames.includes(event.event_type)) {
                    eventNames.push(event.event_type);
                }
            }
        }
    }

    // Add small random noise (± 3%) to prevent identical scores
    const noise = (Math.random() - 0.5) * 0.06;
    score += noise;

    // Cap at 0.98
    score = Math.min(Math.max(score, 0.05), 0.98);

    return { score: parseFloat(score.toFixed(2)), eventNames };
}

Deno.serve(async (req: Request) => {
    // Allow OPTIONS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
            },
        });
    }

    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { "Content-Type": "application/json" },
        });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Parse optional config from body
    let daysAhead = 90;
    try {
        const body = await req.json();
        if (body?.days_ahead) daysAhead = Math.min(Math.max(parseInt(body.days_ahead), 1), 365);
    } catch { }

    console.log(`[generate-demand-predictions] Starting... days_ahead=${daysAhead}`);

    // Fetch all available cars
    const { data: cars, error: carsError } = await supabase
        .from("cars")
        .select("id, brand, model, category, daily_rate")
        .eq("is_available", true);

    if (carsError || !cars) {
        console.error("Failed to fetch cars:", carsError);
        return new Response(JSON.stringify({ error: "Failed to fetch cars" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Fetch all events
    const { data: events, error: eventsError } = await supabase
        .from("ahmedabad_events")
        .select("*");

    if (eventsError) {
        console.error("Failed to fetch events:", eventsError);
    }

    const allEvents: Event[] = events || [];
    const today = new Date();
    const predictions: any[] = [];

    // Generate predictions for each car × each day
    for (const car of cars as Car[]) {
        for (let d = 0; d < daysAhead; d++) {
            const predDate = addDays(today, d);
            const { score, eventNames } = computeDemandScore(car, predDate, allEvents);

            const predictedBookings = Math.max(0, Math.round(score * 8));
            const confidence = score >= 0.70 ? "high" : score >= 0.45 ? "medium" : "low";

            predictions.push({
                car_id: car.id,
                prediction_date: dateToStr(predDate),
                demand_score: score,
                predicted_bookings: predictedBookings,
                confidence_level: confidence,
                factors: {
                    is_weekend: [0, 6].includes(predDate.getDay()),
                    month: predDate.getMonth() + 1,
                    category: car.category,
                    events: eventNames,
                    base_score: CATEGORY_BASE[car.category?.toUpperCase()] ?? 0.40,
                },
                updated_at: new Date().toISOString(),
            });
        }
    }

    console.log(`  Generated ${predictions.length} predictions for ${cars.length} cars`);

    // Upsert in batches of 500
    const BATCH_SIZE = 500;
    let upsertedCount = 0;

    for (let i = 0; i < predictions.length; i += BATCH_SIZE) {
        const batch = predictions.slice(i, i + BATCH_SIZE);
        const { error: upsertError } = await supabase
            .from("demand_predictions")
            .upsert(batch, {
                onConflict: "car_id,prediction_date",
                ignoreDuplicates: false,
            });

        if (upsertError) {
            console.error(`Batch ${i / BATCH_SIZE} upsert error:`, upsertError);
        } else {
            upsertedCount += batch.length;
        }
    }

    console.log(`[generate-demand-predictions] Done. Upserted ${upsertedCount} predictions.`);

    return new Response(
        JSON.stringify({
            success: true,
            cars_processed: cars.length,
            predictions_generated: predictions.length,
            predictions_upserted: upsertedCount,
            days_ahead: daysAhead,
            generated_at: new Date().toISOString(),
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
});
