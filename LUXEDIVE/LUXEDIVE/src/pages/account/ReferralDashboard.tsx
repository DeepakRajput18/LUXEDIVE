import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Copy,
    Share2,
    Gift,
    DollarSign,
    ArrowRight,
    TrendingUp,
    Award
} from 'lucide-react';

const ReferralDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const referralCode = "RAHUL-LUXE-882";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-black">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <h1 className="text-xl font-serif font-bold tracking-widest cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</h1>
                    <button onClick={() => navigate('/dashboard')} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                        Dashboard
                    </button>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-12">

                {/* Hero Section */}
                <div className="bg-black text-white rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">

                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/10">
                                <Gift className="w-3 h-3 text-yellow-400" /> Refer & Earn
                            </div>
                            <h2 className="text-4xl font-serif font-bold mb-4">Invite Friends.<br />Drive Free.</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Share the thrill of LUXEDIVE. Give your friends ₹2,500 off their first booking, and earn ₹5,000 in credits when they complete their trip.
                            </p>

                            <div className="bg-white/10 p-2 rounded-xl border border-white/10 flex items-center justify-between max-w-sm">
                                <code className="text-lg font-mono font-bold px-4">{referralCode}</code>
                                <button
                                    onClick={handleCopy}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                                >
                                    {copied ? 'Copied!' : 'Copy Code'}
                                </button>
                            </div>
                        </div>

                        <div className="md:w-1/2 flex justify-center">
                            <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-600/40">
                                    <DollarSign className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2">₹15,000</h3>
                                <p className="text-gray-400 text-sm mb-6">Total Earnings this Month</p>
                                <button className="w-full py-3 border border-white/20 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">
                                    View History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                <Users className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-green-600 flex items-center gap-1">+2 this week <TrendingUp className="w-3 h-3" /></span>
                        </div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Referrals</p>
                        <h4 className="text-3xl font-bold">12</h4>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                                <Award className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Pending Credits</p>
                        <h4 className="text-3xl font-bold">₹5,000</h4>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-black transition-colors" onClick={() => navigate('/gift-cards')}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                <Gift className="w-5 h-5" />
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Redeem Credits</p>
                        <h4 className="text-sm font-bold text-black border-b border-black inline-block pb-0.5">Shop Gift Cards</h4>
                    </div>
                </div>

                {/* How it Works */}
                <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-xl font-serif font-bold mb-8">How it Works</h3>
                    <div className="flex justify-between relative before:absolute before:top-4 before:left-0 before:right-0 before:h-0.5 before:bg-gray-200 before:-z-10">
                        <div className="flex flex-col items-center gap-4 bg-gray-50 px-4">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">1</div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Send Invite</p>
                        </div>
                        <div className="flex flex-col items-center gap-4 bg-gray-50 px-4">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">2</div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Friend Books</p>
                        </div>
                        <div className="flex flex-col items-center gap-4 bg-gray-50 px-4">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">3</div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">You Earn</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReferralDashboard;
