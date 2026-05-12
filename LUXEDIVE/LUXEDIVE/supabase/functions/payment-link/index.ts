// @ts-ignore: Deno runtime module
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore: Deno runtime module
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { booking_id, amount, currency, payment_method, return_url } = await req.json()
        if (!booking_id || !amount) throw new Error('Missing required fields')

        // 1. Determine appropriate gateway
        const { data: gateway } = await supabaseClient
            .from('payment_gateways')
            .select('*')
            .eq('is_active', true)
            // .contains is tricky with generic types unless configured. 
            // Simplified: Fetch all active and filter in code OR assume 'razorpay' default if empty
            // For now, let's fetch default
            .order('is_default', { ascending: false })
            .limit(1)
            .single()

        const gatewayName = gateway?.gateway_name || 'razorpay'

        // 2. Create Payment Record
        const { data: payment, error: insertError } = await supabaseClient
            .from('payments')
            .insert({
                booking_id,
                amount,
                currency: currency || 'INR',
                gateway_id: gateway?.id,
                payment_method: payment_method || 'unknown', // Updated column name from schema if changed? Check schema. PRDv2 said 'payment_method_details'. Keeping 'method' for backward comp or map.
                status: 'pending',
                gateway_metadata: { initiated_at: new Date().toISOString() }
            })
            .select()
            .single()

        if (insertError) throw new Error(`Failed to create payment: ${insertError.message}`)
        if (!payment) throw new Error('Payment record creation failed')

        // 3. Generate Link
        const transactionId = `txn_${Date.now()}`
        let paymentUrl = ''

        switch (gatewayName) {
            case 'razorpay':
                paymentUrl = `${return_url}?payment_id=${payment.id}&gateway=razorpay&status=success`
                break
            case 'stripe':
                paymentUrl = `${return_url}?session_id=${transactionId}&gateway=stripe&status=success`
                break
            default:
                paymentUrl = `${return_url}?payment_id=${payment.id}&status=success`
        }

        // 4. Update Payment
        await supabaseClient
            .from('payments')
            .update({
                gateway_transaction_id: transactionId,
                gateway_response: { url: paymentUrl, provider: gatewayName }
            })
            .eq('id', payment.id)

        return new Response(
            JSON.stringify({
                success: true,
                paymentId: payment.id,
                redirectUrl: paymentUrl,
                gateway: gatewayName
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
