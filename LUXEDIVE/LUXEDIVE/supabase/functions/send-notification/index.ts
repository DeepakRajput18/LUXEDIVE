// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { sendFast2SMS } from "../_shared/fast2sms.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { user_id, type, title, body, action_url } = await req.json()

        // 1. Initialize Client
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 2. Get User Preferences
        const { data: prefs } = await supabaseClient
            .from('notification_preferences')
            .select('*')
            .eq('user_id', user_id)
            .single()

        // Default: All enabled if no prefs
        const userPrefs = prefs || {
            email_enabled: true, sms_enabled: true, push_enabled: false,
            [`${type}_notifications`]: { email: true, sms: true, push: false }
        }

        // 3. Get User Contact Info
        const { data: user } = await supabaseClient
            .from('users')
            .select('email, phone_number')
            .eq('id', user_id)
            .single()

        if (!user) throw new Error('User not found')

        // 4. Create Notification Record
        const { data: notification } = await supabaseClient
            .from('notifications')
            .insert({
                user_id,
                type,
                title,
                body,
                data: { action_url }
            })
            .select()
            .single()

        // 5. Determine Channels
        const typePrefs = userPrefs[`${type}_notifications`] || { email: true, sms: true }
        const channels = {
            email: userPrefs.email_enabled && typePrefs.email,
            sms: userPrefs.sms_enabled && typePrefs.sms
        }

        const deliveryPromises = []
        const results: Record<string, string> = {}

        // Email Channel
        if (channels.email && user.email) {
            console.log(`[Email] To: ${user.email} | Subject: ${title}`)
            deliveryPromises.push(
                supabaseClient.from('notification_deliveries').insert({
                    notification_id: notification?.id,
                    channel: 'email',
                    recipient: user.email,
                    status: 'sent',
                    provider_response: { mock: true }
                })
            )
            results.email = 'sent'
        }

        // SMS Channel (using Shared Fast2SMS)
        if (channels.sms && user.phone_number) {
            console.log(`[SMS] To: ${user.phone_number} | Body: ${body}`)
            
            const smsTask = sendFast2SMS(user.phone_number, body).then((res) => {
                return supabaseClient.from('notification_deliveries').insert({
                    notification_id: notification?.id,
                    channel: 'sms',
                    recipient: user.phone_number,
                    status: res.success ? 'sent' : 'failed',
                    provider_response: res.data || { error: res.error }
                });
            });

            deliveryPromises.push(smsTask);
            results.sms = 'processing';
        }

        await Promise.allSettled(deliveryPromises)

        return new Response(
            JSON.stringify({ success: true, delivered_to: results }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error('Send Notification Error:', error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
