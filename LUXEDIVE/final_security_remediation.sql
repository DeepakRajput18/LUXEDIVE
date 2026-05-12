-- =========================================
-- LUXEDRIVE FINAL SECURITY REMEDIATION
-- Date: 2026-01-28
-- Description: Targeted fixes for remaining RLS, Function hardening, and Security policies.
-- SAFE MODE: Preserves existing data and functionality.
-- =========================================

-- SECTION 1: Review & Fix "FOR ALL" Policies (Explicit WITH CHECK)
-- Adding explicit WITH CHECK clauses to ensure write permissions are clear.

-- 1.1 Add-ons (Admin Manage)
DROP POLICY IF EXISTS "Admins manage add_ons" ON public.add_ons;
CREATE POLICY "Admins manage add_ons" ON public.add_ons 
FOR ALL 
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND admin_role_id IS NOT NULL)
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND admin_role_id IS NOT NULL)
);

-- 1.2 Payment Gateways (Admin Manage)
DROP POLICY IF EXISTS "Admins manage gateways" ON public.payment_gateways;
CREATE POLICY "Admins manage gateways" ON public.payment_gateways 
FOR ALL 
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND admin_role_id IS NOT NULL)
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND admin_role_id IS NOT NULL)
);


-- SECTION 2: Fix location_tracking RLS
-- Requirements: Owners SELECT own, Admins SELECT all, Public SELECT active only.

ALTER TABLE IF EXISTS public.location_tracking ENABLE ROW LEVEL SECURITY;

-- 2.1 Public Read Active (Scoped to anon/authenticated to avoid internal leakage)
DROP POLICY IF EXISTS "Public read active tracking" ON public.location_tracking;
CREATE POLICY "Public read active tracking" ON public.location_tracking 
FOR SELECT 
TO anon, authenticated
USING (is_active = true);

-- 2.2 Technicians/Owners Insert/Update (Keep existing logic but ensure WITH CHECK)
DROP POLICY IF EXISTS "Technicians update own tracking" ON public.location_tracking;
CREATE POLICY "Technicians update own tracking" ON public.location_tracking 
FOR ALL
TO authenticated
USING ( (select auth.uid()) = trackable_id )
WITH CHECK ( (select auth.uid()) = trackable_id );

-- 2.3 Admins Select All
DROP POLICY IF EXISTS "Admins view all tracking" ON public.location_tracking;
CREATE POLICY "Admins view all tracking" ON public.location_tracking 
FOR SELECT
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = (select auth.uid()) AND admin_role_id IS NOT NULL)
);


-- SECTION 3: Explicit Function Hardening (NO LOOPS)
-- Replacing generic loops with explicit ALTER FUNCTION statements for critical RPCs.
-- Setting search_path to public, pg_catalog, pg_temp to prevent hijacking.

ALTER FUNCTION public.process_webhook_retries() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.check_admin_permission(uuid, text, text) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.get_user_dashboard_stats(uuid) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.calculate_booking_price(uuid, timestamptz, timestamptz, jsonb) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.check_rate_limit(text, text, integer, integer) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.update_updated_at_column() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.submit_vehicle_checklist(jsonb) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.get_booking_invoices(uuid) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.process_waitlist_queue(uuid) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.fetch_similar_cars(uuid) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.generate_ticket_number() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.generate_booking_number() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.request_booking_extension(uuid, timestamptz, text) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.use_membership_benefit(uuid, text) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.check_driver_availability(uuid, timestamptz, timestamptz) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.calculate_refund(uuid) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.check_car_availability(uuid, timestamptz, timestamptz) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.update_car_stats() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.trigger_email_webhook() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.update_car_availability() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.add_balance(uuid, numeric) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.get_available_cars(timestamptz, timestamptz, jsonb) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.check_car_availability_detailed(uuid, timestamptz, timestamptz, uuid) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.get_admin_stats() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.deduct_balance(uuid, numeric) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.notify_damage_dispute() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.lookup_pincode(text) SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.update_car_rating() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;
ALTER FUNCTION public.log_booking_modification() SECURITY INVOKER SET search_path = public, pg_catalog, pg_temp;


-- SECTION 4: Apply FORCE ROW LEVEL SECURITY (Strict Mode)
-- Only applying to internal/admin tables as requested. NOT applying to user/public tables.

ALTER TABLE IF EXISTS public.admin_roles FORCE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.api_rate_limits FORCE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.webhook_retries FORCE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.payment_gateways FORCE ROW LEVEL SECURITY;


-- SECTION 5: Scope Public Policies (Role Specificity)
-- Prevent internal roles from accidentally relying on 'public' policies meant for users.

-- 5.1 Add-ons Read
DROP POLICY IF EXISTS "Public read add_ons" ON public.add_ons;
CREATE POLICY "Public read add_ons" ON public.add_ons 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- 5.2 Payment Gateways Read
DROP POLICY IF EXISTS "Public read active gateways" ON public.payment_gateways;
CREATE POLICY "Public read active gateways" ON public.payment_gateways 
FOR SELECT 
TO anon, authenticated 
USING (is_active = true);


-- SECTION 6: Cleanup (Duplicate Policies)
-- Safe removal of policies that are logically covered by stricter or newer ones.

-- Remove old 'Users view own profile' if 'Users read own profile' exists (keeping the performance optimized one)
-- DO $$ 
-- BEGIN
--   IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users read own profile' AND tablename = 'profiles') THEN
--     DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
--   END IF;
-- END $$;


-- SECTION 7: Read-Only Locks
-- Explicitly revoking Write permissions for roles that should only Read specific logs/responses.

-- 7.1 Ticket Responses (Immutable for users, Admins might need to update/delete technically but let's restrict typical access)
-- Assuming 'Users see own ticket responses' is SELECT only.
-- Ensure no INSERT/UPDATE/DELETE policy exists for 'authenticated' on ticket_responses EXCEPT for the Support flow which might use a function/trigger.
-- If ticket_responses needs INSERT, we handle it. But fixing "Read-Only" usually means preventing direct UPDATE.
REVOKE UPDATE, DELETE ON public.ticket_responses FROM anon, authenticated;
-- (Service role and Admins via RLS might still need access, doing it via REVOKE safeguards defaults)


-- =========================================
-- END OF FINAL SECURITY REMEDIATION
-- =========================================
