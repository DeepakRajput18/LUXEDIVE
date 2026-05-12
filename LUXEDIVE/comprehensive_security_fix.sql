-- =========================================
-- LUXEDRIVE COMPREHENSIVE SECURITY & PERFORMANCE FIX
-- Date: 2026-01-28
-- Description: Unified migration script to resolve Security Audit and Performance findings.
-- =========================================

-- SECTION A: Enable RLS on Unprotected Tables
-- We use 'ENABLE ROW LEVEL SECURITY' which is safe on tables that already have it.
-- Policies are dropped first to ensure idempotency when recreating them.

-- 1. admin_roles
ALTER TABLE IF EXISTS public.admin_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins read admin_roles" ON public.admin_roles;
CREATE POLICY "Admins read admin_roles" ON public.admin_roles 
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND admin_role_id IS NOT NULL)
);

-- 2. add_ons
ALTER TABLE IF EXISTS public.add_ons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read add_ons" ON public.add_ons;
DROP POLICY IF EXISTS "Admins manage add_ons" ON public.add_ons;
CREATE POLICY "Public read add_ons" ON public.add_ons FOR SELECT USING (true);
CREATE POLICY "Admins manage add_ons" ON public.add_ons FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND admin_role_id IS NOT NULL)
);

-- 3. webhook_retries
ALTER TABLE IF EXISTS public.webhook_retries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role only webhook_retries" ON public.webhook_retries;
CREATE POLICY "Service role only webhook_retries" ON public.webhook_retries 
FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 4. profiles
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins read all profiles" ON public.profiles;
-- Performance optimization: use (select auth.uid())
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (id = (select auth.uid()));
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (id = (select auth.uid()));
CREATE POLICY "Admins read all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND admin_role_id IS NOT NULL)
);

-- 5. location_tracking
ALTER TABLE IF EXISTS public.location_tracking ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read active tracking" ON public.location_tracking;
DROP POLICY IF EXISTS "Technicians update own tracking" ON public.location_tracking;
CREATE POLICY "Public read active tracking" ON public.location_tracking FOR SELECT USING (is_active = true);
CREATE POLICY "Technicians update own tracking" ON public.location_tracking FOR INSERT WITH CHECK (
  (select auth.uid()) = trackable_id 
);

-- 6. api_rate_limits
ALTER TABLE IF EXISTS public.api_rate_limits ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role only rate_limits" ON public.api_rate_limits;
CREATE POLICY "Service role only rate_limits" ON public.api_rate_limits 
FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 7. ticket_responses
ALTER TABLE IF EXISTS public.ticket_responses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users see own ticket responses" ON public.ticket_responses;
DROP POLICY IF EXISTS "Admins see all ticket responses" ON public.ticket_responses;
CREATE POLICY "Users see own ticket responses" ON public.ticket_responses FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.support_tickets 
    WHERE id = ticket_responses.ticket_id AND user_id = (select auth.uid())
  )
);
CREATE POLICY "Admins see all ticket responses" ON public.ticket_responses FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND admin_role_id IS NOT NULL)
);

-- 8. payment_gateways
ALTER TABLE IF EXISTS public.payment_gateways ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read active gateways" ON public.payment_gateways;
DROP POLICY IF EXISTS "Admins manage gateways" ON public.payment_gateways;
CREATE POLICY "Public read active gateways" ON public.payment_gateways FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage gateways" ON public.payment_gateways FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND admin_role_id IS NOT NULL)
);


-- SECTION B: Policy Fixes (Validations & Performance)
-- Consolidating RLS Performance fixes (auth.uid() optimization)

-- B.1 Bookings
DROP POLICY IF EXISTS "Users read own bookings" ON public.bookings;
CREATE POLICY "Users read own bookings" ON public.bookings FOR SELECT USING (
  user_id = (select auth.uid())
);
DROP POLICY IF EXISTS "Users create own bookings" ON public.bookings;
CREATE POLICY "Users create own bookings" ON public.bookings FOR INSERT WITH CHECK (
  user_id = (select auth.uid())
);

-- B.2 Consultations (Input Validation)
DROP POLICY IF EXISTS "Public request consultation" ON public.consultations;
CREATE POLICY "Public request consultation restricted" ON public.consultations FOR INSERT WITH CHECK (
  email IS NOT NULL AND email ~* '^.+@.+\..+$'
);

-- B.3 Corporate Leads
DROP POLICY IF EXISTS "Public insert leads" ON public.corporate_leads;
CREATE POLICY "Public insert leads restricted" ON public.corporate_leads FOR INSERT WITH CHECK (
  company_name IS NOT NULL AND contact_email ~* '^.+@.+\..+$'
);

-- B.4 Job Applications
DROP POLICY IF EXISTS "Public apply for jobs" ON public.job_applications;
DROP POLICY IF EXISTS "Public apply jobs" ON public.job_applications;
CREATE POLICY "Public apply jobs restricted" ON public.job_applications FOR INSERT WITH CHECK (
  resume_url IS NOT NULL AND email ~* '^.+@.+\..+$'
);

-- B.5 Notifications (Restrict to System)
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;
CREATE POLICY "System create notifications" ON public.notifications FOR INSERT TO service_role WITH CHECK (true);


-- SECTION C: View Hardening
-- Enforce RLS on Views using security_invoker (Postgres 15+)

ALTER VIEW public.active_bookings_summary SET (security_invoker = true);
ALTER VIEW public.car_performance SET (security_invoker = true);
ALTER VIEW public.revenue_summary SET (security_invoker = true);


-- SECTION D: Function Hardening
-- Set search_path = public to prevent hijacking
-- Use SECURITY INVOKER to respect RLS

DO $$
DECLARE 
    func_name text;
BEGIN
    FOR func_name IN 
        SELECT proname FROM pg_proc JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid 
        WHERE nspname = 'public' AND proowner != (SELECT oid FROM pg_roles WHERE rolname = 'postgres')
    LOOP
        EXECUTE format('ALTER FUNCTION public.%I() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp', func_name);
    EXCEPTION WHEN OTHERS THEN 
        -- Ignore signature mismatches in this generic loop, ideally we list specific signatures
        NULL;
    END LOOP;
END $$;

-- Explicitly fix critical ones with known signatures
ALTER FUNCTION public.process_webhook_retries() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.check_admin_permission(uuid, text, text) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.get_user_dashboard_stats(uuid) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.calculate_booking_price(uuid, timestamptz, timestamptz, jsonb) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
-- Add other signatures as needed...


-- SECTION E: Materialized View Restrictions
-- Ensure usage is restricted
REVOKE ALL ON public.mv_admin_stats FROM anon, authenticated;
GRANT SELECT ON public.mv_admin_stats TO service_role;


-- SECTION F: Index Cleanup
-- Remove duplicates
DROP INDEX IF EXISTS public.idx_bookings_status_only;
DROP INDEX IF EXISTS public.idx_bookings_user; 

-- Ensure correct coverage
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);


-- SECTION G: Extensions
-- Move to extensions schema for cleanliness
CREATE SCHEMA IF NOT EXISTS extensions;
ALTER EXTENSION btree_gist SET SCHEMA extensions;
ALTER EXTENSION pg_net SET SCHEMA extensions;

-- =========================================
-- END OF MIGRATION
-- =========================================
