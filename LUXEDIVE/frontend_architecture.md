# LuxeDrive Frontend Architecture Blueprint

**Version:** 1.0 (Final)
**Date:** 2026-01-28
**Scope:** 104 Pages (React 18 + Vite + Supabase)

## Executive Summary
This document outlines the architectural strategy for the LuxeDrive frontend application. Designed for scalability and performance, the architecture organizes 104 distinct pages into logical domain-driven modules. The system leverages **React 18** for UI rendering, **Vite** for high-performance tooling, and **Supabase** for a serverless backend integration.

The folder structure preserves clean separation of concerns by isolating `features` (booking, admin, dashboard) from `shared` resources. Data flow is managed via a hybrid approach: **React Query** (via Supabase hooks) handles server state to ensure freshness, while **React Context** manages global client state (Auth, Theme, Cart). Real-time subscriptions are strategically implemented for critical operational updates (GPS tracking, Notifications), ensuring the interface feels "alive".

---

## 1. Complete Folder Structure

This structure groups files by **Feature** first, then by type. This ensures that a 104-page app remains navigable.

```text
src/
├── assets/                 # Static images, fonts, icons
│   ├── branding/
│   ├── vehicles/
│   └── ...
├── components/             # Shared & UI Components
│   ├── ui/                 # Shadcn/UI primitives (Button, Input, Card)
│   ├── layout/             # Layout wrappers
│   │   ├── PublicLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── AdminLayout.tsx
│   │   ├── SEOHead.tsx     # (New) Meta tag wrapper
│   │   └── NotificationBell.tsx # (New) Real-time badge
│   ├── shared/             # Reusable domain components
│   │   ├── CarCard.tsx
│   │   ├── PageLoader.tsx  # (New) Full page loader
│   │   ├── StatusBadge.tsx
│   │   └── ...
│   └── forms/              # Shared form fields (hook-form compliant)
│       └── DocumentUpload.tsx # (New) File upload component
├── features/               # The 104 Pages grouped by Domain
│   ├── public/             
│   │   ├── Home.tsx
│   │   ├── FleetListing.tsx
│   │   ├── CarDetails.tsx
│   │   ├── About.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Story.tsx
│   │   ├── Safety.tsx
│   │   ├── Showroom.tsx
│   │   ├── BlogListing.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Testimonials.tsx
│   │   └── Gallery.tsx
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── VerifyOTP.tsx
│   │   ├── PasswordReset.tsx
│   │   ├── Verification.tsx
│   │   └── Suspended.tsx
│   ├── booking/            # The Multi-Step Booking Engine
│   │   ├── BookingContainer.tsx      # State holder for steps
│   │   ├── steps/
│   │   │   ├── Step1_DateTime.tsx
│   │   │   ├── Step2_Addons.tsx
│   │   │   ├── Step3_Services.tsx
│   │   │   ├── Step4_Elite.tsx
│   │   │   ├── DeliveryOptions.tsx
│   │   │   └── DigitalAgreement.tsx
│   │   ├── Summary.tsx
│   │   ├── Checkout.tsx
│   │   └── Confirmation.tsx
│   ├── wedding/
│   │   ├── Inquiry.tsx
│   │   ├── Consultation.tsx
│   │   ├── DecorVisualizer.tsx
│   │   ├── Collections.tsx
│   │   └── ...
│   ├── dashboard/          # User Account Area
│   │   ├── Overview.tsx
│   │   ├── MyBookings.tsx
│   │   ├── BookingDetail.tsx
│   │   ├── ActiveRental.tsx (#6 GPS Tracking)
│   │   ├── modify/         # (New) Multi-variant Modify Flow
│   │   │   ├── ModifyContainer.tsx
│   │   │   └── variants/
│   │   ├── Profile.tsx
│   │   ├── SavedAddresses.tsx
│   │   ├── Documents.tsx
│   │   ├── Financials.tsx
│   │   ├── Rewards.tsx
│   │   └── ...
│   ├── operations/         # Incident & Handover
│   │   ├── HandoverChecklist.tsx
│   │   ├── ReturnChecklist.tsx
│   │   ├── DamageDispute.tsx
│   │   └── FinesTracker.tsx
│   ├── support/
│   │   ├── HelpCenter.tsx
│   │   ├── TicketThread.tsx
│   │   ├── RoadsideTracker.tsx (v1-v4 variants)
│   │   └── Notifications.tsx
│   ├── discovery/          # Tools
│   │   ├── CompareVehicles.tsx
│   │   ├── Waitlist.tsx
│   │   ├── FuelFinder.tsx
│   │   └── QuickStartGuide.tsx
│   └── admin/              # Admin Panel
│       ├── AdminDashboard.tsx
│       ├── FleetManager.tsx
│       ├── BookingManager.tsx
│       ├── UserManager.tsx
│       ├── Reports.tsx
│       └── ContentManager.tsx
├── hooks/                  # Custom React Hooks
│   ├── useSupabase.ts
│   ├── useAuth.ts
│   ├── useBooking.ts
│   ├── useRealtime.ts
│   ├── usePermission.ts     # (New) RBAC
│   ├── useModifyBooking.ts  # (New) Shared variant logic
│   └── ...
├── lib/                    # Configuration & Utilities
│   ├── supabase.ts         # Client initialization
│   ├── utils.ts            # Classname merger etc
│   ├── constants.ts
│   └── validators/         # Zod Schemas
├── contexts/               # Global State
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── BookingSessionsContext.tsx
└── types/                  # TypeScript Definitions
    ├── database.types.ts   # Generated from Supabase
    └── index.ts            # UI specific interfaces
```

