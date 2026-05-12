import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { 
    ArrowLeft, Star, Shield, Clock, Calendar, CheckCircle2, Award, Loader2,
    MapPin, BadgeCheck, Car, Languages, Quote, ChevronLeft,
    User, FileCheck, HeartHandshake, MessageSquarePlus,
    Briefcase, Route, Building2, Plane, ChevronRight
} from 'lucide-react'
import { useBooking } from '../../../contexts/BookingContext'
import { chauffeurService } from '../../../services/chauffeurService'
import { format } from 'date-fns'

/* ─── helpers (mirrored from ChauffeurBio) ───────────────────────── */
const clientTypeIcon = (type: string) => {
    switch (type) {
        case 'Airport': return <Plane className="w-3 h-3" />;
        case 'VIP': return <Award className="w-3 h-3" />;
        case 'Wedding': return <HeartHandshake className="w-3 h-3" />;
        case 'Business': return <Briefcase className="w-3 h-3" />;
        default: return <MapPin className="w-3 h-3" />;
    }
};

const clientTypeBadge = (type: string) => {
    const map: Record<string, string> = {
        Airport: 'bg-blue-900/40 text-blue-400 border-blue-500/20',
        VIP: 'bg-amber-900/40 text-amber-500 border-amber-500/20',
        Wedding: 'bg-pink-900/40 text-pink-400 border-pink-500/20',
        Business: 'bg-indigo-900/40 text-indigo-400 border-indigo-500/20',
        Tourism: 'bg-emerald-900/40 text-emerald-400 border-emerald-500/20',
    };
    return map[type] || 'bg-white/5 text-gray-400 border-white/10';
};

