import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Gift,
    CreditCard,
    Send,
    CheckCircle2,
    Copy,
    Sparkles,
    ChevronRight,
    Mail
} from 'lucide-react';

const GiftCardHub: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'buy' | 'redeem'>('buy');
    const [selectedAmount, setSelectedAmount] = useState<number>(5000);
    const [customAmount, setCustomAmount] = useState<string>('');

    const amounts = [5000, 10000, 25000, 50000];

    return (
        <div className="min-h-screen bg-black font-sans text-white">

            {/* Header */}
            <header className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur border-b border-white/10 px-6 h-20 flex items-center justify-between">
                <h1 className="text-xl font-serif font-bold tracking-widest cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</h1>
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                        Dashboard
                    </button>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Gift className="w-4 h-4" />
                    </div>
                </div>
            </header>

            <div className="pt-20 min-h-screen flex flex-col md:flex-row">

                {/* Left: Visual / Hero */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">

                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                            Gift the<br />Extraordinary
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
                            Experiences that define luxury. Give the gift of adrenaline, power, and prestige with a LUXEDIVE digital card.
                        </p>

                        {/* Card Preview */}
                        <div className="relative w-full max-w-md aspect-[1.6/1] bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 shadow-2xl p-8 flex flex-col justify-between overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: 'skewX(-20deg)' }} />

                            <div className="flex justify-between items-start">
                                <span className="font-serif font-bold tracking-widest text-xl">LUXEDIVE</span>
                                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                            </div>

                            <div>
                                <p className="text-gray-400 font-mono text-sm mb-2">**** **** **** 8821</p>
                                <p className="font-bold text-2xl">₹{customAmount || selectedAmount.toLocaleString()}</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right: Actions */}
                <div className="w-full md:w-1/2 bg-[#0F1218] border-l border-white/5 p-8 md:p-16 flex flex-col justify-center">

                    <div className="max-w-md mx-auto w-full">

                        {/* Tabs */}
                        <div className="flex p-1 bg-white/5 rounded-xl mb-10">
                            <button
                                onClick={() => setActiveTab('buy')}
                                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === 'buy' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Buy Gift Card
                            </button>
                            <button
                                onClick={() => setActiveTab('redeem')}
                                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === 'redeem' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Redeem Code
                            </button>
                        </div>

                        {activeTab === 'buy' ? (
                            <div className="space-y-8 animate-fade-in">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">Select Amount</label>
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {amounts.map((amt) => (
                                            <button
                                                key={amt}
                                                onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                                                className={`py-4 px-6 rounded-xl border text-sm font-bold transition-all ${selectedAmount === amt && !customAmount ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
                                            >
                                                ₹{amt.toLocaleString()}
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Enter custom amount"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recipient Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                                            <input type="email" placeholder="friend@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Personal Message (Optional)</label>
                                        <textarea rows={3} placeholder="Add a note..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none" />
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                                    Proceed to Pay <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8 animate-fade-in">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                        <Gift className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Have a Gift Code?</h3>
                                    <p className="text-gray-400 text-sm">Enter the 16-digit code from your email to add funds to your wallet.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gift Code</label>
                                    <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors font-mono text-center tracking-widest uppercase" />
                                </div>

                                <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                    Redeem Balance
                                </button>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default GiftCardHub;
