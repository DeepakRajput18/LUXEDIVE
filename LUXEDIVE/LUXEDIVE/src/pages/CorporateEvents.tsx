import { Button } from '../components/ui/Button'
import { Building2, Users, Calendar, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react'

export default function CorporateEvents() {
    return (
        <div className="min-h-screen bg-luxe-black text-white pt-20 pb-20">

            {/* HERO */}
            <div className="relative container mx-auto px-6 mb-16 text-center py-20">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
                    <img
                        src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070"
                        alt="Corporate Fleet"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-luxe-black/80 via-luxe-black/50 to-luxe-black" />
                </div>

                <div className="relative z-10">
                    <span className="text-luxe-gold text-[10px] tracking-[0.2em] uppercase font-bold mb-4 block">B2B & VIP Services</span>
                    <h1 className="text-5xl font-serif text-white mb-6">Corporate & Event Solutions</h1>
                    <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto leading-relaxed">
                        Elevate your business presence with our fleet of pristine luxury vehicles. Tailored solutions for executive transport, weddings, and grand arrivals.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* LEFT: INFO & TRUST */}
                <div className="space-y-12">
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-luxe-gold/5 rounded-full blur-3xl" />
                        <h3 className="text-xl font-serif text-white mb-6">Why Choose LUXEDIVE?</h3>
                        <ul className="space-y-4">
                            {[
                                'Dedicated Priority Concierge 24/7',
                                'Custom Branding Options Available',
                                'Volume Discounts for 5+ Vehicles',
                                'Professional Chauffeurs in Uniform',
                            ].map(item => (
                                <li key={item} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-luxe-gold mt-0.5" />
                                    <span className="text-gray-300 text-sm font-light">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex gap-8">
                        <div className="flex-1 bg-[#0F0F0F] rounded-xl p-6 border border-white/5 text-center">
                            <span className="text-3xl font-serif text-white block mb-2">500+</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">的企业</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Enterprises</span>
                        </div>
                        <div className="flex-1 bg-[#0F0F0F] rounded-xl p-6 border border-white/5 text-center">
                            <div className="flex justify-center mb-2"><ShieldCheck className="w-8 h-8 text-white" /></div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Enterprise Grade Security</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: REQUEST FORM */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-10 shadow-2xl">
                    <h3 className="text-2xl font-serif text-white mb-8">Request Consultation</h3>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Event Type</label>
                            <div className="relative">
                                <select className="w-full bg-black border border-white/10 rounded-lg h-12 px-4 text-white text-sm focus:border-luxe-gold outline-none appearance-none">
                                    <option>Corporate Fleet</option>
                                    <option>Wedding / Grand Event</option>
                                    <option>Airport Transfer Bulk</option>
                                    <option>Other</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Vehicle Quantity</label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input type="number" min="1" placeholder="Min 10+" className="w-full bg-black border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white text-sm focus:border-luxe-gold outline-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Event Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input type="text" placeholder="Select dates" className="w-full bg-black border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white text-sm focus:border-luxe-gold outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Concierge Requirements</label>
                            <textarea className="w-full bg-black border border-white/10 rounded-lg p-4 text-white text-sm focus:border-luxe-gold outline-none min-h-[120px]" placeholder="Tell us about your event specific needs, branding requirements, or special requests..." />
                        </div>

                        <div className="flex items-start gap-3 pt-2">
                            <input type="checkbox" className="mt-1 rounded bg-black border-white/20 text-luxe-gold focus:ring-0" />
                            <p className="text-xs text-gray-500 leading-relaxed">
                                I agree to the <a href="#" className="text-white hover:underline">Terms of Service</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>.
                            </p>
                        </div>

                        <Button className="w-full bg-luxe-gold text-black hover:bg-yellow-500 h-14 uppercase tracking-widest text-xs font-bold shadow-lg shadow-yellow-900/20 mt-4">
                            Request Priority Consultation <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    )
}
