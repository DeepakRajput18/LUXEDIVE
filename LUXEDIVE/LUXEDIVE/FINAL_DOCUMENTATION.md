# 🚗 LUXEDIVE - Final Project Documentation

## 1. Project Overview
**LUXEDIVE** is a premium luxury car rental platform specifically tailored for the Ahmedabad market. It offers a white-glove experience, providing access to 100+ high-end vehicles through a seamless, 100% advance-payment booking system.

### 1.1 Core Mission
To provide a friction-less, premium car rental experience using state-of-the-art technology, including AI-driven vehicle visualization and automated document verification.

---

## 2. Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19 (TypeScript), Vite, Tailwind CSS, Framer Motion |
| **Logic** | React Hook Form, Zod (Validation), Context API (State) |
| **Backend API** | Python Flask (Heavy lifting), Supabase Edge Functions (OTP) |
| **Database** | PostgreSQL (Supabase) with Row-Level Security (RLS) |
| **AI / ML** | Google Gemini (360° Analysis), rembg (Background Removal) |
| **360° Engine** | Python (OpenCV), Node.js (Headless Rendering) |
| **Real-time** | Twilio (WhatsApp), Fast2SMS (SMS OTP) |

---

## 3. Core Features

### 3.1 Seamless Booking Flow
- **Real-time Availability**: Instant check for 100+ luxury cars.
- **Dynamic Pricing**: Calculation based on hourly, daily, and weekly rates.
- **Location Selector**: Interactive Google Maps integration for delivery/pickup.
- **100% Advance Payment**: Secure checkout powered by Razorpay.

### 3.2 AI-Powered 360° Viewer
- **Custom Pipeline**: Converts static images into a high-fidelity 36 interactive experience.
- **Background Removal**: Automated cleanup of vehicle shots using AI.
- **Frame Interpolation**: Smooth rotation logic using ThreeJS and custom canvas splitting.

### 3.3 Chauffeur Ecosystem
- **Profile Directory**: Detailed portfolios for professional drivers.
- **Trust Metrics**: Rating system with unique, AI-filtered natural reviews.
- **Chauffeur Terms**: Legal compliance toggles and mandatory acceptance flow.

### 3.4 Admin Control Panel
- **Fleet Management**: CRUD operations for cars and imagery.
- **Order Management**: Real-time tracking of bookings and payment statuses.
- **Document Verification**: Dashboard for verifying user identities.

---

## 4. Architecture & Logic

### 4.1 Frontend Structure (`/src`)
- **`components/`**: Atomic design patterns for UI, Cars, Booking, and Admin.
- **`context/`**: Global state for `AuthContext` (JWT) and `BookingContext` (Order flow).
- **`services/`**: API abstraction layer for Auth, Cars, and Payments.
- **`hooks/`**: Custom logic for local storage, debouncing, and authentication.

### 4.2 360° Generation Pipeline (`/backend`)
1. **Request Interface**: Admin uploads vehicle photos.
2. **AI Analysis**: Gemini identifies vehicle identity and optimal rotation angles.
3. **Background removal**: `rembg` isolates the vehicle from the environment.
4. **Rendering**: Headless NodeJS script generates a 36-frame sprite sheet.
5. **Storage**: Atomic swap of assets in Supabase Storage to prevent visual glitches.

---

## 5. Security & Infrastructure

### 5.1 SUPABASE Integration
- **Auth**: Secure SMS OTP authentication via `send-sms-otp` Edge Function.
- **RLS (Row Level Security)**: Strict database policies ensuring users only see their own bookings.
- **Storage**: Highly available CDN for high-resolution vehicle assets.

### 5.2 Payment & Communications
- **Razorpay**: Direct integration for UPI and Card payments with webhook verification.
- **Twilio/Fast2SMS**: Redundant notification system for OTPs and rental alerts.

---

## 6. Setup & Deployment

### 6.1 Prerequisites
- Node.js 20+
- Python 3.10+
- Supabase CLI

### 6.2 Quick Start
```bash
npm run setup # Install deps & setup venv
# Update .env with API keys
npm run dev   # Start Frontend, Backend, & Supabase
```

### 6.3 Deployment Checklist
1. Configure FAST2SMS_API_KEY in Supabase Secrets.
2. Deploy Edge Functions: `supabase functions deploy`.
3. Apply SQL Migrations: `supabase db push`.
4. Configure Production Environment Variables (Keys for Maps, Razorpay, etc).

---

## 7. Maintenance & Troubleshooting
- **Logs**: Located in `LUXEDIVE/logs/` for individual services.
- **Database**: Port 54321 (Local API) / Port 54323 (Local Studio).
- **Support**: dev@luxedive.com | Internal Support Ticketing System within Admin Panel.

---

*Last Updated: April 17, 2026*
