Complete Product Requirements Document (PRD)
Luxury Car Rental Platform - Ahmedabad

1. EXECUTIVE SUMMARY
1.1 Product Vision
A premium luxury car rental platform serving Ahmedabad, offering 100+ high-end vehicles with seamless booking, multiple payment options, and white-glove delivery service.
1.2 Technology Stack

Frontend Framework: React 19+ with TypeScript
Build Tool: Vite with React Compiler optimization
State Management: React Context API + useReducer
Routing: React Router v6
HTTP Client: Fetch API with custom wrapper
Styling: Tailwind CSS + shadcn/ui components
Form Handling: React Hook Form + Zod validation
Date Handling: date-fns
Image Optimization: React lazy loading + Intersection Observer

1.3 Core Features

15 interconnected pages
Role-based access (User/Admin)
Real-time availability checking
Multi-gateway payment integration
Home delivery & pickup options
Dynamic pricing engine
Booking management system


2. ARCHITECTURE OVERVIEW
2.1 Frontend Folder Structure
src/
├── main.tsx                    # Application entry point
├── App.tsx                     # Root component with routing
├── vite-env.d.ts              # Vite type definitions
│
├── pages/                      # All 15 pages
│   ├── HomePage.tsx
│   ├── AuthPage.tsx
│   ├── UserDashboard.tsx
│   ├── CarListingPage.tsx
│   ├── CarDetailsPage.tsx
│   ├── BookingPage.tsx
│   ├── DeliveryLocationPage.tsx
│   ├── AddOnsPage.tsx
│   ├── PriceSummaryPage.tsx
│   ├── PaymentPage.tsx
│   ├── BookingConfirmationPage.tsx
│   ├── MyBookingsPage.tsx
│   ├── AdminCarManagement.tsx
│   ├── AdminOrderManagement.tsx
│   └── SupportPoliciesPage.tsx
│
├── components/                 # Reusable UI components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProtectedRoute.tsx
│   ├── cars/
│   │   ├── CarCard.tsx
│   │   ├── CarGallery.tsx
│   │   ├── CarFilters.tsx
│   │   └── CarSpecifications.tsx
│   ├── booking/
│   │   ├── DateTimePicker.tsx
│   │   ├── PriceBreakdown.tsx
│   │   └── BookingStatusBadge.tsx
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── LoadingSpinner.tsx
│   └── admin/
│       ├── DataTable.tsx
│       └── StatsCard.tsx
│
├── context/                    # Global state management
│   ├── AuthContext.tsx
│   ├── BookingContext.tsx
│   ├── CartContext.tsx
│   └── ToastContext.tsx
│
├── services/                   # API integration layer
│   ├── api.ts                 # Base API configuration
│   ├── authService.ts
│   ├── carService.ts
│   ├── bookingService.ts
│   ├── paymentService.ts
│   └── adminService.ts
│
├── types/                      # TypeScript interfaces
│   ├── car.types.ts
│   ├── booking.types.ts
│   ├── user.types.ts
│   ├── payment.types.ts
│   └── api.types.ts
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts
│   ├── useBooking.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
│
├── utils/                      # Utility functions
│   ├── dateHelpers.ts
│   ├── priceCalculator.ts
│   ├── validators.ts
│   └── formatters.ts
│
└── constants/                  # App constants
    ├── routes.ts
    ├── apiEndpoints.ts
    └── config.ts
2.2 Backend API Structure (Language-Agnostic REST)
/api/v1/
├── auth/
│   ├── POST /login
│   ├── POST /register
│   ├── POST /verify-otp
│   ├── POST /logout
│   └── GET /me
│
├── cars/
│   ├── GET /featured
│   ├── GET /
│   ├── GET /:id
│   ├── GET /:id/availability
│   └── GET /brands
│
├── bookings/
│   ├── POST /calculate
│   ├── POST /create
│   ├── POST /:id/location
│   ├── POST /:id/addons
│   ├── GET /summary/:id
│   ├── GET /user
│   ├── GET /:id
│   ├── PUT /:id/cancel
│   └── GET /:id/invoice
│
├── payments/
│   ├── POST /initiate
│   ├── POST /verify
│   └── GET /status/:id
│
├── locations/
│   └── GET /
│
├── support/
│   ├── POST /ticket
│   └── GET /faq
│
└── admin/
    ├── cars/
    │   ├── POST /
    │   ├── PUT /:id
    │   ├── DELETE /:id
    │   └── POST /:id/images
    │
    └── bookings/
        ├── GET /
        ├── PUT /:id/status
        └── PUT /:id/assign-driver
