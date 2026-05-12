import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadGoogleMapsLibraries } from '../../lib/googleMaps'
import { Button } from '../../components/ui/Button'
import { Phone, MessageSquare, Download, CheckCircle, ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { bookingService } from '../../services/bookingService'
import type { Booking } from '../../services/bookingService'

declare var google: any;

// Mock Timeline Sequence
const TIMELINE = [
    { title: 'Car Dispatched', time: '10:30 AM • Oct 24', status: 'completed' },
    { title: 'Delivered', time: '11:15 AM • Oct 24', status: 'completed' },
    { title: 'Rental Started', time: 'In Progress', status: 'current' },
    { title: 'Return', time: 'Scheduled', status: 'pending' },
]

export default function ActiveTracking() {
    const { bookingId } = useParams()
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<any>(null)
    const markerInstance = useRef<any>(null)
    const [booking, setBooking] = useState<Booking | null>(null)
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

    // 1. Fetch Booking Details
    useEffect(() => {
        if (!bookingId) return
        bookingService.getBookingById(bookingId).then(data => {
            setBooking(data as any)
        })
    }, [bookingId])

    // 2. Initialize Map & Realtime Subscription
    useEffect(() => {
        if (!booking) return

        loadGoogleMapsLibraries().then(() => {
            if (mapRef.current && !mapInstance.current) {
                mapInstance.current = new google.maps.Map(mapRef.current, {
                    center: { lat: 23.0225, lng: 72.5714 }, // Default fallback
                    zoom: 13,
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                        { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
                        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
                        { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
                    ],
                    disableDefaultUI: true
                })
            }

            // Subscribe to Location Updates
            const channel = supabase.channel('tracking_room')
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'location_tracking',
                        filter: `trackable_id=eq.${booking.car_id}`
                    },
                    (payload) => {
                        const newLat = payload.new.latitude
                        const newLng = payload.new.longitude
                        if (newLat && newLng) {
                            const newPos = { lat: newLat, lng: newLng }
                            setLocation(newPos)

                            // Update Map
                            if (mapInstance.current) {
                                mapInstance.current.panTo(newPos)
                                if (!markerInstance.current) {
                                    markerInstance.current = new google.maps.Marker({
                                        position: newPos,
                                        map: mapInstance.current,
                                        icon: {
                                            path: google.maps.SymbolPath.CIRCLE,
                                            scale: 8,
                                            fillColor: "#10B981",
                                            fillOpacity: 1,
                                            strokeColor: "#ffffff",
                                            strokeWeight: 2,
                                        }
                                    })
                                } else {
                                    markerInstance.current.setPosition(newPos)
                                }
                            }
                        }
                    }
                )
                .subscribe()

            return () => {
                supabase.removeChannel(channel)
            }
        })
    }, [booking])

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-black text-white">
            {/* LEFT COLUMN - MAIN CONTENT */}
            <div className="flex-1 relative flex flex-col">
                {/* Breadcrumb & Header Overlay */}
                <div className="absolute top-6 left-6 z-10 pointer-events-none">
                    <div className="bg-luxe-dark/95 backdrop-blur border border-white/10 rounded-xl p-6 shadow-2xl pointer-events-auto min-w-[300px]">
                        <p className="text-[10px] text-luxe-gray uppercase tracking-widest mb-2 font-bold">Bookings › Active Rental</p>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-xl font-serif text-white">Booking #{bookingId?.slice(0, 8)}</h1>
                            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse flex items-center gap-2">
                                {location ? 'Live Tracking' : 'Connecting...'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Map Area */}
                <div className="flex-1 relative bg-gray-900">
                    <div ref={mapRef} className="w-full h-full opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 pointer-events-none" />
                </div>

                {/* Bottom Card - Rental Status & Driver */}
                <div className="bg-luxe-dark border-t border-white/10 p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-20">
                    {/* Rental Status */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Status Timeline</h3>
                        <div className="flex items-center justify-between relative">
                            {TIMELINE.map((step, i) => (
                                <div key={i} className="flex flex-col items-center relative z-10 group">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 transition-all duration-500 
                                    ${step.status === 'completed' ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' :
                                            step.status === 'current' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] animate-pulse' :
                                                'bg-gray-800 text-gray-500 border border-white/5'}`}>
                                        {step.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                                            step.status === 'current' ? <div className="w-3 h-3 bg-white rounded-full" /> :
                                                <span className="text-xs">{i + 1}</span>}
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-wide mb-1 ${step.status === 'current' ? 'text-white' : 'text-gray-400'}`}>
                                        {step.title}
                                    </span>
                                    <span className="text-[10px] text-luxe-gray">{step.time}</span>
                                </div>
                            ))}
                            {/* Connecting Line */}
                            <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-800 -z-0">
                                <div className="bg-emerald-500 h-full w-[60%] opacity-50" />
                            </div>
                        </div>
                    </div>

                    {/* Driver Profile */}
                    <div className="bg-white/5 border border-white/5 rounded-xl p-5 flex items-center gap-5">
                        <div className="w-16 h-16 bg-gray-800 rounded-full overflow-hidden border-2 border-luxe-gold/20">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100" className="w-full h-full object-cover" alt="Driver" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-serif text-lg tracking-wide">James Sterling</h3>
                            <p className="text-luxe-gray text-xs uppercase tracking-widest mb-2">Professional Chauffeur</p>
                            <div className="flex items-center gap-2 text-[10px]">
                                <span className="bg-luxe-gold text-black font-bold px-1.5 py-0.5 rounded">⭐ 4.8</span>
                                <span className="text-gray-500">|</span>
                                <span className="text-gray-400">ID: PILATE LX 55 DIVE</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="border-white/20 hover:bg-white hover:text-black"><MessageSquare className="w-4 h-4" /></Button>
                            <Button className="bg-emerald-600 hover:bg-emerald-500 border-none" size="icon"><Phone className="w-4 h-4" /></Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDEBAR - BOOKING SUMMARY */}
            <div className="w-full lg:w-[400px] bg-[#121212] border-l border-white/10 flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-sm font-bold text-white uppercase tracking-widest">Booking Summary</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Car Card */}
                    <div className="space-y-4">
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 shadow-lg group">
                            <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Car" />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white border border-white/10">Active</div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif text-white">Mercedes-Benz S 580</h2>
                            <p className="text-sm text-luxe-gray mt-1">4MATIC Sedan • 2024</p>
                        </div>
                        <div className="flex gap-2 text-[10px] text-luxe-gray uppercase tracking-widest">
                            <span className="border border-white/10 px-2 py-1 rounded">Automatic</span>
                            <span className="border border-white/10 px-2 py-1 rounded">Premium Fuel</span>
                            <span className="border border-white/10 px-2 py-1 rounded">5 Adults</span>
                        </div>
                    </div>

                    {/* Trip Details */}
                    <div className="space-y-6 pt-6 border-t border-white/5">
                        <div className="flex gap-4 relative">
                            <div className="flex flex-col items-center pt-1">
                                <div className="w-2.5 h-2.5 rounded-full border-2 border-luxe-gold bg-black" />
                                <div className="w-px h-full bg-white/10 my-1" />
                                <div className="w-2.5 h-2.5 rounded-full border-2 border-luxe-gray bg-black" />
                            </div>
                            <div className="space-y-8 flex-1">
                                <div>
                                    <p className="text-[10px] text-luxe-gray uppercase tracking-widest mb-1">Pick-Up</p>
                                    <p className="text-white font-medium">Oct 24, 11:00 AM</p>
                                    <p className="text-xs text-luxe-gray mt-0.5">Four Seasons Hotel, Downtown</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-luxe-gray uppercase tracking-widest mb-1">Drop-Off</p>
                                    <p className="text-white font-medium">Oct 27, 10:00 AM</p>
                                    <p className="text-xs text-luxe-gray mt-0.5">International Airport, Terminal 1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-[#0E0E0E] border-t border-white/10 space-y-4">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <p className="text-xs text-luxe-gray uppercase tracking-widest">Total Cost</p>
                            <p className="text-xs text-luxe-gray">Duration: 3 Days</p>
                        </div>
                        <span className="text-2xl font-serif text-luxe-gold">₹1,25,000.00</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Link to={`/rental/${bookingId}/extend`}>
                            <Button className="w-full bg-[#4169E1] hover:bg-blue-600 h-10 text-xs font-bold uppercase tracking-wider">
                                Extend Rental
                            </Button>
                        </Link>
                        <Button variant="outline" className="w-full h-10 text-xs text-luxe-gray border-white/10 hover:bg-white hover:text-black uppercase tracking-wider">
                            <Download className="w-3 h-3 mr-2" /> Agreement
                        </Button>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <p className="text-xs text-luxe-gray mb-2">Need a change?</p>
                        <Link to="/concierge" className="text-xs text-white flex items-center gap-1 hover:text-luxe-gold transition-colors">
                            Contact Concierge <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
