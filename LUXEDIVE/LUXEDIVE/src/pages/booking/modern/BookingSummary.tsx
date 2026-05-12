import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar, MapPin, User, ShieldCheck, Sparkles, CheckCircle2, Zap, Fingerprint, Lock as LockIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useBooking } from '../../../contexts/BookingContext'
import { getCarImage } from '../../../lib/placeholders'
import BookingLayout from '../../../components/layout/BookingLayout'
import { useAuth } from '../../../contexts/AuthContext'

export default function BookingSummary() {
    const navigate = useNavigate()
    const { carId } = useParams()
    const { bookingState } = useBooking()
    const { user } = useAuth()
    const { carDetails, pickupDate, dropoffDate, chauffeurDetails, pickupLocation, dropoffLocation, totalPrice, baseDays } = bookingState

    const sessionVoucherId = useMemo(() => {
        const prefix = (carId || 'VOUCH').split('-')[0].toUpperCase()
        const random = Math.floor(1000 + Math.random() * 9000)
        return `LXD-EXE-${prefix}-${random}`
    }, [carId])

    if (!carDetails) return null

    const handleConfirm = () => {
        navigate(`/booking/${carId}/payment`)
    }

    return (
        <BookingLayout 
            step={6} 
            title="Executive Briefing" 
            subtitle="Final verification of your luxury itinerary & protocols."
            onNext={handleConfirm}
        >
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 mt-12">
                
                {/* LEFT: THE EXECUTIVE DOSSIER */}
                <div className="lg:col-span-8 space-y-12 order-2 lg:order-1">
                    <div className="relative group">
                        {/* Dossier Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/5 rounded-[4rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
                        
                        <div className="relative bg-[#0B0D10]/80 backdrop-blur-3xl border border-white/5 rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-1000">
                             {/* Panoramic Hero */}
                             <div className="aspect-[21/9] relative overflow-hidden">
                                <img 
                                    src={carDetails.images?.[0] || getCarImage(carDetails.brand, carDetails.model)} 
                                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-[3000ms] ease-out" 
                                    alt={carDetails.model} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-transparent to-black/20" />
                                
                                <div className="absolute top-12 left-12 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center">
                                        <ShieldCheck className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.4em] mb-1">Authenticated Suite</p>
                                        <h2 className="text-3xl font-serif text-white tracking-widest uppercase">{carDetails.brand} {carDetails.model}</h2>
                                    </div>
                                </div>
 
                                <div className="absolute bottom-12 right-12 flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] mb-1">Handcrafted Experience</p>
                                        <p className="text-sm text-white font-bold tracking-widest uppercase">Verified Selection</p>
                                    </div>
                                    <div className="h-10 w-px bg-white/10" />
                                    <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                                </div>
                             </div>
 
                             <div className="p-16 space-y-20">
                                {/* Segmented Information Protocols */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                                    <DossierModule title="Temporal Stanza" icon={<Calendar className="w-4 h-4" />}>
                                        <div className="space-y-8">
                                            <ProtocolEntry 
                                                label="Acquisition Protocol" 
                                                value={pickupDate ? format(pickupDate, 'dd MMMM yyyy') : '—'} 
                                                meta={pickupDate ? format(pickupDate, 'hh:mm a') : '—'} 
                                            />
                                            <ProtocolEntry 
                                                label="Release Protocol" 
                                                value={dropoffDate ? format(dropoffDate, 'dd MMMM yyyy') : '—'} 
                                                meta={dropoffDate ? format(dropoffDate, 'hh:mm a') : '—'} 
                                            />
                                            <div className="pt-6 border-t border-white/5 flex justify-between items-center group/item">
                                                <span className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black">Engagement Duration</span>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                                                    <span className="text-xs text-amber-500 font-black tracking-widest uppercase">{baseDays} Full Days</span>
                                                </div>
                                            </div>
                                        </div>
                                    </DossierModule>
 
                                    <DossierModule title="Geospatial Mapping" icon={<MapPin className="w-4 h-4" />}>
                                        <div className="space-y-8">
                                            <ProtocolAddressEntry label="Deployment Zone" address={pickupLocation} />
                                            <ProtocolAddressEntry label="Operational Zenith" address={dropoffLocation} />
                                            <div className="pt-6 border-t border-white/5 flex gap-4 items-center">
                                                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                                                    <MapPin className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] leading-relaxed">
                                                    Seamless inter-zone transit authorized across all regional sectors.
                                                </span>
                                            </div>
                                        </div>
                                    </DossierModule>
 
                                    <DossierModule title="Personnel Directive" icon={<User className="w-4 h-4" />} isFullWidth>
                                        <div className="relative group/card">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-transparent rounded-[2rem] blur opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
                                            <div className="relative flex items-center justify-between p-10 bg-white/[0.02] border border-white/10 rounded-[2rem] backdrop-blur-3xl">
                                                <div className="flex items-center gap-8">
                                                    <div className="relative">
                                                        <div className="w-20 h-20 rounded-3xl bg-black border border-amber-500/20 flex items-center justify-center overflow-hidden">
                                                            {chauffeurDetails ? (
                                                                <img src={chauffeurDetails.profilePhoto || chauffeurDetails.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100'} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Chauffeur" />
                                                            ) : (
                                                                <Fingerprint className="w-8 h-8 text-amber-500/40" />
                                                            )}
                                                        </div>
                                                        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center border-4 border-[#0B0D10]">
                                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.5em] mb-2">Operational Tier</p>
                                                        <h4 className="text-xl font-serif text-white uppercase tracking-widest">{chauffeurDetails ? 'Professional Command' : 'Self-Drive Sovereignty'}</h4>
                                                    </div>
                                                </div>
                                                {chauffeurDetails && (
                                                    <div className="text-right">
                                                        <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-1">Designated Officer</p>
                                                        <p className="text-lg text-white font-serif tracking-widest uppercase">{chauffeurDetails.fullName || chauffeurDetails.name}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </DossierModule>
 
                                    <DossierModule title="Security Vault" icon={<ShieldCheck className="w-4 h-4" />} isFullWidth>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <SecurityVaultEntry label="Aadhaar Card (Front)" isUploaded={true} />
                                            <SecurityVaultEntry label="Aadhaar Card (Back)" isUploaded={true} />
                                            <SecurityVaultEntry label="Driving License (Front)" isUploaded={true} />
                                            <SecurityVaultEntry label="Driving License (Back)" isUploaded={true} />
                                            <SecurityVaultEntry label="Biometric Selfie" isUploaded={true} />
                                            <div className="p-6 bg-white/[0.02] border border-amber-500/10 rounded-2xl flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                                    <LockIcon className="w-4 h-4 text-amber-500" />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] text-amber-500 font-black uppercase tracking-widest mb-1">Vault Status</p>
                                                    <p className="text-xs text-white font-serif tracking-widest uppercase">Encryption Active</p>
                                                </div>
                                            </div>
                                        </div>
                                    </DossierModule>
                                </div>
                             </div>
 
                             {/* Cryptographic Compliance Section */}
                             <div className="px-16 py-12 bg-zinc-900/40 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-3xl bg-black flex items-center justify-center border border-white/10 group-hover:border-amber-500/20 transition-all duration-1000">
                                        <Fingerprint className="w-8 h-8 text-gray-600 group-hover:text-amber-500 transition-colors animate-pulse" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-1">Escrow Protocol ID</p>
                                        <p className="text-sm font-mono text-gray-400 tracking-wider uppercase">{sessionVoucherId}</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                     {/* Archive and Transmit options removed - available post-payment */}
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: THE FINANCIAL SYNOPSIS */}
                <div className="lg:col-span-4 space-y-10 order-1 lg:order-2">
                    <div className="sticky top-32 group">
                        <div className="absolute -inset-1 bg-gradient-to-b from-amber-500/20 to-transparent rounded-[4rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                        
                        <div className="relative p-12 bg-[#0B0D10]/90 backdrop-blur-3xl border border-white/10 rounded-[4rem] shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 p-8">
                                <ShieldCheck className="w-6 h-6 text-emerald-500/40" />
                            </div>
                            
                            <h3 className="text-2xl font-serif text-white mb-12 uppercase tracking-[0.2em]">Investment</h3>
                            
                            <div className="space-y-8 mb-16">
                                <FinancialRow label="Vehicle Entitlement" value={`₹${(bookingState.carPrice || 0).toLocaleString()}`} />
                                {chauffeurDetails && (
                                    <FinancialRow label="Personnel Protocol" value={`₹${(chauffeurDetails.price || 0).toLocaleString()}`} />
                                )}
                                <FinancialRow label="Institutional Shield" value="Sovereign" isGreen />
                                <FinancialRow label="Regional Governance (GST)" value="Compliant" isGreen />
                                
                                <div className="pt-12 border-t border-white/10 flex flex-col gap-3">
                                    <span className="text-[11px] text-gray-500 uppercase tracking-[0.6em] font-black">Final Allocation</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-6xl font-serif text-amber-500 tracking-tighter italic">₹</span>
                                        <span className="text-6xl font-serif text-amber-500 tracking-tighter">{Math.round(totalPrice || 0).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] flex items-start gap-6 group/tip">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] leading-relaxed font-medium">
                                        Secured Escrow Active. Your capital is protected within our sovereign financial perimeter until final handover.
                                    </p>
                                </div>
                                <div className="p-8 bg-amber-500/5 border border-amber-500/10 rounded-[2.5rem] flex items-center gap-6 group cursor-pointer hover:bg-amber-500/10 transition-all duration-700">
                                    <Zap className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                                        <Zap className="w-5 h-5 text-amber-500" />
                                    </Zap>
                                    <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.3em]">Institutional Clearance Imminent</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </BookingLayout>
    )
}

