import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    MapPin,
    Clock,
    AlertTriangle,
    FileText,
    ChevronRight,
    Filter,
    CheckCircle2,
    Download
} from 'lucide-react';

interface Fine {
    id: string;
    type: 'Traffic Violation' | 'Toll Charge' | 'Parking Fine';
    amount: number;
    date: string;
    location: string;
    vehicle: string;
    status: 'Pending' | 'Paid' | 'Disputed';
    violationId: string;
}

const FinesTracker: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    const fines: Fine[] = [
        {
            id: '1',
            type: 'Toll Charge',
            amount: 450,
            date: 'Nov 25, 2024 • 14:30',
            location: 'Vadodara - Ahmedabad Expressway',
            vehicle: 'Porsche 911 GT3 RS',
            status: 'Pending',
            violationId: 'TOL-8829-X'
        },
        {
            id: '2',
            type: 'Traffic Violation',
            amount: 2500,
            date: 'Oct 12, 2024 • 11:20',
            location: 'S.G. Highway',
            vehicle: 'Lamborghini Urus',
            status: 'Paid',
            violationId: 'VIO-9921-A'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-black">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <h1 className="font-bold text-lg">Fines & Tolls</h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Summary Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Outstanding Balance</h2>
                        <p className="text-4xl font-mono font-bold">₹450</p>
                        <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Pay by Dec 01 to avoid late fees
                        </p>
                    </div>
                    <button className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                        Pay Outstanding
                    </button>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {fines.map((fine) => (
                        <div key={fine.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${fine.type === 'Toll Charge' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-lg">{fine.type}</h3>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${fine.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                                                    fine.status === 'Paid' ? 'bg-green-50 text-green-600 border-green-100' :
                                                        'bg-gray-50 text-gray-500 border-gray-200'
                                                }`}>
                                                {fine.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                            <MapPin className="w-3 h-3" /> {fine.location}
                                        </p>
                                        <p className="text-xs text-gray-400 flex items-center gap-2">
                                            <Clock className="w-3 h-3" /> {fine.date} • {fine.vehicle}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 md:min-w-[140px]">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest text-right">Amount</p>
                                        <p className="text-xl font-mono font-bold text-right">₹{fine.amount}</p>
                                    </div>

                                    {fine.status === 'Pending' ? (
                                        <button className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:text-blue-800 flex items-center gap-1">
                                            View Details <ChevronRight className="w-3 h-3" />
                                        </button>
                                    ) : (
                                        <button className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-black flex items-center gap-1">
                                            <Download className="w-3 h-3" /> Receipt
                                        </button>
                                    )}
                                </div>

                            </div>

                            {/* Disputed Note */}
                            {fine.status === 'Disputed' && (
                                <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-orange-600 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" />
                                    Dispute in progress. Next update expected in 24 hours.
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default FinesTracker;
