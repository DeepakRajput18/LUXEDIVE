import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
    TrendingUp, Flame, Calendar, ChevronRight, BarChart3, Brain,
    Car, RefreshCw, AlertTriangle, CheckCircle2, Clock, Zap, Star
} from 'lucide-react'
import { demandService, type TrendingCar, type AhmedabadEvent } from '../../services/demandService'
import { getCarImage } from '../../lib/placeholders'

// ─────────────────────────────────────────────────────────────────────────────
// Helper utilities
// ─────────────────────────────────────────────────────────────────────────────

const EVENT_TYPE_LABELS: Record<string, string> = {
    wedding_season: '💍 Wedding Season',
    festival: '🎉 Festival',
    holiday: '🗓 Holiday',
    ipl: '🏏 IPL',
    corporate_event: '💼 Corporate',
    other: '📌 Event',
}

const IMPACT_COLORS: Record<string, string> = {
    very_high: 'text-red-400 bg-red-500/10 border-red-500/30',
    high: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    low: 'text-green-400 bg-green-500/10 border-green-500/30',
}

const CONFIDENCE_STYLE: Record<string, string> = {
    high: 'text-green-400 bg-green-500/15 border-green-500/30',
    medium: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
    low: 'text-gray-400 bg-gray-500/15 border-gray-500/30',
}

function DemandBar({ score }: { score: number }) {
    const pct = Math.round(score * 100)
    const color = score >= 0.7 ? '#ef4444' : score >= 0.5 ? '#f97316' : '#22c55e'
    return (
        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, backgroundColor: color }}
            />
        </div>
    )
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin Demand Forecast Dashboard
// ─────────────────────────────────────────────────────────────────────────────

