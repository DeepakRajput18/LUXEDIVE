-- ============================================================
-- LUXEDIVE: Scheduled Jobs for AI Pricing & Analytics
-- ============================================================

-- Note: Ensure pg_cron extension is enabled for the database.
-- Enable it via Supabase Dashboard -> Database -> Extensions -> pg_cron

-- 1. Analytics Aggregation (Runs daily at midnight UTC)
SELECT cron.schedule(
  'analytics-daily-aggregation',
  '0 0 * * *',
  $$
    BEGIN;
      SELECT aggregate_vehicle_popularity();
      SELECT aggregate_user_activity();
    COMMIT;
  $$
);

-- 2. Daily Pricing Update (Runs daily at 1:00 AM UTC)
-- This invokes the Edge Function via pg_net to pre-warm the dynamic_pricing table
-- Requires pg_net extension

-- Enable pg_net if not enabled
-- CREATE EXTENSION IF NOT EXISTS pg_net;

SELECT cron.schedule(
  'daily-pricing-update',
  '0 1 * * *',
  $$
    -- We can call the Predict Pricing edge function for all active vehicles
    -- or simply let the edge function handle the batching if we write a specific batch endpoint.
    -- For now, we schedule a HTTP POST to a generic cron endpoint on the edge function (assuming we add one later),
    -- or just rely on the real-time calculation which is fast enough for now.
    -- If relying entirely on realtime, this cron job serves as a placeholder for later optimization.
    -- Example pg_net call:
    -- SELECT net.http_post(
    --     url:='https://[PROJECT_REF].supabase.co/functions/v1/predict-pricing-batch',
    --     headers:='{"Authorization": "Bearer [SERVICE_ROLE_KEY]"}'::jsonb
    -- );
  $$
);
