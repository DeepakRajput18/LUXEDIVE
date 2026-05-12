
import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import {
    Star, Shield, MapPin, BadgeCheck, Car, Languages, Calendar, Quote, ChevronLeft,
    User, Award, FileCheck, HeartHandshake, CheckCircle2, MessageSquarePlus,
    Briefcase, Route, Building2, Clock, Plane, ChevronRight, Loader2
} from 'lucide-react';
import { chauffeurService } from '../services/chauffeurService';

type ChauffeurTrip = {
    clientType: 'Airport' | 'VIP' | 'Wedding' | 'Business' | 'Tourism';
};

/* ─── helpers ─────────────────────────────────────────────────── */
const clientTypeIcon = (type: ChauffeurTrip['clientType']) => {
    switch (type) {
        case 'Airport': return <Plane className="w-3 h-3" />;
        case 'VIP': return <Award className="w-3 h-3" />;
        case 'Wedding': return <HeartHandshake className="w-3 h-3" />;
        case 'Business': return <Briefcase className="w-3 h-3" />;
        default: return <MapPin className="w-3 h-3" />;
    }
};

const clientTypeBadge = (type: ChauffeurTrip['clientType']) => {
    const map: Record<ChauffeurTrip['clientType'], string> = {
        Airport: 'bg-blue-900/40 text-blue-400 border-blue-500/20',
        VIP: 'bg-luxe-gold/10 text-luxe-gold border-luxe-gold/30',
        Wedding: 'bg-pink-900/40 text-pink-400 border-pink-500/20',
        Business: 'bg-indigo-900/40 text-indigo-400 border-indigo-500/20',
        Tourism: 'bg-emerald-900/40 text-emerald-400 border-emerald-500/20',
    };
    return map[type] || 'bg-white/5 text-gray-400 border-white/10';
};

