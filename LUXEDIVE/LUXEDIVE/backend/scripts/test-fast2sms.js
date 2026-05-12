const readline = require('readline');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { generateOTP, sendOTP, sendSMS } = require('../services/smsService');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function test() {
    process.env.NODE_ENV = 'development';
    console.log('--- 🧪 Starting Fast2SMS Integration Test (POST / Route Q) ---');
    
    // Test parameters
    const testNumber = '8824342103'; 
    const localOTP = generateOTP(); 
    
    console.log(`📱 Step 1: Testing OTP Send for: ${testNumber}`);
    const otpResult = await sendOTP(testNumber, localOTP);
    console.log('OTP Result:', otpResult.success ? '✅ Success' : '❌ Failed', otpResult.error || '');

    console.log(`\n📱 Step 2: Testing Generic Message Send for: ${testNumber}`);
    const genericMessage = "Test from LUXEDIVE: Your booking is PENDING and will be confirmed within 1 hour.";
    const smsResult = await sendSMS(testNumber, genericMessage);
    console.log('SMS Result:', smsResult.success ? '✅ Success' : '❌ Failed', smsResult.error || '');
    
    if (otpResult.success || smsResult.success) {
        console.log('\n✨ Integration tests completed. If you received the SMS, everything is working!');
    } else {
        console.log('\n❌ Tests failed. Check your FAST2SMS_AUTH_KEY and account status.');
    }

    rl.close();
}

test();
