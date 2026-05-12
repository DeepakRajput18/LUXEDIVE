import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { BookingProvider } from './contexts/BookingContext'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import ScrollToTop from './components/layout/ScrollToTop'
import SplashScreen from './components/home/SplashScreen'
import Toast from './components/ui/Toast'

// Layouts
import RootLayout from './components/layout/RootLayout'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Auth Guards
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicRoute from './components/auth/PublicRoute'

// Components
import PlaceholderPage from './pages/PlaceholderPage'
import SecureCheckout from './pages/payment/SecureCheckout'
import Services from './pages/Services'

// Public Pages
import Home from './pages/Home'
import About from './pages/About'
import TeamMemberBio from './pages/team/TeamMemberBio'
import HeritageHistory from './pages/HistoryPage'
import Contact from './pages/Contact'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import AccountSuspended from './pages/auth/AccountSuspended'
import AccountVerified from './pages/auth/AccountVerified'
import AccountDeletion from './pages/auth/AccountDeletion'
import ForgotPassword from './pages/auth/ForgotPassword'
import UpdatePassword from './pages/auth/UpdatePassword'

import Terms from './pages/legal/Terms'
import Privacy from './pages/legal/Privacy'
import NotFound from './pages/NotFound'

// Blog
import BlogList from './pages/blog/BlogList'
import BlogPostPage from './pages/blog/BlogPostPage'

// Fleet
import FleetListing from './pages/fleet/FleetListing'
import CarDetails from './pages/fleet/CarDetails'
import CompareVehicles from './pages/rental/CompareVehicles' // Using the rental one as it seems more complete based on size

// Modern Booking Flow
import BookingDetails360 from './pages/booking/modern/BookingDetails360'
import BookingItinerary from './pages/booking/modern/BookingItinerary'
import ChauffeurSelection from './pages/booking/modern/ChauffeurSelection'
import BookingSummary from './pages/booking/modern/BookingSummary'
import BookingConfirmation from './pages/booking/steps/BookingConfirmation'
import BookingCancellation from './pages/booking/BookingCancellation'
import InvoicePage from './pages/booking/InvoicePage'
import UpgradeOffer from './pages/UpgradeOffer'
import ChauffeurBio from './pages/ChauffeurBio'
import ChauffeurDetails from './pages/booking/modern/ChauffeurDetails'
import DocumentUpload from './pages/booking/DocumentUpload'
import AddVehicle from './pages/AddVehicle'
import MyVehicles from './pages/dashboard/MyVehicles'
import VehicleApproval from './pages/admin/VehicleApproval'
import BookingFlow from './pages/booking/BookingFlow'
import DocumentVerification from './pages/booking/modern/DocumentVerification'
import PendingBookingPage from './pages/booking/PendingBookingPage'

import Commitment from './pages/Commitment'
import ChauffeurDirectory from './pages/rental/ChauffeurDirectory'
import ConciergeChat from './pages/ConciergeChat'
import CorporateEvents from './pages/corporate/CorporateEvents'

// Wedding
import WeddingCollection from './pages/wedding/WeddingCollection'
import WeddingBespokeInquiry from './pages/wedding/WeddingBespokeInquiry'
import WeddingCarDetail from './pages/wedding/WeddingCarDetail'
import WeddingDecorCustomization from './pages/wedding/WeddingDecorCustomization'
import WeddingDecorVisualizer from './pages/wedding/WeddingDecorVisualizer'
import WeddingGuestLogistics from './pages/wedding/WeddingGuestLogistics'
import WeddingReservationSuccess from './pages/wedding/WeddingReservationSuccess'

// Dashboard & Account (Real Components Wiring)
import CustomerDashboard from './pages/dashboard/CustomerDashboard'
import SavedAddresses from './pages/dashboard/SavedAddresses'
import ConnectedAccounts from './pages/dashboard/ConnectedAccounts'
import FinesTracker from './pages/dashboard/FinesTracker'
import MyBookingsList from './pages/dashboard/MyBookingsList'

import UserProfile from './pages/account/UserProfile'
import UserSettings from './pages/account/UserSettings'
import RentalHistory from './pages/dashboard/RentalHistory'
import Support from './pages/dashboard/Support'
import WaitlistDashboard from './pages/dashboard/WaitlistDashboard'
import PaymentVault from './pages/account/PaymentVault'
import SecurityActivityLog from './pages/account/SecurityActivityLog'
import NotificationCenter from './pages/account/NotificationCenter'
import RewardsVoucher from './pages/account/RewardsVoucher'
import DashboardHome from './pages/dashboard/DashboardHome'
import PaymentHistory from './pages/dashboard/PaymentHistory'
import Favorites from './pages/dashboard/Favorites'


