import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import {
    Bell,
    Settings,
    ArrowRight,
    Shield,
    Crown,
    Calendar,
    Mail,
    Phone,
    Diamond
} from 'lucide-react';

const WaitlistHub: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [priority, setPriority] = useState<'standard' | 'gold' | 'platinum'>('platinum');
    const [loading, setLoading] = useState(false);
    // Hardcoded for demo/hub view
    const carId = "lamborghini-huracan-evo"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!user) {
            toast.error("Please log in to join the waitlist");
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase
                .from('waitlist')
                .insert({
                    user_id: user.id,
                    car_id: carId,
                    priority_level: priority,
                    status: 'pending' // or active
                });

            if (error) throw error;

            toast.success("Added to waitlist!");
            // Optional: call process_waitlist_queue trigger if needed, or let cron handle it
        } catch (err) {
            console.error(err);
            toast.error("Failed to join waitlist");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black font-sans flex flex-col md:flex-row">

            {/* Left Panel - Hero */}
            <div className="w-full md:w-1/2 lg:w-[55%] relative h-[50vh] md:h-screen">
                <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80"
                    className="w-full h-full object-cover filter brightness-75"
                    alt="Lamborghini Huracán Evo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

                {/* Top Header Overlay on Left Panel */}
                <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-10">
                    <h1 className="text-white text-xl font-serif font-bold tracking-widest cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</h1>
                    <nav className="hidden lg:flex gap-6 text-xs font-bold uppercase tracking-widest text-white/70">
                        <a href="/fleet" className="hover:text-white transition-colors">The Fleet</a>
                        <a href="#" className="text-white border-b-2 border-white pb-1">Concierge</a>
                    </nav>
                </div>

                <div className="absolute bottom-12 left-8 md:left-12 z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                            Currently Unavailable
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-2">Lamborghini<br />Huracán Evo</h2>
                    <p className="text-gray-400 text-sm font-light tracking-wide flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Est. Return: Nov 24, 2024
                    </p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full md:w-1/2 lg:w-[45%] bg-[#0F1218] border-l border-white/5 flex flex-col h-auto md:h-screen overflow-y-auto">

                {/* Mobile Header for context */}
                <div className="md:hidden p-6 border-b border-white/5 flex justify-end gap-4">
                    <button className="text-xs font-bold text-gray-400 uppercase">Log In</button>
                    <button className="text-xs font-bold text-black bg-white px-4 py-2 rounded uppercase">Join Club</button>
                </div>
                <div className="hidden md:flex justify-end p-8 pb-0 gap-6">
                    <button className="text-xs font-bold text-gray-400 uppercase hover:text-white transition-colors">Log In</button>
                    <button className="text-xs font-bold text-black bg-white px-5 py-2.5 rounded uppercase hover:bg-gray-200 transition-colors">Join Club</button>
                </div>

                <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">

                    <div className="mb-10">
                        <h3 className="text-3xl font-serif font-medium text-white mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                            Reserve the Unattainable
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            The Huracán Evo is currently allocated. Join the priority waitlist to secure the next available slot tailored to your schedule.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Diamond className="w-4 h-4 text-white" />
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Priority Request Form</span>
                                <div className="h-px bg-white/10 flex-1" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Start Date</label>
                                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-white/30 focus:outline-none transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">End Date</label>
                                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-white/30 focus:outline-none transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Priority Access Level</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setPriority('standard')}
                                        className={`p-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all ${priority === 'standard'
                                            ? 'bg-white text-black border-white'
                                            : 'bg-transparent text-gray-500 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        Standard
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPriority('gold')}
                                        className={`p-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 ${priority === 'gold'
                                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500'
                                            : 'bg-transparent text-gray-500 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        Gold
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPriority('platinum')}
                                        className={`p-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1 ${priority === 'platinum'
                                            ? 'bg-blue-600/10 text-blue-400 border-blue-500'
                                            : 'bg-transparent text-gray-500 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        Platinum
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-gray-500"><Mail className="w-4 h-4" /></span>
                                    <input type="email" placeholder="client@luxedive.com" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white text-sm focus:border-white/30 focus:outline-none transition-colors" />
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-gray-500"><Phone className="w-4 h-4" /></span>
                                    <input type="tel" placeholder="+91" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white text-sm focus:border-white/30 focus:outline-none transition-colors" />
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl flex gap-4 mb-8">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                    <Bell className="w-4 h-4 text-blue-400" />
                                </div>
                                <p className="text-xs text-blue-200 leading-relaxed font-light">
                                    <span className="font-bold text-blue-400 block mb-1">Priority Access</span>
                                    LUXEDIVE Elite Members receive booking links <span className="text-white font-medium">48 hours</span> before public release.
                                </p>
                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 group disabled:opacity-70"
                        >
                            {loading ? 'Processing...' : 'Join Priority Waitlist'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                            Limited Slots Available for Q4 2024
                        </p>
                    </div>

                </div>

                <footer className="p-8 border-t border-white/5 flex gap-6 justify-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                    <a href="#" className="hover:text-gray-400">Terms</a>
                    <a href="#" className="hover:text-gray-400">Privacy</a>
                    <a href="#" className="hover:text-gray-400">Contact</a>
                </footer>

            </div>

        </div>
    );
};

export default WaitlistHub;
