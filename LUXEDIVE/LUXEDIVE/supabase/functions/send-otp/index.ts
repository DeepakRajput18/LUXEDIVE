// @ts-nocheck
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { sendFast2SMS } from '../_shared/fast2sms.ts';

const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
const TWILIO_PHONE_NUMBER = Deno.env.get('TWILIO_PHONE_NUMBER');

const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Generate 6-digit OTP
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Fallback: Send SMS via Twilio
async function sendViaTwilio(phone: string, otpCode: string) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
    const message = `Your LUXEDIVE verification code is: ${otpCode}`;

    const body = new URLSearchParams();
    body.append('To', phone.startsWith('+') ? phone : `+91${phone}`);
    body.append('From', TWILIO_PHONE_NUMBER!);
    body.append('Body', message);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Twilio error: ${error}`);
    }
}

serve(async (req) => {
    // CORS headers
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            }
        });
    }

    try {
        const { phone, email, type = 'sms' } = await req.json();

        if (type === 'sms' && !phone) throw new Error('Phone number required');
        if (type === 'email' && !email) throw new Error('Email required');

        const otpCode = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // 1. Store OTP
        const identifier = type === 'sms' ? phone.replace(/\D/g, '').slice(-10) : email;
        
        await supabase.from('otp_verifications').delete().eq('phone_number', identifier).eq('email', identifier);
        
        const { error: dbError } = await supabase.from('otp_verifications').insert({
            phone_number: type === 'sms' ? identifier : null,
            email: type === 'email' ? identifier : null,
            otp_code: otpCode,
            expires_at: expiresAt.toISOString()
        });

        if (dbError) throw dbError;

        let smsProvider = 'none';

        // 2. Send SMS
        if (type === 'sms') {
            const cleanPhone = identifier;

            // Try Fast2SMS first (Primary)
            const fast2smsResult = await sendFast2SMS(cleanPhone, `Your LUXEDIVE OTP is ${otpCode}. Do not share this code.`);
            
            if (fast2smsResult.success) {
                smsProvider = 'fast2sms';
                console.log(`✅ OTP sent via Fast2SMS to ${cleanPhone}`);
            } else {
                console.error('❌ Fast2SMS failed, trying Twilio:', fast2smsResult.error);
                
                // Fallback to Twilio
                if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
                    try {
                        await sendViaTwilio(cleanPhone, otpCode);
                        smsProvider = 'twilio';
                        console.log(`✅ OTP sent via Twilio to ${cleanPhone}`);
                    } catch (twErr) {
                        console.error('❌ Twilio also failed:', twErr);
                    }
                }
            }
        }

        return new Response(
            JSON.stringify({ 
                success: true, 
                provider: type === 'sms' ? smsProvider : 'email',
                message: 'OTP initiated' 
            }),
            { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );

    } catch (error: any) {
        console.error('Send OTP Main Error:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
    }
});
