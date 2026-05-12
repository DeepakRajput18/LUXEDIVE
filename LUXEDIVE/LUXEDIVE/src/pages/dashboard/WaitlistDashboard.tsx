import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, BellOff, Car, CheckCircle, XCircle, Trash2, RefreshCw, ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'sonner'

interface WaitlistCar {
    waitlistId: string
    car: {
        id: string
        brand: string
        model: string
        images: string[]
        image_url?: string
        daily_rate: number
        is_available: boolean
        category?: string
    }
    status: string
    created_at: string
}

export default function WaitlistDashboard() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [entries, setEntries] = useState<WaitlistCar[]>([])
    const [loading, setLoading] = useState(true)
    const [removing, setRemoving] = useState<string | null>(null)

    const fetchWaitlist = async () => {
        if (!user) return
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('waitlist')
                .select(`
                    id,
                    status,
                    created_at,
                    car:cars (
                        id,
                        brand,
                        model,
                        images,
                        image_url,
                        daily_rate,
                        is_available,
                        category
                    )
                `)
                .eq('user_id', user.id)
                .in('status', ['pending', 'notified'])
                .order('created_at', { ascending: false })

            if (error) throw error
            const mapped: WaitlistCar[] = (data || []).map((row: any) => ({
                waitlistId: row.id,
                car: row.car,
                status: row.status,
                created_at: row.created_at,
            }))
            setEntries(mapped)
        } catch (err: any) {
            console.error('Waitlist fetch error:', err)
            toast.error('Failed to load your watchlist')
        } finally {
            setLoading(false)
        }
    }

    const removeFromWaitlist = async (waitlistId: string, carName: string) => {
        setRemoving(waitlistId)
        try {
            const { error } = await supabase
                .from('waitlist')
                .update({ status: 'expired' })
                .eq('id', waitlistId)
            if (error) throw error
            setEntries(prev => prev.filter(e => e.waitlistId !== waitlistId))
            toast.success(`Removed ${carName} from your watchlist`)
        } catch (err: any) {
            toast.error('Failed to remove from watchlist')
        } finally {
            setRemoving(null)
        }
    }

    useEffect(() => {
        fetchWaitlist()
    }, [user])

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-white mb-1">My Car Alerts</h1>
                    <p className="text-gray-400 text-sm font-light">
                        Cars you've requested availability notifications for.
                    </p>
                </div>
                <button
                    onClick={fetchWaitlist}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all text-xs uppercase tracking-widest"
                >
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    label="Total Tracked"
                    value={entries.length}
                    icon={<Bell className="w-5 h-5 text-amber-500" />}
                />
                <StatCard
                    label="Now Available"
                    value={entries.filter(e => e.car?.is_available).length}
                    icon={<CheckCircle className="w-5 h-5 text-emerald-500" />}
                    highlight="emerald"
                />
                <StatCard
                    label="Still Unavailable"
                    value={entries.filter(e => !e.car?.is_available).length}
                    icon={<XCircle className="w-5 h-5 text-amber-500" />}
                />
                <StatCard
                    label="Ready to Book"
                    value={entries.filter(e => e.car?.is_available).length}
                    icon={<Car className="w-5 h-5 text-blue-400" />}
                    highlight="blue"
                />
            </div>

            {/* List */}
            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <div className="text-center space-y-4">
                        <Bell className="w-10 h-10 text-amber-500 animate-pulse mx-auto" />
                        <p className="text-gray-400 text-sm uppercase tracking-widest">Loading your watchlist...</p>
                    </div>
                </div>
            ) : entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-6">
                    <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                        <BellOff className="w-8 h-8 text-amber-500/50" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-white font-serif text-xl mb-2">No Cars Tracked Yet</h3>
                        <p className="text-gray-500 text-sm max-w-sm">
                            When a car is unavailable, click "Notify Me" to track it here and get alerted when it becomes available.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/fleet')}
                        className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-amber-400 transition-all"
                    >
                        Browse Fleet <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {entries.map((entry) => (
                        <WaitlistCard
                            key={entry.waitlistId}
                            entry={entry}
                            removing={removing === entry.waitlistId}
                            onRemove={() => removeFromWaitlist(entry.waitlistId, `${entry.car?.brand} ${entry.car?.model}`)}
                            onBook={() => navigate(`/booking/${entry.car?.id}`)}
                            onView={() => navigate(`/fleet/${entry.car?.id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

function StatCard({ label, value, icon, highlight }: {
    label: string
    value: number
    icon: React.ReactNode
    highlight?: 'emerald' | 'blue'
}) {
    return (
        <div className={`p-5 rounded-2xl bg-[#0A0A0A] border ${highlight === 'emerald' ? 'border-emerald-500/20' : highlight === 'blue' ? 'border-blue-500/20' : 'border-white/5'} flex items-center gap-4`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight === 'emerald' ? 'bg-emerald-500/10' : highlight === 'blue' ? 'bg-blue-500/10' : 'bg-amber-500/10'}`}>
                {icon}
            </div>
            <div>
                <p className="text-2xl font-serif text-white">{value}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{label}</p>
            </div>
        </div>
    )
}

function WaitlistCard({ entry, removing, onRemove, onBook, onView }: {
    entry: WaitlistCar
    removing: boolean
    onRemove: () => void
    onBook: () => void
    onView: () => void
}) {
    const car = entry.car
    if (!car) return null
    const image = car.images?.[0] || car.image_url
    const isAvailable = car.is_available
    const addedDate = new Date(entry.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

    return (
        <div className="group bg-[#0A0A0A] border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300">
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
                {image ? (
                    <img
                        src={image}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-12 h-12 text-gray-700" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Availability Badge */}
                <div className={`absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border text-[10px] font-black uppercase tracking-widest ${isAvailable ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-amber-500/20 border-amber-500/40 text-amber-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isAvailable ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    {isAvailable ? '✓ Now Available!' : 'Unavailable'}
                </div>

                {/* Remove Button */}
                <button
                    onClick={onRemove}
                    disabled={removing}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 transition-all"
                    title="Remove from watchlist"
                >
                    {removing ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                    )}
                </button>
            </div>

            {/* Info */}
            <div className="p-5">
                <div className="mb-4">
                    <h3 className="text-white font-serif text-lg group-hover:text-amber-500 transition-colors">{car.brand} {car.model}</h3>
                    <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{car.category || 'Luxury Fleet'}</p>
                </div>

                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest">Rental Rate</p>
                        <p className="text-amber-500 font-serif text-lg">₹{car.daily_rate?.toLocaleString()}<span className="text-gray-500 text-xs">/day</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest">Tracking Since</p>
                        <p className="text-gray-300 text-xs">{addedDate}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onView}
                        className="flex-1 py-2.5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/30 transition-all text-[10px] uppercase tracking-widest"
                    >
                        View Car
                    </button>
                    {isAvailable ? (
                        <button
                            onClick={onBook}
                            className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-1"
                        >
                            Book Now <ArrowRight className="w-3 h-3" />
                        </button>
                    ) : (
                        <div className="flex-1 py-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-500/60 rounded-xl text-[10px] uppercase tracking-widest text-center cursor-not-allowed">
                            Waiting...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