export default function DemandForecastDashboard() {
    const navigate = useNavigate()

    const [predictions, setPredictions] = useState<TrendingCar[]>([])
    const [events, setEvents] = useState<AhmedabadEvent[]>([])
    const [stats, setStats] = useState({ avgScore: 0, highDemandCount: 0, totalCars: 0 })
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [lastRefreshed, setLastRefreshed] = useState<string>('')
    const [activeTab, setActiveTab] = useState<'predictions' | 'events'>('predictions')
    const [filterConf, setFilterConf] = useState<string>('all')

    async function loadData() {
        try {
            const [predsData, eventsData, statsData] = await Promise.all([
                demandService.getAllPredictions(100),
                demandService.getUpcomingEvents(12),
                demandService.getDemandStats(),
            ])
            setPredictions(predsData)
            setEvents(eventsData)
            setStats(statsData)
            setLastRefreshed(new Date().toLocaleTimeString('en-IN'))
        } catch (e) {
            console.error('Error loading demand data:', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadData() }, [])

    async function handleRefresh() {
        setRefreshing(true)
        try {
            // Call edge function to regenerate predictions
            const res = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-demand-predictions`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                    },
                    body: JSON.stringify({ days_ahead: 90 }),
                }
            )
            if (res.ok) {
                await loadData()
            }
        } catch (e) {
            console.error('Refresh failed:', e)
            // Still reload local data
            await loadData()
        } finally {
            setRefreshing(false)
        }
    }

    const filteredPredictions = filterConf === 'all'
        ? predictions
        : predictions.filter(p => p.confidence_level === filterConf)

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading AI Demand Intelligence...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/30">
                            <Brain className="w-5 h-5 text-amber-400" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-white">Demand AI Dashboard</h1>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Fleet demand predictions for Ahmedabad • Powered by rule-based ML engine
                        {lastRefreshed && <span className="ml-3 text-gray-600">Last updated: {lastRefreshed}</span>}
                    </p>
                </div>

                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500/20 transition-all disabled:opacity-50 text-sm font-bold uppercase tracking-widest"
                >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? 'Regenerating...' : 'Refresh Predictions'}
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    {
                        label: 'Avg Demand Score',
                        value: `${stats.avgScore}%`,
                        icon: BarChart3,
                        color: 'amber',
                        desc: 'Fleet-wide average'
                    },
                    {
                        label: 'High Demand Cars',
                        value: stats.highDemandCount,
                        icon: Flame,
                        color: 'red',
                        desc: 'Score ≥ 70%'
                    },
                    {
                        label: 'Cars Tracked',
                        value: stats.totalCars,
                        icon: Car,
                        color: 'blue',
                        desc: 'Total predictions'
                    },
                    {
                        label: 'Upcoming Events',
                        value: events.length,
                        icon: Calendar,
                        color: 'green',
                        desc: 'Ahmedabad calendar'
                    },
                ].map((s, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-amber-500/30 transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <s.icon className={`w-5 h-5 text-${s.color}-400`} />
                            <span className="text-xs text-gray-500 uppercase tracking-wider">{s.desc}</span>
                        </div>
                        <div className={`text-3xl font-serif font-bold text-${s.color}-400 mb-1`}>{s.value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-white/10">
                {['predictions', 'events'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-3 text-sm font-bold uppercase tracking-widest px-1 border-b-2 transition-all ${activeTab === tab
                                ? 'border-amber-500 text-amber-400'
                                : 'border-transparent text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {tab === 'predictions' ? `🔮 Predictions (${predictions.length})` : `📅 Events (${events.length})`}
                    </button>
                ))}
            </div>

            {/* PREDICTIONS TAB */}
            {activeTab === 'predictions' && (
                <>
                    {/* Filters */}
                    <div className="flex gap-2 mb-5 flex-wrap">
                        {['all', 'high', 'medium', 'low'].map(conf => (
                            <button
                                key={conf}
                                onClick={() => setFilterConf(conf)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${filterConf === conf
                                        ? 'bg-amber-500 text-black border-amber-500'
                                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                {conf === 'all' ? `All (${predictions.length})` : conf}
                            </button>
                        ))}
                    </div>

                    {filteredPredictions.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <Brain className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p className="text-lg">No predictions loaded yet.</p>
                            <p className="text-sm mt-2">Run the SQL migration to seed data, then click Refresh.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredPredictions.map((pred, idx) => {
                                const score = Number(pred.demand_score)
                                const pct = Math.round(score * 100)
                                const scoreColor = score >= 0.7 ? 'text-red-400' : score >= 0.5 ? 'text-orange-400' : 'text-green-400'
                                const barColor = score >= 0.7 ? '#ef4444' : score >= 0.5 ? '#f97316' : '#22c55e'
                                const events = pred.factors?.events || []
                                const car = pred.cars

                                return (
                                    <div
                                        key={`${pred.car_id}-${idx}`}
                                        className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-amber-500/30 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Rank */}
                                            <div className="w-8 text-center text-sm font-bold text-gray-600">
                                                #{idx + 1}
                                            </div>

                                            {/* Car image */}
                                            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-900">
                                                {car && (
                                                    <img
                                                        src={(car.images && car.images[0]) || getCarImage(car.brand, car.model)}
                                                        alt={`${car.brand} ${car.model}`}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            const t = e.target as HTMLImageElement
                                                            t.src = 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=400'
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            {/* Car info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-white text-sm">
                                                        {car ? `${car.brand} ${car.model}` : 'Unknown Car'}
                                                    </h3>
                                                    {car && (
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold border ${CONFIDENCE_STYLE[pred.confidence_level]}`}>
                                                            {pred.confidence_level}
                                                        </span>
                                                    )}
                                                </div>

                                                {car && (
                                                    <div className="text-xs text-gray-500 mb-2">
                                                        {car.category} • ₹{Number(car.daily_rate).toLocaleString()}/day
                                                    </div>
                                                )}

                                                {/* Demand bar */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full transition-all duration-700"
                                                            style={{ width: `${pct}%`, backgroundColor: barColor }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs font-bold ${scoreColor}`}>{pct}%</span>
                                                </div>

                                                {/* Events */}
                                                {events.length > 0 && (
                                                    <div className="flex gap-1 mt-2 flex-wrap">
                                                        {events.slice(0, 3).map((ev, i) => (
                                                            <span key={i} className="text-[10px] bg-orange-500/15 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full">
                                                                {ev.replace(/_/g, ' ')}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Big score + actions */}
                                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                                <div className={`text-2xl font-serif font-bold ${scoreColor}`}>
                                                    {pct}%
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ~{pred.predicted_bookings} bookings
                                                </div>
                                                <Link
                                                    to={`/fleet/${pred.car_id}`}
                                                    className="text-xs text-amber-400 hover:text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    View <ChevronRight className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </>
            )}

            {/* EVENTS TAB */}
            {activeTab === 'events' && (
                <div className="grid md:grid-cols-2 gap-4">
                    {events.length === 0 ? (
                        <div className="col-span-2 text-center py-20 text-gray-500">
                            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>No upcoming events found. Run the SQL migration to populate events.</p>
                        </div>
                    ) : (
                        events.map((event) => {
                            const impactStyle = IMPACT_COLORS[event.impact_level] || IMPACT_COLORS.low
                            return (
                                <div
                                    key={event.id}
                                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-amber-500/30 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-bold text-white mb-1">
                                                {EVENT_TYPE_LABELS[event.event_type] || event.event_type}
                                            </h3>
                                            <p className="text-gray-300 text-sm">{event.event_name}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full border font-bold uppercase ${impactStyle}`}>
                                            {event.impact_level.replace('_', ' ')}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                        <Clock className="w-3.5 h-3.5" />
                                        {formatDate(event.start_date)} → {formatDate(event.end_date)}
                                    </div>

                                    <div className="flex gap-2 flex-wrap">
                                        {(event.affected_categories || []).map((cat, i) => (
                                            <span key={i} className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase font-bold">
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            )}

            {/* Business Impact Note */}
            <div className="mt-10 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-bold text-white mb-2">How to Use These Predictions</h3>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li className="flex items-center gap-2"><Star className="w-3 h-3 text-amber-400" /> Cars with <strong className="text-red-400">≥70% demand</strong> should be featured on the homepage automatically</li>
                            <li className="flex items-center gap-2"><Star className="w-3 h-3 text-amber-400" /> Increase prices 10-20% for high-demand cars <strong className="text-orange-400">before peak events</strong></li>
                            <li className="flex items-center gap-2"><Star className="w-3 h-3 text-amber-400" /> Block dates for high-demand cars during Wedding Season to avoid overbooking</li>
                            <li className="flex items-center gap-2"><Star className="w-3 h-3 text-amber-400" /> <strong className="text-amber-400">Re-run predictions weekly</strong> using the Refresh button above</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