2.3 Database Schema (Relational)
Users Table
sqlusers {
  id: UUID PRIMARY KEY
  phone: VARCHAR(10) UNIQUE
  email: VARCHAR(255) UNIQUE
  name: VARCHAR(100)
  role: ENUM('user', 'admin')
  wallet_balance: DECIMAL(10,2)
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
Cars Table
sqlcars {
  id: UUID PRIMARY KEY
  brand: VARCHAR(50)
  model: VARCHAR(100)
  year: INTEGER
  category: VARCHAR(50)
  transmission: ENUM('automatic', 'manual')
  fuel_type: VARCHAR(20)
  seating: INTEGER
  hourly_rate: DECIMAL(10,2)
  daily_rate: DECIMAL(10,2)
  weekly_rate: DECIMAL(10,2)
  deposit_amount: DECIMAL(10,2)
  is_available: BOOLEAN
  images: JSON
  specifications: JSON
  created_at: TIMESTAMP
}
Bookings Table
sqlbookings {
  id: UUID PRIMARY KEY
  user_id: UUID FOREIGN KEY
  car_id: UUID FOREIGN KEY
  pickup_datetime: TIMESTAMP
  dropoff_datetime: TIMESTAMP
  delivery_type: ENUM('home', 'office', 'branch')
  delivery_address: TEXT
  status: ENUM('pending', 'confirmed', 'ongoing', 'completed', 'cancelled')
  base_price: DECIMAL(10,2)
  addons_price: DECIMAL(10,2)
  tax_amount: DECIMAL(10,2)
  total_amount: DECIMAL(10,2)
  deposit_paid: DECIMAL(10,2)
  payment_status: ENUM('pending', 'paid', 'refunded')
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
Booking_AddOns Table
sqlbooking_addons {
  id: UUID PRIMARY KEY
  booking_id: UUID FOREIGN KEY
  addon_type: VARCHAR(50)
  addon_name: VARCHAR(100)
  price: DECIMAL(10,2)
}
Payments Table
sqlpayments {
  id: UUID PRIMARY KEY
  booking_id: UUID FOREIGN KEY
  user_id: UUID FOREIGN KEY
  amount: DECIMAL(10,2)
  payment_method: ENUM('paytm', 'phonepe', 'gpay', 'cod')
  transaction_id: VARCHAR(255)
  status: ENUM('pending', 'success', 'failed')
  gateway_response: JSON
  created_at: TIMESTAMP
}

3. DETAILED PAGE SPECIFICATIONS
PAGE 1: HOME PAGE (/)
3.1.1 Purpose
First touchpoint showcasing luxury brand identity and facilitating quick car discovery.
3.1.2 Components & Layout
Hero Section

Full-width background image (luxury car)
H1: "Premium Luxury Cars in Ahmedabad"
Subtitle: "Drive Your Dream, Delivered to Your Doorstep"
CTA Button: "Explore Collection"

Search Bar Component
typescriptinterface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

interface SearchParams {
  location: string;
  pickupDate: Date;
  pickupTime: string;
  dropoffDate: Date;
  dropoffTime: string;
}
Inputs:

Location Dropdown (Ahmedabad areas)
Pickup Date Picker
Pickup Time Selector
Dropoff Date Picker
Dropoff Time Selector

Button Actions:

"Search Cars"

Validates all fields
Stores search params in BookingContext
Navigates to /cars?pickup=${date}&dropoff=${date}&location=${loc}
Backend call: None (search executed on Car Listing page)



Featured Cars Section

Grid layout (3 columns on desktop)
Shows 6 top-rated luxury cars
Each car displays: Image, Brand, Model, Starting price

CarCard Component:
typescriptinterface CarCardProps {
  car: {
    id: string;
    brand: string;
    model: string;
    image: string;
    dailyRate: number;
    rating: number;
  };
  onClick: (id: string) => void;
}
Button in CarCard:

"View Details"

onClick: navigate('/cars/${car.id}')
No backend call (navigation only)



Trust Badges Section

Icons with text: "100% Insured", "Sanitized Daily", "24x7 Support", "Free Home Delivery"

Footer Integration

Links to Support, Terms, Privacy Policy

3.1.3 API Connections
On Page Load:
typescript// services/carService.ts
export const getFeaturedCars = async (): Promise<Car[]> => {
  const response = await fetch('/api/v1/cars/featured');
  return response.json();
};

// HomePage.tsx
useEffect(() => {
  const loadFeaturedCars = async () => {
    const cars = await getFeaturedCars();
    setFeaturedCars(cars);
  };
  loadFeaturedCars();
}, []);
```

**Backend Endpoint:**
```
GET /api/v1/cars/featured
Response: {
  success: true,
  data: [
    {
      id: "car-uuid-1",
      brand: "BMW",
      model: "7 Series",
      year: 2023,
      dailyRate: 12000,
      image: "https://cdn.example.com/bmw-7.jpg",
      rating: 4.8
    }
  ]
}
3.1.4 State Management
typescript// HomePage.tsx
const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
const [loading, setLoading] = useState(true);

// No global state needed - read-only page
```

#### 3.1.5 Navigation Flow
```
Home → "Search Cars" → Car Listing Page (with filters)
Home → "View Details" (on CarCard) → Car Details Page
Home → "Login" (Navbar) → Auth Page

PAGE 2: AUTH PAGE (/auth)
3.2.1 Purpose
Secure user authentication using phone/email with OTP verification.
3.2.2 Components & Layout
Tabs Component:

Two tabs: "Login" | "Register"
State: activeTab (useState)

Login Form
typescriptinterface LoginFormData {
  phoneOrEmail: string;
  otp?: string;
}
Form Fields:

Phone/Email Input

Type: text
Validation: Phone (10 digits) or Email format
onChange: Updates phoneOrEmail state


OTP Input (shown after "Send OTP" clicked)

Type: text (6 digits)
Auto-focus when visible
onChange: Updates otp state



Button 1: "Send OTP"

Enabled when: phoneOrEmail is valid
onClick Handler:

typescript  const handleSendOTP = async () => {
    setLoading(true);
    try {
      await authService.sendOTP({ phoneOrEmail });
      setOtpSent(true);
      showToast('OTP sent successfully');
    } catch (error) {
      showToast('Failed to send OTP', 'error');
    }
    setLoading(false);
  };

Backend Call: POST /api/v1/auth/send-otp
Response handling: Shows OTP input field

Button 2: "Verify & Login"

Enabled when: otp has 6 digits
onClick Handler:

typescript  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await authService.verifyOTP({ 
        phoneOrEmail, 
        otp 
      });
      
      // Store token in AuthContext
      authContext.login(response.data.token, response.data.user);
      
      // Navigate based on user role
      if (response.data.user.role === 'admin') {
        navigate('/admin/cars');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      showToast('Invalid OTP', 'error');
    }
    setLoading(false);
  };

Backend Call: POST /api/v1/auth/verify-otp

Register Form
typescriptinterface RegisterFormData {
  phone: string;
  email: string;
  name: string;
  otp: string;
}
```

**Form Fields:**
1. Full Name (required)
2. Phone Number (required, unique)
3. Email (required, unique)
4. OTP Input (shown after Send OTP)

**Button 3: "Send OTP" (Register)**
- Same logic as login OTP
- Backend Call: `POST /api/v1/auth/register/send-otp`

**Button 4: "Create Account"**
- Validates all fields
- Verifies OTP
- Creates user account
- Auto-logs in user
- Backend Call: `POST /api/v1/auth/register`

#### 3.2.3 API Connections

**Send OTP (Login)**
```
POST /api/v1/auth/send-otp
Request: {
  phoneOrEmail: "9876543210"
}
Response: {
  success: true,
  message: "OTP sent to 9876543210"
}
```

**Verify OTP & Login**
```
POST /api/v1/auth/verify-otp
Request: {
  phoneOrEmail: "9876543210",
  otp: "123456"
}
Response: {
  success: true,
  data: {
    token: "jwt-token-here",
    user: {
      id: "user-uuid",
      name: "John Doe",
      phone: "9876543210",
      email: "john@example.com",
      role: "user",
      walletBalance: 0
    }
  }
}
```

**Register New User**
```
POST /api/v1/auth/register
Request: {
  phone: "9876543210",
  email: "john@example.com",
  name: "John Doe",
  otp: "123456"
}
Response: {
  success: true,
  data: {
    token: "jwt-token-here",
    user: { /* same as login */ }
  }
}
3.2.4 State Management
Local State:
typescriptconst [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
const [phoneOrEmail, setPhoneOrEmail] = useState('');
const [otp, setOtp] = useState('');
const [otpSent, setOtpSent] = useState(false);
const [loading, setLoading] = useState(false);

// Register form
const [registerData, setRegisterData] = useState({
  name: '',
  phone: '',
  email: '',
  otp: ''
});
Global State (AuthContext):
typescriptinterface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// AuthContext.tsx
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('authToken')
  );

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### 3.2.5 Navigation Flow
```
Auth Page → Login Success → User Dashboard (if role=user)
Auth Page → Login Success → Admin Car Management (if role=admin)
Auth Page → Register Success → User Dashboard
Navbar "Login" → Auth Page

PAGE 3: USER DASHBOARD (/dashboard)
3.3.1 Purpose
Central hub for user to manage profile, bookings, and wallet.
3.3.2 Components & Layout
Header Section

Welcome message: "Welcome back, {user.name}!"
Profile picture placeholder
Quick stats: Total bookings, Active rentals, Wallet balance

Profile Summary Card
typescriptinterface ProfileSummary {
  name: string;
  phone: string;
  email: string;
  memberSince: Date;
  totalBookings: number;
}
Display Fields:

Name
Phone number
Email
Member since date

Button 1: "Edit Profile"

onClick: navigate('/profile')
Opens profile edit page
No backend call on click

Active Bookings Section

Shows current/upcoming bookings
Card layout with booking details
Maximum 3 bookings displayed (with "View All" link)

Booking Card Component:
typescriptinterface BookingCardProps {
  booking: {
    id: string;
    carBrand: string;
    carModel: string;
    pickupDate: Date;
    dropoffDate: Date;
    status: BookingStatus;
    totalAmount: number;
  };
}
Button 2: "View Booking Details"

onClick: navigate('/booking/${booking.id}')
Shows in MyBookingsPage
No backend call on click

Button 3: "Cancel Booking" (if status = 'confirmed')

onClick Handler:

typescript  const handleCancelBooking = async (bookingId: string) => {
    const confirmed = window.confirm('Are you sure you want to cancel?');
    if (!confirmed) return;
    
    setLoading(true);
    try {
      await bookingService.cancelBooking(bookingId);
      showToast('Booking cancelled successfully');
      // Refresh bookings
      loadActiveBookings();
    } catch (error) {
      showToast('Failed to cancel booking', 'error');
    }
    setLoading(false);
  };

Backend Call: PUT /api/v1/bookings/${id}/cancel

Wallet Section

Current balance display
Recent transactions (last 5)
Transaction history link

Button 4: "View All Transactions"

onClick: navigate('/wallet')
Future enhancement (not in 15 pages)

Quick Actions Section

Button grid for common actions

Button 5: "Book a Car"

onClick: navigate('/cars')
Direct navigation to car listing

Button 6: "My Bookings"

onClick: navigate('/my-bookings')
Shows all bookings page

Button 7: "Support"

onClick: navigate('/support')
Opens support page

3.3.3 API Connections
Load Dashboard Data (On Mount):
typescriptuseEffect(() => {
  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [userData, activeBookings, walletData] = await Promise.all([
        authService.getCurrentUser(),
        bookingService.getActiveBookings(),
        walletService.getBalance()
      ]);
      
      setUser(userData);
      setActiveBookings(activeBookings);
      setWallet(walletData);
    } catch (error) {
      showToast('Failed to load dashboard', 'error');
    }
    setLoading(false);
  };
  
  loadDashboard();
}, []);
```

**Backend Endpoints:**

1. **Get Current User**
```
GET /api/v1/auth/me
Headers: { Authorization: "Bearer {token}" }
Response: {
  success: true,
  data: {
    id: "user-uuid",
    name: "John Doe",
    phone: "9876543210",
    email: "john@example.com",
    memberSince: "2024-01-15T10:30:00Z",
    totalBookings: 12
  }
}
```

2. **Get Active Bookings**
```
GET /api/v1/bookings/user?status=active
Headers: { Authorization: "Bearer {token}" }
Response: {
  success: true,
  data: [
    {
      id: "booking-uuid-1",
      carId: "car-uuid",
      carBrand: "BMW",
      carModel: "7 Series",
      carImage: "url",
      pickupDate: "2026-01-25T10:00:00Z",
      dropoffDate: "2026-01-27T10:00:00Z",
      status: "confirmed",
      totalAmount: 24000
    }
  ]
}
```

3. **Cancel Booking**
```
PUT /api/v1/bookings/{id}/cancel
Headers: { Authorization: "Bearer {token}" }
Request: {
  reason: "Change of plans"
}
Response: {
  success: true,
  data: {
    bookingId: "booking-uuid",
    status: "cancelled",
    refundAmount: 22000,
    refundStatus: "pending"
  }
}
3.3.4 State Management
Local State:
typescriptconst [activeBookings, setActiveBookings] = useState<Booking[]>([]);
const [walletBalance, setWalletBalance] = useState(0);
const [loading, setLoading] = useState(true);
Global State:
typescript// Uses AuthContext for user data
const { user } = useAuth();
3.3.5 Protected Route
typescript// App.tsx routing
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  } 
/>

// ProtectedRoute.tsx
export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};
```

#### 3.3.6 Navigation Flow
```
Dashboard → "Edit Profile" → Profile Page (future)
Dashboard → "View Booking" → My Bookings Page (specific booking)
Dashboard → "Book a Car" → Car Listing Page
Dashboard → "My Bookings" → My Bookings Page
Dashboard → "Support" → Support & Policies Page

PAGE 4: CAR LISTING PAGE (/cars)
3.4.1 Purpose
Browse all available luxury cars with advanced filtering and sorting.
3.4.2 Components & Layout
Filter Sidebar Component
typescriptinterface CarFilters {
  brands: string[];
  priceRange: [number, number];
  fuelType: string[];
  transmission: string[];
  seating: number[];
  categories: string[];
}
Filter Controls:

Brand Filter (Multi-select checkboxes)

Options: BMW, Audi, Mercedes, Ferrari, Lamborghini, Porsche, Rolls Royce, etc.
State: selectedBrands: string[]
onChange: Updates filter state


Price Range Slider

Min: ₹5,000/day
Max: ₹50,000/day
State: priceRange: [min, max]
Uses controlled input


Fuel Type (Radio buttons)

Options: Petrol, Diesel, Electric, Hybrid
State: fuelType: string


Transmission (Checkboxes)

Options: Automatic, Manual
State: transmission: string[]


Seating Capacity (Checkboxes)

Options: 2, 4, 5, 7
State: seating: number[]


Category Filter

Options: Sedan, SUV, Convertible, Luxury, Sports
State: categories: string[]



Button 1: "Apply Filters"

onClick Handler:

typescript  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams();
    
    if (selectedBrands.length > 0) {
      queryParams.set('brands', selectedBrands.join(','));
    }
    if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
      queryParams.set('minPrice', priceRange[0].toString());
      queryParams.set('maxPrice', priceRange[1].toString());
    }
    if (fuelType.length > 0) {
      queryParams.set('fuelType', fuelType.join(','));
    }
    if (transmission.length > 0) {
      queryParams.set('transmission', transmission.join(','));
    }
    
    // Update URL and fetch cars
    navigate(`/cars?${queryParams.toString()}`);
    loadCars(queryParams);
  };

Updates URL params
Triggers backend call

Button 2: "Clear All Filters"

onClick: Resets all filter states to defaults
Calls loadCars() without filters

Main Content Area
Sorting Dropdown

Options: "Price: Low to High", "Price: High to Low", "Rating", "Newest"
State: sortBy: string
onChange: Re-fetches with sort param

Results Header

Shows: "Showing {count} luxury cars"
Filter tags (removable pills)

Car Grid

Responsive grid: 3 cols (desktop), 2 (tablet), 1 (mobile)
Each card shows:

Car image (with lazy loading)
Brand + Model
Daily rate (₹)
Key specs (Fuel, Transmission, Seats)
Rating stars
Availability badge



CarCard Component (Enhanced):
typescriptinterface CarCardProps {
  car: {
    id: string;
    brand: string;
    model: string;
    year: number;
    image: string;
    dailyRate: number;
    hourlyRate: number;
    fuelType: string;
    transmission: string;
    seating: number;
    rating: number;
    isAvailable: boolean;
  };
}
Button 3: "View Details" (in each CarCard)

onClick: navigate('/cars/${car.id}')
No backend call

Button 4: "Quick Book" (in each CarCard)

onClick Handler:

typescript  const handleQuickBook = (carId: string) => {
    // Store car in BookingContext
    bookingContext.selectCar(carId);
    navigate('/booking/create');
  };

Uses BookingContext
Navigates to booking page

Pagination Component

Shows if total cars > 12
Page size: 12 cars per page
State: currentPage: number

Button 5: "Previous Page"

Enabled when: currentPage > 1
onClick: setCurrentPage(prev => prev - 1) + fetch

Button 6: "Next Page"

Enabled when: currentPage < totalPages
onClick: setCurrentPage(prev => prev + 1) + fetch

No Results State

Shows when filtered cars = 0
Message: "No cars match your filters"
Button: "Clear Filters"

3.4.3 API Connections
Load Cars with Filters:
typescriptconst loadCars = async (filters?: URLSearchParams) => {
  setLoading(true);
  try {
    const cars = await carService.getCars({
      brands: filters?.get('brands')?.split(','),
      minPrice: Number(filters?.get('minPrice')),
      maxPrice: Number(filters?.get('maxPrice')),
      fuelType: filters?.get('fuelType')?.split(','),
      transmission: filters?.get('transmission')?.split(','),
      seating: filters?.get('seating')?.split(',').map(Number),
      sortBy: filters?.get('sortBy'),
      page: Number(filters?.get('page')) || 1,
      limit: 12
    });
    
    setCars(cars.data);
    setTotalPages(cars.totalPages);
    setTotalCount(cars.totalCount);
  } catch (error) {
    showToast('Failed to load cars', 'error');
  }
  setLoading(false);
};

useEffect(() => {
  const params = new URLSearchParams(location.search);
  loadCars(params);
}, [location.search]);
Backend Endpoint:
GET /api/v1/cars?brands=BMW,Audi&minPrice=10000&maxPrice=30000&transmission=automatic&page=1&limit=12
Response: {
  success: true,
  data: [
    {
      id: "car-uuid-1",
      brand: "BMW",
      model: "7 Series",
      year: 2023,
      category: "Luxury Sedan",
      transmission: "automatic",
      fuelType: "petrol",
      seating: 5,
      hourlyRate: 1500,
      dailyRate: 12000,
      weeklyRate: 70000,
      depositAmount: 50000,
      isContinue7:36 PMAvailable: true,
images: ["url1", "url2"],
rating: 4.8,
specifications: {
engine: "3.0L Turbo",
power: "335 HP",
torque: "450 Nm"
}
}
],
totalCount: 47,
totalPages: 4,
currentPage: 1
}

**Get Filter Options (on mount):**
GET /api/v1/cars/filters
Response: {
success: true,
data: {
brands: ["BMW", "Audi", "Mercedes"],
priceRange: { min: 5000, max: 50000 },
fuelTypes: ["petrol", "diesel", "electric"],
transmissions: ["automatic", "manual"],
seatings: [2, 4, 5, 7],
categories: ["Sedan", "SUV", "Sports"]
}
}

#### 3.4.4 State Management

**Local State:**
```typescript
const [cars, setCars] = useState<Car[]>([]);
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [totalCount, setTotalCount] = useState(0);

// Filters
const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
const [priceRange, setPriceRange] = useState<[number, number]>([5000, 50000]);
const [fuelType, setFuelType] = useState<string[]>([]);
const [transmission, setTransmission] = useState<string[]>([]);
const [seating, setSeating] = useState<number[]>([]);
const [sortBy, setSortBy] = useState('popular');
```

**URL State Sync:**
```typescript
// Read from URL on mount
useEffect(() => {
  const params = new URLSearchParams(location.search);
  
  const brands = params.get('brands')?.split(',') || [];
  const minPrice = Number(params.get('minPrice')) || 5000;
  const maxPrice = Number(params.get('maxPrice')) || 50000;
  
  setSelectedBrands(brands);
  setPriceRange([minPrice, maxPrice]);
  // ... set other filters
}, [location.search]);
```

#### 3.4.5 Navigation Flow
Car Listing → "View Details" → Car Details Page
Car Listing → "Quick Book" → Booking Page (with pre-selected car)
Car Listing → Filters → Updated URL → Re-fetch cars

---

### PAGE 5: CAR DETAILS PAGE (`/cars/:id`)

#### 3.5.1 Purpose
Comprehensive view of a single car with specifications, images, pricing, and availability.

#### 3.5.2 Components & Layout

**Image Gallery Component**
```typescript
interface ImageGallery {
  images: string[];
  currentIndex: number;
}
```

**Features:**
- Main large image display
- Thumbnail strip below
- Lightbox modal on click
- Navigation arrows

**Button 1: "Previous Image"**
- onClick: `setCurrentIndex(prev => (prev - 1 + images.length) % images.length)`

**Button 2: "Next Image"**
- onClick: `setCurrentIndex(prev => (prev + 1) % images.length)`

**Button 3: "View Fullscreen"**
- onClick: Opens modal with full-size image
- ESC to close

**Car Information Section**

**Header:**
- Brand + Model (H1)
- Year
- Rating stars + review count
- Availability badge

**Pricing Card**
```typescript
interface PricingDisplay {
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  depositAmount: number;
}
```

**Display:**
- ₹{hourlyRate}/hour
- ₹{dailyRate}/day (highlighted as best value)
- ₹{weeklyRate}/week
- Security Deposit: ₹{depositAmount} (refundable)

**Button 4: "Book Now"**
- Primary CTA button (large, prominent)
- onClick Handler:
```typescript
  const handleBookNow = () => {
    // Store selected car in BookingContext
    bookingContext.selectCar(car);
    
    // Check if user is logged in
    if (!isAuthenticated) {
      // Store intended destination
      sessionStorage.setItem('redirectAfterLogin', '/booking/create');
      navigate('/auth');
      return;
    }
    
    navigate('/booking/create');
  };
```
- Stores car in context
- Redirects to auth if not logged in

**Button 5: "Add to Wishlist"** (Heart icon)
- Toggle state: `isWishlisted`
- onClick Handler:
```typescript
  const handleWishlist = async () => {
    if (!isAuthenticated) {
      showToast('Please login to add to wishlist');
      return;
    }
    
    setIsWishlisted(!isWishlisted);
    try {
      if (isWishlisted) {
        await carService.removeFromWishlist(car.id);
        showToast('Removed from wishlist');
      } else {
        await carService.addToWishlist(car.id);
        showToast('Added to wishlist');
      }
    } catch (error) {
      setIsWishlisted(!isWishlisted); // Revert on error
      showToast('Failed to update wishlist', 'error');
    }
  };
```
- Backend Call: `POST /api/v1/wishlist/add` or `DELETE /api/v1/wishlist/remove`

**Specifications Table**
```typescript
interface CarSpecifications {
  engine: string;
  power: string;
  torque: string;
  topSpeed: string;
  acceleration: string;
  fuelType: string;
  transmission: string;
  seating: number;
  bootSpace: string;
  mileage: string;
}
```

**Display Format:**
- Two-column grid
- Icon + Label + Value for each spec

**Features List**
- Bullet points with icons
- Examples: "Leather Seats", "Sunroof", "Advanced Safety", "Premium Audio"

**Availability Calendar Component**
```typescript
interface AvailabilityCalendar {
  bookedDates: Date[];
  selectedRange: [Date | null, Date | null];
}
```

**Features:**
- Monthly calendar view
- Booked dates shown in red
- Available dates in green
- Click to select date range

**Date Selection:**
- State: `selectedPickup: Date | null`, `selectedDropoff: Date | null`
- Validates: Dropoff > Pickup
- Validates: No booked dates in range

**Button 6: "Check Availability"**
- Visible when date range selected
- onClick Handler:
```typescript
  const handleCheckAvailability = async () => {
    if (!selectedPickup || !selectedDropoff) {
      showToast('Please select pickup and dropoff dates');
      return;
    }
    
    setChecking(true);
    try {
      const availability = await carService.checkAvailability(car.id, {
        pickupDate: selectedPickup,
        dropoffDate: selectedDropoff
      });
      
      if (availability.isAvailable) {
        showToast('Car is available for selected dates!');
        setIsAvailable(true);
      } else {
        showToast('Car not available. Please select different dates.');
        setIsAvailable(false);
      }
    } catch (error) {
      showToast('Failed to check availability', 'error');
    }
    setChecking(false);
  };
```
- Backend Call: `GET /api/v1/cars/:id/availability?pickup=date&dropoff=date`

**Similar Cars Section**
- Shows 4 similar cars (same category/brand)
- Horizontal scroll on mobile
- Each car has "View" button

**Button 7: "View Similar Car"**
- onClick: `navigate('/cars/${similarCar.id}')`
- Replaces current car details

**Reviews Section**
- Shows recent reviews (5 max)
- Rating breakdown chart
- "Load More Reviews" button (future feature)

#### 3.5.3 API Connections

**Load Car Details (On Mount):**
```typescript
useEffect(() => {
  const loadCarDetails = async () => {
    setLoading(true);
    try {
      const carData = await carService.getCarById(carId);
      setCar(carData);
      
      // Load additional data
      const [availabilityData, similarCars] = await Promise.all([
        carService.getAvailabilityDates(carId),
        carService.getSimilarCars(carId)
      ]);
      
      setBookedDates(availabilityData.bookedDates);
      setSimilarCars(similarCars);
    } catch (error) {
      showToast('Car not found', 'error');
      navigate('/cars');
    }
    setLoading(false);
  };
  
  loadCarDetails();
}, [carId]);
```

**Backend Endpoints:**

1. **Get Car Details**
GET /api/v1/cars/{id}
Response: {
success: true,
data: {
id: "car-uuid",
brand: "BMW",
model: "7 Series",
year: 2023,
category: "Luxury Sedan",
transmission: "automatic",
fuelType: "petrol",
seating: 5,
hourlyRate: 1500,
dailyRate: 12000,
weeklyRate: 70000,
depositAmount: 50000,
isAvailable: true,
images: [
"https://cdn.example.com/bmw-7-1.jpg",
"https://cdn.example.com/bmw-7-2.jpg"
],
specifications: {
engine: "3.0L Inline-6 Turbo",
power: "335 HP",
torque: "450 Nm",
topSpeed: "250 km/h",
acceleration: "0-100 in 5.8s",
mileage: "12 km/l",
bootSpace: "515 liters"
},
features: [
"Panoramic Sunroof",
"Massage Seats",
"Harman Kardon Audio",
"Adaptive Cruise Control"
],
rating: 4.8,
reviewCount: 124
}
}

2. **Get Availability Dates**
GET /api/v1/cars/{id}/availability
Response: {
success: true,
data: {
carId: "car-uuid",
bookedDates: [
{ start: "2026-01-25", end: "2026-01-27" },
{ start: "2026-02-01", end: "2026-02-03" }
]
}
}

3. **Check Specific Availability**
GET /api/v1/cars/{id}/availability?pickupDate=2026-01-30&dropoffDate=2026-02-01
Response: {
success: true,
data: {
isAvailable: false,
conflictingBookings: ["booking-uuid-1"],
alternativeDates: [
{ start: "2026-02-04", end: "2026-02-06" }
]
}
}

4. **Get Similar Cars**
GET /api/v1/cars/{id}/similar?limit=4
Response: {
success: true,
data: [
{
id: "car-uuid-2",
brand: "Audi",
model: "A8",
dailyRate: 11000,
image: "url",
rating: 4.7
}
]
}

#### 3.5.4 State Management

**Local State:**
```typescript
const [car, setCar] = useState<Car | null>(null);
const [loading, setLoading] = useState(true);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [bookedDates, setBookedDates] = useState<DateRange[]>([]);
const [selectedPickup, setSelectedPickup] = useState<Date | null>(null);
const [selectedDropoff, setSelectedDropoff] = useState<Date | null>(null);
const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
const [isWishlisted, setIsWishlisted] = useState(false);
const [similarCars, setSimilarCars] = useState<Car[]>([]);
const [showLightbox, setShowLightbox] = useState(false);
```

**Context Usage:**
```typescript
// BookingContext
const { selectCar } = useBooking();

// On "Book Now"
selectCar(car);
```

#### 3.5.5 Navigation Flow
Car Details → "Book Now" → Auth Page (if not logged in) → Booking Page
Car Details → "Book Now" → Booking Page (if logged in)
Car Details → "View Similar Car" → Another Car Details Page
Car Details → Back button → Car Listing Page

---

### PAGE 6: BOOKING PAGE (`/booking/create`)

#### 3.6.1 Purpose
Capture booking details: dates, times, duration, and calculate pricing.

#### 3.6.2 Components & Layout

**Pre-filled Car Information**
- Shows selected car from context
- Car image, brand, model
- Daily rate display

**If no car selected:**
```typescript
useEffect(() => {
  const { selectedCar } = bookingContext;
  
  if (!selectedCar) {
    showToast('Please select a car first');
    navigate('/cars');
  }
}, []);
```

**Date & Time Selection Form**
```typescript
interface BookingFormData {
  pickupDate: Date;
  pickupTime: string;
  dropoffDate: Date;
  dropoffTime: string;
  rentalDuration: number; // calculated in hours
}
```

**Form Fields:**

1. **Pickup Date Picker**
   - Type: Date input with calendar
   - Min date: Today
   - Max date: +6 months
   - onChange: Updates state + validates

2. **Pickup Time Selector**
   - Type: Dropdown (30-min intervals)
   - Options: "08:00 AM" to "10:00 PM"
   - onChange: Updates state

3. **Dropoff Date Picker**
   - Min date: Pickup date
   - Validates: Must be >= pickup date
   - onChange: Updates state + calculates duration

4. **Dropoff Time Selector**
   - Same as pickup time
   - Validates: If same day, must be > pickup time

**Duration Display Component**
```typescript
const calculateDuration = (pickup: Date, dropoff: Date): string => {
  const diffMs = dropoff.getTime() - pickup.getTime();
  const hours = Math.ceil(diffMs / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  if (days === 0) {
    return `${hours} hours`;
  }
  return `${days} day${days > 1 ? 's' : ''} ${remainingHours > 0 ? `and ${remainingHours} hours` : ''}`;
};
```

**Display:**
- Shows calculated duration
- Auto-updates when dates change
- Example: "2 days and 4 hours"

**Rental Type Selection (Radio buttons)**
```typescript
enum RentalType {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly'
}
```

**Options:**
- Hourly (minimum 4 hours)
- Daily (24-hour blocks, best value)
- Weekly (7-day blocks, max savings)

**onChange Handler:**
```typescript
const handleRentalTypeChange = (type: RentalType) => {
  setRentalType(type);
  // Recalculate pricing
  calculatePrice();
};
```

**Price Preview Card**
```typescript
interface PricePreview {
  basePrice: number;
  duration: number;
  rateType: RentalType;
  subtotal: number;
}
```

**Display (real-time):**
- Base rate: ₹{rate}/{period}
- Duration: {calculated duration}
- Subtotal: ₹{basePrice}
- (Taxes and add-ons on next page)

**Button 1: "Calculate Price"**
- onClick Handler:
```typescript
  const handleCalculatePrice = async () => {
    // Validate all fields
    if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime) {
      showToast('Please fill all fields');
      return;
    }
    
    const pickup = combineDateAndTime(pickupDate, pickupTime);
    const dropoff = combineDateAndTime(dropoffDate, dropoffTime);
    
    if (dropoff <= pickup) {
      showToast('Dropoff must be after pickup');
      return;
    }
    
    setCalculating(true);
    try {
      const priceData = await bookingService.calculatePrice({
        carId: selectedCar.id,
        pickupDatetime: pickup,
        dropoffDatetime: dropoff,
        rentalType
      });
      
      setPricePreview(priceData);
      setCalculated(true);
    } catch (error) {
      showToast('Failed to calculate price', 'error');
    }
    setCalculating(false);
  };
```
- Backend Call: `POST /api/v1/bookings/calculate`
- Shows price breakdown

**Button 2: "Continue to Delivery Options"**
- Enabled when: Price calculated
- onClick Handler:
```typescript
  const handleContinue = () => {
    // Store booking data in context
    bookingContext.updateBookingData({
      carId: selectedCar.id,
      pickupDatetime: combineDateAndTime(pickupDate, pickupTime),
      dropoffDatetime: combineDateAndTime(dropoffDate, dropoffTime),
      rentalType,
      basePrice: pricePreview.subtotal
    });
    
    navigate('/booking/delivery');
  };
```
- Saves to BookingContext
- Navigates to delivery page

**Button 3: "Back to Car Details"**
- onClick: `navigate('/cars/${selectedCar.id}')`

**Important Notes Section**
- Display static info:
  - Minimum rental: 4 hours
  - Late return fees: ₹500/hour
  - Fuel policy: Return with same level
  - Cancellation: Free up to 24 hours before

#### 3.6.3 API Connections

**Calculate Booking Price:**
POST /api/v1/bookings/calculate
Request: {
carId: "car-uuid",
pickupDatetime: "2026-01-30T10:00:00Z",
dropoffDatetime: "2026-02-01T10:00:00Z",
rentalType: "daily"
}
Response: {
success: true,
data: {
carId: "car-uuid",
rentalType: "daily",
duration: {
hours: 48,
days: 2,
weeks: 0
},
pricing: {
hourlyRate: 1500,
dailyRate: 12000,
weeklyRate: 70000,
appliedRate: 12000,
quantity: 2,
basePrice: 24000,
subtotal: 24000
},
pickupDatetime: "2026-01-30T10:00:00Z",
dropoffDatetime: "2026-02-01T10:00:00Z"
}
}

**Validation Notes:**
- Backend validates:
  - Car availability for selected dates
  - Minimum rental duration (4 hours)
  - Maximum advance booking (6 months)
  - No overlapping bookings

#### 3.6.4 State Management

**Local State:**
```typescript
const [pickupDate, setPickupDate] = useState<Date | null>(null);
const [pickupTime, setPickupTime] = useState('');
const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
const [dropoffTime, setDropoffTime] = useState('');
const [rentalType, setRentalType] = useState<RentalType>(RentalType.DAILY);
const [pricePreview, setPricePreview] = useState<PricePreview | null>(null);
const [calculated, setCalculated] = useState(false);
const [calculating, setCalculating] = useState(false);
```

**BookingContext State:**
```typescript
interface BookingContextType {
  selectedCar: Car | null;
  bookingData: BookingData | null;
  selectCar: (car: Car) => void;
  updateBookingData: (data: Partial<BookingData>) => void;
  clearBooking: () => void;
}

// BookingContext.tsx
export const BookingProvider: React.FC = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  
  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };
  
  return (
    <BookingContext.Provider value={{
      selectedCar,
      bookingData,
      selectCar: setSelectedCar,
      updateBookingData,
      clearBooking: () => {
        setSelectedCar(null);
        setBookingData(null);
      }
    }}>
      {children}
    </BookingContext.Provider>
  );
};
```

#### 3.6.5 Navigation Flow
Booking Page → "Continue" → Delivery & Location Page
Booking Page → "Back" → Car Details Page
Booking Page (no car selected) → Redirect → Car Listing Page

---

### PAGE 7: DELIVERY & LOCATION PAGE (`/booking/delivery`)

#### 3.7.1 Purpose
Select delivery method and specify pickup/drop-off location.

#### 3.7.2 Components & Layout

**Delivery Method Selection (Radio Cards)**
```typescript
enum DeliveryType {
  HOME = 'home',
  OFFICE = 'office',
  BRANCH = 'branch'
}

