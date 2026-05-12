import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Fuel, SprayCan, AlertTriangle, Check, ChevronRight } from 'lucide-react';
import { getCarImage } from '../../../lib/placeholders';
import { useBooking } from '../../../contexts/BookingContext';

const DeliveryInspection = () => {
    const navigate = useNavigate();
    const { bookingState } = useBooking();
    const [inspected, setInspected] = useState({
        exterior: true,
        fuel: true,
        interior: true,
        scratches: false
    });

    const car = bookingState.carDetails ? {
        make: bookingState.carDetails.brand,
        model: bookingState.carDetails.model,
        license: 'LXD 9982',
        color: 'Obsidian Black',
        transmission: bookingState.carDetails.transmission || 'Automatic',
        power: bookingState.carDetails.specs?.hp || '577 HP'
    } : {
        make: 'Mercedes-Benz',
        model: 'AMG GT',
        license: 'LXD 9982',
        color: 'Obsidian Black',
        transmission: 'Automatic',
        power: '577 HP'
    };

    const handleAccept = () => {
        // In real app, submit to vehicle_checklists table via RPC
        navigate('/booking/delivery-options'); // Proceed to next step or dashboard
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans pb-20">
            {/* Header */}
            <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-12 h-20">
                <h1 className="text-xl font-serif font-bold tracking-widest">LUXEDIVE</h1>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Step 3 of 4
                </div>
            </header>

            <div className="pt-32 pb-12 active-fade-in-up md:max-w-4xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <span className="bg-blue-600 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-4 inline-block shadow-lg shadow-blue-200">
                        Inspection Required
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Verify condition before takeoff</h2>
                    <div className="max-w-xs mx-auto">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">
                            <span>Verified</span>
                            <span>75%</span>
                        </div>
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-3/4 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">

                    {/* Checklist */}
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            Inspection Checklist
                        </h3>
                        <div className="space-y-4">

                            {/* Item 1 */}
                            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                        <Camera className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Exterior Cleanliness</p>
                                        <p className="text-xs text-green-600 font-medium mt-0.5">Verified by Agent</p>
                                    </div>
                                </div>
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                                    <Check className="w-3 h-3" />
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                        <Fuel className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Fuel Level: Full</p>
                                        <p className="text-xs text-green-600 font-medium mt-0.5">Verified • 100%</p>
                                    </div>
                                </div>
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                                    <Check className="w-3 h-3" />
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                        <SprayCan className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Interior Sanitized</p>
                                        <p className="text-xs text-green-600 font-medium mt-0.5">ISO 9001 Standard</p>
                                    </div>
                                </div>
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                                    <Check className="w-3 h-3" />
                                </div>
                            </div>

                            {/* Item 4 */}
                            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 cursor-pointer hover:border-blue-200 transition-colors" onClick={() => setInspected(prev => ({ ...prev, scratches: !prev.scratches }))}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Pre-existing Scratches</p>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5">0 Major, 2 Minor • <span className="text-blue-600 underline">View Diagram</span></p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white border transition-colors ${inspected.scratches ? 'bg-green-500 border-green-500' : 'bg-transparent border-gray-300'}`}>
                                    {inspected.scratches && <Check className="w-3 h-3" />}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Car Preview */}
                    <div className="sticky top-32">
                        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl group">
                            <div className="relative aspect-video bg-gray-100">
                                <img
                                    src={bookingState.carDetails ? (bookingState.carDetails.images?.[0] || getCarImage(bookingState.carDetails.brand, bookingState.carDetails.model)) : '/car-placeholder.svg'}
                                    alt={`${car.make} ${car.model}`}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = '/car-placeholder.svg';
                                    }}
                                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                                    <h3 className="text-2xl font-serif font-bold">{car.make} {car.model}</h3>
                                    <p className="text-sm opacity-90">{car.transmission} • {car.power}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">License Plate</p>
                                        <p className="font-mono font-bold text-lg">{car.license}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Color</p>
                                        <p className="font-bold text-lg">{car.color}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAccept}
                                    disabled={!inspected.scratches}
                                    className={`w-full py-4 text-sm font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all ${inspected.scratches
                                        ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Accept Delivery <ChevronRight className="w-4 h-4" />
                                </button>

                                <div className="mt-4 text-center">
                                    <button className="text-xs text-gray-400 hover:text-red-500 underline font-medium transition-colors">
                                        Report an issue with this vehicle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DeliveryInspection;
