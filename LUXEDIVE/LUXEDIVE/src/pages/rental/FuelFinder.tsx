import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { Fuel, Navigation, MapPin, Search, Zap, Droplet } from 'lucide-react'
import { toast } from 'sonner'

// Mock Data for Premium Stations
const STATIONS = [
    { id: 1, name: 'Shell V-Power Station', vicinity: 'SG Highway, Bodakdev', type: 'Premium Petrol', distance: '2.4 km', rating: 4.8, lat: 23.04, lng: 72.50, x: 40, y: 50 },
    { id: 2, name: 'Reliance Jio-BP', vicinity: 'Sindhu Bhavan Road', type: 'Diesel & EV', distance: '3.1 km', rating: 4.6, lat: 23.03, lng: 72.51, x: 55, y: 40 },
    { id: 3, name: 'Nayara Energy Plus', vicinity: 'Prahlad Nagar', type: 'Standard', distance: '5.2 km', rating: 4.3, lat: 23.01, lng: 72.52, x: 30, y: 70 },
    { id: 4, name: 'IndianOil XP100', vicinity: 'Airport Circle', type: 'Octane 100', distance: '8.5 km', rating: 4.9, lat: 23.07, lng: 72.60, x: 75, y: 25 },
    { id: 5, name: 'ChargeZone SuperFast', vicinity: 'IIM Road', type: 'EV Charging', distance: '1.2 km', rating: 4.7, lat: 23.03, lng: 72.54, x: 45, y: 55 }
]

export default function FuelFinder() {
    const [selectedStation, setSelectedStation] = useState<number | null>(null);
    const [filter, setFilter] = useState<'All' | 'Fuel' | 'EV'>('All');

    const filteredStations = STATIONS.filter(s => {
        if (filter === 'All') return true;
        if (filter === 'EV') return s.type.includes('EV');
        return !s.type.includes('EV');
    });

    const handleNavigate = (station: any) => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`, '_blank');
        toast.success("Navigation functionality started.");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] relative bg-[#0F172A] text-white">

            {/* Map Background (Mock) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Dark Map Image Placeholder */}
                <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2400"
                    className="w-full h-full object-cover opacity-50 grayscale contrast-125"
                    alt="Map Background"
                />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
            </div>

            {/* Floating Pins */}
            {filteredStations.map((station) => (
                <div
                    key={station.id}
                    className="absolute z-10 cursor-pointer group"
                    style={{ top: `${station.y}%`, left: `${station.x}%` }}
                    onClick={() => setSelectedStation(station.id)}
                >
                    <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-xl transition-transform hover:scale-125 ${selectedStation === station.id ? 'bg-luxe-gold scale-125' : 'bg-black'}`}>
                        {station.type.includes('EV') ? <Zap className="w-4 h-4 text-white" /> : <Fuel className="w-4 h-4 text-white" />}

                        {/* Pulsing Effect for selected */}
                        {selectedStation === station.id && (
                            <div className="absolute inset-0 rounded-full animate-ping bg-luxe-gold opacity-50"></div>
                        )}
                    </div>

                    {/* Tooltip Name */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-[10px] font-bold uppercase tracking-widest rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {station.name}
                    </div>
                </div>
            ))}

            {/* Sidebar / Overlay */}
            <div className="absolute top-4 left-4 z-20 w-80 max-h-[calc(100%-32px)] flex flex-col gap-4">

                {/* Search & Filter */}
                <Card className="bg-[#0B1121]/95 backdrop-blur border-white/10 shadow-2xl">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-5 h-5 text-luxe-gold" />
                            <h2 className="font-serif text-white text-lg">Fuel & Charge</h2>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search area..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-luxe-gold/50"
                            />
                        </div>

                        <div className="flex p-1 bg-white/5 rounded-lg">
                            {['All', 'Fuel', 'EV'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${filter === f ? 'bg-luxe-gold text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* List Results */}
                <Card className="bg-[#0B1121]/95 backdrop-blur border-white/10 shadow-2xl flex-1 overflow-hidden flex flex-col">
                    <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
                        {filteredStations.map((station) => (
                            <div
                                key={station.id}
                                onClick={() => setSelectedStation(station.id)}
                                className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${selectedStation === station.id ? 'bg-white/10 border-l-2 border-l-luxe-gold' : 'hover:bg-white/5 border-l-2 border-l-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-medium text-sm ${selectedStation === station.id ? 'text-luxe-gold' : 'text-white'}`}>{station.name}</h3>
                                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-900/30 px-1.5 py-0.5 rounded">{station.distance}</span>
                                </div>
                                <p className="text-gray-400 text-xs mb-2">{station.vicinity}</p>

                                <div className="flex items-center justify-between">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${station.type.includes('EV') ? 'bg-green-900/30 text-green-400' : 'bg-orange-900/30 text-orange-400'}`}>
                                        {station.type}
                                    </span>

                                    {selectedStation === station.id && (
                                        <Button size="sm" className="h-7 text-[10px] bg-white text-black hover:bg-luxe-gold hover:text-black font-bold uppercase tracking-widest"
                                            onClick={(e) => { e.stopPropagation(); handleNavigate(station); }}
                                        >
                                            <Navigation className="w-3 h-3 mr-1" /> Navigate
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

            </div>

        </div>
    )
}
