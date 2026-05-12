import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronDown,
    FileText,
    ShieldCheck,
    CreditCard,
    Ban
} from 'lucide-react';

interface RefundStep {
    title: string;
    date: string;
    status: 'completed' | 'current' | 'pending';
    description?: string;
}

const RefundTracker: React.FC = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(2);

    const steps: RefundStep[] = [
        {
            title: 'Vehicle Returned & Inspected',
            date: 'Nov 26, 10:30 AM',
            status: 'completed',
            description: 'Vehicle inspection passed with no new damages reported.'
        },
        {
            title: 'Deposit Release Authorized',
            date: 'Nov 26, 11:15 AM',
            status: 'completed',
            description: 'LUXEDIVE has released the hold on your security deposit.'
        },
        {
            title: 'Processing by Bank',
            date: 'Est. Nov 28',
            status: 'current',
            description: 'Your bank (Chase Sapphire Reserve) is processing the transaction. This typically takes 3-5 business days.'
        },
        {
            title: 'Funds Available',
            date: 'Est. Nov 30',
            status: 'pending',
            description: 'The amount of ₹50,000 will be credited back to your account.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-black">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <h1 className="font-bold text-lg">Refund Status</h1>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reference ID</p>
                        <p className="font-mono text-xs font-bold">RF-9921-XJY</p>
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-12">

                {/* Status Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <Clock className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-bold">Processing Refund</h2>
                            <p className="text-gray-500">Expected by Nov 30, 2024</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl mb-6">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Refund Amount</p>
                            <p className="text-3xl font-bold font-mono">₹50,000</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Original Method</p>
                            <div className="flex items-center justify-end gap-2">
                                <CreditCard className="w-4 h-4 text-gray-600" />
                                <span className="font-bold text-sm">•••• 4242</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative pl-8 space-y-8 before:absolute before:inset-y-2 before:left-3 before:w-0.5 before:bg-gray-100">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Dot */}
                                <div className={`absolute -left-[29px] w-5 h-5 rounded-full border-4 border-white flex items-center justify-center ${step.status === 'completed' ? 'bg-green-500' :
                                        step.status === 'current' ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}>
                                    {step.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-white" />}
                                </div>

                                <div className={`${step.status === 'pending' ? 'opacity-50' : ''}`}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`font-bold ${step.status === 'current' ? 'text-blue-600' : 'text-gray-900'}`}>{step.title}</h4>
                                        <span className="text-xs text-gray-500 font-medium">{step.date}</span>
                                    </div>
                                    {step.description && <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support Section */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-gray-400 mt-1" />
                    <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">Need help with this refund?</h3>
                        <p className="text-sm text-gray-500 mb-4">If you haven't received funds after the estimated date, please contact your bank first using the ARN provided below.</p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">ARN Number</span>
                                <span className="font-mono font-bold text-sm">740566333281</span>
                            </div>
                            <button onClick={() => navigate('/support')} className="px-6 py-3 bg-white border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RefundTracker;
