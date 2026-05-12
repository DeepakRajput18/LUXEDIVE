import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { AlertTriangle, Check, Unlock, Speaker, Armchair, Zap, User } from 'lucide-react'

// Mock Upgrade Page (Image 14 - Upgrade Offer)
export default function UpgradeOffer() {
    const [accepted, setAccepted] = useState(false)

    if (accepted) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-center">
                <div>
                    <div className="w-20 h-20 bg-emerald-900/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-serif text-white mb-2">Upgrade Confirmed</h1>
                    <p className="text-luxe-gray">Your Complimentary BMW 7 Series is secured.</p>
                    <Button className="mt-8" onClick={() => window.history.back()}>Return to Booking</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-12 flex items-center justify-center">
            <div className="max-w-6xl w-full">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 px-3 py-1 rounded border border-amber-500/20 text-xs font-bold tracking-widest uppercase mb-4">
                        <AlertTriangle className="w-4 h-4" /> Action Required
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">A Premium Upgrade Awaits</h1>
                    <p className="text-luxe-gray max-w-2xl mx-auto text-lg">
                        Dear Mr. Sharma, your selected Audi A8 requires unexpected maintenance. We have secured a complimentary upgrade to a superior vehicle for your journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left - Unavailable */}
                    <Card className="bg-luxe-dark/50 border-white/5 opacity-60 grayscale relative overflow-hidden h-[500px] flex flex-col">
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="p-8 relative z-10 flex-1">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-gray-800 text-gray-400 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">Original Selection</span>
                                <span className="text-red-500 font-bold text-xs uppercase flex items-center gap-1">🚫 Unavailable</span>
                            </div>
                            <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800" className="w-full h-48 object-contain mb-8 mix-blend-overlay" />
                            <h3 className="text-2xl font-serif text-white mb-1">Audi A8</h3>
                            <p className="text-gray-500 text-sm mb-6">2023 Model • Standard Interior</p>
                            <ul className="space-y-2 text-gray-500 text-sm">
                                <li>335 HP</li>
                                <li>Automatic</li>
                                <li>Leather Seats</li>
                                <li>Executive Pkg</li>
                            </ul>
                        </div>
                    </Card>

                    {/* Right - Upgrade */}
                    <Card className="bg-gradient-to-b from-blue-900/20 to-luxe-dark border-blue-500/30 relative overflow-hidden h-[550px] shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col transform md:scale-105 border-2">
                        <div className="absolute top-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6]" />
                        <div className="p-8 relative z-10 flex-1">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-blue-600 text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                                    <Check className="w-3 h-3" /> Complimentary Upgrade
                                </span>
                                <span className="text-blue-400 font-bold text-xs uppercase flex items-center gap-1"><Unlock className="w-3 h-3" /> Unlocked</span>
                            </div>

                            <div className="relative mb-8">
                                <div className="absolute -top-4 -right-4 bg-emerald-500 text-black font-bold text-xs px-2 py-1 transform rotate-12">+₹12,450 Value (Free)</div>
                                <img src="https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=800" className="w-full h-56 object-contain" />
                            </div>

                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <h3 className="text-3xl font-serif text-white mb-1">BMW 7 Series</h3>
                                    <p className="text-blue-200 text-sm">2024 Model • Executive Lounge</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-gray-500 text-sm line-through">₹45,000/day</span>
                                    <span className="block text-white font-bold text-xl">₹30,000/day</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: '536 HP', icon: Zap },
                                    { label: 'Massage Seats', icon: Armchair },
                                    { label: 'Bowers & Wilkins', icon: Speaker },
                                    { label: 'Chauffeur Ready', icon: User },
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <feat.icon className="w-3 h-3" />
                                        </div>
                                        {feat.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 bg-blue-950/30 border-t border-blue-500/20 flex gap-4">
                            <Button variant="outline" className="flex-1 border-gray-600 text-gray-400 hover:text-white">Speak to Concierge</Button>
                            <Button className="flex-1 bg-white text-black hover:bg-gray-200" onClick={() => setAccepted(true)}>Accept Upgrade →</Button>
                        </div>
                    </Card>
                </div>

                <p className="text-center text-xs text-gray-500 mt-12">
                    © 2024 LUXEDIVE. AHMEDABAD. | ⏰ Pickup location and time remain unchanged.
                </p>
            </div>
        </div>
    )
}
