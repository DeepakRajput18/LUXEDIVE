import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
    Search,
    ChevronRight,
    Car,
    AlertCircle,
    RefreshCcw
} from 'lucide-react';
import { toast } from 'sonner';
import { BookingCard } from '../../components/dashboard/BookingCard';
import type { Booking } from '../../types/app.types';
import { useAuth } from '../../contexts/AuthContext';

// Define Tab Types
type TabType = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

const MyBookingsList: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [activeTab, setActiveTab] = useState<TabType>('upcoming');
    const [allBookings, setAllBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Fetch ALL bookings for user, ordered by recent first
            const { data, error: apiError } = await supabase
                .from('bookings')
                .select(`
                    *,
                    car:cars (
                        *
                    )
                `)
                .eq('user_id', user!.id)
                .neq('status', 'draft') // filter out drafts
                .order('pickup_datetime', { ascending: false });

            if (apiError) throw apiError;

            console.log('Raw Bookings Data:', data);

            const fetchedBookings = (data as unknown as Booking[]) || [];

            if (fetchedBookings.length === 0) {
                setAllBookings([]);
            } else {
                setAllBookings(fetchedBookings);
            }

        } catch (err: any) {
            console.error('Error fetching bookings:', err);
            setError(err.message || 'Unable to load your bookings.');
            toast.error('Failed to load bookings');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId: string) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;

        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status: 'cancelled' })
                .eq('id', bookingId);

            if (error) throw error;

            toast.success('Booking cancelled successfully');
            fetchBookings(); // Refresh data to update UI
        } catch (error) {
            console.error('Error cancelling booking:', error);
            toast.error('Failed to cancel booking');
        }
    };

    const handleDownloadInvoice = (bookingId: string) => {
        window.open(`/booking/invoice/${bookingId}`, '_blank');
    };

    // --- NORMALIZATION & FILTERING LOGIC ---
    const getNormalizedCategory = (booking: Booking): TabType => {
        const { status, pickup_datetime, dropoff_datetime } = booking;
        const now = new Date();
        const pickup = new Date(pickup_datetime);
        const dropoff = new Date(dropoff_datetime);

        if (status === 'cancelled') return 'cancelled';
        if (status === 'completed') return 'completed';

        if (status === 'confirmed' && now >= pickup && now <= dropoff) {
            return 'ongoing';
        }

        if (['confirmed', 'pending_payment', 'pending_approval'].includes(status) && now < pickup) {
            return 'upcoming';
        }

        if (now > dropoff) {
            return 'completed';
        }

        return 'upcoming';
    };

    const filteredBookings = allBookings.filter(booking => {
        const category = getNormalizedCategory(booking);
        if (category !== activeTab) return false;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const brand = booking.car?.brand?.toLowerCase() || '';
            const model = booking.car?.model?.toLowerCase() || '';
            const id = booking.id.toLowerCase();
            return brand.includes(query) || model.includes(query) || id.includes(query);
        }

        return true;
    });

    const sortedBookings = [...filteredBookings].sort((a, b) => {
        const dateA = new Date(a.pickup_datetime).getTime();
        const dateB = new Date(b.pickup_datetime).getTime();
        return activeTab === 'upcoming' ? dateA - dateB : dateB - dateA;
    });

    // --- RENDER HELPERS ---
    const renderEmptyState = () => {
        const content = {
            upcoming: { title: "No upcoming bookings", sub: "You don’t have any upcoming trips yet." },
            ongoing: { title: "No ongoing trips", sub: "You have no active bookings right now." },
            completed: { title: "No completed bookings", sub: "You have not completed any trips yet." },
            cancelled: { title: "No cancelled bookings", sub: "You don’t have any cancelled bookings." }
        };
        const { title, sub } = content[activeTab];

        return (
            <div className="text-center py-24 bg-[#12141a] rounded-xl border border-white/5 border-dashed flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Car className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">{searchQuery ? "No matches found." : sub}</p>

                {activeTab !== 'cancelled' && !searchQuery && (
                    <button
                        onClick={() => navigate('/fleet')}
                        className="px-8 py-3 bg-[#D4AF37] text-black rounded-lg text-sm font-bold shadow-lg hover:bg-[#C4A030] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all transform hover:-translate-y-0.5"
                    >
                        Browse Fleet
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-20">
            {/* Header */}
            <div className="bg-[#12141A] border-b border-white/5 sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto px-6 pt-8 pb-0">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 tracking-widest mb-4">
                        <span className="cursor-pointer hover:text-[#D4AF37] transition-colors" onClick={() => navigate('/')}>Home</span>
                        <ChevronRight className="w-3 h-3 text-gray-700" />
                        <span className="text-luxe-gold uppercase">My Bookings</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-serif font-bold mb-2 text-white">My Bookings</h1>
                            <p className="text-gray-400 text-sm">Manage your luxury fleet reservations.</p>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search by car or ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2.5 bg-black/40 border-none rounded-lg text-sm w-full md:w-64 focus:ring-1 focus:ring-[#D4AF37] transition-all outline-none text-white placeholder:text-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-8 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'upcoming', label: 'UPCOMING' },
                            { id: 'ongoing', label: 'ONGOING' },
                            { id: 'completed', label: 'COMPLETED' },
                            { id: 'cancelled', label: 'CANCELLED' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`text-xs font-bold tracking-widest pb-4 uppercase transition-all border-b-2 whitespace-nowrap px-1 ${activeTab === tab.id
                                    ? 'border-[#D4AF37] text-white'
                                    : 'border-transparent text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Error State */}
                {error && (
                    <div className="bg-red-900/10 border border-red-900/50 rounded-lg p-6 text-center text-red-400 mb-8 backdrop-blur-sm">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                        <h3 className="font-bold mb-1 text-red-300">Something went wrong</h3>
                        <p className="text-sm mb-4">{error}</p>
                        <button
                            onClick={fetchBookings}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-950/50 border border-red-900 text-red-300 rounded-md text-sm font-bold hover:bg-red-900 transition-colors"
                        >
                            <RefreshCcw size={14} /> Retry
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && !error ? (
                    <div className="space-y-6">
                        {[1, 2].map(i => (
                            <div key={i} className="h-72 bg-[#12141A] rounded-xl border border-white/5 animate-pulse flex flex-col md:flex-row">
                                <div className="md:w-1/3 bg-white/5"></div>
                                <div className="md:w-2/3 p-6 space-y-4">
                                    <div className="h-6 bg-white/5 rounded w-1/2"></div>
                                    <div className="h-4 bg-white/5 rounded w-1/3"></div>
                                    <div className="h-20 bg-white/5 rounded w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {sortedBookings.length === 0 ? renderEmptyState() : (
                            <div className="space-y-6">
                                {sortedBookings.map((booking) => (
                                    <BookingCard
                                        key={booking.id}
                                        booking={booking}
                                        onCancel={handleCancelBooking}
                                        onDownloadInvoice={handleDownloadInvoice}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default MyBookingsList;