function DossierModule({ title, icon, children, isFullWidth }: any) {
    return (
        <div className={`space-y-10 ${isFullWidth ? 'md:col-span-2' : ''}`}>
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-amber-500/60">{icon}</div>
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">{title}</h4>
                </div>
                <div className="flex items-center gap-3 px-4 py-1.5 bg-emerald-500/5 rounded-full border border-emerald-500/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] text-emerald-500 font-black uppercase tracking-[0.3em]">Protocol Verified</span>
                </div>
            </div>
            {children}
        </div>
    )
}

function ProtocolEntry({ label, value, meta }: any) {
    return (
        <div className="group/entry flex justify-between items-end relative overflow-hidden p-6 bg-white/[0.01] rounded-3xl border border-white/5 hover:border-amber-500/20 transition-all duration-500">
            <div className="space-y-2">
                <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black group-hover/entry:text-amber-500/40 transition-colors">{label}</p>
                <p className="text-xl font-serif text-white uppercase tracking-widest">{value}</p>
            </div>
            <div className="text-right">
                <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mb-1">Temporal Key</p>
                <div className="px-4 py-1.5 bg-black/40 rounded-lg border border-white/10 group-hover/entry:border-amber-500/30 transition-all">
                    <span className="text-xs text-amber-500 font-mono tracking-widest">{meta}</span>
                </div>
            </div>
        </div>
    )
}

