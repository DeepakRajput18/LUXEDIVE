📋 BACKEND CONNECTION MAP - ALL 73 PAGES
DISCOVERY & SELECTION (9 Pages)
PageBackend ConnectionStatus1. Home Pagecars table (featured), get_admin_stats RPC✅ Connected2. Car Listing Pagecars table with RLS, filters via query params✅ Connected3. Advanced Search Overlaycars table full-text search using ts_vector✅ Connected4. Car Details Pagecars table by ID, fetch_similar_cars RPC✅ Connected5. Compare Cars Toolcars table (multiple IDs), frontend comparison logic✅ Connected6. How it Works GuideStatic content (no backend)✅ Static7. No Results Pagefetch_similar_cars RPC for recommendations✅ Connected8. Search Resultscars table with filters✅ Connected9. Supercar Waitlist Hubwaitlist table (create if missing)⚠️ NEW TABLE NEEDED

BOOKING JOURNEY (12 Pages)
PageBackend ConnectionStatus10. Auth Pageauth.users + trigger to profiles table✅ Connected11. Password ResetSupabase Auth resetPasswordForEmail()✅ Connected12. Account VerifiedSupabase Auth email confirmation✅ Connected13. Booking Step 1calculate_booking_price RPC✅ Connected14. Booking Step 2lookup_pincode RPC, locations table✅ Connected15. Booking Step 3addons table✅ Connected16. Booking Step 4calculate_booking_price RPC (final summary)✅ Connected17. Booking Step 5payment-link Edge Function✅ Connected18. Payment Processingpayment-webhook Edge Function listener✅ Connected19. Payment Failurepayments table status check✅ Connected20. Booking Confirmationbookings table, generate-invoice Edge Function✅ Connected

ACTIVE RENTAL UTILITIES (9 Pages)
PageBackend ConnectionStatus21. Active Rental Trackingbookings + drivers join, real-time subscription✅ Connected22. Driver & Vehicle Securitydrivers table, cars table✅ Connected23. Digital Car Manualcars.specifications JSONB field✅ Connected24. Fuel & EV FinderExternal API (Google Maps/fuel stations)⚠️ EXTERNAL API25. Roadside Support Trackersupport_tickets table + real-time updates✅ Connected26. Concierge Chatsupport_tickets + ticket_responses tables✅ Connected27. Incident Reportdamage_disputes table (create if missing)⚠️ NEW TABLE NEEDED28. Late Return Advisorybookings.dropoff_datetime check, frontend timer✅ Connected29. Car Swap & Upgradebookings.car_id update, admin approval flow✅ Connected

POST-RENTAL & ACCOUNT (22 Pages)
PageBackend ConnectionStatus30. User Dashboardget_user_dashboard_stats RPC (create if missing)⚠️ NEW RPC NEEDED31. My Bookings Listbookings table with status filters✅ Connected32. Modify Bookingbookings table update with validation✅ Connected33. Post-Rental Reviewreviews table✅ Connected34. Refund Selectionpayments.refund_method column (add if missing)⚠️ NEW COLUMN35. Refund Status Trackerpayments.refund_status enum✅ Connected36. User Walletprofiles.wallet_balance + transactions log✅ Connected37. Tax Invoice (GST)generate-invoice Edge Function (GST format)✅ Connected38. Deposit Receiptgenerate-invoice Edge Function (deposit type)✅ Connected39. Fines & Tolls Trackerfines table (create if missing)⚠️ NEW TABLE NEEDED40. Profile Settingsprofiles table✅ Connected41. Security & Activity Logauth.audit_log_entries (Supabase native)✅ Connected42. 2FA SetupSupabase Auth MFA methods✅ Connected43. Connected Accountsauth.identities table (Supabase native)✅ Connected44. Document Vault (KYC)documents storage bucket + kyc_documents table✅ Connected45. KYC Result Statekyc_documents.status enum✅ Connected46. Payment Vaultsaved_payment_methods table (create if missing)⚠️ NEW TABLE NEEDED47. Account TerminationSupabase Auth deleteUser() + data cascade✅ Connected48. Data Export Centerexport-data Edge Function✅ Connected

