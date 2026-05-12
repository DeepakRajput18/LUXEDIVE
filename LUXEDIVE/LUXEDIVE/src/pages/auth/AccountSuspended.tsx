import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Lock as LockIcon, Mail } from 'lucide-react'

export default function AccountSuspended() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-black/95 flex items-center justify-center p-4 z-50 fixed inset-0 backdrop-blur-md">
            <div className="max-w-xl w-full bg-[#1A1F2E] border border-red-900/40 rounded-lg p-10 text-center relative overflow-hidden shadow-2xl shadow-red-900/20">
                {/* Red accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />

                <div className="w-24 h-24 bg-red-900/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/10">
                    <LockIcon className="w-10 h-10 text-red-500" />
                </div>

                <h1 className="text-3xl font-serif text-white mb-3 uppercase tracking-wider">Account Suspended</h1>
                <p className="text-luxe-gray mb-10 text-sm font-light">Access to booking and fleet services is restricted.</p>

                <div className="bg-black/40 border border-red-500/30 rounded p-6 mb-10 text-left">
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-2">Status Code</p>
                    <p className="font-mono text-white mb-4 text-lg tracking-wide">ERR_VERIFICATION_FAIL_404V</p>
                    <p className="text-sm text-luxe-gray leading-relaxed font-light">
                        Your recent identity verification attempt was flagged by our security automated system.
                        Manual review is required to restore full privileges.
                    </p>
                </div>

                <Button onClick={() => navigate('/concierge')} className="w-full bg-[#4169E1] hover:bg-blue-600 text-white mb-6 h-14 text-sm font-bold uppercase tracking-widest transition-colors">
                    Appeal Suspension <span className="ml-2">→</span>
                </Button>

                <div className="flex justify-center gap-8 text-xs text-luxe-gray uppercase tracking-widest font-medium pt-8 border-t border-white/5">
                    <button onClick={() => navigate('/contact')} className="flex items-center gap-2 hover:text-white transition-colors">
                        <Mail className="w-3 h-3" /> Contact Concierge
                    </button>
                    <button onClick={() => navigate('/legal/terms')} className="hover:text-white transition-colors">
                        Terms of Service
                    </button>
                </div>

                <p className="text-[10px] text-[#4A4F5E] uppercase tracking-[0.2em] font-bold mt-8">
                    © 2024 LUXEDIVE. GLOBAL FLEET SECURITY.
                </p>
            </div>
        </div>
    )
}
