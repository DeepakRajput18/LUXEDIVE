import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../contexts/AuthContext'
import { Heart, Trash2, ArrowRight, Info } from 'lucide-react'
import { Skeleton } from '../../components/ui/Skeleton'
import { Button } from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import CarCard from '../../components/car/CarCard'

interface FavoriteCar {
  car_id: string
  brand: string
  model: string
  category: string
  images: string[]
  price_per_day: number
  available: boolean
  favorited_at: string
}

export default function Favorites() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState<FavoriteCar[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadFavorites()
    }
  }, [user])

  const loadFavorites = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .rpc('get_user_favorites', {
          p_user_id: user?.id
        })

      if (error) throw error

      setFavorites(data || [])
    } catch (err) {
      console.error('Error loading favorites:', err)
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = async (carId: string) => {
    try {
      const { error } = await supabase
        .rpc('toggle_favorite_car', {
          p_user_id: user?.id,
          p_car_id: carId
        })

      if (error) throw error

      // Remove from state
      setFavorites(favorites.filter(f => f.car_id !== carId))
    } catch (err) {
      console.error('Error removing favorite:', err)
    }
  }

  return (
    <div className="p-0 space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif text-white">My Favorites</h1>
          <p className="text-gray-400 mt-2 font-light">Your curated collection of luxury and power.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-full px-6 py-2 flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-sm font-serif text-white">{favorites.length} Saved</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-[400px] rounded-2xl bg-[#121212] border border-white/5" />)}
        </div>
      ) : favorites.length === 0 ? (
        <div className="bg-[#121212] border border-white/5 rounded-2xl py-32 text-center">
            <Heart className="w-16 h-16 text-gray-700 mx-auto mb-6 transition-all duration-1000 animate-pulse" />
            <h2 className="text-3xl font-serif text-white mb-4">Your garage is empty</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-10 font-light leading-relaxed">Explore our premier fleet and add your favorite vehicles here for easy access and quick booking.</p>
            <Button onClick={() => navigate('/fleet')} variant="primary" className="px-10 h-12 uppercase tracking-widest text-xs font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Browse Fleet
            </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map(car => (
            <CarCard 
                key={car.car_id}
                car={{
                    ...car,
                    id: car.car_id,
                    daily_rate: car.price_per_day,
                    is_available: car.available
                } as any}
                isFavorite={true}
                onToggleFavorite={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}
