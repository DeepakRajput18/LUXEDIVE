import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendFast2SMS } from "../_shared/fast2sms.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Razorpay Refund API helper
async function createRazorpayRefund(paymentId: string, amount: number, keyId: string, keySecret: string) {
    const authParams = btoa(`${keyId}:${keySecret}`);
    const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}/refund`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authParams}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: Math.round(amount * 100), // Razorpay accepts in paise
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Razorpay Refund Error: ${errorData.error?.description || response.statusText}`);
    }
    return await response.json();
}

serve(async (req) => {
    // Handle CORS preflight
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

        // Verify Admin Authorization securely using the user's JWT token
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            throw new Error('Missing Authorization header');
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
        if (authError || !user) {
            throw new Error('Invalid token');
        }

        // Extremely strict Admin Check (you could query a roles table here instead)
        if (user.email !== 'admin@luxedive.com') {
            throw new Error('Unauthorized. Only admins can process refunds.');
        }

        const { payment_id, amount, reason } = await req.json();

        if (!payment_id) {
            throw new Error('Missing require parameter: payment_id');
        }

        // 1. Fetch Payment Record (Join with users to get phone number)
        const { data: payment, error: paymentError } = await supabase
            .from('payments')
            .select('*, users!inner(phone_number)')
            .eq('id', payment_id)
            .single();

        if (paymentError || !payment) {
            throw new Error('Payment record not found');
        }

        if (payment.status !== 'successful' && payment.status !== 'confirmed') {
            throw new Error(`Cannot refund a payment with status: ${payment.status}`);
        }

        const refundAmount = amount || payment.amount; // Full refund if not specified

        // 2. Determine Gateway and Create Refund
        let refundData: any = null;

        if (payment.gateway === 'razorpay') {
            let keyId = Deno.env.get('RAZORPAY_KEY_ID');
            let keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

            if (!keyId || !keySecret) {
                const { data: dbGateway } = await supabase
                    .from('payment_gateways')
                    .select('*')
                    .eq('gateway_name', 'razorpay')
                    .single();

                keyId = dbGateway?.public_key;
                keySecret = dbGateway?.secret_key;
            }

            if (!keyId || !keySecret) {
                throw new Error('Razorpay keys not configured');
            }

            refundData = await createRazorpayRefund(payment.payment_id, refundAmount, keyId, keySecret);

        } else if (payment.gateway === 'stripe') {
            throw new Error('Stripe refund not yet implemented');
        } else {
            throw new Error('Unsupported gateway');
        }

        // 3. Create Refund Record
        const { error: refundError } = await supabase
            .from('refunds')
            .insert([{
                payment_id: payment.id,
                booking_id: payment.booking_id,
                refund_amount: refundAmount,
                status: 'processed',
                reason: reason || 'Admin initiated refund',
                gateway_refund_id: refundData.id
            }]);

        if (refundError) {
            throw new Error(`Failed to create refund record: ${refundError.message}`);
        }

        // 4. Update Payment and Booking status
        await supabase
            .from('payments')
            .update({ status: 'refunded' })
            .eq('id', payment.id);

        await supabase
            .from('bookings')
            .update({ status: 'cancelled' })
            .eq('id', payment.booking_id);

        // 5. Send Refund Confirmation SMS
        if (payment.users?.phone_number) {
            try {
                const refundMsg = `Refund Processed! Your refund of ₹${refundAmount} for LUXEDIVE Booking #${payment.booking_id.slice(-6).toUpperCase()} has been initiated. It may take 5-7 days to reflect in your account.`;
                await sendFast2SMS(payment.users.phone_number, refundMsg);
            } catch (smsErr) {
                console.error('⚠️ Refund SMS failed:', smsErr);
            }
        }

        // 6. Log activity
        await supabase.from('activity_logs').insert([{
            user_id: user.id, // Admin who initiated refund
            action_type: 'refund_processed',
            target_id: refundData.id,
            details: { booking_id: payment.booking_id, payment_id: payment.id, amount: refundAmount, reason },
            ip_address: req.headers.get('x-forwarded-for') || 'unknown'
        }]);

        return new Response(
            JSON.stringify({
                success: true,
                refund_id: refundData.id,
                amount: refundAmount
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('Process Refund Error:', error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }
});
