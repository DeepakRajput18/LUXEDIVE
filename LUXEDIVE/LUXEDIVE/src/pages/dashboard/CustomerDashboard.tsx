import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Car, Wallet, Clock, Check, MapPin, ArrowRight } from 'lucide-react'

export default function CustomerDashboard() {
    const { profile } = useAuth()
    const firstName = profile?.full_name?.split(' ')[0] || 'there'

    return (
        <div className="max-w-6xl mx-auto">
            {/* WELCOME */}
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-serif text-white mb-2">Welcome back, {firstName}!</h1>
                    <p className="text-gray-400 font-light">Here is an overview of your premium garage.</p>
                </div>
                <Button variant="outline" className="border-white/10 text-white hover:bg-white hover:text-black uppercase tracking-widest text-[10px] font-bold h-10 px-6">
                    + New Booking
                </Button>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#121212] border border-white/5 p-6 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Total Bookings</p>
                        <p className="text-3xl font-serif text-white">12</p>
                    </div>
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-300">
                        <Car className="w-5 h-5" />
                    </div>
                </div>
                <div className="bg-[#121212] border border-white/5 p-6 rounded-xl flex items-center justify-between relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500" />
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Active Rentals</p>
                        <p className="text-3xl font-serif text-white">1 <span className="text-xs text-emerald-500 ml-2 animate-pulse font-sans font-bold">LIVE</span></p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-500">
                        <Clock className="w-5 h-5" />
                    </div>
                </div>
                <div className="bg-[#121212] border border-white/5 p-6 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Wallet Balance</p>
                        <p className="text-3xl font-serif text-white">₹0</p>
                    </div>
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-300">
                        <Wallet className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COL: ACTIVE RENTAL & ACTIVITY */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Active Booking Card */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-0 overflow-hidden relative group">
                        <div className="h-48 relative">
                            <img src="https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800" className="w-full h-full object-cover" alt="McLaren 720S" />
                            <div className="absolute top-4 right-4 bg-emerald-500 text-black text-[10px] font-bold uppercase px-3 py-1 rounded shadow-lg">
                                In Progress
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-serif text-white mb-1">McLaren 720S</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">Booking ID #LX-9921</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-white flex items-center justify-end gap-1"><MapPin className="w-3 h-3 text-luxe-gold" /> Ahmedabad</p>
                                    <p className="text-[10px] text-gray-500 mt-1">Due: Tomorrow, 10:00 AM</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Link to="/rental/LX-9921/tracking">
                                    <Button className="bg-luxe-gold text-black hover:bg-yellow-500 uppercase tracking-widest text-[10px] font-bold px-6 h-10">
                                        Track Delivery
                                    </Button>
                                </Link>
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 uppercase tracking-widest text-[10px] font-bold px-6 h-10">
                                    Details
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-[#121212] border border-white/5 rounded-2xl p-8">
                        <h3 className="font-serif text-white text-lg mb-6">Recent Activity</h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Booking Confirmed', desc: 'McLaren 720S - Oct 25-27', time: '2 hours ago', icon: Check },
                                { title: 'Rental Completed', desc: 'Porsche 911 GT3 - Oct 12', time: '2 weeks ago', icon: Clock },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                        <item.icon className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{item.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-600 ml-auto pt-1">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT COL: TIER & SUGGESTIONS */}
                <div className="space-y-8">

                    {/* Platinum Tier Card */}
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-black border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-luxe-gold/10 rounded-full blur-3xl opacity-50" />
                        <div className="relative z-10">
                            <h3 className="font-serif text-white text-xl mb-1">Platinum Member</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-6">Level 3 of 4</p>

                            <div className="mb-2 flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-luxe-gold">Points: 2,450</span>
                                <span className="text-gray-600">Goal: 5,000</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-6">
                                <div className="h-full bg-luxe-gold w-[48%]" />
                            </div>
                            <p className="text-xs text-gray-500 italic mb-0">"You're 2,550 points away from irregular access to the Black Tier."</p>
                        </div>
                    </div>

                    {/* Suggested Cars */}
                    <div>
                        <h3 className="font-serif text-white text-lg mb-4">Suggested For You</h3>
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="flex gap-4 p-3 bg-[#121212] border border-white/5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="w-16 h-12 bg-gray-900 rounded overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=200" className="w-full h-full object-cover" alt="Car Thumbnail" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-white group-hover:text-luxe-gold transition-colors">Ferrari F8 Tributo</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Starting ₹1,45,000</p>
                                    </div>
                                    <div className="self-center">
                                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