interface DeliveryOption {
  type: DeliveryType;
  title: string;
  description: string;
  fee: number;
  icon: string;
}
```

**Option Cards:**

1. **Home Delivery**
   - Title: "Home Delivery"
   - Description: "We'll bring the car to your doorstep"
   - Fee: ₹500
   - Icon: Home icon
   - Badge: "Most Popular"

2. **Office Pickup**
   - Title: "Office Pickup"
   - Description: "Get car delivered to your workplace"
   - Fee: ₹500
   - Icon: Building icon

3. **Branch Pickup**
   - Title: "Pick from Branch"
   - Description: "Collect from our Ahmedabad showroom"
   - Fee: Free
   - Icon: Location pin icon
   - Badge: "Free"

**Selection Handler:**
```typescript
const handleDeliveryTypeChange = (type: DeliveryType) => {
  setDeliveryType(type);
  
  if (type === DeliveryType.BRANCH) {
    // Auto-fill branch address
    setAddress(BRANCH_ADDRESS);
    setAddressEditable(false);
  } else {
    setAddress('');
    setAddressEditable(true);
  }
};
```

**Conditional Address Form** (shown if HOME or OFFICE selected)

**Form Fields:**

1. **Address Line 1**
   - Type: Text input
   - Placeholder: "Building/House number and street"
   - Required
   - State: `addressLine1`

2. **Address Line 2**
   - Type: Text input
   - Placeholder: "Landmark (optional)"
   - State: `addressLine2`

3. **Area/Locality**
   - Type: Dropdown (Ahmedabad areas)
   - Options: Loaded from API
   - Required
   - State: `area`

4. **Pincode**
   - Type: Number input (6 digits)
   - Validates pincode format
   - Auto-fetches area if valid
   - State: `pincode`

5. **Contact Person Name**
   - Type: Text input
   - Pre-filled from user profile
   - Editable
   - State: `contactName`

6. **Contact Phone**
   - Type: Tel input (10 digits)
   - Pre-filled from user profile
   - Validates phone format
   - State: `contactPhone`

**Pincode Validation:**
```typescript
const handlePincodeChange = async (code: string) => {
  setPincode(code);
  
  if (code.length === 6) {
    try {
      const areaData = await locationService.getAreaByPincode(code);
      setArea(areaData.area);
      
      // Check if delivery available
      if (!areaData.deliveryAvailable) {
        showToast('Delivery not available in this area');
        setDeliveryType(DeliveryType.BRANCH);
      }
    } catch (error) {
      showToast('Invalid pincode');
    }
  }
};
```

**Branch Information Card** (shown if BRANCH selected)
```typescript
const BRANCH_ADDRESS = {
  name: "Luxury Cars Ahmedabad",
  address: "S.G. Highway, Bodakdev, Ahmedabad - 380054",
  phone: "+91 98765 43210",
  hours: "Open 24/7",
  mapLink: "https://maps.google.com/..."
};
```

**Display:**
- Branch name
- Full address
- Phone number
- Operating hours
- Google Maps link

**Button 1: "View on Map"**
- onClick: `window.open(BRANCH_ADDRESS.mapLink, '_blank')`
- Opens Google Maps in new tab

**Same for Dropoff Section**
- Checkbox: "Same as pickup location"
- If checked: Auto-fills dropoff = pickup
- If unchecked: Shows separate dropoff form

**Delivery Charges Summary**
```typescript
interface DeliveryCharges {
  pickupFee: number;
  dropoffFee: number;
  totalDeliveryFee: number;
}
```

**Display:**
- Pickup delivery: ₹{pickupFee}
- Dropoff delivery: ₹{dropoffFee}
- Total delivery charges: ₹{totalDeliveryFee}

**Button 2: "Save & Continue to Add-ons"**
- Validates all required fields
- onClick Handler:
```typescript
  const handleContinue = async () => {
    // Validate
    if (deliveryType !== DeliveryType.BRANCH) {
      if (!addressLine1 || !area || !pincode || !contactName || !contactPhone) {
        showToast('Please fill all required fields');
        return;
      }
      
      if (!/^\d{10}$/.test(contactPhone)) {
        showToast('Invalid phone number');
        return;
      }
    }
    
    setSaving(true);
    try {
      // Update booking with location data
      const locationData = await bookingService.updateLocation(bookingContext.bookingData.tempId, {
        deliveryType,
        pickupAddress: {
          line1: addressLine1,
          line2: addressLine2,
          area,
          pincode,
          contactName,
          contactPhone
        },
        dropoffAddress: sameAsPickup ? null : {
          line1: dropoffLine1,
          line2: dropoffLine2,
          area: dropoffArea,
          pincode: dropoffPincode,
          contactName: dropoffContactName,
          contactPhone: dropoffContactPhone
        },
        deliveryCharges: calculateDeliveryCharges()
      });
      
      // Update context
      bookingContext.updateBookingData({
        deliveryType,
        pickupAddress: locationData.pickupAddress,
        dropoffAddress: locationData.dropoffAddress,
        deliveryCharges: locationData.deliveryCharges
      });
      
      navigate('/booking/addons');
    } catch (error) {
      showToast('Failed to save location', 'error');
    }
    setSaving(false);
  };
```
- Backend Call: `POST /api/v1/bookings/:id/location`
- Navigates to add-ons page

**Button 3: "Back to Booking Details"**
- onClick: `navigate('/booking/create')`
- No backend call

#### 3.7.3 API Connections

**Get Serviceable Areas:**
GET /api/v1/locations?city=Ahmedabad
Response: {
success: true,
data: [
{
area: "Bodakdev",
pincode: "380054",
deliveryAvailable: true,
deliveryFee: 500
},
{
area: "S.G. Highway",
pincode: "380015",
deliveryAvailable: true,
deliveryFee: 500
}
]
}

**Validate Pincode:**
GET /api/v1/locations/pincode/{code}
Response: {
success: true,
data: {
pincode: "380054",
area: "Bodakdev",
city: "Ahmedabad",
state: "Gujarat",
deliveryAvailable: true,
deliveryFee: 500
}
}

**Save Location Data:**
POST /api/v1/bookings/{tempId}/location
Request: {
deliveryType: "home",
pickupAddress: {
line1: "123, Royal Apartments",
line2: "Near City Mall",
area: "Bodakdev",
pincode: "380054",
contactName: "John Doe",
contactPhone: "9876543210"
},
dropoffAddress: null, // or same structure
sameAsPickup: true
}
Response: {
success: true,
data: {
bookingId: "temp-booking-uuid",
deliveryCharges: {
pickupFee: 500,
dropoffFee: 500,
total: 1000
},
pickupAddress: { /* echoed back / },
dropoffAddress: { / echoed back */ }
}
}

#### 3.7.4 State Management

**Local State:**
```typescript
const [deliveryType, setDeliveryType] = useState<DeliveryType>(DeliveryType.HOME);
const [addressLine1, setAddressLine1] = useState('');
const [addressLine2, setAddressLine2] = useState('');
const [area, setArea] = useState('');
const [pincode, setPincode] = useState('');
const [contactName, setContactName] = useState('');
const [contactPhone, setContactPhone] = useState('');
const [sameAsPickup, setSameAsPickup] = useState(true);
const [dropoffLine1, setDropoffLine1] = useState('');
// ... other dropoff fields
const [serviceableAreas, setServiceableAreas] = useState<Area[]>([]);
const [saving, setSaving] = useState(false);
```

**Pre-fill from User Profile:**
```typescript
useEffect(() => {
  const { user } = authContext;
  setContactName(user.name);
  setContactPhone(user.phone);
}, [authContext.user]);
```

#### 3.7.5 Navigation Flow
Delivery Page → "Continue" → Add-ons Page
Delivery Page → "Back" → Booking Page
Delivery Page → "View on Map" → Google Maps (new tab)

---

### PAGEContinue7:38 PM8: ADD-ONS PAGE (/booking/addons)
3.8.1 Purpose
Offer optional services to enhance the rental experience and increase booking value.
3.8.2 Components & Layout
Available Add-ons Grid
typescriptinterface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'per_day' | 'one_time';
  icon: string;
  popular?: boolean;
}
Add-on Cards:

Professional Chauffeur

Name: "Professional Chauffeur"
Description: "Experienced driver for your entire rental period"
Price: ₹2,000/day
Icon: Driver icon
Badge: "Most Popular"


Premium Insurance

Name: "Premium Insurance Upgrade"
Description: "Zero deductible, comprehensive coverage"
Price: ₹1,500/day
Icon: Shield icon


Child Safety Seat

Name: "Child Safety Seat"
Description: "Certified child seat (specify age group)"
Price: ₹500 (one-time)
Icon: Baby icon
Dropdown: Age group selection


GPS Navigation

Name: "GPS Navigation System"
Description: "Latest maps with real-time traffic"
Price: ₹300/day
Icon: Map icon


WiFi Hotspot

Name: "In-Car WiFi"
Description: "Unlimited 4G hotspot"
Price: ₹400/day
Icon: WiFi icon


Airport Pickup/Drop

Name: "Airport Service"
Description: "Direct pickup/drop at Ahmedabad Airport"
Price: ₹1,000 (one-time)
Icon: Plane icon



Add-on Card Component:
typescriptinterface AddOnCardProps {
  addon: AddOn;
  selected: boolean;
  quantity?: number;
  onToggle: (id: string) => void;
  onQuantityChange?: (id: string, qty: number) => void;
}
Card Features:

Checkbox to select/deselect
Quantity selector (for chauffeur, child seat)
Price calculation preview
Popular badge

Checkbox Handler:
typescriptconst handleAddOnToggle = (addonId: string) => {
  setSelectedAddOns(prev => {
    if (prev.includes(addonId)) {
      // Remove
      return prev.filter(id => id !== addonId);
    } else {
      // Add
      return [...prev, addonId];
    }
  });
  
  // Recalculate total
  calculateAddOnsTotal();
};
Quantity Selector (for applicable add-ons):

Shown when add-on selected
Min: 1, Max: Depends on add-on
For Child Seat: Also shows age group dropdown

Special: Chauffeur Add-on Details
When selected, shows additional form:
typescriptinterface ChauffeurDetails {
  language: string;
  drivingStyle: 'normal' | 'professional';
  specialRequests?: string;
}
Fields:

Preferred language (Gujarati, Hindi, English)
Driving style preference
Special requests (textarea)

Add-ons Summary Panel (Sticky Sidebar)
typescriptinterface AddOnsSummary {
  selectedAddOns: SelectedAddOn[];
  totalAddOnsPrice: number;
  rentalDays: number;
}

interface SelectedAddOn {
  addonId: string;
  name: string;
  price: number;
  quantity: number;
  priceType: string;
  subtotal: number;
}
```

