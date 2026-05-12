-- =========================================
-- LUXEDRIVE PERFORMANCE & SECURITY FIX
-- Date: 2026-01-28
-- Details: Addressing Suboptimal Query Performance calls to auth.uid()
-- =========================================

-- SECTION E: Performance Improvements (RLS Optimization)
-- Replacing `auth.uid()` with `(select auth.uid())` forces Postgres to treat the value as a stable constant 
-- for the query duration, rather than re-evaluating it for every row (Volatility issue).

-- 1. Optimize Bookings Policies
drop policy if exists "Users read own bookings" on public.bookings;
create policy "Users read own bookings" on public.bookings for select using (
  user_id = (select auth.uid())
);

drop policy if exists "Users create own bookings" on public.bookings;
create policy "Users create own bookings" on public.bookings for insert with check (
  user_id = (select auth.uid())
);

drop policy if exists "Users can view own bookings" on public.bookings; -- Duplicate cleanup
drop policy if exists "Users view own bookings" on public.bookings; -- Duplicate cleanup

-- 2. Optimize Users Policies
drop policy if exists "Users read own profile" on public.users;
create policy "Users read own profile" on public.users for select using (
  id = (select auth.uid())
);

drop policy if exists "Users update own profile safe" on public.users;
create policy "Users update own profile safe" on public.users for update using (
  id = (select auth.uid())
);

-- 3. Optimize Reviews Policies
drop policy if exists "Public read reviews" on public.reviews;
create policy "Public read reviews" on public.reviews for select using (true); 
-- Note: 'Public read' doesn't use auth.uid(), keeping as is for clarity

drop policy if exists "Users create reviews for own bookings" on public.reviews;
create policy "Users create reviews for own bookings" on public.reviews for insert with check (
  exists (
    select 1 from public.bookings
    where id = reviews.booking_id
      and user_id = (select auth.uid())
  )
);

-- 4. Optimize Notification Deliveries (Admin Check)
drop policy if exists "Admin view deliveries" on public.notification_deliveries;
create policy "Admin view deliveries" on public.notification_deliveries for select using (
  exists (
    select 1 from public.users 
    where id = (select auth.uid()) 
      and admin_role_id is not null -- Assuming admin check logic matches schema
  )
);

-- 5. Optimize Waitlist
drop policy if exists "Users manage own waitlist" on public.waitlist;
create policy "Users manage own waitlist" on public.waitlist for all using (
  user_id = (select auth.uid())
);

-- 6. Optimize Payment Methods
drop policy if exists "Users manage own methods" on public.saved_payment_methods;
create policy "Users manage own methods" on public.saved_payment_methods for all using (
  user_id = (select auth.uid())
);


-- SECTION F: Index Cleanup (Verification)
-- Dropping identical indexes if they still exist (Idempotent)

drop index if exists public.idx_bookings_status_only;
drop index if exists public.idx_bookings_user; -- Keep idx_bookings_user_id (standard naming)

-- Ensure we have the correct indexes
-- idx_bookings_user_id should exist
create index if not exists idx_bookings_user_id on public.bookings(user_id);
-- idx_bookings_status should exist
create index if not exists idx_bookings_status on public.bookings(status);


-- SECTION G: Final Policy Tightening (Explicit Insert Checks)
-- Ensuring we don't have "WITH CHECK (true)" for insert if noted in security audit

-- Consultations (Already fixed in 018 but reinforcing)
drop policy if exists "Public request consultation" on public.consultations;
create policy "Public request consultation restricted" on public.consultations for insert with check (
  email is not null and email ~* '^.+@.+\..+$'
);

-- Global Verification
-- Select policies to ensure optimizations applied
-- select * from pg_policies where policyname in ('Users read own bookings', 'Users read own profile');
