import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Settings,
    CreditCard,
    MapPin,
    Clock,
    Shield,
    Crown,
    LogOut,
    Calendar,
    ChevronRight,
    Bell,
    Star,
    Zap,
    Car
} from 'lucide-react';

const UserDashboard: React.FC = () => {
    const navigate = useNavigate();

    // Mock User State
    const user = {
        name: "Rahul Mehta",
        tier: "Platinum",
        points: 12500,
        upcomingExpiries: 0,
        memberSince: "Nov 2021"
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-black flex flex-col md:flex-row">

            {/* Sidebar Navigation (Desktop) */}
            <aside className="hidden md:flex flex-col w-72 bg-black text-white h-screen sticky top-0 p-8">
                <h1 className="text-xl font-serif font-bold tracking-widest mb-12 cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</h1>

                <nav className="flex-1 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-xl font-bold text-sm tracking-wide">
                        <Crown className="w-5 h-5" /> Dashboard
                    </button>
                    <button onClick={() => navigate('/bookings')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm tracking-wide transition-colors">
                        <Calendar className="w-5 h-5" /> My Bookings
                    </button>
                    <button onClick={() => navigate('/account/rentals')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm tracking-wide transition-colors">
                        <Car className="w-5 h-5" /> Active Rentals
                    </button>
                    <button onClick={() => navigate('/account/payments')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm tracking-wide transition-colors">
                        <CreditCard className="w-5 h-5" /> Payments
                    </button>
                    <button onClick={() => navigate('/account/profile')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm tracking-wide transition-colors">
                        <Settings className="w-5 h-5" /> Settings
                    </button>
                    <button onClick={() => navigate('/support')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-bold text-sm tracking-wide transition-colors">
                        <Shield className="w-5 h-5" /> Support
                    </button>
                </nav>

                <div className="pt-8 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold">
                            RM
                        </div>
                        <div>
                            <p className="font-bold text-sm leading-none mb-1">{user.name}</p>
                            <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">{user.tier} Member</p>
                        </div>
                    </div>
                    <button className="w-full flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">

                {/* Mobile Header */}
                <header className="md:hidden bg-black text-white p-6 sticky top-0 z-50 flex items-center justify-between">
                    <h1 className="text-lg font-serif font-bold tracking-widest">LUXEDIVE</h1>
                    <button className="p-2"><Settings className="w-5 h-5" /></button>
                </header>

                <div className="p-6 md:p-12 lg:p-16 max-w-6xl mx-auto">

                    {/* Greetings & Stats */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <p className="text-gray-500 font-serif italic text-lg mb-2">Welcome back,</p>
                            <h2 className="text-4xl font-serif font-bold text-black">{user.name}</h2>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-black text-white p-4 rounded-xl min-w-[140px]">
                                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">Loyalty Points</p>
                                <p className="text-2xl font-mono font-bold flex items-center gap-2">
                                    {user.points.toLocaleString()} <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                </p>
                            </div>
                            <button className="bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
                                <Bell className="w-6 h-6 text-gray-400" />
                                <span className="absolute top-12 right-12 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-50" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {[
                            { icon: Zap, label: 'Book Instantly', color: 'text-yellow-600', bg: 'bg-yellow-50', link: '/fleet' },
                            { icon: Car, label: 'My Garage', color: 'text-blue-600', bg: 'bg-blue-50', link: '/bookings' },
                            { icon: MapPin, label: 'Showrooms', color: 'text-purple-600', bg: 'bg-purple-50', link: '/locations' },
                            { icon: Shield, label: 'Safety Center', color: 'text-green-600', bg: 'bg-green-50', link: '/support' },
                        ].map((action, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(action.link)}
                                className={`${action.bg} p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer border border-transparent hover:border-black/5`}
                            >
                                <action.icon className={`w-8 h-8 ${action.color}`} />
                                <span className="font-bold text-xs uppercase tracking-wider">{action.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Recent Activity / Current Booking */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left: Active Booking */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Active Reservation</h3>
                                <button className="text-xs font-bold text-black border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">
                                    View All
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={() => navigate('/booking/confirmation/active-porsche-911')}>
                                <div className="h-48 bg-gray-100 relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt="Porsche 911"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-green-600 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h4 className="text-2xl font-serif font-bold mb-1">Porsche 911 GT3 RS</h4>
                                            <p className="text-sm text-gray-500">Ahmedabad Showroom • Nov 24-26</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Countdown</p>
                                            <p className="text-xl font-mono font-bold">48:12:05</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="flex-1 py-3 bg-black text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-gray-800 transition-colors">
                                            Extend Booking
                                        </button>
                                        <button className="flex-1 py-3 border border-gray-200 font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-gray-50 transition-colors">
                                            Manage
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Notifications / Offers */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">For You</h3>

                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white text-center shadow-lg shadow-blue-600/20 mb-6 relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                                <Crown className="w-8 h-8 mx-auto mb-4" />
                                <h4 className="font-serif font-bold text-xl mb-2">Upgrade to Diamond</h4>
                                <p className="text-blue-100 text-sm mb-6 leading-relaxed">Unlock priority access to our Hypercar fleet and dedicated concierge.</p>
                                <button className="w-full py-3 bg-white text-blue-800 font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-blue-50 transition-colors">
                                    View Benefits
                                </button>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                                <h4 className="font-bold text-sm mb-4">Verification Status</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Identity</span>
                                        <span className="text-green-600 font-bold text-xs uppercase">Verified</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> License</span>
                                        <span className="text-green-600 font-bold text-xs uppercase">Verified</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Assessment</span>
                                        <span className="text-gray-400 font-bold text-xs uppercase">Pending</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>

        </div>
    );
};

export default UserDashboard;
