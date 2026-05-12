import { Button } from '../../components/ui/Button'
import { CheckCircle, Clock, MapPin, Fuel, Gauge, ArrowRight, Shield, Phone, Bell, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Page 41: Extension Request Status
export default function ExtensionRequestStatus() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER NAV (Mock) */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-luxe-black/90 backdrop-blur-md z-50 border-b border-white/5 flex items-center justify-between px-6">
                <div className="text-xl font-serif text-white tracking-widest">LUXEDIVE</div>
                <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <a href="#" className="hover:text-white">My Rentals</a>
                    <a href="#" className="hover:text-white">Concierge</a>
                    <a href="#" className="text-white relative">
                        Requests
                        <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-luxe-gold" />
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-8 mb-8">
                <div className="bg-emerald-900/10 border border-emerald-500/20 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Status: Confirmed</span>
                </div>
                <h1 className="text-4xl font-serif text-white mb-2">EXTENSION APPROVED</h1>
                <p className="text-gray-400 font-light max-w-2xl text-lg leading-relaxed">
                    Your request to extend the rental period has been accepted. The vehicle is yours for another 3 days. Please review the updated itinerary and complete the payment adjustment.
                </p>
            </div>

            <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* LEFT: VEHICLE CARD */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden group">
                    <div className="relative h-64 bg-gray-900 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-4 left-4 bg-[#4169E1] text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-lg">
                            Current Rental
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-serif text-white">Porsche 911 GT3</h2>
                                <p className="text-xs text-gray-500 font-mono mt-1">Ref: #LX-9942-EXT</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Condition</p>
                                <p className="text-white text-sm">Excellent</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Fuel Level</p>
                                <div className="flex items-center gap-1.5 text-white text-sm">
                                    <Fuel className="w-3 h-3 text-gray-400" /> 85%
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Mileage</p>
                                <div className="flex items-center gap-1.5 text-white text-sm">
                                    <Gauge className="w-3 h-3 text-gray-400" /> 1,240 km
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: ITINERARY UPDATE */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 h-fit shadow-2xl">
                    <h3 className="text-xl font-serif text-white mb-8 border-b border-white/5 pb-4">Itinerary Update</h3>

                    <div className="relative pl-8 space-y-10 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-gray-700 before:to-[#4169E1]">

                        {/* Previous Drop-off */}
                        <div className="relative">
                            <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-gray-700 ring-4 ring-[#121212]" />
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Previous Drop-off</p>
                            <div className="flex items-center gap-3 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium line-through decoration-gray-700">Oct 12, 2024, 10:00 AM</span>
                            </div>
                        </div>

                        {/* New Drop-off */}
                        <div className="relative mb-6">
                            <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-[#4169E1] ring-4 ring-[#121212] shadow-[0_0_10px_#4169E1]" />
                            <p className="text-[10px] text-[#4169E1] uppercase tracking-widest font-bold mb-1">New Drop-off</p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-white">
                                    <Clock className="w-4 h-4 text-[#4169E1]" />
                                    <span className="text-sm font-bold">Oct 15, 2024, 10:00 AM</span>
                                </div>
                                <div className="flex items-center gap-3 text-white">
                                    <MapPin className="w-4 h-4 text-[#4169E1]" />
                                    <span className="text-sm">Ahmedabad HQ</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-4 mb-8 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Duration Added</span>
                            <span className="text-white font-bold flex items-center gap-2"><Clock className="w-3 h-3" /> +3 Days</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Mileage Allowance</span>
                            <span className="text-white font-bold flex items-center gap-2"><CheckCircle className="w-3 h-3 text-emerald-500" /> Unlimited</span>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-6 mb-8">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Adjustment</span>
                            <span className="text-emerald-500 font-bold">+₹35,000.00</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold text-white uppercase tracking-widest">New Total Estimate</span>
                            <span className="text-3xl font-serif text-luxe-gold">₹1,60,000.00</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2 text-right">*Includes taxes and updated insurance coverage.</p>
                    </div>

                    <div className="space-y-3">
                        <Button onClick={() => navigate('/payment')} className="w-full bg-[#4169E1] text-white hover:bg-blue-600 h-14 uppercase tracking-widest text-xs font-bold shadow-lg shadow-blue-900/20">
                            Proceed to Payment <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 h-12 uppercase tracking-widest text-[10px] font-bold">
                            <Phone className="w-4 h-4 mr-2" /> Contact Concierge
                        </Button>
                    </div>

                </div>

            </div>

            {/* FOOTER (Simple) */}
            <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex justify-between text-[10px] text-gray-600 uppercase tracking-widest">
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white">Rental Terms</a>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">24/7 Support</a>
                </div>
                <p>© 2024 LuxeDive</p>
            </div>
        </div>
    )
}