// Rental Active & Operations
import ActiveTracking from './pages/rental/ActiveTracking'
import ExtendRental from './pages/rental/ExtendRental'
import RoadsideSupport from './pages/rental/RoadsideSupport'
import DigitalReturn from './pages/rental/DigitalReturn'
import HandoverChecklist from './pages/operations/HandoverChecklist'
import ReturnChecklist from './pages/operations/ReturnChecklist'

// Admin Auth
import { AdminAuthProvider } from './contexts/AdminAuthContext'
import ProtectedAdminRoute from './components/auth/ProtectedAdminRoute'
import AdminLogin from './pages/admin/AdminLogin'

// Admin Pages (Real Components Wiring)
import AddVehicleWizard from './pages/admin/AddVehicleWizard'
import AdminSettings from './pages/admin/AdminSettings'
import ContentManager from './pages/admin/ContentManager'
import DriverManager from './pages/admin/DriverManager'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBookings from './pages/admin/AdminBookings'
import AdminFleet from './pages/admin/AdminFleet'
import AdminUsers from './pages/admin/AdminUsers'
import AdminReports from './pages/admin/AdminReports'
import DemandForecastDashboard from './pages/admin/DemandForecastDashboard'
import AdminReviews from './pages/admin/AdminReviews'
import AdminPricing from './pages/admin/AdminPricing'
// Activity Sync — new admin modules
import AdminActivityFeed from './pages/admin/AdminActivityFeed'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminAuditLog from './pages/admin/AdminAuditLog'
import AdminSessions from './pages/admin/AdminSessions'
import AdminSearchAnalytics from './pages/admin/AdminSearchAnalytics'

// New Admin Modules
import PaymentsManagement from './pages/admin/PaymentsManagement'
import ChauffeurStats from './pages/admin/ChauffeurStats'
import UserFavorites from './pages/admin/UserFavorites'
import BookingsManagement from './pages/admin/BookingsManagement'
import BookingDetails from './pages/admin/BookingDetails'
import UserDetails from './pages/admin/UserDetails'
import AdminChauffeurDetails from './pages/admin/ChauffeurDetails'
import InquiriesManagement from './pages/admin/InquiriesManagement'


