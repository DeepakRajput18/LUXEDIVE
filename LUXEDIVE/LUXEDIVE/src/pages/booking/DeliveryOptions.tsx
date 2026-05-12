import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { MapPin, User, Info, ChevronLeft, ArrowRight, Building2, Home } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function DeliveryOptions() {
    const navigate = useNavigate()
    const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'office' | 'branch'>('home')

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* BREADCRUMB */}
            <div className="container mx-auto px-6 mb-8">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    Booking <span className="mx-2">&gt;</span> Vehicle Selection <span className="mx-2">&gt;</span> <span className="text-white">Delivery Options</span>
                </p>
            </div>

            <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* LEFT: SELECTION & FORM */}
                <div className="space-y-8">

                    <div>
                        <h1 className="text-3xl font-serif text-white mb-2">Choose Delivery Method</h1>
                        <p className="text-gray-400 font-light">Select how you would like to receive your vehicle.</p>
                    </div>

                    {/* Radio Options */}
                    <div className="space-y-4">
                        <div
                            onClick={() => setDeliveryMethod('home')}
                            className={`p-6 border rounded-xl cursor-pointer transition-all flex items-start gap-4 ${deliveryMethod === 'home' ? 'bg-blue-900/10 border-[#4169E1]' : 'bg-[#121212] border-white/5 hover:border-white/20'}`}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${deliveryMethod === 'home' ? 'border-[#4169E1]' : 'border-gray-600'}`}>
                                {deliveryMethod === 'home' && <div className="w-2.5 h-2.5 bg-[#4169E1] rounded-full" />}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Home className={`w-4 h-4 ${deliveryMethod === 'home' ? 'text-[#4169E1]' : 'text-gray-400'}`} />
                                    <span className={`font-bold ${deliveryMethod === 'home' ? 'text-white' : 'text-gray-300'}`}>Home Delivery</span>
                                    <span className="bg-[#4169E1]/20 text-[#4169E1] text-[9px] px-2 py-0.5 rounded font-bold uppercase">Complimentary</span>
                                </div>
                                <p className="text-xs text-gray-500">Free delivery within 15km of our HQ. Concierge handover at your doorstep.</p>
                            </div>
                        </div>

                        <div
                            onClick={() => setDeliveryMethod('office')}
                            className={`p-6 border rounded-xl cursor-pointer transition-all flex items-start gap-4 ${deliveryMethod === 'office' ? 'bg-blue-900/10 border-[#4169E1]' : 'bg-[#121212] border-white/5 hover:border-white/20'}`}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${deliveryMethod === 'office' ? 'border-[#4169E1]' : 'border-gray-600'}`}>
                                {deliveryMethod === 'office' && <div className="w-2.5 h-2.5 bg-[#4169E1] rounded-full" />}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Building2 className={`w-4 h-4 ${deliveryMethod === 'office' ? 'text-[#4169E1]' : 'text-gray-400'}`} />
                                    <span className={`font-bold ${deliveryMethod === 'office' ? 'text-white' : 'text-gray-300'}`}>Office Pickup</span>
                                </div>
                                <p className="text-xs text-gray-500">Corporate delivery to your registered business address.</p>
                            </div>
                        </div>

                        <div
                            onClick={() => setDeliveryMethod('branch')}
                            className={`p-6 border rounded-xl cursor-pointer transition-all flex items-start gap-4 ${deliveryMethod === 'branch' ? 'bg-blue-900/10 border-[#4169E1]' : 'bg-[#121212] border-white/5 hover:border-white/20'}`}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${deliveryMethod === 'branch' ? 'border-[#4169E1]' : 'border-gray-600'}`}>
                                {deliveryMethod === 'branch' && <div className="w-2.5 h-2.5 bg-[#4169E1] rounded-full" />}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <MapPin className={`w-4 h-4 ${deliveryMethod === 'branch' ? 'text-[#4169E1]' : 'text-gray-400'}`} />
                                    <span className={`font-bold ${deliveryMethod === 'branch' ? 'text-white' : 'text-gray-300'}`}>Branch Collection</span>
                                </div>
                                <p className="text-xs text-gray-500">Visit our showroom lounge. Enjoy complimentary refreshments while we prep your car.</p>
                            </div>
                        </div>
                    </div>

                    {/* Address Form (Only for Home/Office) */}
                    {deliveryMethod !== 'branch' && (
                        <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Street Address</label>
                                <input type="text" placeholder="e.g. 12 Grand Avenue, Bopal" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-12 px-4 text-white text-sm focus:border-luxe-gold outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Apartment / Suite</label>
                                    <input type="text" placeholder="Unit 4B" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-12 px-4 text-white text-sm focus:border-luxe-gold outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Landmark</label>
                                    <input type="text" placeholder="Near City Mall" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-12 px-4 text-white text-sm focus:border-luxe-gold outline-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">City</label>
                                <input type="text" value="Ahmedabad" disabled className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-12 px-4 text-gray-400 text-sm focus:border-luxe-gold outline-none cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Special Instructions</label>
                                <textarea placeholder="Gate code, parking details, etc." className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg p-4 text-white text-sm focus:border-luxe-gold outline-none min-h-[100px]" />
                            </div>
                        </div>
                    )}

                    {/* Concierge Info */}
                    <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-[#4169E1] shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-200 leading-relaxed">
                            <span className="font-bold block mb-1">Concierge Support Available</span>
                            Our team will contact you 30 minutes prior to arrival. Need special arrangements? Use the chat widget or call our VIP line.
                        </p>
                    </div>

                    <div className="flex justify-between pt-4">
                        <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-500 hover:text-white uppercase tracking-widest text-[10px] font-bold">
                            Back
                        </Button>
                        <Button onClick={() => navigate('/booking/step-2')} className="bg-white text-black hover:bg-luxe-gold uppercase tracking-widest text-[10px] font-bold h-12 px-8 shadow-lg shadow-white/5">
                            Continue <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                </div>

                {/* RIGHT: MAP */}
                <div className="h-full min-h-[500px] bg-[#121212] rounded-2xl overflow-hidden border border-white/5 relative">
                    {/* Mock Map */}
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800" className="w-full h-full object-cover opacity-60 grayscale" />
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />

                    {/* Pins */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            <div className="w-4 h-4 bg-luxe-gold rounded-full animate-ping absolute inset-0" />
                            <div className="w-4 h-4 bg-luxe-gold rounded-full border-2 border-white relative z-10 box-content shadow-xl" />
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[9px] font-bold uppercase px-2 py-1 rounded whitespace-nowrap border border-white/20 backdrop-blur-md">
                                Ahmedabad HQ - SG Highway
                            </div>
                        </div>
                    </div>

                    {deliveryMethod !== 'branch' && (
                        <div className="absolute top-1/3 left-1/3">
                            <div className="relative">
                                <div className="w-4 h-4 bg-[#4169E1] rounded-full animate-ping absolute inset-0" />
                                <div className="w-4 h-4 bg-[#4169E1] rounded-full border-2 border-white relative z-10 box-content shadow-xl" />
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[9px] font-bold uppercase px-2 py-1 rounded whitespace-nowrap border border-white/20 backdrop-blur-md">
                                    Your Location
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
