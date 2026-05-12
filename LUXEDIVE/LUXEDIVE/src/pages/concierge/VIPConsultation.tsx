import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { User, Phone, Video, Calendar, ArrowRight, ChevronDown, Check } from 'lucide-react'

// Page 61: VIP Consultation Schedule
export default function VIPConsultation() {
    const [selectedDate, setSelectedDate] = useState('24')
    const [selectedTime, setSelectedTime] = useState('02:00 PM')
    const [contactMethod, setContactMethod] = useState<'phone' | 'video'>('video')

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* TOP NAV */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-luxe-black/90 backdrop-blur-md z-50 border-b border-white/5 flex items-center justify-between px-6">
                <div className="text-xl font-serif text-white tracking-widest">LUXEDIVE</div>
                <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <a href="#" className="hover:text-white">Fleet</a>
                    <a href="#" className="hover:text-white">Services</a>
                    <a href="#" className="hover:text-white">Membership</a>
                    <a href="#" className="text-white relative">
                        Concierge
                        <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-luxe-gold" />
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <div className="text-[10px] text-[#4169E1] font-bold uppercase tracking-widest">Diamond Member</div>
                        <div className="text-sm font-bold text-white">Aditya Shah</div>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-900/20 text-[#4169E1] px-4 py-1.5 rounded-full border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <div className="w-2 h-2 rounded-full bg-[#4169E1] animate-pulse" /> DIAMOND TIER ACCESS
                    </div>
                    <h1 className="text-5xl font-serif text-white mb-4">Your Personal Advisor Awaits</h1>
                    <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto leading-relaxed">
                        Schedule a dedicated session to curate your perfect journey through Ahmedabad. Our advisors specialize in bespoke itineraries and fleet selection.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* LEFT: CALENDAR SELECTOR */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 lg:p-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-serif text-white">October 2023</h2>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                    <ChevronDown className="w-4 h-4 rotate-90" />
                                </button>
                                <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                                    <ChevronDown className="w-4 h-4 -rotate-90" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-4 mb-4 text-center">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                <div key={day} className="text-xs text-gray-500 font-bold uppercase">{day}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-4 text-center">
                            {/* Empty cells for padding */}
                            <div /><div /><div />

                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(day.toString())}
                                    className={`
                                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all relative
                                    ${day === 24 ? 'bg-[#4169E1] text-white shadow-[0_0_15px_rgba(65,105,225,0.5)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                                `}
                                >
                                    {day}
                                    {day === 24 && <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-white" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: BOOKING CONFIGURATION */}
                    <div className="space-y-8">

                        {/* Topic */}
                        <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3 block">Consultation Topic</label>
                            <div className="relative">
                                <select className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg h-12 px-4 text-white text-sm focus:border-[#4169E1] outline-none appearance-none cursor-pointer">
                                    <option>Bespoke Wedding Fleet</option>
                                    <option>Corporate Fleet Inquiry</option>
                                    <option>Itinerary Planning</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Time */}
                        <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4 block">Preferred Time (IST)</label>
                            <div className="flex gap-4">
                                {['10:00 AM', '02:00 PM', '04:30 PM'].map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`flex-1 h-12 rounded-lg text-xs font-bold uppercase tracking-widest transition-all
                                        ${selectedTime === time
                                                ? 'bg-[#1A1A1A] border border-[#4169E1] text-white shadow-[0_0_10px_rgba(65,105,225,0.2)]'
                                                : 'bg-[#1A1A1A] border border-white/10 text-gray-400 hover:border-white/20 hover:text-white'}
                                    `}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Contact Method */}
                        <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4 block">Contact Method</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setContactMethod('phone')}
                                    className={`h-14 rounded-lg flex items-center justify-center gap-3 transition-all
                                    ${contactMethod === 'phone' ? 'bg-white text-black' : 'bg-[#1A1A1A] border border-white/10 text-gray-400 hover:text-white'}
                                `}
                                >
                                    <Phone className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Phone Call</span>
                                </button>
                                <button
                                    onClick={() => setContactMethod('video')}
                                    className={`h-14 rounded-lg flex items-center justify-center gap-3 transition-all
                                    ${contactMethod === 'video' ? 'bg-white text-black' : 'bg-[#1A1A1A] border border-white/10 text-gray-400 hover:text-white'}
                                `}
                                >
                                    <Video className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Video Call</span>
                                </button>
                            </div>
                        </div>

                        {/* Summary & CTA */}
                        <div className="pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2 mb-6 text-xs text-gray-400">
                                <Calendar className="w-4 h-4 text-[#4169E1]" />
                                <span>Summary: Oct 24, 02:00 PM • Video Call</span>
                            </div>
                            <Button className="w-full h-14 bg-white text-black hover:bg-luxe-gold transition-colors font-bold uppercase tracking-widest text-xs shadow-glow">
                                Request Private Consultation <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                    </div>
                </div>

                {/* FOOTER */}
                <div className="mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                    © 2023 LUXEDIVE, AHMEDABAD LUXURY FLEET.
                </div>

            </div>
        </div>
    )
}
