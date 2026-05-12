import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Clock, Calendar as CalendarIcon, Info, Calculator, CheckCircle2, AlertCircle } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import "../../../styles/DatePicker.css"
import { useBooking } from '../../../contexts/BookingContext'
import { normalizeDailyRate } from '../../../lib/pricingUtils'
import BookingLayout from '../../../components/layout/BookingLayout'
import { isAfter, isSameDay, differenceInCalendarDays, startOfDay, addHours, isBefore, format } from 'date-fns'
import { supabase } from '../../../lib/supabaseClient'
import { Modal } from '../../../components/ui/Modal'
import { AlertTriangle } from 'lucide-react'
import { toast } from '../../../lib/toast'
export default function BookingOptions() {
    const navigate = useNavigate()
    const { carId } = useParams()
    const { bookingState, updateBooking } = useBooking()
    const car = bookingState.carDetails

    const rentalType = 'daily'
    
    // Default to null for clean UX as requested
    const [pickupDate, setPickupDate] = useState<Date | null>(bookingState.pickupDate ? new Date(bookingState.pickupDate) : null)
    const [dropoffDate, setDropoffDate] = useState<Date | null>(bookingState.dropoffDate ? new Date(bookingState.dropoffDate) : null)
    
    // New validation states
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
    const [availabilityError, setAvailabilityError] = useState<string | null>(null)
    const [showErrorModal, setShowErrorModal] = useState(false)
    
    const triggerAlert = (msg: string) => {
        toast(msg, "warning")
    }

    const pricing = useMemo(() => {
        if (!car || !pickupDate || !dropoffDate) return { duration: 0, total: 0, baseDays: 0 }
        
        // Use calendar days calculation
        const days = differenceInCalendarDays(startOfDay(dropoffDate), startOfDay(pickupDate)) + 1
        
        if (days <= 0) return { duration: 0, total: 0, baseDays: 0, error: 'Dropoff must be on or after pickup' }
        
        // Validate minimum 3-hour lead time
        if (pickupDate) {
            const minTime = addHours(new Date(), 3)
            if (isBefore(pickupDate, minTime)) {
                return { duration: 0, total: 0, baseDays: 0, error: 'LEAD_TIME_ERROR' }
            }
        }
        
        if (pickupDate && dropoffDate && isBefore(dropoffDate, pickupDate)) {
            return { duration: 0, total: 0, baseDays: 0, error: 'DROPOFF_BEFORE_PICKUP' }
        }

        const dailyRate = normalizeDailyRate(car)
        const total = days * dailyRate
        
        return { 
            duration: days, 
            total,
            baseDays: days
        }
    }, [car, pickupDate, dropoffDate])

    // Availability Check Effect
    useEffect(() => {
        const verifyAvailability = async () => {
            if (!carId || !pickupDate || !dropoffDate || pricing.total === 0) return;

            setIsCheckingAvailability(true);
            setAvailabilityError(null);

            try {
                const { data: overlaps, error } = await supabase
                    .from('bookings')
                    .select('id')
                    .eq('car_id', carId)
                    .neq('status', 'cancelled')
                    .or(`and(pickup_datetime.lte."${dropoffDate.toISOString()}",dropoff_datetime.gte."${pickupDate.toISOString()}")`);

                if (error) throw error;

                if (overlaps && overlaps.length > 0) {
                    setAvailabilityError('This vehicle is already booked for the selected timeframe.');
                    setShowErrorModal(true);
                }
            } catch (err) {
                console.error('Availability check failed:', err);
            } finally {
                setIsCheckingAvailability(false);
            }
        };

        const timer = setTimeout(verifyAvailability, 500);
        return () => clearTimeout(timer);
    }, [carId, pickupDate, dropoffDate, pricing.total]);

    useEffect(() => {
        if (pricing.total > 0 && pickupDate && dropoffDate) {
            updateBooking({
                rentalType,
                pickupDate,
                dropoffDate,
                duration: pricing.duration,
                baseDays: pricing.baseDays,
                carPrice: pricing.total,
                totalPrice: (bookingState.chauffeurDetails?.price || 0) + pricing.total
            })
        }
    }, [pricing.total, pricing.duration, pricing.baseDays, rentalType, pickupDate, dropoffDate, updateBooking, bookingState.chauffeurDetails?.price])
    
    // SMART FIX: Collect all validation errors
    const blockedReasons = useMemo(() => {
        const errors: string[] = []
        
        if (!pickupDate || !dropoffDate) {
            errors.push("Select both pickup and dropoff dates")
        } else {
            const minTime = addHours(new Date(), 3)
            if (isBefore(pickupDate, minTime)) {
                errors.push("Pickup time must be at least 3 hours from now")
            }
            if (isBefore(dropoffDate, pickupDate)) {
                errors.push("Dropoff date/time must be after the pickup")
            }
            if (pricing.total === 0) {
                errors.push("Duration must be at least 1 day")
            }
        }
        
        if (isCheckingAvailability) errors.push("Checking vehicle availability...")
        if (availabilityError) errors.push(availabilityError)
        
        return errors
    }, [pickupDate, dropoffDate, isCheckingAvailability, availabilityError, pricing.error, pricing.total])

    if (!car) return null

    return (
        <BookingLayout 
            step={3} 
            title="Rental Configuration" 
            subtitle="Define your journey's temporal parameters."
            nextDisabled={blockedReasons.length > 0}
            blockedReasons={blockedReasons}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
                <div className="lg:col-span-12">
                    <div className="p-8 bg-amber-500/10 border border-amber-500/20 rounded-[2rem] flex items-center gap-6">
                        <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-black shadow-xl shrink-0">
                            <CalendarIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-serif text-white mb-1 tracking-tight">Daily Rental Mode</h4>
                            <p className="text-sm text-gray-400 font-light">Your journey is calculated on a per-day basis for maximum flexibility.</p>
                        </div>
                        <div className="ml-auto hidden md:block">
                            <span className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-[10px] text-amber-500 font-black uppercase tracking-widest">Active Selection</span>
                        </div>
                    </div>
                </div>

                {/* DATE & TIME PICKERS */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6 p-8 bg-zinc-900/50 border border-white/5 rounded-[2rem]">
                            <div className="flex items-center gap-3 text-gray-500 mb-2">
                                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Pickup Parameters</span>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black ml-1">Calendar Date</label>
                                    <div className="date-picker-container">
                                        <CalendarIcon className="w-5 h-5 text-amber-500" />
                                        <DatePicker
                                            selected={pickupDate}
                                            onChange={(date) => {
                                                const d = date || new Date();
                                                let newD = pickupDate ? new Date(pickupDate) : new Date();
                                                newD.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
                                                
                                                const minTime = addHours(new Date(), 3);
                                                if (isBefore(newD, minTime)) {
                                                    newD = minTime; // Reset both date and time to the minimum allowed
                                                    triggerAlert("Date/Time adjusted to meet 3-hour minimum notice");
                                                }
                                                
                                                setPickupDate(newD);
                                                
                                                if (dropoffDate && isBefore(dropoffDate, newD)) {
                                                    setDropoffDate(newD);
                                                }
                                                setAvailabilityError(null);
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            minDate={new Date()}
                                            placeholderText="Select Date"
                                            className="date-picker-input"
                                            calendarClassName="react-datepicker"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black ml-1">Pickup Time</label>
                                    <div className="date-picker-container">
                                        <Clock className="w-5 h-5 text-amber-500" />
                                        <DatePicker
                                            selected={pickupDate}
                                            onChange={(date) => {
                                                if (!date) return;
                                                let newD = pickupDate ? new Date(pickupDate) : new Date();
                                                newD.setHours(date.getHours(), date.getMinutes());
                                                
                                                // 3-hour lead time check
                                                const minTime = addHours(new Date(), 3);
                                                if (isBefore(newD, minTime)) {
                                                    newD = minTime; // Reset both date and time to valid threshold
                                                    triggerAlert("Minimum 3 hours advance booking required");
                                                }
                                                
                                                setPickupDate(newD);
                                                setAvailabilityError(null);
                                            }}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            placeholderText="Select Time"
                                            className="date-picker-input"
                                            calendarClassName="react-datepicker"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 p-8 bg-zinc-900/50 border border-white/5 rounded-[2rem]">
                            <div className="flex items-center gap-3 text-gray-500 mb-2">
                                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Dropoff Parameters</span>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black ml-1">Calendar Date</label>
                                    <div className="date-picker-container">
                                        <CalendarIcon className="w-5 h-5 text-amber-500" />
                                        <DatePicker
                                            selected={dropoffDate}
                                            onChange={(date) => {
                                                const d = date || new Date();
                                                const newD = dropoffDate ? new Date(dropoffDate) : new Date();
                                                newD.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
                                                
                                                if (pickupDate && isBefore(newD, pickupDate)) {
                                                    newD.setHours(pickupDate.getHours() + 1, pickupDate.getMinutes());
                                                    triggerAlert("Time adjusted to be after pickup");
                                                }
                                                
                                                setDropoffDate(newD);
                                                setAvailabilityError(null);
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            minDate={pickupDate || new Date()}
                                            placeholderText="Select Date"
                                            className="date-picker-input"
                                            calendarClassName="react-datepicker"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black ml-1">Dropoff Time</label>
                                    <div className="date-picker-container">
                                        <Clock className="w-5 h-5 text-amber-500" />
                                        <DatePicker
                                            selected={dropoffDate}
                                            onChange={(date) => {
                                                if (!date) return;
                                                let newD = dropoffDate ? new Date(dropoffDate) : new Date();
                                                newD.setHours(date.getHours(), date.getMinutes());
                                                
                                                if (pickupDate && isBefore(newD, pickupDate)) {
                                                    newD = new Date(pickupDate.getTime() + 60 * 60 * 1000); // Add 1 hour to pickup date
                                                    triggerAlert("Dropoff must be after pickup time");
                                                }
                                                
                                                setDropoffDate(newD);
                                                setAvailabilityError(null);
                                            }}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            placeholderText="Select Time"
                                            className="date-picker-input"
                                            calendarClassName="react-datepicker"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[2rem] space-y-6">
                        <div className="flex items-center gap-3">
                            <Info className="w-5 h-5 text-amber-500" />
                            <h4 className="text-sm font-serif text-white uppercase tracking-widest">Rental Policy</h4>
                        </div>
                        <div className="space-y-4">
                            <PolicyItem text="A minimum lead time of 3 hours is required prior to vehicle handover." />
                            <PolicyItem text="Billing is strictly per calendar day; any partial day usage overlapping into the next day incurs a full day's charge." />
                            <PolicyItem text="Late returns are subject to a strict penalty charge of 5% of the daily rental rate per delayed hour." />
                        </div>
                    </div>
                </div>

                {/* LIVE PRICING PREVIEW */}
                <div className="lg:col-span-4 lg:sticky lg:top-32">
                    <div className="p-8 bg-[#08090B] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Calculator className="w-32 h-32" />
                        </div>
                        
                        <h3 className="text-xl font-serif text-white mb-6 uppercase tracking-wider relative z-10">Pricing Breakdown</h3>
                        
                        <div className="space-y-4 mb-8 relative z-10">
                            <PriceRow label="Base Rate" value={`₹${normalizeDailyRate(car).toLocaleString()}/day`} />
                            <PriceRow label="Total Days" value={`${pricing.baseDays} ${pricing.baseDays === 1 ? 'Day' : 'Days'}`} />
                            
                            <div className="h-[1px] bg-white/5 my-4" />
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Total Amount</span>
                                <span className="text-2xl font-serif text-amber-500">₹{Math.round(pricing.total).toLocaleString()}</span>
                            </div>
                        </div>
                        {isCheckingAvailability && (
                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex items-center gap-3 mt-4 animate-pulse">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Checking Availability...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal 
                isOpen={showErrorModal} 
                onClose={() => setShowErrorModal(false)}
                className="max-w-md"
            >
                <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-2">Booking Unavailable</h3>
                    <p className="text-sm text-gray-400 font-light mb-8">
                        {availabilityError || 'Selected dates overlap with an existing booking. Please choose another timeframe.'}
                    </p>
                    <button 
                        onClick={() => setShowErrorModal(false)}
                        className="w-full py-4 bg-amber-500 text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-amber-400 transition-colors"
                    >
                        Adjust Schedule
                    </button>
                </div>
            </Modal>
        </BookingLayout>
    )
}

function PolicyItem({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <p className="text-[11px] text-white font-normal leading-relaxed tracking-wide">
                {text}
            </p>
        </div>
    )
}


function PriceRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-light">{label}</span>
            <span className="text-white font-medium">{value}</span>
        </div>
    )
}