---

## 2. Page-to-Backend Mapping

### A. Core Booking Pages
- **Read:** `cars` (availability), `add_ons`, `bookings` (conflicts).
- **Write:** `bookings` (via RPC `create_booking_with_lock`), `booking_add_ons`.
- **Edge Function:** `payment-link` (for checkout generation).

### B. User Dashboard
- **Read:** `bookings`, `fines`, `payments`.
- **RPC:** `get_user_dashboard_stats` (aggregates total spent, rides, etc).
- **Download:** `download-policy` (Edge function for PDF contracts).

### C. Active Rental Tracking
- **Read:** `bookings`, `drivers`, `cars`.
- **Real-Time:** `location_tracking` (Listen for INSERT/UPDATE where `booking_id` matches).
- **RPC:** `lookup_pincode` (if geocoding needed).

### D. Admin Panel
- **Read:** All tables.
- **RPC:** `get_admin_stats`, `process_refund`, `check_admin_permission`.
- **Write:** `cars`, `drivers`, `blog_posts`.

### E. Discovery Tools
- **Read:** `cars` (Fleet), `car_comparisons` (State).
- **MPC:** `fetch_similar_cars`, `add_to_comparison`.

---

## 3. Data Flow Architecture

**The "Single Source of Truth" Pattern:**
1.  **Frontend Action:** User updates profile.
2.  **Supabase:** `supabase.from('profiles').update(...)`.
3.  **Real-Time/Invalidation:** React Query hook `useProfile` detects query key invalidation or receives a Postgres subscription event.
4.  **UI Update:** Profile page, Sidebar, and Header automatically re-render with new data.

**Booking Modification Flow:**
1.  **Modify Page:** User requests new date.
2.  **Logic:** Call `calculate_booking_price` RPC to get new total.
3.  **Confirm:** User accepts → Call `log_booking_modification` RPC.
4.  **Backend:** Triggers `log_booking_modification` DB trigger -> Inserts to `system_logs` -> Updates `bookings`.
5.  **Propagation:** Realtime listener on `bookings` alerts the Dashboard to show "Updated" badge.

---

## 4. Shared Component Strategy

| Component Category | Key Components |
| :--- | :--- |
| **Data Display** | `CarCard`, `BookingRow`, `StatusBadge`, `PriceDisplay` |
| **Navigation** | `MainNavbar`, `DashboardSidebar`, `AdminSidebar`, `Footer` |
| **Feedback** | `LoadingSpinner`, `LazyImage`, `Toast` (Sonner), `ErrorAlert` |
| **Inputs** | `DateRangePicker`, `Combobox` (Search), `FileUpload` (Documents) |
| **Complex** | `MapInterface` (Tracking/Showroom), `ChatWindow` (Support) |
| **Modals** | `ConfirmDialog`, `ReviewModal`, `PaymentModal` |

### Loading State Components (New):
**1. Full Page Loader:**
```typescript
// components/shared/PageLoader.tsx
export function PageLoader() {
  return ( Loading your luxury experience... );
}
```
**2. Skeleton Loaders:**
Used in Fleet Listing during data fetch: `{Array(12).fill(0).map((_, i) => <CarCardSkeleton key={i} />)}`

