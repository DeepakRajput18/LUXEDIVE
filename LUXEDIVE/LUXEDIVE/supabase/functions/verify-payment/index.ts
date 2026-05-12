// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendFast2SMS } from "../_shared/fast2sms.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// HMAC SHA256 Verification specific to Deno
async function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string, secret: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(orderId + "|" + paymentId);
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
    const signatureHex = Array.from(new Uint8Array(signatureBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    return signatureHex === signature;
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase configuration missing');
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            payment_record_id
        } = await req.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !payment_record_id) {
            throw new Error('Missing require parameters for Razorpay verification');
        }

        // 1. Verify Signature
        const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');

        if (!RAZORPAY_KEY_SECRET) {
            throw new Error('Razorpay secret key not configured in Edge Function');
        }

        const isValid = await verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature, RAZORPAY_KEY_SECRET);

        if (!isValid) {
            await supabase
                .from('payments')
                .update({ payment_status: 'failed' })
                .eq('id', payment_record_id);

            throw new Error('Invalid payment signature. Payment verification failed.');
        }

        // 2. Verified Success -> Update Payment record
        const { data: paymentData, error: paymentError } = await supabase
            .from('payments')
            .update({
                payment_status: 'success',
                razorpay_payment_id: razorpay_payment_id,
                razorpay_signature: razorpay_signature,
                completed_at: new Date().toISOString()
            })
            .eq('id', payment_record_id)
            .select()
            .single();

        if (paymentError || !paymentData) {
            throw new Error(`Failed to update payment record: ${paymentError?.message}`);
        }

        // 3. Update Booking Status -> payment_completed
        const { error: bookingError } = await supabase
            .from('bookings')
            .update({
                status: 'pending_approval',
                razorpay_payment_id: razorpay_payment_id,
                deposit_status: 'held',
                documents_status: 'not_uploaded'
            })
            .eq('id', paymentData.booking_id);

        if (bookingError) {
            throw new Error(`Failed to confirm booking: ${bookingError.message}`);
        }

        // 4. Log successful timeline event
        await supabase.from('booking_timeline').insert([{
            booking_id: paymentData.booking_id,
            event_type: 'payment_success',
            event_description: `Payment verified successfully. Booking moved to pending_approval state for admin review. (Payment ID: ${razorpay_payment_id})`,
            created_by: paymentData.user_id
        }]);

        // 5. Send Pending SMS Confirmation via Fast2SMS
        try {
            const { data: userProfile } = await supabase
                .from('users')
                .select('phone_number')
                .eq('id', paymentData.user_id)
                .single();

            if (userProfile?.phone_number) {
                const bookingRef = paymentData.booking_id.slice(-6).toUpperCase();
                const pendingMessage = `Payment Received! Your LUXEDIVE booking #${bookingRef} is currently PENDING. We will confirm your status within 1 hour. If we cannot confirm, you will receive a full refund.`;
                
                await sendFast2SMS(userProfile.phone_number, pendingMessage);
            }
        } catch (smsError) {
            console.error('⚠️ Post-payment SMS trigger failed:', smsError);
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Payment verified successfully",
                booking_id: paymentData.booking_id
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('Verify Payment Error:', error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }
});
