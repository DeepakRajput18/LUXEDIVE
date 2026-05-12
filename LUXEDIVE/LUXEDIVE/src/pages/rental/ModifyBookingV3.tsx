import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    Check,
    Info,
    Calendar,
    MapPin,
    Car,
    ChevronRight
} from 'lucide-react';

const ModifyBookingV3: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedUpgrade, setSelectedUpgrade] = useState<string | null>(null);

    // Mock Pricing
    const basePrice = 95000;
    const upgradeCost = selectedUpgrade ? 15000 * 3 : 0; // 3 days
    const durationCost = 0; // Assume 0 for step 1
    const totalDifference = upgradeCost + durationCost;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white pb-20">

            {/* Header */}
            <header className="pt-12 pb-12 px-6 border-b border-white/10 bg-[#0F1218]">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">GUIDED CONCIERGE</p>
                    <h1 className="text-4xl font-serif font-medium mb-3">Modify Your Journey</h1>
                    <p className="text-gray-400 font-light max-w-xl text-lg">
                        Tailor your reservation details. Follow the steps to refine your upcoming experience.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left: Step Indicator */}
                <div className="lg:col-span-3">
                    <div className="sticky top-12 space-y-6">
                        {[
                            { step: 1, label: 'Select Vehicle' },
                            { step: 2, label: 'Adjust Duration' },
                            { step: 3, label: 'Pick-up & Drop-off' }
                        ].map((s) => (
                            <div
                                key={s.step}
                                className={`group flex items-center gap-4 cursor-pointer transition-all ${currentStep === s.step ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                                    }`}
                                onClick={() => setCurrentStep(s.step)}
                            >
                                <span className={`text-2xl font-serif font-bold ${currentStep === s.step ? 'text-pink-500' : 'text-gray-500'}`}>
                                    {String(s.step).padStart(2, '0')}
                                </span>
                                <span className={`text-sm font-bold uppercase tracking-widest ${currentStep === s.step ? 'text-white' : 'text-gray-500'}`}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center: Content Area */}
                <div className="lg:col-span-6 min-h-[500px]">

                    {/* Step 1: Vehicle Selection */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-fadeIn">

                            {/* Current Vehicle Card */}
                            <div className="border border-white/20 rounded-xl p-1 bg-white/5 relative overflow-hidden">
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="px-3 py-1 bg-black/80 backdrop-blur border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-full text-gray-300">
                                        Current Selection
                                    </span>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-6 p-6 items-center">
                                    <div className="w-full sm:w-1/3 aspect-video bg-gray-800 rounded-lg overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-full sm:w-2/3">
                                        <h3 className="text-xl font-medium mb-1">Porsche 911 Carrera S</h3>
                                        <p className="text-gray-500 text-xs mb-4">Automatic • Sport Package • GPS Included</p>
                                        <div className="flex items-center gap-2 text-pink-500 text-sm font-bold">
                                            <Check className="w-4 h-4" /> Selected
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="flex items-center gap-4 py-4">
                                <div className="h-px bg-white/10 flex-1" />
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Available Upgrade</span>
                                <div className="h-px bg-white/10 flex-1" />
                            </div>

                            {/* Upgrade Option */}
                            <div
                                className={`border rounded-xl p-1 relative overflow-hidden transition-all cursor-pointer group ${selectedUpgrade === 'turbo' ? 'border-pink-500 bg-pink-500/5' : 'border-white/10 hover:border-white/30 bg-[#1A1F2E]'
                                    }`}
                                onClick={() => setSelectedUpgrade(selectedUpgrade === 'turbo' ? null : 'turbo')}
                            >
                                <div className="flex flex-col sm:flex-row gap-6 p-6 items-center">
                                    <div className="w-full sm:w-1/3 aspect-video bg-gray-800 rounded-lg overflow-hidden relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1614200187524-dc4b89114b05?auto=format&fit=crop&q=80"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-pink-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="w-full sm:w-2/3">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-xl font-medium group-hover:text-pink-400 transition-colors">Porsche 911 Turbo Cabriolet</h3>
                                            <span className="text-pink-500 font-bold font-serif text-lg">+₹15,000<span className="text-sm font-sans text-pink-500/60">/day</span></span>
                                        </div>
                                        <p className="text-gray-500 text-xs mb-6">All-Wheel Drive • Premium Sound • Performance Exhaust</p>
                                        <button className={`px-6 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all ${selectedUpgrade === 'turbo'
                                                ? 'bg-pink-600 text-white'
                                                : 'bg-white/10 hover:bg-white hover:text-black text-white'
                                            }`}>
                                            {selectedUpgrade === 'turbo' ? 'Upgrade Selected' : 'Select Upgrade'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* Step 2 Dummy */}
                    {currentStep === 2 && (
                        <div className="h-64 flex items-center justify-center border border-dashed border-white/20 rounded-xl text-gray-500 text-sm">
                            Step 2: Duration Controls (Implemented in Production)
                        </div>
                    )}

                    {/* Step 3 Dummy */}
                    {currentStep === 3 && (
                        <div className="h-64 flex items-center justify-center border border-dashed border-white/20 rounded-xl text-gray-500 text-sm">
                            Step 3: Location Controls (Implemented in Production)
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-12 flex justify-between items-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-xs font-bold text-gray-500 hover:text-white transition-colors"
                        >
                            DISCARD & EXIT
                        </button>
                        <button
                            onClick={() => currentStep < 3 ? setCurrentStep(currentStep + 1) : navigate('/modification-confirmed')}
                            className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded hover:bg-pink-500 hover:text-white transition-colors flex items-center gap-2"
                        >
                            {currentStep === 3 ? 'Confirm Modifications' : 'Next Step'} <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>

                {/* Right: Breakdown */}
                <div className="lg:col-span-3">
                    <div className="bg-[#1A1F2E] border border-white/10 rounded-xl p-6 sticky top-12">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Live Breakdown</h3>

                        <div className="space-y-4 mb-8 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Reservation Base</span>
                                <span className="font-mono">₹{basePrice.toLocaleString('en-IN')}.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={selectedUpgrade ? 'text-pink-400' : 'text-gray-600'}>Vehicle Upgrade</span>
                                <span className={`font-mono ${selectedUpgrade ? 'text-pink-400' : 'text-gray-600'}`}>+₹{upgradeCost.toLocaleString('en-IN')}.00</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Duration Delta</span>
                                <span className="font-mono">+₹0.00</span>
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between items-baseline font-bold text-lg">
                                <span className="text-white">Total Diff</span>
                                <span className={totalDifference > 0 ? 'text-pink-500' : 'text-white'}>+₹{totalDifference.toLocaleString('en-IN')}.00</span>
                            </div>
                            <p className="text-[10px] text-gray-500 text-right mt-1">Taxes and concierge fees included</p>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex gap-3">
                            <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-blue-400 mb-1">LUXURY PROTECTION</p>
                                <p className="text-[10px] text-gray-400 leading-relaxed">
                                    Full coverage remains active across all modification paths.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default ModifyBookingV3;
