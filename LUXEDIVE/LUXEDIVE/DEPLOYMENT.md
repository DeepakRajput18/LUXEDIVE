# DEPLOYMENT CHECKLIST 🚀

## ⚙️ Step 1: Configure Fast2SMS Secrets

**Required Environment Variables:**

Add this to **Supabase Dashboard** → **Project Settings** → **Edge Functions** → **Secrets**:

```ini
FAST2SMS_API_KEY=your_fast2sms_api_key_here
```

### How to Get This:
1. Go to [https://www.fast2sms.com](https://www.fast2sms.com)
2. Sign up / Log in
3. **Dev API** → Get **Authorization** (This is your API Key)
4. Ensure you have balance in your wallet (Bulk SMS -> Quick SMS route)

---

## 🚀 Step 2: Deploy Edge Functions

Run these commands in your terminal:

```bash
# Deploy SMS OTP functions
supabase functions deploy send-sms-otp
supabase functions deploy verify-sms-otp

# Verify deployment
supabase functions list
```

**Expected Output:**
- ✅ `send-sms-otp` (deployed)
- ✅ `verify-sms-otp` (deployed)

---

## 🧪 Step 3: Test OTP Flow

### Manual Testing:

1. **Start Dev Server:**
   ```bash
   npm run dev
   ```

2. **Navigate to Signup:**
   Go to [http://localhost:5173/signup](http://localhost:5173/signup)

3. **Fill Form:**
   - **Name:** Test User
   - **Email:** test@example.com
   - **Phone:** 8824342103 (10 digits, Indian format)
   - **Password:** Thala@07

4. **Click "Continue":**
   - Should trigger SMS send
   - Check your phone for SMS (2-5 seconds delay)
   - Check console logs if SMS doesn't arrive

5. **Enter OTP:**
   - Type the 6-digit code from SMS
   - Click "Verify & Create Account"

6. **Verify Success:**
   - Should redirect to `/dashboard`
   - User should be logged in
   - Check Supabase Auth dashboard for new user

---

## 🐛 Step 4: Troubleshooting

### SMS Not Received?

1. **Check Edge Function Logs:**
   ```bash
   supabase functions logs send-sms-otp --tail
   ```

2. **Check Database:**
   Go to Supabase SQL Editor and run:
   ```sql
   SELECT * FROM otp_verifications 
   ORDER BY created_at DESC 
   LIMIT 5;
   ```
   - Verify OTP was stored
   - Check `otp_code` value

3. **Test Fast2SMS Directly:**
   ```bash
   curl -X POST https://www.fast2sms.com/dev/bulkV2 \
     -H "authorization: YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "route": "q",
       "message": "Test OTP: 123456",
       "numbers": "918824342103"
     }'
   ```

### Common Issues:
- ❌ **Wrong API Key** → Check Fast2SMS dashboard
- ❌ **Insufficient wallet balance** → Top up Fast2SMS wallet
- ❌ **Phone number format** → Must be 10 digits
- ❌ **Route Issue** → Ensure "Quick SMS" (route q) is used

---

## 🔐 SECURITY NOTES

### Production Checklist:
- ✅ **OTP expiry:** 10 minutes
- ✅ **Max attempts:** 3 per OTP
- ✅ **Phone number validation:** Regex for Indian mobile numbers
- ✅ **Password strength:** 8+ characters required
- ✅ **Secure token storage:** Handled by Supabase Auth (httpOnly cookies recommended for SSR, local storage for SPA)

### ⚠️ Recommended Enhancements:
- [ ] Add CAPTCHA on signup (prevent spam)
- [ ] Rate limit signup endpoint (prevent abuse)
- [ ] Enable Supabase RLS policies (row-level security) for all tables
- [ ] Add email verification (in addition to phone)
- [ ] Implement 2FA for sensitive actions

---

## 💰 COST ESTIMATE

### Fast2SMS Pricing:
- **SMS:** ₹0.25 per message (Quick SMS route)
- **1000 OTPs/month:** ₹250
- *Very affordable & no template approval needed for Quick SMS*

### Supabase:
- **Free tier:** 50,000 monthly active users
- **Paid tier:** $25/month (unlimited)

### Total Estimated Monthly Cost (1000 users):
- **Fast2SMS:** ~₹250 ($3.00)
- **Supabase:** $0 (free tier)
- **Total:** ~₹250/month ($3.00)

---

## 📞 SUPPORT & DOCUMENTATION

### Fast2SMS Support:
- **Docs:** [https://www.fast2sms.com/dev/bulkV2](https://www.fast2sms.com/dev/bulkV2)
- **Dashboard:** [https://www.fast2sms.com/dashboard/](https://www.fast2sms.com/dashboard/)

### Supabase Support:
- **Docs:** [https://supabase.com/docs](https://supabase.com/docs)
- **Discord:** [https://discord.supabase.com](https://discord.supabase.com)
- **Dashboard:** [https://app.supabase.com](https://app.supabase.com)

### LUXEDIVE Codebase:
- **Frontend Services:** `src/services/`
- **Frontend Components:** `src/components/`
- **Edge Functions:** `supabase/functions/`