REWARDS & GROWTH (6 Pages)
PageBackend ConnectionStatus49. Membership Tiersprofiles.membership_tier enum⚠️ NEW COLUMN50. Membership Managementmemberships table (create if missing)⚠️ NEW TABLE NEEDED51. Rewards & Vouchersvouchers table (create if missing)⚠️ NEW TABLE NEEDED52. Referral & Rewardsreferrals table (create if missing)⚠️ NEW TABLE NEEDED53. Digital Gift Cardsgift_cards table (create if missing)⚠️ NEW TABLE NEEDED54. Gift Card Redeemgift_cards.redeemed_at timestamp⚠️ NEW TABLE NEEDED

INSTITUTIONAL & BRAND (17 Pages)
PageBackend ConnectionStatus55. About UsStatic content or pages CMS table✅ Static/CMS56. LUXEDRIVE Journalblog_posts table (create if missing)⚠️ NEW TABLE NEEDED57. Social Gallery (UGC)user_gallery table (create if missing)⚠️ NEW TABLE NEEDED58. Member Testimonialsreviews table (featured flag)✅ Connected59. Showroom Locatorlocations table (showroom type)✅ Connected60. VIP Airport Conciergebookings.service_type = 'airport'✅ Connected61. Corporate Inquirycorporate_leads table (create if missing)⚠️ NEW TABLE NEEDED62. VIP Consultationconsultations table (create if missing)⚠️ NEW TABLE NEEDED63. Support & Help Centerfaqs + support_tickets tables✅ Connected64. Support Thread Viewsupport_tickets + ticket_responses✅ Connected65. Legal & Privacy Hubdownload-policy Edge Function✅ Connected66. Cookie Consentprofiles.cookie_preferences JSONB⚠️ NEW COLUMN67. Contact Conciergesupport_tickets table✅ Connected68. Careers Pagejob_applications table (create if missing)⚠️ NEW TABLE NEEDED69. Site DirectoryStatic sitemap.xml generation✅ Static70. 404 PageStatic error page✅ Static71. Maintenance PageStatic downtime page✅ Static

10 NEW CRITICAL PAGES
PageBackend ConnectionStatus72. Booking Cancellation Confirmationbookings table (already has cancellation fields)✅ Connected73. Booking Modification Confirmationbookings table update history✅ Connected74. Vehicle Handover Checklistvehicle_checklists table⚠️ NEW TABLE NEEDED75. Vehicle Return Checklistvehicle_checklists table⚠️ NEW TABLE NEEDED76. Notification Centernotifications table (already exists)✅ Connected77. Damage Dispute Pagedamage_disputes table⚠️ NEW TABLE NEEDED78. Saved Addressesuser_addresses table⚠️ NEW TABLE NEEDED79. Invoice Download Hubgenerate-invoice Edge Function (all types)✅ Connected80. Extension Approval Statusbooking_extensions table⚠️ NEW TABLE NEEDED81. Blocked Account Noticeprofiles.account_status enum⚠️ NEW COLUMN

🔴 MISSING BACKEND COMPONENTS
New Tables Needed (15):

waitlist - Supercar waitlist requests
damage_disputes - Damage charge disputes
fines - Traffic fines and tolls
saved_payment_methods - User saved cards/UPI
memberships - Subscription tier management
vouchers - Promo codes and rewards
referrals - Referral tracking
gift_cards - Gift card purchases
blog_posts - Journal/magazine content
user_gallery - User-generated photos
corporate_leads - B2B inquiries
consultations - VIP consultation bookings
job_applications - Career applications
vehicle_checklists - Handover/return inspections
booking_extensions - Rental extension requests
user_addresses - Saved delivery addresses

New Columns Needed (5):

payments.refund_method - Bank/wallet choice
profiles.membership_tier - Silver/Black/Platinum
profiles.cookie_preferences - JSONB
profiles.account_status - active/suspended/banned
bookings.extension_status - pending/approved/rejected

New RPCs Needed (2):

get_user_dashboard_stats() - Aggregate user stats
request_booking_extension() - Handle extension logic


✅ IMPLEMENTATION PRIORITY
Phase 1: Critical (Do First)
sql-- Vehicle checklists (legal protection)
-- Damage disputes (business critical)
-- Saved addresses (UX critical)
-- Booking extensions (revenue critical)
Phase 2: Revenue Features
sql-- Memberships, vouchers, gift cards, referrals
Phase 3: Content & Marketing
sql-- Blog, gallery, corporate leads, careers