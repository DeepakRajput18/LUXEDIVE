import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Security: Require Admin JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user || user.email !== 'admin@luxedive.com') { // simple strict admin check
      return new Response('Unauthorized', { status: 403, headers: corsHeaders });
    }

    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'overview';

    if (action === 'overview') {
      // Get high level traffic metrics (e.g. today's events)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count: dailyVisits } = await supabase
        .from('user_behavior_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'page_visit')
        .gte('timestamp', today.toISOString());

      const { count: dailySearches } = await supabase
        .from('user_behavior_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'search')
        .gte('timestamp', today.toISOString());

      const { count: activeUsers } = await supabase
        .from('user_activity_summary')
        .select('*', { count: 'exact', head: true })
        .gte('last_active', today.toISOString());

      return new Response(JSON.stringify({
        dailyVisits: dailyVisits || 0,
        dailySearches: dailySearches || 0,
        activeUsers: activeUsers || 0
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    } else if (action === 'top-vehicles') {
      // Return from the aggregated table
      const { data, error } = await supabase
        .from('vehicle_popularity')
        .select('*, cars ( brand, model, image_urls )')
        .order('views', { ascending: false })
        .limit(10);

      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    } else if (action === 'funnel') {
      // Returns funnel step counts over all time (or could be parameterized by date)
      const { data: steps, error } = await supabase
        .from('user_behavior_events')
        .select('event_type');

      if (error) throw error;

      let searches = 0, views = 0, bookingStarts = 0, bookingSuccess = 0;
      steps.forEach(s => {
        if (s.event_type === 'search') searches++;
        if (s.event_type === 'vehicle_view') views++;
        if (s.event_type === 'booking_start') bookingStarts++;
        if (s.event_type === 'booking_success') bookingSuccess++;
      });

      return new Response(JSON.stringify({ searches, views, bookingStarts, bookingSuccess }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
