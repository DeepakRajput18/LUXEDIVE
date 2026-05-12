import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Shield, Lock as LockIcon, Download, Mail, Phone, Handshake, AlertTriangle, CheckCircle } from 'lucide-react'

// Page 51: Privacy & Data Portal
export default function PrivacyDataPortal() {
    const [emailToggle, setEmailToggle] = useState(true)
    const [smsToggle, setSmsToggle] = useState(false)
    const [partnerToggle, setPartnerToggle] = useState(true)

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER NAV (Mock) */}
            <div className="fixed top-0 left-0 right-0 h-20 bg-luxe-black/90 backdrop-blur-md z-50 border-b border-white/5 flex items-center justify-between px-6">
                <div className="text-xl font-serif text-white tracking-widest">LUXEDIVE</div>
                <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <a href="#" className="hover:text-white">Fleet</a>
                    <a href="#" className="hover:text-white">Concierge</a>
                    <a href="#" className="text-white relative">
                        Account
                        <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-luxe-gold" />
                    </a>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 text-[10px] uppercase font-bold tracking-widest bg-emerald-900/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                    <LockIcon className="w-3 h-3" /> Secure Connection
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl">

                {/* HEADER */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-900/20 text-[#4169E1] px-4 py-1.5 rounded-full border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <Shield className="w-3 h-3" /> Security Center
                    </div>
                    <h1 className="text-4xl font-serif text-white mb-4">Privacy & Data Portal</h1>
                    <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto">
                        Manage your personal data, export archives, and control your communication preferences securely.
                    </p>
                </div>

                <div className="space-y-6">

                    {/* SECTION 1: DATA PORTABILITY */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 flex items-center justify-between group hover:border-blue-500/20 transition-all">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-blue-900/20 rounded-lg flex items-center justify-center text-[#4169E1]">
                                    <Download className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Download My Data</h2>
                            </div>
                            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
                                Request a secure ZIP archive containing your rental history, invoices, and profile information. The file will be encrypted and sent to your registered email.
                            </p>
                        </div>
                        <Button className="bg-[#1A1A1A] text-white border border-white/10 hover:bg-white/5 h-12 px-6 uppercase tracking-widest text-[10px] font-bold">
                            Request Archive <span className="ml-2">→</span>
                        </Button>
                    </div>

                    {/* SECTION 2: MARKETING PREFERENCES */}
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-6 right-6 flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                            <CheckCircle className="w-3 h-3" /> Preferences Saved
                        </div>

                        <h2 className="text-xl font-bold text-white mb-6">Communication Preferences</h2>

                        <div className="space-y-6">
                            {/* Email Toggle */}
                            <div className="flex items-center justify-between p-4 bg-[#121212] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">Email Newsletter</h3>
                                        <p className="text-xs text-gray-500">Receive exclusive offers on new fleet additions.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setEmailToggle(!emailToggle)}
                                    className={`w-12 h-7 rounded-full transition-colors relative ${emailToggle ? 'bg-[#4169E1]' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${emailToggle ? 'translate-x-5' : ''}`} />
                                </button>
                            </div>

                            {/* SMS Toggle */}
                            <div className="flex items-center justify-between p-4 bg-[#121212] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">SMS Notifications</h3>
                                        <p className="text-xs text-gray-500">Get real-time updates about your active rentals.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSmsToggle(!smsToggle)}
                                    className={`w-12 h-7 rounded-full transition-colors relative ${smsToggle ? 'bg-[#4169E1]' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${smsToggle ? 'translate-x-5' : ''}`} />
                                </button>
                            </div>

                            {/* Partner Toggle */}
                            <div className="flex items-center justify-between p-4 bg-[#121212] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                                        <Handshake className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">Partner Promotions</h3>
                                        <p className="text-xs text-gray-500">Offers from our luxury hotel and airline partners.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setPartnerToggle(!partnerToggle)}
                                    className={`w-12 h-7 rounded-full transition-colors relative ${partnerToggle ? 'bg-[#4169E1]' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${partnerToggle ? 'translate-x-5' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: RIGHT TO BE FORGOTTEN */}
                    <div className="bg-red-900/5 border border-red-500/20 rounded-2xl p-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-red-900/20 rounded-lg flex items-center justify-center text-red-500">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Account Deletion Request</h2>
                            </div>
                            <p className="text-sm text-gray-400 max-w-lg leading-relaxed">
                                Permanently remove your account and all associated data from LUXEDIVE servers. This action cannot be undone and you will lose your status tier.
                            </p>
                        </div>
                        <Button className="border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white h-12 px-6 uppercase tracking-widest text-[10px] font-bold bg-transparent">
                            Delete Account
                        </Button>
                    </div>
                </div>

                {/* FOOTER NAV IN PAGE */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-8 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> GDPR Compliant
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 256-bit Encryption
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Data Sovereignty
                    </div>
                </div>

            </div>
        </div>
    )
}
