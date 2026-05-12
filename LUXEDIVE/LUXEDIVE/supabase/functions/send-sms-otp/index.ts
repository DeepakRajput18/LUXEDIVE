// @ts-nocheck
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { sendFast2SMS } from '../_shared/fast2sms.ts';

const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Generate 6-digit OTP
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

serve(async (req) => {
    // CORS headers
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            }
        })
    }

    try {
        const { phone } = await req.json();

        if (!phone) {
            return new Response(
                JSON.stringify({ error: 'Phone number is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
            );
        }

        // Clean and validate Indian mobile number
        const cleanPhone = phone.replace(/^\+91/, '').replace(/\s+/g, '').replace(/\D/g, '').slice(-10);
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!phoneRegex.test(cleanPhone)) {
            return new Response(
                JSON.stringify({ error: 'Invalid Indian mobile number' }),
                { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
            );
        }

        // Generate OTP
        const otpCode = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Delete old OTPs
        await supabase
            .from('otp_verifications')
            .delete()
            .eq('phone_number', cleanPhone);

        // Store OTP
        const { error: dbError } = await supabase
            .from('otp_verifications')
            .insert({
                phone_number: cleanPhone,
                otp_code: otpCode,
                expires_at: expiresAt.toISOString()
            });

        if (dbError) throw dbError;

        // Send SMS via Shared Utility
        const message = `Your LUXEDIVE OTP is ${otpCode}. Do not share this code.`;
        const smsResult = await sendFast2SMS(cleanPhone, message);

        if (!smsResult.success) {
            console.warn(`⚠️ SMS delivery check failed: ${smsResult.error}`);
            // We still return success if the DB insert worked, but log the SMS failure
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: 'OTP sent successfully',
                expires_in: 600
            }),
            { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );

    } catch (error: unknown) {
        console.error('Send OTP error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP';
        return new Response(
            JSON.stringify({ error: errorMessage }),
            { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
    }
});
