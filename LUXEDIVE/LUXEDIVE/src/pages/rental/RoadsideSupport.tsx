import { useState, useEffect } from 'react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Phone, MapPin, AlertTriangle, Car, Shield, CheckCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

export default function RoadsideSupport() {
    const [status, setStatus] = useState<'idle' | 'requesting' | 'dispatched'>('idle');
    const [eta, setEta] = useState<number | null>(null);

    const handleRequestHelp = () => {
        setStatus('requesting');
        // Simulate API call
        setTimeout(() => {
            setStatus('dispatched');
            setEta(15);
            toast.success("Assistance Dispatched! Help is on the way.");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-white pt-24 px-4 pb-12">
            <div className="container mx-auto max-w-4xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4 animate-pulse">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-serif mb-2">Roadside Assistance</h1>
                    <p className="text-gray-400">24/7 Priority Support for LuxeDive Members</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left: Action & Status */}
                    <div className="space-y-6">

                        {/* Emergency Button */}
                        <Card className="bg-red-950/30 border-red-500/50 overflow-hidden relative">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                            <CardContent className="p-8 text-center relative z-10">
                                <h2 className="text-2xl font-bold text-red-500 mb-2">EMERGENCY SOS</h2>
                                <p className="text-red-200/70 mb-8 text-sm">Tap below to request immediate dispatch for accidents or major breakdowns.</p>

                                {status === 'idle' ? (
                                    <Button
                                        onClick={handleRequestHelp}
                                        className="w-full h-16 bg-red-600 hover:bg-red-700 text-white text-lg font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all transform hover:scale-[1.02]"
                                    >
                                        Request Help
                                    </Button>
                                ) : (
                                    <div className="bg-black/40 rounded-lg p-6 border border-red-500/30">
                                        <div className="flex items-center justify-center gap-3 mb-2 text-green-400">
                                            <CheckCircle className="w-6 h-6" />
                                            <span className="font-bold uppercase tracking-widest">Dispatched</span>
                                        </div>
                                        <p className="text-2xl font-mono font-bold text-white">{eta} MINS <span className="text-xs text-gray-500 font-sans block mt-1">ESTIMATED ARRIVAL</span></p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Contacts */}
                        <Card className="bg-[#0B1121] border-white/10">
                            <CardHeader>
                                <CardTitle className="text-lg font-serif">Quick Contacts</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-3">
                                <a href="tel:911" className="flex items-center justify-between p-4 rounded bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-red-500" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">Emergency Services</div>
                                            <div className="text-xs text-gray-400">Police / Ambulance</div>
                                        </div>
                                    </div>
                                    <Phone className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                </a>

                                <a href="tel:+1800LUXEDIVE" className="flex items-center justify-between p-4 rounded bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-luxe-gold/20 rounded-full flex items-center justify-center">
                                            <Car className="w-4 h-4 text-luxe-gold" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">LuxeDive Support</div>
                                            <div className="text-xs text-gray-400">24/7 Concierge</div>
                                        </div>
                                    </div>
                                    <Phone className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                </a>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Right: Map & Location */}
                    <div className="space-y-6">
                        <Card className="bg-[#0B1121] border-white/10 h-full min-h-[400px] flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-serif">Your Location</CardTitle>
                                <span className="text-[10px] bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-500/20 flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> LIVE
                                </span>
                            </CardHeader>
                            <CardContent className="flex-1 relative p-0 overflow-hidden rounded-b-xl">
                                {/* Mock Map */}
                                <div className="absolute inset-0 bg-[#1a1a1a]">
                                    <img
                                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2400"
                                        className="w-full h-full object-cover opacity-30 grayscale"
                                    />
                                    {/* User Pin */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <div className="w-12 h-12 rounded-full bg-blue-500/20 animate-ping absolute inset-0"></div>
                                        <div className="relative w-12 h-12 rounded-full border-4 border-[#0B1121] bg-blue-500 flex items-center justify-center shadow-2xl">
                                            <Car className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Location Details Overlay */}
                                <div className="absolute bottom-4 left-4 right-4 bg-[#0B1121]/90 backdrop-blur border border-white/10 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-luxe-gold mt-0.5" />
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Current Coordinates</div>
                                            <div className="font-mono text-sm text-white">23.0225° N, 72.5714° E</div>
                                            <div className="text-xs text-gray-500 mt-1">Satellite Road, Ahmedabad, GJ</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>

                <div className="mt-8 text-center">
                    <Link to="/rental/active" className="text-sm text-gray-400 hover:text-white border-b border-transparent hover:border-white transition-colors pb-1">
                        Return to Active Rental Dashboard
                    </Link>
                </div>

            </div>
        </div>
    )
}
