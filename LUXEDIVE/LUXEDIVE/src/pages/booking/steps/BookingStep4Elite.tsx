import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../../contexts/BookingContext'
import { Card } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { ArrowRight, MapPin, Clock, Calendar, CheckCircle2, RotateCcw, Copy, AlertCircle } from 'lucide-react'
import { getCarImage } from '../../../lib/placeholders'
import { normalizeDailyRate } from '../../../lib/pricingUtils'
import { toast } from 'sonner'

// Ahmedabad Pincode Validation
const isValidAhmedabadPincode = (pincode: string) => {
    // Basic check for Ahmedabad pincodes (usually start with 380 or 382)
    return /^(380|382)\d{3}$/.test(pincode)
}

interface AddressState {
    building: string
    area: string
    city: string
    pincode: string
}

export default function BookingStep4Elite() {
    const navigate = useNavigate()
    const { bookingState, updateBooking } = useBooking()

    // Initialize state from context if available
    const parseAddress = (addrString?: string): AddressState => {
        if (!addrString) return { building: '', area: '', city: 'Ahmedabad', pincode: '' }
        try {
            const parts = addrString.split(',').map(s => s.trim())
            if (parts.length >= 4) {
                return {
                    building: parts[0],
                    area: parts[1],
                    city: 'Ahmedabad', // Force city
                    pincode: parts[3]
                }
            }
        } catch (e) { /* ignore */ }
        return { building: '', area: '', city: 'Ahmedabad', pincode: '' }
    }

    const [pickup, setPickup] = useState<AddressState>(() => parseAddress(bookingState.pickupAddress))
    const [dropoff, setDropoff] = useState<AddressState>(() => parseAddress(bookingState.dropoffAddress))

    // UI Helpers
    const [useSameAsPickup, setUseSameAsPickup] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)

    useEffect(() => {
        if (useSameAsPickup) {
            setDropoff({ ...pickup })
        }
    }, [pickup, useSameAsPickup])

    // Real API Verification using OpenStreetMap (Nominatim)
    const verifyLocationsReal = async (): Promise<boolean> => {
        setIsVerifying(true)
        try {
            // Strategy: Verify the Area + Pincode combination exists. 
            // verifying specific buildings is often too flaky with free APIs.

            // 1. Verify Pickup
            const pickupQuery = `${pickup.area}, ${pickup.city}, ${pickup.pincode}`
            const pickupRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(pickupQuery)}`)
            const pickupData = await pickupRes.json()

            if (!pickupData || pickupData.length === 0) {
                toast.error("Pickup Location Not Found", {
                    description: "We couldn't verify this area/pincode. Please check specifically: Area & Pincode."
                })
                return false
            }

            // 2. Verify Dropoff
            const dropoffQuery = `${dropoff.area}, ${dropoff.city}, ${dropoff.pincode}`
            const dropoffRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(dropoffQuery)}`)
            const dropoffData = await dropoffRes.json()

            if (!dropoffData || dropoffData.length === 0) {
                toast.error("Dropoff Location Not Found", {
                    description: "We couldn't verify this area/pincode. Please check specifically Area & Pincode."
                })
                return false
            }

            return true

        } catch (error) {
            console.error("Verification API Error", error)
            // If API fails (e.g. rate limit), we warn but allow strict manual check to pass to not block user
            toast.warning("Offline Verification", { description: "Could not reach map services. Proceeding with manual check." })
            return true
        } finally {
            setIsVerifying(false)
        }
    }

    const validateForm = () => {
        const errors: string[] = []

        // Pickup Validation
        if (!pickup.building.trim()) errors.push("Pickup Building/Flat is required")
        if (!pickup.area.trim()) errors.push("Pickup Area/Landmark is required")
        if (!pickup.pincode.match(/^\d{6}$/)) errors.push("Pickup Pincode must be 6 digits")
        else if (!isValidAhmedabadPincode(pickup.pincode)) errors.push("Pickup Pincode must be a valid Ahmedabad code (starts with 380/382)")

        // Dropoff Validation
        if (!dropoff.building.trim()) errors.push("Dropoff Building/Flat is required")
        if (!dropoff.area.trim()) errors.push("Dropoff Area/Landmark is required")
        if (!dropoff.pincode.match(/^\d{6}$/)) errors.push("Dropoff Pincode must be 6 digits")
        else if (!isValidAhmedabadPincode(dropoff.pincode)) errors.push("Dropoff Pincode must be a valid Ahmedabad code (starts with 380/382)")

        if (errors.length > 0) {
            // Show first error via toast
            toast.error("Address Validation Failed", {
                description: errors[0]
            })
            return false
        }
        return true
    }

    const handleContinue = async () => {
        // 1. Strict Syntax Check
        if (!validateForm()) return

        // 2. Real Existence Check (Async)
        const isReal = await verifyLocationsReal()
        if (!isReal) return

        // Save normalized addresses
        const pickupStr = `${pickup.building.trim()}, ${pickup.area.trim()}, Ahmedabad, ${pickup.pincode}`
        const dropoffStr = `${dropoff.building.trim()}, ${dropoff.area.trim()}, Ahmedabad, ${dropoff.pincode}`

        updateBooking({
            pickupAddress: pickupStr,
            dropoffAddress: dropoffStr,
            // pickupLocation: 'Home', // Ensure older fields are consistent?
            // dropoffLocation: 'Home'
        })

        toast.success("Addresses Verified & Confirmed")
        navigate('/booking/summary')
    }

    const handleClear = (type: 'pickup' | 'dropoff') => {
        const resetState = { building: '', area: '', city: 'Ahmedabad', pincode: '' }
        if (type === 'pickup') {
            setPickup(resetState)
            setUseSameAsPickup(false)
        } else {
            setDropoff(resetState)
            setUseSameAsPickup(false)
        }
    }

    const dailyRate = bookingState.carDetails ? normalizeDailyRate(bookingState.carDetails) : 0
    const totalDays = bookingState.duration || 1
    const totalAmount = dailyRate * totalDays

    // Helper to format dates safely
    const formatDate = (d: Date | null) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', weekday: 'short' }) : 'Pending'
    const formatTime = (d: Date | null) => d ? new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '--:--'

    return (
        <div className="min-h-screen bg-black pt-24 pb-32">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* Header */}
                <div className="mb-10 border-b border-white/10 pb-8">
                    <span className="text-amber-500 text-[10px] tracking-[0.2em] uppercase font-bold mb-2 block">Step 04 of 05</span>
                    <h1 className="text-4xl lg:text-5xl font-serif text-white mb-4">Address Verification</h1>
                    <p className="text-gray-400 text-lg font-light max-w-2xl leading-relaxed">
                        Confirm pickup and dropoff locations for your Ahmedabad rental.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN - FORM */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* PICKUP SECTION */}
                        <Card className="bg-zinc-900 border border-white/5 p-6 md:p-8 relative">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-2 text-amber-500">
                                    <MapPin className="w-5 h-5" />
                                    <h2 className="text-sm uppercase tracking-widest font-bold">Pickup Address</h2>
                                </div>
                                <button onClick={() => handleClear('pickup')} className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
                                    <RotateCcw className="w-3 h-3" /> Clear
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2 block">Building / Flat / House No *</label>
                                    <input
                                        type="text"
                                        value={pickup.building}
                                        onChange={e => setPickup(p => ({ ...p, building: e.target.value }))}
                                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="e.g. A-402, Titanium Heights"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2 block">Area / Society / Landmark *</label>
                                    <input
                                        type="text"
                                        value={pickup.area}
                                        onChange={e => setPickup(p => ({ ...p, area: e.target.value }))}
                                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="e.g. Corporate Road, Prahlad Nagar"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] text-gray-600 uppercase tracking-wider font-bold mb-2 block">City (Locked)</label>
                                        <input
                                            type="text"
                                            value="Ahmedabad"
                                            disabled
                                            className="w-full bg-black/50 border border-white/5 rounded px-4 py-3 text-gray-600 text-sm cursor-not-allowed uppercase tracking-wider font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2 block">Pincode *</label>
                                        <input
                                            type="text"
                                            maxLength={6}
                                            value={pickup.pincode}
                                            onChange={e => setPickup(p => ({ ...p, pincode: e.target.value.replace(/\D/g, '') }))}
                                            className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-700 tracking-widest font-mono"
                                            placeholder="380___"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* DROPOFF SECTION */}
                        <Card className="bg-zinc-900 border border-white/5 p-6 md:p-8 relative">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <MapPin className="w-5 h-5" />
                                    <h2 className="text-sm uppercase tracking-widest font-bold">Dropoff Address</h2>
                                </div>
                                <button onClick={() => handleClear('dropoff')} className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
                                    <RotateCcw className="w-3 h-3" /> Clear
                                </button>
                            </div>

                            {/* Copy Action */}
                            <div className="mb-6">
                                <label className="inline-flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${useSameAsPickup ? 'bg-amber-500 border-amber-500' : 'border-white/20 group-hover:border-white/40'}`}>
                                        {useSameAsPickup && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={useSameAsPickup} onChange={e => setUseSameAsPickup(e.target.checked)} />
                                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Same as pickup address</span>
                                </label>
                            </div>

                            <div className={`space-y-5 transition-opacity ${useSameAsPickup ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                <div>
                                    <label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2 block">Building / Flat / House No *</label>
                                    <input
                                        type="text"
                                        value={dropoff.building}
                                        onChange={e => setDropoff(p => ({ ...p, building: e.target.value }))}
                                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="e.g. B-102, Satellite Towers"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2 block">Area / Society / Landmark *</label>
                                    <input
                                        type="text"
                                        value={dropoff.area}
                                        onChange={e => setDropoff(p => ({ ...p, area: e.target.value }))}
                                        className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="e.g. Judges Bungalow Road"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] text-gray-600 uppercase tracking-wider font-bold mb-2 block">City (Locked)</label>
                                        <input
                                            type="text"
                                            value="Ahmedabad"
                                            disabled
                                            className="w-full bg-black/50 border border-white/5 rounded px-4 py-3 text-gray-600 text-sm cursor-not-allowed uppercase tracking-wider font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2 block">Pincode *</label>
                                        <input
                                            type="text"
                                            maxLength={6}
                                            value={dropoff.pincode}
                                            onChange={e => setDropoff(p => ({ ...p, pincode: e.target.value.replace(/\D/g, '') }))}
                                            className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-700 tracking-widest font-mono"
                                            placeholder="380___"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN - SUMMARY */}
                    <div className="space-y-6">
                        <Card className="bg-zinc-900 border border-white/5 p-6 sticky top-24">
                            <h3 className="text-white font-serif text-xl border-b border-white/10 pb-4 mb-6">Booking Summary</h3>

                            <div className="flex gap-4 mb-6">
                                <img
                                    src={bookingState.carDetails ? ((bookingState.carDetails.images && bookingState.carDetails.images[0]) || getCarImage(bookingState.carDetails.brand, bookingState.carDetails.model)) : getCarImage('Mercedes-Benz', 'Maybach')}
                                    className="w-20 h-14 object-cover rounded border border-white/10"
                                    alt="Vehicle"
                                />
                                <div>
                                    <p className="text-white font-medium text-sm leading-tight mb-1">
                                        {bookingState.carDetails ? `${bookingState.carDetails.brand} ${bookingState.carDetails.model}` : 'Selected Vehicle'}
                                    </p>
                                    <p className="text-[10px] text-amber-500 uppercase tracking-wider">
                                        {bookingState.carDetails?.category || 'Luxury'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6 border-b border-white/5 pb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Duration</span>
                                    <span className="text-white">{totalDays} Days</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Total</span>
                                    <span className="text-amber-500 font-bold">₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-amber-500 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Pickup</p>
                                        <p className="text-white text-sm">{formatDate(bookingState.pickupDate)}</p>
                                        <p className="text-gray-400 text-xs">{formatTime(bookingState.pickupDate)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Dropoff</p>
                                        <p className="text-white text-sm">{formatDate(bookingState.dropoffDate)}</p>
                                        <p className="text-gray-400 text-xs">{formatTime(bookingState.dropoffDate)}</p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleContinue}
                                disabled={isVerifying}
                                className="w-full bg-white text-black hover:bg-amber-400 hover:text-black uppercase tracking-widest text-xs font-bold py-4 h-auto shadow-lg shadow-amber-900/10 disabled:opacity-50 disabled:cursor-not-allowed border-none"
                            >
                                {isVerifying ? 'Verifying Locations...' : 'Verify & Continue'} <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Card>
                    </div>

                </div>

                <div className="mt-12 flex justify-start">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-500 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-colors"
                    >
                        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Previous Step
                    </button>
                </div>

            </div>
        </div>
    )
}