---

## 5. State Management Plan

1.  **Server State (React Query):**
    *   Almost all DB data (`cars`, `bookings`, `profile`).
    *   Handles caching, deduping requests, and background refetching.

2.  **Global Context (React Context):**
    *   `AuthContext`: User session, Role, Loading state.
    *   `UIContext`: Sidebar toggle, Dark mode preference.
    *   `BookingContext`: Temporary state for the multi-step wizard (before DB submission).

3.  **Form State (React Hook Form):**
    *   Local to each page/form. Isolated performance.

4.  **URL State (React Router):**
    *   Search Filters: `/fleet?brand=BMW&price_max=500`
    *   Pagination: `/dashboard/bookings?page=2`

---

## 6. Routing Structure

```tsx
<Routes>
  {/* Public */}
  <Route path="/" element={<Home />} />
  <Route path="/fleet" element={<FleetListing />} />
  <Route path="/fleet/:id" element={<CarDetails />} />
  
  {/* Auth */}
  <Route path="/login" element={<Login />} />
  
  {/* Booking (Wizard) */}
  <Route path="/book/:carId" element={<BookingContainer />}>
     <Route index element={<Step1 />} />
     <Route path="addons" element={<Step2 />} />
     <Route path="checkout" element={<Checkout />} />
  </Route>

  {/* Protected User */}
  <Route element={<AuthLayout />}>
    <Route path="/dashboard" element={<Overview />} />
    <Route path="/dashboard/rental/:id/track" element={<ActiveRental />} />
    <Route path="/dashboard/bookings/:id/modify" element={<ModifyContainer />} />
    <Route path="/dashboard/support" element={<Support />} />
  </Route>

  {/* Admin */}
  <Route element={<AdminLayout />}>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/fleet" element={<FleetManager />} />
  </Route>
</Routes>
```

---

## 7. Real-Time Integration Points

| Page | Channel / Table | Event | Action |
| :--- | :--- | :--- | :--- |
| **Active Rental** | `location_tracking` | `INSERT` | Update Map Marker |
| **Notifications** | `notifications` | `INSERT` | Increment Badge Count |
| **Support Chat** | `ticket_responses` | `INSERT` | Append Message to Thread |
| **Waitlist Hub** | `waitlist` | `UPDATE` | Show "Spot Available" toast |
| **Fleet Listing** | `cars` | `UPDATE` | Update "Available/Booked" badge live |

### Subscription Lifecycle Management (New):
```typescript
// hooks/useRealtimeBooking.ts
export function useRealtimeBooking(bookingId: string) {
  useEffect(() => {
    const channel = supabase.channel(`booking:${bookingId}`).on('postgres_changes', ...).subscribe();
    return () => { supabase.removeChannel(channel); }; // CRITICAL: Cleanup
  }, [bookingId]);
}
```

### Notification Badge Real-Time (New):
`NotificationBell.tsx` uses a local `unreadCount` which is hydrated by an initial `count` query and then incremented via a `postgres_changes` subscription on the `notifications` table.

---

## 8. Authentication Flow

1.  **Entry:** `useAuth()` hook initializes `supabase.auth.onAuthStateChange`.
2.  **Protection:** `<RequireAuth>` wrapper component checks `session`.
    *   If no session: Redirect to `/login?redirect=...`.
3.  **Role Guard:** `<RequireAdmin>` wrapper checks `profile.role === 'admin'`.
    *   If user but not admin: Redirect to `/dashboard`.
4.  **Suspension:** Global check for `profile.account_status === 'suspended'`.
    *   Force redirect to `/suspended` page.

---

## 9. Form Handling Patterns

*   **Library:** React Hook Form + Zod Resolver.
*   **Validation:** centralized in `src/lib/validators/*.ts`.
*   **Submission:**
    *   `const { mutate } = useMutation(...)` (React Query).
    *   On `onSubmit`: call `mutate(data)`.
    *   On `onError`: display toast with `error.message`.
*   **File Upload Pattern (New):**
    *   Upload to Supabase Storage first, then insert record to DB.
    *   Used in: Document Vault, Post-Rental Review, Admin Add Vehicle.
