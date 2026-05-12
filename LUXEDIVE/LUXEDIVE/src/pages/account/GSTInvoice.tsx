import { Button } from '../../components/ui/Button'
import { Printer, Download, ArrowLeft, CheckCircle } from 'lucide-react'

// Page 69: GST Tax Invoice
export default function GSTInvoice() {
    return (
        <div className="min-h-screen bg-black text-white py-20 px-4 md:px-0 font-mono">

            {/* NAV & CONTROLS */}
            <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <a href="#" className="hover:text-white">My Account</a>
                    <span>/</span>
                    <a href="#" className="hover:text-white">Rentals</a>
                    <span>/</span>
                    <span className="text-white">Invoice #INV-2024-001</span>
                </div>

                <div className="flex gap-4">
                    <Button className="bg-[#121212] border border-white/20 text-white hover:bg-white hover:text-black h-9 text-xs uppercase tracking-widest px-4 font-sans font-bold">
                        <Printer className="w-4 h-4 mr-2" /> Print
                    </Button>
                    <Button className="bg-white text-black hover:bg-gray-200 h-9 text-xs uppercase tracking-widest px-4 font-sans font-bold">
                        <Download className="w-4 h-4 mr-2" /> Download PDF
                    </Button>
                </div>
            </div>

            {/* INVOICE CARD */}
            <div className="max-w-4xl mx-auto bg-[#121212] border border-white/10 p-12 md:p-16 relative shadow-2xl">

                {/* Watermark/Status */}
                <div className="absolute top-12 right-12 border-2 border-emerald-500/50 text-emerald-500 px-6 py-2 rounded text-xl font-bold uppercase tracking-widest transform -rotate-12 opacity-80 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" /> PAID
                </div>

                {/* Header */}
                <div className="flex justify-between items-start mb-16 border-b border-white/5 pb-8">
                    <div>
                        <div className="text-2xl font-bold tracking-widest mb-1 font-serif text-white">LUXEDIVE</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-6">Rentals Pvt Ltd</div>

                        <div className="text-xs text-gray-400 leading-relaxed">
                            1204, Westgate Business Bay,<br />
                            S.G. Highway, Ahmedabad,<br />
                            Gujarat, India - 380051
                        </div>
                        <div className="mt-4 text-xs text-gray-400">
                            <span className="text-gray-600">GSTIN:</span> 24AABCU9603R1Z2<br />
                            <span className="text-gray-600">PAN:</span> AABCU9603R
                        </div>
                    </div>
                    <div className="text-right pt-2">
                        <div className="text-4xl text-gray-800 font-bold mb-2">INVOICE</div>
                        <div className="text-sm text-white mb-1">#INV-2024-001</div>
                        <div className="text-xs text-gray-500">Date: Oct 25, 2024</div>
                    </div>
                </div>

                {/* Bill To */}
                <div className="mb-12 flex justify-between">
                    <div>
                        <div className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-2">Billed To</div>
                        <div className="text-white font-bold mb-1">Rajiv Mehta</div>
                        <div className="text-xs text-gray-400 leading-relaxed">
                            42, Shivalik High Street,<br />
                            Vastrapur, Ahmedabad<br />
                            Gujarat - 380015
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-2">Booking Reference</div>
                        <div className="text-[#4169E1] font-bold text-lg mb-1">#RNT-8821X</div>
                        <div className="text-xs text-gray-400">Rental Period: Oct 24 - Oct 25</div>
                    </div>
                </div>

                {/* Table */}
                <div className="mb-12">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="pb-4 text-[10px] text-gray-500 uppercase font-bold tracking-widest w-1/2">Description</th>
                                <th className="pb-4 text-[10px] text-gray-500 uppercase font-bold tracking-widest w-24">HSN/SAC</th>
                                <th className="pb-4 text-[10px] text-gray-500 uppercase font-bold tracking-widest text-right">Duration</th>
                                <th className="pb-4 text-[10px] text-gray-500 uppercase font-bold tracking-widest text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-white/5">
                                <td className="py-6 pr-4">
                                    <div className="text-white font-bold mb-1">Mercedes-Benz S-Class (Maybach Edition)</div>
                                    <div className="text-xs text-gray-500">Chauffeur Driven • Premium Package</div>
                                </td>
                                <td className="py-6 text-gray-400">996601</td>
                                <td className="py-6 text-right text-gray-400">1 Day</td>
                                <td className="py-6 text-right text-white">₹18,000.00</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-6 pr-4">
                                    <div className="text-white font-bold mb-1">Fuel Surcharge</div>
                                </td>
                                <td className="py-6 text-gray-400">996601</td>
                                <td className="py-6 text-right text-gray-400">-</td>
                                <td className="py-6 text-right text-white">₹2,500.00</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-6 pr-4">
                                    <div className="text-white font-bold mb-1">Insurance Check (Zero Dep)</div>
                                </td>
                                <td className="py-6 text-gray-400">997134</td>
                                <td className="py-6 text-right text-gray-400">-</td>
                                <td className="py-6 text-right text-white">₹1,500.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-16">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>Sub Total</span>
                            <span>₹22,000.00</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                            <span>CGST (9%)</span>
                            <span>₹1,980.00</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 pb-4 border-b border-white/10">
                            <span>SGST (9%)</span>
                            <span>₹1,980.00</span>
                        </div>
                        <div className="flex justify-between items-end pt-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-white">Grand Total</span>
                            <span className="text-xl font-bold text-white">₹25,960.00</span>
                        </div>
                        <div className="text-[10px] text-gray-500 text-right mt-2 italic">
                            (Indian Rupees Twenty Five Thousand Nine Hundred Sixty Only)
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-white/5 pt-8 text-center text-[10px] text-gray-600">
                    <p className="mb-2">This is a computer generated invoice and does not require a physical signature.</p>
                    <p>Thank you for choosing LUXEDIVE.</p>
                </div>

            </div>
        </div>
    )
}
