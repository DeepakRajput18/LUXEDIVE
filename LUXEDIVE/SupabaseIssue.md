security error -

Table `public.admin_roles` is public, but RLS has not been enabled.



Table `public.add_ons` is public, but RLS has not been enabled.



Table `public.webhook_retries` is public, but RLS has not been enabled.



Table `public.profiles` is public, but RLS has not been enabled.



Table `public.location_tracking` is public, but RLS has not been enabled.



Table `public.api_rate_limits` is public, but RLS has not been enabled.



Table `public.ticket_responses` is public, but RLS has not been enabled.



Table `public.payment_gateways` is public, but RLS has not been enabled.



View `public.active_bookings_summary` is defined with the SECURITY DEFINER property



View `public.car_performance` is defined with the SECURITY DEFINER property



View `public.revenue_summary` is defined with the SECURITY DEFINER property



Function `public.process_webhook_retries` has a role mutable search_path



Function `public.check_admin_permission` has a role mutable search_path



Function `public.get_user_dashboard_stats` has a role mutable search_path



Function `public.calculate_booking_price` has a role mutable search_path



Function `public.check_rate_limit` has a role mutable search_path



Function `public.update_updated_at_column` has a role mutable search_path



Function `public.submit_vehicle_checklist` has a role mutable search_path



Function `public.calculate_booking_price` has a role mutable search_path



Function `public.get_booking_invoices` has a role mutable search_path



Function `public.process_waitlist_queue` has a role mutable search_path



Function `public.fetch_similar_cars` has a role mutable search_path



Function `public.generate_ticket_number` has a role mutable search_path



Function `public.generate_booking_number` has a role mutable search_path



Function `public.request_booking_extension` has a role mutable search_path



Function `public.use_membership_benefit` has a role mutable search_path



Function `public.check_driver_availability` has a role mutable search_path



Function `public.calculate_refund` has a role mutable search_path



Function `public.request_booking_extension` has a role mutable search_path



Function `public.check_car_availability` has a role mutable search_path



Function `public.update_car_stats` has a role mutable search_path



Function `public.trigger_email_webhook` has a role mutable search_path



Function `public.update_car_availability` has a role mutable search_path



Function `public.add_balance` has a role mutable search_path



Function `public.get_available_cars` has a role mutable search_path



Function `public.check_car_availability_detailed` has a role mutable search_path



Function `public.get_admin_stats` has a role mutable search_path



Function `public.deduct_balance` has a role mutable search_path



Function `public.submit_vehicle_checklist` has a role mutable search_path



Function `public.notify_damage_dispute` has a role mutable search_path



Function `public.lookup_pincode` has a role mutable search_path



Function `public.update_car_rating` has a role mutable search_path



Function `public.log_booking_modification` has a role mutable search_path



Extension `btree_gist` is installed in the public schema. Move it to another schema.



Extension `pg_net` is installed in the public schema. Move it to another schema.



Materialized view `public.mv_admin_stats` is selectable by anon or authenticated roles



Table `public.consultations` has an RLS policy `Public request consultation` for `INSERT` that allows unrestricted access (WITH CHECK clause is always true). This effectively bypasses row-level security for -.



Table `public.corporate_leads` has an RLS policy `Public insert leads` for `INSERT` that allows unrestricted access (WITH CHECK clause is always true). This effectively bypasses row-level security for -.



Table `public.job_applications` has an RLS policy `Public apply for jobs` for `INSERT` that allows unrestricted access (WITH CHECK clause is always true). This effectively bypasses row-level security for -.



Table `public.job_applications` has an RLS policy `Public apply jobs` for `INSERT` that allows unrestricted access (WITH CHECK clause is always true). This effectively bypasses row-level security for -.



Table `public.notifications` has an RLS policy `System can create notifications` for `INSERT` that allows unrestricted access (WITH CHECK clause is always true). This effectively bypasses row-level security for authenticated.


Performance issue - 

