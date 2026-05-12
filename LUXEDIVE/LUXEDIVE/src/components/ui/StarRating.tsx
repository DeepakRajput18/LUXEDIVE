import { Star, StarHalf } from 'lucide-react'
import { cn } from '../../lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  readOnly?: boolean
  onChange?: (rating: number) => void
  className?: string
}

export default function StarRating({ 
  rating, 
  max = 5, 
  size = 'md', 
  readOnly = false,
  onChange,
  className 
}: StarRatingProps) {
  const stars = []
  
  for (let i = 1; i <= max; i++) {
    const filled = i <= Math.floor(rating)
    const half = !filled && i === Math.ceil(rating) && rating % 1 !== 0
    
    stars.push(
      <button
        key={i}
        type="button"
        disabled={readOnly}
        onClick={() => onChange?.(i)}
        className={cn(
          "transition-colors focus:outline-none",
          readOnly ? "cursor-default" : "cursor-pointer hover:scale-110 transform transition-transform",
          size === 'sm' && "p-0.5",
          size === 'md' && "p-1",
          size === 'lg' && "p-1.5"
        )}
      >
        <Star 
           className={cn(
             "fill-current",
             filled || half ? "text-luxe-gold" : "text-luxe-gray/30",
             size === 'sm' && "w-3 h-3",
             size === 'md' && "w-5 h-5",
             size === 'lg' && "w-8 h-8",
           )}
           fill={filled ? "currentColor" : "none"}
        />
      </button>
    )
  }

  return (
    <div className={cn("flex items-center", className)}>
      {stars}
      {!readOnly && <span className="ml-2 text-xs text-luxe-gray">(Click to rate)</span>}
    </div>
  )
}
