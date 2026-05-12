import { Button } from '../../components/ui/Button'
import { AlertTriangle, Check, LockOpen, MessageSquare, ArrowRight, ShieldCheck, Music, Armchair, Zap } from 'lucide-react'

// Mock Data
const ORIGINAL_CAR = {
    name: 'Audi A8',
    year: '2023',
    spec: 'Standard Interior',
    features: ['335 HP', 'Automatic', 'Leather Seats', 'Executive Pkg'],
    image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=600'
}

const UPGRADE_CAR = {
    name: 'BMW 7 Series',
    year: '2024',
    spec: 'Executive Lounge',
    features: [
        { name: '536 HP', icon: Zap },
        { name: 'Massage Seats', icon: Armchair },
        { name: 'Bowers & Wilkins', icon: Music },
        { name: 'Chauffeur Ready', icon: ShieldCheck }
    ],
    priceOld: 35000,
    priceNew: 25000,
    value: 10000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=800'
}

export default function UpgradeOffer() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="max-w-5xl w-full bg-[#121212] border border-white/5 rounded-2xl overflow-hidden relative shadow-2xl">

                {/* Header */}
                <div className="p-8 pb-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-yellow-900/20 text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                        <AlertTriangle className="w-3 h-3" /> Action Required
                    </div>
                    <h1 className="text-3xl font-serif text-white mb-3">A Premium Upgrade Awaits</h1>
                    <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed font-light">
                        Dear Mr. Sharma, your selected Audi A8 requires unexpected maintenance. We have secured a complimentary upgrade to a superior vehicle for your journey, ensuring your experience remains seamless.
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-b border-white/5">

                    {/* LEFT: UNAVAILABLE */}
                    <div className="p-8 bg-[#0A0A0A] relative grayscale opacity-70 border-r border-white/5">
                        <div className="absolute top-6 left-6 z-10">
                            <span className="bg-[#1A1A1A] text-gray-500 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                                Original Selection
                            </span>
                            <span className="bg-red-900/20 text-red-500 border border-red-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm ml-2">
                                🚫 Unavailable
                            </span>
                        </div>

                        <div className="mt-8 mb-6 h-48 relative">
                            <img src={ORIGINAL_CAR.image} className="w-full h-full object-contain" alt={ORIGINAL_CAR.name} />
                        </div>

                        <h3 className="text-2xl font-serif text-gray-400">{ORIGINAL_CAR.name}</h3>
                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-6">{ORIGINAL_CAR.year} Model • {ORIGINAL_CAR.spec}</p>

                        <ul className="space-y-3">
                            {ORIGINAL_CAR.features.map(f => (
                                <li key={f} className="text-sm text-gray-600 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-gray-700 rounded-full" /> {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT: UPGRADE */}
                    <div className="p-8 bg-[#121212] relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />

                        <div className="absolute top-6 left-6 z-10 flex gap-2">
                            <span className="bg-emerald-900/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1">
                                <Check className="w-3 h-3" /> Complimentary Upgrade
                            </span>
                            <span className="bg-luxe-gold/10 text-luxe-gold border border-luxe-gold/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1">
                                <LockOpen className="w-3 h-3" /> Unlocked
                            </span>
                        </div>
                        <span className="absolute top-6 right-6 bg-[#4169E1] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded shadow-lg shadow-blue-900/20">
                            +₹{UPGRADE_CAR.value.toLocaleString('en-IN')} Value (Free)
                        </span>

                        <div className="mt-8 mb-6 h-48 relative">
                            <img src={UPGRADE_CAR.image} className="w-full h-full object-contain drop-shadow-2xl" alt={UPGRADE_CAR.name} />
                        </div>

                        <h3 className="text-2xl font-serif text-white">{UPGRADE_CAR.name}</h3>
                        <p className="text-xs text-blue-200 uppercase tracking-wider mb-2">{UPGRADE_CAR.year} Model • {UPGRADE_CAR.spec}</p>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-gray-500 line-through text-sm">₹{UPGRADE_CAR.priceOld.toLocaleString('en-IN')}/day</span>
                            <span className="text-white font-bold text-lg">₹{UPGRADE_CAR.priceNew.toLocaleString('en-IN')}/day</span>
                        </div>

                        <ul className="grid grid-cols-2 gap-3">
                            {UPGRADE_CAR.features.map(f => (
                                <li key={f.name} className="text-sm text-gray-300 flex items-center gap-2 bg-white/5 p-2 rounded border border-white/5">
                                    <f.icon className="w-4 h-4 text-luxe-gold" /> {f.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 bg-[#0F0F0F] flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Pickup location and time remain unchanged.
                    </p>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none border-white/10 text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs font-bold h-12 px-6">
                            <MessageSquare className="w-4 h-4 mr-2" /> Speak to Concierge
                        </Button>
                        <Button className="flex-1 md:flex-none bg-white text-black hover:bg-luxe-gold uppercase tracking-widest text-xs font-bold h-12 px-8 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                            Accept Upgrade <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>

                <div className="bg-black py-3 text-center border-t border-white/5">
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest">
                        © 2024 LUXEDIVE. AHMEDABAD. | Privacy • Terms
                    </p>
                </div>
            </div>
        </div>
    )
}
