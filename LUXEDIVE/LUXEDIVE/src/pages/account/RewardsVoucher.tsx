import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Crown,
    Ticket,
    ArrowRight,
    Lock as LockIcon,
    Copy,
    Plane,
    Car,
    Award,
    Cake,
    Zap,
    Check
} from 'lucide-react';

interface Voucher {
    id: string;
    title: string;
    description: string;
    code?: string;
    expiry: string;
    icon: any;
    tier: 'all' | 'platinum' | 'running';
    isLocked?: boolean;
    type: 'discount' | 'upgrade' | 'service';
}

const RewardsVoucher: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');

    // Mock Data
    const vouchers: Voucher[] = [
        {
            id: 'v1',
            title: '15% Off Ferrari Booking',
            description: 'Valid for F8 Tributo & Roma models.',
            code: 'FERRARI15',
            expiry: 'In 2 Days',
            icon: Award,
            tier: 'all',
            type: 'discount'
        },
        {
            id: 'v2',
            title: 'Free Chauffeur Upgrade',
            description: 'Applicable on Rolls Royce Ghost rentals.',
            code: 'RR-CHAUFFEUR',
            expiry: '30 Sept 2023',
            icon: UserIcon, // Mocked below
            tier: 'all',
            type: 'upgrade'
        },
        {
            id: 'v3',
            title: 'Flat ₹5000 Off',
            description: 'Weekend getaway package specials.',
            code: 'WEEKEND5k',
            expiry: '15 Oct 2023',
            icon: Zap,
            tier: 'all',
            type: 'discount'
        },
        {
            id: 'v4',
            title: 'Airport Transfer Deal',
            description: 'Complimentary pickup in Mercedes S-Class.',
            code: 'AIR-VIP',
            expiry: 'Dec 31, 2023',
            icon: Plane,
            tier: 'all',
            type: 'service'
        },
        {
            id: 'v5',
            title: 'Birthday Special',
            description: 'Double points on your birthday month.',
            expiry: 'This Month',
            icon: Cake,
            tier: 'all',
            type: 'service'
        },
        {
            id: 'v6', // Locked
            title: 'Global Concierge Access',
            description: 'Only for Diamond Tier members.',
            expiry: 'Lifetime',
            icon: LockIcon,
            tier: 'all',
            isLocked: true,
            type: 'service'
        }
    ];

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        alert(`Copied: ${code}`);
    };

    return (
        <div className="min-h-screen bg-[#0F1218] text-white font-sans pb-20">

            {/* Header (Simplified) */}
            <header className="border-b border-white/5 py-6 px-8 flex justify-between items-center sticky top-0 bg-[#0F1218]/90 z-50 backdrop-blur">
                <div className="flex items-center gap-8">
                    <h1 className="text-xl font-serif font-bold tracking-widest text-white cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</h1>
                    <nav className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <a href="/fleet" className="hover:text-white transition-colors">Fleet</a>
                        <a href="/services" className="hover:text-white transition-colors">Services</a>
                        <a href="#" className="text-white">Rewards</a>
                        <a href="/account" className="hover:text-white transition-colors">Profile</a>
                    </nav>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-bold">
                    <Crown className="w-3 h-3" /> BALANCE: 24,500 Pts
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-white/5">
                <div className="absolute top-0 right-0 w-1/2 h-full">
                    <img
                        src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80"
                        className="w-full h-full object-cover opacity-20 mask-gradient"
                        alt="Luxury Car"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F1218] to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div>
                        <div className="inline-flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs mb-4 border border-yellow-500/20 px-3 py-1 rounded bg-yellow-500/5">
                            <Crown className="w-4 h-4" /> Current Tier
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif font-medium mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Platinum Member</h2>
                        <p className="text-gray-400 max-w-md leading-relaxed">
                            You are part of the elite. Enjoy priority access, complimentary upgrades, and bespoke rewards tailored to your lifestyle.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">Progress to Diamond Tier</span>
                            <span className="text-gray-400 text-xs">500 points remaining</span>
                        </div>

                        <div className="h-2 bg-gray-700 rounded-full mb-6 overflow-hidden">
                            <div className="h-full w-[90%] bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-4xl font-serif text-white">24,500 <span className="text-base text-gray-500 font-sans">Pts</span></p>
                                <p className="text-xs text-green-500 mt-1 flex items-center gap-1"><ArrowRight className="w-3 h-3" /> +1,200 this month</p>
                            </div>
                            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-widest text-xs rounded transition-colors shadow-lg shadow-yellow-500/20">
                                Redeem Points
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* Vouchers Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <Ticket className="w-6 h-6" />
                            </div>
                            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Exclusive Vouchers</h3>
                        </div>
                        <h2 className="text-3xl font-serif font-medium">Unlock premium experiences</h2>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {['All Rewards', 'Luxury Sedans', 'Sports Cars', 'Chauffeur'].map((f) => (
                            <button
                                key={f}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border ${f === 'All Rewards'
                                        ? 'bg-white text-black border-white'
                                        : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {vouchers.map((voucher) => (
                        <div
                            key={voucher.id}
                            className={`relative p-6 rounded-xl border transition-all group ${voucher.isLocked
                                    ? 'bg-white/5 border-dashed border-white/10'
                                    : 'bg-[#151921] border-dashed border-white/20 hover:border-blue-500/50 hover:bg-[#1A1F2E]'
                                }`}
                        >
                            {voucher.isLocked && (
                                <div className="absolute inset-0 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                                    <LockIcon className="w-8 h-8 text-gray-500 mb-3" />
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Diamond Tier Only</p>
                                    <p className="text-gray-600 text-[10px]">Reach 25,000 points to unlock</p>
                                </div>
                            )}

                            <div className={`flex items-start justify-between mb-6 ${voucher.isLocked ? 'blur-sm' : ''}`}>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <voucher.icon className={`w-6 h-6 ${voucher.type === 'discount' ? 'text-yellow-500' : 'text-blue-400'}`} />
                                </div>
                                {voucher.code && (
                                    <div className="text-[10px] text-gray-500 font-mono bg-black px-2 py-1 rounded border border-white/5">
                                        {voucher.expiry}
                                    </div>
                                )}
                            </div>

                            <div className={voucher.isLocked ? 'blur-sm' : ''}>
                                <h3 className="text-xl font-medium mb-2 group-hover:text-blue-400 transition-colors">{voucher.title}</h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed min-h-[40px]">{voucher.description}</p>

                                {voucher.code ? (
                                    <button
                                        onClick={() => handleCopy(voucher.code!)}
                                        className="w-full py-3 border border-white/10 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all group-hover:border-blue-500/30"
                                    >
                                        <Copy className="w-3 h-3" /> Copy Code
                                    </button>
                                ) : (
                                    <button className="w-full py-3 bg-white text-black rounded hover:bg-gray-200 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all">
                                        <Check className="w-3 h-3" /> Activate
                                    </button>
                                )}
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0F1218] rounded-full" />
                            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0F1218] rounded-full" />
                        </div>
                    ))}

                </div>
            </section>

        </div>
    );
};

// Helper Icon
const UserIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

export default RewardsVoucher;
