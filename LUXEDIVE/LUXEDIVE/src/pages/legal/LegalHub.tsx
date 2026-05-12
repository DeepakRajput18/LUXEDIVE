import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import {
    Shield,
    FileText,
    Lock as LockIcon,
    Cookie,
    Download,
    ChevronRight,
    CheckCircle,
    HelpCircle,
    Printer
} from 'lucide-react';

const LegalHub: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'terms' | 'rental' | 'privacy' | 'cookie'>('terms');
    const [acceptedTerms, setAcceptedTerms] = useState<Record<string, boolean>>({});

    const toggleAccept = (termId: string) => {
        setAcceptedTerms(prev => ({ ...prev, [termId]: !prev[termId] }));
    };

    const menuItems = [
        { id: 'terms', label: 'Terms of Service', icon: FileText },
        { id: 'rental', label: 'Rental Agreement', icon: Shield },
        { id: 'privacy', label: 'Privacy Policy', icon: LockIcon },
        { id: 'cookie', label: 'Cookie Policy', icon: Cookie },
    ];

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-20">

            {/* Header */}
            <div className="bg-black text-white pt-32 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 uppercase tracking-wider">
                        <span>Home</span> <ChevronRight className="w-3 h-3" /> <span>Legal</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Legal & Privacy Hub</h1>
                    <p className="text-gray-400 max-w-2xl text-lg font-light">
                        Transparency is the foundation of trust. Access all our legal documents, user agreements, and privacy commitments in one centralized secure repository.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-xl p-4 sticky top-24 shadow-sm border border-gray-100">
                        <nav className="space-y-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id as any)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === item.id
                                        ? 'bg-black text-white shadow-md'
                                        : 'text-gray-600 hover:bg-white hover:text-black hover:shadow-sm'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-8 pt-8 border-t border-gray-200 px-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-50 p-2 rounded-full text-blue-600 mt-1">
                                    <HelpCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900 uppercase mb-1">Need Legal Assistance?</p>
                                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                                        Our legal compliance team is available to clarify any clauses or terms.
                                    </p>
                                    <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-800 underline">Contact Legal Support</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 bg-white border border-gray-100 rounded-xl shadow-sm p-8 md:p-12 min-h-[600px]">

                    {/* Header for Content */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100 mb-8">
                        <div>
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
                                Effective Date: Oct 01, 2023
                            </span>
                            <h2 className="text-3xl font-serif font-medium">
                                {menuItems.find(m => m.id === activeTab)?.label}
                            </h2>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                <Printer className="w-4 h-4" /> Print
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                                <Download className="w-4 h-4" /> Download PDF
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Content */}
                    <div className="prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:text-black prose-a:text-blue-600 prose-li:marker:text-black">

                        {activeTab === 'terms' && (
                            <>
                                <h3>1. Introduction</h3>
                                <p>
                                    Welcome to LUXEDIVE. By accessing our platform, booking a vehicle, or using our concierge services, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you ("Refined Member") and LUXEDIVE Rentals Pvt Ltd.
                                </p>

                                <h3>2. User Eligibility</h3>
                                <p>To access our fleet, you must meet the following strict criteria:</p>
                                <ul>
                                    <li>Be at least 25 years of age.</li>
                                    <li>Possess a valid, government-issued driver's license held for a minimum of 3 years.</li>
                                    <li>Maintain a verified payment method with sufficient credit authorization.</li>
                                    <li>Have no history of major traffic violations or DUI convictions.</li>
                                </ul>

                                <h3>3. Booking & Cancellation</h3>
                                <p>
                                    Reservations are confirmed only upon receipt of the security deposit. Cancellations made less than 48 hours prior to the reservation start time will incur a fee equivalent to 50% of the total rental value.
                                </p>

                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 not-prose mt-8">
                                    <h4 className="font-bold text-black mb-4 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-black" /> Make it Official
                                    </h4>
                                    <div className="space-y-3">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${acceptedTerms['tos_1'] ? 'bg-black border-black' : 'border-gray-300 bg-white'}`}>
                                                {acceptedTerms['tos_1'] && <CheckCircle className="w-3 h-3 text-white" />}
                                            </div>
                                            <input type="checkbox" className="hidden" onChange={() => toggleAccept('tos_1')} />
                                            <span className="text-sm">I certify that I meet all eligibility requirements listed in Section 2.</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${acceptedTerms['tos_2'] ? 'bg-black border-black' : 'border-gray-300 bg-white'}`}>
                                                {acceptedTerms['tos_2'] && <CheckCircle className="w-3 h-3 text-white" />}
                                            </div>
                                            <input type="checkbox" className="hidden" onChange={() => toggleAccept('tos_2')} />
                                            <span className="text-sm">I agree to the strict non-smoking and no-pet policy enforced across the fleet.</span>
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'rental' && (
                            <>
                                <h3>1. Vehicle Condition & Usage</h3>
                                <p>
                                    Every LUXEDIVE vehicle is a masterpiece of engineering. You agree to treat the vehicle with the utmost care and respect. Off-roading, track usage (without explicit written consent), and towing are strictly prohibited.
                                </p>
                                <p>
                                    The vehicle is delivered with a full tank of premium fuel and must be returned in the same condition. Refueling charges plus a service fee will apply if returned with less fuel.
                                </p>

                                <h3>2. Liability & Insurance</h3>
                                <p>
                                    Comprehensive insurance is included with a deductible of ₹50,000. You are liable for any damage up to the deductible amount. Damage caused by negligence, influence of alcohol, or violation of terms voids all insurance coverage, making you liable for the full value of the vehicle and loss of use.
                                </p>

                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 not-prose mt-8">
                                    <h4 className="font-bold text-black mb-4 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-black" /> Liability Acknowledgement
                                    </h4>
                                    <div className="space-y-3">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${acceptedTerms['ra_1'] ? 'bg-black border-black' : 'border-gray-300 bg-white'}`}>
                                                {acceptedTerms['ra_1'] && <CheckCircle className="w-3 h-3 text-white" />}
                                            </div>
                                            <input type="checkbox" className="hidden" onChange={() => toggleAccept('ra_1')} />
                                            <span className="text-sm">I acknowledge the ₹50,000 deductible policy.</span>
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'privacy' && (
                            <>
                                <h3>1. Information Collection</h3>
                                <p>
                                    We collect personal information necessary to provide our premium services, including identity verification documents, driving history, payment details, and location data during active rentals for vehicle security.
                                </p>

                                <h3>2. Data Sharing</h3>
                                <p>
                                    We do not sell your personal data. Data may be shared with insurance providers, verification partners (for KYC), and law enforcement if legally required.
                                </p>

                                <h3>3. Your Rights</h3>
                                <p>
                                    You have the right to request access to, correction of, or deletion of your personal data. You may export your data at any time via the Privacy Portal.
                                </p>
                            </>
                        )}

                        {activeTab === 'cookie' && (
                            <>
                                <h3>1. Use of Cookies</h3>
                                <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. Functional cookies are essential for booking management.</p>
                                <p>Because we value privacy, we do not use third-party tracking pixels for advertising networks without your explicit consent.</p>
                            </>
                        )}

                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                        <span>Document Version: 2.4.1 (Latest)</span>
                        <span>Last Updated: October 01, 2023</span>
                    </div>

                </div>

            </main>
        </div>
    );
};

export default LegalHub;
