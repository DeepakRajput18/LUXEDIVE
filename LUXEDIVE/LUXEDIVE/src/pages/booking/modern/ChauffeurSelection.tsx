import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserCheck, Shield, Star, Award, CheckCircle2, XCircle, Loader2, Sparkles, Zap, ShieldCheck, Languages } from 'lucide-react'
import { useBooking } from '../../../contexts/BookingContext'
import BookingLayout from '../../../components/layout/BookingLayout'
import { chauffeurService } from '../../../services/chauffeurService'

export default function ChauffeurSelection() {
    const navigate = useNavigate()
    const { carId } = useParams()
    const { bookingState, updateBooking } = useBooking()
    const [withChauffeur, setWithChauffeur] = useState<boolean | null>(
        bookingState.chauffeurDetails ? true : (bookingState.chauffeurRequired === false ? false : null)
    )
    const [selectedDriver, setSelectedDriver] = useState<any>(bookingState.chauffeurDetails || null)
    const [drivers, setDrivers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const data = await chauffeurService.getChauffeurs()
                setDrivers(data.slice(0, 6))
            } finally {
                setLoading(false)
            }
        }
        fetchDrivers()
    }, [])

    useEffect(() => {
        if (withChauffeur === true) {
            // Only update if we actually have a selected driver
            if (selectedDriver) {
                const dailyFee = selectedDriver.price_per_day || selectedDriver.pricePerDay || 2500
                const price = dailyFee * (bookingState.duration || 1)
                updateBooking({ 
                    chauffeurDetails: { ...selectedDriver, price, price_per_day: dailyFee },
                    chauffeurRequired: true,
                    totalPrice: (bookingState.carPrice || 0) + price
                })
            } else {
                // If they picked Chauffeur but NOT a driver yet, ensure context reflects "Chauffeur Required" but NO specific details/price
                updateBooking({ 
                    chauffeurDetails: null,
                    chauffeurRequired: true,
                    totalPrice: (bookingState.carPrice || 0)
                })
            }
        } else if (withChauffeur === false) {
            updateBooking({ 
                chauffeurDetails: null,
                chauffeurRequired: false,
                totalPrice: (bookingState.carPrice || 0)
            })
        }
    }, [withChauffeur, selectedDriver?.id, bookingState.duration, bookingState.carPrice])

    const blockedReasons = React.useMemo(() => {
        const errors: string[] = []
        if (withChauffeur === null) {
            errors.push("Tier Selection: Choose your preferred mobility protocol (Self-Drive or Chauffeur).")
        } else if (withChauffeur === true && !selectedDriver) {
            errors.push("Assignment Pending: Select an elite captain from the signature dossiers.")
        }
        return errors
    }, [withChauffeur, selectedDriver])

    return (
        <BookingLayout 
            step={4} 
            title="Service Tier" 
            subtitle="Select your preferred mode of professional conduct."
            nextDisabled={blockedReasons.length > 0}
            blockedReasons={blockedReasons}
        >
            <div className="flex flex-col gap-16 mt-10">
                
                {/* MODE SELECTION - IMMERSIVE SPLIT */}
                <div className="flex flex-col md:flex-row gap-8">
                    <ModeCard 
                        label="Private Autonomy" 
                        badge="Self-Drive"
                        desc="Absolute command over the vehicle with complete privacy. Your journey, your rules." 
                        icon={<Zap className="w-6 h-6" />}
                        isSelected={withChauffeur === false}
                        onClick={() => setWithChauffeur(false)}
                        accentColor="amber-500"
                    />
                    <ModeCard 
                        label="Professional Command" 
                        badge="Chauffeur Tier"
                        desc="Delegate the logistics. Our elite crew handles every maneuver with surgical precision." 
                        icon={<Award className="w-6 h-6" />}
                        isSelected={withChauffeur}
                        onClick={() => setWithChauffeur(true)}
                        accentColor="amber-500"
                        isPremium
                    />
                </div>

                {/* ELITE CAPTAIN GRID (CHAUFFEUR MODE) */}
                {withChauffeur && (
                    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <div className="flex items-center justify-between mb-10 px-4">
                            <div className="flex items-center gap-4">
                                <div className="w-1 h-8 bg-amber-500" />
                                <div>
                                    <h3 className="text-xl font-serif text-white uppercase tracking-widest">Signature Dossiers</h3>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mt-1">Available Fleet Captains</p>
                                </div>
                            </div>
                            <div className="hidden lg:flex items-center gap-6">
                                <ServiceStat label="Vetted Stats" value="100%" />
                                <div className="w-[1px] h-6 bg-white/5" />
                                <ServiceStat label="Avg. Response" value="15min" />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {loading ? (
                                <div className="col-span-full py-20 flex flex-col items-center justify-center gap-6">
                                    <div className="relative w-16 h-16">
                                        <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
                                        <div className="absolute inset-0 border-t-2 border-amber-500 rounded-full animate-spin" />
                                    </div>
                                    <p className="text-[10px] uppercase font-black tracking-[0.4em] text-gray-500 animate-pulse">Running Background Background Protocol</p>
                                </div>
                            ) : drivers.map((driver, idx) => (
                                <EliteCaptainCard 
                                    key={driver.id} 
                                    driver={driver} 
                                    index={idx}
                                    isSelected={selectedDriver?.id === driver.id}
                                    onClick={() => navigate(`/booking/${carId}/chauffeur/${driver.id}`)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* CONCIERGE GUARANTEE SLATE */}
                <div className="p-10 bg-white/[0.01] border border-white/5 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        <Benefit 
                            icon={<ShieldCheck className="w-5 h-5 text-amber-500" />} 
                            title="Signature Safety" 
                            desc="Every captain undergoes a rigorous 50-point protocol and background clearance." 
                        />
                        <Benefit 
                            icon={<Languages className="w-5 h-5 text-amber-500" />} 
                            title="Global Proficiency" 
                            desc="Multilingual competence including English, Hindi, and local excellence." 
                        />
                        <Benefit 
                            icon={<Zap className="w-5 h-5 text-amber-500" />} 
                            title="Instant Handover" 
                            desc="Real-time tracking and zero-wait-time rendezvous guaranteed." 
                        />
                    </div>
                </div>
            </div>
        </BookingLayout>
    )
}

function ModeCard({ label, badge, desc, icon, isSelected, onClick, accentColor, isPremium }: any) {
    const theme = {
        'amber-500': {
            border: 'border-amber-500/50',
            glow: 'bg-amber-500/10',
            iconBg: 'bg-amber-500',
            text: 'text-amber-500',
            checkBg: 'bg-amber-500',
            indicator: 'bg-amber-500'
        },
        'zinc-500': {
            border: 'border-zinc-500/50',
            glow: 'bg-zinc-500/10',
            iconBg: 'bg-zinc-500',
            text: 'text-zinc-500',
            checkBg: 'bg-zinc-500',
            indicator: 'bg-zinc-500'
        }
    }[accentColor as 'amber-500' | 'zinc-500'] || {
        border: 'border-white/5',
        glow: 'bg-white/5',
        iconBg: 'bg-white/5',
        text: 'text-gray-600',
        checkBg: 'bg-white/5',
        indicator: 'bg-white/20'
    }

    return (
        <div 
            onClick={onClick}
            className={`flex-1 cursor-pointer p-12 rounded-[2.5rem] border transition-all duration-700 relative overflow-hidden group ${
                isSelected 
                    ? `bg-white/[0.03] ${theme.border} shadow-[0_20px_60px_rgba(0,0,0,0.5)]` 
                    : 'bg-zinc-900/30 border-white/5 hover:bg-white/[0.02] hover:border-white/10'
            }`}
        >
            {/* Background Glow */}
            {isSelected && (
                <div className={`absolute -right-20 -bottom-20 w-64 h-64 ${theme.glow} blur-[100px] pointer-events-none animate-pulse`} />
            )}
            
            <div className="relative z-10">
                <div className={`w-16 h-16 rounded-[1.2rem] flex items-center justify-center mb-8 transition-all duration-700 ${
                    isSelected ? `${theme.iconBg} text-black rotate-3 shadow-[0_10px_30px_rgba(212,175,55,0.4)]` : 'bg-white/5 text-gray-500 group-hover:scale-105 group-hover:rotate-6 group-hover:text-white'
                }`}>
                    {icon}
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isSelected ? theme.text : 'text-gray-600'}`}>
                        {badge}
                    </span>
                    {isPremium && (
                        <div className="px-2 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/20">
                            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                        </div>
                    )}
                </div>
                
                <h4 className={`text-3xl font-serif mb-4 transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {label}
                </h4>
                
                <p className="text-sm text-gray-600 font-light leading-relaxed max-w-[320px] transition-colors group-hover:text-gray-400">
                    {desc}
                </p>

                <div className="absolute top-0 right-0">
                    {isSelected ? (
                         <div className={`p-2 ${theme.checkBg} rounded-bl-[1.5rem] shadow-xl`}>
                            <CheckCircle2 className="w-5 h-5 text-black" />
                         </div>
                    ) : (
                        <div className="p-10 opacity-0 group-hover:opacity-10 transition-opacity">
                             <Zap className="w-20 h-20 text-white" />
                        </div>
                    )}
                </div>
            </div>
            
            {/* Visual Indicator Line */}
            <div className={`absolute bottom-0 left-0 h-[3px] transition-all duration-700 ${isSelected ? `w-full ${theme.indicator}` : 'w-0 bg-white/20'}`} />
        </div>
    )
}

function EliteCaptainCard({ driver, isSelected, onClick, index }: any) {
    return (
        <div 
            onClick={onClick}
            className={`cursor-pointer group p-8 rounded-[3rem] bg-zinc-900/40 border transition-all duration-700 relative animate-in fade-in slide-in-from-bottom-4 ${
                isSelected 
                    ? 'border-amber-500/40 shadow-[0_30px_80px_rgba(0,0,0,0.6)]' 
                    : 'border-white/5 hover:bg-white/[0.01] hover:border-white/10 hover:-translate-y-2'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                    <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-amber-500/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img 
                            src={driver.profilePhoto} 
                            className="w-24 h-24 rounded-[2rem] object-cover object-[center_20%] grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10" 
                            alt={driver.fullName} 
                        />
                        {isSelected && (
                            <div className="absolute -top-3 -right-3 bg-amber-500 text-black p-2 rounded-xl shadow-xl z-10 animate-in zoom-in-75">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                             <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Elite Protocol V01</p>
                        </div>
                        <h5 className="text-xl font-serif text-white mb-2 leading-none">{driver.fullName}</h5>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-[10px] text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-full">
                                <Star className="w-3 h-3 fill-amber-500" /> {driver.rating}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">{driver.experienceYears}Y Experience</span>
                        </div>
                    </div>
                </div>

                {/* Performance Visuals */}
                <div className="space-y-4">
                    <CaptainStat label="Service Mastery" width="94%" />
                    <CaptainStat label="Route Navigation" width="98%" />
                </div>
                
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mb-1">Service Entitlement</p>
                        <p className="text-lg font-serif text-white tracking-widest">₹{driver.pricePerDay.toLocaleString()}<span className="text-xs text-gray-500 ml-1">/ DAY</span></p>
                    </div>
                    {!isSelected && (
                         <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-500 group-hover:text-amber-500 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
                             <CheckCircle2 className="w-5 h-5" />
                         </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function CaptainStat({ label, width }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[8px] text-gray-500 uppercase font-black tracking-widest">
                <span>{label}</span>
                <span className="text-gray-400">{width}</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500/40 group-hover:bg-amber-500 transition-all duration-1000" style={{ width }} />
            </div>
        </div>
    )
}

function ServiceStat({ label, value }: any) {
    return (
        <div className="text-right">
            <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mb-1">{label}</p>
            <p className="text-lg font-serif text-white tracking-tighter">{value}</p>
        </div>
    )
}

function Benefit({ icon, title, desc }: any) {
    return (
        <div className="flex flex-col gap-6 p-2 group/item">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/5 group-hover/item:border-amber-500/20 group-hover/item:bg-amber-500/10 transition-all duration-500">
                {icon}
            </div>
            <div>
                <h5 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-4 group-hover/item:text-amber-500 transition-colors">{title}</h5>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed tracking-wide group-hover/item:text-gray-300 transition-colors">{desc}</p>
            </div>
        </div>
    )
}
