import { Heart, ArrowRight, Check, Bell, BellRing, X, CheckCircle, XCircle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

interface CarCardProps {
  car: {
    id: string
    brand: string
    model: string
    category: string
    images: string[]
    daily_rate: number
    is_available: boolean
    status?: string
    image_url?: string
    make?: string
  }
  isFavorite: boolean
  onToggleFavorite: (carId: string, e: React.MouseEvent) => void
  isCompareSelected?: boolean
  onToggleCompare?: (carId: string, e: React.MouseEvent) => void
  isToggling?: boolean
  variant?: 'grid' | 'list'
  className?: string
  // Notify / Waitlist
  isNotified?: boolean
  onToggleNotify?: (carId: string) => void
}

export default function CarCard({ 
  car, 
  isFavorite, 
  onToggleFavorite, 
  isCompareSelected = false,
  onToggleCompare,
  isToggling = false, 
  variant = 'grid',
  className,
  isNotified = false,
  onToggleNotify,
}: CarCardProps) {
  const navigate = useNavigate()
  const [showNotifyPopup, setShowNotifyPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const displayImage = car.images?.[0] || car.image_url

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowNotifyPopup(false)
      }
    }
    if (showNotifyPopup) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showNotifyPopup])

  const handleNotifyClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowNotifyPopup(prev => !prev)
  }

  const handleConfirmNotify = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleNotify?.(car.id)
    setShowNotifyPopup(false)
  }

  return (
    <div 
      className={cn(
        "group relative bg-[#121212] border border-white/5 rounded-2xl overflow-visible hover:border-white/20 transition-all duration-500",
        variant === 'grid' ? "hover:-translate-y-2" : "flex flex-row",
        className
      )}
    >
      {/* Image Section */}
      <div className={cn(
        "relative overflow-hidden bg-zinc-900 rounded-t-2xl",
        variant === 'grid' ? "aspect-[16/10]" : "w-1/3"
      )}>
        <img
          src={displayImage}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        {/* Action Buttons & Status Indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 group-hover:border-white/30 transition-all shadow-lg">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse",
                  car.is_available ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" : "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                )} />
                <span className="text-[8px] font-black uppercase tracking-widest text-white/90">
                  {car.is_available ? "Available" : "Unavailable"}
                </span>
            </div>

            {/* 360 view button removed */}
            <button
                onClick={(e) => onToggleFavorite(car.id, e)}
                disabled={isToggling}
                className={cn(
                  "p-2 backdrop-blur-md rounded-full transition-all border shadow-lg",
                  isFavorite 
                    ? "bg-red-500 text-white border-red-400" 
                    : "bg-black/40 text-white/70 hover:bg-white hover:text-red-500 border-white/5 hover:border-white"
                )}
            >
                <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
            </button>
        </div>

        {/* Compare Checkbox */}
        {onToggleCompare && (
            <div className={cn(
                "absolute bottom-4 right-4 z-20 transition-all duration-300",
                isCompareSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
            )}>
                <button
                    onClick={(e) => onToggleCompare(car.id, e)}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition-all border",
                        isCompareSelected ? "bg-amber-500 text-black border-amber-500" : "bg-black/80 text-white border-white/20 hover:bg-white hover:text-black hover:border-white"
                    )}
                >
                    {isCompareSelected ? <Check className="w-3 h-3" /> : '+'} Compare
                </button>
            </div>
        )}

      </div>

      {/* Info Section */}
      <div className={cn(
        "p-6 flex flex-col justify-between",
        variant === 'grid' ? "flex-1" : "w-2/3"
      )}>
        <div className="mb-6">
            <h3 className="text-xl font-serif text-white group-hover:text-luxe-gold transition-colors truncate">
            {car.brand || car.make} {car.model}
            </h3>
        </div>
        
        <div className="flex items-end justify-between border-t border-white/5 pt-6">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Rental Price</div>
            <div className="text-2xl font-serif text-white tracking-tight flex items-baseline gap-1">
              <span className="text-base text-luxe-gold">₹</span>
              <span>{car.daily_rate.toLocaleString()}</span>
              <span className="text-[10px] text-gray-600 ml-1 font-sans">/day</span>
            </div>
          </div>

          <div className="flex gap-2">
                <button 
                    onClick={() => navigate(`/fleet/${car.id}`)}
                    className="p-3 border border-white/10 rounded-xl text-gray-400 hover:border-white hover:text-white transition-all bg-white/5"
                    title="View Details"
                >
                    <ArrowRight className="w-4 h-4" />
                </button>
                {car.is_available ? (
                    <Button 
                        onClick={() => navigate(`/booking/${car.id}`)}
                        variant="primary"
                        className="px-6 h-10 uppercase tracking-widest text-[9px] font-bold shadow-xl hover:shadow-luxe-gold/20"
                    >
                        Rent Now
                    </Button>
                ) : (
                    /* NOTIFY BUTTON with inline popup */
                    <div className="relative" ref={popupRef}>
                      <button
                        onClick={handleNotifyClick}
                        className={cn(
                          "px-4 h-10 rounded-xl text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all border shadow-xl",
                          isNotified
                            ? "bg-amber-500 text-black border-amber-400 hover:bg-amber-400"
                            : "bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-black"
                        )}
                      >
                        {isNotified
                          ? <><BellRing className="w-3.5 h-3.5" /> Notified</>
                          : <><Bell className="w-3.5 h-3.5" /> Notify Me</>
                        }
                      </button>

                      {/* SMART FIX: PRO-LEVEL CENTERED MODAL POPUP */}
                      {showNotifyPopup && (
                        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                          <div 
                            className="bg-zinc-900 border border-amber-500/30 rounded-[2.5rem] p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] max-w-md w-full relative animate-in zoom-in-95 slide-in-from-bottom-8 duration-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button 
                                onClick={() => setShowNotifyPopup(false)}
                                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center">
                              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-8">
                                {car.is_available ? (
                                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                                ) : (
                                  <BellRing className="w-10 h-10 text-amber-500" />
                                )}
                              </div>
                              
                              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Availability Alerts</span>
                              <h3 className="text-3xl font-serif text-white mb-4">
                                {car.is_available ? 'Now Available!' : 'Availability Track'}
                              </h3>
                              
                              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                {isNotified
                                  ? `You're currently tracking the ${car.brand} ${car.model}. We'll notify you the moment it's ready for command.`
                                  : `Receive an elite notification the moment this ${car.brand} ${car.model} returns to the fleet and is available for booking.`
                                }
                              </p>

                              <button
                                onClick={handleConfirmNotify}
                                className={cn(
                                  "w-full h-14 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl",
                                  isNotified
                                    ? "bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white"
                                    : "bg-white text-black hover:bg-amber-500 hover:text-white"
                                )}
                              >
                                {isNotified ? '🔕 Stop Notifications' : '🔔 Confirm & Notify Me'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}
