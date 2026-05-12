import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
    AlertTriangle,
    Clock,
    MapPin,
    ArrowRight,
    ShieldAlert,
    Phone
} from 'lucide-react';

const LateReturnAdvisory: React.FC = () => {
    const navigate = useNavigate();
    const { rentalId } = useParams<{ rentalId: string }>();
    const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({ hours: 0, minutes: 0, seconds: 0 });
    const [penalty, setPenalty] = useState(0);

    // Mock overdue data
    // In production, fetch from `bookings` where id = rentalId
    const overdueSince = new Date(Date.now() - 1000 * 60 * 60 * 2.5); // 2.5 hours ago
    const penaltyRate = 500; // per hour

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = now.getTime() - overdueSince.getTime();

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
            setPenalty(Math.ceil(diff / (1000 * 60 * 60)) * penaltyRate);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#0F1218] text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">

            {/* Background Ambient Effect */}
            <div className="absolute inset-0 bg-red-900/10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/20 blur-[120px] rounded-full pointer-events-none" />

            {/* Main Card */}
            <div className="w-full max-w-5xl bg-[#1A1F2E] border border-red-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(220,38,60,0.2)] flex flex-col md:flex-row relative z-10">

                {/* Left Panel: Vehicle */}
                <div className="md:w-5/12 relative min-h-[300px] md:min-h-0">
                    <img
                        src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80"
                        alt="Overdue Vehicle"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute top-6 left-6">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded flex items-center gap-1 shadow-lg animate-pulse">
                            <ShieldAlert className="w-3 h-3 fill-current" /> OVERDUE VEHICLE
                        </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-serif font-bold text-white mb-1">Mercedes-Benz S-Class</h3>
                        <p className="font-mono text-red-400">GJ-01-WB-9999</p>
                    </div>
                </div>

                {/* Right Panel: Alert Details */}
                <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center text-center md:text-left relative">
                    {/* Glowing Border inset */}
                    <div className="absolute inset-0 border-l border-red-500/20 hidden md:block" />

                    <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-red-400 font-bold tracking-widest uppercase">LATE RETURN ADVISORY</p>
                            <p className="text-xs text-gray-500 font-mono">RENTAL ID: #{rentalId || 'RNT-8821X'}</p>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4">
                        Rental Period Expired
                    </h1>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto md:mx-0">
                        Your vehicle was due for return at <span className="text-white font-medium">10:00 AM</span>.
                        Please extend your rental or return the vehicle immediately to avoid further penalties.
                    </p>

                    {/* Countdown Timer */}
                    <div className="bg-black/40 border border-white/5 rounded-xl p-6 mb-8 flex flex-col items-center justify-center">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Clock className="w-3 h-3 text-red-500" /> Time Overdue
                        </p>
                        <div className="flex items-baseline gap-1 text-red-500 font-mono">
                            <span className="text-4xl md:text-5xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="text-xl text-red-500/50">:</span>
                            <span className="text-4xl md:text-5xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="text-xl text-red-500/50">:</span>
                            <span className="text-4xl md:text-5xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 w-full text-center">
                            <p className="text-sm text-gray-400">
                                Penalty Accruing: <span className="text-red-400 font-bold">₹{penaltyRate}/hour</span>
                            </p>
                            <p className="text-xs text-gray-600 mt-1">Current Penalty: ₹{penalty}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate('/rental/extend')}
                            className="w-full py-4 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg"
                        >
                            EXTEND RENTAL NOW <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="w-full py-4 bg-[#0F1218] border border-white/10 text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            Navigate to Drop-off Location
                        </button>
                    </div>

                    <div className="mt-8 text-center md:text-left pt-6 border-t border-white/5">
                        <a href="#" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                            <Phone className="w-3 h-3" /> Contact Premium Support
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LateReturnAdvisory;
