import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    Download,
    TrendingUp,
    DollarSign,
    Users,
    Car
} from 'lucide-react';

const AdminReports: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="font-bold text-lg">Reports & Analytics</h1>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> This Month
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </header>

            <div className="p-8 max-w-7xl mx-auto">

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                    <DollarSign className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-blue-100 font-bold text-xs uppercase tracking-widest">Total Revenue</span>
                            </div>
                            <h2 className="text-4xl font-bold mb-2">₹24,50,000</h2>
                            <p className="text-blue-200 text-sm flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" /> <span className="font-bold text-white">+12.5%</span> vs last month
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                <Users className="w-5 h-5" />
                            </div>
                            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">New Members</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-2 text-gray-900">142</h2>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-500" /> <span className="font-bold text-green-600">+8%</span> vs last month
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                                <Car className="w-5 h-5" />
                            </div>
                            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Fleet Utilization</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-2 text-gray-900">72%</h2>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-500" /> <span className="font-bold text-green-600">+5%</span> vs last month
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                    {/* Revenue Trend Chart Placeholder */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">Revenue Trend</h3>
                            <select className="text-xs font-bold border-none bg-transparent text-gray-500 focus:outline-none cursor-pointer">
                                <option>Last 6 Months</option>
                                <option>Last Year</option>
                            </select>
                        </div>

                        {/* Mock Chart Area */}
                        <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-gray-100 pb-2">
                            {[45, 60, 55, 70, 85, 95].map((h, i) => (
                                <div key={i} className="w-full bg-blue-50 rounded-t-lg relative group transition-all hover:bg-blue-100 cursor-pointer" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ₹{(h * 25000).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 font-bold uppercase tracking-widest pt-4 px-4">
                            <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span>
                        </div>
                    </div>

                    {/* Top Cars */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-bold text-lg mb-6">Top Performing Vehicles</h3>
                        <div className="space-y-6">
                            {[
                                { name: "Porsche 911 GT3 RS", earnings: "₹8.5L", trips: 12 },
                                { name: "Lamborghini Urus", earnings: "₹6.2L", trips: 18 },
                                { name: "Ferrari 488 Spider", earnings: "₹5.9L", trips: 10 },
                                { name: "Rolls Royce Ghost", earnings: "₹4.1L", trips: 5 },
                            ].map((car, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="font-bold text-sm text-gray-400 w-4">{i + 1}</div>
                                        <div>
                                            <p className="font-bold text-sm">{car.name}</p>
                                            <p className="text-xs text-gray-400">{car.trips} Trips</p>
                                        </div>
                                    </div>
                                    <span className="font-bold font-mono text-sm">{car.earnings}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Recent Issues Table */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Operational Alerts</h3>
                        <button className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:text-blue-800">View All Log</button>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs tracking-wider border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Severity</th>
                                <th className="px-6 py-4">Issue</th>
                                <th className="px-6 py-4">Vehicle / User</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4"><span className="px-2 py-1 bg-red-50 text-red-600 rounded text-[10px] font-bold uppercase border border-red-100">High</span></td>
                                <td className="px-6 py-4 font-medium">Late Return (&gt;24h)</td>
                                <td className="px-6 py-4 text-gray-500">Ferrari 488 / Arjun R.</td>
                                <td className="px-6 py-4 font-bold text-orange-600 text-xs uppercase">Open</td>
                                <td className="px-6 py-4 text-gray-400 text-xs">Today, 10:00 AM</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4"><span className="px-2 py-1 bg-orange-50 text-orange-600 rounded text-[10px] font-bold uppercase border border-orange-100">Medium</span></td>
                                <td className="px-6 py-4 font-medium">Maintenance Due</td>
                                <td className="px-6 py-4 text-gray-500">Mercedes G63</td>
                                <td className="px-6 py-4 font-bold text-blue-600 text-xs uppercase">Scheduled</td>
                                <td className="px-6 py-4 text-gray-400 text-xs">Yesterday</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default AdminReports;
