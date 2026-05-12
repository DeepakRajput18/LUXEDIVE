# LUXEDIVE - Complete Setup Guide

This guide will help you set up and run the LUXEDIVE luxury car rental website on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)
- A **Supabase account** - [Sign up](https://supabase.com/)

## 🗂️ Project Structure

```
LUXEDIVE/
├── LUXEDIVE/               # Main application directory
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   ├── supabase/          # Backend functions
│   ├── .env.local         # Environment variables (important!)
│   └── package.json       # Project dependencies
├── frontend_design.md     # UI/UX specifications
├── frontend_blueprint.md  # Architecture documentation
└── newprd2.md            # Product requirements
```

## 🚀 Quick Start

### Step 1: Navigate to Project Directory

```bash
cd c:\Users\deepa\Desktop\LUXEDIVE\LUXEDIVE
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React 19.2.0
- Supabase client
- React Router
- TailwindCSS
- Google Maps API
- And more...

### Step 3: Configure Environment Variables

The `.env.local` file is already present in the project. You need to update it with your actual credentials:

#### Required API Keys:

1. **Supabase** (Already configured)
   - URL: `https://txxguqcuirkcvtfbcgak.supabase.co`
   - Anon Key: Already set ✅

2. **Google Maps API Key** (Required for location features)
   - Get from: [Google Cloud Console](https://console.cloud.google.com/)
   - Replace `AIzaSyXXXXXXXXXXXXXXXXXXX` with your actual key
   - Enable: Maps JavaScript API, Places API, Geocoding API

3. **Razorpay** (Required for payments)
   - Get from: [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Replace `rzp_test_XXXXXXXXXX` with your test key

4. **Twilio** (Optional, for WhatsApp integration)
   - Get from: [Twilio Console](https://www.twilio.com/console)
   - Update the TWILIO_* variables with your credentials

#### Edit `.env.local`:

```env
VITE_SUPABASE_URL=https://txxguqcuirkcvtfbcgak.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eGd1cWN1aXJrY3Z0ZmJjZ2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODk1NDMsImV4cCI6MjA4NDY2NTU0M30.YQxb99PYyhQjHU-yQEng9RD_vS_e11kB4QUeCbhvRaQ
VITE_RAZORPAY_KEY_ID=your_actual_razorpay_key
VITE_GOOGLE_MAPS_API_KEY=your_actual_google_maps_key
GOOGLE_VISION_API_KEY=your_actual_vision_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### Step 4: Set Up Supabase Backend

Your Supabase project should already have the schema configured. If not, you need to apply the migration files:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the migration files located at:
   - `c:\Users\deepa\Desktop\LUXEDIVE\comprehensive_security_fix.sql`
   - `c:\Users\deepa\Desktop\LUXEDIVE\final_security_remediation.sql`

### Step 5: Run the Development Server

```bash
npm run dev
```

The application will start on: **http://localhost:5173**

## 🎯 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint for code quality

## 🔧 Troubleshooting

### Issue: Dependencies not installing

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 5173 already in use

**Solution:**
```bash
# Kill the process or use a different port
npm run dev -- --port 3000
```

### Issue: Environment variables not loading

**Solution:**
- Ensure `.env.local` is in the `LUXEDIVE/LUXEDIVE/` directory
- Restart the dev server after changing `.env.local`
- Check that variable names start with `VITE_` for client-side access

### Issue: Google Maps not loading

**Solution:**
- Verify your Google Maps API key is valid
- Check that billing is enabled on your Google Cloud project
- Enable required APIs: Maps JavaScript API, Places API, Geocoding API

### Issue: Supabase connection errors

**Solution:**
- Verify your Supabase project is active
- Check that RLS (Row Level Security) policies are configured
- Ensure your IP is not blocked in Supabase settings

## 📱 Features

The LUXEDIVE website includes:

- ✅ User Authentication (Sign up, Sign in, OTP verification)
- ✅ Car Rental Booking System
- ✅ Elite Booking with Address Verification
- ✅ Wedding Collections & Packages
- ✅ Customer Dashboard
- ✅ Payment Integration (Razorpay)
- ✅ Google Maps Integration
- ✅ Admin Panel
- ✅ Fleet Management
- ✅ Chauffeur Directory
- ✅ Corporate Events Booking
- ✅ FAQ & Support

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors
2. Review the Supabase logs in your dashboard
3. Ensure all environment variables are correctly set
4. Verify your internet connection

## 🔐 Security Notes

> [!WARNING]
> **Never commit `.env.local` to version control!**

The `.env.local` file contains sensitive credentials. Ensure it's listed in `.gitignore`.

## 🚢 Deployment

For production deployment:

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - Vercel (recommended)
   - Netlify
   - AWS Amplify
   - GitHub Pages

3. **Set environment variables** in your hosting platform's dashboard

## 📚 Additional Documentation

- [Frontend Design Specifications](file:///c:/Users/deepa/Desktop/LUXEDIVE/frontend_design.md)
- [Architecture Blueprint](file:///c:/Users/deepa/Desktop/LUXEDIVE/frontend_blueprint.md)
- [Product Requirements](file:///c:/Users/deepa/Desktop/LUXEDIVE/newprd2.md)

---

## ⚡ Quick Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

**Last Updated:** February 6, 2026

**Version:** 1.0.0

**Status:** Ready for Development 🚀