Table `public.notification_deliveries` has a row level security policy `Admin view deliveries` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.wishlists` has a row level security policy `User manage wishlist` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.locations` has a row level security policy `Admin full access locations` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.addons` has a row level security policy `Admins can manage add-ons` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.notifications` has a row level security policy `Users can update own notifications` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.notifications` has a row level security policy `Users can view own notifications` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.drivers` has a row level security policy `Admin full access drivers` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.drivers` has a row level security policy `Admins can manage drivers` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.support_tickets` has a row level security policy `Admins can view all tickets` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.support_tickets` has a row level security policy `User create ticket` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.support_tickets` has a row level security policy `User view own tickets` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.support_tickets` has a row level security policy `Users can create tickets` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.support_tickets` has a row level security policy `Users can view own tickets` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.wishlist` has a row level security policy `Users can manage own wishlist` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.reviews` has a row level security policy `User create review` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.reviews` has a row level security policy `Users can create reviews` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.reviews` has a row level security policy `Users can create reviews for own bookings` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.cars` has a row level security policy `Admin full access cars` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.payments` has a row level security policy `Admin read all payments` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.payments` has a row level security policy `Users read own payments` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.users` has a row level security policy `Admin read all users` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.users` has a row level security policy `Users can update own profile` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.users` has a row level security policy `Users can view own profile` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.users` has a row level security policy `Users read own profile` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.users` has a row level security policy `Users update own profile safe` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.damage_disputes` has a row level security policy `Users can view disputes for own bookings` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.damage_disputes` has a row level security policy `Users create disputes` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.damage_disputes` has a row level security policy `Users view own disputes` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.vehicle_checklists` has a row level security policy `Admins/Drivers create checklists` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.vehicle_checklists` has a row level security policy `Users can create checklists for own bookings` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.vehicle_checklists` has a row level security policy `Users can view checklists for own bookings` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.booking_extensions` has a row level security policy `Users can request extensions for own bookings` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.booking_extensions` has a row level security policy `Users can view extensions for own bookings` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.booking_extensions` has a row level security policy `Users request extensions` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.booking_extensions` has a row level security policy `Users view own extensions` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.user_addresses` has a row level security policy `Users can delete own addresses` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.user_addresses` has a row level security policy `Users can insert own addresses` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.user_addresses` has a row level security policy `Users can update own addresses` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.user_addresses` has a row level security policy `Users can view own addresses` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.user_addresses` has a row level security policy `Users manage own addresses` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.fines` has a row level security policy `Users view own fines` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.saved_payment_methods` has a row level security policy `Users can manage own payment methods` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.saved_payment_methods` has a row level security policy `Users can view own payment methods` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.saved_payment_methods` has a row level security policy `Users manage own methods` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.cookie_consents` has a row level security policy `Users manage own consents` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.cookie_consents` has a row level security policy `Users manage own cookie consent` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.booking_modifications` has a row level security policy `Users view own booking mods` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.booking_modifications` has a row level security policy `Users view own modifications` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.system_logs` has a row level security policy `Admins view system logs` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.gift_cards` has a row level security policy `Users view own gift cards` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.referrals` has a row level security policy `Users create referrals` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.referrals` has a row level security policy `Users view own referrals` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.price_alerts` has a row level security policy `Users manage own alerts` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.price_alerts` has a row level security policy `Users manage price alerts` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.bookings` has a row level security policy `Admin full access bookings` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.bookings` has a row level security policy `Users can insert own bookings` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.bookings` has a row level security policy `Users can view own bookings` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.bookings` has a row level security policy `Users create own bookings` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.bookings` has a row level security policy `Users read own bookings` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.waitlist` has a row level security policy `Users can join waitlist` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.waitlist` has a row level security policy `Users can view own waitlist` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.waitlist` has a row level security policy `Users manage own waitlist` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.blog_posts` has a row level security policy `Admins manage posts` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.memberships` has a row level security policy `Users view own membership` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.user_gallery` has a row level security policy `Users manage own photos` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.user_gallery` has a row level security policy `Users upload photos` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.user_gallery` has a row level security policy `Users upload to gallery` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.corporate_leads` has a row level security policy `Admins view leads` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.consultations` has a row level security policy `Admins manage consultations` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.consultations` has a row level security policy `Users view own consultations` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.job_applications` has a row level security policy `Admins view applications` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.ticket_messages` has a row level security policy `Users can post messages to own tickets` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.ticket_messages` has a row level security policy `Users can view messages for own tickets` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.notification_preferences` has a row level security policy `User update prefs` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.notification_preferences` has a row level security policy `User view prefs` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.membership_benefit_usage` has a row level security policy `User read usage` that re-evaluates current_setting() or auth.<function>() for each row. This produces suboptimal query performance at scale. Resolve the issue by replacing `auth.<function>()` with `(select auth.<function>())`. See [docs](https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select) for more info.



Table `public.addons` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Admins can manage add-ons","Anyone can view add-ons"}`



