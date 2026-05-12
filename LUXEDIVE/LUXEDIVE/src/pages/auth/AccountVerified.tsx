import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Check, Camera, Mail, HelpCircle } from 'lucide-react'

export default function AccountVerified() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A1A1F] to-[#040C11] flex flex-col items-center justify-center p-4 relative overflow-hidden">

            <div className="mb-12 relative group cursor-default">
                <div className="w-24 h-24 rounded-full border border-emerald-500/50 flex items-center justify-center animate-in zoom-in duration-700 bg-emerald-500/10 backdrop-blur-sm z-10 relative">
                    <Check className="w-10 h-10 text-emerald-400" />
                </div>
                {/* Glow effects */}
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse z-0" />
                <div className="absolute -inset-4 border border-emerald-500/10 rounded-full scale-110" />
                <div className="absolute -inset-8 border border-emerald-500/5 rounded-full scale-125" />
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-wide text-center uppercase">
                Your Journey Begins
            </h1>

            <p className="text-luxe-gray max-w-md text-center mb-16 text-lg font-light leading-relaxed">
                Your account is now verified. Welcome to the LUXEDIVE elite community.
            </p>

            <Link to="/fleet">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-12 h-14 text-xs font-bold uppercase tracking-[0.2em] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    Explore Collection →
                </Button>
            </Link>

            <footer className="absolute bottom-10 text-center w-full">
                <p className="text-[10px] text-luxe-gray uppercase tracking-[0.25em] mb-6 opacity-60">
                    © 2024 LUXEDIVE. ALL RIGHTS RESERVED.
                </p>
                <div className="flex justify-center gap-8 text-luxe-gray/40">
                    <Camera className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                    <Mail className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                    <HelpCircle className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                </div>
            </footer>
        </div>
    )
}
