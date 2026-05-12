import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Webhooks don't strictly need CORS if only called by Gateway, but good practice
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function verifyRazorpayWebhookSignature(bodyText: string, signature: string, secret: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(bodyText);
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
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Webhooks send the raw body, which we need for signature verification
        const bodyText = await req.text();
        const signature = req.headers.get('x-razorpay-signature');

        let webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET'); // Best practice to have a separate webhook secret
        if (!webhookSecret) {
            // Fallback to key secret if specifically configured that way, though webhook secret is separate in Razorpay dashboard
            webhookSecret = Deno.env.get('RAZORPAY_KEY_SECRET');
        }

        if (!signature || !webhookSecret) {
            return new Response('Missing signature or secret', { status: 401 });
        }

        const isValid = await verifyRazorpayWebhookSignature(bodyText, signature, webhookSecret);
        if (!isValid) {
            console.error('Webhook signature verification failed');
            return new Response('Invalid signature', { status: 401 });
        }

        const payload = JSON.parse(bodyText);
        const event = payload.event;
        const paymentEntity = payload.payload.payment.entity;
        const orderId = paymentEntity.order_id;
        const paymentId = paymentEntity.id;

        console.log(`Received secure webhook event: ${event} for order ${orderId}`);

        // Handle Events
        if (event === 'payment.captured' || event === 'payment.authorized') {
            const { data: currentPayment } = await supabase
                .from('payments')
                .select('id, status, booking_id, user_id')
                .eq('order_id', orderId)
                .single();

            if (currentPayment && currentPayment.status !== 'successful') {
                await supabase
                    .from('payments')
                    .update({ status: 'successful', payment_id: paymentId })
                    .eq('id', currentPayment.id);

                await supabase
                    .from('bookings')
                    .update({ status: 'confirmed' })
                    .eq('id', currentPayment.booking_id);

                await supabase.from('activity_logs').insert([{
                    user_id: currentPayment.user_id,
                    action_type: 'payment_success',
                    target_id: currentPayment.id,
                    details: { booking_id: currentPayment.booking_id, gateway: 'razorpay', source: 'webhook' },
                    ip_address: req.headers.get('x-forwarded-for') || 'unknown'
                }]);
            }
        }
        else if (event === 'payment.failed') {
            const { data: currentPayment } = await supabase
                .from('payments')
                .select('id, status, booking_id, user_id')
                .eq('order_id', orderId)
                .single();

            if (currentPayment && currentPayment.status !== 'successful') {
                await supabase
                    .from('payments')
                    .update({ status: 'failed', payment_id: paymentId })
                    .eq('id', currentPayment.id);

                await supabase
                    .from('bookings')
                    .update({ status: 'payment_failed' })
                    .eq('id', currentPayment.booking_id);

                await supabase.from('activity_logs').insert([{
                    user_id: currentPayment.user_id,
                    action_type: 'payment_failed',
                    target_id: currentPayment.id,
                    details: { booking_id: currentPayment.booking_id, gateway: 'razorpay', source: 'webhook' },
                    ip_address: req.headers.get('x-forwarded-for') || 'unknown'
                }]);
            }
        }
        else if (event === 'refund.processed') {
            const refundEntity = payload.payload.refund.entity;
            const refundPaymentId = refundEntity.payment_id;

            const { data: payment } = await supabase
                .from('payments')
                .select('id, booking_id, user_id')
                .eq('payment_id', refundPaymentId)
                .single();

            if (payment) {
                // Upsert refund record securely upon webhook receipt
                await supabase
                    .from('refunds')
                    .upsert({
                        gateway_refund_id: refundEntity.id,
                        payment_id: payment.id,
                        booking_id: payment.booking_id,
                        refund_amount: refundEntity.amount / 100, // back to INR
                        status: 'processed'
                    }, { onConflict: 'gateway_refund_id' });

                await supabase
                    .from('payments')
                    .update({ status: 'refunded' })
                    .eq('id', payment.id);

                await supabase
                    .from('bookings')
                    .update({ status: 'cancelled' })
                    .eq('id', payment.booking_id);

                await supabase.from('activity_logs').insert([{
                    user_id: payment.user_id,
                    action_type: 'refund_processed',
                    target_id: payment.id,
                    details: { booking_id: payment.booking_id, gateway: 'razorpay', amount: refundEntity.amount / 100 },
                    ip_address: req.headers.get('x-forwarded-for') || 'unknown'
                }]);
            }
        }

        // Return 200 quickly to acknowledge receipt to Gateway
        return new Response(JSON.stringify({ received: true }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });

    } catch (error: any) {
        console.error('Webhook Error:', error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 400 }
        );
    }
});
