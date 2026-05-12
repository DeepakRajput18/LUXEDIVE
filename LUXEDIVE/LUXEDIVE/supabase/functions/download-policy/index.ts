import { serve } from "std/http/server.ts"
import { PDFDocument, StandardFonts, rgb } from 'https://cdn.skypack.dev/pdf-lib@1.17.1?dts';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { type } = await req.json() // 'terms', 'privacy', 'cancellation'
        const title = type === 'privacy' ? 'Privacy Policy' : type === 'cancellation' ? 'Cancellation Policy' : 'Terms & Conditions'

        const pdfDoc = await PDFDocument.create()
        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

        page.drawText(`LuxeDrive ${title}`, { x: 50, y: height - 50, size: 24, font })
        page.drawText(`Effective Date: ${new Date().toLocaleDateString()}`, { x: 50, y: height - 80, size: 12, font })

        const content = `
        This is a placeholder for the ${title}. 
        
        1. User Agreement
        2. Service Terms
        3. Responsibilities
        
        Detailed legal text would be dynamically populated here.
        `

        page.drawText(content, { x: 50, y: height - 120, size: 12, font, lineHeight: 18, maxWidth: width - 100 })

        const pdfBytes = await pdfDoc.save()

        return new Response(pdfBytes, {
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${type}_policy.pdf"`
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