Table `public.blog_posts` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Admins manage posts","Public read published posts","Public view published posts"}`



Table `public.blog_posts` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Admins manage posts","Public read published posts","Public view published posts"}`



Table `public.blog_posts` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Admins manage posts","Public read published posts","Public view published posts"}`



Table `public.blog_posts` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Admins manage posts","Public read published posts","Public view published posts"}`



Table `public.booking_extensions` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"Users can request extensions for own bookings","Users request extensions"}`



Table `public.booking_extensions` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Users can view extensions for own bookings","Users view own extensions"}`



Table `public.booking_extensions` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Users can request extensions for own bookings","Users request extensions"}`



Table `public.booking_extensions` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Users can view extensions for own bookings","Users view own extensions"}`



Table `public.booking_extensions` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"Users can request extensions for own bookings","Users request extensions"}`



Table `public.booking_extensions` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Users can view extensions for own bookings","Users view own extensions"}`



Table `public.booking_extensions` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"Users can request extensions for own bookings","Users request extensions"}`



Table `public.booking_extensions` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Users can view extensions for own bookings","Users view own extensions"}`



Table `public.booking_modifications` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Users view own booking mods","Users view own modifications"}`



Table `public.booking_modifications` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Users view own booking mods","Users view own modifications"}`



Table `public.booking_modifications` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Users view own booking mods","Users view own modifications"}`



Table `public.booking_modifications` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Users view own booking mods","Users view own modifications"}`



Table `public.bookings` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Admin full access bookings","Users can insert own bookings","Users create own bookings"}`



Table `public.bookings` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Admin full access bookings","Users can view own bookings","Users read own bookings"}`



Table `public.cars` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Public can view cars","Public read cars"}`



Table `public.cars` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Admin full access cars","Public can view cars","Public read cars"}`



Table `public.cars` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Public can view cars","Public read cars"}`



Table `public.cars` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Public can view cars","Public read cars"}`



Table `public.consultations` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"Admins manage consultations","Public request consultation"}`



Table `public.consultations` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Admins manage consultations","Users view own consultations"}`



Table `public.consultations` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Admins manage consultations","Public request consultation"}`



Table `public.consultations` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Admins manage consultations","Users view own consultations"}`



Table `public.consultations` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"Admins manage consultations","Public request consultation"}`



Table `public.consultations` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Admins manage consultations","Users view own consultations"}`



Table `public.consultations` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"Admins manage consultations","Public request consultation"}`



Table `public.consultations` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Admins manage consultations","Users view own consultations"}`



Table `public.cookie_consents` has multiple permissive policies for role `anon` for action `DELETE`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `anon` for action `UPDATE`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `authenticated` for action `DELETE`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `authenticated` for action `UPDATE`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `authenticator` for action `DELETE`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `authenticator` for action `UPDATE`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `dashboard_user` for action `DELETE`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.cookie_consents` has multiple permissive policies for role `dashboard_user` for action `UPDATE`. Policies include `{"Users manage own consents","Users manage own cookie consent"}`



Table `public.damage_disputes` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Users can view disputes for own bookings","Users view own disputes"}`



Table `public.damage_disputes` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Users can view disputes for own bookings","Users view own disputes"}`



Table `public.damage_disputes` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Users can view disputes for own bookings","Users view own disputes"}`



Table `public.damage_disputes` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Users can view disputes for own bookings","Users view own disputes"}`



