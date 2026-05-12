import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Download,
    Share2,
    ShieldCheck,
    CheckCircle2,
    Calendar,
    CreditCard,
    MapPin,
    Lock as LockIcon
} from 'lucide-react';

const DepositReceipt: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-black py-12 px-6">

            {/* Header Actions */}
            <div className="max-w-3xl mx-auto flex items-center justify-between mb-8">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">
                        <Download className="w-4 h-4" /> PDF
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">
                        <Share2 className="w-4 h-4" /> Share
                    </button>
                </div>
            </div>

            {/* Receipt Paper */}
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-none relative overflow-hidden">

                {/* Top Border */}
                <div className="h-2 bg-gradient-to-r from-blue-600 to-black" />

                <div className="p-8 md:p-12">

                    {/* Header */}
                    <div className="flex justify-between items-start mb-12 border-b border-gray-100 pb-12">
                        <div>
                            <h1 className="text-2xl font-serif font-bold tracking-widest mb-1">LUXEDIVE</h1>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Premium Fleet Rentals</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-1">Security Deposit Receipt</h2>
                            <p className="text-gray-500 font-mono text-sm">#TXN-8829-DEP</p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex justify-center mb-12">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">₹50,000.00</h3>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Successfully Held
                            </span>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction Date</label>
                            <p className="font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" /> Nov 24, 2024 • 09:42 AM
                            </p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment Method</label>
                            <p className="font-medium flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-gray-400" /> Chase Sapphire •••• 4242
                            </p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vehicle Reference</label>
                            <p className="font-medium">Porsche 911 GT3 RS (GJ-01-LUX-001)</p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Authorized By</label>
                            <p className="font-medium">Rahul Mehta (Primary Driver)</p>
                        </div>

                    </div>

                    {/* Terms Box */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-12">
                        <h4 className="flex items-center gap-2 font-bold text-sm mb-3">
                            <LockIcon className="w-4 h-4 text-gray-400" /> Terms of Release
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">
                            This amount is currently held as a pre-authorization on your card. It will not be charged unless damages fees or fines are incurred. The hold will be automatically released within 24-48 hours after vehicle return and successful inspection.
                        </p>
                        <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            <span>Merchant ID: LXDV-AHM-01</span>
                            <span>Auth Code: 992831</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center border-t border-gray-100 pt-8">
                        <p className="text-sm font-serif font-bold italic text-gray-900 mb-1">Thank you for choosing LUXEDIVE</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">S.G. Highway • Ahmedabad • Gujarat</p>
                    </div>

                </div>

                {/* Bottom Pattern */}
                <div className="h-4 bg-gray-100" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '8px 8px', opacity: 0.1 }} />

            </div>

        </div>
    );
};

export default DepositReceipt;