**Display:**
- List of selected add-ons
- Each shows: Name, Quantity, Price calculation
- Subtotal for each
- **Total Add-ons: ₹{totalAddOnsPrice}**

**Price Calculation Example:**
```
Chauffeur: ₹2,000 × 2 days = ₹4,000
Child Seat: ₹500 (one-time) = ₹500
-------------------------------------------
Total Add-ons: ₹4,500
Calculate Add-ons Total:
typescriptconst calculateAddOnsTotal = (): number => {
  const rentalDays = bookingContext.bookingData.duration.days || 1;
  
  return selectedAddOns.reduce((total, addonId) => {
    const addon = ADD_ONS_LIST.find(a => a.id === addonId);
    if (!addon) return total;
    
    const quantity = addonQuantities[addonId] || 1;
    
    if (addon.priceType === 'per_day') {
      return total + (addon.price * quantity * rentalDays);
    } else {
      return total + (addon.price * quantity);
    }
  }, 0);
};
Button 1: "Skip Add-ons"

onClick Handler:

typescript  const handleSkip = () => {
    // Update booking with no add-ons
    bookingContext.updateBookingData({
      addOns: [],
      addOnsTotal: 0
    });
    
    navigate('/booking/summary');
  };

No backend call
Proceeds to summary

Button 2: "Add Selected Add-ons & Continue"

Enabled when: At least one add-on selected
onClick Handler:

typescript  const handleContinue = async () => {
    setSaving(true);
    try {
      const addOnsData = selectedAddOns.map(addonId => {
        const addon = ADD_ONS_LIST.find(a => a.id === addonId);
        return {
          addonId,
          quantity: addonQuantities[addonId] || 1,
          details: addonDetails[addonId] // chauffeur details, etc.
        };
      });
      
      const response = await bookingService.updateAddOns(
        bookingContext.bookingData.tempId,
        { addOns: addOnsData }
      );
      
      bookingContext.updateBookingData({
        addOns: response.addOns,
        addOnsTotal: response.totalPrice
      });
      
      navigate('/booking/summary');
    } catch (error) {
      showToast('Failed to save add-ons', 'error');
    }
    setSaving(false);
  };
```
- Backend Call: `POST /api/v1/bookings/:id/addons`
- Navigates to summary

**Button 3: "Back to Delivery Options"**
- onClick: `navigate('/booking/delivery')`

**Recommended Add-ons Section**
- Shows personalized recommendations based on:
  - Car type (luxury → suggest chauffeur)
  - Rental duration (>3 days → suggest WiFi)
  - User history (previous add-ons)

#### 3.8.3 API Connections

**Get Available Add-ons:**
```
GET /api/v1/bookings/addons?carId={id}
Response: {
  success: true,
  data: [
    {
      id: "addon-chauffeur",
      name: "Professional Chauffeur",
      description: "Experienced driver...",
      price: 2000,
      priceType: "per_day",
      icon: "driver-icon.svg",
      popular: true,
      available: true
    }
  ]
}
```

**Save Add-ons:**
```
POST /api/v1/bookings/{tempId}/addons
Request: {
  addOns: [
    {
      addonId: "addon-chauffeur",
      quantity: 1,
      details: {
        language: "English",
        drivingStyle: "professional"
      }
    },
    {
      addonId: "addon-child-seat",
      quantity: 1,
      details: {
        ageGroup: "2-4 years"
      }
    }
  ]
}
Response: {
  success: true,
  data: {
    bookingId: "temp-booking-uuid",
    addOns: [
      {
        addonId: "addon-chauffeur",
        name: "Professional Chauffeur",
        price: 2000,
        quantity: 1,
        priceType: "per_day",
        rentalDays: 2,
        subtotal: 4000
      },
      {
        addonId: "addon-child-seat",
        name: "Child Safety Seat",
        price: 500,
        quantity: 1,
        priceType: "one_time",
        subtotal: 500
      }
    ],
    totalPrice: 4500
  }
}
3.8.4 State Management
Local State:
typescriptconst [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({});
const [addonDetails, setAddonDetails] = useState<Record<string, any>>({});
const [addOnsTotal, setAddOnsTotal] = useState(0);
const [saving, setSaving] = useState(false);
Add-on Constants:
typescriptconst ADD_ONS_LIST: AddOn[] = [
  {
    id: 'addon-chauffeur',
    name: 'Professional Chauffeur',
    description: 'Experienced driver for your entire rental period',
    price: 2000,
    priceType: 'per_day',
    icon: 'driver',
    popular: true
  },
  // ... other add-ons
];
```

#### 3.8.5 Navigation Flow
```
Add-ons Page → "Continue" → Price Summary Page
Add-ons Page → "Skip" → Price Summary Page
Add-ons Page → "Back" → Delivery & Location Page

PAGE 9: PRICE SUMMARY PAGE (/booking/summary)
3.9.1 Purpose
Display complete cost breakdown before payment and confirm final booking details.
3.9.2 Components & Layout
Booking Summary Header

Booking ID: (Temporary ID displayed)
Status: "Pending Payment"

Car Details Card

Car image (thumbnail)
Brand + Model
Year
Category

Rental Period Card
typescriptinterface RentalPeriod {
  pickupDatetime: Date;
  pickupLocation: string;
  dropoffDatetime: Date;
  dropoffLocation: string;
  duration: {
    days: number;
    hours: number;
  };
}
Display:

Pickup: {date} at {time}
Location: {address}
Dropoff: {date} at {time}
Location: {address}
Duration: {days} days {hours} hours

Button 1: "Edit Dates"

onClick: navigate('/booking/create')
Allows changes to booking dates

Delivery Details Card

Delivery type badge
Pickup address (full)
Dropoff address (if different)
Contact person + phone

Button 2: "Edit Delivery"

onClick: navigate('/booking/delivery')

Add-ons Summary Card

List of selected add-ons
Each shows: Name, Quantity, Price
Button: "Edit Add-ons" → navigates back

Button 3: "Edit Add-ons"

onClick: navigate('/booking/addons')

Price Breakdown Table
typescriptinterface PriceBreakdown {
  basePrice: number;
  deliveryCharges: number;
  addOnsTotal: number;
  subtotal: number;
  cgst: number;  // 9%
  sgst: number;  // 9%
  totalTax: number;
  totalAmount: number;
  depositAmount: number;
  amountPayable: number;
}
```

**Display Table:**
```
Base Rental Price          ₹24,000
  (₹12,000 × 2 days)

Delivery Charges           ₹1,000
  Pickup: ₹500
  Dropoff: ₹500

Add-ons                    ₹4,500
  Chauffeur: ₹4,000
  Child Seat: ₹500
────────────────────────────────
Subtotal                   ₹29,500

CGST (9%)                  ₹2,655
SGST (9%)                  ₹2,655
────────────────────────────────
Total Amount               ₹34,810

Security Deposit           ₹50,000
(Refundable)
────────────────────────────────
TOTAL PAYABLE              ₹84,810
Calculate Prices:
typescriptconst calculateTotalPrice = (): PriceBreakdown => {
  const { basePrice, deliveryCharges, addOnsTotal } = bookingContext.bookingData;
  
  const subtotal = basePrice + (deliveryCharges?.total || 0) + (addOnsTotal || 0);
  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const totalTax = cgst + sgst;
  const totalAmount = subtotal + totalTax;
  
  const depositAmount = bookingContext.selectedCar.depositAmount;
  const amountPayable = totalAmount + depositAmount;
  
  return {
    basePrice,
    deliveryCharges: deliveryCharges?.total || 0,
    addOnsTotal: addOnsTotal || 0,
    subtotal,
    cgst,
    sgst,
    totalTax,
    totalAmount,
    depositAmount,
    amountPayable
  };
};
Important Information Section

Collapsible accordion

Sections:

Cancellation Policy

Free cancellation up to 24 hours before pickup
50% refund if cancelled 12-24 hours before
No refund if cancelled < 12 hours before


Security Deposit

Fully refundable after inspection
Deductions for damage, fuel, tolls
Refunded within 7 business days


Fuel Policy

Car delivered with full tank
Must return with same level
Otherwise charged at ₹120/liter + service fee


Late Return

Grace period: 30 minutes
After that: ₹500/hour



Terms & Conditions Checkbox
typescriptconst [agreedToTerms, setAgreedToTerms] = useState(false);
Checkbox:

"I have read and agree to the Terms & Conditions and Cancellation Policy"
Link to full T&C page opens in modal
Required to proceed

Button 4: "View Full Terms"

onClick: Opens modal with complete T&C
No navigation

Button 5: "Proceed to Payment"

Enabled when: agreedToTerms === true
Primary CTA (large, highlighted)
onClick Handler:

typescript  const handleProceedToPayment = async () => {
    if (!agreedToTerms) {
      showToast('Please accept terms and conditions');
      return;
    }
    
    setProcessing(true);
    try {
      // Create final booking
      const finalBooking = await bookingService.createFinalBooking({
        ...bookingContext.bookingData,
        priceBreakdown: calculateTotalPrice(),
        agreedToTerms: true,
        agreedAt: new Date().toISOString()
      });
      
      // Store booking ID
      bookingContext.updateBookingData({
        bookingId: finalBooking.id,
        priceBreakdown: finalBooking.priceBreakdown
      });
      
      navigate('/booking/payment');
    } catch (error) {
      showToast('Failed to create booking', 'error');
    }
    setProcessing(false);
  };
```
- Backend Call: `POST /api/v1/bookings/create`
- Creates confirmed booking (status: pending_payment)
- Navigates to payment page

**Button 6: "Back to Add-ons"**
- onClick: `navigate('/booking/addons')`

**Save for Later Option**
- Button: "Save & Continue Later"
- Saves draft booking
- Emails summary to user

#### 3.9.3 API Connections

**Get Final Summary:**
```
GET /api/v1/bookings/summary/{tempId}
Response: {
  success: true,
  data: {
    bookingId: "temp-uuid",
    car: { /* car details */ },
    rental: { /* dates, duration */ },
    delivery: { /* addresses */ },
    addOns: [ /* add-ons list */ ],
    pricing: {
      basePrice: 24000,
      deliveryCharges: 1000,
      addOnsTotal: 4500,
      subtotal: 29500,
      cgst: 2655,
      sgst: 2655,
      totalTax: 5310,
      totalAmount: 34810,
      depositAmount: 50000,
      amountPayable: 84810
    }
  }
}
```

**Create Final Booking:**
```
POST /api/v1/bookings/create
Request: {
  carId: "car-uuid",
  pickupDatetime: "2026-01-30T10:00:00Z",
  dropoffDatetime: "2026-02-01T10:00:00Z",
  deliveryType: "home",
  pickupAddress: { /* full address */ },
  dropoffAddress: { /* full address */ },
  addOns: [ /* add-ons array */ ],
  priceBreakdown: { /* complete breakdown */ },
  agreedToTerms: true
}
Response: {
  success: true,
  data: {
    id: "booking-uuid-final",
    bookingNumber: "LXR-2026-0123",
    status: "pending_payment",
    car: { /* car details */ },
    user: { /* user details */ },
    rental: { /* all rental info */ },
    pricing: { /* price breakdown */ },
    createdAt: "2026-01-22T14:30:00Z",
    paymentDueBy: "2026-01-22T15:30:00Z" // 1 hour window
  }
}
3.9.4 State Management
Local State:
typescriptconst [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
const [agreedToTerms, setAgreedToTerms] = useState(false);
const [showTermsModal, setShowTermsModal] = useState(false);
const [processing, setProcessing] = useState(false);
Load Summary on Mount:
typescriptuseEffect(() => {
  const loadSummary = async () => {
    setLoading(true);
    try {
      const summary = await bookingService.getSummary(bookingContext.bookingData.tempId);
      setPriceBreakdown(summary.pricing);
    } catch (error) {
      showToast('Failed to load summary', 'error');
      navigate('/booking/create');
    }
    setLoading(false);
  };
  
  loadSummary();
}, []);
```

#### 3.9.5 Navigation Flow
```
Summary Page → "Proceed to Payment" → Payment Page
Summary Page → "Edit Dates" → Booking Page
Summary Page → "Edit Delivery" → Delivery Page
Summary Page → "Edit Add-ons" → Add-ons Page
Summary Page → "Back" → Add-ons Page

PAGE 10: PAYMENT PAGE (/booking/payment)
3.10.1 Purpose
Process secure payment through multiple Indian payment gateways and COD.
3.10.2 Components & Layout
Payment Summary Card (Sticky on scroll)
typescriptinterface PaymentSummary {
  bookingNumber: string;
  totalAmount: number;
  depositAmount: number;
  amountPayable: number;
  paymentDueBy: Date;
}
Display:

Booking Number: LXR-2026-0123
Amount Payable: ₹84,810
Payment Due By: {countdown timer}

Countdown Timer Component:
typescript// 1 hour payment window
const [timeRemaining, setTimeRemaining] = useState(3600);

useEffect(() => {
  const timer = setInterval(() => {
    setTimeRemaining(prev => {
      if (prev <= 0) {
        clearInterval(timer);
        handlePaymentTimeout();
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  
  return () => clearInterval(timer);
}, []);

const handlePaymentTimeout = () => {
  showToast('Payment time expired. Please create a new booking.');
  navigate('/cars');
};
Display: "Complete payment in: 45:32"
Payment Method Selection (Radio Cards)
typescriptenum PaymentMethod {
  PAYTM = 'paytm',
  PHONEPE = 'phonepe',
  GPAY = 'gpay',
  COD = 'cod'
}

interface PaymentOption {
  method: PaymentMethod;
  name: string;
  logo: string;
  description: string;
  processingFee: number;
  available: boolean;
}
Option Cards:

Paytm

Name: "Paytm Wallet / UPI"
Logo: Paytm logo
Description: "Pay using Paytm wallet, UPI, cards"
Fee: ₹0
Badge: "Instant"


PhonePe

Name: "PhonePe"
Logo: PhonePe logo
Description: "Pay via PhonePe UPI"
Fee: ₹0
Badge: "Recommended"


Google Pay

Name: "Google Pay"
Logo: GPay logo
Description: "Quick payment with Google Pay"
Fee: ₹0


Cash on Delivery

Name: "Cash on Delivery"
Icon: Cash icon
Description: "Pay when car is delivered"
Fee: ₹500 (COD charges)
Note: "Valid ID required"



Selection Handler:
typescriptconst handlePaymentMethodChange = (method: PaymentMethod) => {
  setPaymentMethod(method);
  
  if (method === PaymentMethod.COD) {
    setProcessingFee(500);
    setShowCODTerms(true);
  } else {
    setProcessingFee(0);
    setShowCODTerms(false);
  }
};
```