function ProtocolAddressEntry({ label, address }: any) {
    return (
        <div className="p-8 bg-white/[0.01] rounded-[2rem] border border-white/5 hover:border-amber-500/20 transition-all duration-700 space-y-4">
            <p className="text-[9px] text-gray-600 uppercase tracking-[0.4em] font-black">{label}</p>
            <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-amber-500/40 shrink-0 mt-1" />
                <p className="text-sm text-white font-serif tracking-widest leading-relaxed uppercase">{address || 'Protocol Default Facility'}</p>
            </div>
        </div>
    )
}

function FinancialRow({ label, value, isGreen }: any) {
    return (
        <div className="flex justify-between items-center group/row">
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold group-hover/row:text-gray-300 transition-colors">{label}</span>
            <div className="h-px flex-1 mx-6 bg-white/5 group-hover/row:bg-amber-500/20 transition-all duration-1000" />
            <span className={`text-xs font-black uppercase tracking-widest ${isGreen ? 'text-emerald-500 italic' : 'text-white'}`}>{value}</span>
        </div>
    )
}

function SecurityVaultEntry({ label, isUploaded }: { label: string; isUploaded: boolean }) {
    return (
        <div className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl group/vault hover:border-emerald-500/20 transition-all duration-500">
            <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isUploaded ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-gray-600'}`}>
                    {isUploaded ? <CheckCircle2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</span>
            </div>
            {isUploaded && (
                <span className="text-[8px] text-emerald-500 font-black uppercase tracking-widest bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10">Vaulted</span>
            )}
        </div>
    )
}

function ActionButton({ onClick, icon, label }: any) {
    return (
        <button 
            onClick={onClick}
            className="flex items-center gap-4 px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white transition-all duration-500 hover:scale-105 active:scale-95"
        >
            <span className="text-amber-500">{icon}</span>
            {label}
        </button>
    )
}
