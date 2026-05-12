import { Button } from '../../components/ui/Button'
import { CheckCircle, RotateCcw, Car, ArrowUpRight, CreditCard, Lock as LockIcon, Download, Headset, MessageSquare, Wallet } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Page 60: Refund Tracker
export default function RefundTracker() {
    const location = useLocation();
    const { refundId, amount, method, status: initialStatus } = location.state || {
        refundId: 'R-8392',
        amount: 1250,
        method: 'bank',
        status: 'processing'
    };

    const [status, setStatus] = useState(initialStatus);

    // Simulate instant processing for Credits
    useEffect(() => {
        if (method === 'credits' && status === 'processing') {
            const timer = setTimeout(() => {
                setStatus('completed');
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [method, status]);

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* BREADCRUMB */}
            <div className="container mx-auto px-6 mb-8">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">
                    Wallet <span className="mx-2">/</span> History <span className="mx-2">/</span> Refund #{refundId}
                </p>
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN (2/3) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* REFUND IN PROGRESS CARD */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className={`flex items-center gap-2 mb-2 ${status === 'processing' ? 'animate-pulse' : ''}`}>
                                    <RotateCcw className="w-4 h-4 text-[#4169E1]" />
                                    <span className="text-sm font-bold text-[#4169E1] uppercase tracking-widest">
                                        {status === 'processing' ? 'Refund in Progress' : 'Refund Completed'}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-lg max-w-md">Security deposit refund for Lamborghini Huracán Spyder</p>
                            </div>
                            <div className="text-4xl font-serif font-bold text-white">₹{amount.toLocaleString('en-IN')}</div>
                        </div>

                        {/* PROGRESS TIMELINE */}
                        <div className="relative pt-4 pb-12">
                            {/* Line */}
                            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-800" />
                            <div className={`absolute top-6 left-0 h-0.5 bg-[#4169E1] transition-all duration-1000 ${status === 'completed' ? 'w-full' : 'w-3/4'}`} />

                            <div className="grid grid-cols-4 relative z-10">
                                {/* Step 1 */}
                                <div className="text-center">
                                    <div className="w-5 h-5 rounded-full bg-[#4169E1] mx-auto mb-3 flex items-center justify-center border-4 border-[#121212]">
                                        <CheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                    <div className="text-[10px] text-white font-bold uppercase tracking-widest mb-1">Request Received</div>
                                    <div className="text-[10px] text-gray-500">Oct 24</div>
                                </div>

                                {/* Step 2 */}
                                <div className="text-center">
                                    <div className="w-5 h-5 rounded-full bg-[#4169E1] mx-auto mb-3 flex items-center justify-center border-4 border-[#121212]">
                                        <CheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                    <div className="text-[10px] text-white font-bold uppercase tracking-widest mb-1">Inspection Cleared</div>
                                    <div className="text-[10px] text-gray-500">Oct 25</div>
                                </div>

                                {/* Step 3 (Active/Done) */}
                                <div className="text-center">
                                    <div className={`w-5 h-5 rounded-full mx-auto mb-3 flex items-center justify-center border-4 border-[#121212] ${status === 'completed' || status === 'processing' ? 'bg-[#4169E1]' : 'bg-gray-700'}`}>
                                        {status === 'completed' && <CheckCircle className="w-3 h-3 text-white" />}
                                    </div>
                                    <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${status === 'processing' ? 'text-[#4169E1] animate-pulse' : 'text-white'}`}>Processing</div>
                                    <div className="text-[10px] text-gray-500">Today</div>
                                </div>

                                {/* Step 4 (Pending/Done) */}
                                <div className={`text-center transition-all duration-500 ${status === 'completed' ? 'opacity-100' : 'opacity-50'}`}>
                                    <div className={`w-5 h-5 rounded-full mx-auto mb-3 border-4 border-[#121212] flex items-center justify-center ${status === 'completed' ? 'bg-[#4169E1]' : 'bg-gray-700'}`}>
                                        {status === 'completed' && <CheckCircle className="w-3 h-3 text-white" />}
                                    </div>
                                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Credited</div>
                                    <div className="text-[10px] text-gray-500">{status === 'completed' ? 'Just Now' : 'Est. 5 Mins'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM CARDS ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* VEHICLE DETAILS */}
                        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 mb-6">
                                <Car className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Lamborghini Huracán</h3>
                                <p className="text-xs text-gray-400 mb-4">Spyder • 2023 • Matte Grey</p>
                                <Link to="/rental/history" className="text-[#4169E1] text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                                    View Booking <ArrowUpRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                        {/* REFUND DESTINATION */}
                        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 mb-6">
                                {method === 'credits' ? <Wallet className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-lg font-bold text-white">
                                        {method === 'credits' ? 'LuxeDive Wallet' : 'Visa ending in •••• 4242'}
                                    </h3>
                                    <LockIcon className="w-3 h-3 text-emerald-500" />
                                </div>
                                <p className="text-xs text-gray-400 mb-4">
                                    {method === 'credits' ? 'Available Immediately' : 'Expires 09/26 • Verified'}
                                </p>
                                <p className="text-[10px] text-gray-600 font-mono">Transaction ID: tr_849230948</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN (1/3) */}
                <div className="space-y-6">

                    {/* ACTIVITY LOG */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                        <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6 px-2">Activity Log</h2>
                        <div className="space-y-8 pl-2 border-l border-gray-800 ml-2">

                            <div className="relative pl-6">
                                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-[#4169E1] border-2 border-[#121212]" />
                                <div className="text-xs text-white font-bold mb-1">Refund Process Started</div>
                                <div className="text-[10px] text-gray-500">Oct 26, 9:15 AM</div>
                            </div>

                            <div className="relative pl-6">
                                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-gray-600 border-2 border-[#121212]" />
                                <div className="text-xs text-white font-bold mb-1">Inspection Report Filed</div>
                                <div className="text-[10px] text-gray-500 mb-2">Oct 25, 2:30 PM</div>
                                <a href="#" className="flex items-center gap-2 text-[10px] text-[#4169E1] font-bold uppercase tracking-widest hover:text-white">
                                    <Download className="w-3 h-3" /> Download Report
                                </a>
                            </div>

                            <div className="relative pl-6">
                                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-gray-600 border-2 border-[#121212]" />
                                <div className="text-xs text-white font-bold mb-1">Vehicle Returned</div>
                                <div className="text-[10px] text-gray-500 mb-2">Oct 24, 10:00 AM</div>
                                <p className="text-[10px] text-gray-500 italic">"Seamless drop-off at AMD terminal 2 valet."</p>
                            </div>

                        </div>
                    </div>

                    {/* SUPPORT CARD */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 bg-[#4169E1] rounded-full flex items-center justify-center text-white mx-auto mb-4 animate-in fade-in zoom-in duration-500">
                            <Headset className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-serif text-white mb-2">Have questions?</h2>
                        <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                            Our concierge team is available 24/7 to assist with your transaction details.
                        </p>
                        <Button className="w-full bg-[#1A1A1A] border border-white/10 text-white hover:bg-white hover:text-black uppercase tracking-widest text-[10px] font-bold h-10 mb-4">
                            <MessageSquare className="w-3 h-3 mr-2" /> Contact Support
                        </Button>
                        <a href="#" className="text-[10px] text-gray-600 hover:text-white transition-colors underline">Dispute this refund amount</a>
                    </div>

                </div>

            </div>
        </div>
    )
}
