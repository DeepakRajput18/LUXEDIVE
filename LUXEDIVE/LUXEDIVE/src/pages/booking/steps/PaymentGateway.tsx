import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useBooking } from '../../../contexts/BookingContext'
import { paymentService } from '../../../services/paymentService'
import { bookingService } from '../../../services/bookingService'
import { Button } from '../../../components/ui/Button'
import { Lock as LockIcon, CreditCard } from 'lucide-react'
import { toast } from 'sonner'

export default function PaymentGateway() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { bookingState } = useBooking()
    const [processing, setProcessing] = useState(false)

    // Recalculate Total (Should stay in sync with Summary)
    // For brevity repeating logic or use context
    const days = Math.max(1, Math.ceil(((bookingState.dropoffDate?.getTime() || 0) - (bookingState.pickupDate?.getTime() || 0)) / 86400000))
    const total = (bookingState.carDetails?.daily_rate || 0) * days + (bookingState.insurance === 'zero_dep' ? 2999 * days : 0) + (bookingState.chauffeurRequired ? 1500 * days : 0)

    const handlePayment = async () => {
        if (!user) {
            toast.error("Please login to continue")
            navigate('/login') // or open Auth Modal
            return
        }

        // Final safety check for 1-hour minimum duration
        if (bookingState.pickupDate && bookingState.dropoffDate) {
            const diffMs = bookingState.dropoffDate.getTime() - bookingState.pickupDate.getTime();
            if (diffMs < 3600000) {
                toast.error("Minimum rental duration is 1 hour. Please go back and adjust your dates.");
                return;
            }
        }

        setProcessing(true)
        try {
            // 1. Create Booking Record (Pending Payment)
            const booking = await bookingService.createBooking({
                user_id: user.id,
                car_id: bookingState.carId!,
                pickup_datetime: bookingState.pickupDate!.toISOString(),
                dropoff_datetime: bookingState.dropoffDate!.toISOString(),
                total_price: total,
                status: 'pending_payment',
                delivery_type: (bookingState.deliveryType === 'delivery' ? 'delivery' : 'self_pickup'),
                metadata: {
                    addons: bookingState.addOns,
                    insurance: bookingState.insurance
                }
            })

            // 2. Generate Private Booking ID for display
            const luxBookingId = "LUX" + Date.now().toString().slice(-6);
            
            // 3. Update Global State
            useBooking().updateBooking({ bookingId: luxBookingId });

            // 4. Update DB Status (In a real flow, this would wait for payment)
            await bookingService.updateStatus(booking.id, 'confirmed')
            
            toast.success("Booking Request Submitted!")
            navigate(`/booking/${booking.id}/confirmation`)

        } catch (e: any) {
            console.error(e)
            toast.error("Transaction Failed: " + e.message)
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
            <div className="bg-luxe-black border border-luxe-gray/20 rounded-xl p-8 max-w-md w-full text-center space-y-8">
                <div className="w-16 h-16 bg-luxe-gold/10 rounded-full flex items-center justify-center mx-auto text-luxe-gold">
                    <LockIcon className="w-8 h-8" />
                </div>

                <div>
                    <h2 className="text-2xl font-serif text-luxe-white mb-2">Secure Payment</h2>
                    <p className="text-luxe-gray text-sm">Review your booking amount of ₹{total.toLocaleString()} before finalizing.</p>
                </div>

                <Button className="w-full h-14 text-lg" onClick={handlePayment} disabled={processing}>
                    {processing ? 'Processing...' : (
                        <span className="flex items-center gap-2 justify-center">
                            <CreditCard className="w-5 h-5" /> Pay Now
                        </span>
                    )}
                </Button>

                <div className="flex justify-center gap-4 opacity-50">
                    {/* Logos */}
                    <div className="h-6 w-10 bg-white rounded"></div>
                    <div className="h-6 w-10 bg-white rounded"></div>
                    <div className="h-6 w-10 bg-white rounded"></div>
                </div>
                <p className="text-[10px] text-luxe-gray">100% Secure Transaction. 256-bit SSL Encrypted.</p>
            </div>
        </div>
    )
}
