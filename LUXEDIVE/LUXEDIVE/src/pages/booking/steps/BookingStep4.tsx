import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../../contexts/BookingContext'
import { useAuth } from '../../../contexts/AuthContext'
import { bookingService } from '../../../services/bookingService'
import { paymentService } from '../../../services/paymentService'
import { Button } from '../../../components/ui/Button'
import { Card, CardContent } from '../../../components/ui/Card'
import { ArrowLeft, CreditCard, Lock as LockIcon, BadgeCheck } from 'lucide-react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { getCarImage } from '../../../lib/placeholders'

// Mock add-ons array again for display names (should be central constant)
const AVAILABLE_ADDONS = [
    { id: 'chauffeur', name: 'Professional Chauffeur', price: 2500, type: 'per_day' },
    { id: 'insurance_plus', name: 'Zero Dep Insurance', price: 1500, type: 'per_day' },
    { id: 'wifi', name: '4G WiFi Hotspot', price: 500, type: 'flat' },
]

export default function BookingStep4() {
    const { bookingState, resetBooking, updateBooking } = useBooking()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false)

    const calculations = useMemo(() => {
        if (!bookingState.pickupDate || !bookingState.dropoffDate || !bookingState.carDetails) {
            return null
        }

        const durationMs = bookingState.dropoffDate.getTime() - bookingState.pickupDate.getTime()
        const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24))

        const basePrice = durationDays * bookingState.carDetails.daily_rate

        let addonsTotal = 0
        bookingState.addOns.forEach(addon => {
            const details = AVAILABLE_ADDONS.find(a => a.id === addon.id)
            if (details) {
                if (details.type === 'per_day') {
                    addonsTotal += details.price * durationDays
                } else {
                    addonsTotal += details.price
                }
            }
        })

        const subtotal = basePrice + addonsTotal
        const gst = subtotal * 0.18
        const deposit = bookingState.carDetails.deposit_amount || 0
        const total = subtotal + gst + deposit

        return {
            durationDays,
            basePrice,
            addonsTotal,
            subtotal,
            gst,
            total
        }
    }, [bookingState])

    const handlePayment = async () => {
        if (!user || !bookingState.carId || !calculations) return
        setProcessing(true)

        try {
            // 1. Create Booking Record (Status: Pending Payment)
            const booking = await bookingService.createBooking({
                user_id: user.id,
                car_id: bookingState.carId,
                pickup_datetime: bookingState.pickupDate!.toISOString(),
                dropoff_datetime: bookingState.dropoffDate!.toISOString(),
                status: 'pending_payment',
                total_price: calculations.total,
                payment_status: 'pending',
                delivery_type: bookingState.deliveryType,
                pickup_location: { address: bookingState.pickupLocation },
                dropoff_location: { address: bookingState.dropoffLocation },
                metadata: {
                    addons: bookingState.addOns,
                    calculations
                }
            })

            // 2. Mock Success Flow for Legacy Page

            // 3. Proceed to Payment Gateway (or mock success)

            toast.success("Booking Created! Redirecting to payment...")

            // Mock Success Flow
            setTimeout(() => {
                resetBooking()
                navigate('/dashboard')
            }, 2000)

        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Failed to process booking")
        } finally {
            setProcessing(false)
        }
    }

    if (!calculations || !bookingState.carDetails) return <div>Invalid Booking State</div>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-serif text-luxe-white">Review & Pay</h2>

                <Card>
                    <div className="p-6 border-b border-luxe-gray/10">
                        <h3 className="font-medium text-luxe-white text-lg">Price Breakdown</h3>
                    </div>
                    <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center text-luxe-gray">
                            <span>Vehicle Rental ({calculations.durationDays} days)</span>
                            <span>₹{calculations.basePrice.toLocaleString()}</span>
                        </div>
                        {bookingState.addOns.length > 0 && (
                            <div className="space-y-2 pt-2">
                                <p className="text-xs font-semibold text-luxe-gray uppercase">Add-ons</p>
                                {bookingState.addOns.map(addon => {
                                    const details = AVAILABLE_ADDONS.find(a => a.id === addon.id)
                                    return (
                                        <div key={addon.id} className="flex justify-between items-center text-sm text-luxe-gray ml-2">
                                            <span>{details?.name}</span>
                                            <span>₹{details?.type === 'per_day' ? (details.price * calculations.durationDays).toLocaleString() : details?.price.toLocaleString()}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        <div className="border-t border-luxe-gray/10 my-4"></div>

                        <div className="flex justify-between items-center text-luxe-white">
                            <span>Subtotal</span>
                            <span>₹{calculations.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-luxe-gray text-sm">
                            <span>GST (18%)</span>
                            <span>₹{calculations.gst.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-luxe-gray text-sm">
                            <span>Refundable Deposit</span>
                            <span>₹{(bookingState.carDetails.deposit_amount || 0).toLocaleString()}</span>
                        </div>

                        <div className="border-t border-luxe-gray/10 my-4"></div>

                        <div className="flex justify-between items-center">
                            <span className="text-xl font-serif text-luxe-gold">Total Amount</span>
                            <span className="text-2xl font-bold text-luxe-gold">₹{calculations.total.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-luxe-dark/50 p-4 rounded-lg flex gap-4 border border-luxe-gray/20 items-start">
                    <LockIcon className="w-5 h-5 text-luxe-gold flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="text-luxe-white font-medium text-sm">Secure Payment</h4>
                        <p className="text-luxe-gray text-xs mt-1">
                            Your payment information is encrypted and processed securely.
                            The refundable deposit will be returned within 24 hours of vehicle return.
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <Card className="sticky top-24 border-luxe-gold/20">
                    <CardContent className="p-6 space-y-6">
                        <div>
                            <h3 className="text-lg font-serif text-luxe-white mb-4">Trip Summary</h3>

                            {/* Added Image for Premium Feel */}
                            <div className="mb-4 rounded-lg overflow-hidden h-32 relative">
                                <img
                                    src={bookingState.carDetails.images?.[0] || getCarImage(bookingState.carDetails.brand, bookingState.carDetails.model)}
                                    className="w-full h-full object-cover"
                                    alt="Car"
                                />
                            </div>

                            <div className="bg-luxe-gray/10 rounded-lg p-3 mb-4">
                                <p className="font-medium text-luxe-white">{bookingState.carDetails.brand} {bookingState.carDetails.model}</p>
                                <p className="text-xs text-luxe-gray mt-1">
                                    {bookingState.pickupDate?.toLocaleDateString()} - {bookingState.dropoffDate?.toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <Button
                            className="w-full h-14 text-lg bg-luxe-gold hover:bg-luxe-gold-light text-luxe-black"
                            onClick={handlePayment}
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing
                                </>
                            ) : (
                                <>
                                    Pay ₹{calculations.total.toLocaleString()}
                                </>
                            )}
                        </Button>

                        <div className="flex justify-center text-[10px] text-luxe-gray uppercase tracking-widest font-bold opacity-40">
                            Secure Encrypted Gateway
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-4 text-center">
                    <Button variant="ghost" size="sm" onClick={() => navigate(-1)} disabled={processing}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Verification
                    </Button>
                </div>
            </div>
        </div>
    )
}
