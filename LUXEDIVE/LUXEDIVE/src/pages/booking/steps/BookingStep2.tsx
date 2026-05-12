import { useNavigate } from 'react-router-dom'
import { getCarImage } from '../../../lib/placeholders'
import { useBooking } from '../../../contexts/BookingContext'
import { Card, CardContent } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Wifi, Baby, Map, ArrowRight, Minus, Plus } from 'lucide-react'

const ADDONS = [
    {
        id: 'child_seat',
        label: 'Child Safety Seat',
        price: 800,
        icon: Baby,
        desc: 'Premium ISOFIX safety materials with breathable luxury fabrics. Available in Infant, Toddler, and Booster sizes.',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600'
    },
    {
        id: 'wifi',
        label: 'In-Car WiFi Hotspot',
        price: 500,
        icon: Wifi,
        desc: 'High-speed 5G connectivity for up to 10 devices. Unlimited data for seamless streaming and remote work on the go.',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bbc7c?q=80&w=600'
    },
    {
        id: 'gps',
        label: 'GPS Navigation Pro',
        price: 1000,
        icon: Map,
        desc: 'Real-time traffic updates, 3D maps, and voice command integration. Pre-loaded with local luxury dining and points of interest.',
        image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=600'
    },
]

export default function BookingStep2() {
    const navigate = useNavigate()
    const { bookingState, updateBooking } = useBooking()

    // Use booking context or fallback to mock
    const vehicle = bookingState.carDetails ? {
        name: `${bookingState.carDetails.brand} ${bookingState.carDetails.model}`,
        rate: bookingState.carDetails.daily_rate,
        brand: bookingState.carDetails.brand,
        model: bookingState.carDetails.model
    } : { name: 'Porsche Taycan Turbo S', rate: 1250, brand: 'Porsche', model: 'Taycan' }

    const toggleAddon = (id: string, qty: number) => {
        const current = bookingState.addOns || []
        const exists = current.find(a => a.id === id)

        if (qty > 0) {
            if (exists) {
                // Update quantity
                updateBooking({
                    addOns: current.map(a => a.id === id ? { ...a, quantity: qty } : a)
                })
            } else {
                // Add new
                updateBooking({
                    addOns: [...current, { id, quantity: qty }]
                })
            }
        } else if (exists) {
            // Remove
            updateBooking({
                addOns: current.filter(a => a.id !== id)
            })
        }
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-32">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header & Progress */}
                <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
                    <div>
                        <span className="text-amber-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block">Step 02 of 05</span>
                        <h1 className="text-4xl font-serif text-white">Enhance Your Journey</h1>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-bold">Progress</p>
                        <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full w-[40%]" />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ADDONS.map(addon => {
                        const existingAddon = bookingState.addOns?.find(a => a.id === addon.id)
                        const selected = !!existingAddon
                        const Icon = addon.icon
                        return (
                            <Card
                                key={addon.id}
                                className={`group overflow-hidden bg-zinc-900 border transition-all duration-300 ${selected ? 'border-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.15)] ring-1 ring-amber-500/50' : 'border-white/5 hover:border-white/20'}`}
                            >
                                <div className="h-48 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
                                    <img src={addon.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" alt={addon.label} />
                                    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                                        <div className={`p-2 rounded-lg backdrop-blur-md ${selected ? 'bg-amber-500 text-black' : 'bg-black/40 text-white border border-white/10'}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-lg font-serif text-white">₹{addon.price}/day</span>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="font-serif text-xl text-white mb-3">{addon.label}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed mb-6 h-20 font-light">{addon.desc}</p>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <span className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">Quantity</span>
                                        <div className="flex items-center gap-4 bg-black border border-white/10 rounded-lg px-2 py-1">
                                            <button
                                                onClick={() => {
                                                    const currentQty = existingAddon ? existingAddon.quantity : 0;
                                                    if (currentQty > 0) {
                                                        toggleAddon(addon.id, currentQty - 1);
                                                    }
                                                }}
                                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="text-white font-mono w-4 text-center">{existingAddon ? existingAddon.quantity : 0}</span>
                                            <button
                                                onClick={() => {
                                                    const currentQty = existingAddon ? existingAddon.quantity : 0;
                                                    toggleAddon(addon.id, currentQty + 1);
                                                }}
                                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 py-6 px-8 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={bookingState.carDetails?.images?.[0] || getCarImage(vehicle.brand, vehicle.model)}
                            className="w-16 h-10 object-cover rounded border border-white/10"
                            alt="Selected Car"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = '/car-placeholder.svg';
                            }}
                        />
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Selected Vehicle</p>
                            <p className="text-sm font-serif text-white">{vehicle.name} <span className="text-amber-500 mx-2">•</span> ₹{vehicle.rate?.toLocaleString() || 0}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="h-12 border-white/10 text-gray-400 hover:border-white hover:text-white hover:bg-white/5 uppercase tracking-widest text-xs font-bold px-8 bg-transparent" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                        <Button className="h-12 bg-white text-black hover:bg-amber-400 hover:text-black uppercase tracking-widest text-xs font-bold px-8 shadow-lg transition-all border border-transparent" onClick={() => navigate('/booking/services')}>
                            Continue to Services <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
