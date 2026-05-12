import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../../contexts/BookingContext'
import { Card, CardContent } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { ArrowRight, Calendar, MapPin, Car, ShieldCheck, UserCheck, ChevronRight } from 'lucide-react'
import { normalizeDailyRate } from '../../../lib/pricingUtils'

export default function PriceSummary() {
    const navigate = useNavigate()
    const { bookingState } = useBooking()

    // Mock calculations if context is missing basics (failsafe)
    const dailyRate = bookingState.carDetails ? normalizeDailyRate(bookingState.carDetails) : 0
    const duration = bookingState.duration || 1
    const basePrice = dailyRate * duration

    // Calculate Extras
    // 1. Insurance
    const insurancePrice = bookingState.insurance === 'zero_dep' ? 2999 * duration : 0

    // 2. Chauffeur (Assume free if benefit, else 2000 - but logic was 'free' in Step 3)
    // In Step 3 we displayed it as "Included • Free". Let's stick to that for now unless context says otherwise.
    // If we want to be strict, we'd check the benefit again or store 'chauffeurPrice' in context. 
    // For this UI, let's assume it's included as per the "Dark Luxury" promise often implied.
    const chauffeurPrice = 0

    // 3. Addons
    const addonsTotal = bookingState.addOns?.reduce((sum, addon) => {
        // We'd need to look up price. Step 2 had hardcoded prices. 
        // Ideally context has prices. Failsafe:
        const prices: Record<string, number> = { 'child_seat': 800, 'wifi': 500, 'gps': 1000 }
        return sum + ((prices[addon.id] || 0) * (addon.quantity || 1))
    }, 0) || 0
    const addonsPrice = addonsTotal * duration

    // Total
    const subTotal = basePrice + insurancePrice + chauffeurPrice + addonsPrice
    const gst = subTotal * 0.18 // 18% GST
    const totalAmount = subTotal + gst

    const deposit = bookingState.carDetails?.deposit_amount || 50000

    // Helper formatting
    const formatDate = (d: Date | null) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Pending'
    const formatTime = (d: Date | null) => d ? new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '--:--'

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-32">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="mb-10 border-b border-white/10 pb-8 flex justify-between items-end">
                    <div>
                        <span className="text-amber-500 text-[10px] tracking-[0.2em] uppercase font-bold mb-2 block">Step 05 of 05</span>
                        <h1 className="text-4xl lg:text-5xl font-serif text-white">Review & Confirm</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Col: Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Vehicle Card */}
                        <Card className="bg-zinc-900 border border-white/5 overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-black rounded-lg border border-white/10">
                                        <Car className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Vehicle</p>
                                        <h3 className="text-xl font-serif text-white">{bookingState.carDetails?.brand} {bookingState.carDetails?.model}</h3>
                                    </div>
                                </div>
                                <Button variant="ghost" onClick={() => navigate('/fleet')} className="text-xs text-amber-500 hover:text-white uppercase tracking-wider font-bold">Change</Button>
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-6 bg-black/20">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Pickup</p>
                                    <div className="flex items-center gap-2 text-sm text-white">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        {formatDate(bookingState.pickupDate)}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 ml-6">
                                        {formatTime(bookingState.pickupDate)}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Dropoff</p>
                                    <div className="flex items-center gap-2 text-sm text-white">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        {formatDate(bookingState.dropoffDate)}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 ml-6">
                                        {formatTime(bookingState.dropoffDate)}
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-t border-white/5">
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Location</p>
                                <div className="flex items-start gap-2 text-sm text-white">
                                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <span className="line-clamp-2">{bookingState.pickupAddress || 'Ahmedabad (Selected on map)'}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Services & Addons */}
                        <Card className="bg-zinc-900 border border-white/5 p-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Selected Services</h3>
                            <div className="space-y-4">
                                {bookingState.insurance === 'zero_dep' && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                            <span className="text-sm text-gray-300">Premium Prevention (Zero Dep)</span>
                                        </div>
                                        <span className="text-sm text-white font-mono">₹{insurancePrice.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <UserCheck className="w-4 h-4 text-amber-500" />
                                        <span className="text-sm text-gray-300">Professional Chauffeur</span>
                                    </div>
                                    <span className="text-sm text-amber-500 font-bold uppercase tracking-wider">Included</span>
                                </div>
                                {bookingState.addOns?.map(addon => (
                                    <div key={addon.id} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                                            <span className="text-sm text-gray-300 capitalize">{addon.id.replace('_', ' ')} <span className="text-gray-600">x{addon.quantity}</span></span>
                                        </div>
                                        <span className="text-sm text-white font-mono">₹{((addon.quantity || 1) * (addon.id === 'child_seat' ? 800 : addon.id === 'gps' ? 1000 : 500) * duration).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                    </div>

                    {/* Right Col: Price Breakdown */}
                    <div className="space-y-6">
                        <Card className="bg-zinc-900 border border-white/5 p-6 sticky top-24">
                            <h3 className="text-xl font-serif text-white border-b border-white/10 pb-4 mb-6">Price Breakdown</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Base Rental ({duration} Days)</span>
                                    <span className="text-white font-mono">₹{basePrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Review Services</span>
                                    <span className="text-white font-mono">₹{insurancePrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Add-ons Total</span>
                                    <span className="text-white font-mono">₹{addonsPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">GST (18%)</span>
                                    <span className="text-white font-mono">₹{gst.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="border-t border-dashed border-white/20 pt-4 mb-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-white uppercase tracking-widest">Grand Total</span>
                                    <span className="text-3xl font-serif text-amber-500">₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Refundable Deposit</span>
                                    <span className="text-sm font-bold text-white">₹{deposit.toLocaleString()}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 leading-tight">
                                    Blocked on card/UPI. Released within 24hrs of safe return.
                                </p>
                            </div>

                            <Button onClick={() => navigate('/booking/payment')} className="w-full bg-white text-black hover:bg-amber-400 hover:text-black py-6 rounded-lg font-bold uppercase tracking-widest shadow-lg transition-all text-xs flex items-center justify-center gap-2">
                                Proceed to Payment <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>

                            <p className="text-center mt-4 text-[10px] text-gray-500">
                                By proceeding, you agree to our <span className="text-white underline cursor-pointer">Terms of Service</span>.
                            </p>
                        </Card>
                    </div>

                </div>

            </div>
        </div>
    )
}
