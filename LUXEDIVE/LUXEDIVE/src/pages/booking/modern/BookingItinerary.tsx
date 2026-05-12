import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Clock, Calendar as CalendarIcon, Navigation, Building, FileText, CheckCircle2, Info, Calculator, Sparkles, AlertTriangle } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "../../../styles/DatePicker.css"
import { useBooking } from '../../../contexts/BookingContext'
import { useAuth } from '../../../contexts/AuthContext'
import { normalizeDailyRate } from '../../../lib/pricingUtils'
import BookingLayout from '../../../components/layout/BookingLayout'
import { validationService } from '../../../services/validationService'
import { isBefore, addHours, addMonths, differenceInCalendarDays, startOfDay, format, isToday, differenceInHours } from 'date-fns'
import { supabase } from '../../../lib/supabaseClient'
import LocationAutocomplete from '../../../components/booking/LocationAutocomplete'
import { toast } from '../../../lib/toast'
import { addressService } from '../../../services/addressService'
import { motion, AnimatePresence } from 'framer-motion'

export default function BookingItinerary() {
    const { carId } = useParams()
    const { user } = useAuth()
    const { bookingState, updateBooking } = useBooking()
    const car = bookingState.carDetails

    // SCHEDULE STATES
    const [pickupDate, setPickupDate] = useState<Date | null>(() => {
        if (bookingState.pickupDate) return new Date(bookingState.pickupDate)
        // Default: 3 hours from now, rounded to nearest 30 mins
        const d = addHours(new Date(), 3)
        const mins = d.getMinutes()
        d.setMinutes(mins < 15 ? 0 : mins < 45 ? 30 : 60, 0, 0)
        return d
    })
    const [dropoffDate, setDropoffDate] = useState<Date | null>(() => {
        if (bookingState.dropoffDate) return new Date(bookingState.dropoffDate)
        // Default: Pickup + 24 hours (well above the 6h minimum)
        const base = bookingState.pickupDate ? new Date(bookingState.pickupDate) : addHours(new Date(), 3)
        const d = addHours(base, 24)
        const mins = d.getMinutes()
        d.setMinutes(mins < 15 ? 0 : mins < 45 ? 30 : 60, 0, 0)
        return d
    })
    
    // LOGISTICS STATES
    const [pickupLocation, setPickupLocation] = useState(bookingState.pickupLocation || '')
    const [dropoffLocation, setDropoffLocation] = useState(bookingState.dropoffLocation || '')
    const [pickupDetails, setPickupDetails] = useState(bookingState.pickupLocationDetails)
    const [dropoffDetails, setDropoffDetails] = useState(bookingState.dropoffLocationDetails)
    const [city, setCity] = useState(bookingState.city || 'Ahmedabad')
    const [notes, setNotes] = useState(bookingState.notes || '')

    // VALIDATION STATES
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
    const [availabilityError, setAvailabilityError] = useState<string | null>(null)
    const [blockedIntervals, setBlockedIntervals] = useState<{ start: Date; end: Date }[]>([])
    const [today, setToday] = useState(new Date())

    // REAL-TIME UPDATE LOGIC
    const maxBookingDate = useMemo(() => addMonths(today, 2), [today])

    useEffect(() => {
        const timer = setInterval(() => {
            setToday(new Date())
        }, 60000) // Update every minute to keep Today marker fresh
        return () => clearInterval(timer)
    }, [])

    // PRICING LOGIC
    const pricing = useMemo(() => {
        if (!car || !pickupDate || !dropoffDate) return { duration: 0, total: 0, baseDays: 0 }
        const days = differenceInCalendarDays(startOfDay(dropoffDate), startOfDay(pickupDate)) + 1
        if (days <= 0) return { duration: 0, total: 0, baseDays: 0 }
        
        const dailyRate = normalizeDailyRate(car)
        return { duration: days, total: days * dailyRate, baseDays: days }
    }, [car, pickupDate, dropoffDate])

    // AVAILABILITY & BLOCKED DATES FETCH
    useEffect(() => {
        const fetchExistingBookings = async () => {
            if (!carId) return
            try {
                const { data } = await supabase
                    .from('bookings')
                    .select('pickup_datetime, dropoff_datetime')
                    .eq('car_id', carId)
                    .in('status', ['confirmed', 'pending_approval', 'completed'])
                
                if (data) {
                    const intervals = data.map(b => ({
                        start: new Date(b.pickup_datetime),
                        end: addHours(new Date(b.dropoff_datetime), 12) // 12-hour maintenance buffer
                    }))
                    setBlockedIntervals(intervals)
                }
            } catch (err) {
                console.error('Error fetching blocked dates:', err)
            }
        }

        const fetchSavedAddress = async () => {
            // Even if no user, provide a default "Showroom" experience
            const defaultLocation = 'LuxeDive Premium Hub, S.G. Highway, Ahmedabad'
            const defaultDetails = { lat: 23.0225, lng: 72.5714, placeId: 'luxedive-hq' }
            const defaultCity = 'Ahmedabad'

            if (!user) {
                if (!pickupLocation) {
                    setPickupLocation(defaultLocation)
                    setPickupDetails(defaultDetails)
                    setDropoffLocation(defaultLocation)
                    setDropoffDetails(defaultDetails)
                }
                return
            }

            // If we already have a location in state (from localstorage), don't overwrite it
            if (bookingState.pickupLocation && bookingState.pickupLocationDetails) return

            try {
                // Using the secure Service layer which calls the isolated backend
                const data = await addressService.getAddresses()
                
                if (data && data.length > 0) {
                    const addr = data[0]
                    const fullAddress = `${addr.address_line1}${addr.address_line2 ? ', ' + addr.address_line2 : ''}, ${addr.city}`
                    const detailsObj = { lat: 23.0225, lng: 72.5714, placeId: `saved-${addr.id}` } // Fallback coords
                    
                    setPickupLocation(fullAddress)
                    setPickupDetails(detailsObj)
                    setDropoffLocation(fullAddress)
                    setDropoffDetails(detailsObj)
                    setCity(addr.city)
                } else {
                    // FALLBACK FOR NEW USER
                    setPickupLocation(defaultLocation)
                    setPickupDetails(defaultDetails)
                    setDropoffLocation(defaultLocation)
                    setDropoffDetails(defaultDetails)
                    setCity(defaultCity)
                }
            } catch (err) {
                console.error('Error fetching saved address:', err)
                // Fallback on error
                setPickupLocation(defaultLocation)
                setPickupDetails(defaultDetails)
                setDropoffLocation(defaultLocation)
                setDropoffDetails(defaultDetails)
            }
        }

        fetchExistingBookings()
        fetchSavedAddress()
    }, [carId, user])

    useEffect(() => {
        const check = async () => {
            if (!carId || !pickupDate || !dropoffDate || pricing.total === 0) return
            setIsCheckingAvailability(true)
            
            // Check against blocked intervals (Frontend check for buffer consistency)
            const hasOverlap = blockedIntervals.some(interval => {
                const s1 = pickupDate.getTime()
                const e1 = dropoffDate.getTime()
                const s2 = interval.start.getTime()
                const e2 = interval.end.getTime()
                return s1 < e2 && s2 < e1
            })

            if (hasOverlap) {
                setAvailabilityError('Vehicle unavailable or in 12h maintenance buffer.')
                setIsCheckingAvailability(false)
                return
            }

            try {
                const { data: overlaps } = await supabase
                    .from('bookings')
                    .select('id')
                    .eq('car_id', carId)
                    .neq('status', 'cancelled')
                    .neq('status', 'rejected')
                    .or(`and(pickup_datetime.lt."${addHours(dropoffDate, 12).toISOString()}",dropoff_datetime.gt."${pickupDate.toISOString()}")`)
                
                if (overlaps && overlaps.length > 0) setAvailabilityError('Vehicle unavailable for selected timeframe.')
                else setAvailabilityError(null)
            } catch (err) { console.error(err) }
            finally { setIsCheckingAvailability(false) }
        }
        const timer = setTimeout(check, 500)
        return () => clearTimeout(timer)
    }, [carId, pickupDate, dropoffDate, pricing.total, blockedIntervals])

    // GLOBAL STATE SYNC
    useEffect(() => {
        updateBooking({
            pickupDate,
            dropoffDate,
            duration: pricing.duration,
            baseDays: pricing.baseDays,
            carPrice: pricing.total,
            pickupLocation,
            dropoffLocation,
            pickupLocationDetails: pickupDetails,
            dropoffLocationDetails: dropoffDetails,
            city,
            notes,
            totalPrice: (bookingState.chauffeurDetails?.price || 0) + pricing.total
        })
    }, [pickupDate, dropoffDate, pricing.total, pickupLocation, dropoffLocation, pickupDetails, dropoffDetails, city, notes])

    // Real-time Backend Validation for Pickup
    const handlePickupChange = async (newDate: Date) => {
        setPickupDate(newDate);
        
        // IMMEDIATE SYNC: Set dropoff to pickup + 6h
        const initialDropoff = addHours(newDate, 6);
        setDropoffDate(initialDropoff);

        // Call backend validation as a final safety check and for popups
        const result = await validationService.validatePickupTime(newDate);
        
        if (!result.valid && result.autoCorrect) {
            // Backend-requested snap
            const [year, month, day] = result.autoCorrect.date.split('-').map(Number);
            const [hours, mins, secs] = result.autoCorrect.time.split(':').map(Number);
            
            const correctedDate = new Date(year, month - 1, day, hours, mins, secs);
            setPickupDate(correctedDate);
            
            // Re-sync dropoff if pickup was corrected
            const finalDropoff = addHours(correctedDate, 6);
            setDropoffDate(finalDropoff);
        }
    };

    // Real-time Backend Validation for Drop-off
    const handleDropChange = async (pickup: Date, drop: Date) => {
        setDropoffDate(drop);
        
        const result = await validationService.validateDropTime(pickup, drop);
        
        if (!result.valid && result.autoCorrect) {
            const [year, month, day] = result.autoCorrect.date.split('-').map(Number);
            const [hours, mins, secs] = result.autoCorrect.time.split(':').map(Number);
            
            const correctedDate = new Date(year, month - 1, day, hours, mins, secs);
            setDropoffDate(correctedDate);
        }
    };

    // PROACTIVE FILTERING LOGIC
    const filterPickupTime = (time: Date) => {
        const now = new Date();
        const minAllowed = addHours(now, 3);
        const selectedDate = pickupDate || now;
        
        // combine selectedDate's date with time's hours/mins
        const target = new Date(selectedDate);
        target.setHours(time.getHours(), time.getMinutes(), 0, 0);
        
        return !isBefore(target, minAllowed);
    };

    const filterDropoffTime = (time: Date) => {
        if (!pickupDate) return true;
        const minAllowed = addHours(pickupDate, 6);
        const selectedDate = dropoffDate || pickupDate;

        const target = new Date(selectedDate);
        target.setHours(time.getHours(), time.getMinutes(), 0, 0);

        return !isBefore(target, minAllowed);
    };

    const isDurationValid = useMemo(() => {
        if (!pickupDate || !dropoffDate) return true;
        return differenceInHours(dropoffDate, pickupDate) >= 6;
    }, [pickupDate, dropoffDate]);

    const blockedReasons = useMemo(() => {
        const errors: string[] = []
        if (!pickupDate || !dropoffDate) errors.push("Schedule requested: Select timing.")
        else {
            const minTime = addHours(new Date(), 3)
            if (isBefore(pickupDate, minTime)) errors.push("Lead time error: 3-hour notice required.")
            if (isBefore(dropoffDate, pickupDate)) errors.push("Sequence error: Dropoff must follow pickup.")
            if (!isDurationValid) errors.push("Minimum rental duration: 6 hours required.")
            if (isBefore(maxBookingDate, pickupDate)) errors.push("Advance booking error: 2-month maximum.")
        }
        if (!pickupLocation || !pickupDetails) errors.push("Logistics pending: Select pickup address.")
        if (!dropoffLocation || !dropoffDetails) errors.push("Logistics pending: Select dropoff address.")
        if (availabilityError) errors.push(availabilityError)
        return errors
    }, [pickupDate, dropoffDate, pickupLocation, pickupDetails, dropoffLocation, dropoffDetails, availabilityError, isDurationValid])

    const timeWarning = useMemo(() => {
        if (!pickupDate) return null
        const now = new Date()
        
        if (pickupDate < now) {
            return {
                type: 'error',
                message: 'You cannot select a past date. Please choose a valid date.'
            }
        }

        const diff = differenceInHours(pickupDate, now)
        if (isToday(pickupDate) && diff < 3) {
            return {
                type: 'warning',
                message: 'Selected time is too soon. Please choose a time at least 3 hours from now.'
            }
        }

        if (!isDurationValid) {
            return {
                type: 'error',
                message: 'Minimum rental duration is 6 hours. Please extend your dropoff time.'
            }
        }

        return null
    }, [pickupDate, dropoffDate, isDurationValid])

    if (!car) return null

    return (
        <BookingLayout 
            step={3} 
            title="Unified Itinerary" 
            subtitle="Coordinate your temporal and spatial parameters."
            nextDisabled={blockedReasons.length > 0}
            blockedReasons={blockedReasons}
        >
            <div className="flex flex-col xl:grid xl:grid-cols-12 gap-8 mt-10">
                
                {/* PRIMARY MODULES (Timeline + Logistics) */}
                <div className="xl:col-span-9 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* TIMELINE MODULE */}
                        <div className="space-y-6">
                            <SectionHeader icon={<Clock className="w-5 h-5" />} title="Chronos Timeline" />
                            <div className="p-10 bg-zinc-900/30 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] space-y-8 relative group min-h-[360px] flex flex-col justify-center">
                                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/20 group-hover:bg-amber-500/40 transition-colors" />
                                
                                <div className="space-y-8">
                                    <CompactPicker 
                                        label="Pickup" 
                                        date={pickupDate} 
                                        onChange={(d: Date) => handlePickupChange(d)} 
                                        minDate={today}
                                        maxDate={maxBookingDate}
                                        excludeIntervals={blockedIntervals}
                                        filterTime={filterPickupTime}
                                    />
                                    <div className="px-10 py-3 border-l border-dashed border-white/10 ml-5 flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40 animate-pulse" />
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">
                                            {pricing.baseDays > 0 ? `${pricing.baseDays} Day Full Engagement` : 'Temporal Acquisition Pending'}
                                        </span>
                                    </div>
                                    <CompactPicker 
                                        label="Dropoff" 
                                        date={dropoffDate} 
                                        onChange={(d: Date) => {
                                            if (pickupDate) handleDropChange(pickupDate, d);
                                        }} 
                                        minDate={pickupDate || today}
                                        maxDate={maxBookingDate}
                                        excludeIntervals={blockedIntervals}
                                        filterTime={filterDropoffTime}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* LOGISTICS MODULE */}
                        <div className="space-y-6">
                            <SectionHeader icon={<Navigation className="w-5 h-5" />} title="Precision Logistics" />
                            <div className="p-10 bg-zinc-900/30 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] space-y-8 relative group min-h-[360px] flex flex-col justify-center">
                                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/20 group-hover:bg-amber-500/40 transition-colors" />
                                <div className="grid grid-cols-1 gap-8">
                                    <LocationAutocomplete 
                                        label="Pickup Address" 
                                        placeholder="E.g. Terminal 2, Ahmedabad Airport"
                                        value={pickupLocation}
                                        onChange={(addr, det) => { setPickupLocation(addr); setPickupDetails(det) }}
                                    />
                                    <LocationAutocomplete 
                                        label="Dropoff Address" 
                                        placeholder="E.g. Le Meridien Hotel"
                                        value={dropoffLocation}
                                        onChange={(addr, det) => { setDropoffLocation(addr); setDropoffDetails(det) }}
                                    />
                                </div>
                                
                                <div className="relative pt-4">
                                    <textarea 
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Add specific concierge instructions (optional)..."
                                        className="w-full h-24 bg-black/40 border border-white/5 rounded-2xl p-6 text-xs text-white placeholder:text-gray-700 focus:border-amber-500/50 outline-none transition-all resize-none font-medium"
                                    />
                                    <FileText className="absolute right-5 bottom-5 w-4 h-4 text-white/10" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SMART VALIDATION & HORIZONTAL GUIDELINE BOX */}
                    <div className="relative group">
                        <AnimatePresence mode="wait">
                            {timeWarning ? (
                                <motion.div 
                                    key="warning"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-10 bg-amber-500/10 border border-amber-500/20 rounded-[2.5rem] flex items-center gap-8 shadow-[0_0_50px_rgba(245,158,11,0.05)]"
                                >
                                    <div className="w-16 h-16 bg-amber-500/20 rounded-3xl flex items-center justify-center flex-shrink-0 border border-amber-500/30">
                                        <AlertTriangle className="w-8 h-8 text-amber-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-2 font-mono">Attention Required</p>
                                        <p className="text-sm text-amber-100 font-medium leading-relaxed tracking-wide">
                                            ⚠️ {timeWarning.message}
                                        </p>
                                    </div>
                                    <div className="px-6 py-2 bg-amber-500/20 rounded-full border border-amber-500/30 text-[9px] font-black text-amber-500 uppercase tracking-widest animate-pulse">
                                        Action Pending
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="guidelines"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10"
                                >
                                    <div className="flex items-center gap-6 shrink-0">
                                        <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
                                            <Clock className="w-8 h-8 text-gray-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-1 font-mono">Booking Guidelines</h4>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Protocol Version 4.0</p>
                                        </div>
                                    </div>
                                    
                                    <div className="h-12 w-px bg-white/5 hidden md:block" />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                                        <GuidelineBullet text="Minimum 3-hour notice for same-day bookings" />
                                        <GuidelineBullet text="Minimum 6-hour rental duration required" />
                                        <GuidelineBullet text="Last-minute requests subject to approval" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* SUMMARY SLATE */}
                <div className="xl:col-span-3 space-y-6">
                    <SectionHeader icon={<Calculator className="w-5 h-5" />} title="Financial Summary" />
                    <div className="p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent group-hover:via-amber-500 transition-all duration-1000" />
                        
                        <div className="space-y-8">
                            <SummaryRow label="Daily Rate" value={`₹${normalizeDailyRate(car).toLocaleString()}`} />
                            <SummaryRow label="Rental Days" value={`${pricing.baseDays} Days`} />
                            
                            <div className="pt-10 border-t border-white/5">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[11px] text-gray-500 font-black uppercase tracking-[0.4em]">Base Allocation</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-serif text-amber-500 tracking-tighter italic">₹</span>
                                        <span className="text-4xl font-serif text-amber-500 tracking-tighter">{pricing.total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isCheckingAvailability && (
                            <div className="mt-12 flex items-center gap-4 animate-pulse">
                                <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">Verifying Slots...</span>
                            </div>
                        )}
                        
                        {!isCheckingAvailability && !availabilityError && pricing.total > 0 && (
                            <div className="mt-12 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-4 group/status">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover/status:scale-110 transition-transform" />
                                <span className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.3em]">Space Reserved</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BookingLayout>
    )
}

