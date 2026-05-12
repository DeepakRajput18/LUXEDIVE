import { Button } from '../../components/ui/Button'
import { Calendar, Clock, MapPin, Users, Headset, Shield, CheckCircle, ChevronDown, ArrowRight } from 'lucide-react'

// Page 62: Wedding - Bespoke Inquiry
export default function WeddingBespokeInquiry() {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white pt-24 pb-20 relative overflow-hidden">
            {/* Decorative background blur */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] pointer-events-none" />

            {/* TOP NAV */}
            <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-6 z-20">
                <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest">
                    <span className="text-white border-b-2 border-purple-500 pb-1">Wedding Fleet</span>
                    <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Services</span>
                    <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Concierge</span>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white h-9 text-[10px] font-bold uppercase tracking-widest px-6 rounded-none">
                    Sign In
                </Button>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">

                {/* HEADER */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-serif text-white mb-4 tracking-tight">Bespoke Wedding Inquiry</h1>
                    <p className="text-purple-200/80 font-serif italic text-xl max-w-2xl mx-auto">
                        "Tailoring every mile to your milestone. Our concierge will contact you for a personalized consultation."
                    </p>
                </div>

                {/* FORM CARD */}
                <div className="w-full max-w-2xl bg-[#0B1121] border border-purple-500/20 rounded-2xl p-10 shadow-2xl shadow-purple-900/20">

                    <div className="space-y-8">

                        {/* Date */}
                        <div>
                            <label className="text-[10px] text-purple-300 uppercase tracking-widest font-bold mb-4 block">Wedding Date</label>
                            <div className="bg-[#12182B] border border-white/5 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-lg font-serif">June 2024</span>
                                    <div className="flex gap-2">
                                        <button className="p-1 hover:bg-white/5 rounded"><ChevronDown className="w-4 h-4 rotate-90" /></button>
                                        <button className="p-1 hover:bg-white/5 rounded"><ChevronDown className="w-4 h-4 -rotate-90" /></button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-y-4 text-center text-sm">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d} className="text-gray-500 font-bold">{d}</span>)}
                                    {/* Partial grid for simulation */}
                                    <span className="text-gray-700">28</span><span className="text-gray-700">29</span><span className="text-gray-700">30</span>
                                    <span className="text-gray-700">31</span><span className="text-white">1</span><span className="text-white">2</span><span className="text-white">3</span>
                                    {Array.from({ length: 11 }, (_, i) => <span key={i} className="text-white">{i + 4}</span>)}
                                    <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-purple-600/50">15</span>
                                    {Array.from({ length: 15 }, (_, i) => <span key={i} className="text-white">{i + 16}</span>)}
                                </div>
                            </div>
                        </div>

                        {/* Hours */}
                        <div>
                            <label className="text-[10px] text-purple-300 uppercase tracking-widest font-bold mb-3 block">Estimated Hours</label>
                            <div className="relative">
                                <select className="w-full bg-[#12182B] border border-white/10 rounded-xl h-14 px-6 text-white text-sm focus:border-purple-500 outline-none appearance-none cursor-pointer">
                                    <option>4-6 Hours (Minimum)</option>
                                    <option>8-10 Hours (Full Day)</option>
                                    <option>Multiple Days</option>
                                </select>
                                <Clock className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Venue */}
                        <div>
                            <label className="text-[10px] text-purple-300 uppercase tracking-widest font-bold mb-3 block">Venue in Ahmedabad</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="e.g. Taj Skyline, Ahmedabad"
                                    className="w-full bg-[#12182B] border border-white/10 rounded-xl h-14 pl-12 pr-6 text-white text-sm placeholder:text-gray-600 focus:border-purple-500 outline-none"
                                />
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            </div>
                        </div>

                        {/* Special Requests */}
                        <div>
                            <label className="text-[10px] text-purple-300 uppercase tracking-widest font-bold mb-3 block">Special Concierge Requests</label>
                            <textarea
                                rows={4}
                                placeholder="E.g. Specific driver attire, floral arrangements, refreshments, or route preferences."
                                className="w-full bg-[#12182B] border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-gray-600 focus:border-purple-500 outline-none resize-none"
                            />
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                            <Button className="w-full h-16 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-purple-900/40 transform hover:scale-[1.01] transition-all">
                                Request VIP Wedding Consultation <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-400">
                                <MapPin className="w-3 h-3 text-purple-500" />
                                Your request will be handled by our senior wedding coordinator. Expect a callback within 2 hours.
                            </div>
                        </div>

                    </div>
                </div>

                {/* TRUST BADGES */}
                <div className="flex flex-wrap justify-center gap-12 mt-20 pt-12 border-t border-white/5 w-full max-w-4xl">
                    <div className="flex flex-col items-center gap-3 group">
                        <div className="w-12 h-12 rounded-full bg-purple-900/20 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Premium Chauffeur</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group">
                        <div className="w-12 h-12 rounded-full bg-purple-900/20 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Vetted Fleet</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group">
                        <div className="w-12 h-12 rounded-full bg-purple-900/20 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                            <Headset className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">24/7 Concierge</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 group">
                        <div className="w-12 h-12 rounded-full bg-purple-900/20 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                            <Shield className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Secure Booking</span>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="mt-16 text-center text-[10px] text-gray-600 uppercase tracking-widest">
                    2024 LUXEDIVE WORLDWIDE. ALL RIGHTS RESERVED. <span className="mx-2">|</span> Privacy <span className="mx-2">|</span> Terms <span className="mx-2">|</span> Safety
                </div>

            </div>
        </div>
    )
}