/* ─── component ────────────────────────────────────────────────── */
export default function ChauffeurBio() {
    const { id } = useParams<{ id: string }>();
    const [chauffeur, setChauffeur] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [reviewExpanded, setReviewExpanded] = useState(false);
    const [minReviewRating, setMinReviewRating] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) return;
            try {
                const data = await chauffeurService.getChauffeurById(id);
                if (data) {
                    setChauffeur(data);
                    const revs = await chauffeurService.getChauffeurReviews(data.id);
                    setReviews(revs);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const filteredReviews = useMemo(() =>
        reviews.filter(r => r.rating >= minReviewRating),
    [reviews, minReviewRating]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
                <div className="relative w-24 h-24">
                    <Loader2 className="w-full h-full text-luxe-gold animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="w-8 h-8 text-luxe-gold/40" />
                    </div>
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-xl font-serif text-white tracking-widest uppercase">Verified Protocol</h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Establishing Secure Connection...</p>
                </div>
            </div>
        );
    }

    if (!chauffeur) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-serif text-[#C9A44C] mb-4">Chauffeur Not Found</h2>
                    <Link to="/chauffeurs">
                        <Button variant="outline" className="text-white border-white/20">Return to Directory</Button>
                    </Link>
                </div>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-[#060608] text-white selection:bg-[#C9A44C]/30">

            {/* ── BACK NAVIGATION ─────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 pt-8">
                <Link to="/chauffeurs" className="inline-flex items-center text-gray-500 hover:text-[#C9A44C] transition-colors group text-xs font-bold tracking-widest uppercase">
                    <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Directory
                </Link>
            </div>

            {/* ── HERO ────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* ── LEFT: STICKY PROFILE CARD ─────────── */}
                    <div className="lg:col-span-4 lg:sticky lg:top-8 self-start space-y-5">
                        {/* Photo */}
                        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-black group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                            <img
                                src={chauffeur.profilePhoto}
                                alt={chauffeur.fullName}
                                className="w-full h-full object-cover object-[center_20%] transition-all duration-700 scale-100 group-hover:scale-105"
                            />
                            {/* Verification badge */}
                            {chauffeur.policeVerificationStatus && (
                                <div className="absolute top-4 left-4 z-20 bg-emerald-900/80 backdrop-blur text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                                    <Shield className="w-3 h-3 fill-current" /> VERIFIED
                                </div>
                            )}
                            {chauffeur.isTopChauffeur && (
                                <div className="absolute top-4 right-4 z-20 bg-[#C9A44C]/90 text-black text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                                    <Award className="w-3 h-3" /> TOP RATED
                                </div>
                            )}
                            {/* Price overlay on photo */}
                            <div className="absolute bottom-4 left-4 z-20">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Service Rate</p>
                                <p className="text-3xl font-serif text-[#C9A44C]">₹{chauffeur.pricePerDay.toLocaleString()}</p>
                                <p className="text-gray-400 text-xs">per day</p>
                            </div>
                            <div className="absolute bottom-4 right-4 z-20">
                                <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border flex items-center gap-1.5 ${chauffeur.availabilityStatus === 'Available' ? 'bg-emerald-900/60 border-emerald-500/20 text-emerald-400' : chauffeur.availabilityStatus === 'Busy' ? 'bg-red-900/60 border-red-500/20 text-red-400' : 'bg-gray-800/60 border-gray-500/20 text-gray-400'}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${chauffeur.availabilityStatus === 'Available' ? 'bg-emerald-400 animate-pulse' : chauffeur.availabilityStatus === 'Busy' ? 'bg-red-400' : 'bg-gray-400'}`} />
                                    {chauffeur.availabilityStatus}
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Pricing Breakdown */}
                        <div className="bg-[#111] rounded-xl border border-[#C9A44C]/20 p-5 space-y-4">
                            <h3 className="text-[10px] font-bold text-[#C9A44C] uppercase tracking-widest border-b border-white/5 pb-3 mb-1">Service Rate Breakdown</h3>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">Daily Rate</span>
                                <span className="text-[#C9A44C] text-xl font-serif">₹{chauffeur.pricePerDay?.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: 'Rating', value: Number(chauffeur.rating).toFixed(1) },
                                { label: 'Trips', value: `${chauffeur.totalTripsCompleted}+` },
                                { label: 'Exp', value: `${chauffeur.experienceYears} Yrs` }
                            ].map(stat => (
                                <div key={stat.label} className="bg-[#111] border border-white/5 rounded-xl p-4 text-center">
                                    <p className="text-xl font-serif text-[#C9A44C]">{stat.value}</p>
                                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Personal Details */}
                        <div className="bg-[#111] rounded-xl border border-white/5 p-5 space-y-4">
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 pb-3">Profile Details</h3>
                            {[
                                { icon: User, label: 'Age', value: `${chauffeur.age} Years` },
                                { icon: Calendar, label: 'Experience', value: `${chauffeur.experienceYears} Years` },
                                { icon: Languages, label: 'Languages', value: chauffeur.languages.join(', ') },
                                { icon: User, label: 'Uniform', value: chauffeur.uniformStyle },
                                { icon: Car, label: 'Vehicles', value: chauffeur.preferredCarTypes.join(', ') },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex justify-between items-start text-sm">
                                    <span className="text-gray-500 flex items-center gap-2">
                                        <Icon className="w-3.5 h-3.5 text-[#C9A44C]/60" />
                                        {label}
                                    </span>
                                    <span className="text-gray-300 text-right text-xs max-w-[55%]">{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        {chauffeur.availabilityStatus === 'Available' ? (
                            <Link to="/fleet" state={{ preSelectedChauffeur: chauffeur }} className="block">
                                <button className="w-full bg-[#C9A44C] hover:bg-white text-black font-bold uppercase tracking-widest text-xs h-12 rounded-xl transition-all shadow-lg shadow-[#C9A44C]/20 flex items-center justify-center gap-2">
                                    Book This Chauffeur <ChevronRight className="w-4 h-4" />
                                </button>
                            </Link>
                        ) : (
                            <div className="w-full border border-white/5 text-gray-500 bg-white/5 uppercase tracking-widest text-[10px] font-bold h-12 flex items-center justify-center rounded-xl cursor-not-allowed">
                                Currently {chauffeur.availabilityStatus}
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT: MAIN CONTENT ─────────────────── */}
                    <div className="lg:col-span-8 space-y-14">

                        {/* ── NAME + TITLE ──────────────────── */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <span className="text-[#C9A44C] text-xs font-bold tracking-[0.25em] uppercase border border-[#C9A44C]/30 px-3 py-1 rounded-full bg-[#C9A44C]/5">Elite Chauffeur</span>
                                <span className="text-gray-400 text-xs font-bold tracking-[0.25em] uppercase border border-white/10 px-3 py-1 rounded-full bg-white/5">{chauffeur.drivingStyle}</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight mb-5">
                                {chauffeur.firstName}{' '}
                                <span className="text-gray-600 font-light">{chauffeur.fullName.split(' ').slice(1).join(' ')}</span>
                            </h1>
                            <p className="text-gray-400 text-base font-light leading-relaxed max-w-2xl">{chauffeur.bio}</p>
                        </div>

                        {/* ── SPECIALIZATIONS ───────────────── */}
                        <SectionHeader icon={<Award className="w-5 h-5 text-[#C9A44C]" />} title="Specializations" />
                        <div className="flex flex-wrap gap-3 mt-3">
                            {chauffeur.specializations.map((spec: string) => (
                                <div key={spec} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A44C]/5 border border-[#C9A44C]/20 text-[#C9A44C]/80 text-xs font-bold uppercase tracking-wider">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> {spec}
                                </div>
                            ))}
                        </div>

                        {/* ── TRUST & SAFETY ────────────────── */}
                        <div>
                            <SectionHeader icon={<Shield className="w-5 h-5 text-[#C9A44C]" />} title="Trust & Safety" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { ok: chauffeur.policeVerificationStatus, label: 'Police Verified', sub: 'Background cleared by local authorities' },
                                    { ok: chauffeur.backgroundVerified, label: 'Background Checked', sub: 'Comprehensive history verification complete' },
                                    { ok: true, label: 'License Valid', sub: chauffeur.drivingLicenseNumber },
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

                        {/* ── PREVIOUS WORK ─────────────────── */}
                        <div>
                            <SectionHeader icon={<Building2 className="w-5 h-5 text-[#C9A44C]" />} title="Previous Companies" />
                            <div className="relative pl-6 space-y-0">
                                <div className="absolute left-2 top-2 bottom-2 w-px bg-[#C9A44C]/20" />
                                {chauffeur.previousWork.map((work: any, i: number) => (
                                    <div key={i} className="relative pb-8 last:pb-0">
                                        <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full bg-[#060608] border-2 border-[#C9A44C]/60" />
                                        <div className="bg-[#0F0F0F] border border-white/5 rounded-xl p-4 ml-4 hover:border-[#C9A44C]/20 transition-colors">
                                            <div className="flex justify-between items-start flex-wrap gap-2">
                                                <div>
                                                    <p className="text-white font-semibold text-sm">{work.company}</p>
                                                </div>
                                                <span className="text-[10px] text-[#C9A44C] font-bold uppercase tracking-widest border border-[#C9A44C]/20 px-2 py-0.5 rounded-full">{work.period}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── TOP TRIPS ─────────────────────── */}
                        <div>
                            <SectionHeader icon={<Route className="w-5 h-5 text-[#C9A44C]" />} title="Top 10 Trips" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {chauffeur.topTrips.map((trip: any, i: number) => (
                                    <div key={i} className="group bg-[#0F0F0F] border border-white/5 rounded-xl p-4 hover:border-[#C9A44C]/30 transition-all flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-[#C9A44C]/10 border border-[#C9A44C]/20 flex items-center justify-center text-[#C9A44C] text-xs font-black shrink-0">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 text-sm text-white font-medium truncate">
                                                <span className="truncate">{trip.from}</span>
                                                <ChevronRight className="w-3.5 h-3.5 text-[#C9A44C] shrink-0" />
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

                        {/* ── CLIENT REVIEWS ────────────────── */}
                        <div id="reviews">
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                                <div className="flex items-center gap-3">
                                    <MessageSquarePlus className="w-5 h-5 text-[#C9A44C]" />
                                    <h2 className="text-xl font-serif text-white">Client Reviews</h2>
                                    <span className="text-sm font-sans text-gray-500 border border-white/10 px-2 py-0.5 rounded-full">{filteredReviews.length}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-[#C9A44C]/5 border border-[#C9A44C]/20 px-3 py-1.5 rounded-full">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < Math.round(Number(chauffeur.rating)) ? 'text-[#C9A44C] fill-[#C9A44C]' : 'text-gray-700'}`} />
                                    ))}
                                    <span className="text-[10px] font-bold text-[#C9A44C] ml-1">{Number(chauffeur.rating).toFixed(1)}</span>
                                </div>
                            </div>
                            {/* Review Rating Filter */}
                            <div className="flex items-center gap-2 mb-5">
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Show:</span>
                                {[0,3,4,5].map(r => (
                                    <button key={r} onClick={() => setMinReviewRating(r)}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${minReviewRating === r ? 'bg-[#C9A44C] text-black border-[#C9A44C]' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
                                        {r === 0 ? 'All' : `${r}★+`}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {(reviewExpanded ? filteredReviews : filteredReviews.slice(0, 6)).map((review, i) => (
                                    <ReviewCard key={i} review={review} />
                                ))}
                            </div>

                            {filteredReviews.length > 6 && (
                                <button
                                    onClick={() => setReviewExpanded(!reviewExpanded)}
                                    className="mt-6 text-xs text-gray-500 hover:text-[#C9A44C] uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
                                >
                                    {reviewExpanded ? 'Show Less' : `Show All ${filteredReviews.length} Reviews`}
                                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${reviewExpanded ? 'rotate-90' : ''}`} />
                                </button>
                            )}
                        </div>

                        {/* ── BOTTOM CTA ────────────────────── */}
                        <div className="border-t border-white/5 pt-10">
                            <div className="bg-[#0F0F0F] border border-[#C9A44C]/10 rounded-2xl p-8 text-center">
                                <p className="text-[10px] text-[#C9A44C] font-bold uppercase tracking-widest mb-3">Ready to Book?</p>
                                <h3 className="text-3xl font-serif text-white mb-2">Reserve {chauffeur.firstName}</h3>
                                <p className="text-gray-400 text-sm mb-6">Starting from <span className="text-[#C9A44C] font-bold">₹{chauffeur.pricePerDay.toLocaleString()}/day</span></p>
                                {chauffeur.availabilityStatus === 'Available' ? (
                                    <Link to="/fleet" state={{ preSelectedChauffeur: chauffeur }}>
                                        <button className="bg-[#C9A44C] text-black font-bold uppercase tracking-widest text-xs px-10 py-4 rounded-xl hover:bg-white transition-all shadow-lg shadow-[#C9A44C]/20">
                                            Browse Fleet & Book →
                                        </button>
                                    </Link>
                                ) : (
                                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Not Available — Check Back Soon</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── sub-components ───────────────────────────────────────────── */
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <div className="flex items-center gap-3 mb-5">
            {icon}
            <h2 className="text-lg font-serif text-white">{title}</h2>
            <div className="h-px flex-1 bg-white/5" />
        </div>
    );
}

function ReviewCard({ review }: { review: any }) {
    return (
        <div className="group bg-[#0F0F0F] border border-white/5 rounded-xl p-5 hover:border-[#C9A44C]/20 transition-all duration-300 flex flex-col gap-3">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-luxe-gold/10 border border-luxe-gold/20 flex items-center justify-center text-luxe-gold font-bold text-xs uppercase">
                        {review.initials}
                    </div>
                    <div>
                        <p className="text-white text-sm font-semibold">{review.full_name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-medium">{review.city}</span>
                            {review.is_verified_trip && (
                                <>
                                    <span className="text-gray-700">·</span>
                                    <p className="text-[9px] text-[#C9A44C]/70 font-medium uppercase tracking-tight">Verified Trip</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-[#C9A44C] fill-[#C9A44C]' : 'text-gray-700'}`} />
                        ))}
                    </div>
                    <span className="text-[9px] text-gray-600 font-medium uppercase tracking-tighter">
                        {new Date(review.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
            <div className="flex gap-2">
                <Quote className="w-4 h-4 text-[#C9A44C]/30 shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm leading-relaxed italic">{review.comment}</p>
            </div>
        </div>
    );
}