function SectionHeader({ icon, title }: any) {
    return (
        <div className="flex items-center gap-3 px-2">
            <div className="text-amber-500">{icon}</div>
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">{title}</h3>
        </div>
    )
}

function CompactPicker({ label, date, onChange, minDate, maxDate, excludeIntervals, filterTime }: any) {
    return (
        <div className="space-y-3">
            <p className="text-[9px] text-white/40 font-black uppercase tracking-widest ml-1">{label} Protocol</p>
            <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/40 group-hover:text-amber-500 transition-colors pointer-events-none z-10" />
                    <DatePicker
                        selected={date}
                        onChange={(d) => {
                            if (!d) return
                            const newD = date ? new Date(date) : new Date()
                            newD.setFullYear(d.getFullYear(), d.getMonth(), d.getDate())
                            onChange(newD)
                        }}
                        dateFormat="dd/MM/yyyy"
                        minDate={minDate}
                        maxDate={maxDate}
                        excludeDateIntervals={excludeIntervals}
                        className="w-full h-12 bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 text-[11px] font-bold text-white focus:border-amber-500/50 outline-none transition-all cursor-pointer"
                        placeholderText="Select Date"
                        portalId="root"
                    />
                </div>
                <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/40 group-hover:text-amber-500 transition-colors pointer-events-none z-10" />
                    <DatePicker
                        selected={date}
                        onChange={(d) => {
                            if (!d) return
                            const newD = date ? new Date(date) : new Date()
                            newD.setHours(d.getHours(), d.getMinutes())
                            onChange(newD)
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        filterTime={filterTime}
                        dateFormat="h:mm aa"
                        className="w-full h-12 bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 text-[11px] font-bold text-white focus:border-amber-500/50 outline-none transition-all cursor-pointer"
                        placeholderText="Time"
                        portalId="root"
                    />
                </div>
            </div>
        </div>
    )
}

function SummaryRow({ label, value }: any) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{label}</span>
            <span className="text-xs text-white font-medium">{value}</span>
        </div>
    )
}

function GuidelineBullet({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-amber-500/40 rounded-full" />
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium italic">
                {text}
            </p>
        </div>
    )
}
