import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../../contexts/BookingContext'
import { Card, CardContent } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Checkbox } from '../../../components/ui/Checkbox'
import { Plane, Gauge, Dog, ArrowRight } from 'lucide-react'

// Mock Essentials Data
const ESSENTIALS = [
    {
        id: 'airport_greet',
        title: 'Airport Meet & Greet',
        price: 5500.00,
        desc: 'VIP curbside service and luggage assistance. Our concierge will meet you directly at the gate or terminal exit.',
        icon: Plane,
        bg: 'from-teal-900/20 to-teal-900/5'
    },
    {
        id: 'extra_miles',
        title: 'Extra Mileage Package',
        price: 2500.00,
        desc: 'Pre-purchase 100 extra miles at a discounted rate for long-distance cruising without additional fees.',
        icon: Gauge,
        bg: 'from-blue-900/20 to-blue-900/5',
        selected: true // Mock pre-selection per design
    },
    {
        id: 'pet_prep',
        title: 'Pet Friendly Interior Prep',
        price: 3500.00,
        desc: 'Specialized cabin preparation and protective coverings for your companions to ensure a clean return.',
        icon: Dog,
        bg: 'from-orange-900/20 to-orange-900/5'
    }
]

export default function BookingStep3Essentials() {
    const navigate = useNavigate()
    const { bookingState, updateBooking } = useBooking()

    const toggleEssential = (id: string) => {
        const current = bookingState.essentials || []
        if (current.includes(id)) {
            updateBooking({ essentials: current.filter((x: string) => x !== id) })
        } else {
            updateBooking({ essentials: [...current, id] })
        }
    }

    return (
        <div className="min-h-screen bg-luxe-black pt-24 pb-32">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row gap-12">

                {/* MAIN CONTENT */}
                <div className="flex-1">
                    <div className="mb-10 border-b border-white/10 pb-8">
                        <span className="text-luxe-gold text-[10px] tracking-[0.2em] uppercase font-bold mb-2 block animate-pulse">Step 3 of 5 - 60% Complete</span>
                        <h1 className="text-4xl font-serif text-white mb-4">Travel Essentials</h1>
                        <p className="text-luxe-gray text-lg font-light max-w-2xl leading-relaxed">
                            Enhance your journey with our bespoke convenience packages, designed for those who demand seamless transitions.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {ESSENTIALS.map(item => {
                            const Icon = item.icon
                            const isSelected = bookingState.essentials?.includes(item.id) || (item.selected && !bookingState.essentials) // Handle mock default

                            return (
                                <Card
                                    key={item.id}
                                    className={`transition-all duration-300 border ${isSelected ? 'border-[#4169E1] bg-gradient-to-r ' + item.bg : 'border-white/10 bg-[#121212] hover:border-white/20'}`}
                                >
                                    <CardContent className="p-6 flex items-start gap-6">
                                        <div className={`p-4 rounded-xl ${isSelected ? 'bg-[#4169E1] text-white' : 'bg-white/5 text-gray-400'}`}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-serif text-white">{item.title}</h3>
                                                <span className="text-lg font-mono text-white">₹{item.price.toLocaleString('en-IN')}</span>
                                            </div>
                                            <p className="text-gray-400 font-light text-sm leading-relaxed mb-4">{item.desc}</p>

                                            <div
                                                onClick={() => toggleEssential(item.id)}
                                                className="flex items-center gap-3 cursor-pointer group"
                                            >
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#4169E1] border-[#4169E1]' : 'border-white/30 group-hover:border-white'}`}>
                                                    {isSelected && <div className="w-3 h-3 bg-white rounded-sm" />}
                                                </div>
                                                <span className={`text-xs uppercase tracking-widest font-bold ${isSelected ? 'text-[#4169E1]' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                                    {isSelected ? 'Selected' : 'Add to Booking'}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* RIGHT SIDEBAR - SUMMARY */}
                <div className="w-full lg:w-[380px] hidden lg:block">
                    <div className="bg-[#121212] border border-white/5 rounded-xl sticky top-28 p-8 shadow-2xl">
                        <h3 className="font-serif text-xl text-white mb-6 pb-4 border-b border-white/5">Booking Summary</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Vehicle</p>
                                <p className="text-white font-serif text-lg">2024 Porsche Taycan Turbo S</p>
                                <p className="text-xs text-[#4169E1] mt-1">Frozen Blue Metallic</p>
                            </div>

                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Dates</p>
                                <p className="text-white text-sm">Oct 12 - Oct 15, 2024</p>
                                <p className="text-xs text-gray-500 mt-1">(3 Days Rental)</p>
                            </div>

                            <div className="pt-4 border-t border-white/5 space-y-3">
                                <p className="text-[10px] text-luxe-gold uppercase tracking-widest font-bold">Travel Essentials</p>
                                {bookingState.essentials?.includes('extra_miles') || true ? (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">Extra Mileage Package</span>
                                        <span className="text-white font-mono">+₹{ESSENTIALS.find(e => e.id === 'extra_miles')?.price.toLocaleString('en-IN')}</span>
                                    </div>
                                ) : null}
                                {bookingState.essentials?.includes('airport_greet') && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">Airport Meet & Greet</span>
                                        <span className="text-white font-mono">+₹{ESSENTIALS.find(e => e.id === 'airport_greet')?.price.toLocaleString('en-IN')}</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-white/10 mt-6">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Running Total</span>
                                    <span className="text-2xl font-serif text-white">₹2,45,000.00</span>
                                </div>

                                <Button onClick={() => navigate('/booking/summary')} className="w-full bg-[#4169E1] hover:bg-blue-600 h-12 uppercase tracking-widest text-xs font-bold shadow-lg shadow-blue-900/20">
                                    Review Booking <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>

                                <p className="text-[9px] text-center text-gray-600 mt-4 uppercase tracking-wider">
                                    Taxes and security deposit calculated at final checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