**Conditional: COD Terms (if COD selected)**
- Display additional information:
  - "Payment must be made in cash at time of delivery"
  - "Valid government ID required"
  - "Exact amount preferred"
  - Checkbox: "I understand COD terms"

**Total Amount Display (Updates based on payment method)**
```
Booking Amount:        ₹84,810
Processing Fee:        ₹500      (if COD)
──────────────────────────────
FINAL AMOUNT:          ₹85,310
Button 1: "Pay Now" / "Confirm COD Booking"

Text changes based on payment method
Enabled when: Payment method selected (+ COD terms agreed if COD)
onClick Handler:

typescript  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      if (paymentMethod === PaymentMethod.COD) {
        // Process COD booking
        const response = await paymentService.confirmCOD({
          bookingId: bookingContext.bookingData.bookingId,
          amount: finalAmount,
          agreedToCODTerms: true
        });
        
        // Update booking status
        await bookingService.updateStatus(bookingContext.bookingData.bookingId, 'confirmed');
        
        // Navigate to confirmation
        navigate('/booking/confirmation', {
          state: { bookingData: response.booking }
        });
        
      } else {
        // Initiate online payment
        const paymentData = await paymentService.initiatePayment({
          bookingId: bookingContext.bookingData.bookingId,
          amount: finalAmount,
          paymentMethod,
          returnUrl: `${window.location.origin}/booking/payment/callback`,
          cancelUrl: `${window.location.origin}/booking/payment`
        });
        
        // Redirect to payment gateway
        window.location.href = paymentData.redirectUrl;
      }
      
    } catch (error) {
      showToast('Payment initiation failed', 'error');
      setProcessing(false);
    }
  };

For online payments: Redirects to gateway
For COD: Confirms booking and navigates to confirmation

Button 2: "Cancel Payment"

onClick Handler:

typescript  const handleCancel = () => {
    const confirmed = window.confirm('Are you sure? Your booking will be cancelled.');
    
    if (confirmed) {
      bookingService.cancelBooking(bookingContext.bookingData.bookingId);
      showToast('Booking cancelled');
      navigate('/cars');
    }
  };
```
- Cancels booking
- Returns to car listing

**Secure Payment Badges**
- Icons: SSL Secured, PCI Compliant, 256-bit Encryption
- Trust indicators

**FAQ Accordion**
- "Is my payment secure?" → Yes, all payments...
- "What if payment fails?" → Your booking will be...
- "Refund policy?" → Link to refund policy page

#### 3.10.3 API Connections

**Initiate Online Payment:**
```
POST /api/v1/payments/initiate
Request: {
  bookingId: "booking-uuid",
  amount: 84810,
  paymentMethod: "phonepe",
  returnUrl: "https://app.example.com/payment/callback",
  cancelUrl: "https://app.example.com/booking/payment"
}
Response: {
  success: true,
  data: {
    paymentId: "payment-uuid",
    transactionId: "TXN-202601221430",
    redirectUrl: "https://phonepe.com/pay?token=xyz123",
    expiresAt: "2026-01-22T15:30:00Z"
  }
}
```

**Confirm COD Booking:**
```
POST /api/v1/payments/cod
Request: {
  bookingId: "booking-uuid",
  amount: 85310,
  agreedToCODTerms: true
}
Response: {
  success: true,
  data: {
    paymentId: "payment-uuid",
    paymentMethod: "cod",
    status: "pending",
    booking: {
      id: "booking-uuid",
      status: "confirmed",
      paymentStatus: "cod_pending"
    }
  }
}
```

**Payment Callback Verification:**
```
POST /api/v1/payments/verify
Request: {
  paymentId: "payment-uuid",
  transactionId: "TXN-202601221430",
  gatewayResponse: { /* gateway data */ }
}
Response: {
  success: true,
  data: {
    paymentId: "payment-uuid",
    status: "success",
    amount: 84810,
    paidAt: "2026-01-22T14:35:00Z",
    booking: {
      id: "booking-uuid",
      status: "confirmed",
      paymentStatus: "paid"
    }
  }
}
3.10.4 Payment Gateway Integration
Payment Callback Handling Page (/booking/payment/callback)
This is a hidden intermediate page that handles gateway redirects:
typescript// PaymentCallback.tsx
const PaymentCallback: React.FC = () => {
  useEffect(() => {
    const verifyPayment = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const transactionId = urlParams.get('transaction_id');
      const paymentId = urlParams.get('payment_id');
      const status = urlParams.get('status');
      
      setVerifying(true);
      
      try {
        const verification = await paymentService.verifyPayment({
          paymentId,
          transactionId,
          gatewayResponse: Object.fromEntries(urlParams)
        });
        
        if (verification.status === 'success') {
          showToast('Payment successful!');
          navigate('/booking/confirmation', {
            state: { bookingData: verification.booking }
          });
        } else {
          showToast('Payment failed. Please try again.', 'error');
          navigate('/booking/payment', {
            state: { error: verification.errorMessage }
          });
        }
        
      } catch (error) {
        showToast('Payment verification failed', 'error');
        navigate('/booking/payment');
      }
    };
    
    verifyPayment();
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4">Verifying your payment...</p>
        <p className="text-sm text-gray-500">Please do not close this window</p>
      </div>
    </div>
  );
};
3.10.5 State Management
Local State:
typescriptconst [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
const [processingFee, setProcessingFee] = useState(0);
const [finalAmount, setFinalAmount] = useState(0);
const [showCODTerms, setShowCODTerms] = useState(false);
const [agreedToCOD, setAgreedToCOD] = useState(false);
const [processing, setProcessing] = useState(false);
const [timeRemaining, setTimeRemaining] = useState(3600);
Update Final Amount:
typescriptuseEffect(() => {
  const baseAmount = bookingContext.bookingData.priceBreakdown.amountPayable;
  setFinalAmount(baseAmount + processingFee);
}, [processingFee]);
```

#### 3.10.6 Navigation Flow
```
Payment Page → "Pay Now" → Payment Gateway → Callback Page → Confirmation Page
Payment Page → "Confirm COD" → Confirmation Page
Payment Page → "Cancel" → Car Listing Page
Payment Page (timeout) → Car Listing Page
Callback Page (success) → Confirmation Page
Callback Page (failure) → Payment Page (with error)

[Continued in next message with Pages 11-15...]
Would you like me to continue with the remaining 5 pages (Booking Confirmation, My Bookings, Admin Car Management, Admin Order Management, and Support & Policies)?yes7:41 PMPAGE 11: BOOKING CONFIRMATION PAGE (/booking/confirmation)
3.11.1 Purpose
Confirm successful booking and provide all necessary information for the upcoming rental.
3.11.2 Components & Layout
Success Animation

Animated checkmark icon
Green success color scheme
Confetti effect (optional)

Success Message
typescriptinterface ConfirmationData {
  bookingNumber: string;
  status: 'confirmed' | 'cod_pending';
  paymentStatus: 'paid' | 'cod_pending';
}
```

**Display:**
- "Booking Confirmed!" (if paid)
- "Booking Placed Successfully!" (if COD)
- Booking Number: **LXR-2026-0123**
- Status badge (green for confirmed)

**Important Notice (if COD):**
```
⚠️ Cash Payment Required
Please keep ₹85,310 ready in cash for delivery.
Our driver will collect payment before handing over the car.
Booking Details Card
Complete Information Display:
typescriptinterface BookingDetails {
  bookingNumber: string;
  car: CarInfo;
  rental: RentalInfo;
  delivery: DeliveryInfo;
  addOns: AddOnInfo[];
  pricing: PriceBreakdown;
  payment: PaymentInfo;
}
Car Information:

Car image
Brand, Model, Year
Registration number (if available)

Rental Period:

Pickup: {date} at {time}
Dropoff: {date} at {time}
Duration: {days} days {hours} hours

Delivery Details:

Pickup Location:

Delivery type badge
Full address
Contact: {name} - {phone}


Dropoff Location:

Full address
Contact details



Selected Add-ons:

List with icons
Each shows: Name, Quantity, Price

Payment Summary:

Total Amount: ₹34,810
Security Deposit: ₹50,000
Total Paid/Due: ₹84,810
Payment Method: {method}
Transaction ID: {id} (if online payment)

What's Next Section
Timeline Component:
typescriptinterface TimelineStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
}
Steps:

Booking Confirmed ✓

Your booking has been confirmed
Confirmation sent to {email}


Pre-Delivery Inspection (1 day before)

Our team will inspect and sanitize the car
You'll receive an SMS update


Car Delivery ({pickup date})

Car will be delivered to your address at {time}
Driver will verify documents and collect payment (if COD)


Enjoy Your Ride 🚗

Drive safely and enjoy!
24/7 support available



Action Buttons
Button 1: "Download Invoice"

onClick Handler:

typescript  const handleDownloadInvoice = async () => {
    setDownloading(true);
    try {
      const invoiceBlob = await bookingService.downloadInvoice(bookingData.id);
      
      // Create download link
      const url = window.URL.createObjectURL(invoiceBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-${bookingData.bookingNumber}.pdf`;
      link.click();
      
      showToast('Invoice downloaded');
    } catch (error) {
      showToast('Failed to download invoice', 'error');
    }
    setDownloading(false);
  };

Backend Call: GET /api/v1/bookings/:id/invoice
Downloads PDF invoice

Button 2: "View Booking Details"

onClick: navigate('/my-bookings/${bookingData.id}')
Navigates to booking details in My Bookings page

Button 3: "Book Another Car"

onClick Handler:

typescript  const handleBookAnother = () => {
    bookingContext.clearBooking();
    navigate('/cars');
  };

Clears booking context
Returns to car listing

Button 4: "Go to Dashboard"

onClick: navigate('/dashboard')

Contact Support Section

Display: "Need help? Contact us"
Phone: +91 98765 43210 (click to call)
Email: support@luxurycars.com
WhatsApp button

Button 5: "Contact Support"

onClick: navigate('/support')

Important Instructions Box
What to Keep Ready:

✓ Original driving license
✓ Government-issued photo ID (Aadhar/PAN/Passport)
✓ Cash payment (if COD): ₹{amount}
✓ Address proof (for verification)

Reminder to Customer:

Inspect car thoroughly before accepting
Report any pre-existing damage immediately
Read rental agreement carefully before signing

Share Booking (Social Sharing)

"Share this booking with family/friends"
WhatsApp, Email buttons
Generates shareable link

Button 6: "Share via WhatsApp"

onClick Handler:

