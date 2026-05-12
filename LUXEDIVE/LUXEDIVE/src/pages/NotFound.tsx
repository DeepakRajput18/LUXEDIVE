import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Instagram, Twitter } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2583&auto=format&fit=crop"
                    className="w-full h-full object-cover opacity-30 blur-sm"
                    alt="Luxury Car Tail Light"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 tracking-wide">
                    404 — You've taken an unexpected turn.
                </h1>
                <p className="text-luxe-gray max-w-lg mx-auto mb-12 text-lg font-light leading-relaxed">
                    The destination you seek is not on our map. Let us guide you back to the collection.
                </p>

                <Link to="/fleet">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-10 py-6 text-sm tracking-[0.2em] uppercase font-medium">
                        Return to Collection
                    </Button>
                </Link>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 right-0 z-10 py-8 text-center border-t border-white/10 mx-8">
                <div className="flex justify-center gap-8 text-luxe-gray mb-6">
                    <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                    <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                </div>
                <p className="text-[10px] text-luxe-gray uppercase tracking-widest font-medium">
                    © 2024 LUXEDIVE. DRIVEN BY EXCELLENCE.
                </p>
            </footer>
        </div>
    )
}
