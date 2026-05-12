-- =========================================
-- LUXEDRIVE SECURITY AUDIT FIX
-- Date: 2026-01-28
-- =========================================

-- SECTION 1: Enable RLS on Unprotected Tables

-- 1.1 admin_roles
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read admin_roles" ON public.admin_roles 
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 1.2 add_ons
ALTER TABLE public.add_ons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read add_ons" ON public.add_ons FOR SELECT USING (true);
CREATE POLICY "Admins manage add_ons" ON public.add_ons FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 1.3 webhook_retries
ALTER TABLE public.webhook_retries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only webhook_retries" ON public.webhook_retries FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 1.4 profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Admins read all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 1.5 location_tracking
ALTER TABLE public.location_tracking ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active tracking" ON public.location_tracking FOR SELECT USING (is_active = true);
CREATE POLICY "Technicians update own tracking" ON public.location_tracking FOR INSERT WITH CHECK (
  -- Assuming trackable_id links to auth.uid() for technicians, or strictly service role for device inputs
  -- For now, allowing authenticated users if they match trackable_id (broad interpretation)
  auth.uid() = trackable_id 
);

-- 1.6 api_rate_limits
ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only rate_limits" ON public.api_rate_limits FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 1.7 ticket_responses
ALTER TABLE public.ticket_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own ticket responses" ON public.ticket_responses FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.support_tickets 
    WHERE id = ticket_responses.ticket_id AND user_id = auth.uid()
  )
);
CREATE POLICY "Admins see all ticket responses" ON public.ticket_responses FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 1.8 payment_gateways
ALTER TABLE public.payment_gateways ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active gateways" ON public.payment_gateways FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage gateways" ON public.payment_gateways FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);


-- SECTION 2: Fix Insecure Views
-- We use ALTER VIEW SET (security_invoker = true) which is the modern standard to enforce RLS
-- If not supported, we would recreate. Assuming Supabase PG15+.

ALTER VIEW public.active_bookings_summary SET (security_invoker = true);
ALTER VIEW public.car_performance SET (security_invoker = true);
ALTER VIEW public.revenue_summary SET (security_invoker = true);


-- SECTION 3: Secure Functions (Remove Mutable search_path)
-- Setting search_path to public,pg_catalog prevents schema hijacking
-- Security Invoker ensures function runs with caller's permissions (not owner's)

ALTER FUNCTION public.process_webhook_retries() SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.check_admin_permission(uuid, text, text) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.get_user_dashboard_stats(uuid) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.calculate_booking_price(uuid, timestamptz, timestamptz, jsonb) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.check_rate_limit(text, text, integer, integer) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.update_updated_at_column() SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.submit_vehicle_checklist(jsonb) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.get_booking_invoices(uuid) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.process_waitlist_queue(uuid) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.fetch_similar_cars(uuid) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.generate_ticket_number() SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.generate_booking_number() SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.request_booking_extension(uuid, timestamptz, text) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.use_membership_benefit(uuid, text) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.check_driver_availability(uuid, timestamptz, timestamptz) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.calculate_refund(uuid) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.check_car_availability(uuid, timestamptz, timestamptz) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.update_car_stats() SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.trigger_email_webhook() SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.update_car_availability() SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.add_balance(uuid, numeric) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.get_available_cars(timestamptz, timestamptz, jsonb) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.check_car_availability_detailed(uuid, timestamptz, timestamptz, uuid) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.get_admin_stats() SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.deduct_balance(uuid, numeric) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.notify_damage_dispute() SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.lookup_pincode(text) SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.update_car_rating() SECURITY INVOKER SET search_path = public, pg_catalog;
ALTER FUNCTION public.log_booking_modification() SECURITY INVOKER SET search_path = public, pg_catalog;


-- SECTION 4: Move Extensions to Proper Schema

CREATE SCHEMA IF NOT EXISTS extensions;
ALTER EXTENSION btree_gist SET SCHEMA extensions;
ALTER EXTENSION pg_net SET SCHEMA extensions;


-- SECTION 5: Restrict Materialized View Access

REVOKE ALL ON public.mv_admin_stats FROM anon, authenticated;
GRANT SELECT ON public.mv_admin_stats TO service_role;
-- Access strictly via RPC or Admin dashboard via service role


-- SECTION 6: Tighten Overly Permissive Policies

-- 6.1 Consultations
DROP POLICY IF EXISTS "Public request consultation" ON public.consultations;
CREATE POLICY "Public request consultation restricted" ON public.consultations FOR INSERT WITH CHECK (
  email ~* '^.+@.+\..+$' AND phone IS NOT NULL
);

-- 6.2 Corporate Leads
DROP POLICY IF EXISTS "Public insert leads" ON public.corporate_leads;
CREATE POLICY "Public insert leads restricted" ON public.corporate_leads FOR INSERT WITH CHECK (
  company_name IS NOT NULL AND contact_email ~* '^.+@.+\..+$'
);

-- 6.3 Job Applications
DROP POLICY IF EXISTS "Public apply for jobs" ON public.job_applications;
DROP POLICY IF EXISTS "Public apply jobs" ON public.job_applications; -- Remove duplicate
CREATE POLICY "Public apply jobs restricted" ON public.job_applications FOR INSERT WITH CHECK (
  resume_url IS NOT NULL AND email ~* '^.+@.+\..+$'
);

-- 6.4 Notifications
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;
CREATE POLICY "System create notifications" ON public.notifications FOR INSERT TO service_role WITH CHECK (true);


-- SECTION 7: Verification Queries
-- (Commented out to prevent execution errors in migration runner, run manually if needed)
-- select * from pg_tables where schemaname = 'public' and rowsecurity = false;
-- select rolname, proname, proconfig from pg_proc join pg_roles on proowner = pg_roles.oid where proconfig is null and proname in ('process_webhook_retries');