typescript  const handleWhatsAppShare = () => {
    const message = `I've booked a ${bookingData.car.brand} ${bookingData.car.model} from Luxury Cars Ahmedabad! Booking: ${bookingData.bookingNumber}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
```

**Email Confirmation Notice**
- "A detailed confirmation email has been sent to {user.email}"
- "Please check your spam folder if not received"

#### 3.11.3 API Connections

**Get Booking Confirmation Data:**
```
GET /api/v1/bookings/{id}
Headers: { Authorization: "Bearer {token}" }
Response: {
  success: true,
  data: {
    id: "booking-uuid",
    bookingNumber: "LXR-2026-0123",
    status: "confirmed",
    paymentStatus: "paid",
    car: {
      id: "car-uuid",
      brand: "BMW",
      model: "7 Series",
      year: 2023,
      image: "url",
      registrationNumber: "GJ-01-AB-1234"
    },
    user: {
      id: "user-uuid",
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210"
    },
    rental: {
      pickupDatetime: "2026-01-30T10:00:00Z",
      dropoffDatetime: "2026-02-01T10:00:00Z",
      duration: { days: 2, hours: 0 }
    },
    delivery: {
      type: "home",
      pickupAddress: {
        line1: "123, Royal Apartments",
        line2: "Near City Mall",
        area: "Bodakdev",
        pincode: "380054",
        contactName: "John Doe",
        contactPhone: "9876543210"
      },
      dropoffAddress: { /* same or different */ },
      deliveryCharges: { pickup: 500, dropoff: 500, total: 1000 }
    },
    addOns: [
      {
        id: "addon-uuid-1",
        name: "Professional Chauffeur",
        price: 2000,
        quantity: 1,
        subtotal: 4000
      }
    ],
    pricing: {
      basePrice: 24000,
      deliveryCharges: 1000,
      addOnsTotal: 4500,
      subtotal: 29500,
      cgst: 2655,
      sgst: 2655,
      totalTax: 5310,
      totalAmount: 34810,
      depositAmount: 50000,
      amountPayable: 84810
    },
    payment: {
      id: "payment-uuid",
      method: "phonepe",
      transactionId: "TXN-202601221430",
      status: "success",
      amount: 84810,
      paidAt: "2026-01-22T14:35:00Z"
    },
    createdAt: "2026-01-22T14:30:00Z",
    confirmedAt: "2026-01-22T14:35:00Z"
  }
}
```

**Download Invoice:**
```
GET /api/v1/bookings/{id}/invoice
Headers: { Authorization: "Bearer {token}" }
Response: PDF file (application/pdf)
Content-Disposition: attachment; filename="Invoice-LXR-2026-0123.pdf"
```

**Send Confirmation Email (Auto-triggered by backend):**
```
POST /api/v1/bookings/{id}/send-confirmation
Triggered automatically after payment success
Email contains:
- Booking details
- Invoice PDF attachment
- What's next instructions
- Contact information
3.11.4 State Management
Local State:
typescriptconst [bookingData, setBookingData] = useState<BookingDetails | null>(null);
const [loading, setLoading] = useState(true);
const [downloading, setDownloading] = useState(false);
Load Booking Data:
typescriptuseEffect(() => {
  const loadConfirmation = async () => {
    // Get booking ID from navigation state or context
    const bookingId = location.state?.bookingData?.id || bookingContext.bookingData?.bookingId;
    
    if (!bookingId) {
      showToast('Booking not found');
      navigate('/dashboard');
      return;
    }
    
    setLoading(true);
    try {
      const booking = await bookingService.getBookingById(bookingId);
      setBookingData(booking);
      
      // Clear booking context after successful confirmation
      bookingContext.clearBooking();
    } catch (error) {
      showToast('Failed to load booking details', 'error');
      navigate('/dashboard');
    }
    setLoading(false);
  };
  
  loadConfirmation();
}, []);
```

#### 3.11.5 Navigation Flow
```
Confirmation Page → "View Booking" → My Bookings Page (specific booking)
Confirmation Page → "Book Another Car" → Car Listing Page
Confirmation Page → "Go to Dashboard" → User Dashboard
Confirmation Page → "Contact Support" → Support & Policies Page

PAGE 12: MY BOOKINGS PAGE (/my-bookings)
3.12.1 Purpose
Central hub for users to view all their bookings (past, present, future) and manage them.
3.12.2 Components & Layout
Page Header

Title: "My Bookings"
Subtitle: "Manage all your luxury car rentals"

Tab Navigation
typescriptenum BookingTab {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}
Tabs:

Upcoming ({count})
Ongoing ({count})
Completed ({count})
Cancelled ({count})

Tab State:
typescriptconst [activeTab, setActiveTab] = useState<BookingTab>(BookingTab.UPCOMING);
Tab Change Handler:
typescriptconst handleTabChange = (tab: BookingTab) => {
  setActiveTab(tab);
  loadBookings(tab);
};
Filters & Sorting (Above booking list)
Filter Options:

Search by booking number
Date range picker
Car brand filter

Sort Options:

Newest first (default)
Oldest first
Pickup date (upcoming)

Bookings List Component
Empty State (if no bookings):
typescriptconst EmptyState: React.FC<{ tab: BookingTab }> = ({ tab }) => {
  const messages = {
    upcoming: "No upcoming bookings",
    ongoing: "No active rentals",
    completed: "No past bookings",
    cancelled: "No cancelled bookings"
  };
  
  return (
    <div className="text-center py-12">
      <EmptyIcon />
      <p className="text-gray-600 mt-4">{messages[tab]}</p>
      {tab === 'upcoming' && (
        <button onClick={() => navigate('/cars')}>
          Book Your First Car
        </button>
      )}
    </div>
  );
};
Booking Card Component
typescriptinterface BookingCardProps {
  booking: {
    id: string;
    bookingNumber: string;
    car: CarInfo;
    rental: RentalInfo;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    totalAmount: number;
    pickupDatetime: Date;
    dropoffDatetime: Date;
    canCancel: boolean;
    canModify: boolean;
  };
}
Card Layout:

Left side: Car image (thumbnail)
Middle section: Booking details
Right side: Actions

Display Information:

Booking Number: {bookingNumber}
Car: {brand} {model}
Status Badge (color-coded)
Pickup: {date} at {time}
Dropoff: {date} at {time}
Total Amount: ₹{amount}
Payment Status badge

Status Badge Colors:
typescriptconst getStatusColor = (status: BookingStatus): string => {
  const colors = {
    pending_payment: 'yellow',
    confirmed: 'green',
    ongoing: 'blue',
    completed: 'gray',
    cancelled: 'red'
  };
  return colors[status];
};
Action Buttons (vary by status):
For Upcoming Bookings:
Button 1: "View Details"

onClick: Opens booking details modal or navigates to detail view
Shows complete booking information

Button 2: "Modify Booking"

Visible when: booking.canModify === true
Enabled when: >48 hours before pickup
onClick Handler:

typescript  const handleModifyBooking = (bookingId: string) => {
    navigate(`/booking/modify/${bookingId}`);
    // Future enhancement - not in current 15 pages
    showToast('Modification feature coming soon');
  };
Button 3: "Cancel Booking"

Visible when: booking.canCancel === true
Enabled when: >24 hours before pickup
onClick Handler:

typescript  const handleCancelBooking = async (bookingId: string) => {
    // Show confirmation modal
    const confirmed = await showCancellationModal(bookingId);
    
    if (!confirmed) return;
    
    setCancelling(true);
    try {
      const result = await bookingService.cancelBooking(bookingId, {
        reason: cancellationReason,
        cancelledBy: 'customer'
      });
      
      showToast(`Booking cancelled. Refund: ₹${result.refundAmount}`);
      
      // Refresh bookings
      loadBookings(activeTab);
    } catch (error) {
      showToast('Failed to cancel booking', 'error');
    }
    setCancelling(false);
  };

Backend Call: PUT /api/v1/bookings/:id/cancel

Button 4: "Download Invoice"

onClick: Same as confirmation page
Downloads PDF invoice

For Ongoing Bookings:
Button 5: "Track Delivery"

Shows delivery status
ETA for car delivery
Driver contact (if assigned)

Button 6: "Contact Driver"

onClick: Opens phone dialer or WhatsApp
Only shown if chauffeur add-on selected

Button 7: "Report Issue"

onClick: Opens support ticket form
Pre-fills booking details

For Completed Bookings:
Button 8: "Download Invoice"

Same functionality

Button 9: "Rate Experience"

onClick: Opens rating modal
5-star rating + review text
Backend Call: POST /api/v1/bookings/:id/review

Button 10: "Book Again"

onClick Handler:

typescript  const handleBookAgain = (booking: Booking) => {
    // Pre-fill booking form with same car
    bookingContext.selectCar(booking.car);
    navigate('/booking/create');
  };
Cancellation Modal Component
typescriptinterface CancellationModalProps {
  booking: Booking;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}
Modal Content:

Booking details summary
Cancellation policy reminder
Refund calculation display
Reason selection (dropdown)
Confirm/Cancel buttons

Refund Calculation Display:
typescriptconst calculateRefund = (booking: Booking): RefundInfo => {
  const hoursUntilPickup = differenceInHours(booking.pickupDatetime, new Date());
  
  if (hoursUntilPickup >= 24) {
    // Full refund
    return {
      refundAmount: booking.totalAmount,
      refundPercentage: 100,
      processingDays: 5
    };
  } else if (hoursUntilPickup >= 12) {
    // 50% refund
    return {
      refundAmount: booking.totalAmount * 0.5,
      refundPercentage: 50,
      processingDays: 7
    };
  } else {
    // No refund
    return {
      refundAmount: 0,
      refundPercentage: 0,
      processingDays: 0
    };
  }
};
```

**Display:**
```
Cancellation Charges Breakdown:
─────────────────────────────
Total Paid:            ₹84,810
Cancellation Fee:      ₹0
─────────────────────────────
Refund Amount:         ₹84,810
Refund in:            5-7 business days
```

**Pagination** (if >10 bookings)
- Shows 10 bookings per page
- Standard pagination controls

#### 3.12.3 API Connections

**Get User Bookings:**
```
GET /api/v1/bookings/user?status={status}&page={page}&limit={limit}
Headers: { Authorization: "Bearer {token}" }
Query Params:
- status: upcoming | ongoing | completed | cancelled
- page: 1
- limit: 10
- sortBy: created_at | pickup_datetime
- order: desc | asc

Response: {
  success: true,
  data: [
    {
      id: "booking-uuid",
      bookingNumber: "LXR-2026-0123",
      status: "confirmed",
      paymentStatus: "paid",
      car: {
        id: "car-uuid",
        brand: "BMW",
        model: "7 Series",
        image: "url"
      },
      pickupDatetime: "2026-01-30T10:00:00Z",
      dropoffDatetime: "2026-02-01T10:00:00Z",
      totalAmount: 84810,
      canCancel: true,
      canModify: true,
      createdAt: "2026-01-22T14:30:00Z"
    }
  ],
  totalCount: 15,
  totalPages: 2,
  currentPage: 1
}
```

**Cancel Booking:**
```
PUT /api/v1/bookings/{id}/cancel
Headers: { Authorization: "Bearer {token}" }
Request: {
  reason: "Change of plans",
  cancelledBy: "customer"
}
Response: {
  success: true,
  data: {
    bookingId: "booking-uuid",
    status: "cancelled",
    cancelledAt: "2026-01-23T10:00:00Z",
    refund: {
      amount: 84810,
      percentage: 100,
      processingDays: 5,
      refundMethod: "original_payment",
      estimatedDate: "2026-01-28"
    }
  }
}
```

**Submit Review:**
```
POST /api/v1/bookings/{id}/review
Headers: { Authorization: "Bearer {token}" }
Request: {
  rating: 5,
  reviewText: "Excellent service! The car was in perfect condition.",
  carCondition: 5,
  driverBehavior: 5,
  valueForMoney: 5
}
Response: {
  success: true,
  data: {
    reviewId: "review-uuid",
    bookingId: "booking-uuid",
    rating: 5,
    createdAt: "2026-02-02T10:00:00Z"
  }
}
3.12.4 State Management
Local State:
typescriptconst [activeTab, setActiveTab] = useState<BookingTab>(BookingTab.UPCOMING);
const [bookings, setBookings] = useState<Booking[]>([]);
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [searchQuery, setSearchQuery] = useState('');
const [sortBy, setSortBy] = useState('pickup_datetime');
const [cancelling, setCancelling] = useState(false);
const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
const [showCancelModal, setShowCancelModal] = useState(false);

Load Bookings:
typescriptconst loadBookings = async (status: BookingTab) => {
  setLoading(true);
  try {
    const response = await bookingService.getUserBookings({
      status,
      page: currentPage,
      limit: 10,
      sortBy,
      search: searchQuery
    });
    
    setBookings(response.data);
    setTotalPages(response.totalPages);
  } catch (error) {
    showToast('Failed to load bookings', 'error');
  }
  setLoading(false);
};

useEffect(() => {
  loadBookings(activeTab);
}, [activeTab, currentPage, sortBy]);
```

#### 3.12.5 Navigation Flow
```
My Bookings → "View Details" → Booking Detail Modal
My Bookings → "Cancel Booking" → Cancellation Modal → Refresh List
My Bookings → "Book Again" → Booking Page (pre-filled)
My Bookings → "Download Invoice" → PDF download
My Bookings → Tab Change → Load filtered bookings

PAGE 13: ADMIN - CAR MANAGEMENT (/admin/cars)
3.13.1 Purpose
Admin interface to manage the entire car inventory (add, edit, delete, upload images).
3.13.2 Access Control
Protected Route:
typescript// App.tsx
<Route 
  path="/admin/cars" 
  element={
    <AdminRoute>
      <AdminCarManagement />
    </AdminRoute>
  } 
/>

// AdminRoute.tsx
export const AdminRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (user?.role !== 'admin') {
    showToast('Access denied. Admin only.');
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};
3.13.3 Components & Layout
Admin Header

Title: "Car Management"
Stats cards: Total Cars, Available, Rented, Under Maintenance

Stats Display:
typescriptinterface CarStats {
  totalCars: number;
  available: number;
  rented: number;
  underMaintenance: number;
}
Button 1: "Add New Car"

Primary action button (top right)
onClick: Opens add car modal/form
Icon: Plus icon

Filters & Search Bar

Search by brand, model, registration
Filter by: Brand, Category, Availability status
Sort by: Recently added, Price, Rating

Cars Data Table Component
typescriptinterface CarTableRow {
  id: string;
  image: string;
  brand: string;
  model: string;
  year: number;
  registrationNumber: string;
  category: string;
  dailyRate: number;
  isAvailable: boolean;
  currentBookings: number;
  totalRevenue: number;
  actions: JSX.Element;
}
Table Columns:

Image (thumbnail)
Car Details (Brand, Model, Year, Registration)
Category
Pricing (Daily rate)
Status (Available/Rented badge)
Current Bookings
Total Revenue
Actions

Action Buttons (per row):
Button 2: "Edit" (Pencil icon)

onClick Handler:

typescript  const handleEditCar = (carId: string) => {
    setEditingCar(carId);
    loadCarDetails(carId);
    setShowEditModal(true);
  };

Opens edit modal with pre-filled data

Button 3: "View Details" (Eye icon)

onClick: Opens detailed view modal
Shows all specifications

Button 4: "Delete" (Trash icon)

onClick Handler:

typescript  const handleDeleteCar = async (carId: string, carName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${carName}? This action cannot be undone.`
    );
    
    if (!confirmed) return;
    
    setDeleting(true);
    try {
      await adminService.deleteCar(carId);
      showToast('Car deleted successfully');
      loadCars(); // Refresh list
    } catch (error) {
      showToast('Failed to delete car. It may have active bookings.', 'error');
    }
    setDeleting(false);
  };

Backend Call: DELETE /api/v1/admin/cars/:id
Confirms before deletion

Button 5: "Toggle Availability" (Toggle switch)

onClick Handler:

typescript  const handleToggleAvailability = async (carId: string, currentStatus: boolean) => {
    try {
      await adminService.updateCarAvailability(carId, !currentStatus);
      showToast(`Car ${!currentStatus ? 'enabled' : 'disabled'}`);
      loadCars();
    } catch (error) {
      showToast('Failed to update availability', 'error');
    }
  };

Instant toggle (no confirmation needed)

Add/Edit Car Modal
Modal Structure:
typescriptinterface CarFormData {
  // Basic Info
  brand: string;
  model: string;
  year: number;
  registrationNumber: string;
  category: string;
  
  // Specifications
  transmission: 'automatic' | 'manual';
  fuelType: string;
  seating: number;
  engine: string;
  power: string;
  topSpeed: string;
  
  // Pricing
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  depositAmount: number;
  
  // Features
  features: string[];
  
  // Images
  images: File[] | string[];
  
  // Availability
  isAvailable: boolean;
}
Form Sections:
1. Basic Information

Brand (Dropdown: BMW, Audi, Mercedes, etc.)
Model (Text input)
Year (Number input, 2015-2026)
Registration Number (Text input, format: GJ-01-XX-0000)
Category (Dropdown: Sedan, SUV, Sports, etc.)

2. Specifications

Transmission (Radio: Automatic/Manual)
Fuel Type (Dropdown: Petrol, Diesel, Electric, Hybrid)
Seating Capacity (Number: 2-7)
Engine (Text: e.g., "3.0L V6 Turbo")
Power (Text: e.g., "335 HP")
Top Speed (Text: e.g., "250 km/h")

3. Pricing

Hourly Rate (₹, Number input)
Daily Rate (₹, Number input)
Weekly Rate (₹, Number input)
Security Deposit (₹, Number input)

4. Features (Multi-select checkboxes)

Leather Seats
Sunroof
Navigation System
Parking Sensors
Adaptive Cruise Control
Premium Audio
(Custom add option)

5. Image Upload
typescriptconst handleImageUpload = async (files: FileList) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  const validFiles = Array.from(files).filter(file => {
    if (file.size > maxSize) {
      showToast(`${file.name} is too large. Max 5MB.`, 'error');
      return false;
    }
    if (!allowedTypes.includes(file.type)) {
      showToast(`${file.name} is not a supported format.`, 'error');
      return false;
    }
    return true;
  });
  
  if (validFiles.length + images.length > 10) {
    showToast('Maximum 10 images allowed', 'error');
    return;
  }
  
  setImages(prev => [...prev, ...validFiles]);
};
Image Upload Area:

Drag-and-drop zone
Click to browse
Preview thumbnails
Remove image button on each
Reorder images (drag to reorder)
Max 10 images, max 5MB each

6. Availability Status

Toggle: Available for Booking
Note: "Disable if car is under maintenance"

Form Validation:
typescriptconst validateCarForm = (data: CarFormData): ValidationResult => {
  const errors: string[] = [];
  
  if (!data.brand) errors.push('Brand is required');
  if (!data.model) errors.push('Model is required');
  if (data.year < 2015 || data.year > 2026) errors.push('Invalid year');
  if (!/^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/.test(data.registrationNumber)) {
    errors.push('Invalid registration number format');
  }
  if (data.dailyRate <= 0) errors.push('Daily rate must be positive');
  if (images.length === 0) errors.push('At least one image is required');
  
  return { isValid: errors.length === 0, errors };
};
Button 6: "Save Car" (in modal)

onClick Handler:

typescript  const handleSaveCar = async () => {
    const validation = validateCarForm(formData);
    
    if (!validation.isValid) {
      showToast(validation.errors.join(', '), 'error');
      return;
    }
    
    setSaving(true);
    try {
      // Upload images first
      const imageUrls = await uploadImages(images);
      
      const carData = {
        ...formData,
        images: imageUrls
      };
      
      if (editingCar) {
        await adminService.updateCar(editingCar, carData);
        showToast('Car updated successfully');
      } else {
        await adminService.createCar(carData);
        showToast('Car added successfully');
      }
      
      setShowEditModal(false);
      loadCars(); // Refresh list
      resetForm();
    } catch (error) {
      showToast('Failed to save car',Continue7:44 PM'error');
}
setSaving(false);
};
- Backend Calls: 
  - `POST /api/v1/admin/cars/:id/images` (image upload)
  - `POST /api/v1/admin/cars` (create)
  - `PUT /api/v1/admin/cars/:id` (update)

**Button 7: "Cancel"** (in modal)
- onClick: Closes modal, resets form
- Confirms if data entered

**Bulk Actions** (checkbox selection)
- Select multiple cars
- Bulk enable/disable
- Bulk delete (with confirmation)
- Export to CSV

**Button 8: "Export Cars"**
- onClick: Downloads CSV with all car data
- Backend Call: `GET /api/v1/admin/cars/export`

#### 3.13.4 API Connections

**Get All Cars (Admin View):**
GET /api/v1/admin/cars?page={page}&limit={limit}&search={query}&filter={filter}
Headers: { Authorization: "Bearer {admin_token}" }
Response: {
success: true,
data: [
{
id: "car-uuid",
brand: "BMW",
model: "7 Series",
year: 2023,
registrationNumber: "GJ-01-AB-1234",
category: "Luxury Sedan",
transmission: "automatic",
fuelType: "petrol",
seating: 5,
specifications: { /* full specs */ },
hourlyRate: 1500,
dailyRate: 12000,
weeklyRate: 70000,
depositAmount: 50000,
images: ["url1", "url2"],
features: ["Leather Seats", "Sunroof"],
isAvailable: true,
currentBookings: 2,
totalRevenue: 156000,
createdAt: "2025-01-01T00:00:00Z"
}
],
stats: {
totalCars: 105,
available: 87,
rented: 15,
underMaintenance: 3
},
totalPages: 11,
currentPage: 1
}

