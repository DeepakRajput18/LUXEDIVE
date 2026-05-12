const axios = require('axios');

/**
 * Generate a 6-digit random OTP
 * @returns {string} 6-digit OTP
 */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send a generic SMS using Fast2SMS bulkV2 API (Quick Route)
 * @param {string} number - 10-digit mobile number
 * @param {string} message - The message content
 */
async function sendSMS(number, message) {
  try {
    const authKey = process.env.FAST2SMS_API_KEY;
    
    if (!authKey || authKey === 'SET_YOUR_FAST2SMS_KEY_HERE') {
      throw new Error('Fast2SMS API Key is missing in .env');
    }

    // Clean number to 10 digits
    const cleanNumber = number.replace(/\D/g, '').slice(-10);

    if (cleanNumber.length !== 10) {
      throw new Error(`Invalid mobile number: ${number}. Must be 10 digits.`);
    }

    const url = 'https://www.fast2sms.com/dev/bulkV2';

    console.log(`📡 Sending [Fast2SMS] to ${cleanNumber}...`);
    
    // Fast2SMS bulkV2 POST structure
    const response = await axios.post(url, {
      route: "q",
      message: message,
      language: "english",
      flash: 0,
      numbers: cleanNumber,
    }, {
      headers: {
        'authorization': authKey,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Fast2SMS Response:', JSON.stringify(response.data));

    if (response.data && response.data.return === true) {
      return { 
        success: true, 
        message: response.data.message?.[0] || 'SMS sent successfully'
      };
    } else {
      const errorMessage = response.data?.message?.[0] || 'Fast2SMS failed to send SMS';
      console.error(`❌ Fast2SMS Failure: ${errorMessage}`);
      return { 
        success: false, 
        error: errorMessage 
      };
    }

  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error('❌ Fast2SMS Service Error:', JSON.stringify(errorData));
    return { 
      success: false, 
      error: typeof errorData === 'object' ? JSON.stringify(errorData) : errorData 
    };
  }
}

/**
 * Send OTP using Fast2SMS
 * @param {string} phone - Mobile number
 * @param {string} otp - The OTP code
 */
async function sendOTP(phone, otp) {
  const message = `Your LUXEDIVE OTP is ${otp}. Do not share this code.`;
  return await sendSMS(phone, message);
}

module.exports = {
  generateOTP,
  sendSMS,
  sendOTP
};
