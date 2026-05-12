import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Activity, Users, Car, TrendingUp, BarChart2, Calendar, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const AdminAnalytics: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [overview, setOverview] = useState<any>(null);
    const [funnel, setFunnel] = useState<any>(null);
    const [topVehicles, setTopVehicles] = useState<any[]>([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) return;

                // Make multiple parallel requests to the edge function using different actions
                const headers = { Authorization: `Bearer ${session.access_token}` };

                const [overviewRes, funnelRes, topRes] = await Promise.all([
                    supabase.functions.invoke('admin-analytics', { body: {}, headers, method: 'POST', query: { action: 'overview' } } as any),
                    supabase.functions.invoke('admin-analytics', { body: {}, headers, method: 'POST', query: { action: 'funnel' } } as any),
                    supabase.functions.invoke('admin-analytics', { body: {}, headers, method: 'POST', query: { action: 'top-vehicles' } } as any)
                ]);

                if (overviewRes.data) setOverview(overviewRes.data);
                if (funnelRes.data) setFunnel(funnelRes.data);
                if (topRes.data) setTopVehicles(topRes.data);

            } catch (error) {
                console.error("Error fetching analytics", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return <div className="p-8 text-amber-500 animate-pulse">Loading Analytics Data...</div>;
    }

    const funnelData = funnel ? [
        { name: 'Searches', count: funnel.searches || 0, color: '#4f4f4f' },
        { name: 'Vehicle Views', count: funnel.views || 0, color: '#737373' },
        { name: 'Checkout Started', count: funnel.bookingStarts || 0, color: '#a3a3a3' },
        { name: 'Bookings Successful', count: funnel.bookingSuccess || 0, color: '#f59e0b' }
    ] : [];

    const conversionRate = funnel?.views ? ((funnel.bookingSuccess / funnel.views) * 100).toFixed(1) : 0;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif font-bold text-white tracking-wide">LUXEDIVE Telemetry</h1>
                <div className="text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-500" />
                    Live Data
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                        <Users className="w-4 h-4" />
                        <h3 className="text-sm">Active Visitors (Today)</h3>
                    </div>
                    <div className="text-3xl font-bold text-white">{overview?.activeUsers || 0}</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                        <TrendingUp className="w-4 h-4" />
                        <h3 className="text-sm">Daily Page Views</h3>
                    </div>
                    <div className="text-3xl font-bold text-white">{overview?.dailyVisits || 0}</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                        <Target className="w-4 h-4 text-amber-500" />
                        <h3 className="text-sm">Conversion Rate</h3>
                    </div>
                    <div className="text-3xl font-bold text-amber-500">{conversionRate}%</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                        <Calendar className="w-4 h-4" />
                        <h3 className="text-sm">Total Bookings</h3>
                    </div>
                    <div className="text-3xl font-bold text-white">{funnel?.bookingSuccess || 0}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Funnel Chart */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <h2 className="text-lg font-serif font-semibold text-white mb-6 flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-amber-500" />
                        Global Booking Funnel
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={funnelData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                                <XAxis type="number" stroke="#ffffff40" />
                                <YAxis dataKey="name" type="category" stroke="#ffffff80" width={100} tick={{ fill: '#aaa' }} />
                                <Tooltip
                                    cursor={{ fill: '#ffffff05' }}
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', color: '#fff' }}
                                />
                                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                    {funnelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Vehicles */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <h2 className="text-lg font-serif font-semibold text-white mb-6 flex items-center gap-2">
                        <Car className="w-5 h-5 text-amber-500" />
                        Most Viewed Inventory
                    </h2>
                    <div className="space-y-4">
                        {topVehicles.length === 0 && <div className="text-gray-500 text-sm">Not enough data to rank vehicles.</div>}
                        {topVehicles.map((tv, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-3">
                                <div>
                                    <div className="text-white font-medium">{tv.cars?.brand} {tv.cars?.model}</div>
                                    <div className="text-xs text-gray-500">{tv.views} lifetime views</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-amber-500 font-bold">{tv.bookings} Bookings</div>
                                    <div className="text-[10px] text-gray-400">
                                        {(tv.views > 0 ? (tv.bookings / tv.views) * 100 : 0).toFixed(1)}% Conversion
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
