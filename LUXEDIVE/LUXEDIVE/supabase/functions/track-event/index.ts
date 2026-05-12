import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Heuristic demand scores based on event type
const DEMAND_SCORES: Record<string, number> = {
  'search': 1,
  'vehicle_view': 2,
  'wishlist_add': 5,
  'booking_start': 10,
  'booking_success': 20
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    const { event_type, user_id, session_id, vehicle_id, page, metadata } = body;

    if (!event_type) {
      return new Response(JSON.stringify({ error: 'event_type is required' }), { status: 400, headers: corsHeaders });
    }

    // 1. Insert into user_behavior_events
    const { error: behaviorError } = await supabase
      .from('user_behavior_events')
      .insert([{
        event_type,
        user_id: user_id || null, // Optional
        session_id: session_id || null, // Fallback for anonymous users
        vehicle_id: vehicle_id || null,
        page: page || 'unknown',
        metadata: metadata || {}
      }]);

    if (behaviorError) {
      console.error('Error logging behavior event:', behaviorError);
      throw new Error('Failed to log behavior event');
    }

    // 2. Insert into demand_events if it's a strongly correlated demand event and has a target vehicle
    if (vehicle_id && DEMAND_SCORES[event_type]) {
      const score = DEMAND_SCORES[event_type];
      // Extract location from metadata if available (for Ahmedabad market specificity later)
      const location = metadata?.location || 'Ahmedabad';

      const { error: demandError } = await supabase
        .from('demand_events')
        .insert([{
          vehicle_id,
          event_type,
          demand_score: score,
          location
        }]);

      if (demandError) {
        console.error('Error logging demand event:', demandError);
        // We don't fail the whole request if demand logging fails, but we log it.
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Track Event Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
