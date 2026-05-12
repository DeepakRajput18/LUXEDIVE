import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building, Briefcase, ChevronLeft, ChevronRight, Info } from 'lucide-react';

const DeliveryOptions = () => {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState<'home' | 'office' | 'showroom'>('home');
    const [address, setAddress] = useState({
        street: '',
        apartment: '',
        landmark: '',
        city: 'Ahmedabad',
        instructions: ''
    });

    const handleContinue = () => {
        // Submit via context or state
        navigate('/booking/essentials'); // Proceed to next step
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans pb-20">
            {/* Header */}
            <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-12 h-20">
                <h1 className="text-xl font-serif font-bold tracking-widest">LUXEDIVE</h1>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Step 1 of 4: Delivery
                </div>
            </header>

            <div className="pt-28 pb-12 active-fade-in-up max-w-6xl mx-auto px-6">

                <h2 className="text-3xl font-serif font-bold mb-2">How should we reach you?</h2>
                <p className="text-gray-500 mb-10">Choose your preferred delivery method for the Mercedes-Benz AMG GT.</p>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Left Panel: Form */}
                    <div>
                        {/* Method Selector */}
                        <div className="space-y-4 mb-8">

                            <label
                                className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${selectedMethod === 'home'
                                        ? 'border-blue-600 bg-blue-50/50'
                                        : 'border-gray-100 hover:border-gray-200'
                                    }`}
                                onClick={() => setSelectedMethod('home')}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center flex-shrink-0 ${selectedMethod === 'home' ? 'border-blue-600' : 'border-gray-300'}`}>
                                    {selectedMethod === 'home' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold">Home Delivery</h3>
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 px-2 py-0.5 rounded">Complimentary</span>
                                    </div>
                                    <p className="text-sm text-gray-500">We bring the car to your doorstep within 15km of our showroom.</p>
                                </div>
                            </label>

                            <label
                                className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${selectedMethod === 'office'
                                        ? 'border-blue-600 bg-blue-50/50'
                                        : 'border-gray-100 hover:border-gray-200'
                                    }`}
                                onClick={() => setSelectedMethod('office')}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center flex-shrink-0 ${selectedMethod === 'office' ? 'border-blue-600' : 'border-gray-300'}`}>
                                    {selectedMethod === 'office' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold">Office / Corporate</h3>
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Verified Only</span>
                                    </div>
                                    <p className="text-sm text-gray-500">Delivery to your registered business address.</p>
                                </div>
                            </label>

                            <label
                                className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${selectedMethod === 'showroom'
                                        ? 'border-blue-600 bg-blue-50/50'
                                        : 'border-gray-100 hover:border-gray-200'
                                    }`}
                                onClick={() => setSelectedMethod('showroom')}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center flex-shrink-0 ${selectedMethod === 'showroom' ? 'border-blue-600' : 'border-gray-300'}`}>
                                    {selectedMethod === 'showroom' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold">Branch Collection</h3>
                                    </div>
                                    <p className="text-sm text-gray-500">Pick up your vehicle directly from our S.G. Highway flagship lounge.</p>
                                </div>
                            </label>

                        </div>

                        {/* Address Form (Show only for Home/Office) */}
                        {selectedMethod !== 'showroom' && (
                            <div className="space-y-6 animate-fade-in-up">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Delivery Address</h3>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="e.g. 12, Royal Enclave"
                                        value={address.street}
                                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2">Apartment / Suite</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="Apt 4B"
                                            value={address.apartment}
                                            onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-2">City</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-sm text-gray-500 cursor-not-allowed"
                                            value="Ahmedabad"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">Nearby Landmark</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="Near Karnavati Club"
                                        value={address.landmark}
                                        onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">Special Instructions</label>
                                    <textarea
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black h-24 resize-none"
                                        placeholder="Gate code, parking instructions, etc."
                                        value={address.instructions}
                                        onChange={(e) => setAddress({ ...address, instructions: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4 mt-10">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-6 py-4 border border-gray-200 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleContinue}
                                className="flex-1 py-4 bg-black text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                Continue <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Map Preview */}
                    <div className="hidden lg:block relative h-full min-h-[600px] bg-gray-100 rounded-3xl overflow-hidden border border-gray-200">
                        {/* Placeholder Map - In real app use Google Maps API */}
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Ahmedabad,Gujarat&zoom=13&size=600x800&key=YOUR_API_KEY_HERE')] bg-cover bg-center grayscale opacity-50">
                            <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
                                <MapPin className="w-8 h-8 mx-auto mb-2 text-black" />
                                <h3 className="font-serif font-bold text-lg">Ahmedabad HQ</h3>
                                <p className="text-gray-500 text-sm">S.G. Highway, Bodakdev</p>
                            </div>
                        </div>

                        {/* Info Box Overlay */}
                        <div className="absolute bottom-8 left-8 right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                                <Info className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm mb-1">Concierge Support Available</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Our concierge team will contact you 30 minutes prior to delivery to coordinate keys handover.
                                    Valid ID proof is required.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DeliveryOptions;