**Create New Car:**
POST /api/v1/admin/cars
Headers: { Authorization: "Bearer {admin_token}" }
Request: {
brand: "BMW",
model: "7 Series",
year: 2023,
registrationNumber: "GJ-01-AB-1234",
category: "Luxury Sedan",
transmission: "automatic",
fuelType: "petrol",
seating: 5,
specifications: {
engine: "3.0L Inline-6 Turbo",
power: "335 HP",
torque: "450 Nm",
topSpeed: "250 km/h",
acceleration: "0-100 in 5.8s",
mileage: "12 km/l",
bootSpace: "515 liters"
},
hourlyRate: 1500,
dailyRate: 12000,
weeklyRate: 70000,
depositAmount: 50000,
images: ["https://cdn.example.com/img1.jpg"],
features: ["Leather Seats", "Sunroof", "Navigation"],
isAvailable: true
}
Response: {
success: true,
data: {
id: "new-car-uuid",
/* echoes all car data */
createdAt: "2026-01-22T15:00:00Z"
}
}

**Update Car:**
PUT /api/v1/admin/cars/{id}
Headers: { Authorization: "Bearer {admin_token}" }
Request: { /* same as create, partial updates allowed / }
Response: { / updated car data */ }

**Delete Car:**
DELETE /api/v1/admin/cars/{id}
Headers: { Authorization: "Bearer {admin_token}" }
Response: {
success: true,
message: "Car deleted successfully"
}
Error Response (if active bookings): {
success: false,
error: "Cannot delete car with active bookings"
}

**Upload Car Images:**
POST /api/v1/admin/cars/{id}/images
Headers: {
Authorization: "Bearer {admin_token}",
Content-Type: "multipart/form-data"
}
Request: FormData with multiple files
Response: {
success: true,
data: {
carId: "car-uuid",
images: [
"https://cdn.example.com/cars/car-uuid/image-1.jpg",
"https://cdn.example.com/cars/car-uuid/image-2.jpg"
]
}
}

#### 3.13.5 State Management

**Local State:**
```typescript
const [cars, setCars] = useState<Car[]>([]);
const [stats, setStats] = useState<CarStats | null>(null);
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [searchQuery, setSearchQuery] = useState('');
const [selectedFilter, setSelectedFilter] = useState('all');
const [showEditModal, setShowEditModal] = useState(false);
const [editingCar, setEditingCar] = useState<string | null>(null);
const [formData, setFormData] = useState<CarFormData>(initialFormData);
const [images, setImages] = useState<File[]>([]);
const [saving, setSaving] = useState(false);
const [deleting, setDeleting] = useState(false);
```

#### 3.13.6 Navigation Flow
Admin Car Management → "Add New Car" → Modal → Save → Refresh List
Admin Car Management → "Edit Car" → Modal (pre-filled) → Save → Refresh List
Admin Car Management → "Delete Car" → Confirmation → Delete → Refresh List
Admin Car Management → Search/Filter → Update table

---

### PAGE 14: ADMIN - ORDER MANAGEMENT (`/admin/orders`)

#### 3.14.1 Purpose
Admin interface to view, manage, and update all customer bookings.

#### 3.14.2 Components & Layout

**Admin Header**
- Title: "Order Management"
- Stats cards: Today's Bookings, Active Rentals, Pending Payments, Total Revenue

**Stats Display:**
```typescript
interface OrderStats {
  todaysBookings: number;
  activeRentals: number;
  pendingPayments: number;
  todaysRevenue: number;
  monthlyRevenue: number;
}
```

**Quick Filters (Tabs)**
```typescript
enum OrderFilter {
  ALL = 'all',
  PENDING_PAYMENT = 'pending_payment',
  CONFIRMED = 'confirmed',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}
```

**Tab Counts:** All (145), Pending Payment (12), Confirmed (45), Ongoing (23), Completed (58), Cancelled (7)

**Advanced Filters**
- Date range picker
- Customer name/phone search
- Car brand filter
- Payment method filter
- Delivery type filter

**Sort Options:**
- Newest first
- Pickup date
- Total amount
- Customer name

**Orders Data Table**

**Table Columns:**
1. Booking # (clickable)
2. Customer Details (Name, Phone)
3. Car (Brand, Model, Image)
4. Pickup Date/Time
5. Dropoff Date/Time
6. Total Amount
7. Payment Status
8. Booking Status
9. Assigned Driver
10. Actions

**Booking Row Component:**
```typescript
interface OrderTableRow {
  id: string;
  bookingNumber: string;
  customer: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  car: {
    id: string;
    brand: string;
    model: string;
    image: string;
  };
  pickupDatetime: Date;
  dropoffDatetime: Date;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
  assignedDriver?: Driver;
  deliveryType: DeliveryType;
  actions: JSX.Element;
}
```

**Status Badges:**
- Color-coded badges for each status
- Hover shows more details

**Action Buttons (per row):**

**Button 1: "View Details"** (Eye icon)
- onClick: Opens booking details modal
- Shows complete booking information

**Button 2: "Change Status"** (Dropdown)
- Options depend on current status
- Workflow: pending_payment → confirmed → ongoing → completed
- onClick Handler:
```typescript
  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    const confirmed = window.confirm(`Change status to "${newStatus}"?`);
    
    if (!confirmed) return;
    
    setUpdating(true);
    try {
      await adminService.updateBookingStatus(bookingId, {
        status: newStatus,
        updatedBy: user.id,
        notes: statusChangeNotes
      });
      
      showToast('Status updated successfully');
      loadOrders(); // Refresh
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
    setUpdating(false);
  };
```
- Backend Call: `PUT /api/v1/admin/bookings/:id/status`

**Button 3: "Assign Driver"** (User Plus icon)
- Visible when: status = 'confirmed' and delivery type ≠ 'branch'
- onClick: Opens driver assignment modal

**Driver Assignment Modal:**
```typescript
interface DriverAssignment {
  driverId: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  estimatedArrival: Date;
  notes: string;
}
```

**Modal Fields:**
- Driver dropdown (list of available drivers)
- Shows driver details: Name, Phone, Rating, Current assignments
- Estimated arrival time
- Special instructions (textarea)

**Button 4: "Assign" (in modal)**
- onClick Handler:
```typescript
  const handleAssignDriver = async () => {
    if (!selectedDriver) {
      showToast('Please select a driver');
      return;
    }
    
    setAssigning(true);
    try {
      await adminService.assignDriver(bookingId, {
        driverId: selectedDriver.id,
        estimatedArrival,
        notes: driverNotes
      });
      
      showToast('Driver assigned successfully');
      
      // Send SMS to customer
      await notificationService.sendDriverAssignedSMS(bookingId);
      
      setShowDriverModal(false);
      loadOrders();
    } catch (error) {
      showToast('Failed to assign driver', 'error');
    }
    setAssigning(false);
  };
```
- Backend Call: `PUT /api/v1/admin/bookings/:id/assign-driver`
- Sends notification to customer

**Button 5: "Contact Customer"** (Phone icon)
- onClick: `window.location.href = 'tel:${customer.phone}'`
- Opens phone dialer

**Button 6: "Send Message"** (Message icon)
- onClick: Opens SMS/WhatsApp modal
- Pre-filled templates available
- Sends custom message to customer

**Button 7: "Cancel Booking"** (for admin cancellation)
- onClick: Opens cancellation modal
- Requires cancellation reason
- Processes refund automatically

**Button 8: "Download Invoice"**
- onClick: Downloads booking invoice PDF
- Same as customer invoice

**Booking Details Modal**

**Complete Information:**
- Customer details (full profile)
- Car details (complete specs)
- Rental period (dates, duration)
- Delivery addresses (pickup & dropoff)
- Selected add-ons (with prices)
- Complete price breakdown
- Payment information (transaction details)
- Timeline (all status changes with timestamps)
- Assigned driver details (if any)
- Customer notes/special requests
- Admin internal notes

**Editable Fields (for admin):**
- Booking status
- Payment status
- Assigned driver
- Internal notes
- Delivery ETA

**Quick Actions in Modal:**
- Update status
- Assign/change driver
- Send message
- Mark payment received (if COD)
- Generate invoice
- Cancel booking

**Bulk Actions**
- Select multiple bookings
- Bulk status update
- Bulk export
- Send bulk notifications

**Button 9: "Export Orders"**
- onClick: Downloads CSV/Excel with filtered orders
- Backend Call: `GET /api/v1/admin/bookings/export?filters={}`

**Real-time Updates**
- WebSocket connection for live order updates
- New bookings notification
- Payment received alerts
- Status change notifications

**Calendar View Toggle**
- Button: Switch to Calendar View
- Shows bookings on calendar grid
- Color-coded by status
- Drag to reschedule (admin only)

#### 3.14.3 API Connections

**Get All Bookings (Admin):**
GET /api/v1/admin/bookings?page={page}&limit={limit}&status={status}&startDate={date}&endDate={date}
Headers: { Authorization: "Bearer {admin_token}" }
Response: {
success: true,
data: [
{
id: "booking-uuid",
bookingNumber: "LXR-2026-0123",
customer: {
id: "user-uuid",
name: "John Doe",
phone: "9876543210",
email: "john@example.com"
},
car: {
id: "car-uuid",
brand: "BMW",
model: "7 Series",
image: "url",
registrationNumber: "GJ-01-AB-1234"
},
pickupDatetime: "2026-01-30T10:00:00Z",
dropoffDatetime: "2026-02-01T10:00:00Z",
deliveryType: "home",
pickupAddress: { /* full address / },
dropoffAddress: { / full address / },
addOns: [ / add-ons list */ ],
status: "confirmed",
paymentStatus: "paid",
totalAmount: 84810,
payment: {
method: "phonepe",
transactionId: "TXN-123",
paidAt: "2026-01-22T14:35:00Z"
},
assignedDriver: {
id: "driver-uuid",
name: "Rajesh Kumar",
phone: "9876543211",
vehicleNumber: "GJ-05-XY-5678"
},
createdAt: "2026-01-22T14:30:00Z",
updatedAt: "2026-01-23T10:00:00Z"
}
],
stats: {
todaysBookings: 15,
activeRentals: 23,
pendingPayments: 12,
todaysRevenue: 425000,
monthlyRevenue: 3250000
},
totalCount: 145,
totalPages: 15,
currentPage: 1
}

**Update Booking Status:**
PUT /api/v1/admin/bookings/{id}/status
Headers: { Authorization: "Bearer {admin_token}" }
Request: {
status: "ongoing",
notes: "Car delivered to customer",
updatedBy: "admin-user-uuid"
}
Response: {
success: true,
data: {
bookingId: "booking-uuid",
previousStatus: "confirmed",
newStatus: "ongoing",
updatedAt: "2026-01-30T10:05:00Z",
updatedBy: {
id: "admin-uuid",
name: "Admin Name"
}
}
}

**Assign Driver:**
PUT /api/v1/admin/bookings/{id}/assign-driver
Headers: { Authorization: "Bearer {admin_token}" }
Request: {
driverId: "driver-uuid",
estimatedArrival: "2026-01-30T09:30:00Z",
notes: "Driver will call 15 minutes before arrival"
}
Response: {
success: true,
data: {
bookingId: "booking-uuid",
driver: {
id: "driver-uuid",
name: "Rajesh Kumar",
phone: "9876543211",
rating: 4.8,
vehicleNumber: "GJ-05-XY-5678"
},
estimatedArrival: "2026-01-30T09:30:00Z",
customerNotified: true
}
}

**Get Available Drivers:**
GET /api/v1/admin/drivers/available?date={date}&time={time}
Headers: { Authorization: "Bearer {admin_token}" }
Response: {
success: true,
data: [
{
id: "driver-uuid",
name: "Rajesh Kumar",
phone: "9876543211",
rating: 4.8,
completedTrips: 245,
currentAssignments: 1,
vehicleNumber: "GJ-05-XY-5678",
languages: ["Hindi", "Gujarati", "English"]
}
]
}

#### 3.14.4 State Management

**Local State:**
```typescript
const [orders, setOrders] = useState<Booking[]>([]);
const [stats, setStats] = useState<OrderStats | null>(null);
const [loading, setLoading] = useState(true);
const [activeFilter, setActiveFilter] = useState<OrderFilter>(OrderFilter.ALL);
const [currentPage, setCurrentPage] = useState(1);
const [searchQuery, setSearchQuery] = useState('');
const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
const [showDetailsModal, setShowDetailsModal] = useState(false);
const [showDriverModal, setShowDriverModal] = useState(false);
const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([]);
const [updating, setUpdating] = useState(false);
const [assigning, setAssigning] = useState(false);
```

#### 3.14.5 Navigation Flow
Admin Order Management → "View Details" → Booking Details Modal
Admin Order Management → "Assign Driver" → Driver Assignment Modal → Assign → Refresh
Admin Order Management → "Change Status" → Confirm → Update → Refresh
Admin Order Management → "Contact Customer" → Opens dialer/WhatsApp
Admin Order Management → Filter/Search → Update table
Admin Order Management → "Export" → Download CSV/Excel

---

### PAGE 15: SUPPORT & POLICIES PAGE (`/support`)

#### 3.15.1 Purpose
Comprehensive help center with FAQs, policies, and support ticket system.

#### 3.15.2 Components & Layout

**Page Header**
- Title: "Help & Support"
- Subtitle: "We're here to help you 24/7"

**Quick Actions Card**

**Contact Options:**
```typescript
interface ContactOption {
  type: 'phone' | 'email' | 'whatsapp' | 'chat';
  label: string;
  value: string;
  available: boolean;
  responseTime: string;
}
```

**Display:**
1. **Phone Support**
   - Number: +91 98765 43210
   - Available: 24/7
   - Button: "Call Now"

2. **Email Support**
   - Email: support@luxurycars.com
   - Response time: Within 24 hours
   - Button: "Send Email"

3. **WhatsApp**
   - Number: +91 98765 43210
   - Available: 24/7
   - Button: "Chat on WhatsApp"

4. **Live Chat** (if available)
   - Status: Online/Offline
   - Button: "Start Chat"

