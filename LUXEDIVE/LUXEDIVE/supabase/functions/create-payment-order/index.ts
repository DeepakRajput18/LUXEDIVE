import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Razorpay API helper
async function createRazorpayOrder(amount: number, currency: string, receipt: string, keyId: string, keySecret: string) {
    const authParams = btoa(`${keyId}:${keySecret}`);
    const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authParams}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: Math.round(amount * 100), // Razorpay accepts in paise
            currency: currency,
            receipt: receipt,
            payment_capture: 1
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Razorpay API Error: ${errorData.error?.description || response.statusText}`);
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

        const { booking_id, currency = 'INR' } = await req.json();

        if (!booking_id) {
            throw new Error('Missing require parameter: booking_id');
        }

        // 1. Fetch the new booking details
        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .select('*')
            .eq('id', booking_id)
            .single();

        if (bookingError || !booking) {
            throw new Error('Booking not found');
        }

        if (booking.status !== 'pending') {
            throw new Error(`Booking is in ${booking.status} state, cannot create payment order`);
        }

        // 2. Calculate Grand Total (Rent + Deposit)
        // Note: bookings table stores total_amount as decimal(10,2) and security_deposit_amount as integer
        const bookingAmount = parseFloat(booking.total_amount);
        const depositAmount = parseFloat(booking.security_deposit_amount);
        const grandTotal = bookingAmount + depositAmount;

        // 3. Create Razorpay Order
        const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID');
        const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET');

        if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
            throw new Error('Razorpay keys not configured in Edge Function environments');
        }

        const orderData = await createRazorpayOrder(grandTotal, currency, booking.booking_code, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);
        const razorpayOrderId = orderData.id;

        // 4. Create initial Payment Record using the NEW schema
        const { data: paymentRecord, error: paymentError } = await supabase
            .from('payments')
            .insert([{
                user_id: booking.user_id,
                booking_id: booking_id,
                booking_amount: bookingAmount,
                deposit_amount: depositAmount,
                total_amount: grandTotal,
                razorpay_order_id: razorpayOrderId,
                payment_status: 'pending'
            }])
            .select()
            .single();

        if (paymentError) {
            throw new Error(`Failed to create payment record: ${paymentError.message}`);
        }

        // 5. Update Booking status to payment_initiated and link the Razorpay order ID
        await supabase
            .from('bookings')
            .update({ 
                status: 'payment_initiated',
                razorpay_order_id: razorpayOrderId,
                payment_id: paymentRecord.id
            })
            .eq('id', booking_id);

        // 6. Log the activity 
        await supabase.from('booking_timeline').insert([{
            booking_id: booking_id,
            event_type: 'payment_initiated',
            event_description: `Payment order of ₹${grandTotal} initiated (Order: ${razorpayOrderId})`,
            created_by: booking.user_id
        }]);

        return new Response(
            JSON.stringify({
                success: true,
                razorpay_order_id: razorpayOrderId,
                amount: grandTotal,
                currency: currency,
                booking_id: booking_id,
                payment_id: paymentRecord.id,
                razorpay_key_id: RAZORPAY_KEY_ID // Share key ID with frontend
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('Create Payment Order Error:', error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }
});
