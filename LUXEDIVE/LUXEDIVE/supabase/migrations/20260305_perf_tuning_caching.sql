-- ============================================================
-- LUXEDIVE: Database Performance Tuning & Caching
-- ============================================================

-- 1. Create Query Cache Table (Layer 2)
CREATE TABLE IF NOT EXISTS public.query_cache (
    cache_key TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and restrict to service role
ALTER TABLE public.query_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "query_cache_service_role_only"
    ON public.query_cache
    AS PERMISSIVE
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 2. Create Query Performance Logs Table
CREATE TABLE IF NOT EXISTS public.query_performance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_text TEXT NOT NULL,
    execution_time_ms NUMERIC NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and restrict to service role
ALTER TABLE public.query_performance_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "query_performance_logs_service_role_only"
    ON public.query_performance_logs
    AS PERMISSIVE
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- 3. Create Materialized Views for Analytics
-- Drop if exists (in case of re-run)
DROP MATERIALIZED VIEW IF EXISTS public.admin_dashboard_stats;
DROP MATERIALIZED VIEW IF EXISTS public.vehicle_popularity_mv;

-- 3a. Admin Dashboard Stats MV
CREATE MATERIALIZED VIEW public.admin_dashboard_stats AS
SELECT
    DATE(created_at) as day,
    COUNT(*) as total_bookings,
    SUM(total_amount) as daily_revenue,
    COUNT(DISTINCT user_id) as active_users
FROM public.bookings
WHERE status = 'confirmed'
GROUP BY DATE(created_at);

-- Create index on the materialized view for faster querying
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_dashboard_stats_day ON public.admin_dashboard_stats(day);


-- 3b. Vehicle Popularity MV
CREATE MATERIALIZED VIEW public.vehicle_popularity_mv AS
SELECT
    car_id as vehicle_id,
    COUNT(*) as bookings_count,
    SUM(total_amount) as revenue_generated
FROM public.bookings
WHERE status = 'confirmed'
GROUP BY car_id;

-- Create index on the materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_vehicle_popularity_mv_vid ON public.vehicle_popularity_mv(vehicle_id);


-- 4. Database Index Optimization
-- Vehicles Table
CREATE INDEX IF NOT EXISTS idx_vehicle_category ON public.cars(category);
CREATE INDEX IF NOT EXISTS idx_vehicle_price ON public.cars(daily_rate);

-- Bookings Table
CREATE INDEX IF NOT EXISTS idx_booking_vehicle ON public.bookings(car_id);
CREATE INDEX IF NOT EXISTS idx_booking_dates ON public.bookings(pickup_datetime, dropoff_datetime);

-- Analytics Events (Skipped: table 'user_behavior_events' not found in current schema)
-- CREATE INDEX IF NOT EXISTS idx_event_vehicle ON public.user_behavior_events(vehicle_id);
-- CREATE INDEX IF NOT EXISTS idx_event_time ON public.user_behavior_events(timestamp);


-- 5. Automate Maintenance via pg_cron (Assuming pg_cron is enabled)
-- Ensure extension is enabled if possible via sql (usually requires superuser, may fail silently if not allowed, safe to run via dashboard)
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Refresh Materialized Views (Hourly)
SELECT cron.schedule(
  'refresh_admin_dashboard_stats',
  '0 * * * *',
  $$ REFRESH MATERIALIZED VIEW CONCURRENTLY public.admin_dashboard_stats; $$
);

SELECT cron.schedule(
  'refresh_vehicle_popularity_mv',
  '0 * * * *',
  $$ REFRESH MATERIALIZED VIEW CONCURRENTLY public.vehicle_popularity_mv; $$
);

-- Daily VACUUM ANALYZE (Daily at 2:00 AM)
SELECT cron.schedule(
  'daily_vacuum_analyze',
  '0 2 * * *',
  $$ 
    VACUUM ANALYZE public.cars;
    VACUUM ANALYZE public.bookings;
    VACUUM ANALYZE public.user_behavior_events;
  $$
);

-- Note: To track query execution times > 500ms natively in PG, 
-- you would typically enable pg_stat_statements and set log_min_duration_statement = 500
-- This must be done via Supabase Dashboard -> Database -> Settings > Postgres settings.
-- We simulate logging in the application backend if needed or use the native logs setup.
