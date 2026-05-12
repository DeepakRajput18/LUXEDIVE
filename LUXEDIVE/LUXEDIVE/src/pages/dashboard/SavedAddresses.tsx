import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Home, Briefcase, Plane, Plus, MapPin, LogOut, CreditCard, Settings, User, AlertCircle, RefreshCcw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'sonner';

interface SavedAddress {
    id: string;
    label: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state?: string;
    pincode: string;
    is_default: boolean;
}

export default function SavedAddresses() {
    const { user, signOut } = useAuth();
    const [addresses, setAddresses] = useState<SavedAddress[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            fetchAddresses();
        }
    }, [user]);

    const fetchAddresses = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const { data, error: apiError } = await supabase
                .from('user_addresses')
                .select('*')
                .eq('user_id', user!.id)
                .order('created_at', { ascending: false });

            if (apiError) throw apiError;
            setAddresses(data || []);
        } catch (err: any) {
            console.error('Error fetching addresses:', err);
            setError(err.message || 'Failed to load addresses');
            toast.error('Unable to load your saved addresses');
        } finally {
            setIsLoading(false);
        }
    };

    const getIconForLabel = (label: string) => {
        const l = label.toLowerCase();
        if (l.includes('home')) return Home;
        if (l.includes('work') || l.includes('office')) return Briefcase;
        if (l.includes('airport') || l.includes('travel')) return Plane;
        return MapPin;
    };

    const formatAddress = (addr: SavedAddress) => {
        return [addr.address_line1, addr.address_line2, addr.city, addr.state, addr.pincode]
            .filter(Boolean)
            .join(', ');
    };

    return (
        <div className="min-h-screen bg-luxe-black text-white flex pt-16">
            {/* LEFT SIDEBAR NAVIGATION */}
            <div className="w-80 bg-[#121212] border-r border-white/5 hidden lg:flex flex-col h-[calc(100vh-64px)] fixed left-0 top-16 z-20">
                <div className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-luxe-gold/20 flex items-center justify-center border border-luxe-gold/50">
                            <User className="w-6 h-6 text-luxe-gold" />
                        </div>
                        <div>
                            <h3 className="font-serif text-white">{user?.user_metadata?.full_name || 'Alex Mercer'}</h3>
                            <p className="text-[10px] text-luxe-gold uppercase tracking-widest font-bold">Elite Member</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-1">
                    <Link to="/profile" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <User className="w-4 h-4" /> <span className="text-sm tracking-wide">Profile</span>
                    </Link>
                    <Link to="/bookings" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <MapPin className="w-4 h-4" /> <span className="text-sm tracking-wide">Bookings</span>
                    </Link>
                    <Link to="/wallet" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <CreditCard className="w-4 h-4" /> <span className="text-sm tracking-wide">Wallet</span>
                    </Link>
                    <div className="flex items-center gap-4 px-4 py-3 text-[#4169E1] bg-[#4169E1]/10 rounded-lg">
                        <MapPin className="w-4 h-4" /> <span className="text-sm tracking-wide font-medium">Addresses</span>
                    </div>
                    <Link to="/settings" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <Settings className="w-4 h-4" /> <span className="text-sm tracking-wide">Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button 
                        onClick={() => signOut()}
                        className="flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-900/10 w-full rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> <span className="text-sm tracking-wide font-medium">Sign Out</span>
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 lg:ml-80 bg-[#0A0A0A] min-h-full">
                <div className="p-8 lg:p-12 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span>My Account</span> <span className="text-gray-700">›</span> <span className="text-white">Saved Addresses</span>
                            </div>
                            <h1 className="text-4xl font-serif text-white mb-2">Address Book</h1>
                            <p className="text-gray-400 font-light text-lg">Manage your premium pickup and drop-off locations in Ahmedabad for rapid booking.</p>
                        </div>
                        <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-mono text-white">
                            {addresses.length} LOCATIONS SAVED
                        </span>
                    </div>

                    {error && (
                        <div className="bg-red-900/10 border border-red-900/50 rounded-lg p-6 text-center text-red-400 mb-8 backdrop-blur-sm">
                            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                            <h3 className="font-bold mb-1 text-red-300">Something went wrong</h3>
                            <p className="text-sm mb-4">{error}</p>
                            <button
                                onClick={fetchAddresses}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-950/50 border border-red-900 text-red-300 rounded-md text-sm font-bold hover:bg-red-900 transition-colors"
                            >
                                <RefreshCcw size={14} /> Retry
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* Add New Card */}
                        <div className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-12 min-h-[280px] hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer group">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Plus className="w-8 h-8 text-gray-400 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">Add New Address</h3>
                            <p className="text-sm text-gray-500">Save a new location for future trips</p>
                        </div>

                        {/* Address Cards */}
                        {isLoading ? (
                            [1, 2].map(i => (
                                <div key={i} className="h-72 bg-[#121212] border border-white/5 rounded-2xl animate-pulse p-8">
                                    <div className="h-6 bg-white/5 rounded w-1/2 mb-4"></div>
                                    <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-white/5 rounded w-2/3"></div>
                                </div>
                            ))
                        ) : (
                            addresses.map(addr => {
                                const Icon = getIconForLabel(addr.label);
                                return (
                                    <div key={addr.id} className="bg-[#121212] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors relative group">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-gray-300">
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="text-lg font-bold text-white tracking-wide">{addr.label}</h3>
                                                        {addr.is_default && (
                                                            <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-luxe-gold text-black">
                                                                DEFAULT
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{addr.city}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 font-light leading-relaxed mb-8 pr-8 border-l-2 border-white/10 pl-4">
                                            {formatAddress(addr)}
                                        </p>

                                        <Button className="w-full bg-[#4169E1]/10 text-[#4169E1] border border-[#4169E1]/30 hover:bg-[#4169E1] hover:text-white h-12 uppercase tracking-widest text-xs font-bold transition-all">
                                            Edit Address
                                        </Button>
                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/* Map Preview */}
                    <div className="mt-12 rounded-2xl overflow-hidden border border-white/5 relative h-64 grayscale hover:grayscale-0 transition-all duration-700">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.957247738221!2d72.5073!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzIxLjAiTiA3MsKwMzAnMjYuMyJF!5e0!3m2!1sen!2sin!4v1635324545041!5m2!1sen!2sin"
                            className="w-full h-full border-0 opacity-60"
                            loading="lazy"
                        />
                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#4169E1] rounded-full animate-pulse" /> {addresses.length} Active Pins
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