export default function ChauffeurDetails() {
    const navigate = useNavigate()
    const { carId, chauffeurId } = useParams()
    const { bookingState, updateBooking } = useBooking()
    const [driver, setDriver] = useState<any>(null)
    const [reviews, setReviews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [reviewExpanded, setReviewExpanded] = useState(false)
    const [minReviewRating, setMinReviewRating] = useState(0)

    // Redirect safety
    useEffect(() => {
        if (!bookingState.pickupDate) {
            navigate(`/booking/${carId}/options`)
        }
    }, [bookingState.pickupDate, carId, navigate])

    useEffect(() => {
        const fetchData = async () => {
            if (!chauffeurId) return
            try {
                const data = await chauffeurService.getChauffeurById(chauffeurId)
                setDriver(data)
                if (data) {
                    const revs = await chauffeurService.getChauffeurReviews(data.id)
                    setReviews(revs)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [chauffeurId])

    const filteredReviews = useMemo(() =>
        reviews.filter(r => r.rating >= minReviewRating),
    [reviews, minReviewRating])

    if (loading) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 text-amber-500">
            <Loader2 className="w-12 h-12 animate-spin" />
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Synchronizing Secure Protocol...</p>
        </div>
    )
    if (!driver) return null

    const chauffeurDate = bookingState.pickupDate ? new Date(bookingState.pickupDate) : null
    const duration = bookingState.duration || 1
    const dailyFee = driver.pricePerDay
    const chauffeurTotal = dailyFee * duration

    const handleConfirm = () => {
        updateBooking({
            chauffeurDetails: { ...driver, price: chauffeurTotal, price_per_day: dailyFee },
            chauffeurDate,
            totalPrice: bookingState.carPrice + chauffeurTotal
        })
        navigate(`/booking/${carId}/chauffeur`)
    }

    return (
        <div className="min-h-screen bg-[#060608] text-white selection:bg-amber-500/30">
            {/* ── BACK NAVIGATION ── */}
            <div className="max-w-7xl mx-auto px-6 pt-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-gray-500 hover:text-amber-500 transition-colors group text-xs font-bold tracking-widest uppercase"
                >
                    <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Go Back
                </button>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* ── LEFT: STICKY PROFILE CARD (SAME AS BIO) ── */}
                    <div className="lg:col-span-4 lg:sticky lg:top-8 self-start space-y-5">
                        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-black group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                            <img
                                src={driver.profilePhoto}
                                alt={driver.fullName}
                                className="w-full h-full object-cover object-[center_20%] transition-all duration-700"
                            />
                            {driver.policeVerificationStatus && (
                                <div className="absolute top-4 left-4 z-20 bg-emerald-900/80 backdrop-blur text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                                    <Shield className="w-3 h-3 fill-current" /> VERIFIED
                                </div>
                            )}
                            {driver.isTopChauffeur && (
                                <div className="absolute top-4 right-4 z-20 bg-amber-500/90 text-black text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                                    <Award className="w-3 h-3" /> TOP RATED
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 z-20">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Service Rate</p>
                                <p className="text-3xl font-serif text-amber-500">₹{driver.pricePerDay.toLocaleString()}</p>
                                <p className="text-gray-400 text-xs">per day</p>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: 'Rating', value: Number(driver.rating).toFixed(1) },
                                { label: 'Trips', value: `${driver.totalTripsCompleted}+` },
                                { label: 'Exp', value: `${driver.experienceYears} Yrs` }
                            ].map(stat => (
                                <div key={stat.label} className="bg-[#111] border border-white/5 rounded-xl p-4 text-center">
                                    <p className="text-xl font-serif text-amber-500">{stat.value}</p>
                                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Personal Details */}
                        <div className="bg-[#111] rounded-xl border border-white/5 p-5 space-y-4">
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 pb-3">Profile Details</h3>
                            {[
                                { icon: User, label: 'Age', value: `${driver.age} Years` },
                                { icon: Calendar, label: 'Experience', value: `${driver.experienceYears} Years` },
                                { icon: Languages, label: 'Languages', value: driver.languages.join(', ') },
                                { icon: Award, label: 'Uniform', value: driver.uniformStyle },
                                { icon: Car, label: 'Vehicles', value: driver.preferredCarTypes.join(', ') },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex justify-between items-start text-sm">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <Icon className="w-3.5 h-3.5 text-amber-500/60" />
                                        {label}
                                    </span>
                                    <span className="text-gray-300 text-right text-xs max-w-[55%]">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: MAIN CONTENT ── */}
                    <div className="lg:col-span-8 space-y-10 relative">
                        
                        {/* ── CONFIRM BOX (TOP RIGHT) ── */}
                        <div className="absolute top-0 right-0 z-30 p-8 bg-zinc-900/80 backdrop-blur-md border border-amber-500/20 rounded-[2.5rem] shadow-2xl flex flex-col gap-6 min-w-[300px]">
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Confirm Captain</h3>
                                <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Daily Charge</p>
                                        <p className="text-lg font-serif text-white">₹{dailyFee.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Total Impact</p>
                                        <p className="text-xl font-serif text-amber-500 tracking-tight">₹{chauffeurTotal.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={handleConfirm}
                                className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-500 transition-all shadow-xl shadow-white/5 active:scale-95"
                            >
                                Confirm Captain
                            </button>
                        </div>

                        {/* ── NAME + BIO (MIRRORED) ── */}
                        <div className="pt-4">
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <span className="text-amber-500 text-xs font-bold tracking-[0.25em] uppercase border border-amber-500/30 px-3 py-1 rounded-full bg-amber-500/5">Elite Chauffeur</span>
                                <span className="text-gray-400 text-xs font-bold tracking-[0.25em] uppercase border border-white/10 px-3 py-1 rounded-full bg-white/5">{driver.drivingStyle}</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight mb-5">
                                {driver.firstName}{' '}
                                <span className="text-gray-600 font-light">{driver.fullName.split(' ').slice(1).join(' ')}</span>
                            </h1>
                            <p className="text-gray-400 text-base font-light leading-relaxed max-w-xl">{driver.bio}</p>
                        </div>

                        {/* Specializations */}
                        <div>
                            <SectionHeader icon={<Award className="w-5 h-5 text-amber-500" />} title="Specializations" />
                            <div className="flex flex-wrap gap-3 mt-3">
                                {driver.specializations.map((spec: string) => (
                                    <div key={spec} className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/5 border border-amber-500/20 text-amber-500/80 text-xs font-bold uppercase tracking-wider">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> {spec}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust & Safety */}
                        <div>
                            <SectionHeader icon={<Shield className="w-5 h-5 text-amber-500" />} title="Trust & Safety" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { ok: driver.policeVerificationStatus, label: 'Police Verified', sub: 'Background cleared by local authorities' },
                                    { ok: driver.backgroundVerified, label: 'Background Checked', sub: 'Comprehensive history verification complete' },
                                    { ok: true, label: 'License Valid', sub: driver.drivingLicenseNumber },
                                    { ok: true, label: 'First Aid Trained', sub: 'Certified to handle medical emergencies' },
                                ].map(item => (
                                    <div key={item.label} className="flex items-start gap-3 bg-[#0F0F0F] rounded-xl p-4 border border-white/5">
                                        <CheckCircle2 className={`w-5 h-5 mt-0.5 ${item.ok ? 'text-emerald-500' : 'text-gray-600'}`} />
                                        <div>
                                            <p className="text-sm font-bold text-gray-200">{item.label}</p>
                                            <p className="text-xs text-gray-500 font-mono mt-0.5">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Previous Work */}
                        <div>
                            <SectionHeader icon={<Building2 className="w-5 h-5 text-amber-500" />} title="Previous Experience" />
                            <div className="relative pl-6 space-y-0">
                                <div className="absolute left-2 top-2 bottom-2 w-px bg-amber-500/20" />
                                {driver.previousWork.map((work: any, i: number) => (
                                    <div key={i} className="relative pb-8 last:pb-0">
                                        <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full bg-[#060608] border-2 border-amber-500/60" />
                                        <div className="bg-[#0F0F0F] border border-white/5 rounded-xl p-4 ml-4 hover:border-amber-500/20 transition-colors">
                                            <div className="flex justify-between items-start flex-wrap gap-2">
                                                <div>
                                                    <p className="text-white font-semibold text-sm">{work.company}</p>
                                                </div>
                                                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest border border-amber-500/20 px-2 py-0.5 rounded-full">{work.period}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Trips */}
                        <div>
                            <SectionHeader icon={<Route className="w-5 h-5 text-amber-500" />} title="Top Assignments" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {driver.topTrips.map((trip: any, i: number) => (
                                    <div key={i} className="group bg-[#0F0F0F] border border-white/5 rounded-xl p-4 hover:border-amber-500/30 transition-all flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-black shrink-0">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 text-sm text-white font-medium truncate">
                                                <span className="truncate">{trip.from}</span>
                                                <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                                <span className="truncate">{trip.to}</span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {trip.duration}
                                                </span>
                                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${clientTypeBadge(trip.clientType)}`}>
                                                    {clientTypeIcon(trip.clientType)} {trip.clientType}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section at bottom */}
                        <div id="reviews">
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                                <div className="flex items-center gap-3">
                                    <MessageSquarePlus className="w-5 h-5 text-amber-500" />
                                    <h2 className="text-xl font-serif text-white">Client Reviews</h2>
                                    <span className="text-sm font-sans text-gray-500 border border-white/10 px-2 py-0.5 rounded-full">{filteredReviews.length}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-amber-500/5 border border-amber-500/20 px-3 py-1.5 rounded-full">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < Math.round(Number(driver.rating)) ? 'text-amber-500 fill-amber-500' : 'text-gray-700'}`} />
                                    ))}
                                    <span className="text-[10px] font-bold text-amber-500 ml-1">{Number(driver.rating).toFixed(1)}</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {(reviewExpanded ? filteredReviews : filteredReviews.slice(0, 4)).map((rev, i) => (
                                    <ReviewCard key={i} review={rev} />
                                ))}
                            </div>

                            {filteredReviews.length > 4 && (
                                <button
                                    onClick={() => setReviewExpanded(!reviewExpanded)}
                                    className="mt-6 text-xs text-gray-500 hover:text-amber-500 uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
                                >
                                    {reviewExpanded ? 'Show Less' : `Show All ${filteredReviews.length} Reviews`}
                                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${reviewExpanded ? 'rotate-90' : ''}`} />
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

/* ─── sub-components ─── */
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <div className="flex items-center gap-3 mb-5">
            {icon}
            <h2 className="text-lg font-serif text-white">{title}</h2>
            <div className="h-px flex-1 bg-white/5" />
        </div>
    )
}

function ReviewCard({ review }: { review: any }) {
    return (
        <div className="group bg-[#0F0F0F] border border-white/5 rounded-xl p-5 hover:border-amber-500/20 transition-all duration-300 flex flex-col gap-3">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-xs uppercase">
                        {review.full_name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <p className="text-white text-sm font-semibold">{review.full_name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-medium">{review.city}</span>
                            {review.is_verified_trip && (
                                <>
                                    <span className="text-gray-700">·</span>
                                    <p className="text-[9px] text-amber-500/70 font-medium uppercase tracking-tight">Verified Trip</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-700'}`} />
                    ))}
                </div>
            </div>
            <div className="flex gap-2">
                <Quote className="w-4 h-4 text-amber-500/30 shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm leading-relaxed italic">{review.comment}</p>
            </div>
        </div>
    )
}
