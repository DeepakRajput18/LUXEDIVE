import { Button } from '../../components/ui/Button'
import { FileText, Download, Wallet, CreditCard, Search, ArrowLeft, ArrowRight, AlertCircle, Clock, ExternalLink, CheckCircle, Receipt } from 'lucide-react'

// Page 44: Fines & Tolls Tracker
export default function FinesTollsTracker() {
    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* LEFT SIDEBAR */}
                <div className="hidden lg:block space-y-6">
                    <div className="flex items-center gap-3 mb-8 px-2">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-luxe-gold font-serif">AP</div>
                        <div>
                            <p className="text-sm font-bold text-white">Alexander Pierce</p>
                            <p className="text-[10px] text-luxe-gold uppercase tracking-widest">Platinum Member</p>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="px-4 py-3 text-sm text-gray-400 hover:text-white cursor-pointer rounded-lg hover:bg-white/5 transition-colors font-medium">Dashboard</div>
                        <div className="px-4 py-3 text-sm text-gray-400 hover:text-white cursor-pointer rounded-lg hover:bg-white/5 transition-colors font-medium">Rentals</div>

                        <p className="px-4 pt-6 pb-2 text-[10px] text-gray-600 uppercase tracking-widest font-bold">Finance</p>
                        <div className="px-4 py-3 text-sm text-gray-400 hover:text-white cursor-pointer rounded-lg hover:bg-white/5 transition-colors font-medium">Wallet</div>
                        <div className="px-4 py-3 text-sm text-white bg-blue-900/10 border border-blue-500/20 rounded-lg cursor-pointer font-bold">Fines & Tolls</div>

                        <p className="px-4 pt-6 pb-2 text-[10px] text-gray-600 uppercase tracking-widest font-bold">Account</p>
                        <div className="px-4 py-3 text-sm text-gray-400 hover:text-white cursor-pointer rounded-lg hover:bg-white/5 transition-colors font-medium">Legal</div>
                        <div className="px-4 py-3 text-sm text-gray-400 hover:text-white cursor-pointer rounded-lg hover:bg-white/5 transition-colors font-medium">Settings</div>
                    </div>

                    <div className="px-4 pt-20">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                            Need Concierge?
                        </div>
                        <p className="text-xs text-gray-400 mb-6">24/7 Premium Support</p>
                        <p className="text-xs text-gray-600 cursor-pointer hover:text-white">Log Out</p>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="lg:col-span-3">

                    {/* HEADER */}
                    <div className="mb-8">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">
                            Wallet <span className="mx-2">/</span> Management
                        </p>
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h1 className="text-3xl font-serif text-white mb-2">Fine & Toll Management</h1>
                                <p className="text-gray-400 font-light max-w-2xl text-sm">
                                    Manage and settle outstanding traffic violations and automated toll charges incurred during your rental periods.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-10 px-4">
                                    <Clock className="w-4 h-4 mr-2" /> History
                                </Button>
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold h-10 px-4">
                                    <Download className="w-4 h-4 mr-2" /> Export
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* SUMMARY CARD */}
                    <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                                <Receipt className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Total Unpaid Fines</p>
                                <p className="text-4xl font-serif text-white">₹35,000.00</p>
                            </div>
                        </div>
                        <div className="bg-red-900/20 text-red-500 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-red-500/20">
                            +2 New since last login
                        </div>
                    </div>

                    {/* FILTER SEARCH */}
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by Rental ID or Location..."
                                className="w-full bg-[#121212] border border-white/10 rounded-xl h-12 pl-12 pr-4 text-white text-sm focus:border-[#4169E1] outline-none placeholder:text-gray-600"
                            />
                        </div>
                        <div className="w-48">
                            <select className="w-full bg-[#121212] border border-white/10 rounded-xl h-12 px-4 text-white text-sm focus:border-[#4169E1] outline-none appearance-none cursor-pointer">
                                <option>All Types</option>
                                <option>Traffic Fine</option>
                                <option>Toll</option>
                                <option>Parking</option>
                            </select>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-[#1A1A1A] border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Date</th>
                                    <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Rental ID</th>
                                    <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Type</th>
                                    <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Location</th>
                                    <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Amount</th>
                                    <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-sm text-white font-bold">Oct 24, 2023</td>
                                    <td className="px-6 py-4 text-xs text-gray-500 font-mono">#LX-9921</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-red-900/20 text-red-400 border border-red-500/20 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest">Traffic Fine</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">Ahmedabad, GJ - SG Highway</td>
                                    <td className="px-6 py-4 text-sm font-bold text-white">₹20,000.00</td>
                                    <td className="px-6 py-4 flex gap-3 justify-end items-center">
                                        <a href="#" className="text-[10px] text-[#4169E1] uppercase font-bold hover:text-white flex items-center gap-1">
                                            View Evidence <ExternalLink className="w-3 h-3" />
                                        </a>
                                        <Button className="bg-white text-black hover:bg-luxe-gold h-8 text-[10px] font-bold uppercase px-4">Pay Now</Button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-sm text-white font-bold">Oct 22, 2023</td>
                                    <td className="px-6 py-4 text-xs text-gray-500 font-mono">#LX-9921</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-900/20 text-blue-300 border border-blue-500/20 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest">Toll - NH-48</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">NH-48 Toll Gate - Exit 4</td>
                                    <td className="px-6 py-4 text-sm font-bold text-white">₹1,200.00</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center justify-end gap-1">
                                            <CheckCircle className="w-3 h-3" /> Paid
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-sm text-white font-bold">Sep 10, 2023</td>
                                    <td className="px-6 py-4 text-xs text-gray-500 font-mono">#LX-8812</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-orange-900/20 text-orange-400 border border-orange-500/20 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest">Parking</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">Corporate Road - Zone 4</td>
                                    <td className="px-6 py-4 text-sm font-bold text-white">₹10,500.00</td>
                                    <td className="px-6 py-4 flex gap-3 justify-end items-center">
                                        <a href="#" className="text-[10px] text-[#4169E1] uppercase font-bold hover:text-white flex items-center gap-1">
                                            View Evidence <ExternalLink className="w-3 h-3" />
                                        </a>
                                        <Button className="bg-white text-black hover:bg-luxe-gold h-8 text-[10px] font-bold uppercase px-4">Pay Now</Button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-sm text-white font-bold">Sep 05, 2023</td>
                                    <td className="px-6 py-4 text-xs text-gray-500 font-mono">#LX-8812</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-900/20 text-blue-300 border border-blue-500/20 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest">Toll - Bridge</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300">SG Highway Bridge</td>
                                    <td className="px-6 py-4 text-sm font-bold text-white">₹4,000.00</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center justify-end gap-1">
                                            <CheckCircle className="w-3 h-3" /> Paid
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}
