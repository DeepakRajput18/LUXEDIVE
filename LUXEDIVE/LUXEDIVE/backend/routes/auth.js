const express = require('express');
const { supabase } = require('../config/supabase');
const { sendEmailOTP } = require('../services/emailOTP');
const { generateOTP, sendOTP } = require('../services/smsService');

const router = express.Router();

// Send OTP (Email or SMS)
router.post('/send-otp', async (req, res) => {
  try {
    const { identifier, type } = req.body; // identifier = email or phone, type = 'email' or 'sms'
    console.log(`\n--- 📩 New OTP Request: ${type} to ${identifier} ---`);

    if (!identifier || !type) {
      console.error('❌ Missing identifier or type');
      return res.status(400).json({
        success: false,
        error: 'Identifier and type are required'
      });
    }

    // Generate 6-digit OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log(`📝 Attempting to store OTP in database for ${identifier}...`);
    
    // Save OTP to database
    const { data: otpRecord, error: dbError } = await supabase
      .from('otp_verifications')
      .insert({
        identifier: identifier,
        otp_code: otp,
        otp_type: type,
        purpose: 'login',
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single();

    if (dbError) {
      console.error('❌ Database insertion failed:', dbError.message, dbError.details || '');
      return res.status(500).json({
        success: false,
        error: `Failed to store OTP: ${dbError.message}`
      });
    }

    console.log('✅ OTP stored successfully in database.');

    // Send OTP based on type
    let sendResult;
    
    if (type === 'email') {
      console.log(`📧 Sending Email OTP to ${identifier}...`);
      sendResult = await sendEmailOTP(identifier, otp);
    } else if (type === 'sms') {
      console.log(`📱 Sending OTP via Fast2SMS to ${identifier}...`);
      sendResult = await sendOTP(identifier, otp);
    }

    if (!sendResult.success) {
      console.error(`❌ Send failure: ${sendResult.error}`);
      return res.status(500).json({
        success: false,
        error: `Failed to send OTP: ${sendResult.error}`
      });
    }

    console.log(`✨ OTP process complete for ${identifier}`);

    // FOR DEVELOPMENT: Log OTP (REMOVE IN PRODUCTION)
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔐 Dev Log: OTP for ${identifier}: ${otp}`);
    }

    res.json({
      success: true,
      message: `OTP sent successfully to ${type === 'email' ? 'email' : 'phone'}`,
      expiresAt: expiresAt.toISOString(),
      // REMOVE IN PRODUCTION:
      devOTP: process.env.NODE_ENV === 'development' ? otp : undefined
    });

  } catch (error) {
    console.error('❌ Critical Send OTP error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Identifier and OTP are required'
      });
    }

    // Get latest unverified OTP record from database
    const { data: otpRecord, error: fetchError } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('identifier', identifier)
      .eq('is_verified', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !otpRecord) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired OTP'
      });
    }

    // Verification Logic depends on type
    if (otpRecord.otp_type === 'sms' || otpRecord.otp_type === 'email') {
      // Both SMS (Campaign) and Email use local database verification
      if (otpRecord.otp_code !== otp) {
        return res.status(400).json({
          success: false,
          error: 'Invalid OTP'
        });
      }

      // Check expiration
      if (new Date(otpRecord.expires_at) < new Date()) {
        return res.status(400).json({
          success: false,
          error: 'OTP has expired'
        });
      }

      // Check attempts (max 5)
      if (otpRecord.attempts >= 5) {
        return res.status(400).json({
          success: false,
          error: 'Too many attempts. Please request a new OTP'
        });
      }
    }

    // Mark OTP as verified (for both types)
    await supabase
      .from('otp_verifications')
      .update({
        is_verified: true,
        verified_at: new Date().toISOString()
      })
      .eq('id', otpRecord.id);

    res.json({
      success: true,
      message: 'OTP verified successfully',
      identifier: identifier,
      type: otpRecord.otp_type
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { identifier, type } = req.body;

    // Check if last OTP was sent within 60 seconds
    const { data: recentOTP } = await supabase
      .from('otp_verifications')
      .select('created_at')
      .eq('identifier', identifier)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (recentOTP) {
      const timeSince = Date.now() - new Date(recentOTP.created_at).getTime();
      if (timeSince < 60000) { // 60 seconds
        return res.status(429).json({
          success: false,
          error: 'Please wait before requesting a new OTP',
          waitTime: Math.ceil((60000 - timeSince) / 1000)
        });
      }
    }

    // Generate and send new OTP (same as /send-otp)
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await supabase
      .from('otp_verifications')
      .insert({
        identifier: identifier,
        otp_code: otp,
        otp_type: type,
        purpose: 'login',
        expires_at: expiresAt.toISOString()
      });

    let sendResult;
    if (type === 'email') {
      sendResult = await sendEmailOTP(identifier, otp);
    } else {
      sendResult = await sendOTP(identifier, otp);
    }

    if (!sendResult.success) {
      return res.status(500).json({
        success: false,
        error: `Failed to resend OTP: ${sendResult.error}`
      });
    }

    console.log(`🔐 RESENT OTP for ${identifier}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP resent successfully',
      expiresAt: expiresAt.toISOString()
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
