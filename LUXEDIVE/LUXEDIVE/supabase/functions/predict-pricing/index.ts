import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --- Ahmedabad Specific Heuristics ---
// High demand months: Wedding Season (Nov-Feb)
const isHighDemandMonth = (date: Date) => {
  const month = date.getMonth();
  return month >= 10 || month <= 1; // Nov, Dec, Jan, Feb
};

// Weekends usually see a surge
const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

// Predict Dynamic Price function
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    let vehicleId = url.searchParams.get('vehicle_id');
    let targetDate = url.searchParams.get('date') ? new Date(url.searchParams.get('date')!) : new Date();

    if (req.method === 'POST') {
      const body = await req.json();
      vehicleId = body.vehicle_id || vehicleId;
      if (body.date) targetDate = new Date(body.date);
    }

    if (!vehicleId) {
      return new Response(JSON.stringify({ error: 'vehicle_id is required' }), { status: 400, headers: corsHeaders });
    }

    // 1. Fetch Vehicle Base Price
    const { data: vehicle, error: vError } = await supabase
      .from('cars')
      .select('daily_rate, category')
      .eq('id', vehicleId)
      .single();

    if (vError || !vehicle) {
      throw new Error(`Vehicle not found: ${vError?.message}`);
    }

    const basePrice = Number(vehicle.daily_rate);
    let currentMultiplier = 1.0;

    // 2. Fetch recent demand history (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(targetDate.getDate() - 7);

    const { data: demandData, error: dError } = await supabase
      .from('demand_events')
      .select('demand_score')
      .eq('vehicle_id', vehicleId)
      .gte('timestamp', sevenDaysAgo.toISOString())
      .lte('timestamp', targetDate.toISOString());

    let totalDemandScore = 0;
    if (!dError && demandData) {
      totalDemandScore = demandData.reduce((acc, curr) => acc + (curr.demand_score || 0), 0);
    }

    // 3. Apply Heuristics
    // Base Demand Surge
    if (totalDemandScore > 200) currentMultiplier += 0.20;       // Extremely high interest
    else if (totalDemandScore > 100) currentMultiplier += 0.10;  // High interest
    else if (totalDemandScore > 50) currentMultiplier += 0.05;   // Moderate interest
    else if (totalDemandScore < 10) currentMultiplier -= 0.05;   // Low interest - discount

    // Seasonal / Calendar surge
    if (isHighDemandMonth(targetDate)) {
      currentMultiplier += 0.15; // 15% Wedding season premium string
    }

    if (isWeekend(targetDate)) {
      currentMultiplier += 0.10; // Weekend premium
    }

    // Category Specific Logic
    if (vehicle.category === 'SUPERCAR' && isWeekend(targetDate)) {
      currentMultiplier += 0.05; // Extra weekend premium for supercars
    }

    // Cap Multipliers to prevent absurd pricing
    if (currentMultiplier > 1.8) currentMultiplier = 1.8; // Max 80% surge
    if (currentMultiplier < 0.7) currentMultiplier = 0.7; // Max 30% discount

    const recommendedPrice = Math.round((basePrice * currentMultiplier) / 100) * 100; // Round to nearest 100

    // 4. Save prediction to DB
    // Format date to YYYY-MM-DD for uniqueness constraint
    const dateStr = targetDate.toISOString().split('T')[0];

    await supabase
      .from('dynamic_pricing')
      .upsert({
        vehicle_id: vehicleId,
        prediction_date: dateStr,
        predicted_demand_score: totalDemandScore,
        recommended_price: recommendedPrice
      }, {
        onConflict: 'vehicle_id, prediction_date'
      });

    return new Response(JSON.stringify({
      vehicleId,
      basePrice,
      recommendedPrice,
      multiplier: currentMultiplier.toFixed(2),
      factors: {
        totalDemandScore,
        isWeekend: isWeekend(targetDate),
        isHighDemandMonth: isHighDemandMonth(targetDate)
      },
      date: dateStr
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
