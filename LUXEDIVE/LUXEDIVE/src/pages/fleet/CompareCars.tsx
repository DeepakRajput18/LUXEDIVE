import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    X,
    Check,
    Gauge,
    Users,
    Fuel,
    Settings,
    ArrowRight,
    ChevronDown,
    Search
} from 'lucide-react';

interface Car {
    id: string;
    make: string;
    model: string;
    image: string;
    price: number;
    specs: {
        acceleration: string;
        topSpeed: string;
        power: string;
        engine: string;
        drive: string;
        transmission: string;
    };
    features: string[];
}

const CompareCars: React.FC = () => {
    const navigate = useNavigate();

    // Mock Data
    const allCars: Car[] = [
        {
            id: '1',
            make: 'Porsche',
            model: '911 GT3 RS',
            image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80',
            price: 45000,
            specs: {
                acceleration: '3.2s',
                topSpeed: '296 km/h',
                power: '518 HP',
                engine: '4.0L Flat-6',
                drive: 'RWD',
                transmission: '7-Speed PDK'
            },
            features: ['Apple CarPlay', 'Carbon Seats', 'Lift System']
        },
        {
            id: '2',
            make: 'Ferrari',
            model: '488 GTB',
            image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80',
            price: 55000,
            specs: {
                acceleration: '3.0s',
                topSpeed: '330 km/h',
                power: '660 HP',
                engine: '3.9L V8 Turbo',
                drive: 'RWD',
                transmission: '7-Speed Dual Clutch'
            },
            features: ['Apple CarPlay', 'JBL Audio', 'Front Lift']
        },
        {
            id: '3',
            make: 'Lamborghini',
            model: 'Huracán Evo',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80',
            price: 60000,
            specs: {
                acceleration: '2.9s',
                topSpeed: '325 km/h',
                power: '631 HP',
                engine: '5.2L V10',
                drive: 'AWD',
                transmission: '7-Speed DCT'
            },
            features: ['Apple CarPlay', 'Sensonum Audio', 'Lift System']
        }
    ];

    const [selectedCars, setSelectedCars] = useState<Car[]>([allCars[0], allCars[1]]);
    const [showAddModal, setShowAddModal] = useState(false);

    const removeCar = (id: string) => {
        setSelectedCars(selectedCars.filter(c => c.id !== id));
    };

    const addCar = (car: Car) => {
        if (selectedCars.length < 3) {
            setSelectedCars([...selectedCars, car]);
            setShowAddModal(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans pb-20">

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100 flex items-center justify-between px-6 md:px-12 h-20">
                <div className="flex items-center gap-8">
                    <h1 className="text-xl font-serif font-bold tracking-widest cursor-pointer" onClick={() => navigate('/')}>LUXEDIVE</h1>
                    <nav className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                        <span className="text-black">Compare Vehicles</span>
                        <a href="/fleet" className="hover:text-black transition-colors">Back to Fleet</a>
                    </nav>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">

                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-serif font-bold mb-4">Head-to-Head</h2>
                        <p className="text-gray-500">Compare specifications, features, and pricing to find your perfect match.</p>
                    </div>

                    {selectedCars.length < 3 && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="px-6 py-3 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Add Vehicle
                        </button>
                    )}
                </div>

                {/* Comparison Matrix */}
                <div className="overflow-x-auto">
                    <div className="min-w-[800px] grid grid-cols-4 gap-8">

                        {/* Labels Column */}
                        <div className="pt-64 space-y-12 pb-12">
                            <div className="h-px bg-gray-100 mb-8" />
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">Performance</h4>
                                <div className="space-y-6 text-sm font-medium text-gray-600">
                                    <p>0-60 MPH</p>
                                    <p>Top Speed</p>
                                    <p>Horsepwer</p>
                                    <p>Engine</p>
                                </div>
                            </div>
                            <div className="h-px bg-gray-100" />
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">Drivetrain</h4>
                                <div className="space-y-6 text-sm font-medium text-gray-600">
                                    <p>Drive Type</p>
                                    <p>Transmission</p>
                                </div>
                            </div>
                            <div className="h-px bg-gray-100" />
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-6">Pricing</h4>
                                <div className="space-y-6 text-sm font-medium text-gray-600">
                                    <p>Daily Rate</p>
                                    <p>Security Deposit</p>
                                </div>
                            </div>
                        </div>

                        {/* Car Columns */}
                        {selectedCars.map((car) => (
                            <div key={car.id} className="relative group">
                                {/* Header Card */}
                                <div className="h-64 mb-12 relative flex flex-col justify-end">
                                    <button
                                        onClick={() => removeCar(car.id)}
                                        className="absolute top-0 right-0 p-2 bg-gray-100 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="aspect-[16/10] mb-4 bg-gray-100 rounded-xl overflow-hidden">
                                        <img src={car.image} className="w-full h-full object-cover" alt={car.model} />
                                    </div>
                                    <h3 className="font-serif font-bold text-xl">{car.make}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{car.model}</p>
                                    <button className="w-full py-3 border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                                        Book Now
                                    </button>
                                </div>

                                <div className="h-px bg-gray-100 mb-8" />

                                {/* Specs Data */}
                                <div className="space-y-12 pb-12">
                                    {/* Performance */}
                                    <div className="space-y-6 text-sm font-bold pt-10">
                                        <p>{car.specs.acceleration}</p>
                                        <p>{car.specs.topSpeed}</p>
                                        <p>{car.specs.power}</p>
                                        <p>{car.specs.engine}</p>
                                    </div>
                                    <div className="h-px bg-gray-100" />

                                    {/* Drivetrain */}
                                    <div className="space-y-6 text-sm font-bold pt-10">
                                        <p>{car.specs.drive}</p>
                                        <p>{car.specs.transmission}</p>
                                    </div>
                                    <div className="h-px bg-gray-100" />

                                    {/* Pricing */}
                                    <div className="space-y-6 text-sm font-bold pt-10">
                                        <p className="font-mono text-lg">₹{car.price.toLocaleString()}</p>
                                        <p className="text-gray-500">₹{(car.price * 2).toLocaleString()}</p>
                                    </div>

                                </div>

                            </div>
                        ))}

                        {/* Add Placeholder */}
                        {selectedCars.length < 3 && (
                            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl hover:border-gray-400 transition-colors cursor-pointer" onClick={() => setShowAddModal(true)}>
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                                    <Plus className="w-6 h-6" />
                                </div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Add Vehicle</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-serif font-bold text-xl">Select Vehicle</h3>
                            <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5" /></button>
                        </div>

                        <div className="p-4 border-b border-gray-100">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input type="text" placeholder="Search fleet..." className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                            </div>
                        </div>

                        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
                            {allCars.filter(c => !selectedCars.find(sc => sc.id === c.id)).map(car => (
                                <div key={car.id} onClick={() => addCar(car)} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group">
                                    <img src={car.image} className="w-16 h-10 object-cover rounded-lg" alt={car.model} />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm">{car.make} {car.model}</h4>
                                        <p className="text-xs text-gray-500">₹{car.price.toLocaleString()}/day</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 -rotate-90 text-gray-300 group-hover:text-black transition-colors" />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default CompareCars;
