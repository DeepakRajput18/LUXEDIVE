import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'secondary' | 'accent' | 'success' | 'destructive'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          'bg-luxe-gold/20 text-luxe-gold': variant === 'default',
          'border border-luxe-gray/30 text-luxe-gray': variant === 'outline',
          'bg-luxe-gray/20 text-luxe-gray': variant === 'secondary',
          'bg-emerald-900/30 text-emerald-400': variant === 'success',
          'bg-red-900/30 text-red-400': variant === 'destructive',
          'bg-luxe-white text-luxe-black': variant === 'accent',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
