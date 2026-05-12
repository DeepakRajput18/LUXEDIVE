import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Users, Fuel, Gauge, Box, Rotate3d, Info, CheckCircle2, ShieldCheck, Sparkles, Zap, Trophy } from 'lucide-react'
import { useBooking } from '../../../contexts/BookingContext'
import { carService } from '../../../services/carService'
import { getCarImage } from '../../../lib/placeholders'
import { normalizeDailyRate } from '../../../lib/pricingUtils'
import BookingLayout from '../../../components/layout/BookingLayout'

export default function BookingDetails360() {
    const { carId } = useParams()
    const navigate = useNavigate()
    const { bookingState, updateBooking } = useBooking()
    const [loading, setLoading] = useState(!bookingState.carDetails || bookingState.carId !== carId)

    useEffect(() => {
        if (!carId) return
        
        const fetchCar = async () => {
            setLoading(true)
            updateBooking({ carDetails: null }) // Clear stale data
            try {
                const car = await carService.getCarById(carId)
                if (car) {
                    const dailyRate = normalizeDailyRate(car)
                    updateBooking({ 
                        carId: car.id, 
                        carDetails: car,
                        totalPrice: dailyRate 
                    })
                }
            } catch (err) {
                console.error("Failed to load car details", err)
            } finally {
                setLoading(false)
            }
        }

        if (!bookingState.carDetails || bookingState.carId !== carId) {
            fetchCar()
        } else {
            setLoading(false)
        }
    }, [carId, updateBooking, bookingState.carId, bookingState.carDetails])

    const car = bookingState.carDetails

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-8">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
                    <div className="absolute inset-0 border-t-2 border-amber-500 rounded-full animate-spin" />
                    <Rotate3d className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-amber-500 animate-pulse" />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] text-white font-black uppercase tracking-[0.4em] animate-pulse">Initializing Showroom</p>
                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                </div>
            </div>
        </div>
    )

    if (!car) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <p className="text-sm font-light tracking-[0.2em] uppercase">Vehicle not found.</p>
        </div>
    )

    return (
        <BookingLayout 
            step={2} 
            title={car.brand} 
            subtitle={car.model}
        >
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mt-10">
                
                {/* LEFT: TECH SHOWCASE */}
                <div className="w-full lg:col-span-4 space-y-10 order-2 lg:order-1">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] blur opacity-25" />
                        <div className="relative p-10 bg-zinc-900/30 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
                                    <Zap className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1">Performance</h2>
                                    <p className="text-lg font-serif text-white tracking-widest uppercase">Technical Specs</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-5">
                                <SpecItem icon={<Users className="w-4 h-4" />} label="Seating" value={`${car.seats || 2} Persons`} index={1} />
                                <SpecItem icon={<Fuel className="w-4 h-4" />} label="Refined" value={car.fuel_type || 'Premium'} index={2} />
                                <SpecItem icon={<Gauge className="w-4 h-4" />} label="Power" value={car.transmission || 'Automatic'} index={3} />
                                <SpecItem icon={<Trophy className="w-4 h-4" />} label="Elite" value={car.category} index={4} />
                            </div>
                        </div>
                    </div>

                    {/* CONCIERGE PRICING SLATE */}
                    <div className="relative">
                        <div className="absolute top-0 right-10 -translate-y-1/2 bg-amber-500 text-black text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-[0_5px_15px_rgba(212,175,55,0.4)] z-10">
                            Available Now
                        </div>
                        <div className="p-10 bg-white/[0.03] border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] group-hover:bg-amber-500/10 transition-colors duration-1000" />
                            
                            <div className="flex justify-between items-start mb-8">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Exclusive Daily Rate</span>
                                <Sparkles className="w-4 h-4 text-amber-500/40" />
                            </div>
                            
                            <div className="flex items-end gap-3 mb-8">
                                <span className="text-4xl font-serif text-white tracking-tighter">₹{normalizeDailyRate(car).toLocaleString()}</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mb-1">/ PER DAY</span>
                            </div>

                            <div className="space-y-4">
                                <TrustPoint label="End-to-end Luxury Insurance" />
                                <TrustPoint label="White Glove Delivery Service" />
                                <TrustPoint label="24/7 Elite Roadside Protocol" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: INTERACTIVE STUDIO */}
                <div className="w-full lg:col-span-8 order-1 lg:order-2">
                    <div className="relative aspect-[16/10] bg-[#060709] rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-2xl">
                        {/* Studio Background Effects */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.04)_0%,transparent_60%)] pointer-events-none" />
                        <div className="h-full relative flex flex-col">
                            <div className="flex-1 flex items-center justify-center p-12">
                                <img 
                                    src={car.images?.[0] || getCarImage(car.brand, car.model)} 
                                    className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                                    alt={car.model}
                                />
                            </div>
                            <div className="h-32 w-full absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent" />
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 px-8 py-4 bg-white/[0.02] backdrop-blur-xl rounded-full border border-white/5">
                                <div className="w-8 h-[1px] bg-amber-500/40" />
                                <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.5em]">Fixed Perspective</span>
                                <div className="w-8 h-[1px] bg-amber-500/40" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BookingLayout>
    )
}

function SpecItem({ icon, label, value, index }: { icon: React.ReactNode, label: string, value: string, index: number }) {
    return (
        <div 
            className="p-6 rounded-[1.8rem] bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center text-center group hover:bg-amber-500/10 hover:border-amber-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
        >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-amber-500 group-hover:bg-amber-500/10 group-hover:scale-110 transition-all duration-500 mb-4 border border-white/5">
                {icon}
            </div>
            <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mb-1 px-2 border-b border-transparent group-hover:border-amber-500/20 transition-all">{label}</p>
            <p className="text-[11px] text-gray-300 font-bold group-hover:text-white transition-colors">{value}</p>
        </div>
    )
}

function TrustPoint({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-3 group">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-500 transition-colors" />
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-500">{label}</span>
        </div>
    )
}
