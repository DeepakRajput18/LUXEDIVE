import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Download, Wallet, CreditCard, Search, ArrowLeft, ArrowRight, AlertCircle, FileText } from 'lucide-react'

// Page 42: Financial Archive
export default function FinancialArchive() {
    const [year, setYear] = useState('2023')
    const [type, setType] = useState('All Documents')

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER */}
            <div className="container mx-auto px-6 mb-8">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">
                    Home <span className="mx-2">/</span> Financials <span className="mx-2">/</span> Archive
                </p>
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-serif text-white mb-2">Financial Archive</h1>
                        <p className="text-gray-400 font-light max-w-2xl leading-relaxed">
                            Secure repository for all rental transactions, invoices, and financial documents. Download official records for tax and accounting purposes.
                        </p>
                    </div>
                    <Button className="bg-[#4169E1] text-white hover:bg-blue-600 uppercase tracking-widest text-[10px] font-bold h-10 px-6 shadow-lg shadow-blue-900/20">
                        <Download className="w-4 h-4 mr-2" /> Export All Records
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl">

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-900/20 rounded-full blur-2xl group-hover:bg-blue-900/30 transition-colors" />
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-900/20 rounded-lg text-[#4169E1]"><CreditCard className="w-5 h-5" /></div>
                            <span className="text-2xl font-serif text-white font-bold">₹35,00,000.00</span>
                        </div>
                        <p className="text-xs text-blue-200 uppercase tracking-widest">Total Spend</p>
                    </div>

                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-900/20 rounded-full blur-2xl group-hover:bg-emerald-900/30 transition-colors" />
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-emerald-900/20 rounded-lg text-emerald-500"><Wallet className="w-5 h-5" /></div>
                            <span className="text-2xl font-serif text-white font-bold">₹4,00,000.00</span>
                        </div>
                        <p className="text-xs text-emerald-200 uppercase tracking-widest">Active Deposits</p>
                    </div>

                    <div className="bg-[#121212] border border-red-500/20 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-900/20 rounded-full blur-2xl group-hover:bg-red-900/30 transition-colors" />
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-red-900/20 rounded-lg text-red-500"><AlertCircle className="w-5 h-5" /></div>
                            <span className="text-2xl font-serif text-white font-bold">₹12,000.00</span>
                        </div>
                        <p className="text-xs text-red-200 uppercase tracking-widest">Outstanding Fines</p>
                    </div>
                </div>

                {/* FILTERS */}
                <div className="flex flex-wrap gap-4 items-center mb-6 bg-[#121212] p-4 rounded-xl border border-white/5">
                    <div className="w-32">
                        <select
                            value={year} onChange={(e) => setYear(e.target.value)}
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-10 px-3 text-white text-xs uppercase font-bold focus:border-[#4169E1] outline-none"
                        >
                            <option>2023</option>
                            <option>2022</option>
                        </select>
                    </div>
                    <div className="w-48">
                        <select
                            value={type} onChange={(e) => setType(e.target.value)}
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-10 px-3 text-white text-xs uppercase font-bold focus:border-[#4169E1] outline-none"
                        >
                            <option>All Documents</option>
                            <option>Invoices</option>
                            <option>Deposits</option>
                            <option>Fines</option>
                        </select>
                    </div>
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search invoices..."
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-10 pl-10 pr-4 text-white text-sm focus:border-[#4169E1] outline-none placeholder:text-gray-600"
                        />
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#1A1A1A] border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Date</th>
                                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Document Type</th>
                                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Car Model</th>
                                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Amount</th>
                                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold text-right">Download</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { date: 'Oct 24, 2023', id: '#INV-2023-001', type: 'Rental Invoice', typeColor: 'blue', car: 'Porsche 911 GT3', amount: '₹2,75,000.00' },
                                { date: 'Oct 20, 2023', id: '#DEP-2023-089', type: 'Security Deposit', typeColor: 'emerald', car: 'Porsche 911 GT3', amount: '₹4,00,000.00' },
                                { date: 'Sep 12, 2023', id: '#FNE-2023-012', type: 'Traffic Fine', typeColor: 'red', car: 'Lamborghini Urus', amount: '₹12,000.00' },
                                { date: 'Aug 05, 2023', id: '#INV-2023-088', type: 'Rental Invoice', typeColor: 'blue', car: 'Ferrari F8', amount: '₹3,40,000.00' },
                                { date: 'Aug 01, 2023', id: '#DEP-2023-042', type: 'Security Deposit', typeColor: 'emerald', car: 'Ferrari F8', amount: '₹4,00,000.00' },
                            ].map((item, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="text-white text-sm font-bold">{item.date}</div>
                                        <div className="text-[10px] text-gray-500 font-mono mt-0.5">{item.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`
                                        inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest border
                                        ${item.typeColor === 'blue' ? 'bg-blue-900/20 text-blue-300 border-blue-500/20' : ''}
                                        ${item.typeColor === 'emerald' ? 'bg-emerald-900/20 text-emerald-300 border-emerald-500/20' : ''}
                                        ${item.typeColor === 'red' ? 'bg-red-900/20 text-red-300 border-red-500/20' : ''}
                                    `}>
                                            <FileText className="w-3 h-3" /> {item.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300 flex items-center gap-3">
                                        <div className="w-10 h-6 bg-gray-800 rounded overflow-hidden">
                                            <img src={`https://images.unsplash.com/photo-1503376763036-066120622c74?q=80`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        {item.car}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono text-white">{item.amount}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-500 hover:text-white transition-colors">
                                            <Download className="w-4 h-4 ml-auto" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* PAGINATION */}
                    <div className="bg-[#1A1A1A] px-6 py-4 border-t border-white/5 flex items-center justify-between">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Showing 1 to 5 of 24 results</p>
                        <div className="flex gap-2">
                            <Button variant="outline" className="border-white/10 text-gray-400 hover:text-white hover:bg-white/5 h-8 w-8 p-0">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" className="border-white/10 text-gray-400 hover:text-white hover:bg-white/5 h-8 w-8 p-0">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
