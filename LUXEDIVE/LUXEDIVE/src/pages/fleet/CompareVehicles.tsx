import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ChevronLeft, Zap, Star, ShieldCheck } from 'lucide-react'

// Mock Comparison Data
const VEHICLES = [
    {
        id: 'porsche-gt3',
        name: 'Porsche 911 GT3',
        model: '992 Generation',
        image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=600',
        badge: 'TOP RATED',
        badgeColor: 'bg-luxe-gold text-black',
        price: 1200,
        specs: {
            transmission: 'PDK Automatic',
            acceleration: '3.2s',
            horsepower: '502 hp',
            engine: '4.0L Flat-6',
            features: ['Carbon Buckets', 'Sport Chrono', 'Passenger Display']
        },
        highlights: { acceleration: false, horsepower: false }
    },
    {
        id: 'ferrari-f8',
        name: 'Ferrari F8',
        model: 'Tributo',
        image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=600',
        price: 1450,
        specs: {
            transmission: '7-Speed Dual Clutch',
            acceleration: '2.9s',
            horsepower: '710 hp',
            engine: '3.9L V8 Turbo',
            features: ['Carbon Ceramic Brakes', 'ALA Aerodynamics']
        },
        highlights: { acceleration: true, horsepower: true } // Blue indicators
    },
    {
        id: 'lambo-huracan',
        name: 'Lamborghini',
        model: 'Huracán EVO',
        image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=600',
        price: 1350,
        specs: {
            transmission: '7-Speed Dual Clutch',
            acceleration: '2.9s',
            horsepower: '630 hp',
            engine: '5.2L V10',
            features: ['Magneto Suspension', 'All-Wheel Steering']
        },
        highlights: { acceleration: false, horsepower: false }
    }
]

export default function CompareVehicles() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* Header */}
            <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-serif text-white mb-2">COMPARE VEHICLES</h1>
                    <p className="text-gray-400 font-light text-lg">Side-by-side specification analysis</p>
                </div>
                <Button variant="outline" onClick={() => navigate('/fleet')} className="border-white/10 text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs font-bold h-12 px-6">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back to Fleet
                </Button>
            </div>

            {/* COMPARISON TABLE */}
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">

                    {/* HEADERS (Car Cards) */}
                    <div className="grid grid-cols-4 border-b border-white/5">
                        <div className="p-8 border-r border-white/5 flex items-center bg-[#0A0A0A]">
                            <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Specification</span>
                        </div>
                        {VEHICLES.map((car, idx) => (
                            <div key={car.id} className={`p-8 border-r border-white/5 relative ${idx === VEHICLES.length - 1 ? 'border-r-0' : ''}`}>
                                {car.badge && (
                                    <span className={`absolute top-4 right-4 ${car.badgeColor} text-[10px] font-bold uppercase px-2 py-1 rounded shadow-lg`}>
                                        {car.badge}
                                    </span>
                                )}
                                <div className="h-32 mb-6 rounded-lg overflow-hidden bg-gray-900 border border-white/10 relative group">
                                    <img src={car.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={car.name} />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-1">{car.name}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">{car.model}</p>
                                <Button onClick={() => navigate(`/fleet/${car.id}`)} className="w-full bg-white text-black hover:bg-gray-200 uppercase tracking-widest text-[10px] font-bold h-10">
                                    Book Now →
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* ROWS */}
                    {[
                        { label: 'DAILY RATE', key: 'price', format: (v: number) => `$${v.toLocaleString()}/day` },
                        { label: 'TRANSMISSION', key: 'specs.transmission' },
                        { label: '0-100 KM/H', key: 'specs.acceleration', highlight: true },
                        { label: 'HORSEPOWER', key: 'specs.horsepower', highlight: true },
                        { label: 'ENGINE', key: 'specs.engine' },
                    ].map((row, rowIdx) => (
                        <div key={row.label} className={`grid grid-cols-4 border-b border-white/5 hover:bg-white/5 transition-colors ${rowIdx % 2 !== 0 ? 'bg-[#0F0F0F]' : ''}`}>
                            <div className="p-6 border-r border-white/5 flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                                {row.label}
                            </div>
                            {VEHICLES.map((car: any, carIdx) => {
                                const val = row.key.includes('.') ? car.specs[row.key.split('.')[1]] : car[row.key]
                                const isHighlight = row.highlight && car.highlights?.[row.key.split('.')[1]]

                                return (
                                    <div key={car.id} className={`p-6 border-r border-white/5 flex items-center ${carIdx === VEHICLES.length - 1 ? 'border-r-0' : ''} ${row.key === 'price' ? 'font-serif text-lg text-white' : 'text-sm text-gray-300'}`}>
                                        {row.format ? row.format(val) : val}
                                        {isHighlight && (
                                            <span className="ml-2 text-[#4169E1] animate-pulse">
                                                {row.key.includes('acceleration') ? <Zap className="w-3 h-3 fill-current" /> : <Star className="w-3 h-3 fill-current" />}
                                            </span>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ))}

                    {/* FEATURES ROW */}
                    <div className="grid grid-cols-4 hover:bg-white/5 transition-colors">
                        <div className="p-6 border-r border-white/5 flex items-start text-gray-400 text-xs font-bold uppercase tracking-widest pt-8">
                            Key Features
                        </div>
                        {VEHICLES.map((car, idx) => (
                            <div key={car.id} className={`p-6 border-r border-white/5 ${idx === VEHICLES.length - 1 ? 'border-r-0' : ''}`}>
                                <ul className="space-y-3">
                                    {car.specs.features.map(feat => (
                                        <li key={feat} className="text-xs text-gray-400 flex items-center gap-2">
                                            <div className="w-1 h-1 bg-luxe-gold rounded-full" /> {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div className="grid grid-cols-4 border-t border-white/5 bg-[#0A0A0A]">
                        <div className="p-6 border-r border-white/5"></div>
                        {VEHICLES.map((car, idx) => (
                            <div key={car.id} className={`p-6 border-r border-white/5 ${idx === VEHICLES.length - 1 ? 'border-r-0' : ''}`}>
                                <Button onClick={() => navigate(`/fleet/${car.id}`)} className="w-full bg-[#4169E1] hover:bg-blue-600 text-white uppercase tracking-widest text-[10px] font-bold h-12 shadow-lg shadow-blue-900/20">
                                    Book Now →
                                </Button>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="text-center mt-12 pb-12">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                        © 2024 LUXEDIVE. All prices include insurance. | <a href="#" className="hover:text-white">Terms</a>, <a href="#" className="hover:text-white">Privacy</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
