import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Star, Shield, ArrowRight, BadgeCheck, Award, ChevronDown, SlidersHorizontal, X, Loader2 } from 'lucide-react'
import { chauffeurService } from '../../services/chauffeurService'


type SortKey = 'rating_desc' | 'price_asc' | 'price_desc' | 'exp_desc'

export default function ChauffeurDirectory() {
    const [drivers, setDrivers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [minRating, setMinRating] = useState(0)
    const [maxPrice, setMaxPrice] = useState(20000)
    const [minExp, setMinExp] = useState(0)
    const [sort, setSort] = useState<SortKey>('rating_desc')
    const [showFilters, setShowFilters] = useState(false)
    const [visibleCount, setVisibleCount] = useState(6)

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const data = await chauffeurService.getChauffeurs()
                setDrivers(data)
            } finally {
                setLoading(false)
            }
        }
        fetchDrivers()
    }, [])

    const filtered = useMemo(() => {
        const f = drivers.filter(c =>
            c.rating >= minRating &&
            c.pricePerDay <= maxPrice &&
            c.experienceYears >= minExp
        )
        return [...f].sort((a, b) => {
            if (sort === 'rating_desc') return b.rating - a.rating
            if (sort === 'price_asc') return a.pricePerDay - b.pricePerDay
            if (sort === 'price_desc') return b.pricePerDay - a.pricePerDay
            if (sort === 'exp_desc') return b.experienceYears - a.experienceYears
            return 0
        })
    }, [drivers, minRating, maxPrice, minExp, sort])

    const activeFilters = (minRating > 0 ? 1 : 0) + (maxPrice < 20000 ? 1 : 0) + (minExp > 0 ? 1 : 0)

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 selection:bg-luxe-gold/30">
            {/* Header */}
            <div className="container mx-auto px-6 mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxe-gold/10 border border-luxe-gold/20 text-luxe-gold text-[10px] font-bold uppercase tracking-widest mb-5">
                    <Shield className="w-3 h-3" /> {drivers.length} Certified Elite Drivers
                </div>
                <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 tracking-tight">
                    Your <span className="text-luxe-gold/80 italic">Chauffeur</span> Awaits
                </h1>
                <p className="text-gray-400 text-base font-light max-w-xl mx-auto">Police-verified, multilingual professionals trained in VIP protocol and defensive driving.</p>
            </div>

            {/* Filter Bar */}
            <div className="container mx-auto px-6 mb-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${showFilters ? 'bg-luxe-gold text-black border-luxe-gold' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
                    >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        Filters {activeFilters > 0 && <span className="bg-black/20 px-1.5 rounded-full">{activeFilters}</span>}
                    </button>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Sort</span>
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value as SortKey)}
                            className="bg-[#111] border border-white/10 text-gray-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-luxe-gold/40"
                        >
                            <option value="rating_desc">Rating: High → Low</option>
                            <option value="price_asc">Price: Low → High</option>
                            <option value="price_desc">Price: High → Low</option>
                            <option value="exp_desc">Experience: Most First</option>
                        </select>
                        <span className="text-xs text-gray-500">{filtered.length} drivers</span>
                    </div>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="mt-4 p-6 bg-[#0F0F0F] border border-white/5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-3">Min Rating: {minRating > 0 ? `${minRating}★+` : 'Any'}</label>
                            <div className="flex gap-2 flex-wrap">
                                {[0, 3, 4, 4.5, 5].map(r => (
                                    <button key={r} onClick={() => setMinRating(r)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${minRating === r ? 'bg-luxe-gold text-black border-luxe-gold' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
                                        {r === 0 ? 'Any' : `${r}★+`}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-3">Max Price: ₹{maxPrice.toLocaleString()}/day</label>
                            <input type="range" min={500} max={20000} step={500} value={maxPrice}
                                onChange={e => setMaxPrice(Number(e.target.value))}
                                className="w-full accent-luxe-gold" />
                            <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                                <span>₹500</span><span>₹20,000</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-3">Min Experience: {minExp > 0 ? `${minExp}+ yrs` : 'Any'}</label>
                            <div className="flex gap-2 flex-wrap">
                                {[0, 3, 5, 10, 15].map(e => (
                                    <button key={e} onClick={() => setMinExp(e)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${minExp === e ? 'bg-luxe-gold text-black border-luxe-gold' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
                                        {e === 0 ? 'Any' : `${e}+`}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {activeFilters > 0 && (
                            <div className="md:col-span-3 flex justify-end">
                                <button onClick={() => { setMinRating(0); setMaxPrice(20000); setMinExp(0) }}
                                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
                                    <X className="w-3 h-3" /> Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-luxe-gold gap-4">
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Summoning Elite Crew...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-lg font-serif mb-2">No drivers match your filters</p>
                    <button onClick={() => { setMinRating(0); setMaxPrice(20000); setMinExp(0) }} className="text-xs text-luxe-gold hover:underline">Clear all filters</button>
                </div>
            ) : (
                <div className="container mx-auto px-4 md:px-10 max-w-[1600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.slice(0, visibleCount).map(driver => (
                        <div key={driver.id} className="relative group bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-luxe-gold/30 transition-all duration-500 hover:shadow-xl hover:shadow-luxe-gold/5 flex flex-col">
                            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 items-start">
                                {driver.isTopChauffeur && (
                                    <div className="bg-luxe-gold/90 text-black text-[9px] font-bold px-2.5 py-1 rounded flex items-center gap-1 shadow-lg">
                                        <Award className="w-2.5 h-2.5" /> TOP
                                    </div>
                                )}
                                <div className={`text-[9px] font-bold px-2.5 py-1 rounded uppercase tracking-widest backdrop-blur border ${driver.pricePerDay <= 6000 ? 'bg-black/60 text-gray-300 border-gray-500/30' : driver.pricePerDay <= 12000 ? 'bg-blue-950/60 text-blue-300 border-blue-500/30' : 'bg-purple-950/60 text-purple-300 border-purple-500/30'}`}>
                                    {driver.pricePerDay <= 6000 ? 'Budget' : driver.pricePerDay <= 12000 ? 'Premium' : 'Elite'}
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 z-20 text-[9px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 bg-emerald-900/60 border-emerald-500/20 text-emerald-400">
                                <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                Available
                            </div>

                            {/* Photo - Landscape Rectangle */}
                            <div className="aspect-[16/10] relative overflow-hidden shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
                                <img src={driver.profilePhoto} className="w-full h-full object-cover object-[center_20%] grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={driver.firstName} />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <h3 className="text-2xl font-serif text-white group-hover:text-luxe-gold transition-colors shadow-black drop-shadow-md">{driver.firstName}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-200 mt-1 drop-shadow-md">
                                        <Star className="w-3 h-3 text-luxe-gold fill-current" />
                                        <span>{driver.rating.toFixed(1)}</span>
                                        <span className="text-gray-400">·</span>
                                        <span>{driver.reviewCount} reviews</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 z-20 bg-black/80 backdrop-blur px-3 py-2 rounded-xl border border-luxe-gold/20 flex flex-col items-end">
                                    <p className="text-luxe-gold text-lg font-bold leading-none">₹{driver.pricePerDay.toLocaleString()}</p>
                                    <p className="text-gray-400 text-[10px] mt-1">/ day</p>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-5 flex-grow flex flex-col">
                                {driver.policeVerificationStatus && (
                                    <div className="flex items-center gap-1.5 mb-4 border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 rounded-full w-max">
                                        <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/90">Police Verified</span>
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-2 gap-4 mb-4 text-xs font-medium">
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Exp</p>
                                        <p className="text-gray-200">{driver.experienceYears} Years</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Languages</p>
                                        <p className="text-gray-200 line-clamp-1">{driver.languages.join(', ')}</p>
                                    </div>
                                </div>
                                
                                <div className="mb-5 flex-grow">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1.5">Specialties</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {driver.specializations.slice(0, 3).map((s: string) => (
                                            <span key={s} className="text-[9px] font-bold uppercase tracking-wider text-luxe-gold/80 bg-luxe-gold/5 border border-luxe-gold/20 px-2 py-0.5 rounded">{s}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto grid grid-cols-2 gap-3">
                                    <Link to={`/chauffeurs/${driver.id}`} state={{ preSelectedChauffeur: driver }}>
                                        <div className="w-full border border-white/10 hover:bg-white hover:text-black text-white uppercase tracking-widest text-[10px] font-bold h-10 flex items-center justify-center rounded-lg transition-all">
                                            Profile
                                        </div>
                                    </Link>
                                    <Link to="/fleet" state={{ preSelectedChauffeur: driver }}>
                                        <div className="w-full bg-luxe-gold hover:bg-white text-black uppercase tracking-widest text-[10px] font-bold h-10 flex items-center justify-center rounded-lg transition-all shadow-lg shadow-luxe-gold/10">
                                            Book <ArrowRight className="w-3 h-3 ml-2" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="text-center mt-12 space-y-4">
                <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} Drivers</p>
                {visibleCount < filtered.length && (
                    <button
                        onClick={() => setVisibleCount(v => v + 6)}
                        className="inline-flex items-center gap-2 px-8 py-3 border border-luxe-gold/30 text-luxe-gold text-xs font-bold uppercase tracking-widest rounded-full hover:bg-luxe-gold hover:text-black transition-all"
                    >
                        Load More Chauffeurs
                    </button>
                )}
            </div>
        </div>
    )
}
