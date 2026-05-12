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
        const { phone_number, otp_code } = await req.json();

        if (!phone_number || !otp_code) {
            throw new Error('Phone number and OTP are required');
        }

        // Fetch OTP record
        const { data: otpRecord, error: fetchError } = await supabase
            .from('otp_verifications')
            .select('*')
            .eq('phone_number', phone_number)
            .eq('verified', false)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (fetchError || !otpRecord) {
            throw new Error('Invalid or expired OTP');
        }

        // Checks
        if (new Date(otpRecord.expires_at) < new Date()) {
            throw new Error('OTP has expired');
        }

        if (otpRecord.attempts >= 3) {
            throw new Error('Too many failed attempts. Request a new code.');
        }

        if (otpRecord.otp_code !== otp_code) {
            await supabase
                .from('otp_verifications')
                .update({ attempts: otpRecord.attempts + 1 })
                .eq('id', otpRecord.id);
            throw new Error('Invalid OTP code');
        }

        // Success
        await supabase
            .from('otp_verifications')
            .update({ verified: true })
            .eq('id', otpRecord.id);

        return new Response(
            JSON.stringify({ success: true, message: 'Verified successfully' }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );

    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    }
});
