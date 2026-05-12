// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { sendFast2SMS } from "../_shared/fast2sms.ts"

const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req: Request) => {
    try {
        // 1. Fetch un-notified waitlist items for available cars
        // Joined with users to get phone numbers
        const { data: waitlistItems } = await supabaseClient
            .from('waitlist')
            .select('*, cars!inner(status, name), users!inner(phone_number)')
            .eq('notified', false)
            .eq('cars.status', 'available')

        if (!waitlistItems || waitlistItems.length === 0) {
            return new Response(JSON.stringify({ message: 'No waitlist items to process' }), { headers: { 'Content-Type': 'application/json' } })
        }

        // 2. Notify Users and Update Status
        for (const item of waitlistItems) {
            if (item.users?.phone_number) {
                const message = `Good news! The ${item.cars.name} is now available for booking on LUXEDIVE. Book now before it's gone!`;
                await sendFast2SMS(item.users.phone_number, message);
                console.log(`✅ Notified user ${item.user_id} via SMS`);
            }

            await supabaseClient
                .from('waitlist')
                .update({ notified: true })
                .eq('id', item.id)
        }

        return new Response(
            JSON.stringify({ success: true, processed: waitlistItems.length }),
            { headers: { 'Content-Type': 'application/json' } }
        )

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return new Response(
            JSON.stringify({ success: false, error: message }),
            { headers: { 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