**Button Actions:**
```typescript
const handleContactAction = (type: string, value: string) => {
  switch(type) {
    case 'phone':
      window.location.href = `tel:${value}`;
      break;
    case 'email':
      window.location.href = `mailto:${value}`;
      break;
    case 'whatsapp':
      window.open(`https://wa.me/${value.replace(/[^0-9]/g, '')}`, '_blank');
      break;
    case 'chat':
      // Initialize live chat widget
      initializeLiveChat();
      break;
  }
};
```

**Tab Navigation**
```typescript
enum SupportTab {
  FAQ = 'faq',
  POLICIES = 'policies',
  RAISE_TICKET = 'raise_ticket'
}
```

**Tabs:**
1. FAQs
2. Policies & Terms
3. Raise a Ticket

---

**TAB 1: FAQs**

**Search Bar**
- Placeholder: "Search for answers..."
- Real-time search through FAQ database

**FAQ Categories (Accordion)**

**Categories:**
1. Booking & Reservations
2. Payment & Refunds
3. Cancellation & Modifications
4. Delivery & Pickup
5. During the Rental
6. Insurance & Damage
7. Account & Profile

**FAQ Structure:**
```typescript
interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  helpful: number;
  notHelpful: number;
}
```

**Sample FAQs:**

**Booking & Reservations:**
- Q: How do I book a luxury car?
  A: You can book by browsing our collection, selecting dates, choosing delivery options, and completing payment...

- Q: Can I book a car for someone else?
  A: Yes, but the primary driver must present their valid license at delivery...

- Q: What documents do I need for booking?
  A: Valid driving license, government ID (Aadhar/PAN/Passport), and address proof...

**Payment & Refunds:**
- Q: What payment methods do you accept?
  A: We accept Paytm, PhonePe, Google Pay, and Cash on Delivery...

- Q: When will I receive my security deposit refund?
  A: Within 5-7 business days after inspection, refunded to original payment method...

**Cancellation & Modifications:**
- Q: What is your cancellation policy?
  A: Free cancellation 24+ hours before pickup, 50% refund 12-24 hours before, no refund <12 hours...

**Each FAQ has:**
- Expand/collapse functionality
- "Was this helpful?" feedback buttons
- Related FAQs section

**Feedback Buttons:**
```typescript
const handleFAQFeedback = async (faqId: string, helpful: boolean) => {
  try {
    await supportService.submitFAQFeedback(faqId, helpful);
    showToast('Thank you for your feedback!');
  } catch (error) {
    // Silent fail
  }
};
```

---

**TAB 2: Policies & Terms**

**Policy Sections (Expandable):**

1. **Terms & Conditions**
   - User Agreement
   - Service Terms
   - Booking Terms
   - User Responsibilities

2. **Privacy Policy**
   - Data Collection
   - Data Usage
   - Data Protection
   - Third-party Sharing

3. **Cancellation Policy**
   - Free Cancellation Window
   - Partial Refund Conditions
   - No Refund Scenarios
   - Refund Processing Time

4. **Refund Policy**
   - Refund Eligibility
   - Refund Amount Calculation
   - Refund Method
   - Processing Timeline

5. **Damage & Insurance Policy**
   - Standard Insurance Coverage
   - Premium Insurance
   - Damage Assessment
   - Customer Liability
   - Claim Process

6. **Fuel Policy**
   - Full Tank Delivery
   - Return Fuel Level
   - Fuel Charges (if applicable)

7. **Late Return Policy**
   - Grace Period
   - Late Fees
   - Maximum Delay Allowed

**Each Policy Section:**
```typescript
interface PolicySection {
  id: string;
  title: string;
  content: string; // HTML content
  lastUpdated: Date;
  version: string;
}
```

**Features:**
- Expand all / Collapse all buttons
- Print policy button
- Download PDF button
- Last updated date displayed
- Version number

**Button: "Download All Policies"**
- onClick: Downloads PDF with all policies
- Backend Call: `GET /api/v1/support/policies/download`

---

**TAB 3: Raise a Ticket**

**Support Ticket Form**

**Only shown if user is logged in:**
```typescript
if (!isAuthenticated) {
  return (
    <div className="text-center p-8">
      <p>Please login to raise a support ticket</p>
      <button onClick={() => navigate('/auth')}>Login</button>
    </div>
  );
}
```

**Form Fields:**
```typescript
interface SupportTicket {
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  relatedBooking?: string;
  description: string;
  attachments?: File[];
}
```

**Fields:**

1. **Category** (Dropdown, required)
   - Options: Booking Issue, Payment Issue, Car Issue, Delivery Problem, Refund Query, Account Problem, Other

2. **Subject** (Text input, required)
   - Placeholder: "Brief description of your issue"
   - Max 100 characters

3. **Priority** (Radio buttons)
   - Low (Normal query)
   - Medium (Issue affecting booking)
   - High (Urgent - car breakdown, accident)

4. **Related Booking** (Dropdown, optional)
   - Shows user's recent bookings
   - Auto-fills if accessing from booking page

5. **Description** (Textarea, required)
   - Placeholder: "Please describe your issue in detail"
   - Min 20 characters, Max 1000 characters

6. **Attachments** (File upload, optional)
   - Accept: Images, PDFs
   - Max 3 files, 5MB each
   - Preview uploaded files

**Validation:**
```typescript
const validateTicketForm = (): ValidationResult => {
  const errors: string[] = [];
  
  if (!formData.category) errors.push('Please select a category');
  if (!formData.subject || formData.subject.length < 5) {
    errors.push('Subject must be at least 5 characters');
  }
  if (!formData.description || formData.description.length < 20) {
    errors.push('Description must be at least 20 characters');
  }
  
  return { isValid: errors.length === 0, errors };
};
```

**Button: "Submit Ticket"**
- onClick Handler:
```typescript
  const handleSubmitTicket = async () => {
    const validation = validateTicketForm();
    
    if (!validation.isValid) {
      showToast(validation.errors.join(', '), 'error');
      return;
    }
    
    setSubmitting(true);
    try {
      // Upload attachments first
      let attachmentUrls: string[] = [];
      if (attachments.length > 0) {
        attachmentUrls = await uploadAttachments(attachments);
      }
      
      const ticket = await supportService.createTicket({
        ...formData,
        attachments: attachmentUrls,
        userId: user.id
      });
      
      showToast('Ticket submitted successfully!');
      setShowSuccessMessage(true);
      setTicketNumber(ticket.ticketNumber);
      resetForm();
    } catch (error) {
      showToast('Failed to submit ticket', 'error');
    }
    setSubmitting(false);
  };
```
- Backend Call: `POST /api/v1/support/ticket`
- Shows success message with ticket number

**Success Message Display:**
✓ Ticket Submitted Successfully!
Your ticket number is: #TKT-2026-0045
We've sent a confirmation email to john@example.com.
Our support team will respond within 24 hours.
[View My Tickets] [Submit Another Ticket]

**Button: "View My Tickets"**
- onClick: `navigate('/support/tickets')` (future feature)
- Currently shows list inline

**My Tickets Section** (below form)

**Shows user's ticket history:**
```typescript
interface TicketHistory {
  ticketNumber: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: string;
  createdAt: Date;
  lastUpdated: Date;
  responses: number;
}
```

**Ticket List Display:**
- Table with: Ticket #, Subject, Status, Priority, Created, Last Updated
- Status badges (color-coded)
- Click to expand and view responses

**Expandable Ticket Details:**
- Original ticket description
- All responses (admin + customer)
- Add response textarea
- Close ticket button (if resolved)

---

**Additional Sections on Support Page:**

**Emergency Assistance Banner** (if user has active booking)
🚨 Active Rental Emergency?
Car breakdown or accident? Call emergency support immediately.
[Emergency Hotline: +91 98765 43210]

**Office Locations Section**
```typescript
interface OfficeLocation {
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapLink: string;
}
```

**Display:**
- Ahmedabad Office
- Address: S.G. Highway, Bodakdev
- Phone, Hours, Directions button

**Common Issues Quick Links**
- How to modify booking?
- How to cancel booking?
- Security deposit refund status
- Add driver to booking
- Report car damage

#### 3.15.3 API Connections

**Get FAQs:**
GET /api/v1/support/faq?category={category}&search={query}
Response: {
success: true,
data: [
{
id: "faq-uuid",
category: "Booking & Reservations",
question: "How do I book a luxury car?",
answer: "You can book by...",
helpful: 145,
notHelpful: 12,
relatedFAQs: ["faq-uuid-2", "faq-uuid-3"]
}
]
}

**Submit FAQ Feedback:**
POST /api/v1/support/faq/{id}/feedback
Request: { helpful: true }
Response: { success: true }

**Get Policies:**
GET /api/v1/support/policies
Response: {
success: true,
data: [
{
id: "policy-uuid",
title: "Terms & Conditions",
content: "<html content>",
lastUpdated: "2026-01-01T00:00:00Z",
version: "1.2"
}
]
}

**Create Support Ticket:**
POST /api/v1/support/ticket
Headers: { Authorization: "Bearer {token}" }
Request: {
category: "Booking Issue",
subject: "Cannot complete payment",
priority: "high",
relatedBooking: "booking-uuid",
description: "I'm getting an error when trying to pay...",
attachments: ["url1", "url2"]
}
Response: {
success: true,
data: {
id: "ticket-uuid",
ticketNumber: "TKT-2026-0045",
status: "open",
assignedTo: null,
createdAt: "2026-01-22T16:00:00Z",
estimatedResponseTime: "24 hours"
}
}

**Get User's Tickets:**
GET /api/v1/support/tickets/user
Headers: { Authorization: "Bearer {token}" }
Response: {
success: true,
data: [
{
id: "ticket-uuid",
ticketNumber: "TKT-2026-0045Continue7:46 PM",
subject: "Cannot complete payment",
status: "in_progress",
priority: "high",
createdAt: "2026-01-22T16:00:00Z",
lastUpdated: "2026-01-23T10:00:00Z",
responses: [
{
id: "response-uuid",
from: "support",
message: "We're looking into this...",
createdAt: "2026-01-23T10:00:00Z"
}
]
}
]
}

#### 3.15.4 State Management

**Local State:**
```typescript
const [activeTab, setActiveTab] = useState<SupportTab>(SupportTab.FAQ);
const [faqs, setFaqs] = useState<FAQ[]>([]);
const [policies, setPolicies] = useState<PolicySection[]>([]);
const [searchQuery, setSearchQuery] = useState('');
const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
const [ticketFormData, setTicketFormData] = useState<SupportTicket>(initialTicketData);
const [attachments, setAttachments] = useState<File[]>([]);
const [submitting, setSubmitting] = useState(false);
const [showSuccessMessage, setShowSuccessMessage] = useState(false);
const [ticketNumber, setTicketNumber] = useState('');
const [userTickets, setUserTickets] = useState<TicketHistory[]>([]);
```

#### 3.15.5 Navigation Flow
Support Page → FAQ Search → Filtered results
Support Page → "Call Now" → Opens dialer
Support Page → "WhatsApp" → Opens WhatsApp
Support Page → "Submit Ticket" → Success → View ticket
Support Page → "Download Policies" → PDF download
Support Page → Tab Navigation → Switch between FAQ/Policies/Tickets

---

## 4. COMPLETE PAGE CONNECTION MAP

### 4.1 User Journey Flow

**Guest User → Registered User → Booking Flow:**

HomePage (/)
↓ Browse cars
CarListingPage (/cars)
↓ Select car
CarDetailsPage (/cars/:id)
↓ Book now (not logged in)
AuthPage (/auth)
↓ Login/Register
BookingPage (/booking/create)
↓ Select dates
DeliveryLocationPage (/booking/delivery)
↓ Choose delivery
AddOnsPage (/booking/addons)
↓ Add extras
PriceSummaryPage (/booking/summary)
↓ Confirm
PaymentPage (/booking/payment)
↓ Pay
BookingConfirmationPage (/booking/confirmation)
↓ View booking
UserDashboard (/dashboard) or MyBookingsPage (/my-bookings)


**Admin Journey:**

AuthPage (/auth) [Login as admin]
↓
AdminCarManagement (/admin/cars)
↓ Manage inventory
AdminOrderManagement (/admin/orders)
↓ Handle bookings


**Support Journey:**
Any Page → SupportPoliciesPage (/support)
↓ Raise ticket / View policies / Get help

### 4.2 Navigation Matrix

| From Page | To Pages | Trigger |
|-----------|----------|---------|
| Home | Cars, Auth, Dashboard | Search, Login, Logo |
| Cars | Car Details, Booking | View Details, Quick Book |
| Car Details | Booking, Auth, Cars | Book Now, Back |
| Auth | Dashboard, Admin Cars | Login Success (role-based) |
| Booking | Delivery, Car Details | Continue, Back |
| Delivery | Add-ons, Booking | Continue, Back |
| Add-ons | Summary, Delivery | Continue, Back |
| Summary | Payment, Add-ons | Proceed, Edit |
| Payment | Confirmation, Cars | Pay Success, Cancel |
| Confirmation | Dashboard, My Bookings, Cars | Navigate buttons |
| Dashboard | Profile, My Bookings, Cars, Support | Action buttons |
| My Bookings | Dashboard, Support | View, Contact |
| Admin Cars | Admin Orders | Navbar |
| Admin Orders | Admin Cars | Navbar |
| Support | All pages | Via help icon in navbar |

---

## 5. COMPLETE BACKEND API REFERENCE

### 5.1 Authentication Endpoints
POST   /api/v1/auth/send-otp
POST   /api/v1/auth/verify-otp
POST   /api/v1/auth/register
POST   /api/v1/auth/logout
GET    /api/v1/auth/me

### 5.2 Car Endpoints
GET    /api/v1/cars/featured
GET    /api/v1/cars
GET    /api/v1/cars/:id
GET    /api/v1/cars/:id/availability
GET    /api/v1/cars/:id/similar
GET    /api/v1/cars/filters
POST   /api/v1/wishlist/add
DELETE /api/v1/wishlist/remove

### 5.3 Booking Endpoints
POST   /api/v1/bookings/calculate
POST   /api/v1/bookings/create
POST   /api/v1/bookings/:id/location
POST   /api/v1/bookings/:id/addons
GET    /api/v1/bookings/summary/:id
GET    /api/v1/bookings/user
GET    /api/v1/bookings/:id
GET    /api/v1/bookings/:id/invoice
PUT    /api/v1/bookings/:id/cancel
POST   /api/v1/bookings/:id/review

### 5.4 Payment Endpoints
POST   /api/v1/payments/initiate
POST   /api/v1/payments/verify
POST   /api/v1/payments/cod
GET    /api/v1/payments/status/:id

### 5.5 Location Endpoints
GET    /api/v1/locations
GET    /api/v1/locations/pincode/:code

### 5.6 Support Endpoints
GET    /api/v1/support/faq
POST   /api/v1/support/faq/:id/feedback
GET    /api/v1/support/policies
GET    /api/v1/support/policies/download
POST   /api/v1/support/ticket
GET    /api/v1/support/tickets/user

### 5.7 Admin Endpoints
GET    /api/v1/admin/cars
POST   /api/v1/admin/cars
PUT    /api/v1/admin/cars/:id
DELETE /api/v1/admin/cars/:id
POST   /api/v1/admin/cars/:id/images
GET    /api/v1/admin/cars/export
GET    /api/v1/admin/bookings
PUT    /api/v1/admin/bookings/:id/status
PUT    /api/v1/admin/bookings/:id/assign-driver
GET    /api/v1/admin/drivers/available
GET    /api/v1/admin/bookings/export

---

## 6. GLOBAL STATE MANAGEMENT

### 6.1 AuthContext
```typescript
{
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token, user) => void;
  logout: () => void;
}
```

### 6.2 BookingContext
```typescript
{
  selectedCar: Car | null;
  bookingData: {
    carId, pickupDatetime, dropoffDatetime,
    deliveryType, addresses, addOns,
    pricing, bookingId
  };
  selectCar: (car) => void;
  updateBookingData: (data) => void;
  clearBooking: () => void;
}
```

### 6.3 ToastContext
```typescript
{
  showToast: (message, type?) => void;
}
```

---

## 7. COMPLETE TYPE DEFINITIONS
```typescript
// types/car.types.ts
interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: 'automatic' | 'manual';
  fuelType: string;
  seating: number;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  depositAmount: number;
  isAvailable: boolean;
  images: string[];
  specifications: CarSpecifications;
  features: string[];
  rating: number;
  reviewCount: number;
}

interface CarSpecifications {
  engine: string;
  power: string;
  torque: string;
  topSpeed: string;
  acceleration: string;
  mileage: string;
  bootSpace: string;
}

// types/booking.types.ts
interface Booking {
  id: string;
  bookingNumber: string;
  userId: string;
  carId: string;
  pickupDatetime: Date;
  dropoffDatetime: Date;
  deliveryType: DeliveryType;
  pickupAddress: Address;
  dropoffAddress: Address | null;
  addOns: BookingAddOn[];
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  pricing: PriceBreakdown;
  payment: PaymentInfo;
  assignedDriver?: Driver;
  createdAt: Date;
  updatedAt: Date;
}

type BookingStatus = 'pending_payment' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'cod_pending';
type DeliveryType = 'home' | 'office' | 'branch';

// types/user.types.ts
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  walletBalance: number;
  memberSince: Date;
}

// types/payment.types.ts
type PaymentMethod = 'paytm' | 'phonepe' | 'gpay' | 'cod';

interface PaymentInfo {
  id: string;
  method: PaymentMethod;
  transactionId?: string;
  status: PaymentStatus;
  amount: number;
  paidAt?: Date;
}
```

---

## 8. CONCLUSION

This PRD provides complete specifications for a production-ready luxury car rental platform with:

- **15 interconnected pages** with detailed functionality
- **Complete API specifications** for all endpoints
- **Comprehensive button actions** and user interactions
- **Full state management** strategy using React Context
- **Type-safe** TypeScript interfaces throughout
- **Real-world payment integration** with Indian gateways
- **Admin capabilities** for car and order management
- **Support system** with ticketing and FAQs

All pages are designed to work seamlessly together using React + TypeScript, with clear navigation flows and backend connections documented for language-agnostic REST API implementation.