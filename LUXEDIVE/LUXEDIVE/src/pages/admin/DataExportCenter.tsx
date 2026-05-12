import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Download, FileSpreadsheet, FileText, Calendar, CheckSquare, ArrowRight, Table } from 'lucide-react'

export default function DataExportCenter() {
    const [format, setFormat] = useState('csv')

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-20 pb-20">

            <div className="container mx-auto px-6 mb-12">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">
                    Home / Reports / Export
                </div>
                <h1 className="text-3xl font-serif text-white mb-2">Data Export Center</h1>
                <p className="text-gray-400 font-light text-sm max-w-xl">Generate comprehensive reports from booking history, financial records, and fleet analytics.</p>
            </div>

            <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: CONFIGURATION */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Section 1: Time Period */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-serif text-luxe-gold">01</span>
                            Select Time Period
                        </h3>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Start Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input type="date" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white text-sm focus:border-luxe-gold outline-none uppercase tracking-wide" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">End Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input type="date" className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white text-sm focus:border-luxe-gold outline-none uppercase tracking-wide" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Data Fields */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-serif text-luxe-gold">02</span>
                                Select Data Fields
                            </h3>
                            <button className="text-[10px] text-[#4169E1] hover:text-white uppercase tracking-widest font-bold">Select All</button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {['Booking Date', 'Customer Name', 'Vehicle Details', 'Total Amount', 'Invoice Number', 'Duration', 'Extras/Add-ons', 'Payment Method'].map(field => (
                                <label key={field} className="flex items-center gap-3 p-4 bg-[#0A0A0A] border border-white/5 rounded-xl cursor-pointer hover:border-white/20 transition-colors group">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" className="peer w-5 h-5 rounded border-2 border-gray-600 bg-transparent text-[#4169E1] focus:ring-0 checked:border-[#4169E1]" />
                                    </div>
                                    <span className="text-sm text-gray-300 font-medium group-hover:text-white">{field}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Format */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-serif text-luxe-gold">03</span>
                            Export Format
                        </h3>

                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { id: 'csv', label: 'CSV', icon: Table, desc: 'Raw data for analysis' },
                                { id: 'xlsx', label: 'Excel', icon: FileSpreadsheet, desc: 'Formatted spreadsheet' },
                                { id: 'pdf', label: 'PDF', icon: FileText, desc: 'Document layout' },
                            ].map(fmt => (
                                <div
                                    key={fmt.id}
                                    onClick={() => setFormat(fmt.id)}
                                    className={`p-6 border rounded-xl cursor-pointer transition-all ${format === fmt.id ? 'bg-blue-900/10 border-[#4169E1]' : 'bg-[#0A0A0A] border-white/5 hover:border-white/20'}`}
                                >
                                    <fmt.icon className={`w-8 h-8 mb-4 ${format === fmt.id ? 'text-[#4169E1]' : 'text-gray-500'}`} />
                                    <h4 className={`text-sm font-bold uppercase tracking-wide mb-1 ${format === fmt.id ? 'text-white' : 'text-gray-300'}`}>{fmt.label}</h4>
                                    <p className="text-[10px] text-gray-500">{fmt.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT: SUMMARY & HISTORY */}
                <div className="space-y-8">

                    {/* Summary Panel */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 sticky top-24">
                        <h3 className="font-serif text-white text-xl mb-6">Export Summary</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Period</span>
                                <span className="text-white">Oct 01 - Oct 31</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Selected Fields</span>
                                <span className="text-white">5 Fields</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Format</span>
                                <span className="text-white uppercase">{format}</span>
                            </div>
                            <div className="h-px bg-white/10 my-4" />
                            <div className="flex justify-between items-center bg-[#0A0A0A] p-3 rounded-lg border border-white/5">
                                <span className="text-xs text-gray-400">Est. Records</span>
                                <span className="text-luxe-gold font-bold">~1,248</span>
                            </div>
                        </div>

                        <Button className="w-full bg-[#4169E1] hover:bg-blue-600 text-white uppercase tracking-widest text-xs font-bold h-14 shadow-lg shadow-blue-900/20">
                            Generate Export <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                    {/* History */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Recent Exports</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Sept_2023_Full.csv', ago: '6 days ago', icon: Table },
                                { name: 'Q3_Revenue.pdf', ago: '8 days ago', icon: FileText },
                                { name: 'Fleet_Status.xlsx', ago: '2 weeks ago', icon: FileSpreadsheet },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center text-gray-500 group-hover:bg-white/10 group-hover:text-white transition-colors">
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-300 font-bold group-hover:text-white transition-colors">{item.name}</p>
                                            <p className="text-[10px] text-gray-600">{item.ago}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="text-gray-600 hover:text-white p-2 h-auto">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
