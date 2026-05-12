import React, { useState, useEffect } from 'react';
import { Clock, Info } from 'lucide-react';

const MaintenanceMode: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Mock scheduled end time (e.g., 4 hours from now)
    const scheduledEnd = new Date(Date.now() + 1000 * 60 * 60 * 3.75); // 3h 45m

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = scheduledEnd.getTime() - now.getTime();

            if (diff <= 0) {
                clearInterval(timer);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-6 relative">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none" />

            {/* Centered Content */}
            <div className="max-w-xl w-full text-center relative z-10 p-12 border border-white/5 rounded-2xl bg-black/40 backdrop-blur-sm shadow-2xl">

                <div className="mb-12">
                    <h1 className="text-4xl font-serif font-bold tracking-widest mb-2">LUXEDIVE</h1>
                    <p className="text-xs font-bold text-gray-500 tracking-[0.3em] uppercase">Ahmedabad</p>
                </div>

                <h2 className="text-2xl font-serif text-white mb-6">Refining the Experience</h2>
                <p className="text-gray-400 font-light leading-relaxed mb-10 max-w-sm mx-auto">
                    We are currently enhancing our digital platform to serve you better. The showroom remains open for physical inquiries.
                </p>

                <div className="mb-10 p-6 border-y border-white/10">
                    <div className="flex justify-center items-baseline gap-1 font-mono text-white mb-2">
                        {timeLeft.days > 0 && (
                            <>
                                <span className="text-3xl">{String(timeLeft.days).padStart(2, '0')}</span>
                                <span className="text-sm text-gray-600 mr-2">d</span>
                                <span className="text-xl text-gray-600">:</span>
                            </>
                        )}
                        <span className="text-3xl">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="text-sm text-gray-600 mr-2">h</span>
                        <span className="text-xl text-gray-600">:</span>
                        <span className="text-3xl">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="text-sm text-gray-600 mr-2">m</span>
                        <span className="text-xl text-gray-600">:</span>
                        <span className="text-3xl">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="text-sm text-gray-600">s</span>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2">
                        <Clock className="w-3 h-3" /> Scheduled Re-opening: 04:00 AM IST
                    </p>
                </div>

                <div className="flex justify-center gap-6 text-xs text-gray-600 mb-8">
                    <a href="#" className="hover:text-white transition-colors">Contact Concierge</a>
                    <span>•</span>
                    <a href="#" className="hover:text-white transition-colors">Emergency Support</a>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-700 uppercase tracking-wider">
                    <Info className="w-3 h-3" />
                    <span>Server Status: Maintenance Mode (Code 503)</span>
                </div>

            </div>

            <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-gray-800 uppercase tracking-widest">
                &copy; 2024 LUXEDIVE Rentals Pvt Ltd.
            </div>

        </div>
    );
};

export default MaintenanceMode;
