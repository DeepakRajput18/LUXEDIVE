import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Search, TrendingUp, Filter } from 'lucide-react'

interface SearchAggregate {
    filters: string
    count: number
    lastSearched: string
}

interface TopFilter {
    key: string
    value: string
    count: number
}

export default function AdminSearchAnalytics() {
    const [totalSearches, setTotalSearches] = useState(0)
    const [topFilters, setTopFilters] = useState<TopFilter[]>([])
    const [recentSearches, setRecentSearches] = useState<{ filters: Record<string, unknown>; results_count: number; created_at: string }[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const { data, count } = await supabase
                .from('search_queries')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .limit(200)

            setTotalSearches(count ?? 0)

            const rows = data ?? []
            setRecentSearches(rows.slice(0, 15))

            // Aggregate popular filters
            const filterCounts: Record<string, number> = {}
            for (const row of rows) {
                const f = row.filters as Record<string, unknown>
                if (f) {
                    if (Array.isArray(f.brands) && f.brands.length > 0) {
                        for (const b of f.brands) filterCounts[`Brand: ${b}`] = (filterCounts[`Brand: ${b}`] ?? 0) + 1
                    }
                    if (f.transmission) filterCounts[`Trans: ${f.transmission}`] = (filterCounts[`Trans: ${f.transmission}`] ?? 0) + 1
                    if (f.fuel) filterCounts[`Fuel: ${f.fuel}`] = (filterCounts[`Fuel: ${f.fuel}`] ?? 0) + 1
                    if (f.category) filterCounts[`Cat: ${f.category}`] = (filterCounts[`Cat: ${f.category}`] ?? 0) + 1
                    if (f.maxPrice && (f.maxPrice as number) < 500000) filterCounts[`Price ≤ ₹${((f.maxPrice as number) / 1000).toFixed(0)}k`] = (filterCounts[`Price ≤ ₹${((f.maxPrice as number) / 1000).toFixed(0)}k`] ?? 0) + 1
                }
            }

            const sorted = Object.entries(filterCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([key, count]) => ({ key, value: '', count }))
            setTopFilters(sorted)

            setLoading(false)
        }
        load()
    }, [])

    const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

    const maxFilterCount = Math.max(...topFilters.map(f => f.count), 1)

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-white">Search Analytics</h1>
                <p className="text-gray-600 text-sm mt-0.5">{totalSearches} total filter interactions recorded</p>
            </div>

            {loading ? (
                <p className="text-gray-600 text-sm py-8">Loading search data…</p>
            ) : totalSearches === 0 ? (
                <div className="text-center py-16 border border-white/5 rounded-xl">
                    <Search className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                    <p className="text-gray-700 text-sm">No search data yet</p>
                    <p className="text-gray-800 text-xs mt-1">Run DB migration — data is logged when users apply fleet filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Popular Filters */}
                    <div className="bg-white/[0.03] border border-white/8 rounded-xl p-5">
                        <h3 className="text-white text-sm font-medium mb-4 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-luxe-gold" /> Most Used Filters
                        </h3>
                        <div className="space-y-3">
                            {topFilters.length === 0 ? (
                                <p className="text-gray-700 text-xs">No filter data yet</p>
                            ) : topFilters.map((f, i) => (
                                <div key={f.key} className="flex items-center gap-3">
                                    <span className="text-gray-700 text-xs w-5">{i + 1}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-white text-xs">{f.key}</span>
                                            <span className="text-gray-500 text-xs">{f.count}×</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full">
                                            <div className="h-full bg-luxe-gold/60 rounded-full transition-all"
                                                style={{ width: `${(f.count / maxFilterCount) * 100}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Searches */}
                    <div className="bg-white/[0.03] border border-white/8 rounded-xl p-5">
                        <h3 className="text-white text-sm font-medium mb-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-luxe-gold" /> Recent Search Sessions
                        </h3>
                        <div className="space-y-2">
                            {recentSearches.map((s, i) => {
                                const f = s.filters as Record<string, unknown>
                                const summary = [
                                    Array.isArray(f?.brands) && f.brands.length > 0 ? f.brands.join(', ') : null,
                                    f?.transmission,
                                    f?.fuel,
                                    f?.category,
                                ].filter(Boolean).join(' · ') || 'No filters'
                                return (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                                        <div>
                                            <p className="text-white text-xs">{summary}</p>
                                            <p className="text-gray-600 text-[10px] mt-0.5">{fmt(s.created_at)}</p>
                                        </div>
                                        <span className="text-gray-500 text-xs">{s.results_count} results</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
