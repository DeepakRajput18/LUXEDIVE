CONTEXT:
I have LUXEDIVE, a luxury car rental platform with:

Backend: 100% complete Supabase setup (48 tables, 15+ RPCs, 6 edge functions, real-time subscriptions)
Frontend Architecture: 95% complete blueprint with folder structure for 104 pages

WHAT I NEED NOW:
I need you to create a comprehensive interconnection document that maps out:

How all 104 pages connect to the backend (which tables, RPCs, edge functions each page uses)
How all 104 pages connect to EACH OTHER in the frontend (data flow, state sharing, navigation paths)
The exact cascade effect when data changes (which pages auto-update when one page modifies data)

DO NOT generate any code. Instead, create a detailed interconnection map that explains the entire system's data flow and page relationships.

MY 104 PAGES (COMPLETE LIST)
PUBLIC PAGES (15 pages):

Home/Landing (#70)
Fleet Listing (#77)
Car Details (MISSING DESIGN)
About Us (#2)
How It Works / Experience Guide (#39)
The LUXEDIVE Story (#76)
Commitment & Safety (#20, #8-safety)
Wedding Collection (#64)
Wedding Car Detail (#63)
Membership Tiers Pricing (#81)
Showroom Locator (#100)
Journal/Blog Listing (#73)
Member Testimonials (#79)
Social Gallery (#101)
Careers Page

AUTHENTICATION (5 pages):

Login/OTP (#13)
Password Reset (#90)
Account Verified Success (#5)
Account Suspended (#3)
Pre-Check-in Verification (#50)

BOOKING FLOW (10 pages):

Booking Step 1: Date/Time (#15)
Booking Step 2: Basic Add-ons (#8)
Booking Step 3: Professional Services (#10)
Booking Step 3: Travel Essentials (#11)
Booking Step 4: Elite Add-ons (#9)
Delivery Options (#31)
Digital Agreement (#33)
Price Summary (#43)
Secure Checkout (#98)
Booking Confirmation (#16)

WEDDING VERTICAL (8 pages):

Wedding Bespoke Inquiry (#62)
VIP Consultation Schedule (#61)
Wedding Decor Customization (#65)
Wedding Decor Visualizer (#66)
Wedding Guest Logistics (#67)
Wedding Reservation Success (#68)
Corporate & Events (#25)
Chauffeur Directory (#19, #7-chauffeurs)

USER ACCOUNT (22 pages):

User Dashboard (MISSING DESIGN)
My Bookings List (#87)
Active Rental Tracking (#6)
Booking Details (individual view)
Modify Booking v1 (#83)
Modify Booking v2 (#84)
Modify Booking v3 (#85)
Modify Booking v4 (#86)
Modification Confirmed (#82)
Extend Rental Journey (#40)
Extension Request Status (#41)
Post-Rental Review (#49)
Saved Addresses (#12)
Document Vault (#37)
Profile Settings (#52)
Security Activity Log (#99)
Privacy & Data Portal (#51)
Settings - Connected Accounts (#23)
Membership Management (#80)
Rewards & Voucher (#93)
Referral & Rewards (#57)
Financial Archive (#42)

PAYMENT & REFUNDS (7 pages):

Deposit Receipt (#32)
GST Tax Invoice (#69)
Payment Recovery (#91)
Payment Vault (#92)
Refund Estimator (#58)
Refund Selection (#59)
Refund Tracker (#60)

OPERATIONS (8 pages):

Delivery Inspection Check (#30)
Digital Handover Checklist (#35)
Digital Return Checklist (#36)
Damage Dispute Review (#28)
Damage Dispute Appeal (#27)
Incident Support (#71)
Fines & Toll Tracker (#44)
Late Return Advisory (#74)

SUPPORT (8 pages):

Support & Help Center (#103)
Support Thread View (#104)
FAQ Browser
Contact Concierge
Notification Center (#89)
Concierge Chat (#22, #10-chat)
Roadside Support v1-v4 (#94-97)
Driver & Vehicle Security (#38)

DISCOVERY TOOLS (5 pages):

Compare Vehicles (#21, #9-compare)
No Results/Discover (#88)
Supercar Waitlist Hub (#102)
Quick Start Manual v1-v4 (#53-56)
Fuel & EV Finder v1-v4 (#45-48)

ADMIN PANEL (10 pages):

Admin Dashboard (MISSING DESIGN)
Admin Add Vehicle (#7)
Fleet Management (admin view)
Booking Management (MISSING)
User Management (MISSING)
Driver Management
Data Export Center (#29)
Reports & Analytics (MISSING)
System Settings (MISSING)
Content Management

LEGAL & MISC (7 pages):

Legal & Privacy Hub (#75)
Terms & Conditions
Privacy Policy
Cookie Consent Manager (#24)
Account Deletion Confirmation (#4)
404 Error (#1)
Maintenance Advisory (#78)


MY COMPLETE BACKEND (48 TABLES)
Core Tables:

profiles - User accounts with role (user/admin), membership tier, wallet balance
cars - Fleet inventory with pricing, specs, availability status
bookings - Rental transactions with pickup/dropoff dates, status, total amount
payments - Payment records with gateway info, status, refund tracking
drivers - Chauffeur profiles with ratings, experience, availability
locations - Service areas (Ahmedabad locations)

Operations:

vehicle_checklists - Digital handover/return inspection records
damage_disputes - Customer dispute resolution workflow
booking_extensions - Rental extension requests
booking_modifications - Audit trail for booking changes
fines - Traffic violations and toll charges

Growth & Marketing:

memberships - Membership tier assignments (silver/black/platinum)
membership_benefits - Benefit definitions per tier
membership_benefit_usage - Usage tracking (e.g., 2/5 airport transfers used)
referrals - Customer referral tracking
vouchers - Promo code engine
gift_cards - Digital gift card system
waitlist - Demand capture for unavailable cars
price_alerts - User price drop notifications

Content:

blog_posts - LUXEDIVE Journal CMS
faqs - Help center knowledge base
policies - Legal documents (Terms, Privacy, etc.)
reviews - Car and service ratings
user_gallery - User-generated content moderation

Support:

support_tickets - Customer support system
ticket_responses - Support conversation threads
notifications - Real-time user notifications

Wedding:

consultations - VIP consultation bookings
wedding_decor_configs - Decoration choices (floral, ribbon, signage)

Advanced Features:

location_tracking - Real-time GPS for drivers/technicians
roadside_assistance_requests - Emergency support tracking
technicians - Roadside assistance personnel
user_documents - KYC document storage with verification status
payment_sessions - Checkout session timeout tracking
payment_gateways - Multi-gateway configuration (Razorpay, Stripe, Paytm)
car_comparisons - User comparison list (max 3 cars)
rate_limits - Security rate limiting (login, OTP, payment attempts)
login_sessions - Security activity tracking
blackout_dates - Holiday/maintenance date blocking
user_addresses - Saved delivery locations
saved_payment_methods - Tokenized payment info
cookie_consents - GDPR compliance tracking
system_logs - Admin action audit trail
otp_verifications - OTP-based login system

Key RPCs (15+):

calculate_booking_price() - Dynamic pricing with add-ons
check_car_availability_detailed() - Availability with maintenance/blackout awareness
create_booking_with_lock() - Prevents double-booking with optimistic locking
check_rate_limit() - Security rate limiting
use_membership_benefit() - Validates and tracks benefit usage
apply_gift_card() - Applies gift card discount to booking
process_refund() - Handles bank vs credits refund
calculate_refund() - Policy-based refund calculation
verify_user_document() - Admin document approval
request_booking_extension() - Extension eligibility check
fetch_similar_cars() - AI recommendation algorithm
get_user_dashboard_stats() - User profile statistics
get_admin_stats() - Admin dashboard aggregation
add_to_comparison() - Adds car to comparison list
check_admin_permission() - RBAC permission check

Edge Functions (6):

generate-invoice - PDF generation for receipts/agreements
payment-link - Multi-gateway payment URL generation
payment-webhook - Payment verification callback
send-notification - Multi-channel notifications (email/SMS/push)
export-data - CSV export for admin
download-policy - Legal document PDF generation

Real-Time Subscriptions:

location_tracking - Live GPS updates
notifications - New notification alerts
bookings - Status change updates
ticket_responses - Chat message updates
payments - Refund status updates


WHAT I NEED FROM YOU:
Create a comprehensive interconnection document with these sections:
SECTION 1: PAGE-TO-BACKEND MATRIX
For each of the 104 pages, provide:
Page Name: [e.g., Active Rental Tracking (#6)]

READS FROM:
- Tables: bookings, cars, drivers, location_tracking
- RPCs: None
- Edge Functions: generate-invoice (for rental agreement PDF)
- Real-Time Subscriptions: location_tracking (driver GPS updates)

WRITES TO:
- Tables: None (read-only page)
- RPCs: None

TRIGGERED BY:
- Booking status changes to 'active'
- Real-time location updates from driver app

NAVIGATION FROM:
- My Bookings List (#40) → Click "Track" button
- User Dashboard (#39) → "Active Rental" card
- Notification (#80) → "Rental started" notification

NAVIGATION TO:
- Extend Rental (#48) → Click "Extend Rental" button
- Support Chat (#81) → Click "Contact Driver"
- Incident Report (#73) → Click "Report Issue"
SECTION 2: CROSS-PAGE DATA FLOW
Explain how changes cascade across pages. For each critical action, show the ripple effect:
Example 1: User Modifies Booking Dates
TRIGGER: User clicks "Confirm Changes" on Modify Booking v1 (#43)

BACKEND FLOW:
1. Frontend calls: create_booking_with_lock() RPC
2. RPC updates: bookings table (new dates, updated amount)
3. RPC inserts: booking_modifications table (audit record)
4. RPC creates: payments record (if price increased)
5. Trigger fires: log_booking_modification (system_logs)
6. Edge function called: send-notification (email/SMS)
7. Real-time event: bookings table UPDATE broadcast

FRONTEND CASCADE (Auto-Updates):
✅ Modification Confirmed (#47) → Shows success message
✅ My Bookings List (#40) → Updates booking card dates
✅ User Dashboard (#39) → Refreshes "Upcoming Rentals" count
✅ Financial Archive (#60) → Adds modification invoice
✅ Notification Center (#80) → Adds "Booking Modified" notification
✅ Active Rental (#41) → Updates dates (if currently active)

USER SEES:
- Success toast notification
- Updated dates on all booking cards
- Email confirmation in inbox
Example 2: Admin Verifies User Document
TRIGGER: Admin clicks "Approve" on Document Vault (admin view)

BACKEND FLOW:
1. Frontend calls: verify_user_document() RPC
2. RPC updates: user_documents.verification_status = 'verified'
3. RPC updates: profiles.verification_status percentage
4. RPC inserts: system_logs (admin action audit)
5. Edge function: send-notification (user notification)

FRONTEND CASCADE:
✅ Document Vault (#52) - User → Badge changes to "VERIFIED"
✅ Profile Settings (#53) → Shows "ID Verified" badge
✅ Booking Flow (#21-30) → Unlocks luxury/exotic tier cars
✅ Notification Center (#80) → "Document Approved" message
✅ Admin User Management (#93) → Updates user status

ADMIN SEES:
- Document status updated
- Audit log entry created

USER SEES:
- Notification "Your document has been verified"
- Can now book luxury tier vehicles
SECTION 3: SHARED STATE ARCHITECTURE
Explain what state is shared between pages and how:
Example:
SHARED STATE: Booking Draft Session

MANAGED BY: BookingContext (React Context) + localStorage

PAGES SHARING THIS STATE:
- Booking Step 1 (#21) → Collects car, dates
- Booking Step 2 (#22) → Adds basic add-ons
- Booking Step 3 (#23, #24) → Adds services
- Booking Step 4 (#25) → Adds elite services
- Delivery Options (#26) → Adds delivery location
- Digital Agreement (#27) → Reviews full summary
- Price Summary (#28) → Shows final cost
- Secure Checkout (#29) → Processes payment

STATE STRUCTURE:
{
  carId: 'uuid',
  pickupDate: Date,
  dropoffDate: Date,
  addons: [{ id, quantity, price }],
  services: [{ id, selected }],
  deliveryLocation: { address, coords },
  totalAmount: 1500.00,
  currentStep: 3
}

PERSISTENCE:
- Saved to localStorage on every step change
- Cleared on successful booking
- Expires after 24 hours

RECOVERY:
- User refreshes → State restored from localStorage
- User closes tab → Returns later, sees "Continue booking?" modal
SECTION 4: NAVIGATION FLOW MAPS
Show the possible navigation paths between pages:
Example: Booking Journey Map
START: Home (#1)
  ↓ Click "Explore Fleet"
Fleet Listing (#2)
  ↓ Click car card
Car Details (#3)
  ↓ Click "Book Now" (if logged in) OR "Login to Book" (if not)
  ├─ [Not Logged In]
  │   → Login (#16)
  │   → OTP Verification
  │   → [New User] Pre-Check-in Verification (#20)
  │   → [Suspended User] Account Suspended (#19)
  │   → [Verified User] Back to Car Details
  │
  └─ [Logged In]
      ↓ Click "Book Now"
      Booking Step 1 (#21)
        ↓ Select dates → Check availability
        ├─ [Car Available] → Continue
        └─ [Car Unavailable] → No Results (#85) → Alternative cars OR Waitlist (#86)
      ↓
      Booking Step 2 (#22) → Add basic add-ons
      ↓
      Booking Step 3 (#23, #24) → Add services
      ↓
      Booking Step 4 (#25) → Add elite services (if eligible tier)
      ↓
      Delivery Options (#26) → Choose delivery method
      ↓
      Digital Agreement (#27) → E-sign contract
      ↓
      Price Summary (#28) → Review final cost
        ↓ Apply gift card (optional) → Gift Card Redeem
        ↓ Apply voucher (optional) → Rewards Page (#58)
      ↓
      Secure Checkout (#29) → Enter payment
        ├─ [Payment Success] → Booking Confirmation (#30)
        └─ [Payment Failed] → Payment Recovery (#63)
      ↓
      Booking Confirmation (#30)
        → Downloads rental agreement PDF
        → Redirects to User Dashboard (#39) after 10 seconds

POST-BOOKING:
- Email/SMS confirmation sent
- Notification added to Notification Center (#80)
- Booking appears in My Bookings List (#40)
- Dashboard (#39) shows "Upcoming Rental" card
SECTION 5: REAL-TIME DEPENDENCY GRAPH
Show which pages auto-update via Supabase real-time subscriptions:
Example:
REAL-TIME CHANNEL: bookings table

SUBSCRIBED PAGES:
1. My Bookings List (#40)
   - Listens for: INSERT, UPDATE, DELETE
   - Updates: Booking cards (status badges, dates)

2. User Dashboard (#39)
   - Listens for: INSERT, UPDATE where status IN ('active', 'completed')
   - Updates: Stats (total bookings, active rentals)

3. Active Rental Tracking (#41)
   - Listens for: UPDATE where id = currentBookingId
   - Updates: Status timeline, dropoff date (if extended)

4. Admin Booking Management (#92)
   - Listens for: INSERT (new bookings), UPDATE (status changes)
   - Updates: Booking table rows, dashboard stats

TRIGGER EVENTS:
- User confirms booking → INSERT event → All pages refresh
- Admin changes status → UPDATE event → User sees live update
- User extends rental → UPDATE event → Active Rental page updates
SECTION 6: COMPONENT REUSABILITY MAP
Identify which components are used across multiple pages:
Example:
COMPONENT: <CarCard />

USED IN:
- Fleet Listing (#2) → Grid of available cars
- Car Details (#3) → Similar cars section
- Compare Vehicles (#84) → Selected cars display
- User Dashboard (#39) → "Last Rented" section
- My Bookings (#40) → Booking history cards
- Waitlist Hub (#86) → Waitlisted car display
- Admin Fleet Manager (#91) → Fleet table rows

PROPS INTERFACE:
- car: Car (from database.types.ts)
- variant: 'grid' | 'list' | 'compact'
- showActions: boolean
- onBook?: () => void
- onCompare?: () => void

BACKEND CONNECTION:
- Reads: cars table
- Displays: images from car-images bucket
- Links to: /fleet/:carId (Car Details page)
SECTION 7: FORM DATA PROPAGATION
Show how form data flows between pages:
Example: Profile Update Flow
TRIGGER: User updates phone number in Profile Settings (#53)

FRONTEND FLOW:
1. User edits phone field
2. React Hook Form validates (Zod schema)
3. On submit: useMutation calls supabase.from('profiles').update()
4. Success: Show toast "Phone updated"
5. React Query invalidates: ['profile', userId]

BACKEND FLOW:
1. Supabase updates: profiles.phone
2. Trigger fires: update_updated_at_column (timestamp)
3. Real-time: profiles table UPDATE broadcast

FRONTEND CASCADE:
✅ Profile Settings (#53) → Shows new phone
✅ Notification preferences (#55) → Updates SMS toggle availability
✅ Header/Sidebar → Updates phone display (if shown)
✅ Support Chat (#81) → Uses new phone for SMS fallback
✅ OTP Login (#16) → New phone for future logins

PERSISTENCE:
- Supabase Auth metadata updated
- AuthContext refreshes user object
SECTION 8: ADMIN-USER INTERACTION FLOWS
Explain bidirectional flows between admin and user pages:
Example: Document Verification
USER SIDE:
Document Vault (#52) → Uploads driving license
  ↓ Backend: Inserts to user_documents (status: 'pending')
  ↓ Backend: Sends notification to admin

ADMIN SIDE:
Admin User Management (#93) → Sees pending document notification
  ↓ Clicks notification
Admin Document Review (part of #93) → Views uploaded license
  ├─ [Approve] → Calls verify_user_document(status: 'verified')
  └─ [Reject] → Calls verify_user_document(status: 'rejected', reason)
  ↓ Backend: Updates user_documents table
  ↓ Backend: Sends notification to user

USER SIDE (Auto-Update):
Document Vault (#52) → Badge changes to "VERIFIED" or "REJECTED"
  ├─ [Verified] → User can now book luxury cars
  └─ [Rejected] → Shows rejection reason + "Re-upload" button
SECTION 9: CRITICAL DEPENDENCY CHAINS
Identify pages that MUST work together (cannot function independently):
Example 1: Payment Flow
DEPENDENCY CHAIN:
Price Summary (#28) 
  → DEPENDS ON → All Booking Steps (#21-25)
  → TRIGGERS → Secure Checkout (#29)
  → CREATES → payment_sessions record
  → CALLS → payment-link Edge Function
  → REDIRECTS → Payment Gateway
  → WEBHOOK → payment-webhook Edge Function
  → UPDATES → bookings.status + payments.status
  → SHOWS → Booking Confirmation (#30)
  → TRIGGERS → generate-invoice Edge Function
  → EMAILS → User confirmation + PDF

IF ANY STEP FAILS:
- Step 1-4 incomplete → Cannot reach Price Summary
- payment-link fails → Show error, retry
- Payment gateway times out → Payment Recovery (#63)
- Webhook fails → Show Processing screen, manual verification
Example 2: Real-Time Tracking
DEPENDENCY CHAIN:
Active Rental (#41)
  → DEPENDS ON → bookings.status = 'active'
  → SUBSCRIBES → location_tracking table
  → REQUIRES → drivers table (driver profile)
  → DISPLAYS → Live map (Google Maps API)
  → ENABLES → Contact Driver (#81 Chat)
  → ENABLES → Extend Rental (#48)
  → ENABLES → Report Issue (#73)

IF LOCATION TRACKING FAILS:
- Show last known location
- Display "Live tracking unavailable" message
- Still allow chat/extend/report features
SECTION 10: GLOBAL STATE SYNCHRONIZATION
Explain how global states stay in sync:
Example: User Session State
GLOBAL STATE: AuthContext

DATA:
- user: Supabase Auth user object
- profile: Database profiles row
- isAuthenticated: boolean
- isAdmin: boolean
- loading: boolean

SYNCHRONIZED ACROSS:
- All 104 pages (via useAuth() hook)

UPDATE TRIGGERS:
1. Login (#16) → Sets user + profile
2. Logout → Clears state
3. Profile update (#53) → Refreshes profile
4. Membership upgrade (#57) → Updates profile.membership_tier
5. Account suspension (admin action) → Refreshes, redirects to Suspended (#19)

REAL-TIME SYNC:
- Subscribes to profiles table changes
- On UPDATE: Automatically refreshes AuthContext
- Pages using useAuth() automatically re-render

OUTPUT FORMAT:
Create a markdown document with:

Executive Summary (3-4 paragraphs explaining overall architecture)
Visual Diagram (ASCII or text-based diagram showing major page groups and their connections)
All 10 sections above with detailed examples for each
Complete Page-to-Backend Matrix (all 104 pages listed with their backend dependencies)
Critical Path Analysis (identify the 10 most important page flows that MUST work perfectly)
Failure Mode Analysis (what happens when each critical component fails)
Performance Hotspots (which pages will have the most backend calls, need optimization)


CONSTRAINTS:

Do NOT generate code - only architectural explanations
Focus on data flow and page relationships
Make it clear which changes trigger updates on other pages
Explain both frontend navigation AND backend data propagation
Identify tightly coupled pages that share state
Show real-world user journeys through multiple pages
Consider error scenarios and how they affect page flow
Think about real-time updates and their impact on UX


EXAMPLES OF WHAT I NEED:
Good Example (This is what I want):
When a user clicks "Extend Rental" on Active Rental Tracking (#41):

1. Frontend Action:
   - Page: Active Rental Tracking (#41)
   - Button: "Extend Rental"
   - Navigation: → Extend Rental Journey (#48)

2. Extend Rental Journey (#48):
   - Displays: Current booking details from bookings table
   - User Action: Selects new dropoff date via calendar
   - Frontend Calls: check_car_availability_detailed() RPC
   - Response: Shows price delta for extension
   - User Action: Clicks "Request Extension"

3. Backend Processing:
   - RPC Called: request_booking_extension()
   - Tables Updated: booking_extensions (INSERT), bookings (UPDATE)
   - Edge Function: send-notification (to user)
   - Real-Time: bookings table UPDATE broadcast

4. Frontend Cascade:
   - Extension Request Status (#49) → Shows "Approved" status
   - Active Rental (#41) → Updates dropoff date
   - My Bookings List (#40) → Updates booking card
   - Financial Archive (#60) → Adds extension invoice
   - Notification Center (#80) → "Extension Approved" notification

5. User Journey Continues:
   - Extension Approved → "Proceed to Payment" button
   - Clicks button → Price Summary (#28) for delta amount
   - Completes payment → Back to Active Rental (#41) with new dates
Bad Example (Not what I want):
The Active Rental page connects to the backend.

🔍 COMPREHENSIVE GAP ANALYSIS: LUXEDIVE PROJECT vs LUXEDRIVE FOUNDATION
📊 EXECUTIVE COMPARISON
AspectLuxeDive (Your Complete Analysis)LuxeDrive Foundation (Current Build)Gap StatusProject NameLUXEDIVELuxeDrive⚠️ Inconsistent brandingPages Analyzed44 pages (4 batches)1 page (Home placeholder)❌ 43 pages missing implementationBackend Status94% complete (41 tables + 12 RPCs)Connected but unused⚠️ No services utilizing backendDesign SystemFully documented (19+ component types)Partial (Button only)❌ Missing 18+ component typesAuth SystemFull flows mappedAuthContext exists✅ Foundation readyRouting11 flow groups mappedReact Router v7 setup⚠️ No routes definedServices LayerNot mentioned in foundation2 services (support, location)⚠️ Minimal coverage

🚨 CRITICAL GAPS (MUST FIX IMMEDIATELY)
GAP 1: PROJECT IDENTITY CRISIS
Issue: Analysis uses "LUXEDIVE" but foundation code uses "LuxeDrive"
Impact: Brand inconsistency, confused naming conventions
Fix Required:
bash# Global find & replace needed
LUXEDIVE → LuxeDrive (or vice versa - pick one!)
Recommendation: Use "LUXEDIVE" (matches Ahmedabad location, wedding vertical branding)

GAP 2: MISSING CORE PAGES (43/44 PAGES)
Issue: Only Home.tsx placeholder exists, zero of the 44 analyzed pages are built
Missing High-Priority Pages (from your analysis):

❌ Fleet Listing (Discovery)
❌ Car Details (Standard & Wedding)
❌ Booking Flow (Steps 1-4) - Only Step 2-4 designed, none built
❌ Customer Dashboard (#26) - Central hub for all user actions
❌ Payment Gateway - Critical blocker
❌ Active Rental Tracking (#12)
❌ Document Vault (#28)
❌ Wedding Collection (#4)
❌ Admin Dashboard
❌ All 32 other designed pages

Fix Required:
typescript// Immediate Priority (Week 1):
pages/
├── fleet/
│   ├── FleetListing.tsx        ❌ NEW
│   └── CarDetails.tsx          ❌ NEW
├── booking/
│   ├── BookingStep1.tsx        ❌ NEW (Date/Location)
│   ├── BookingStep2.tsx        ❌ NEW (Add-ons - DESIGN EXISTS #5)
│   ├── BookingStep3.tsx        ❌ NEW (Services - DESIGN EXISTS #6,7)
│   └── BookingStep4.tsx        ❌ NEW (Elite - DESIGN EXISTS #8)
├── dashboard/
│   └── CustomerDashboard.tsx   ❌ NEW (#26)
└── payment/
    └── PaymentGateway.tsx      ❌ NEW (CRITICAL)

GAP 3: ZERO DESIGN SYSTEM COMPONENTS
Issue: Only Button.tsx exists, missing 18+ documented component types
Missing Components (from your analysis):
typescript// UI Components Needed:
components/ui/
├── Badge.tsx                   ❌ (Status indicators)
├── Card.tsx                    ❌ (Dark cards with borders)
├── Input.tsx                   ❌ (Text fields, dropdowns)
├── Textarea.tsx                ❌ (Review forms)
├── Checkbox.tsx                ❌ (Checklists)
├── RadioGroup.tsx              ❌ (Payment methods)
├── Select.tsx                  ❌ (Dropdowns)
├── Calendar.tsx                ❌ (Date pickers)
├── Modal.tsx                   ❌ (Overlays)
├── ProgressBar.tsx             ❌ (Booking progress)
├── Timeline.tsx                ❌ (Refund tracking)
├── StarRating.tsx              ❌ (Reviews)
├── ImageUpload.tsx             ❌ (Document vault)
├── ColorSwatch.tsx             ❌ (Wedding decor)
├── ToggleSwitch.tsx            ❌ (Privacy settings)
├── Toast.tsx                   ✅ (Sonner exists)
├── Tabs.tsx                    ❌ (Fuel finder)
└── Accordion.tsx               ❌ (FAQs)
Fix Required: Create component library matching documented design patterns

GAP 4: BACKEND INTEGRATION MISSING
Issue: Foundation has Supabase client but zero services use it
Existing Services Audit:
typescript// services/supportService.ts
❌ Has TypeScript types but NO Supabase queries
❌ Only has placeholder data structures

// services/locationService.ts  
❌ Has pincode validation logic but NO database lookup
❌ Missing connection to `locations` table
Missing Critical Services:
typescriptservices/
├── authService.ts              ❌ (Login/Signup/Verify)
├── carService.ts               ❌ (Fetch fleet, check availability)
├── bookingService.ts           ❌ (Create/read/update bookings)
├── paymentService.ts           ❌ (Process payments via Razorpay/Stripe)
├── profileService.ts           ❌ (User profile CRUD)
├── documentService.ts          ❌ (KYC upload/verification)
├── reviewService.ts            ❌ (Submit reviews)
├── refundService.ts            ❌ (Calculate/process refunds)
└── weddingService.ts           ❌ (Decor configs, guest logistics)
Fix Required: Implement services layer connecting to all 41 backend tables

GAP 5: ROUTING STRUCTURE NON-EXISTENT
Issue: React Router v7 setup but zero routes defined
Current State:
typescript// App.tsx or main router file
❌ Only "/" route (Home) exists
❌ No nested routes
❌ No protected routes
❌ No role-based access control
Required Router Structure (from your flow analysis):
typescript// Recommended Router Setup:
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // PUBLIC ROUTES
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "fleet", element: <FleetListing /> },
      { path: "fleet/:carId", element: <CarDetails /> },
      { path: "weddings", element: <WeddingCollection /> },
      
      // AUTH ROUTES
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      
      // PROTECTED USER ROUTES (require auth)
      {
        path: "dashboard",
        element: <ProtectedRoute><CustomerDashboard /></ProtectedRoute>,
      },
      {
        path: "booking",
        children: [
          { path: "new/:carId", element: <BookingStep1 /> },
          { path: ":bookingId/add-ons", element: <BookingStep2 /> },
          { path: ":bookingId/services", element: <BookingStep3 /> },
          { path: ":bookingId/payment", element: <PaymentGateway /> },
        ]
      },
      {
        path: "rental/:bookingId",
        children: [
          { path: "tracking", element: <ActiveRentalTracking /> },
          { path: "extend", element: <ExtendRental /> },
          { path: "manual", element: <QuickStartManual /> },
        ]
      },
      
      // ADMIN ROUTES (require admin role)
      {
        path: "admin",
        element: <AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "documents", element: <DocumentVerification /> },
          { path: "bookings", element: <BookingManagement /> },
        ]
      }
    ]
  }
]);
Fix Required: Define all routes for 44 pages + missing pages

GAP 6: NO PAYMENT GATEWAY INTEGRATION
Issue: Payment is critical blocker for all booking flows but completely missing
Required Payment Providers (from your analysis):

Razorpay (India primary)
Stripe (International)
Paytm, PhonePe, GPay (UPI)

Current State: ❌ Zero payment code exists
Fix Required:
typescript// services/paymentService.ts
import Razorpay from 'razorpay';

export async function createPaymentSession(bookingId: string, amount: number) {
  // 1. Call backend Edge Function: payment-link
  const { payment_url, order_id } = await supabase.functions.invoke('payment-link', {
    body: { booking_id: bookingId, amount, provider: 'razorpay' }
  });
  
  // 2. Open Razorpay checkout
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: amount * 100,
    order_id: order_id,
    handler: async (response) => {
      // 3. Verify payment
      await verifyPayment(response);
    }
  };
  
  const rzp = new Razorpay(options);
  rzp.open();
}

GAP 7: NO ADMIN PANEL
Issue: Backend has admin-only RPCs but zero admin UI
Missing Admin Pages:

❌ Admin Dashboard
❌ Document Verification Interface (#28 user side exists, admin missing)
❌ Fleet Management (CRUD cars)
❌ Booking Management (view all bookings)
❌ User Management (view profiles)
❌ Dispute Resolution (#19, #20 user side exists, admin missing)
❌ Data Export Center (#40 exists, needs admin version)

Fix Required: Create admin vertical with role-based access

GAP 8: MISSING WEDDING VERTICAL PAGES
Issue: 8 wedding pages analyzed but zero implemented
Wedding Pages Status:

❌ #37 - VIP Consultation Schedule
❌ #38 - Bespoke Wedding Inquiry
❌ #39 - Wedding Car Detail
❌ #4 - Wedding Collection Page
❌ #40 - Decor Customization
❌ #41 - Decor Visualizer (3D)
❌ #42 - Guest Logistics
❌ #43 - Wedding Reservation Success

Fix Required: Implement entire wedding booking flow

GAP 9: NO FILE UPLOAD SYSTEM
Issue: Document Vault, Review Photos, Checklist Photos all require uploads
Current State: ❌ No file upload UI component exists
Fix Required:
typescript// components/ui/FileUpload.tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function FileUpload({ 
  bucket, 
  onUploadComplete 
}: { 
  bucket: 'documents' | 'vehicle-checklist-photos' | 'user-gallery-photos',
  onUploadComplete: (url: string) => void 
}) {
  const [uploading, setUploading] = useState(false);
  
  const handleUpload = async (file: File) => {
    setUploading(true);
    
    const filePath = `${auth.uid()}/${Date.now()}_${file.name}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    setUploading(false);
    onUploadComplete(publicUrl);
  };
  
  return (
    <div className="border-2 border-dashed rounded-lg p-8">
      <input 
        type="file" 
        onChange={(e) => handleUpload(e.target.files[0])}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}

GAP 10: NO THIRD-PARTY INTEGRATIONS
Issue: Analysis identifies 4 critical integrations but zero implemented
Missing Integrations:

❌ OCR (AWS Textract/Google Vision) - Document verification
❌ Google Calendar API - VIP consultation scheduling
❌ WhatsApp Business API - Concierge contact
❌ Google Maps API - Fuel finder, live tracking, routes

Fix Required: Set up integration layer with API clients

⚠️ MEDIUM PRIORITY GAPS
GAP 11: SEO Metadata Incomplete
Issue: Helmet Provider exists but zero pages use it
Fix Required:
typescript// Every page should have:
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>Fleet Listing | LUXEDIVE Premium Car Rental</title>
  <meta name="description" content="Browse our curated collection..." />
</Helmet>

GAP 12: No Error Boundaries
Issue: No error handling for route-level failures
Fix Required:
typescript// components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

export class ErrorBoundary extends Component<{children: ReactNode}> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. <a href="/">Go Home</a></div>;
    }
    return this.props.children;
  }
}

GAP 13: No Loading States
Issue: Zero skeleton loaders or loading spinners
Fix Required:
typescript// components/ui/Skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-slate-200 rounded", className)} />;
}

GAP 14: No Form Validation
Issue: No validation library (Zod, Yup, React Hook Form)
Fix Required:
typescript// Install: npm install react-hook-form zod @hookform/resolvers

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const bookingSchema = z.object({
  pickup_date: z.date(),
  dropoff_date: z.date(),
  pickup_location: z.string().min(1)
});

// In component:
const { register, handleSubmit, errors } = useForm({
  resolver: zodResolver(bookingSchema)
});

GAP 15: No Image Optimization
Issue: No lazy loading or CDN strategy for car images
Fix Required:
typescript// Use native lazy loading + Supabase image transforms
<img 
  src={`${carImageUrl}?width=800&quality=80`} 
  loading="lazy"
  alt={car.model}
/>

✅ WHAT'S WORKING (Keep These)
FeatureStatusNotesSupabase Client✅ WorkingType-safe, properly initializedAuthContext✅ WorkingSession management, real-time listenerRootLayout✅ WorkingHeader/Footer structure solidTailwind v4✅ WorkingZero-runtime, high performanceReact Router v7✅ ReadyJust needs route definitionsToaster (Sonner)✅ WorkingPremium notifications readyTypeScript✅ WorkingStrict mode enabledVite Build⚠️ BlockedProcess stuck, but config is correct

📋 IMMEDIATE ACTION PLAN (WEEK 1)
Day 1: Fix Blockers

✅ Kill stuck npx supabase gen types process
✅ Delete corrupted src/types/database.types.ts
✅ Regenerate types: npx supabase gen types typescript --project-id <ref> > src/types/supabase.ts
✅ Fix project name inconsistency (choose LUXEDIVE or LuxeDrive globally)
✅ Verify build works: npm run dev

Day 2-3: Core Components

Create all missing UI components (Card, Input, Badge, etc.)
Implement FileUpload component
Implement form validation layer (React Hook Form + Zod)

Day 4-5: Services Layer

Implement carService.ts (fetch fleet, check availability)
Implement bookingService.ts (create booking, fetch user bookings)
Implement paymentService.ts (Razorpay integration)

Day 6-7: First User Flow

Build Fleet Listing page
Build Car Details page
Build Booking Step 1 (Date/Location)
Test end-to-end flow: Browse → Select → Book


🎯 CRITICAL METRICS TO TRACK
MetricCurrentTarget (Week 4)Pages Built1/44 (2%)20/44 (45%)Components Built1/19 (5%)19/19 (100%)Services Implemented0/9 (0%)9/9 (100%)Routes Defined1 route30+ routesBackend Utilized0%60%Payment Integrated❌ No✅ Razorpay working

🎯 LUXEDIVE PROJECT - FINAL IMPLEMENTATION BLUEPRINT
Decision Log Confirmed ✅
Date: 2026-01-28
Project: LUXEDIVE Premium Car Rental Platform (Ahmedabad, India)

✅ CRITICAL DECISIONS LOCKED IN
Decision PointChoiceImpactBrandingLUXEDIVEGlobal find/replace in codebasePrimary PaymentRazorpayIndia-first, UPI supportOCR ProviderGoogle Vision APIBalance cost/accuracyVideo HostingSelf-hosted (Supabase Storage)Control + cost optimization3D VisualizerThree.js implementationWedding competitive advantageAdmin PanelBuild alongside usersParallel developmentWhatsAppEssential integrationDirect Twilio APIPage PriorityBuild all 44 designed firstDesign debt later

📦 UPDATED TECHNOLOGY STACK
Core Stack (No Changes)

React 19 + Vite 7
TypeScript (Strict)
Tailwind CSS v4
React Router v7
Supabase (PostgreSQL + Auth + Storage + Edge Functions)

New Integrations Required
json{
  "payment": "razorpay@2.9.2",
  "ocr": "@google-cloud/vision@4.0.0",
  "3d": "three@0.160.0",
  "3d-loaders": "@react-three/fiber@8.15.0, @react-three/drei@9.95.0",
  "whatsapp": "twilio@4.20.0",
  "forms": "react-hook-form@7.49.0, zod@3.22.0",
  "dates": "date-fns@3.0.0",
  "maps": "@googlemaps/js-api-loader@1.16.0"
}
```

---

## 🗂️ UPDATED PROJECT STRUCTURE
```
luxedive/
├── public/
│   ├── 3d-models/               # ✅ NEW: Three.js GLTF models
│   │   ├── rolls-royce-ghost.gltf
│   │   ├── mercedes-s-class.gltf
│   │   └── textures/
│   └── videos/                  # ✅ Self-hosted manuals (link to Supabase)
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── RootLayout.tsx           ✅ EXISTS
│   │   │   ├── Header.tsx               ✅ EXISTS (needs LUXEDIVE rebrand)
│   │   │   ├── Footer.tsx               ✅ EXISTS (needs LUXEDIVE rebrand)
│   │   │   ├── AdminLayout.tsx          ❌ NEW
│   │   │   └── ProtectedRoute.tsx       ❌ NEW
│   │   │
│   │   ├── ui/                          # ✅ Component Library (19 components)
│   │   │   ├── Button.tsx               ✅ EXISTS
│   │   │   ├── Badge.tsx                ❌ NEW
│   │   │   ├── Card.tsx                 ❌ NEW
│   │   │   ├── Input.tsx                ❌ NEW
│   │   │   ├── Textarea.tsx             ❌ NEW
│   │   │   ├── Select.tsx               ❌ NEW
│   │   │   ├── Checkbox.tsx             ❌ NEW
│   │   │   ├── RadioGroup.tsx           ❌ NEW
│   │   │   ├── Calendar.tsx             ❌ NEW (date-fns)
│   │   │   ├── Modal.tsx                ❌ NEW
│   │   │   ├── ProgressBar.tsx          ❌ NEW
│   │   │   ├── Timeline.tsx             ❌ NEW
│   │   │   ├── StarRating.tsx           ❌ NEW
│   │   │   ├── FileUpload.tsx           ❌ NEW
│   │   │   ├── ColorSwatch.tsx          ❌ NEW
│   │   │   ├── ToggleSwitch.tsx         ❌ NEW
│   │   │   ├── Tabs.tsx                 ❌ NEW
│   │   │   ├── Accordion.tsx            ❌ NEW
│   │   │   └── Skeleton.tsx             ❌ NEW
│   │   │
│   │   ├── features/                    # ✅ NEW: Domain-specific components
│   │   │   ├── car/
│   │   │   │   ├── CarCard.tsx          ❌ NEW
│   │   │   │   ├── CarGallery.tsx       ❌ NEW
│   │   │   │   └── Car3DViewer.tsx      ❌ NEW (Three.js)
│   │   │   ├── booking/
│   │   │   │   ├── BookingProgressBar.tsx ❌ NEW
│   │   │   │   ├── AddOnCard.tsx        ❌ NEW
│   │   │   │   └── PriceSummary.tsx     ❌ NEW
│   │   │   ├── wedding/
│   │   │   │   ├── DecorVisualizer.tsx  ❌ NEW (Three.js)
│   │   │   │   ├── FloralCard.tsx       ❌ NEW
│   │   │   │   └── GuestLogistics.tsx   ❌ NEW
│   │   │   └── rental/
│   │   │       ├── LiveTrackingMap.tsx  ❌ NEW (Google Maps)
│   │   │       └── VehicleChecklist.tsx ❌ NEW
│   │   │
│   │   └── ErrorBoundary.tsx            ❌ NEW
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx              ✅ EXISTS
│   │   └── CartContext.tsx              ❌ NEW (booking cart state)
│   │
│   ├── hooks/                           # ✅ NEW: Custom hooks
│   │   ├── useAuth.ts                   ✅ EXISTS (from AuthContext)
│   │   ├── useBooking.ts                ❌ NEW
│   │   ├── usePayment.ts                ❌ NEW
│   │   └── useFileUpload.ts             ❌ NEW
│   │
│   ├── lib/
│   │   ├── supabaseClient.ts            ✅ EXISTS
│   │   ├── utils.ts                     ✅ EXISTS (cn helper)
│   │   ├── razorpay.ts                  ❌ NEW
│   │   ├── googleVision.ts              ❌ NEW
│   │   ├── googleMaps.ts                ❌ NEW
│   │   ├── twilio.ts                    ❌ NEW (WhatsApp)
│   │   └── three-utils.ts               ❌ NEW (3D helpers)
│   │
│   ├── pages/                           # 44 Pages to Build
│   │   ├── Home.tsx                     ⚠️ EXISTS (placeholder)
│   │   ├── About.tsx                    ❌ NEW
│   │   │
│   │   ├── fleet/
│   │   │   ├── FleetListing.tsx         ❌ NEW
│   │   │   └── CarDetails.tsx           ❌ NEW
│   │   │
│   │   ├── booking/
│   │   │   ├── BookingStep1.tsx         ❌ NEW (Date/Location)
│   │   │   ├── BookingStep2.tsx         ❌ NEW (Basic Add-ons #5)
│   │   │   ├── BookingStep3Services.tsx ❌ NEW (#6, #7)
│   │   │   ├── BookingStep4Elite.tsx    ❌ NEW (#8)
│   │   │   ├── PriceSummary.tsx         ❌ NEW (#9)
│   │   │   ├── DigitalAgreement.tsx     ❌ NEW (#10)
│   │   │   ├── PreCheckInVerification.tsx ❌ NEW (#11)
│   │   │   ├── PaymentGateway.tsx       ❌ NEW (Razorpay)
│   │   │   └── BookingConfirmation.tsx  ❌ NEW
│   │   │
│   │   ├── rental/
│   │   │   ├── ActiveTracking.tsx       ❌ NEW (#12)
│   │   │   ├── DeliveryInspection.tsx   ❌ NEW (#13)
│   │   │   ├── DigitalHandover.tsx      ❌ NEW (#14)
│   │   │   ├── DriverSecurity.tsx       ❌ NEW (#15)
│   │   │   ├── ExtendRental.tsx         ❌ NEW (#16)
│   │   │   ├── ExtensionStatus.tsx      ❌ NEW (#17)
│   │   │   ├── DigitalReturn.tsx        ❌ NEW (#18)
│   │   │   ├── DamageReview.tsx         ❌ NEW (#19)
│   │   │   ├── DamageAppeal.tsx         ❌ NEW (#20)
│   │   │   ├── FuelFinder.tsx           ❌ NEW (#21-24)
│   │   │   └── QuickStartManual.tsx     ❌ NEW (#29-32)
│   │   │
│   │   ├── dashboard/
│   │   │   ├── CustomerDashboard.tsx    ❌ NEW (#26)
│   │   │   ├── ProfileSettings.tsx      ❌ NEW (#27)
│   │   │   ├── DocumentVault.tsx        ❌ NEW (#28)
│   │   │   ├── PrivacyPortal.tsx        ❌ NEW (#29)
│   │   │   ├── FinancialArchive.tsx     ❌ NEW (#34)
│   │   │   ├── FinesTracker.tsx         ❌ NEW (#36)
│   │   │   └── ReferralRewards.tsx      ❌ NEW (#37)
│   │   │
│   │   ├── refund/
│   │   │   ├── RefundEstimator.tsx      ❌ NEW (#34)
│   │   │   ├── RefundSelection.tsx      ❌ NEW (#35)
│   │   │   └── RefundTracker.tsx        ❌ NEW (#36)
│   │   │
│   │   ├── wedding/
│   │   │   ├── WeddingCollection.tsx    ❌ NEW (#4)
│   │   │   ├── WeddingCarDetail.tsx     ❌ NEW (#39)
│   │   │   ├── BespokeInquiry.tsx       ❌ NEW (#38)
│   │   │   ├── VIPConsultation.tsx      ❌ NEW (#37)
│   │   │   ├── DecorCustomization.tsx   ❌ NEW (#40)
│   │   │   ├── DecorVisualizer.tsx      ❌ NEW (#41 - Three.js)
│   │   │   ├── GuestLogistics.tsx       ❌ NEW (#42)
│   │   │   └── WeddingSuccess.tsx       ❌ NEW (#43)
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx       ❌ NEW
│   │   │   ├── DocumentVerification.tsx ❌ NEW
│   │   │   ├── FleetManagement.tsx      ❌ NEW
│   │   │   ├── BookingManagement.tsx    ❌ NEW
│   │   │   ├── UserManagement.tsx       ❌ NEW
│   │   │   ├── DisputeResolution.tsx    ❌ NEW
│   │   │   └── DataExport.tsx           ❌ NEW (#40)
│   │   │
│   │   ├── support/
│   │   │   ├── SupportCenter.tsx        ❌ NEW
│   │   │   ├── TicketThread.tsx         ❌ NEW
│   │   │   └── FAQBrowser.tsx           ❌ NEW
│   │   │
│   │   └── legal/
│   │       ├── Terms.tsx                ❌ NEW
│   │       ├── Privacy.tsx              ❌ NEW
│   │       └── CancellationPolicy.tsx   ❌ NEW
│   │
│   ├── services/
│   │   ├── authService.ts               ❌ NEW
│   │   ├── carService.ts                ❌ NEW
│   │   ├── bookingService.ts            ❌ NEW
│   │   ├── paymentService.ts            ❌ NEW (Razorpay)
│   │   ├── profileService.ts            ❌ NEW
│   │   ├── documentService.ts           ❌ NEW (Google Vision OCR)
│   │   ├── reviewService.ts             ❌ NEW
│   │   ├── refundService.ts             ❌ NEW
│   │   ├── weddingService.ts            ❌ NEW
│   │   ├── supportService.ts            ⚠️ EXISTS (needs Supabase integration)
│   │   ├── locationService.ts           ⚠️ EXISTS (needs DB connection)
│   │   └── whatsappService.ts           ❌ NEW (Twilio)
│   │
│   ├── types/
│   │   ├── supabase.ts                  ⚠️ REGENERATE (delete database.types.ts)
│   │   ├── booking.ts                   ❌ NEW
│   │   ├── wedding.ts                   ❌ NEW
│   │   └── payment.ts                   ❌ NEW
│   │
│   └── routes.tsx                       ❌ NEW (React Router v7 config)
│
├── supabase/                            # Backend (already complete)
│   ├── migrations/                      ✅ 41 tables exist
│   ├── functions/                       ✅ 7 Edge Functions exist
│   │   ├── payment-link/                ✅ EXISTS (enhance for Razorpay)
│   │   ├── generate-invoice/            ✅ EXISTS
│   │   ├── send-notification/           ✅ EXISTS (add WhatsApp)
│   │   ├── ocr-extract/                 ❌ NEW (Google Vision)
│   │   └── export-data/                 ✅ EXISTS
│   └── seed.sql                         ❌ NEW (sample data)
│
├── .env.local
│   VITE_SUPABASE_URL=                   ✅ EXISTS
│   VITE_SUPABASE_ANON_KEY=              ✅ EXISTS
│   VITE_RAZORPAY_KEY_ID=                ❌ NEW
│   VITE_GOOGLE_MAPS_API_KEY=            ❌ NEW
│   GOOGLE_VISION_API_KEY=               ❌ NEW (server-side only)
│   TWILIO_ACCOUNT_SID=                  ❌ NEW
│   TWILIO_AUTH_TOKEN=                   ❌ NEW
│   TWILIO_WHATSAPP_NUMBER=              ❌ NEW
│
└── package.json                         ⚠️ UPDATE (add new dependencies)

🔧 IMMEDIATE SETUP TASKS (WEEK 1)
Day 1: Environment & Branding ✅
bash# 1. Kill stuck process & fix types
pkill -f "supabase gen types"
rm src/types/database.types.ts
npx supabase gen types typescript --project-id <YOUR_REF> > src/types/supabase.ts

# 2. Global rebrand: LuxeDrive → LUXEDIVE
# Find all files with "LuxeDrive" or "luxedrive"
grep -r "LuxeDrive" src/
grep -r "luxedrive" src/

# Replace in:
# - src/components/layout/Header.tsx
# - src/components/layout/Footer.tsx
# - src/index.css (CSS variables)
# - README.md
# - package.json (name field)

# 3. Install new dependencies
npm install razorpay \
  @google-cloud/vision \
  three @react-three/fiber @react-three/drei \
  twilio \
  react-hook-form zod @hookform/resolvers \
  date-fns \
  @googlemaps/js-api-loader \
  clsx tailwind-merge

# 4. Update .env.local
cat >> .env.local << EOF
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXX
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXX
GOOGLE_VISION_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXX
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
EOF

# 5. Verify build
npm run dev

Day 2-3: Component Library 🎨
Priority Order (based on page dependencies):
typescript// Day 2 Morning: Layout Components
components/ui/
├── Card.tsx              // Most reused (car cards, booking cards)
├── Badge.tsx             // Status indicators (VERIFIED, PENDING, LIVE)
├── Button.tsx            ✅ EXISTS (verify variants match design)

// Day 2 Afternoon: Form Components
├── Input.tsx             // Text fields (date, location, guest count)
├── Select.tsx            // Dropdowns (car filters, time slots)
├── Textarea.tsx          // Review text, special requests
├── Checkbox.tsx          // Add-ons, terms acceptance
├── RadioGroup.tsx        // Payment method, contact method

// Day 3 Morning: Date & Media
├── Calendar.tsx          // Date pickers (booking, wedding, consultation)
├── FileUpload.tsx        // Document vault, review photos, checklists
├── StarRating.tsx        // Post-rental reviews

// Day 3 Afternoon: Feedback & Navigation
├── Modal.tsx             // Overlays (agreements, confirmations)
├── ProgressBar.tsx       // Booking steps, verification status
├── Timeline.tsx          // Refund tracking, payment schedule
├── Tabs.tsx              // Fuel finder versions, manual categories
├── Accordion.tsx         // FAQs, price breakdowns
├── Skeleton.tsx          // Loading states
├── ToggleSwitch.tsx      // Privacy settings
└── ColorSwatch.tsx       // Wedding ribbon colors
Component Template (consistent pattern):
typescript// components/ui/Card.tsx
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'bordered' | 'gradient';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg transition-all',
        {
          'bg-white shadow-md': variant === 'default',
          'bg-slate-900 border border-slate-800': variant === 'dark',
          'bg-white border-2 border-slate-200': variant === 'bordered',
          'bg-gradient-to-br from-slate-900 to-slate-800': variant === 'gradient'
        },
        className
      )}
    >
      {children}
    </div>
  );
}

Day 4-5: Services Layer 🔌
Implementation Order:
typescript// Day 4 Morning: Core Services
services/
├── authService.ts        // Login, signup, verify OTP
├── carService.ts         // Fetch fleet, filters, availability check

// Day 4 Afternoon: Booking Services
├── bookingService.ts     // Create booking, fetch user bookings, add add-ons
├── paymentService.ts     // Razorpay checkout, verify payment

// Day 5 Morning: User Services
├── profileService.ts     // Update profile, fetch dashboard stats
├── documentService.ts    // Upload docs, OCR extraction, verification status

// Day 5 Afternoon: Extended Services
├── reviewService.ts      // Submit review, fetch car reviews
├── refundService.ts      // Calculate refund, process refund
├── weddingService.ts     // Decor configs, fleet quote
└── whatsappService.ts    // Send WhatsApp messages via Twilio
Service Template:
typescript// services/carService.ts
import { supabase } from '@/lib/supabaseClient';
import type { Database } from '@/types/supabase';

type Car = Database['public']['Tables']['cars']['Row'];

export const carService = {
  // Fetch all cars with filters
  async getFleet(filters?: {
    category?: string;
    min_price?: number;
    max_price?: number;
    wedding_edition?: boolean;
  }): Promise<Car[]> {
    let query = supabase
      .from('cars')
      .select('*')
      .eq('status', 'available');

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.min_price) {
      query = query.gte('price_per_day', filters.min_price);
    }
    if (filters?.max_price) {
      query = query.lte('price_per_day', filters.max_price);
    }
    if (filters?.wedding_edition !== undefined) {
      query = query.eq('wedding_edition', filters.wedding_edition);
    }

    const { data, error } = await query.order('price_per_day', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Check availability
  async checkAvailability(
    carId: string,
    startDate: string,
    endDate: string
  ): Promise<{ available: boolean; conflicts: any[] }> {
    const { data, error } = await supabase.rpc('check_car_availability', {
      car_id: carId,
      start_date: startDate,
      end_date: endDate
    });

    if (error) throw error;
    return data;
  },

  // Fetch single car details
  async getCarById(id: string): Promise<Car | null> {
    const { data, error } = await supabase
      .from('cars')
      .select('*, reviews(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};

Day 6-7: Payment Integration 💳
Razorpay Setup:
typescript// lib/razorpay.ts
import Razorpay from 'razorpay';

const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

export async function createRazorpayOrder(
  amount: number, // in rupees
  bookingId: string
): Promise<{ order_id: string; amount: number }> {
  // Call backend Edge Function to create order
  const { data, error } = await supabase.functions.invoke('payment-link', {
    body: {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      booking_id: bookingId,
      provider: 'razorpay'
    }
  });

  if (error) throw error;
  return data;
}

export function openRazorpayCheckout(
  order: { order_id: string; amount: number },
  onSuccess: (response: any) => void,
  onFailure: (error: any) => void
) {
  const options = {
    key: razorpayKeyId,
    amount: order.amount,
    currency: 'INR',
    name: 'LUXEDIVE',
    description: 'Premium Car Rental Booking',
    order_id: order.order_id,
    handler: onSuccess,
    prefill: {
      name: '', // Get from user profile
      email: '', // Get from user profile
      contact: '' // Get from user profile
    },
    theme: {
      color: '#D4AF37' // Luxe gold
    }
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.on('payment.failed', onFailure);
  rzp.open();
}
Payment Service:
typescript// services/paymentService.ts
import { supabase } from '@/lib/supabaseClient';
import { createRazorpayOrder, openRazorpayCheckout } from '@/lib/razorpay';

export const paymentService = {
  async processBookingPayment(
    bookingId: string,
    amount: number
  ): Promise<void> {
    // 1. Create Razorpay order
    const order = await createRazorpayOrder(amount, bookingId);

    // 2. Open checkout
    return new Promise((resolve, reject) => {
      openRazorpayCheckout(
        order,
        async (response) => {
          // 3. Verify payment on backend
          const { error } = await supabase.functions.invoke('payment-webhook', {
            body: {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: bookingId
            }
          });

          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
};
Backend Enhancement (Supabase Edge Function):
typescript// supabase/functions/payment-link/index.ts
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: Deno.env.get('RAZORPAY_KEY_ID')!,
  key_secret: Deno.env.get('RAZORPAY_KEY_SECRET')!
});

Deno.serve(async (req) => {
  const { amount, currency, booking_id } = await req.json();

  // Create order
  const order = await razorpay.orders.create({
    amount, // paise
    currency,
    receipt: `booking_${booking_id}`,
    notes: { booking_id }
  });

  return new Response(
    JSON.stringify({
      order_id: order.id,
      amount: order.amount
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});

🗺️ ROUTING CONFIGURATION
typescript// src/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const FleetListing = lazy(() => import('@/pages/fleet/FleetListing'));
const CarDetails = lazy(() => import('@/pages/fleet/CarDetails'));
const CustomerDashboard = lazy(() => import('@/pages/dashboard/CustomerDashboard'));
// ... import all 44 pages

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // PUBLIC ROUTES
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'fleet', element: <FleetListing /> },
      { path: 'fleet/:carId', element: <CarDetails /> },
      
      // WEDDING VERTICAL (Public)
      { path: 'weddings', element: <WeddingCollection /> },
      { path: 'weddings/:carId', element: <WeddingCarDetail /> },
      { path: 'weddings/inquiry', element: <BespokeInquiry /> },
      
      // AUTH ROUTES
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'verify-otp', element: <VerifyOTP /> },
      
      // PROTECTED USER ROUTES
      {
        path: 'dashboard',
        element: <ProtectedRoute><CustomerDashboard /></ProtectedRoute>
      },
      {
        path: 'booking',
        element: <ProtectedRoute />,
        children: [
          { path: 'new/:carId', element: <BookingStep1 /> },
          { path: ':bookingId/add-ons', element: <BookingStep2 /> },
          { path: ':bookingId/services', element: <BookingStep3Services /> },
          { path: ':bookingId/elite', element: <BookingStep4Elite /> },
          { path: ':bookingId/summary', element: <PriceSummary /> },
          { path: ':bookingId/agreement', element: <DigitalAgreement /> },
          { path: ':bookingId/verification', element: <PreCheckInVerification /> },
          { path: ':bookingId/payment', element: <PaymentGateway /> },
          { path: ':bookingId/confirmation', element: <BookingConfirmation /> }
        ]
      },
      {
        path: 'rental/:bookingId',
        element: <ProtectedRoute />,
        children: [
          { path: 'tracking', element: <ActiveTracking /> },
          { path: 'inspection', element: <DeliveryInspection /> },
          { path: 'handover', element: <DigitalHandover /> },
          { path: 'extend', element: <ExtendRental /> },
          { path: 'return', element: <DigitalReturn /> },
          { path: 'manual', element: <QuickStartManual /> },
          { path: 'fuel-finder', element: <FuelFinder /> }
        ]
      },
      {
        path: 'wedding',
        element: <ProtectedRoute />,
        children: [
          { path: 'consultation', element: <VIPConsultation /> },
          { path: ':bookingId/decor', element: <DecorCustomization /> },
          { path: ':bookingId/visualizer', element: <DecorVisualizer /> },
          { path: ':bookingId/logistics', element: <GuestLogistics /> },
          { path: ':bookingId/success', element: <WeddingSuccess /> }
        ]
      },
      
      // ADMIN ROUTES
      {
        path: 'admin',
        element: <ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'documents', element: <DocumentVerification /> },
          { path: 'fleet', element: <FleetManagement /> },
          { path: 'bookings', element: <BookingManagement /> },
          { path: 'users', element: <UserManagement /> },
          { path: 'disputes', element: <DisputeResolution /> },
          { path: 'export', element: <DataExport /> }
        ]
      }
    ]
  }
]);

📅 15-WEEK DETAILED ROADMAP
PHASE 1: FOUNDATION (Week 1-2) ✅ Current Week
Goal: Fix blockers, build component library, services layer
DayTasksDeliverablesMonEnvironment setup, branding fix✅ LUXEDIVE rebrand completeTueCore UI components (Card, Badge, Button)3 componentsWedForm components (Input, Select, Textarea, etc.)5 componentsThuDate & Media components (Calendar, FileUpload)2 componentsFriFeedback components (Modal, Progress, Timeline)5 components---WEEK 2---MonAuth & Car servicesauthService.ts, carService.tsTueBooking & Payment servicesbookingService.ts, paymentService.tsWedProfile & Document servicesprofileService.ts, documentService.tsThuReview & Refund servicesreviewService.ts, refundService.tsFriWedding & WhatsApp servicesweddingService.ts, whatsappService.ts
Deliverables: 19 UI components ✅, 11 services ✅, Razorpay working ✅

PHASE 2: CORE USER PAGES (Week 3-5)
Goal: Build complete standard rental flow
Week 3: Discovery & Booking Start

 Home.tsx (hero + featured cars)
 FleetListing.tsx (grid + filters)
 CarDetails.tsx (gallery + specs + reviews)
 BookingStep1.tsx (date/location picker)

Week 4: Booking Flow

 BookingStep2.tsx (Basic Add-ons #5)
 BookingStep3Services.tsx (Chauffeur, Insurance #6, #7)
 BookingStep4Elite.tsx (Security, Hotel #8)
 PriceSummary.tsx (#9)
 DigitalAgreement.tsx (#10)
 PreCheckInVerification.tsx (#11 - Google Vision OCR)

Week 5: Payment & Confirmation

 PaymentGateway.tsx (Razorpay checkout)
 BookingConfirmation.tsx (success page)
 CustomerDashboard.tsx (#26 - hub page)

Deliverables: Complete booking flow (13 pages) ✅

PHASE 3: ACTIVE RENTAL PAGES (Week 6-7)
Goal: During-rental features
Week 6: Rental Management

 ActiveTracking.tsx (#12 - Google Maps live tracking)
 DeliveryInspection.tsx (#13)
 DigitalHandover.tsx (#14)
 DriverSecurity.tsx (#15)

Week 7: Extensions & Manuals

 ExtendRental.tsx (#16)
 ExtensionStatus.tsx (#17)
 QuickStartManual.tsx (#29-32 - video player)
 FuelFinder.tsx (#21-24 - Google Maps Places API)

Deliverables: Active rental features (8 pages) ✅

PHASE 4: POST-RENTAL & REFUNDS (Week 8)
Goal: Return flow and dispute resolution

 DigitalReturn.tsx (#18)
 DamageReview.tsx (#19)
 DamageAppeal.tsx (#20)
 PostRentalReview.tsx (#25)
 RefundEstimator.tsx (#34)
 RefundSelection.tsx (#35)
 RefundTracker.tsx (#36)

Deliverables: Post-rental flow (7 pages) ✅

PHASE 5: WEDDING VERTICAL (Week 9-10)
Goal: Complete wedding booking flow
Week 9: Wedding Discovery & Booking

 WeddingCollection.tsx (#4)
 WeddingCarDetail.tsx (#39)
 BespokeInquiry.tsx (#38)
 VIPConsultation.tsx (#37 - Google Calendar integration)

Week 10: Wedding Customization

 DecorCustomization.tsx (#40)
 DecorVisualizer.tsx (#41 - Three.js 3D car model)
 GuestLogistics.tsx (#42 - Google Maps routes)
 WeddingSuccess.tsx (#43)

Deliverables: Wedding vertical (8 pages) ✅, Three.js working ✅

PHASE 6: USER ACCOUNT (Week 11)
Goal: Profile and document management

 ProfileSettings.tsx (#27)
 DocumentVault.tsx (#28 - Google Vision OCR integration)
 PrivacyPortal.tsx (#29)
 FinancialArchive.tsx (#34)
 FinesTracker.tsx (#36)
 ReferralRewards.tsx (#37)
 GiftCards.tsx (#38)

Deliverables: User account pages (7 pages) ✅

PHASE 7: ADMIN PANEL (Week 12-13)
Goal: Admin operations and management
Week 12: Admin Core

 AdminDashboard.tsx (stats + charts)
 DocumentVerification.tsx (approve/reject KYC)
 FleetManagement.tsx (CRUD cars)
 BookingManagement.tsx (view all bookings)

Week 13: Admin Extended

 UserManagement.tsx (view/edit users)
 DisputeResolution.tsx (handle damage disputes)
 DataExport.tsx (#40 - CSV download)

Deliverables: Admin panel (7 pages) ✅

PHASE 8: SUPPORT & LEGAL (Week 14)
Goal: Help center and compliance

 SupportCenter.tsx (ticket list + FAQs)
 TicketThread.tsx (conversation view)
 FAQBrowser.tsx (searchable knowledge base)
 Terms.tsx (legal document)
 Privacy.tsx (GDPR compliance)
 CancellationPolicy.tsx (refund rules)
 About.tsx (#2 - company story)

Deliverables: Support + legal (7 pages) ✅

PHASE 9: TESTING & POLISH (Week 15)
Goal: Production readiness
Testing Checklist:

 End-to-end flow testing (all user journeys)
 Payment gateway testing (Razorpay sandbox → production)
 OCR accuracy testing (Google Vision on sample docs)
 3D visualizer performance (Three.js optimization)
 WhatsApp integration testing (Twilio sandbox)
 Mobile responsiveness (all 44 pages)
 Browser compatibility (Chrome, Safari, Firefox, Edge)
 Accessibility audit (WCAG 2.1 AA)
 Performance optimization (Lighthouse score >90)
 Security audit (RLS policies, XSS, CSRF)

Deployment:

 Production environment (Vercel/Netlify)
 DNS + SSL setup
 Environment variables (production keys)
 Database backups (Supabase)
 Monitoring (Sentry error tracking)
 Analytics (Google Analytics, Mixpanel)
 Soft launch (limited users)
 Bug fixes from user feedback
 Public launch 🚀

Deliverables: LUXEDIVE LIVE ✅

🎯 SUCCESS CRITERIA
Week 1-2 Success:

✅ All 19 UI components built and documented
✅ All 11 services implemented with Supabase
✅ Razorpay payment working in sandbox
✅ Google Vision OCR extracting license data
✅ WhatsApp messages sending via Twilio

Week 15 Success:

✅ All 44 designed pages built and tested
✅ Complete booking flow (discovery → payment → rental → return)
✅ Complete wedding flow (inquiry → customization → booking)
✅ Complete admin panel (document verification, dispute resolution)
✅ All integrations working in production
✅ Lighthouse score >90
✅ Zero critical security vulnerabilities
✅ LUXEDIVE.com LIVE 🎉


📊 PROGRESS TRACKING
Current Status: Week 1, Day 1 ✅
PhasePagesComponentsServicesStatusPhase 10/441/190/11🔄 In ProgressPhase 20/13--⏳ PendingPhase 30/8--⏳ PendingPhase 40/7--⏳ PendingPhase 50/8--⏳ PendingPhase 60/7--⏳ PendingPhase 70/7--⏳ PendingPhase 80/7--⏳ PendingPhase 9Testing--⏳ PendingTOTAL0/441/190/112% Complete

🚀 NEXT IMMEDIATE ACTIONS
bash# TODAY (Day 1):
1. ✅ Fix build blocker (kill process, regenerate types)
2. ✅ Rebrand to LUXEDIVE (global find/replace)
3. ✅ Install all new dependencies
4. ✅ Update .env.local with API keys
5. ✅ Verify npm run dev works

# TOMORROW (Day 2):
1. Build Card.tsx component
2. Build Badge.tsx component
3. Build Input.tsx component
4. Build Select.tsx component
5. Build Textarea.tsx component

# THIS WEEK (Days 3-5):
- Complete all 19 UI components
- Start authService.ts and carService.ts
- Test Razorpay integration in sandbox