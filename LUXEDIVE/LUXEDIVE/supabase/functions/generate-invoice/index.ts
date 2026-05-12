// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "@supabase/supabase-js"
import { PDFDocument, StandardFonts, rgb } from 'https://cdn.skypack.dev/pdf-lib@1.17.1?dts';

// Add type definitions for Supabase response
interface Car {
    brand: string;
    model: string;
}

interface User {
    full_name: string;
    email: string;
    phone: string;
}

interface Booking {
    id: string;
    booking_number?: string;
    total_amount: number;
    cars: Car; // The query returns single object because of structure, or array. We assume single based on logic.
    users: User;
}

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

        const { booking_id } = await req.json()
        if (!booking_id) throw new Error('Booking ID is required')

        // Fetch Booking Details with correct column names (full_name)
        const { data: booking, error: fetchError } = await supabaseClient
            .from('bookings')
            .select('*, cars(brand, model), users(full_name, email, phone)')
            .eq('id', booking_id)
            .single()

        // Assert type safely or validating
        const bookingData = booking as unknown as Booking;

        if (fetchError || !bookingData) throw new Error('Booking not found')

        if (fetchError || !booking) throw new Error('Booking not found')

        // Create PDF
        const pdfDoc = await PDFDocument.create()
        let page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

        // Content
        page.drawText('LuxeDrive Invoice', { x: 50, y: height - 50, size: 24, font, color: rgb(0, 0, 0) })
        page.drawText(`Booking #: ${bookingData.booking_number || bookingData.id}`, { x: 50, y: height - 80, size: 12, font })
        page.drawText(`Date: ${new Date().toLocaleDateString()}`, { x: width - 200, y: height - 80, size: 12, font })

        let y = height - 120
        page.drawText(`Bill To:`, { x: 50, y, size: 14, font })
        y -= 20
        page.drawText(`${bookingData.users.full_name}`, { x: 50, y, size: 12, font })
        y -= 15
        page.drawText(`${bookingData.users.phone || ''}`, { x: 50, y, size: 12, font })

        // Line Item
        y -= 40
        page.drawText(`Vehicle: ${bookingData.cars.brand} ${bookingData.cars.model}`, { x: 50, y, size: 12, font })
        page.drawText(`Amount: ₹${bookingData.total_amount}`, { x: 400, y, size: 12, font })

        page.drawText('Thank you for choosing LuxeDrive!', { x: 50, y: 50, size: 10, font, color: rgb(0.5, 0.5, 0.5) })

        const pdfBytes = await pdfDoc.save()

        // Upload to Storage (upsert)
        const fileName = `${bookingData.booking_number || bookingData.id}.pdf`
        const { error: uploadError } = await supabaseClient.storage
            .from('invoices')
            .upload(fileName, pdfBytes, {
                contentType: 'application/pdf',
                upsert: true
            })

        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

        // Get Signed URL
        const { data } = await supabaseClient.storage
            .from('invoices')
            .createSignedUrl(fileName, 60 * 60 * 24) // 24 hour expiry

        if (!data) throw new Error('Failed to generate signed URL')

        return new Response(
            JSON.stringify({ success: true, url: data.signedUrl }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return new Response(
            JSON.stringify({ success: false, error: message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
