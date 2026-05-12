import { Button } from '../../components/ui/Button'
import { Download, Lock as LockIcon, ShieldCheck, Check } from 'lucide-react'

// Page 32: Deposit Receipt Page
export default function DepositReceipt() {
    return (
        <div className="min-h-screen bg-luxe-black text-white flex items-center justify-center p-6 relative">

            {/* Background Ambient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]" />

            <div className="relative z-10 w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl p-8 shadow-2xl">

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-luxe-gold text-[10px] tracking-[0.2em] uppercase font-bold mb-6">LUXEDIVE SECURE PAYMENTS</p>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/20 border border-blue-500/30 mb-6 text-[#4169E1]">
                        <LockIcon className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl font-serif text-white mb-2">₹50,000.00</h1>
                    <div className="inline-flex items-center gap-1.5 bg-blue-900/20 text-blue-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" /> Funds Held
                    </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Booking Ref</span>
                        <span className="text-sm text-white font-mono">#LX-2023-8849</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Date</span>
                        <span className="text-sm text-white">Oct 24, 2023</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Payment Method</span>
                        <span className="text-sm text-white flex items-center gap-2">
                            <span className="w-6 h-4 bg-gray-700 rounded-sm" /> •••• 4242
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Vehicle Class</span>
                        <span className="text-sm text-luxe-gold">Grand Tourer</span>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-4 mb-8 flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-gray-400 shrink-0" />
                    <p className="text-[10px] text-gray-400 leading-relaxed text-balance">
                        This is a pre-authorization hold. The amount will be released automatically 48 hours after vehicle return, subject to inspection conditions.
                    </p>
                </div>

                {/* Action */}
                <Button className="w-full bg-white text-black hover:bg-luxe-gold h-14 uppercase tracking-widest text-xs font-bold shadow-lg shadow-white/5 mb-6">
                    <Download className="w-4 h-4 mr-2" /> Download PDF Receipt
                </Button>

                {/* Footer */}
                <div className="text-center space-y-4 border-t border-white/5 pt-6">
                    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                        <LockIcon className="w-3 h-3" /> 256-Bit SSL Encrypted
                    </div>
                    <div className="flex justify-center gap-4 text-[10px] text-gray-600">
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Refund</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    </div>
                </div>

            </div>
        </div>
    )
}