function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SplashScreen />
        <AuthProvider>
          <BookingProvider>
            <Routes>

              {/* AUTH ROUTES (Blank Layout) */}
              <Route element={<AuthLayout />}>
                <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="signup" element={<PublicRoute><SignUp /></PublicRoute>} />
                <Route path="forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                <Route path="auth/update-password" element={<UpdatePassword />} />
              </Route>

              {/* STANDALONE PAGES (No Navbar/Footer) */}
              <Route path="history" element={<ProtectedRoute><HeritageHistory /></ProtectedRoute>} />
              <Route path="chauffeurs/:id" element={<ProtectedRoute><ChauffeurBio /></ProtectedRoute>} />


              {/* MAIN APP ROUTES (With Header/Footer) - FULLY PROTECTED */}
              <Route element={<ProtectedRoute><RootLayout /></ProtectedRoute>}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="team/:slug" element={<TeamMemberBio />} />

                {/* PUBLIC PAGES -> NOW PROTECTED */}
                <Route path="services" element={<Services />} />
                <Route path="contact" element={<Contact />} />
                <Route path="legal/terms" element={<Terms />} />
                <Route path="legal/privacy" element={<Privacy />} />

                <Route path="account-suspended" element={<AccountSuspended />} />
                <Route path="account-verified" element={<AccountVerified />} />
                <Route path="account-deletion" element={<AccountDeletion />} />

                {/* BLOG */}
                <Route path="blog" element={<BlogList />} />
                <Route path="blog/history" element={<BlogList />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />

                {/* USER ACCOUNT ROUTES */}
                <Route element={<DashboardLayout />}>
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="settings" element={<UserSettings />} />
                </Route>

                {/* FLEET */}
                <Route path="fleet" element={<FleetListing />} />
                <Route path="fleet/:id" element={<CarDetails />} />
                <Route path="fleet/compare" element={<CompareVehicles />} />
                <Route path="add-vehicle" element={<AddVehicle />} />

                {/* MODERN BOOKING WIZARD */}
                <Route path="booking/:carId" element={<BookingDetails360 />} />
                <Route path="booking/:carId/itinerary" element={<BookingItinerary />} />
                <Route path="booking/:carId/chauffeur" element={<ChauffeurSelection />} />
                <Route path="booking/:carId/chauffeur/:chauffeurId" element={<ChauffeurDetails />} />
                <Route path="booking/:carId/documents" element={<DocumentVerification />} />
                <Route path="booking/:carId/summary" element={<BookingSummary />} />
                <Route path="booking/:carId/payment" element={<SecureCheckout />} />
                <Route path="booking-flow/:carId" element={<BookingFlow />} />
                <Route path="booking/confirmation/:bookingId" element={<BookingConfirmation />} />
                <Route path="booking/upload-documents/:bookingId" element={<DocumentUpload />} />
                <Route path="booking/pending/:bookingId" element={<PendingBookingPage />} />


                <Route path="booking/:bookingId/cancellation" element={<BookingCancellation />} />
                <Route path="booking/invoice/:id" element={<InvoicePage />} />
                <Route path="upgrade-offer" element={<UpgradeOffer />} />

                <Route path="commitment" element={<Commitment />} />
                <Route path="chauffeurs" element={<ChauffeurDirectory />} />

                <Route path="concierge" element={<ConciergeChat />} />
                <Route path="corporate/events" element={<CorporateEvents />} />

                {/* WEDDING */}
                <Route path="events/wedding" element={<WeddingCollection />} />
                <Route path="wedding/inquiry" element={<WeddingBespokeInquiry />} />
                <Route path="wedding/car/:id" element={<WeddingCarDetail />} />
                <Route path="wedding/decor" element={<WeddingDecorCustomization />} />
                <Route path="wedding/visualizer" element={<WeddingDecorVisualizer />} />
                <Route path="wedding/logistics" element={<WeddingGuestLogistics />} />
                <Route path="wedding/success" element={<WeddingReservationSuccess />} />

                {/* CUSTOMER DASHBOARD - PROTECTED */}
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                   <Route path="bookings" element={<MyBookingsList />} />
                  <Route path="payments" element={<PaymentHistory />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="history" element={<RentalHistory />} />
                  <Route path="support" element={<Support />} />
                  <Route path="notifications" element={<NotificationCenter />} />
                  <Route path="waitlist" element={<WaitlistDashboard />} />
                  <Route path="my-vehicles" element={<MyVehicles />} />
                  
                  {/* Redirect old paths */}
                  <Route path="profile" element={<Navigate to="/profile" replace />} />
                  <Route path="settings" element={<Navigate to="/settings" replace />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>

                {/* ACTIVE RENTAL & SUPPORT - PROTECTED */}
                <Route path="rental/:bookingId/tracking" element={<ActiveTracking />} />
                <Route path="rental/:bookingId/support" element={<RoadsideSupport />} />
                <Route path="rental/:bookingId/extend" element={<ExtendRental />} />
                <Route path="rental/:bookingId/return" element={<DigitalReturn />} />

                {/* OPERATIONS - PROTECTED */}
                <Route path="operations/handover/:bookingId" element={<HandoverChecklist />} />
                <Route path="operations/return/:bookingId" element={<ReturnChecklist />} />
              </Route>

              {/* ADMIN PORTAL — Auth-protected */}
              <Route path="admin" element={<AdminAuthProvider />}>
                {/* Public login — no auth required */}
                <Route path="login" element={<AdminLogin />} />

                {/* All other admin routes — protected */}
                <Route element={<ProtectedAdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="bookings" element={<BookingsManagement />} />
                    <Route path="bookings/:bookingId" element={<BookingDetails />} />
                    <Route path="fleet" element={<AdminFleet />} />
                    <Route path="fleet/approvals" element={<VehicleApproval />} />
                    <Route path="fleet/add" element={<AddVehicleWizard />} />
                    <Route path="customers" element={<AdminUsers />} />
                    <Route path="customers/:userId" element={<UserDetails />} />
                    <Route path="payments" element={<PaymentsManagement />} />
                    <Route path="chauffeurs" element={<ChauffeurStats />} />
                    <Route path="chauffeurs/:chauffeurId" element={<AdminChauffeurDetails />} />
                    <Route path="favorites" element={<UserFavorites />} />
                    <Route path="drivers" element={<DriverManager />} />
                    <Route path="content" element={<ContentManager />} />
                    <Route path="inquiries" element={<InquiriesManagement />} />
                    <Route path="reports" element={<AdminReports />} />
                    <Route path="demand" element={<DemandForecastDashboard />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="pricing" element={<AdminPricing />} />
                    <Route path="settings" element={<AdminSettings />} />
                    {/* Activity Sync Routes */}
                    <Route path="activity" element={<AdminActivityFeed />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="audit" element={<AdminAuditLog />} />
                    <Route path="sessions" element={<AdminSessions />} />
                    <Route path="search-analytics" element={<AdminSearchAnalytics />} />
                    <Route path="*" element={<PlaceholderPage title="Page Not Found" description="Admin route does not exist." />} />
                  </Route>
                </Route>
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-center" theme="dark" />
            <Toast />
          </BookingProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
