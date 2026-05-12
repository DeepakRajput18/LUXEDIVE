import { serve } from "std/http/server.ts"
import { createClient } from "@supabase/supabase-js"


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

        const url = new URL(req.url)
        const type = url.searchParams.get('type') // 'cars' or 'bookings'

        let data: Record<string, unknown>[] = []
        let columns: string[] = []

        if (type === 'cars') {
            const { data: cars } = await supabaseClient.from('cars').select('*')
            data = (cars || []) as Record<string, unknown>[]
            columns = ['id', 'brand', 'model', 'year', 'category', 'status', 'deposit_amount']
        } else if (type === 'bookings') {
            const { data: bookings } = await supabaseClient.from('bookings').select('*')
            data = (bookings || []) as Record<string, unknown>[]
            columns = ['id', 'user_id', 'car_id', 'status', 'total_amount', 'pickup_datetime', 'booking_number']
        } else {
            throw new Error('Invalid export type')
        }

        // Convert to CSV
        // Simple manual CSV generation if std/encoding/csv is problematic
        const header = columns.join(',')
        const rows = data.map(row => columns.map(col => {
            const val = row[col]
            return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : String(val ?? '')
        }).join(','))
        const csv = [header, ...rows].join('\n')

        return new Response(csv, {
            headers: {
                ...corsHeaders,
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="${type}_export.csv"`
            }
        })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return new Response(
            JSON.stringify({ success: false, error: message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
