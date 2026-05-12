import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Checkbox } from '../../components/ui/Checkbox'
import { Bell, ChevronLeft, ChevronRight, Upload } from 'lucide-react'

export default function AddVehicleWizard() {
    const [step] = useState(2)

    return (
        <div className="min-h-screen bg-luxe-black text-white font-sans">
            {/* Top Bar */}
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0F0F0F]">
                <div className="flex items-center gap-4">
                    <span className="font-serif text-[#DC143C] text-lg tracking-[0.15em] font-bold">LUXEDIVE ADMIN</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    <div className="flex items-center gap-3 border-l border-white/10 pl-6 h-8">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Admin User - Fleet Manager</span>
                        <div className="w-8 h-8 bg-gray-700 rounded-full border border-gray-600" />
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex h-[calc(100vh-64px)]">
                {/* Left Column - Form */}
                <div className="flex-1 p-12 overflow-y-auto bg-[#0A0A0A]">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex justify-between items-end mb-10">
                            <h1 className="text-4xl font-serif text-white">Add New Vehicle</h1>
                            <span className="text-[#DC143C] font-mono text-sm tracking-widest font-bold">STEP {step} OF 4</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-800 h-1 mb-12 rounded-full overflow-hidden">
                            <div className="bg-[#DC143C] h-full w-1/2 shadow-[0_0_10px_#DC143C]" />
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-10 border-b border-white/10 mb-10 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                            <span className="pb-4 cursor-pointer hover:text-white">Basic Info</span>
                            <span className="text-white border-b-2 border-[#DC143C] pb-4 -mb-0.5">Specs</span>
                            <span className="pb-4 cursor-pointer hover:text-white">Images</span>
                            <span className="pb-4 cursor-pointer hover:text-white">Pricing</span>
                        </div>

                        <div className="space-y-12">
                            <section>
                                <h3 className="text-xl font-serif text-white mb-6 border-l-2 border-[#DC143C] pl-4">Engine & Performance</h3>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-bold">Engine Type</label>
                                        <select className="w-full bg-black/40 border border-white/10 rounded-lg h-14 px-4 text-white hover:border-white/20 focus:border-[#DC143C] transition-colors appearance-none">
                                            <option>Select Engine</option>
                                            <option>4.0L Twin-Turbo V8</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-bold">Transmission</label>
                                        <select className="w-full bg-black/40 border border-white/10 rounded-lg h-14 px-4 text-white hover:border-white/20 focus:border-[#DC143C] transition-colors appearance-none">
                                            <option>Select Transmission</option>
                                            <option>8-Speed PDK</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-bold">Horsepower (HP)</label>
                                        <Input placeholder="e.g. 640" className="h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-600" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-bold">0-60 Time (Sec)</label>
                                        <Input placeholder="e.g. 2.9s" className="h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-600" />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-serif text-white mb-6 border-l-2 border-[#DC143C] pl-4">Key Features</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="flex items-center gap-4 p-5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/5 transition-colors group">
                                        <Checkbox className="border-white/30 data-[state=checked]:bg-[#DC143C] data-[state=checked]:border-[#DC143C]" />
                                        <span className="text-sm text-gray-300 group-hover:text-white">Carbon Fiber Package</span>
                                    </label>
                                    <label className="flex items-center gap-4 p-5 border border-[#DC143C]/40 bg-[#DC143C]/5 rounded-lg cursor-pointer transition-colors">
                                        <Checkbox defaultChecked className="border-white/30 data-[state=checked]:bg-[#DC143C] data-[state=checked]:border-[#DC143C]" />
                                        <span className="text-sm text-white font-medium">Sport Chrono</span>
                                    </label>
                                    <label className="flex items-center gap-4 p-5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/5 transition-colors group">
                                        <Checkbox className="border-white/30 data-[state=checked]:bg-[#DC143C] data-[state=checked]:border-[#DC143C]" />
                                        <span className="text-sm text-gray-300 group-hover:text-white">Ceramic Brakes</span>
                                    </label>
                                    <label className="flex items-center gap-4 p-5 border border-[#DC143C]/40 bg-[#DC143C]/5 rounded-lg cursor-pointer transition-colors">
                                        <Checkbox defaultChecked className="border-white/30 data-[state=checked]:bg-[#DC143C] data-[state=checked]:border-[#DC143C]" />
                                        <span className="text-sm text-white font-medium">Burmester Sound</span>
                                    </label>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-serif text-white mb-6 border-l-2 border-[#DC143C] pl-4">Preview Next Step</h3>
                                <div className="border-2 border-dashed border-white/10 rounded-xl h-40 flex flex-col items-center justify-center text-gray-500 hover:border-[#DC143C]/50 hover:bg-[#DC143C]/5 transition-all cursor-pointer group">
                                    <div className="p-3 bg-white/5 rounded-full mb-3 group-hover:bg-[#DC143C]/10 text-gray-400 group-hover:text-[#DC143C]">
                                        <Upload className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-white">Click to upload or drag and drop</span>
                                    <span className="text-[10px] text-gray-600 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                                </div>
                            </section>
                        </div>

                        <div className="flex justify-between mt-16 pt-8 border-t border-white/10">
                            <Button variant="ghost" className="text-gray-400 hover:text-white uppercase tracking-widest text-xs font-bold h-12">
                                <ChevronLeft className="w-4 h-4 mr-2" /> Back
                            </Button>
                            <div className="flex gap-4">
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white hover:text-black uppercase tracking-widest text-xs font-bold h-12 px-8">
                                    Save as Draft
                                </Button>
                                <Button className="bg-[#DC143C] hover:bg-red-700 text-white uppercase tracking-widest text-xs font-bold h-12 px-8 shadow-[0_0_20px_rgba(220,20,60,0.3)]">
                                    Next Step <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Preview Card */}
                <div className="w-[450px] border-l border-white/10 bg-[#080808] p-10 hidden xl:block">
                    <p className="text-[10px] uppercase text-gray-500 mb-8 tracking-[0.2em] font-bold">Live Preview Cards</p>

                    <div className="bg-[#151515] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative group">
                        <div className="h-64 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=600" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105" alt="Porsche" />
                            <span className="absolute top-4 right-4 bg-[#DC143C] text-white text-[10px] px-3 py-1.5 rounded uppercase font-bold tracking-wider shadow-lg">Draft</span>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[10px] text-[#DC143C] tracking-[0.2em] font-bold uppercase mb-1">Porsche</p>
                                    <h3 className="text-2xl font-serif text-white">911 Turbo S</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Daily Rate</p>
                                    <p className="text-lg font-serif text-white">---</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-3 mb-6 pt-4 border-t border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 uppercase">Year</span>
                                    <span className="text-sm text-white">2024</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[10px] text-gray-500 uppercase">Category</span>
                                    <span className="text-sm text-white">Coupe</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                <span className="text-[10px] text-luxe-gray uppercase tracking-widest font-bold">Availability</span>
                                <div className="w-10 h-5 bg-gray-800 rounded-full relative cursor-pointer opacity-50">
                                    <div className="absolute left-1 top-1 w-3 h-3 bg-gray-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-[#DC143C]/5 border border-[#DC143C]/20 rounded-xl">
                        <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#DC143C] mt-1.5" />
                            <p className="text-xs text-red-200/80 leading-relaxed font-light">
                                Filling out all specification fields improves search visibility by <span className="text-white font-bold">35%</span>. Ensure 0-60 times are accurate.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
