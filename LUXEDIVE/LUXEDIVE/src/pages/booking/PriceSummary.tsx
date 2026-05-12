import { Button } from '../../components/ui/Button'
import { Lock as LockIcon, Shield, Phone, ChevronDown, CheckCircle, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Page 43: Financial Price Summary
export default function PriceSummary() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER */}
            <div className="container mx-auto px-6 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif text-white mb-2">Final Price Summary</h1>
                    <p className="text-gray-400 font-light text-lg">Review your luxury booking details and applicable taxes</p>
                </div>
                <div className="flex items-center gap-2 text-[#4169E1] bg-blue-900/10 px-4 py-2 rounded-full border border-blue-500/20">
                    <LockIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl space-y-8">

                {/* PRICE BREAKDOWN CARD */}
                <div className="bg-[#1A1F2E] border border-white/5 rounded-2xl p-8 shadow-2xl">

                    {/* Line Items */}
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-300">Base Rental Price <span className="text-gray-500">(Lamborghini Huracán Evo - 2 Days)</span></span>
                            <span className="text-white font-mono">₹4,50,000</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-300">Concierge Delivery Fee <span className="text-gray-500">(Private Airport)</span></span>
                            <span className="text-white font-mono">₹5,000</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-300">Total Add-ons <span className="text-gray-500">(Premium Insurance + Carbon Offset)</span></span>
                            <span className="text-white font-mono">₹12,500</span>
                        </div>
                    </div>

                    <div className="h-px bg-white/10 mb-8" />

                    {/* Taxes */}
                    <div className="space-y-2 mb-8">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 italic">CGST (9%)</span>
                            <span className="text-gray-500 italic font-mono">₹41,175</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 italic">SGST (9%)</span>
                            <span className="text-gray-500 italic font-mono">₹41,175</span>
                        </div>
                    </div>

                    {/* Total Payment Card */}
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Total Amount Payable</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-serif text-white font-bold">₹6,49,850</span>
                                <span className="text-xs text-gray-500">incl. taxes</span>
                            </div>
                        </div>
                        <Button onClick={() => navigate('/payment')} className="bg-white text-black hover:bg-luxe-gold h-14 uppercase tracking-widest text-xs font-bold px-8 shadow-lg shadow-white/5">
                            Proceed to Payment <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* SECURITY DEPOSIT CARD */}
                <div className="bg-blue-900/10 border border-blue-500/20 rounded-2xl p-6 flex items-start gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-full text-[#4169E1] shrink-0">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">Refundable Security Deposit</h3>
                        <p className="text-sm text-blue-200 mb-0">Processed within 48 hours of inspection. Held via pre-authorization.</p>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-mono text-gray-400 font-bold">₹1,00,000</span>
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">Hold Amount Only</p>
                    </div>
                </div>

                {/* COLLAPSIBLE SECTIONS */}
                <div className="space-y-4">
                    <div className="border border-white/5 rounded-xl p-4 bg-[#121212] cursor-pointer hover:bg-white/5 transition-colors group">
                        <div className="flex justify-between items-center mb-0 group-hover:mb-2 transition-all">
                            <span className="text-sm font-bold text-white uppercase tracking-widest">Terms & Conditions</span>
                            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform" />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed hidden group-hover:block animate-in fade-in slide-in-from-top-1">
                            Detailed rental agreement including mileage limits, fuel policy (full-to-full), and designated driver requirements apply. LUXEDIVE reserves the right to verify credentials at the time of delivery.
                        </p>
                    </div>

                    <div className="border border-white/5 rounded-xl p-4 bg-[#121212] cursor-pointer hover:bg-white/5 transition-colors group">
                        <div className="flex justify-between items-center mb-0 group-hover:mb-2 transition-all">
                            <span className="text-sm font-bold text-white uppercase tracking-widest">Cancellation & Modification Policy</span>
                            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform" />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed hidden group-hover:block animate-in fade-in slide-in-from-top-1">
                            Cancellations made 72 hours prior to the booking start time are eligible for a full refund. 50% charge applies for cancellations within 24-72 hours. No refunds for late cancellations.
                        </p>
                    </div>
                </div>

                {/* FOOTER BADGES */}
                <div className="flex justify-center gap-8 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                        <Shield className="w-4 h-4 text-gray-400" /> PCI-DSS COMPLIANT
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                        <LockIcon className="w-4 h-4 text-gray-400" /> SECURE GATEWAY
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                        <Phone className="w-4 h-4 text-gray-400" /> 24/7 CONCIERGE
                    </div>
                </div>
                <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest mt-4">© 2024 LUXEDIVE INTERNATIONAL. ALL RIGHTS RESERVED.</p>

            </div>
        </div>
    )
}