Table `public.drivers` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Admin full access drivers","Public read drivers"}`



Table `public.drivers` has multiple permissive policies for role `authenticated` for action `DELETE`. Policies include `{"Admin full access drivers","Admins can manage drivers"}`



Table `public.drivers` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Admin full access drivers","Admins can manage drivers"}`



Table `public.drivers` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Admin full access drivers","Admins can manage drivers","Public read drivers"}`



Table `public.drivers` has multiple permissive policies for role `authenticated` for action `UPDATE`. Policies include `{"Admin full access drivers","Admins can manage drivers"}`



Table `public.drivers` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Admin full access drivers","Public read drivers"}`



Table `public.drivers` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Admin full access drivers","Public read drivers"}`



Table `public.job_applications` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"Public apply for jobs","Public apply jobs"}`



Table `public.job_applications` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Public apply for jobs","Public apply jobs"}`



Table `public.job_applications` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"Public apply for jobs","Public apply jobs"}`



Table `public.job_applications` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"Public apply for jobs","Public apply jobs"}`



Table `public.locations` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Admin full access locations","Anyone can view locations","Public read locations"}`



Table `public.locations` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Admin full access locations","Anyone can view locations","Public read locations"}`



Table `public.locations` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Admin full access locations","Anyone can view locations","Public read locations"}`



Table `public.locations` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Admin full access locations","Anyone can view locations","Public read locations"}`



Table `public.payments` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Admin read all payments","Users read own payments"}`



Table `public.price_alerts` has multiple permissive policies for role `anon` for action `DELETE`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `anon` for action `UPDATE`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `authenticated` for action `DELETE`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `authenticated` for action `UPDATE`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `authenticator` for action `DELETE`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `authenticator` for action `UPDATE`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `dashboard_user` for action `DELETE`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.price_alerts` has multiple permissive policies for role `dashboard_user` for action `UPDATE`. Policies include `{"Users manage own alerts","Users manage price alerts"}`



Table `public.reviews` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"User create review","Users can create reviews"}`



Table `public.reviews` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Anyone can view reviews","Public can view reviews","Public read reviews"}`



Table `public.reviews` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"User create review","Users can create reviews","Users can create reviews for own bookings"}`



Table `public.reviews` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Anyone can view reviews","Public can view reviews","Public read reviews"}`



Table `public.reviews` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"User create review","Users can create reviews"}`



Table `public.reviews` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Anyone can view reviews","Public can view reviews","Public read reviews"}`



Table `public.reviews` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"User create review","Users can create reviews"}`



Table `public.reviews` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Anyone can view reviews","Public can view reviews","Public read reviews"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `anon` for action `DELETE`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Users can manage own payment methods","Users can view own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `anon` for action `UPDATE`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `authenticated` for action `DELETE`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Users can manage own payment methods","Users can view own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `authenticated` for action `UPDATE`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `authenticator` for action `DELETE`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Users can manage own payment methods","Users can view own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `authenticator` for action `UPDATE`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `dashboard_user` for action `DELETE`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Users can manage own payment methods","Users can view own payment methods","Users manage own methods"}`



Table `public.saved_payment_methods` has multiple permissive policies for role `dashboard_user` for action `UPDATE`. Policies include `{"Users can manage own payment methods","Users manage own methods"}`



Table `public.support_tickets` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"User create ticket","Users can create tickets"}`



Table `public.support_tickets` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"User view own tickets","Users can view own tickets"}`



Table `public.support_tickets` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Admins can view all tickets","User create ticket","Users can create tickets"}`



Table `public.support_tickets` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Admins can view all tickets","User view own tickets","Users can view own tickets"}`



Table `public.support_tickets` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"User create ticket","Users can create tickets"}`



Table `public.support_tickets` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"User view own tickets","Users can view own tickets"}`



Table `public.support_tickets` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"User create ticket","Users can create tickets"}`



Table `public.support_tickets` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"User view own tickets","Users can view own tickets"}`



