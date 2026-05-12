const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via Email (Resend)
async function sendEmailOTP(email, otp) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'LUXEDIVE <onboarding@resend.dev>', // Use your domain when ready
      to: [email],
      subject: 'Your LUXEDIVE Login OTP',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border: 1px solid #333; border-radius: 10px; padding: 40px; }
            .logo { text-align: center; margin-bottom: 30px; }
            .logo h1 { color: #FFD700; font-size: 32px; margin: 0; }
            .otp-box { background: #2a2a2a; border: 2px dashed #FFD700; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0; }
            .otp-code { font-size: 48px; font-weight: bold; color: #FFD700; letter-spacing: 8px; }
            .message { color: #999; font-size: 14px; line-height: 1.6; margin: 20px 0; }
            .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <h1>LUXE<span style="color: #fff;">DIVE</span></h1>
            </div>
            
            <p style="font-size: 18px; color: #fff;">Hello,</p>
            <p class="message">
              Your OTP for logging into LUXEDIVE is:
            </p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            
            <p class="message">
              This code is valid for <strong style="color: #FFD700;">10 minutes</strong>.<br>
              Do not share this code with anyone.
            </p>
            
            <p class="message">
              If you didn't request this code, please ignore this email.
            </p>
            
            <div class="footer">
              <p>© 2025 LUXEDIVE - Premium Luxury Car Rentals</p>
              <p>Ahmedabad, Gujarat, India</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('Email sent successfully:', data);
    return { success: true, messageId: data.id };
    
  } catch (error) {
    console.error('Email OTP error:', error);
    return { success: false, error: error.message };
  }
}

module.exports = { generateOTP, sendEmailOTP };
