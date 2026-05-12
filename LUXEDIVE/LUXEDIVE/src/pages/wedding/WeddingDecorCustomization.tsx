import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ArrowRight, Check, Flower, Camera, Type, Loader2, AlertCircle } from 'lucide-react'
import { Toaster, toast } from 'sonner'

// Page 65: Wedding - Decor & Customization
export default function WeddingDecorCustomization() {
    const navigate = useNavigate()
    const location = useLocation()

    // Retrieve car data passed from previous screen, or fallback to default
    const selectedCar = location.state?.car || {
        title: "Rolls-Royce Ghost",
        image: "https://images.unsplash.com/photo-1631295868223-63265b40d9f4?q=80&w=2000"
    }

    // Customization State
    const [floral, setFloral] = useState<'none' | 'minimal' | 'royal'>('minimal')
    const [ribbon, setRibbon] = useState<'none' | 'white' | 'cream' | 'gold' | 'purple'>('white')
    const [signage, setSignage] = useState<'classic' | 'modern'>('classic')

    // Image Loading State
    const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
    const [currentImage, setCurrentImage] = useState(selectedCar.image)

    // Fallback: Generic Luxury Car (White)
    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=2000"

    const handleImageError = () => {
        // If the current image is ALREADY the fallback and it failed, then show error
        if (currentImage === FALLBACK_IMAGE) {
            setImageStatus('error')
            return
        }

        // Otherwise, switch to fallback
        console.log("Image failed to load, switching to fallback...")
        setCurrentImage(FALLBACK_IMAGE)
        setImageStatus('loading')
    }

    // Update status when selected car changes
    useEffect(() => {
        setCurrentImage(selectedCar.image)
        setImageStatus('loading')
    }, [selectedCar.image])

    // Prices in INR
    const prices = {
        base: 95000,
        floral: floral === 'minimal' ? 12500 : floral === 'royal' ? 35000 : 0,
        ribbon: 0,
        signage: 0
    }
    const total = prices.base + prices.floral + prices.ribbon + prices.signage

    return (
        <div className="min-h-screen bg-[#0F172A] text-white pt-24 pb-20">
            <Toaster position="top-center" theme="dark" />

            {/* NAV */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-[#0F172A]/90 backdrop-blur-md z-50 border-b border-white/5 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-serif text-white tracking-widest">LUXEDIVE</span>
                    <span className="text-gray-600">/</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Wedding Fleet</span>
                </div>
                <div className="bg-purple-900/20 px-4 py-1.5 rounded-full border border-purple-500/20 text-[10px] text-purple-400 font-bold uppercase tracking-widest">
                    Step 2: Customization
                </div>
                <div className="flex items-center gap-4">
                    <Button onClick={() => navigate('/login')} className="bg-purple-600 hover:bg-purple-700 text-white h-8 text-[10px] font-bold uppercase tracking-widest px-4">Sign In</Button>
                </div>
            </div>

            <div className="px-6 h-[calc(100vh-80px)] overflow-hidden flex flex-col md:flex-row gap-0">

                {/* LEFT: LIVE PREVIEW */}
                <div className="w-full md:w-2/3 h-full relative bg-gradient-to-br from-[#050505] to-[#1a1a1a] flex items-center justify-center p-8 rounded-2xl border border-white/5 mb-6 md:mb-0 md:mr-6">

                    {/* Header */}
                    <div className="absolute top-8 left-8 z-10 pointer-events-none">
                        <div className="inline-block bg-purple-600 text-white px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest mb-2 shadow-lg shadow-purple-900/50">
                            Live Visualizer
                        </div>
                        <h1 className="text-4xl font-serif text-white mb-2">Tailor Your Grand Entrance</h1>
                        <p className="text-gray-400 text-sm max-w-md">Every detail matters. Personalize your {selectedCar.title} below.</p>
                    </div>

                    {/* VISUALIZER CONTAINER */}
                    <div className="relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center bg-black/20 rounded-lg overflow-hidden border border-white/5 shadow-2xl">

                        {/* Loading State */}
                        {imageStatus === 'loading' && (
                            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 backdrop-blur-sm">
                                <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
                            </div>
                        )}

                        {/* Error State */}
                        {imageStatus === 'error' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80">
                                <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
                                <span className="text-sm text-gray-400">Unable to load vehicle preview</span>
                            </div>
                        )}

                        {/* Base Car Image */}
                        <img
                            src={currentImage}
                            className={`w-full h-full object-contain transition-opacity duration-700 ${imageStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageStatus('loaded')}
                            onError={handleImageError}
                            alt="Wedding Car Preview"
                        />

                        {/* --- DECORATION OVERLAYS --- */}
                        {imageStatus === 'loaded' && (
                            <div className="absolute inset-0 pointer-events-none">

                                {/* 1. RIBBONS */}
                                {ribbon !== 'none' && (
                                    <>
                                        {/* V-Shape Hood Ribbon Left */}
                                        <div
                                            className="absolute top-[35%] left-[25%] w-[22%] h-[2px] -rotate-[15deg] opacity-90 shadow-md transform origin-right"
                                            style={{ backgroundColor: ribbon === 'gold' ? '#FFD700' : ribbon === 'cream' ? '#F5F5DC' : ribbon === 'purple' ? '#9333ea' : '#FFFFFF', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                                        />
                                        {/* V-Shape Hood Ribbon Right */}
                                        <div
                                            className="absolute top-[35%] right-[25%] w-[22%] h-[2px] rotate-[15deg] opacity-90 shadow-md transform origin-left"
                                            style={{ backgroundColor: ribbon === 'gold' ? '#FFD700' : ribbon === 'cream' ? '#F5F5DC' : ribbon === 'purple' ? '#9333ea' : '#FFFFFF', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                                        />
                                        {/* Center Bow/Knot */}
                                        <div
                                            className="absolute top-[30%] left-[50%] -translate-x-1/2 w-10 h-8 rounded-full blur-[0.5px] shadow-xl z-20"
                                            style={{
                                                backgroundColor: ribbon === 'gold' ? '#FFD700' : ribbon === 'cream' ? '#F5F5DC' : ribbon === 'purple' ? '#9333ea' : '#FFFFFF',
                                                background: `radial-gradient(circle at 30% 30%, white, ${ribbon === 'gold' ? '#DAA520' : ribbon === 'cream' ? '#E8E8C0' : ribbon === 'purple' ? '#7e22ce' : '#E0E0E0'})`
                                            }}
                                        />
                                    </>
                                )}

                                {/* 2. FLORALS */}
                                {floral !== 'none' && (
                                    <div className="absolute inset-0 transition-opacity duration-500">
                                        {/* Minimal: Center piece on the bow */}
                                        {floral === 'minimal' && (
                                            <div className="absolute top-[28%] left-[50%] -translate-x-1/2 w-16 h-16 flex items-center justify-center">
                                                <div className="absolute w-20 h-20 bg-pink-400/20 blur-xl rounded-full" />
                                                <Flower className="w-12 h-12 text-pink-100 drop-shadow-lg" fill="rgb(244 114 182 / 0.5)" />
                                            </div>
                                        )}
                                        {/* Royal: Cascading flowers */}
                                        {floral === 'royal' && (
                                            <>
                                                {/* Garland across hood */}
                                                <div className="absolute top-[38%] left-[20%] right-[20%] h-8 flex justify-center gap-1 opacity-90">
                                                    {[...Array(8)].map((_, i) => (
                                                        <div key={i} className="w-6 h-6 rounded-full bg-pink-200 shadow-sm blur-[1px]" />
                                                    ))}
                                                </div>
                                                {/* Side clusters */}
                                                <div className="absolute top-[42%] left-[15%] w-10 h-10 bg-pink-300 rounded-full blur-[2px] opacity-70" />
                                                <div className="absolute top-[42%] right-[15%] w-10 h-10 bg-pink-300 rounded-full blur-[2px] opacity-70" />
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* 3. SIGNAGE (Plate) */}
                                <div className="absolute bottom-[16%] left-[50%] -translate-x-1/2 w-[12%] h-[5%] bg-white/95 shadow-md border border-gray-300 flex items-center justify-center rounded-[1px] transform perspective-[500px] rotateX(5deg)">
                                    <span className={`text-[0.4rem] md:text-[0.6rem] text-black whitespace-nowrap px-1 ${signage === 'classic' ? 'font-serif italic tracking-wide' : 'font-sans font-black tracking-tight'}`}>
                                        {signage === 'classic' ? 'Just Married' : 'L U X E'}
                                    </span>
                                </div>

                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-28 left-8 text-6xl font-black text-white/5 uppercase select-none pointer-events-none">{selectedCar.title}</div>
                </div>

                {/* RIGHT: CONFIGURATION */}
                <div className="w-full md:w-1/3 h-full flex flex-col bg-[#0B1121] border border-white/5 rounded-2xl overflow-hidden p-6">

                    <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">

                        {/* Step 1: Florals */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Flower className="w-4 h-4 text-purple-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Step 1 of 3: Floral Arrangements</span>
                            </div>

                            <div className="space-y-3">
                                <div
                                    onClick={() => setFloral('minimal')}
                                    className={`border rounded-xl p-4 cursor-pointer relative transition-all ${floral === 'minimal' ? 'border-purple-500 bg-purple-900/10' : 'border-white/5 bg-[#12182B] hover:border-white/20'}`}
                                >
                                    {floral === 'minimal' && <div className="absolute top-3 right-3 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                                    <h3 className="font-bold text-white text-sm">Minimalist Chic</h3>
                                    <p className="text-[11px] text-gray-400 mb-2">Hood & mirrors arrangement</p>
                                    <div className="text-xs font-bold text-white">+ ₹12,500</div>
                                </div>

                                <div
                                    onClick={() => setFloral('royal')}
                                    className={`border rounded-xl p-4 cursor-pointer relative transition-all ${floral === 'royal' ? 'border-purple-500 bg-purple-900/10' : 'border-white/5 bg-[#12182B] hover:border-white/20'}`}
                                >
                                    {floral === 'royal' && <div className="absolute top-3 right-3 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                                    <h3 className="font-bold text-white text-sm">Royal Cascade</h3>
                                    <p className="text-[11px] text-gray-400 mb-2">Full body floral draping</p>
                                    <div className="text-xs font-bold text-white">+ ₹35,000</div>
                                </div>

                                <div
                                    onClick={() => setFloral('none')}
                                    className={`border rounded-xl p-4 cursor-pointer relative transition-all ${floral === 'none' ? 'border-purple-500 bg-purple-900/10' : 'border-white/5 bg-[#12182B] hover:border-white/20'}`}
                                >
                                    {floral === 'none' && <div className="absolute top-3 right-3 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                                    <h3 className="font-bold text-white text-sm">No Florals</h3>
                                    <p className="text-[11px] text-gray-400 mb-2">Clean vehicle aesthetic</p>
                                    <div className="text-xs font-bold text-white">₹0</div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Ribbons */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Type className="w-4 h-4 text-purple-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Step 2: Ribbon Accents</span>
                            </div>

                            <div className="bg-[#12182B] rounded-xl p-5 border border-white/5">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-white">SELECT COLOR</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Premium Silk Finish (Included)</span>
                                </div>
                                <div className="flex gap-4">
                                    {['white', 'cream', 'gold', 'purple'].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setRibbon(color as any)}
                                            className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 relative ${ribbon === color ? 'border-purple-500 scale-110' : 'border-white/10'}`}
                                            style={{ backgroundColor: color === 'gold' ? '#FFD700' : color === 'cream' ? '#F5F5DC' : color === 'purple' ? '#9333ea' : 'white' }}
                                        >
                                            {ribbon === color && <Check className={`w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${color === 'purple' ? 'text-white' : 'text-black'}`} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Signage */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Camera className="w-4 h-4 text-purple-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Step 3: 'Just Married' Signage</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div
                                    onClick={() => setSignage('classic')}
                                    className={`border rounded-xl p-4 cursor-pointer text-center transition-all ${signage === 'classic' ? 'border-purple-500 bg-purple-900/10' : 'border-white/5 bg-[#12182B] hover:bg-white/5'}`}
                                >
                                    <div className="font-serif italic text-lg mb-2 text-white">Classic Script</div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-purple-400">{signage === 'classic' ? 'Selected' : 'Select'}</div>
                                </div>
                                <div
                                    onClick={() => setSignage('modern')}
                                    className={`border rounded-xl p-4 cursor-pointer text-center transition-all ${signage === 'modern' ? 'border-purple-500 bg-purple-900/10' : 'border-white/5 bg-[#12182B] hover:bg-white/5'}`}
                                >
                                    <div className="font-sans font-black text-lg mb-2 text-white/50">MODERN LUX</div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-gray-600">{signage === 'modern' ? 'Selected' : 'Select'}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Price Summary */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="bg-[#050912] rounded-xl p-4 mb-4">
                            <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-gray-400">Base Rental (8 Hours)</span>
                                <span className="text-white">₹{prices.base.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[11px] mb-3">
                                <span className="text-gray-400">Custom Decor Total</span>
                                <span className="text-white">₹{(prices.floral + prices.ribbon).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-end border-t border-white/10 pt-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Total Estimate</span>
                                <span className="text-2xl font-serif font-bold text-white">₹{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <Button onClick={() => navigate('/wedding/logistics')} className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-widest text-xs rounded-lg shadow-lg shadow-purple-900/30 mb-3">
                            Review & Checkout <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                        <div className="flex justify-between items-center text-[10px]">
                            <button onClick={() => toast.success("Configuration saved to wishlist")} className="text-gray-500 hover:text-white uppercase tracking-widest font-bold">Save Configuration</button>
                            <span className="text-gray-600 italic">*Pricing may vary</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
