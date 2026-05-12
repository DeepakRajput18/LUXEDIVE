import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { TriangleAlert, Diamond, Wallet, Clock, Sparkles, X } from 'lucide-react'
// import { useAuth } from '../../contexts/AuthContext'

export default function AccountDeletion() {
    const navigate = useNavigate()
    // const { deleteAccount } = useAuth() 

    return (
        <div className="min-h-screen bg-black/90 flex items-center justify-center p-4 z-50 fixed inset-0 backdrop-blur-sm">
            <div className="max-w-2xl w-full bg-[#1A1F2E] border-2 border-[#DC143C] rounded-xl p-8 md:p-10 relative shadow-[0_0_60px_rgba(220,20,60,0.15)]">

                {/* Close Button */}
                <button onClick={() => navigate(-1)} className="absolute top-6 right-6 text-luxe-gray hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                        <TriangleAlert className="w-10 h-10 text-[#DC143C]" />
                    </div>
                    <h1 className="text-3xl font-serif text-white mb-3">Are you sure you want to leave?</h1>
                    <p className="text-luxe-gray max-w-md mx-auto font-light leading-relaxed">
                        Deleting your account is permanent and cannot be undone. You will immediately lose access to the following exclusive benefits:
                    </p>
                </div>

                {/* Loss Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {[
                        { icon: Diamond, title: "PLATINUM TIER", sub: "Current Membership Status" },
                        { icon: Sparkles, title: "24,500 POINTS", sub: "Value: ₹24,500 INR" },
                        { icon: Wallet, title: "₹5,000 BALANCE", sub: "Non-refundable Wallet Credits" },
                        { icon: Clock, title: "5 YEARS HISTORY", sub: "Vehicle Access Logs & Receipts" }
                    ].map((item, i) => (
                        <div key={i} className="bg-black/30 border border-white/5 p-5 rounded-lg flex items-center gap-5 hover:border-red-900/30 transition-colors">
                            <div className="p-3 bg-luxe-gold/5 rounded-md text-luxe-gold border border-luxe-gold/20">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">{item.title}</p>
                                <p className="text-[11px] text-luxe-gray">{item.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="border-[#DC143C] text-[#DC143C] hover:bg-[#DC143C] hover:text-white h-14 text-sm font-bold uppercase tracking-widest transition-all" onClick={() => console.log('Delete')}>
                        <X className="w-4 h-4 mr-2" /> Permanently Delete
                    </Button>
                    <Button className="bg-white text-black hover:bg-gray-200 h-14 text-sm font-bold uppercase tracking-widest transition-all" onClick={() => navigate(-1)}>
                        Keep My Account
                    </Button>
                </div>

                <p className="text-[10px] text-center text-luxe-gray/60 mt-8 font-light italic">
                    By clicking 'Permanently Delete', your data will be scheduled for erasure in accordance with our Privacy Policy.
                </p>
            </div>
        </div>
    )
}