Table `public.user_addresses` has multiple permissive policies for role `anon` for action `DELETE`. Policies include `{"Users can delete own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"Users can insert own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Users can view own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `anon` for action `UPDATE`. Policies include `{"Users can update own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `authenticated` for action `DELETE`. Policies include `{"Users can delete own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Users can insert own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Users can view own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `authenticated` for action `UPDATE`. Policies include `{"Users can update own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `authenticator` for action `DELETE`. Policies include `{"Users can delete own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"Users can insert own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Users can view own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `authenticator` for action `UPDATE`. Policies include `{"Users can update own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `dashboard_user` for action `DELETE`. Policies include `{"Users can delete own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"Users can insert own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Users can view own addresses","Users manage own addresses"}`



Table `public.user_addresses` has multiple permissive policies for role `dashboard_user` for action `UPDATE`. Policies include `{"Users can update own addresses","Users manage own addresses"}`



Table `public.user_gallery` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"Users upload photos","Users upload to gallery"}`



Table `public.user_gallery` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Public read approved gallery","Public view approved gallery"}`



Table `public.user_gallery` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Users upload photos","Users upload to gallery"}`



Table `public.user_gallery` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Public read approved gallery","Public view approved gallery"}`



Table `public.user_gallery` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"Users upload photos","Users upload to gallery"}`



Table `public.user_gallery` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Public read approved gallery","Public view approved gallery"}`



Table `public.user_gallery` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"Users upload photos","Users upload to gallery"}`



Table `public.user_gallery` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Public read approved gallery","Public view approved gallery"}`



Table `public.users` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Admin read all users","Users can view own profile","Users read own profile"}`



Table `public.users` has multiple permissive policies for role `authenticated` for action `UPDATE`. Policies include `{"Users can update own profile","Users update own profile safe"}`



Table `public.vehicle_checklists` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"Admins/Drivers create checklists","Users can create checklists for own bookings"}`



Table `public.vehicle_checklists` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Public read checklists","Users can view checklists for own bookings"}`



Table `public.vehicle_checklists` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Admins/Drivers create checklists","Users can create checklists for own bookings"}`



Table `public.vehicle_checklists` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Public read checklists","Users can view checklists for own bookings"}`



Table `public.vehicle_checklists` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"Admins/Drivers create checklists","Users can create checklists for own bookings"}`



Table `public.vehicle_checklists` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Public read checklists","Users can view checklists for own bookings"}`



Table `public.vehicle_checklists` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"Admins/Drivers create checklists","Users can create checklists for own bookings"}`



Table `public.vehicle_checklists` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Public read checklists","Users can view checklists for own bookings"}`



Table `public.waitlist` has multiple permissive policies for role `anon` for action `INSERT`. Policies include `{"Users can join waitlist","Users manage own waitlist"}`



Table `public.waitlist` has multiple permissive policies for role `anon` for action `SELECT`. Policies include `{"Users can view own waitlist","Users manage own waitlist"}`



Table `public.waitlist` has multiple permissive policies for role `authenticated` for action `INSERT`. Policies include `{"Users can join waitlist","Users manage own waitlist"}`



Table `public.waitlist` has multiple permissive policies for role `authenticated` for action `SELECT`. Policies include `{"Users can view own waitlist","Users manage own waitlist"}`



Table `public.waitlist` has multiple permissive policies for role `authenticator` for action `INSERT`. Policies include `{"Users can join waitlist","Users manage own waitlist"}`



Table `public.waitlist` has multiple permissive policies for role `authenticator` for action `SELECT`. Policies include `{"Users can view own waitlist","Users manage own waitlist"}`



Table `public.waitlist` has multiple permissive policies for role `dashboard_user` for action `INSERT`. Policies include `{"Users can join waitlist","Users manage own waitlist"}`



Table `public.waitlist` has multiple permissive policies for role `dashboard_user` for action `SELECT`. Policies include `{"Users can view own waitlist","Users manage own waitlist"}`



Table `public.bookings` has identical indexes {idx_bookings_status,idx_bookings_status_only}. Drop all except one of them



Table `public.bookings` has identical indexes {idx_bookings_user,idx_bookings_user_id}. Drop all except one of them


