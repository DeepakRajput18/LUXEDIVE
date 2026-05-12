// @ts-nocheck
// Disables the local React TypeScript compiler from checking this Deno Edge Function,
// which prevents valid Deno imports (like https://) and globals from being flagged as red errors in the editor.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            }
        })
    }

    try {
        const { phone, otp } = await req.json();

        if (!phone || !otp) {
            return new Response(
                JSON.stringify({ error: 'Phone and OTP required' }),
                { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
            );
        }

        // Clean phone to match storage
        const cleanPhone = phone.replace(/^\+91/, '').replace(/\s+/g, '');

        // Get OTP record
        const { data: otpRecord, error: fetchError } = await supabase
            .from('otp_verifications')
            .select('*')
            .eq('phone_number', cleanPhone)
            .eq('verified', false)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (fetchError || !otpRecord) {
            return new Response(
                JSON.stringify({ error: 'No OTP found for this number' }),
                { status: 404, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
            );
        }

        // Check expiry
        if (new Date(otpRecord.expires_at) < new Date()) {
            return new Response(
                JSON.stringify({ error: 'OTP expired' }),
                { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
            );
        }

        // Check attempts
        if (otpRecord.attempts >= 3) {
            return new Response(
                JSON.stringify({ error: 'Too many attempts' }),
                { status: 429, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
            );
        }

        // Verify OTP
        if (otpRecord.otp_code !== otp) {
            await supabase
                .from('otp_verifications')
                .update({ attempts: otpRecord.attempts + 1 })
                .eq('id', otpRecord.id);

            return new Response(
                JSON.stringify({
                    error: 'Invalid OTP',
                    attempts_remaining: 2 - otpRecord.attempts
                }),
                { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
            );
        }

        // Mark as verified
        await supabase
            .from('otp_verifications')
            .update({ verified: true })
            .eq('id', otpRecord.id);

        return new Response(
            JSON.stringify({ success: true, message: 'Verified' }),
            { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );

    } catch (error: unknown) {
        console.error('Verify error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return new Response(
            JSON.stringify({ error: errorMessage }),
            { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
    }
});
