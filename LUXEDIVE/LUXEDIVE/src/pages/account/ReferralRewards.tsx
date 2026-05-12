import { Button } from '../../components/ui/Button'
import { DollarSign, Users, Hourglass, Copy, Share, Twitter, Facebook, Linkedin, Mail, ArrowRight } from 'lucide-react'

// Page 57: Referral & Rewards
export default function ReferralRewards() {
    return (
        <div className="min-h-screen bg-luxe-black text-white pt-24 pb-20">

            {/* HEADER */}
            <div className="container mx-auto px-6 mb-12 text-center">
                <div className="inline-block w-2 h-2 rounded-full bg-[#4169E1] mb-4" />
                <div className="text-[10px] text-[#4169E1] font-bold uppercase tracking-widest mb-2">Referral Program</div>
                <h1 className="text-4xl font-serif text-white mb-4">Referral & Rewards</h1>
                <p className="text-gray-400 font-light text-lg max-w-2xl mx-auto">
                    Invite friends to the ultimate driving experience. Earn exclusive driving credits for every successful referral who completes their first journey.
                </p>
            </div>

            {/* SUMMARY CARDS */}
            <div className="container mx-auto px-6 max-w-5xl mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-emerald-900/20 rounded-lg text-emerald-500">
                                <span className="font-bold text-lg">₹</span>
                            </div>
                            <div className="px-2 py-1 bg-emerald-900/20 rounded text-[10px] text-emerald-500 font-bold">+12%</div>
                        </div>
                        <div className="text-3xl font-serif text-white font-bold mb-1">₹1,05,000</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total Earnings</div>
                    </div>

                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-900/20 rounded-lg text-[#4169E1]">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-serif text-white font-bold mb-1">5</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Successful Referrals</div>
                    </div>

                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-yellow-900/20 rounded-lg text-yellow-500">
                                <Hourglass className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-serif text-white font-bold mb-1">2</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Pending Rewards</div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT SPLIT */}
            <div className="container mx-auto px-6 max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

                {/* LEFT: CODE */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                    <div className="relative z-10">
                        <h2 className="text-2xl font-serif text-white mb-2">Your Exclusive Access Code</h2>
                        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                            Share this code with your network. They get 15% off their first rental, and you earn ₹4,000 credit.
                        </p>

                        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 flex items-center justify-between mb-6">
                            <span className="font-mono text-xl tracking-widest text-luxe-gold font-bold">LUXE-8821</span>
                            <Button className="bg-[#4169E1] text-white hover:bg-blue-600 h-10 px-4 uppercase tracking-widest text-[10px] font-bold">
                                <Copy className="w-4 h-4 mr-2" /> Copy Code
                            </Button>
                        </div>
                    </div>
                </div>

                {/* RIGHT: SHARE INVITATION */}
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-serif text-white mb-2">Share Invitation</h2>
                        <p className="text-sm text-gray-400">Spread the word on your social networks.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-[#1A1A1A] border border-white/5 rounded-xl hover:bg-white/5 hover:border-white/10 transition-all group">
                            <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-white">Share via X</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-[#1A1A1A] border border-white/5 rounded-xl hover:bg-white/5 hover:border-white/10 transition-all group">
                            <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-white">Facebook</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-[#1A1A1A] border border-white/5 rounded-xl hover:bg-white/5 hover:border-white/10 transition-all group">
                            <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-white">LinkedIn</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-[#1A1A1A] border border-white/5 rounded-xl hover:bg-white/5 hover:border-white/10 transition-all group">
                            <Mail className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-white">Email</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* HISTORY TABLE */}
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-2xl font-serif text-white">Referral History</h2>
                    <a href="#" className="text-[#4169E1] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                        View All <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-[#1A1A1A]">
                                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Invited Friend</th>
                                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Date Invited</th>
                                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">Status</th>
                                <th className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold text-right">Reward</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <tr>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-900/30 text-purple-400 flex items-center justify-center text-xs font-bold ring-1 ring-purple-500/20">AV</div>
                                        <span className="text-sm font-bold text-white">Alex Vose</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-400">Oct 24, 2023</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-emerald-900/20 text-emerald-500 rounded text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">Completed</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-white text-right">₹4,000</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center text-xs font-bold ring-1 ring-blue-500/20">JP</div>
                                        <span className="text-sm font-bold text-white">James Peterson</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-400">Nov 02, 2023</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-blue-900/20 text-blue-500 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">Signed Up</span>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-500 text-right uppercase font-bold">Pending</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-900/30 text-orange-400 flex items-center justify-center text-xs font-bold ring-1 ring-orange-500/20">SK</div>
                                        <span className="text-sm font-bold text-white">Sarah Klein</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-400">Nov 10, 2023</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-orange-900/20 text-orange-500 rounded text-[10px] font-bold uppercase tracking-widest border border-orange-500/20">Invited</span>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-600 text-right">-</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-pink-900/30 text-pink-400 flex items-center justify-center text-xs font-bold ring-1 ring-pink-500/20">MR</div>
                                        <span className="text-sm font-bold text-white">Marcus Ray</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-400">Nov 12, 2023</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-emerald-900/20 text-emerald-500 rounded text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">Completed</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-white text-right">₹4,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-center border-t border-white/5 pt-8">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">Terms and conditions apply. Rewards are credited after the referee completes their first rental.</p>
                    <div className="mt-4 text-[10px] text-gray-700 font-bold uppercase tracking-widest">© 2024 LUXEDIVE Inc.</div>
                </div>
            </div>

        </div>
    )
}
