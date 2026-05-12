import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { bookingService } from '../../../services/bookingService'
import { carService } from '../../../services/carService'
import { useBooking } from '../../../contexts/BookingContext'
import { toast } from 'sonner'
import { Calendar, Clock, Briefcase, MapPin, Plane, ShieldCheck, ArrowRight, Info, Box } from 'lucide-react'
import { getCarImage } from '../../../lib/placeholders'
import { normalizeDailyRate } from '../../../lib/pricingUtils'

export default function BookingStep1() {
    const navigate = useNavigate()
    const { carId } = useParams()
    const location = useLocation()
    const lockedPriceRate = location.state?.lockedPriceRate;

    const { updateBooking, bookingState } = useBooking()
    const [carData, setCarData] = useState(bookingState.carDetails)
    const [loading, setLoading] = useState(!carData)
    const [rentalType, setRentalType] = useState('hourly')

    const getDefaultDates = () => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)
        tomorrow.setHours(12, 0, 0, 0)

        const threeDaysLater = new Date(today)
        threeDaysLater.setDate(today.getDate() + 3)
        threeDaysLater.setHours(12, 0, 0, 0)

        return {
            pickup: tomorrow,
            dropoff: threeDaysLater
        }
    }

    const formatDateForInput = (date: Date) => {
        return date.toISOString().split('T')[0]
    }

    const formatTimeForInput = (date: Date) => {
        return date.toTimeString().slice(0, 5)
    }

    const defaults = getDefaultDates()
    const [pickupDate, setPickupDate] = useState(() => {
        if (bookingState.pickupDate) {
            const d = bookingState.pickupDate instanceof Date ? bookingState.pickupDate : new Date(bookingState.pickupDate)
            return formatDateForInput(d)
        }
        return formatDateForInput(defaults.pickup)
    })

    const [pickupTime, setPickupTime] = useState(() => {
        if (bookingState.pickupDate) {
            const d = bookingState.pickupDate instanceof Date ? bookingState.pickupDate : new Date(bookingState.pickupDate)
            return formatTimeForInput(d)
        }
        return '12:00'
    })

    const [dropoffDate, setDropoffDate] = useState(() => {
        if (bookingState.dropoffDate) {
            const d = bookingState.dropoffDate instanceof Date ? bookingState.dropoffDate : new Date(bookingState.dropoffDate)
            return formatDateForInput(d)
        }
        return formatDateForInput(defaults.dropoff)
    })

    const [dropoffTime, setDropoffTime] = useState(() => {
        if (bookingState.dropoffDate) {
            const d = bookingState.dropoffDate instanceof Date ? bookingState.dropoffDate : new Date(bookingState.dropoffDate)
            return formatTimeForInput(d)
        }
        return '12:00'
    })

    const [checking, setChecking] = useState(false)
    const [pricing, setPricing] = useState({
        baseRate: 0,
        duration: 0,
        subtotal: 0,
        tax: 0,
        discount: 0,
        total: 0
    })

    const todayStr = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`)
        const dropoffDateTime = new Date(`${dropoffDate}T${dropoffTime}`)

        updateBooking({
            pickupDate: pickupDateTime,
            dropoffDate: dropoffDateTime,
            duration: pricing.duration
        })
    }, [pickupDate, pickupTime, dropoffDate, dropoffTime, pricing.duration])

    useEffect(() => {
        if (!carId) return;

        const fetchCar = async () => {
            if (bookingState.carId === carId && bookingState.carDetails) {
                setCarData(bookingState.carDetails);
                setLoading(false);
                return;
            }

            try {
                const car = await carService.getCarById(carId);
                if (car) {
                    setCarData(car);
                    updateBooking({ carId: car.id, carDetails: car });
                }
            } catch (error) {
                console.error('Failed to fetch car:', error);
            } finally {
                setLoading(false);
            }
        };


        fetchCar();
    }, [carId, bookingState.carId, bookingState.carDetails, updateBooking]);

    useEffect(() => {
        if (!carData) return;

        const calculatePrice = () => {
            const start = new Date(`${pickupDate}T${pickupTime}`)
            const end = new Date(`${dropoffDate}T${dropoffTime}`)

            if (end.getTime() - start.getTime() < 3600000) {
                setPricing({ baseRate: 0, duration: 0, subtotal: 0, tax: 0, discount: 0, total: 0 })
                return
            }

            const diffMs = end.getTime() - start.getTime()
            const diffHours = diffMs / (1000 * 60 * 60)
            const days = Math.max(1, Math.ceil(diffHours / 24))

            const baseRate = lockedPriceRate || normalizeDailyRate(carData)
            let subtotal = baseRate * days

            let multiplier = 1.0
            if (rentalType === 'daily') multiplier = 1.0
            else if (rentalType === 'weekly' || days >= 7) multiplier = 0.90
            else if (rentalType === 'monthly') multiplier = 0.85

            subtotal = subtotal * multiplier

            const total = subtotal

            setPricing({
                baseRate: baseRate,
                duration: days,
                subtotal: subtotal,
                tax: 0,
                discount: 0,
                total: total
            })
        }

        calculatePrice()
    }, [carData, pickupDate, pickupTime, dropoffDate, dropoffTime, rentalType])


    const handleContinue = async () => {
        if (!carId) {
            toast.error('Vehicle ID missing')
            return
        }

        setChecking(true)
        try {
            // Construct Date objects
            const start = new Date(`${pickupDate}T${pickupTime}`)
            const end = new Date(`${dropoffDate}T${dropoffTime}`)
            const now = new Date()

            if (start < now) {
                toast.error('Pickup time cannot be in the past')
                setChecking(false)
                return
            }

            if (end.getTime() - start.getTime() < 3600000) {
                toast.error('Minimum rental duration is 1 hour')
                setChecking(false)
                return
            }

            // In a real app, strict availability check would happen here
            // const isAvailable = await bookingService.checkAvailability(carId, start, end)
            const isAvailable = true; // Simulating availability for now as bookingService might need updates

            if (!isAvailable) {
                toast.error('Vehicle is not available for these dates')
                setChecking(false)
                return
            }

            toast.success('Vehicle available!')
            navigate('/booking/add-ons')
        } catch (err) {
            console.error(err)
            toast.error('Failed to check availability')
        } finally {
            setChecking(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-32">

            {/* PROGRESS BAR */}
            <div className="fixed top-16 left-0 right-0 h-1 bg-zinc-900 z-40">
                <div className="h-full bg-amber-500 w-[25%]" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row gap-12 pt-8">

                {/* LEFT COLUMN - SELECTION */}
                <div className="flex-1">
                    <div className="mb-10">
                        <span className="text-amber-500 text-[10px] tracking-[0.2em] uppercase font-bold mb-2 block">Step 1: Selection & Pricing</span>
                        <h1 className="text-4xl font-serif text-white mb-2">Rental Details</h1>
                        <p className="text-gray-400 font-light">Configure your rental duration to check availability.</p>
                    </div>

                    {/* Rental Types */}
                    <div className="grid grid-cols-3 gap-6 mb-12">
                        {[
                            { id: 'hourly', label: 'City Commutes', icon: Clock },
                            { id: 'daily', label: 'Road Trips', icon: Briefcase },
                            { id: 'weekly', label: 'Long Term', icon: Calendar },
                        ].map(type => {
                            const Icon = type.icon
                            const isSelected = rentalType === type.id
                            return (
                                <div
                                    key={type.id}
                                    onClick={() => setRentalType(type.id)}
                                    className={`cursor-pointer border rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 ${isSelected ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-zinc-900 hover:bg-zinc-800'}`}
                                >
                                    <div className={`p-3 rounded-full ${isSelected ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-400'}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-white' : 'text-gray-400'}`}>{type.label}</p>
                                        {isSelected && <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest block">Selected ✓</span>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Date Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Pickup */}
                        <div className="bg-zinc-900 p-8 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3 mb-6 text-gray-400">
                                <Plane className="w-5 h-5 -rotate-45" /> <span className="text-xs uppercase tracking-widest font-bold">Pickup</span>
                            </div>
                            <div className="space-y-4">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Calendar className="w-4 h-4" /></span>
                                    <input
                                        type="date"
                                        min={todayStr}
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white text-sm focus:border-amber-500 outline-none transition-colors appearance-none"
                                    />
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Clock className="w-4 h-4" /></span>
                                    <input
                                        type="time"
                                        value={pickupTime}
                                        onChange={(e) => setPickupTime(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white text-sm focus:border-amber-500 outline-none transition-colors appearance-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dropoff */}
                        <div className="bg-zinc-900 p-8 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3 mb-6 text-gray-400">
                                <Plane className="w-5 h-5 rotate-45" /> <span className="text-xs uppercase tracking-widest font-bold">Dropoff</span>
                            </div>
                            <div className="space-y-4">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Calendar className="w-4 h-4" /></span>
                                    <input
                                        type="date"
                                        min={pickupDate || todayStr}
                                        value={dropoffDate}
                                        onChange={(e) => setDropoffDate(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white text-sm focus:border-amber-500 outline-none transition-colors appearance-none"
                                    />
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Clock className="w-4 h-4" /></span>
                                    <input
                                        type="time"
                                        value={dropoffTime}
                                        onChange={(e) => setDropoffTime(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white text-sm focus:border-amber-500 outline-none transition-colors appearance-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Indicator */}
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                        Next: Delivery Options
                    </div>
                </div>

                {/* RIGHT SIDEBAR - PREVIEW */}
                <div className="w-full lg:w-[400px]">
                    <div className="bg-zinc-900 border border-white/5 rounded-xl sticky top-28 overflow-hidden shadow-2xl">
                        {loading ? (
                            <div className="h-48 bg-zinc-800 animate-pulse" />
                        ) : (
                            <div className="h-48 relative">
                                <img
                                    src={(carData?.images && carData.images.length > 0) ? carData.images[0] : (carData ? getCarImage(carData.brand, carData.model) : '/car-placeholder.svg')}
                                    alt={carData ? `${carData.brand} ${carData.model}` : 'Vehicle'}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = '/car-placeholder.svg';
                                    }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase px-2 py-1 flex items-center gap-1 rounded border border-white/10">
                                    <MapPin className="w-3 h-3 text-amber-500" /> Ahmedabad
                                </span>

                            </div>
                        )}

                        <div className="p-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-serif text-white">{carData?.brand || ''} {carData?.model || 'Vehicle'}</h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] uppercase text-gray-400 tracking-wider">
                                        {carData?.transmission || 'Automatic'}
                                    </span>
                                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] uppercase text-gray-400 tracking-wider">
                                        {carData?.fuel_type || 'Petrol'}
                                    </span>
                                </div>
                            </div>


                            <div className="space-y-3 mb-8 pb-8 border-b border-white/5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Rate (Per Day)</span>
                                    <span className="text-white">₹{pricing.baseRate.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Duration</span>
                                    <span className="text-white">{pricing.duration} {pricing.duration === 1 ? 'Day' : 'Days'}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">Total Amount</span>
                                    <span className="text-[10px] text-gray-600 block leading-none">No hidden fees</span>
                                </div>
                                <span className="text-3xl font-serif text-amber-500">₹{Math.round(pricing.total).toLocaleString()}</span>
                            </div>

                            <Button
                                onClick={handleContinue}
                                isLoading={checking}
                                className="w-full bg-white text-black hover:bg-amber-400 hover:text-black h-14 uppercase tracking-widest text-xs font-bold shadow-lg shadow-amber-900/20 mb-4 border border-transparent"
                            >
                                Continue to Delivery <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>

                            <div className="flex justify-center items-center gap-2 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                                <ShieldCheck className="w-3 h-3" /> Secure Booking
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
