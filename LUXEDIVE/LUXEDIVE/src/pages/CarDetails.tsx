import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// motion removed

import { carService, type Car } from '../services/carService'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Skeleton } from '../components/ui/Skeleton'
import { Check, Info, ShieldCheck, Fuel, Users, Gauge } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../contexts/AuthContext'

export default function CarDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!id) return
    async function loadCar() {
      try {
        const data = await carService.getCarById(id!)
        setCar(data)
      } catch (err) {
        toast.error("Vehicle not found or unavailable")
        navigate('/fleet')
      } finally {
        setLoading(false)
      }
    }
    loadCar()
  }, [id, navigate])

  const handleBookNow = () => {
    if (!user) {
      toast.info("Please sign in to continue via booking")
      navigate(`/login?redirect=/booking/new/${id}`)
      return
    }
    navigate(`/booking/new/${id}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen">
        <Skeleton className="h-[500px] w-full rounded-xl mb-8" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

  if (!car) return null

  // Safely cast or access specs which are JSON
  const specs = (car.specifications as Record<string, unknown>) || {}
  const images = Array.isArray(car.images) && car.images.length > 0
    ? car.images
    : ['https://placehold.co/1200x800/1e1e1e/d4af37?text=LUXEDIVE+Exterior', 'https://placehold.co/1200x800/1e1e1e/d4af37?text=LUXEDIVE+Interior']

  return (
    <div className="min-h-screen bg-luxe-black">
      {/* IMAGE GALLERY HERO */}
      <div className="relative h-[60vh] bg-luxe-dark">
        <img
          src={images[activeImage]}
          alt={car.model}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-luxe-black to-transparent">
          <div className="container mx-auto flex gap-2 overflow-x-auto pb-4">
            {images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative w-24 h-16 rounded-md overflow-hidden border-2 transition-colors flex-shrink-0 ${activeImage === idx ? 'border-luxe-gold' : 'border-transparent'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <Badge variant="outline" className="border-luxe-gold text-luxe-gold">{car.brand}</Badge>
                <Badge variant="secondary">{car.year}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-luxe-white mb-4">{car.model}</h1>
              <p className="text-luxe-gray text-lg leading-relaxed">
                Experience the pinnacle of {car.category} performance.
                Refined engineering meets absolute comfort in this masterfully crafted vehicle.
              </p>
            </div>

            {/* SPECS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-luxe-dark/50 p-4 rounded-lg border border-luxe-gray/10 text-center">
                <Gauge className="w-6 h-6 text-luxe-gold mx-auto mb-2" />
                <p className="text-xs text-luxe-gray uppercase">Top Speed</p>
                <p className="font-semibold text-luxe-white">{String(specs.top_speed || '250 km/h')}</p>
              </div>
              <div className="bg-luxe-dark/50 p-4 rounded-lg border border-luxe-gray/10 text-center">
                <Fuel className="w-6 h-6 text-luxe-gold mx-auto mb-2" />
                <p className="text-xs text-luxe-gray uppercase">Fuel Type</p>
                <p className="font-semibold text-luxe-white capitalize">{car.fuel_type}</p>
              </div>
              <div className="bg-luxe-dark/50 p-4 rounded-lg border border-luxe-gray/10 text-center">
                <Users className="w-6 h-6 text-luxe-gold mx-auto mb-2" />
                <p className="text-xs text-luxe-gray uppercase">Seats</p>
                <p className="font-semibold text-luxe-white">{car.seating_capacity}</p>
              </div>
              <div className="bg-luxe-dark/50 p-4 rounded-lg border border-luxe-gray/10 text-center">
                <ShieldCheck className="w-6 h-6 text-luxe-gold mx-auto mb-2" />
                <p className="text-xs text-luxe-gray uppercase">Deposit</p>
                <p className="font-semibold text-luxe-white">₹{((car.deposit_amount || 0) / 1000)}k</p>
              </div>
            </div>

            {/* FEATURES LIST */}
            <div>
              <h3 className="text-2xl font-serif text-luxe-white mb-6">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Bluetooth Audio', 'GPS Navigation', 'Leather Interiors', 'Sports Mode', 'Climate Control', 'Premium Sound'].map((feature, i) => (
                  <li key={i} className="flex items-center text-luxe-gray">
                    <Check className="w-5 h-5 text-luxe-gold mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BOOKING SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-luxe-dark p-6 rounded-xl border border-luxe-gold/20 shadow-2xl">
              <div className="text-center mb-6">
                <p className="text-luxe-gray text-sm uppercase tracking-widest mb-1">Daily Rate</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-serif text-luxe-white">₹{car.daily_rate.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm py-2 border-b border-luxe-gray/10">
                  <span className="text-luxe-gray">Deposit (Refundable)</span>
                  <span className="text-luxe-white">₹{(car.deposit_amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-luxe-gray mt-4">
                  <Info className="w-4 h-4 text-luxe-gold flex-shrink-0 mt-0.5" />
                  <p>Rate includes insurance and standard mileage. Fuel costs excluded.</p>
                </div>
              </div>

              <Button size="lg" className="w-full text-lg h-14" onClick={handleBookNow}>
                Book This Car
              </Button>

              <p className="text-center text-xs text-luxe-gray mt-4">
                Free cancellation up to 24h before pickup
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* VEHICLE PHOTO GALLERY — remaining images after primary */}
      {images.length > 1 && (
        <div className="container mx-auto px-4 pb-20">
          <div className="border-t border-white/5 pt-12">
            <h3 className="text-2xl font-serif text-white mb-2">Vehicle Gallery</h3>
            <p className="text-gray-500 text-sm mb-8">All photos of this vehicle provided by the owner</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.slice(1).map((img: string, idx: number) => (
                <a
                  key={idx}
                  href={img}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-video rounded-xl overflow-hidden border border-white/5 hover:border-luxe-gold/40 transition-all"
                >
                  <img
                    src={img}
                    alt={`${car.brand} ${car.model} photo ${idx + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
