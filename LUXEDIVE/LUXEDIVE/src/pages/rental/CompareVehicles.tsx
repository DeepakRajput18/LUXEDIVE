import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Check, Zap, Star, ArrowLeft, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { carService, type Car } from '../../services/carService'
import { Skeleton } from '../../components/ui/Skeleton'
import { Badge } from '../../components/ui/Badge'
import { getCarImage } from '../../lib/placeholders'

export default function CompareVehicles() {
    const [searchParams] = useSearchParams()
    const [cars, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchCompareCars() {
            const ids = searchParams.get('ids')?.split(',') || []
            // Default to featured cars if no IDs provided (for demo)
            const data = ids.length > 0
                ? await carService.getCarsByIds(ids)
                : await carService.getFeaturedCars()

            // Limit to 3 for comparison UI + 1 label column = 4 cols
            setCars(data ? data.slice(0, 3) : [])
            setLoading(false)
        }
        fetchCompareCars()
    }, [searchParams])

    // Helper to find best stat
    const getBest = (stat: 'hp' | 'acceleration' | 'rate') => {
        if (!cars.length) return null
        if (stat === 'hp') {
            return cars.reduce((prev, curr) =>
                parseInt(curr.specs.hp || '0') > parseInt(prev.specs.hp || '0') ? curr : prev
            ).id
        }
        if (stat === 'acceleration') {
            return cars.reduce((prev, curr) =>
                parseFloat(curr.specs.acceleration || '10') < parseFloat(prev.specs.acceleration || '10') ? curr : prev
            ).id
        }
        if (stat === 'rate') { // Lowest rate is best
            return cars.reduce((prev, curr) =>
                curr.daily_rate < prev.daily_rate ? curr : prev
            ).id
        }
        return null
    }

    const bestHpId = getBest('hp')
    const bestAccelId = getBest('acceleration')
    const bestRateId = getBest('rate')

    // Dummy "Top Rated" logic (just pick the first one or random)
    const topRatedId = cars.length > 0 ? cars[0].id : null

    return (
        <div className="min-h-screen bg-luxe-black pt-24 pb-12 px-4">
            <div className="container mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif text-white mb-2 ml-12">COMPARE VEHICLES</h1>
                        <p className="text-luxe-gray ml-12">Side-by-side specification analysis</p>
                    </div>
                    <Link to="/fleet">
                        <Button variant="outline" className="border-white/10 text-luxe-gray hover:text-white">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Fleet
                        </Button>
                    </Link>
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto pb-8">
                    {loading ? <div className="flex gap-4 p-8 ml-12"><Skeleton className="w-64 h-96" /><Skeleton className="w-64 h-96" /></div> : (
                        <div className="min-w-[1000px] grid grid-cols-4 gap-0"> {/* Gap 0 for table look */}

                            {/* Labels Column */}
                            <div className="pt-[340px] space-y-0 text-sm text-luxe-gray font-medium uppercase tracking-wider text-right pr-8 border-r border-white/5">
                                <div className="h-16 flex items-center justify-end border-b border-white/5">Daily Rate</div>
                                <div className="h-16 flex items-center justify-end border-b border-white/5">Transmission</div>
                                <div className="h-16 flex items-center justify-end border-b border-white/5">0-100 KM/H</div>
                                <div className="h-16 flex items-center justify-end border-b border-white/5">Horsepower</div>
                                <div className="h-16 flex items-center justify-end border-b border-white/5">Engine</div>
                                <div className="h-48 pt-6 flex justify-end">Key Features</div>
                            </div>

                            {/* Car Columns */}
                            {cars.map((car, index) => (
                                <div key={car.id} className={`relative group border-r border-white/5 ${index === cars.length - 1 ? 'border-r-0' : ''}`}>
                                    {/* Car Card Header */}
                                    <div className="mb-0 relative h-[340px] px-6 pb-6 flex flex-col justify-end">
                                        {car.id === topRatedId && (
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-b-lg flex items-center gap-1 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                                                <Trophy className="w-3 h-3" /> TOP RATED
                                            </div>
                                        )}

                                        <div className="w-full relative aspect-[16/9] mb-6 group-hover:scale-105 transition-transform duration-500">
                                            <img src={car.images?.[0] || getCarImage(car.brand, car.model)} className="w-full h-full object-contain drop-shadow-2xl" />
                                        </div>

                                        <div className="text-center">
                                            <h3 className="text-xl font-serif text-white mb-1">{car.model}</h3>
                                            <p className="text-xs text-luxe-gray uppercase tracking-widest">{car.brand}</p>
                                        </div>
                                    </div>

                                    {/* Stats Rows */}
                                    <div className="space-y-0 text-center">
                                        {/* Rate */}
                                        <div className={`h-16 flex items-center justify-center font-bold text-lg border-b border-white/5 ${car.id === bestRateId ? 'bg-emerald-900/10 text-emerald-400' : 'text-white'}`}>
                                            ₹{car.daily_rate.toLocaleString()}<span className="text-xs font-normal text-luxe-gray ml-1">/day</span>
                                        </div>

                                        {/* Transmission */}
                                        <div className="h-16 flex items-center justify-center text-gray-300 text-sm border-b border-white/5">
                                            {car.transmission || 'Auto'}
                                        </div>

                                        {/* Acceleration */}
                                        <div className={`h-16 flex items-center justify-center font-medium border-b border-white/5 relative ${car.id === bestAccelId ? 'bg-blue-900/10 text-blue-400' : 'text-white'}`}>
                                            {car.specs?.acceleration}s
                                            {car.id === bestAccelId && <Zap className="w-3 h-3 ml-2 absolute right-8 animate-pulse" />}
                                        </div>

                                        {/* HP */}
                                        <div className={`h-16 flex items-center justify-center font-medium border-b border-white/5 relative ${car.id === bestHpId ? 'bg-blue-900/10 text-blue-400' : 'text-white'}`}>
                                            {car.specs?.hp} HP
                                            {car.id === bestHpId && <Star className="w-3 h-3 ml-2 absolute right-8 text-luxe-gold" />}
                                        </div>

                                        {/* Engine */}
                                        <div className="h-16 flex items-center justify-center text-gray-300 text-sm border-b border-white/5">
                                            {car.specs?.engine}
                                        </div>

                                        {/* Features List */}
                                        <div className="h-48 pt-6 px-8 text-left space-y-3">
                                            {(car.features || []).slice(0, 5).map(f => (
                                                <div key={f} className="flex items-start gap-2 text-xs text-gray-400">
                                                    <div className="min-w-[4px] mt-1.5 h-1 w-1 bg-luxe-gold/50 rounded-full" />
                                                    {f}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="p-8">
                                            <Link to={`/booking/new/${car.id}`}>
                                                <Button className="w-full bg-white text-black hover:bg-luxe-gold hover:text-black transition-colors rounded-none font-bold tracking-wider">
                                                    BOOK NOW <span className="ml-2">→</span>
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {cars.length === 0 && <div className="col-span-3 text-center py-20 text-gray-500">Select cars to compare</div>}

                            {/* Empty columns filler if < 3 cars */}
                            {[...Array(3 - cars.length)].map((_, i) => (
                                <div key={i} className="border-r border-white/5 bg-white/[0.01]" />
                            ))}

                        </div>
                    )}
                </div>

                <p className="text-center text-xs text-luxe-gray mt-8 border-t border-white/5 pt-8">
                    © 2024 LUXEDIVE. All prices include insurance.
                </p>
            </div>
        </div>
    )
}