*   **Auto-Save:** For long forms (e.g., Wedding Inquiry), use `useWatch` to save drafts to local storage.

---

## 10. Design System Organization

*   **Tailwind Config:** Define `colors.luxe.gold`, `colors.luxe.black`.
*   **Typography:** Wrapper components `<H1>`, `<H2>`, `<Lead>` ensuring consistent font-family (Inter/Playfair).
*   **Dark Mode (New):**
    *   Controlled via `ThemeContext` persisting to `localStorage`.
    *   Uses `document.documentElement.classList.toggle('dark')`.
*   **Animations:**
    *   `src/lib/animations.ts`: Exports `fadeIn`, `slideUp`, `staggerChildren` variants for Framer Motion.
    *   Usage: `<motion.div variants={fadeIn} ...>`

---

## 11. Performance Optimization

1.  **Lazy Loading:** All Top-Level Pages are `React.lazy()` imports.
2.  **Pagination Strategy (New):**
    *   **Dashboard Tables (Admin/User):** URL-based pagination (`?page=2`) using `.range()` queries.
    *   **Mobile Lists:** Infinite Scroll using `useInfiniteQuery` via React Query.
3.  **Image Optimization:** Use Supabase Image Transformations (`?width=400&format=webp`) via a custom `<LazyImage />` component.
4.  **Client-Server Waterfalls:** Use React Query `prefetchQuery` on hover (e.g., hovering a Car Card starts fetching details).

---

## 12. Error Handling Strategy

1.  **Global:** `Sentry` or similar for crash reporting.
2.  **Error Boundary Strategy (New):**
    *   **Global Boundary:** Catches app crashes.
    *   **Route-Level:** Wraps main features (Dashboard, Admin) to prevent full app crash if one module fails.
    *   **Component-Level:** Wraps complex widgets like Maps or 3D Visualizers.
3.  **API:** Centralized `handleSupabaseError(err)` helper.
    *   Maps Postgres error codes (e.g., `23505` unique violation) to user-friendly messages ("Email already taken").
4.  **Images:** `onError` handler in `<LazyImage>` falls back to a placeholder.

---

## 13. Type Safety Approach

*   **Source:** `src/types/database.types.ts` (Generated).
*   **Extension:**
    ```typescript
    type Car = Database['public']['Tables']['cars']['Row'];
    type CarWithImages = Car & { images: string[] };
    ```
*   **Strict Mode:** `tsconfig.json` has `strict: true`, `noImplicitAny: true`.
*   **Props:** No `any`. All components must define `interface Props`.

---

## 14. Testing Structure

*   **Unit (Vitest):** Test utility functions (`calculatePrice`, `formatCurrency`) and pure components (`StatusBadge`).
*   **Integration (React Testing Library):** Test Booking Wizard flow (Step 1 -> Step 2 transition).
*   **E2E (Playwright):** Critical Paths:
    1.  User Login.
    2.  Complete Booking flow.
    3.  Admin Reject Booking.

---

## 15. Critical Cross-Page Dependencies

1.  **Booking Session:** The `BookingContainer` holds state. If user navigates to "Terms" and back, state must persist (via Context or LocalStorage).
2.  **Notification -> Action:** A notification "Damage Dispute Update" links directly to `/dashboard/disputes/:id`. Deep linking must be handled.
3.  **Auth -> Dashboard:** Layout changes completely. `AuthContext` is the bridge.

---

## 16. Multi-Variant Page Strategy (CRITICAL)

**Design Pattern:** Feature Flag + Component Switching

### Implementation:
1. **Single Route with Variant Selector:**
   - Route: `/dashboard/bookings/:id/modify`
   - Component: `<ModifyBookingContainer />`
   - Logic: Check user preference or A/B test assignment
   - Render: `<ModifyV1 />`, `<ModifyV2 />`, `<ModifyV3 />`, or `<ModifyV4 />`

2. **Shared State Layer:**
   All variants share the same custom hook:
```typescript
   // hooks/useModifyBooking.ts
   export function useModifyBooking(bookingId: string) {
     const [newDates, setNewDates] = useState();
     const { mutate } = useMutation(async (data) => {
       return supabase.rpc('log_booking_modification', data);
     });
     return { newDates, setNewDates, submitModification: mutate };
   }
```

