import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Gift, Calendar, Mail, User, CreditCard, ArrowRight } from 'lucide-react'

// Page 34: Digital Gift Cards
export default function GiftCards() {
    const [amount, setAmount] = useState(50000)
    const [theme, setTheme] = useState<'silver' | 'obsidian' | 'gold'>('silver')

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HERO */}
            <div className="container mx-auto px-6 mb-16 text-center">
                <h1 className="text-5xl font-serif text-white mb-4">GIVE THE DRIVE OF A LIFETIME</h1>
                <p className="text-gray-400 font-light text-lg">The perfect gift for the automotive connoisseur.</p>
            </div>

            <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* LEFT: PREVIEW */}
                <div className="sticky top-24">
                    <div className={`aspect-[1.586/1] rounded-2xl p-8 relative overflow-hidden shadow-2xl transition-all duration-500 border border-white/10 ${theme === 'silver' ? 'bg-gradient-to-br from-gray-200 to-gray-400 text-black' :
                        theme === 'obsidian' ? 'bg-gradient-to-br from-gray-900 to-black text-white' :
                            'bg-gradient-to-br from-yellow-200 to-yellow-500 text-black'
                        }`}>
                        {/* Card Texture/Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                        <div className="h-full flex flex-col justify-between relative z-10">
                            <div className="flex justify-between items-start">
                                <div className="text-[10px] tracking-[0.3em] uppercase font-bold">LUXEDIVE</div>
                                <div className="text-2xl font-serif font-bold">₹{amount.toLocaleString()}</div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 opacity-60`}>Recipient</p>
                                    <p className="text-lg font-serif">Future Driver</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 opacity-60`}>Code</p>
                                    <p className="font-mono text-sm tracking-wider">•••• 8842</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                        {[
                            { id: 'silver', bg: 'bg-gray-300' },
                            { id: 'obsidian', bg: 'bg-black border border-white/20' },
                            { id: 'gold', bg: 'bg-yellow-400' }
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id as any)}
                                className={`w-12 h-12 rounded-full ${t.bg} transition-transform hover:scale-110 ${theme === t.id ? 'ring-2 ring-white ring-offset-4 ring-offset-black' : ''}`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT: FORM */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-10">
                    <h3 className="text-2xl font-serif text-white mb-8">Customize Gift Card</h3>

                    <div className="space-y-8">

                        {/* Amount */}
                        <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Select Amount</label>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {[10000, 25000, 50000, 100000].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setAmount(val)}
                                        className={`px-6 py-3 rounded-lg text-sm font-bold border transition-colors whitespace-nowrap ${amount === val ? 'bg-white text-black border-white' : 'bg-[#0A0A0A] border-white/10 text-gray-400 hover:border-white/30'}`}
                                    >
                                        ₹{val / 1000}K
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-12 pl-8 pr-4 text-white text-sm focus:border-luxe-gold outline-none font-bold"
                                />
                            </div>
                        </div>

                        {/* Personalization */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Recipient Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input type="email" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white text-sm focus:border-luxe-gold outline-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">From (Your Name)</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input type="text" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white text-sm focus:border-luxe-gold outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Personal Message</label>
                            <textarea className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-4 text-white text-sm focus:border-luxe-gold outline-none min-h-[100px]" placeholder="Write a message..." />
                        </div>

                        {/* Delivery */}
                        <div className="space-y-4 border-t border-white/5 pt-6">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Delivery Date</label>
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input type="date" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white text-sm focus:border-luxe-gold outline-none" defaultValue="2023-11-24" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-6 bg-gray-700 rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                                    </div>
                                    <span className="text-xs text-gray-400">Send Instantly</span>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full bg-[#4169E1] text-white hover:bg-blue-600 h-14 uppercase tracking-widest text-xs font-bold shadow-lg shadow-blue-900/20 mt-4">
                            Purchase Gift Card <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                        <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest flex items-center justify-center gap-2">
                            <CreditCard className="w-3 h-3" /> Secure checkout through encrypted gateway
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}
