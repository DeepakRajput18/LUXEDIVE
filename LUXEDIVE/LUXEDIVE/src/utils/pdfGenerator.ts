import jsPDF from 'jspdf'

interface BookingData {
    id: string
    car_id: string
    user_id: string
    pickup_datetime: string
    dropoff_datetime: string
    delivery_type: string
    delivery_address: string | null
    base_price: number
    total_price: number
    status: string
    payment_status: string
    payment_method?: string
    created_at: string
}

interface CarData {
    id: string
    brand: string
    model: string
    category: string
    transmission: string
    fuel_type: string
}

export const generateBookingReceipt = (booking: BookingData, car: CarData | null, customerName?: string, customerMobile?: string) => {
    if (!booking) {
        throw new Error('Receipt unavailable')
    }

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    })

    const pageWidth = 210
    const pageHeight = 297
    const margin = 20
    let yPos = 20

    // Helper function to check if we need a new page (we don't want this)
    // Helper function moved or removed if unused
    // const addText = ...

    // Header
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('LUXEDIVE', pageWidth / 2, yPos, { align: 'center' })
    yPos += 8

    doc.setFontSize(16)
    doc.text('Booking Receipt', pageWidth / 2, yPos, { align: 'center' })
    yPos += 6

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Booking Confirmation', pageWidth / 2, yPos, { align: 'center' })
    yPos += 10

    // Divider
    doc.setDrawColor(218, 165, 32)
    doc.setLineWidth(0.5)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 8

    // Booking Info Section
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('BOOKING INFORMATION', margin, yPos)
    yPos += 6

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(`Booking ID: ${booking.id.slice(0, 8).toUpperCase()}`, margin, yPos)
    yPos += 5
    doc.text(`Status: ${booking.status.toUpperCase()}`, margin, yPos)
    yPos += 5
    doc.text(`Booking Date: ${new Date(booking.created_at).toLocaleDateString('en-IN')}`, margin, yPos)
    yPos += 5
    doc.text(`Payment Method: ${booking.payment_method?.toUpperCase() || (booking.payment_status === 'pending' ? 'CASH ON DELIVERY' : 'CARD')}`, margin, yPos)
    yPos += 5
    doc.text(`Payment Status: ${booking.payment_status === 'pending' ? 'PAY AT PICKUP' : 'PAID'}`, margin, yPos)
    yPos += 8

    // Customer Details (if available)
    if (customerName || customerMobile) {
        doc.setFontSize(11)
        doc.setFont('helvetica', 'bold')
        doc.text('CUSTOMER DETAILS', margin, yPos)
        yPos += 6

        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        if (customerName) {
            doc.text(`Name: ${customerName}`, margin, yPos)
            yPos += 5
        }
        if (customerMobile) {
            doc.text(`Mobile: ${customerMobile}`, margin, yPos)
            yPos += 5
        }
        yPos += 3
    }

    // Vehicle Details
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('VEHICLE DETAILS', margin, yPos)
    yPos += 6

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    if (car) {
        doc.text(`Vehicle: ${car.brand} ${car.model}`, margin, yPos)
        yPos += 5
        doc.text(`Category: ${car.category}`, margin, yPos)
        yPos += 5
        doc.text(`Transmission: ${car.transmission} | Fuel: ${car.fuel_type}`, margin, yPos)
    } else {
        doc.text('Vehicle details unavailable', margin, yPos)
    }
    yPos += 8

    // Rental Details
    const pickupDate = new Date(booking.pickup_datetime)
    const dropoffDate = new Date(booking.dropoff_datetime)

    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('RENTAL DETAILS', margin, yPos)
    yPos += 6

    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('Pickup:', margin, yPos)
    yPos += 5
    doc.setFont('helvetica', 'normal')
    doc.text(`Date: ${pickupDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, margin + 5, yPos)
    yPos += 5
    doc.text(`Time: ${pickupDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}`, margin + 5, yPos)
    yPos += 5
    doc.text(`Address: ${booking.delivery_address || 'LUXEDIVE Headquarters'}`, margin + 5, yPos)
    yPos += 7

    doc.setFont('helvetica', 'bold')
    doc.text('Dropoff:', margin, yPos)
    yPos += 5
    doc.setFont('helvetica', 'normal')
    doc.text(`Date: ${dropoffDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, margin + 5, yPos)
    yPos += 5
    doc.text(`Time: ${dropoffDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}`, margin + 5, yPos)
    yPos += 5
    doc.text(`Address: ${booking.delivery_address || 'LUXEDIVE Headquarters'}`, margin + 5, yPos)
    yPos += 8

    // Invoice Summary
    const totalDays = Math.ceil((dropoffDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24))
    const dailyRate = booking.base_price || 0
    const subtotal = dailyRate * totalDays

    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('INVOICE SUMMARY', margin, yPos)
    yPos += 6

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text('Rate (Per Day):', margin, yPos)
    doc.text(`₹${dailyRate.toLocaleString('en-IN')}`, pageWidth - margin, yPos, { align: 'right' })
    yPos += 5

    doc.text('Total Days:', margin, yPos)
    doc.text(`${totalDays} ${totalDays === 1 ? 'day' : 'days'}`, pageWidth - margin, yPos, { align: 'right' })
    yPos += 5

    doc.text('Subtotal:', margin, yPos)
    doc.text(`₹${subtotal.toLocaleString('en-IN')}`, pageWidth - margin, yPos, { align: 'right' })
    yPos += 5

    doc.text('Taxes:', margin, yPos)
    doc.text('₹0', pageWidth - margin, yPos, { align: 'right' })
    yPos += 5

    doc.text('Additional Charges:', margin, yPos)
    doc.text('₹0', pageWidth - margin, yPos, { align: 'right' })
    yPos += 7

    // Total line
    doc.setLineWidth(0.3)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 5

    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('FINAL TOTAL AMOUNT:', margin, yPos)
    doc.text(`₹${booking.total_price.toLocaleString('en-IN')}`, pageWidth - margin, yPos, { align: 'right' })
    yPos += 8

    // Important Notes
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('IMPORTANT NOTES', margin, yPos)
    yPos += 6

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text('• Please carry a valid government ID at pickup', margin, yPos)
    yPos += 4
    doc.text('• Arrival time may vary ±15 minutes', margin, yPos)
    yPos += 4
    if (booking.payment_status === 'pending') {
        doc.text('• For Cash on Delivery, payment is due at vehicle handover', margin, yPos)
        yPos += 4
    }
    yPos += 6

    // Footer
    doc.setDrawColor(218, 165, 32)
    doc.setLineWidth(0.5)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 6

    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('✓ Secure Booking', pageWidth / 2, yPos, { align: 'center' })
    yPos += 5

    doc.setFontSize(10)
    doc.text('Thank you for choosing LUXEDIVE', pageWidth / 2, yPos, { align: 'center' })
    yPos += 5

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text('Customer Support: +91 123 456 7890 • support@luxedive.com', pageWidth / 2, yPos, { align: 'center' })

    // Save PDF
    doc.save(`luxedive-booking-receipt-${booking.id.slice(0, 8)}.pdf`)
}