3. **Variant Pages:**
```
   features/dashboard/modify/
   ├── ModifyContainer.tsx (Router logic)
   ├── variants/
   │   ├── ModifyV1_Standard.tsx
   │   ├── ModifyV2_Hero.tsx
   │   ├── ModifyV3_Wizard.tsx
   │   └── ModifyV4_Admin.tsx
   └── shared/
       ├── PriceDelta.tsx (Reused by all)
       └── DatePicker.tsx
```

4. **Variant Selection Logic:**
   - Check `profile.preferences.modify_ui_version` (user setting)
   - Or check feature flag from Supabase config table
   - Or A/B test bucket (30% v1, 30% v2, 30% v3, 10% v4)

**Pages Affected:**
- Modify Booking (v1-v4) → `/dashboard/bookings/:id/modify?variant=v2`
- Roadside Support (v1-v4) → `/support/roadside/:id?view=v3`
- Fuel Finder (v1-v4) → `/tools/fuel-finder?layout=v1`
- Quick Start Manual (v1-v4) → `/rental/:id/manual?format=v4`

---

## 17. Booking Session Management (CRITICAL)

### Problem:
Multi-step booking (7 steps) takes 5-10 minutes. Users may close tabs or refresh.

### Solution: Hybrid Persistence

**1. In-Memory State (React Context):**
For active session (same tab, no refresh):
```typescript
// contexts/BookingContext.tsx
const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookingDraft, setBookingDraft] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('booking_draft');
    return saved ? JSON.parse(saved) : defaultState;
  });

  // Auto-save to localStorage on change
  useEffect(() => {
    localStorage.setItem('booking_draft', JSON.stringify(bookingDraft));
  }, [bookingDraft]);

  return <BookingContext.Provider value={{...}}>{children}</BookingContext.Provider>;
}
```

**2. Database Persistence (Optional - for VIP users):**
For logged-in users, save draft to Supabase `booking_drafts` table after Step 2.

**3. Recovery Flow:**
User returns to `/book/:carId`:
*   Check localStorage -> If found (< 24h old), Prompt "Continue?".
*   If not found -> Check Supabase (for logged-in users).

**4. Cleanup:**
*   Delete localStorage on successful booking.
*   Cron job expires old DB drafts (> 7 days).

---

## 18. Admin Role-Based Access Control (RBAC) (CRITICAL)

### Permission System:
`admin_roles` table permissions JSONB: `{"fleet": ["read", "create"], "users": ["read"]}`.

### Frontend Implementation:

**1. Permission Hook:**
```typescript
// hooks/usePermission.ts
export function usePermission(entity: string, action: string) {
  const { profile } = useAuth();
  // logic to check profile.admin_role.permissions
  return hasPermission;
}
```

**2. Conditional Rendering:**
```typescript
{usePermission('fleet', 'create') && <AddVehicleButton />}
```

**3. Route-Level Protection:**
`AdminLayout` checks `usePermission('admin', 'access')`.

**4. Sidebar Filtering:**
Filter sidebar items based on permissions before rendering.

**Admin Role Types:**
*   **super_admin**: Full access.
*   **fleet_manager**: Fleet + Bookings.
*   **support_agent**: Tickets + Profiles (Read-only).
*   **finance**: Payments + Invoices.

---

## 19. SEO & Meta Tag Management

### Library: React Helmet Async

**1. Layout Wrapper:**
`<SEOHead title="..." description="..." image="..." />` component wrapping `Helmet`.

**2. Page Usage:**
In `CarDetails.tsx`:
```typescript
<SEOHead 
  title={`${car.brand} ${car.model} Rental`} 
  description={`Rent for ₹${car.price}/day`} 
  image={car.image} 
/>
```

**Pages Needing SEO:** Home, Fleet, Blog, About, Testimonials.

---

## Cross-Reference & Priority

| Priority | Feature Module | Est. Components | Key Route |
| :--- | :--- | :--- | :--- |
| **P0** | Shared UI / Layouts | 20 | N/A |
| **P1** | Auth & Public Home | 10 | `/login` |
| **P1** | Fleet Listing & Details | 5 | `/fleet` |
| **P2** | Booking Wizard | 15 | `/book` |
| **P2** | User Dashboard | 20 | `/dashboard` |
| **P3** | Operations & Support | 15 | `/support` |
| **P4** | Admin Panel | 15 | `/admin` |
| **P5** | Wedding & Verticals | 10 | `/wedding` |