import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { bookingService } from '../../services/bookingService'
import { InvoiceTemplate, type InvoiceBookingData, type InvoiceCarData, type InvoiceCustomerData } from '../../components/invoice/InvoiceTemplate'
import { Button } from '../../components/ui/Button'
import { Printer } from 'lucide-react'

export default function InvoicePage() {
    const { id } = useParams<{ id: string }>()
    const [booking, setBooking] = useState<InvoiceBookingData | null>(null)
    const [car, setCar] = useState<InvoiceCarData | null>(null)
    const [customer, setCustomer] = useState<InvoiceCustomerData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return
        bookingService.getBookingById(id).then((data: any) => {
            // Map data to invoice types
            setBooking({
                id: data.id,
                created_at: data.created_at,
                status: data.status,
                pickup_datetime: data.pickup_datetime,
                dropoff_datetime: data.dropoff_datetime,
                delivery_address: data.delivery_address || (typeof data.pickup_location === 'string' ? data.pickup_location : data.pickup_location?.address),
                delivery_type: data.delivery_type,
                base_price: data.car_rent_per_day || data.car?.daily_rate || 0,
                total_price: data.total_price,
                payment_status: data.payment_status || (data.status === 'confirmed' ? 'paid' : 'pending'),
                payment_method: data.payment_method || 'card',
                // Chauffeur details
                has_chauffeur: !!data.chauffeur_id,
                chauffeur_name: data.chauffeur?.full_name || data.chauffeur?.first_name,
                chauffeur_cost_per_day: data.chauffeur_cost_per_day,
                total_chauffeur_cost: data.total_chauffeur_cost
            })

            setCar({
                brand: data.car?.brand,
                model: data.car?.model,
                category: data.car?.category,
                transmission: data.car?.transmission,
                fuel_type: data.car?.fuel_type,
                license_plate: data.car?.license_plate
            })

            // Use customer data from join
            setCustomer({
                name: data.customer?.name || data.users?.full_name || 'Valued Customer',
                phone: data.customer?.phone || data.users?.phone || '+91 XXXXX XXXXX',
                email: data.customer?.email || data.users?.email
            })

            setLoading(false)
        }).catch((err) => {
            console.error('Invoice load error:', err)
            setError(err.message || 'Failed to load invoice')
            setLoading(false)
        })
    }, [id])

    const handlePrint = () => {
        window.print()
    }

    if (loading) return <div className="p-20 text-center text-white h-screen bg-black">Loading Invoice...</div>
    if (error) return <div className="p-20 text-center text-red-500 h-screen bg-black">Error: {error}</div>

    return (
        <div className="min-h-screen bg-black py-10 print:bg-white print:p-0">
            {/* Toolbar - Hidden in Print */}
            <div className="max-w-[210mm] mx-auto mb-6 flex justify-between items-center print:hidden px-4">
                <h1 className="text-xl font-bold text-gray-800">Invoice Review</h1>
                <Button onClick={handlePrint} className="flex gap-2">
                    <Printer size={16} /> Print / Save PDF
                </Button>
            </div>

            {/* Invoice Container */}
            {booking && car && customer && (
                <InvoiceTemplate
                    booking={booking}
                    car={car}
                    customer={customer}
                />
            )}
        </div>
    )
}
