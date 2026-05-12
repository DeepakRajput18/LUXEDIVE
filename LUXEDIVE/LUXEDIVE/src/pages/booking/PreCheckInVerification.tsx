import { Button } from '../../components/ui/Button'
import { Camera, Scan, Lock as LockIcon, Shield, ArrowRight, HelpCircle } from 'lucide-react'

// Page 50: Pre-Check-in Verification
export default function PreCheckInVerification() {
    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER & PROGRESS */}
            <div className="container mx-auto px-6 mb-12">
                <div className="flex justify-between items-start mb-12">
                    <div className="text-xl font-serif tracking-widest">LUXEDIVE</div>
                    <div className="flex gap-2 items-center">
                        <button className="text-gray-400 hover:text-white"><HelpCircle className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto text-center mb-16">
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[10px] text-gray-500 font-bold">✓</div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Details</span>
                        </div>
                        <div className="w-12 h-px bg-gray-800"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[10px] text-gray-500 font-bold">✓</div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Payment</span>
                        </div>
                        <div className="w-12 h-px bg-[#4169E1]"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#4169E1] flex items-center justify-center text-[10px] text-white font-bold animate-pulse">●</div>
                            <span className="text-[10px] text-[#4169E1] uppercase tracking-widest font-bold">Verification</span>
                        </div>
                    </div>

                    <div className="inline-block bg-blue-900/20 text-[#4169E1] border border-blue-500/20 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-4">
                        Step 3 of 3
                    </div>
                    <h1 className="text-4xl font-serif text-white mb-4">Identity Confirmation</h1>
                    <p className="text-gray-400 font-light leading-relaxed">
                        For your security and insurance validation, please complete the document upload below. All data is encrypted and deleted post-verification.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                {/* OPTION 1: SELFIE */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-10 text-center hover:border-blue-500/30 transition-all group">
                    <div className="w-20 h-20 rounded-full bg-[#1A1A1A] mx-auto mb-8 flex items-center justify-center group-hover:bg-blue-900/10 transition-colors">
                        <Camera className="w-8 h-8 text-[#4169E1]" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3">Selfie with Driving License</h2>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                        Take a photo holding your license near your face. Ensure the text on the ID is readable and your face is well-lit.
                    </p>
                    <div className="space-y-4">
                        <Button className="w-full bg-[#1A1A1A] border border-white/10 hover:bg-white text-white hover:text-black uppercase tracking-widest text-[10px] font-bold h-12">
                            <Camera className="w-4 h-4 mr-2" /> Open Camera
                        </Button>
                        <div className="flex items-center gap-4 opacity-50">
                            <div className="h-px bg-white/20 flex-1" />
                            <span className="text-[10px] uppercase font-bold text-gray-500">OR</span>
                            <div className="h-px bg-white/20 flex-1" />
                        </div>
                        <button className="text-xs text-gray-500 hover:text-white underline decoration-dotted">Upload from device</button>
                    </div>
                </div>

                {/* OPTION 2: SCAN */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-10 text-center hover:border-blue-500/30 transition-all group">
                    <div className="w-20 h-20 rounded-full bg-[#1A1A1A] mx-auto mb-8 flex items-center justify-center group-hover:bg-blue-900/10 transition-colors">
                        <Scan className="w-8 h-8 text-[#4169E1]" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3">Live Document Scan</h2>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                        Place your driving license within the frame. We'll automatically scan the front and back for validation.
                    </p>
                    <div className="space-y-4">
                        <Button className="w-full bg-[#1A1A1A] border border-white/10 hover:bg-white text-white hover:text-black uppercase tracking-widest text-[10px] font-bold h-12">
                            <Scan className="w-4 h-4 mr-2" /> Start Scan
                        </Button>
                        <div className="flex items-center gap-4 opacity-50">
                            <div className="h-px bg-white/20 flex-1" />
                            <span className="text-[10px] uppercase font-bold text-gray-500">OR</span>
                            <div className="h-px bg-white/20 flex-1" />
                        </div>
                        <button className="text-xs text-gray-500 hover:text-white underline decoration-dotted">Upload PDF / JPG</button>
                    </div>
                </div>

            </div>

            {/* FOOTER ACTION */}
            <div className="container mx-auto px-6 max-w-2xl text-center">

                <div className="flex justify-center items-center gap-8 mb-12 text-[10px] text-gray-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <LockIcon className="w-3 h-3 text-gray-400" /> 256-bit SSL Encryption
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 text-gray-400" /> GDPR Compliant
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-8">
                    <button className="text-xs text-gray-500 hover:text-white font-bold uppercase tracking-widest">Back to Payment</button>
                    <Button className="bg-white text-black hover:bg-luxe-gold h-14 px-8 uppercase tracking-widest text-xs font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        Complete Verification <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>

            </div>

        </div>
    )
}
