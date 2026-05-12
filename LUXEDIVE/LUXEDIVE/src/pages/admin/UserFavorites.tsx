import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { 
    Heart, TrendingUp, Users, Calendar, 
    RefreshCw, Search, ArrowRight, Car
} from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

interface Favorite {
    user_id: string
    user_name: string
    car_id: string
    car_name: string
    created_at: string
}

export default function UserFavorites() {
    const [favorites, setFavorites] = useState<Favorite[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const fetchData = async () => {
        setRefreshing(true)
        try {
            const { data, error } = await supabase.rpc('admin_get_user_favorites')
            if (error) throw error
            setFavorites(data || [])
        } catch (err: any) {
            toast.error('Failed to load favorites: ' + err.message)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const filtered = favorites.filter(f => 
        f.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.car_name?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Aggregate trends
    const trends = favorites.reduce((acc: any, f) => {
        acc[f.car_name] = (acc[f.car_name] || 0) + 1
        return acc
    }, {})

    const sortedTrends = Object.entries(trends)
        .sort(([,a]: any, [,b]: any) => b - a)
        .slice(0, 5)

    if (loading) return <div className="flex items-center justify-center min-h-[400px] text-gray-500">Decrypting fleet desire...</div>

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-serif text-white flex items-center gap-3">
                        <Heart className="w-6 h-6 text-rose-500 fill-rose-500/10" />
                        Fleet Desirability & Trends
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Insights into what vehicles are currently trending with users</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Filter by user or car..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-luxe-gold/50 transition-all w-64"
                        />
                    </div>
                    <button 
                        onClick={fetchData}
                        className={`p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all ${refreshing ? 'animate-spin' : ''}`}
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Trends Sideboard */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 rounded-2xl p-6">
                        <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-rose-500" />
                            Most Favorited
                        </h3>
                        <div className="space-y-4">
                            {sortedTrends.map(([name, count]: any, i) => (
                                <div key={name} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-gray-700 w-4">#{i+1}</span>
                                        <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{name}</p>
                                    </div>
                                    <span className="text-[10px] font-bold bg-white/5 px-2 py-0.5 rounded-full text-white">{count} saves</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0B0D10]/50 border border-white/10 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Audience Reach</h4>
                                <p className="text-[10px] text-gray-600 uppercase">Save conversion rate</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] text-gray-500">
                                <span>High Intent</span>
                                <span className="text-white">68%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ledger */}
                <div className="lg:col-span-2 bg-[#0B0D10]/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/[0.04] bg-white/[0.02]">
                                    {['User Name', 'Vehicle of Choice', 'Favorited On', ''].map(h => (
                                        <th key={h} className="text-left px-6 py-4 text-gray-500 text-[10px] uppercase tracking-widest font-bold">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                                {filtered.map((f, i) => (
                                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                                    {f.user_name?.charAt(0)}
                                                </div>
                                                <span className="text-gray-300 font-medium">{f.user_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white font-semibold">
                                            <div className="flex items-center gap-2">
                                                <Car className="w-3.5 h-3.5 text-luxe-gold/50" />
                                                {f.car_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(f.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link to={`/admin/fleet`} className="p-2 opacity-0 group-hover:opacity-100 transition-all text-gray-500 hover:text-luxe-gold">
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
