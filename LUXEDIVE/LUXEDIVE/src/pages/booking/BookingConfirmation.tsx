import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
    CheckCircle,
    Calendar,
    MapPin,
    Clock,
    Download,
    Share2,
    ChevronRight,
    ShieldCheck,
    Phone
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'sonner';

const BookingConfirmation: React.FC = () => {
    const navigate = useNavigate();
    const { bookingId } = useParams();
    const [booking, setBooking] = useState<any>(null);
    const [status, setStatus] = useState<string>('pending');
    const [loading, setLoading] = useState(true);

    // 1. Fetch live details
    useEffect(() => {
        if (!bookingId || bookingId === 'UNKNOWN') return;

        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('bookings')
                    .select('*, car:cars(*), chauffeur:chauffeurs!chauffeur_id(*)')
                    .eq('id', bookingId)
                    .single();

                if (error) throw error;
                setBooking(data);
                setStatus(data.status);
                setLoading(false);
            } catch (err) {
                console.error("Fetch Error:", err);
                setLoading(false);
            }
        };

        fetchData();

        // 2. Subscribe to real-time status updates
        const channel = supabase
            .channel(`booking-${bookingId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'bookings',
                    filter: `id=eq.${bookingId}`
                },
                (payload) => {
                    console.log('Booking Update:', payload);
                    setStatus(payload.new.status);
                    setBooking(prev => prev ? { ...prev, ...payload.new } : payload.new);
                    
                    if (payload.new.status === 'confirmed') {
                        toast.success('Reservation Verified!', {
                            description: 'Your payment was successfully audited by our concierge.'
                        });
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [bookingId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
                <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-6" />
                <h2 className="text-xl font-serif tracking-widest animate-pulse text-[#D4AF37]">Accessing Secure Ledger...</h2>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6 font-bold">
                    <ShieldCheck className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4">Instance Not Found</h2>
                <p className="text-gray-400 max-w-md mb-8">We could not retrieve the live details for this session. Your booking might still be processing safely in the background.</p>
                <button onClick={() => navigate('/dashboard')} className="px-8 py-3 bg-[#D4AF37] text-black font-bold tracking-widest rounded-xl hover:bg-white transition-colors">
                    VIEW DASHBOARD
                </button>
            </div>
        )
    }

    const isPending = status === 'pending_verification';
    const isConfirmed = status === 'confirmed';

    return (
        <div className="min-h-screen bg-[#0A0A0A] font-sans text-white">
            <header className="fixed top-0 inset-x-0 z-50 bg-[#111] border-b border-[#222] h-20 flex items-center justify-center">
                <h1 className="text-xl font-serif font-bold tracking-widest cursor-pointer text-[#D4AF37]" onClick={() => navigate('/')}>LUXEDIVE</h1>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-32">
                
                {/* Status-specific banners */}
                {isPending ? (
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-8 animate-pulse border border-amber-500/30">
                            <Clock className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Audit in Progress.</h2>
                        <p className="text-gray-400 text-lg">Our concierge is currently verifying your UPI settlement. This typically takes 5-15 minutes.</p>
                        <div className="mt-8 inline-block px-6 py-3 bg-[#111] rounded-full border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                             <div className="flex items-center gap-3">
                                 <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                 </span>
                                 <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Institutional Audit Live</span>
                             </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mx-auto mb-8 shadow-lg shadow-green-500/10 animate-bounce-slow border border-green-500/30">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Unmatched Power Secured.</h2>
                        <p className="text-gray-400 text-lg">Your reservation is {isConfirmed ? 'confirmed' : status}. A receipt has been generated.</p>
                        <div className="mt-8 inline-block px-6 py-3 bg-[#111] rounded-full border border-[#222]">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mr-3">Booking Reference</span>
                            <span className="text-lg font-mono font-bold text-[#D4AF37]">{String(bookingId).substring(0, 8).toUpperCase()}</span>
                        </div>
                    </div>
                )}

                {/* Booking Card */}
                <div className="bg-[#111] border border-[#222] rounded-2xl shadow-xl overflow-hidden mb-12">
                    {/* Car Preview Header */}
                    <div className="h-48 bg-gray-900 relative">
                        <img
                            src={booking.car?.images?.[0] || 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80'}
                            alt={booking.car?.model}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                            <h3 className="text-2xl font-serif text-white font-bold">{booking.car?.brand} {booking.car?.model}</h3>
                            <p className="text-gray-300 text-sm">{booking.car?.category} • Ahmedabad</p>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-white/5">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pick-up</p>
                                        <p className="font-bold text-lg">{new Date(booking.pickup_datetime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        <p className="text-sm text-gray-500">{new Date(booking.pickup_datetime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Location</p>
                                        <p className="font-bold">{booking.delivery_type === 'home' ? 'Concierge Delivery' : 'LUXEDIVE Showroom'}</p>
                                        <p className="text-sm text-gray-500 whitespace-pre-line">{booking.delivery_address || 'S.G. Highway, Ahmedabad'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <Clock className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Drop-off</p>
                                        <p className="font-bold text-lg">{new Date(booking.dropoff_datetime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        <p className="text-sm text-gray-500">{new Date(booking.dropoff_datetime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Total Reservation Cost</span>
                                <span className="text-xl font-bold font-serif text-[#D4AF37]">₹{booking.total_price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-gray-600 uppercase font-bold tracking-widest">
                                <span>Status</span>
                                <span className={`${isConfirmed ? 'text-green-500' : 'text-amber-500'}`}>{status.replace('_', ' ')}</span>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <button 
                                onClick={() => navigate(`/invoice/${bookingId}`)}
                                className="flex-1 py-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2 text-white"
                            >
                                <Download className="w-4 h-4" /> Download Receipt
                            </button>
                            <button className="flex-1 py-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2 text-white">
                                <Share2 className="w-4 h-4" /> Share Itinerary
                            </button>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            onClick={() => navigate('/dashboard')}
                            className="bg-[#111] p-6 rounded-2xl border border-[#222] shadow-sm hover:border-[#D4AF37]/50 hover:bg-[#1A1A1A] transition-all cursor-pointer group"
                        >
                            <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-4">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-white">Complete Verification</h3>
                            <p className="text-sm text-gray-500 mb-4">Upload your license now to speed up handover.</p>
                            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-1 opacity-80 group-hover:opacity-100">Go to Dashboard <ChevronRight className="w-3 h-3" /></span>
                        </div>

                        <div className="bg-[#111] p-6 rounded-2xl border border-[#222] shadow-sm hover:border-[#D4AF37]/50 hover:bg-[#1A1A1A] transition-all cursor-pointer group">
                            <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center text-white mb-4">
                                <Phone className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-white">Concierge Service</h3>
                            <p className="text-sm text-gray-500 mb-4">Need special arrangements? We're here 24/7.</p>
                            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-1 opacity-80 group-hover:opacity-100">Contact Us <ChevronRight className="w-3 h-3" /></span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default BookingConfirmation;
