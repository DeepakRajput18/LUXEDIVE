import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield,
    Key,
    Smartphone,
    LayoutDashboard,
    Car,
    CreditCard,
    User,
    Settings,
    LogOut,
    Clock,
    Search,
    Filter,
    Monitor,
    Globe,
    MoreHorizontal,
    Info
} from 'lucide-react';

const SecurityActivityLog: React.FC = () => {
    const navigate = useNavigate();

    // Mock Data
    const activities = [
        {
            id: 1,
            device: 'Chrome on MacOS',
            isCurrent: true,
            ip: '192.168.1.45',
            location: 'Ahmedabad, India',
            time: 'Oct 24, 10:42 AM',
            status: 'success',
            icon: Monitor
        },
        {
            id: 2,
            device: 'Safari on iPhone 14',
            isCurrent: false,
            ip: '10.0.0.12',
            location: 'Gandhinagar, India',
            time: 'Oct 23, 08:15 PM',
            status: 'success',
            icon: Smartphone
        },
        {
            id: 3,
            device: 'Firefox on Windows',
            isCurrent: false,
            ip: '45.33.22.11',
            location: 'Mumbai, India',
            time: 'Oct 22, 02:00 AM',
            status: 'blocked',
            icon: Monitor
        },
        {
            id: 4,
            device: 'Chrome on Android',
            isCurrent: false,
            ip: '192.168.0.9',
            location: 'Ahmedabad, India',
            time: 'Oct 20, 11:30 AM',
            status: 'success',
            icon: Smartphone
        }
    ];

    return (
        <div className="min-h-screen bg-[#0F1218] text-white font-sans flex">



            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-serif font-medium mb-2">Security Activity Log</h2>
                        <p className="text-gray-400 text-sm max-w-xl">
                            Monitor your recent login sessions and account security status. Review access from new devices below.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                            Export Log
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                            <Shield className="w-4 h-4" /> Change Password
                        </button>
                    </div>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                                <Key className="w-5 h-5" />
                            </div>
                            <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded border border-green-500/20">Secure</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">Last Password Change</p>
                        <p className="text-xl font-medium text-white">12 days ago</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <div className="flex items-center gap-2 px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded border border-blue-500/20">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" /> Active
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">2FA Status</p>
                        <p className="text-xl font-medium text-white">Enabled</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                                <Monitor className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">Active Sessions</p>
                        <div className="flex items-end gap-2">
                            <p className="text-xl font-medium text-white">2 devices</p>
                            <p className="text-xs text-gray-500 mb-1">Ahmedabad Region</p>
                        </div>
                    </div>

                </div>

                {/* Recent Activity */}
                <div className="bg-[#151921] border border-white/10 rounded-2xl overflow-hidden">

                    <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <h3 className="font-bold text-sm tracking-wide">Recent Activity</h3>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search IP or Device..."
                                    className="w-full bg-[#0F1218] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
                                />
                            </div>
                            <button className="p-2 bg-[#0F1218] border border-white/10 rounded-lg text-gray-400 hover:text-white">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase font-bold tracking-widest bg-white/5">
                                <tr>
                                    <th className="px-6 py-4">Device/Browser</th>
                                    <th className="px-6 py-4">IP Address</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Date/Time</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {activities.map((item) => (
                                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/5 rounded-lg text-gray-400 group-hover:text-white transition-colors">
                                                    <item.icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{item.device}</p>
                                                    {item.isCurrent && <p className="text-[10px] text-green-500 font-bold uppercase mt-0.5">Current Session</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-gray-400">{item.ip}</td>
                                        <td className="px-6 py-4 text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-3 h-3 text-gray-600" /> {item.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">{item.time}</td>
                                        <td className="px-6 py-4">
                                            {item.status === 'success' ? (
                                                <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-wider">
                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Successful
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider">
                                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Blocked
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {item.isCurrent ? (
                                                <button className="text-xs font-medium text-red-400 hover:text-red-300 border border-red-500/20 px-3 py-1.5 rounded hover:bg-red-500/10 transition-colors">
                                                    Log Out
                                                </button>
                                            ) : item.status === 'blocked' ? (
                                                <button className="text-xs font-medium text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded hover:bg-white/5 transition-colors">
                                                    Details
                                                </button>
                                            ) : (
                                                <button className="text-xs font-medium text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded hover:bg-white/5 transition-colors">
                                                    Log Out
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-white/5 flex justify-between items-center bg-black/20">
                        <span className="text-xs text-gray-500">Showing last 30 days of activity</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400 hover:text-white disabled:opacity-50" disabled>Previous</button>
                            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400 hover:text-white">Next</button>
                        </div>
                    </div>

                </div>

                {/* Alert */}
                <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3 text-sm">
                    <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                    <p className="text-blue-200 leading-relaxed">
                        <strong className="text-blue-400 block mb-1">Suspicious Login Attempt?</strong>
                        If you see any device or location you do not recognize, please change your password immediately and contact LUXEDIVE Support.
                    </p>
                </div>

            </main>

        </div>
    );
};

export default SecurityActivityLog;
