import { cn } from '../../lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  color?: 'gold' | 'emerald' | 'blue'
}

export function ProgressBar({ value, max = 100, className, color = 'gold' }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn("w-full h-2 bg-luxe-gray/20 rounded-full overflow-hidden", className)}>
      <div 
        className={cn(
            "h-full transition-all duration-500 ease-in-out rounded-full",
            color === 'gold' && "bg-luxe-gold",
            color === 'emerald' && "bg-emerald-500",
            color === 'blue' && "bg-blue-500"
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
