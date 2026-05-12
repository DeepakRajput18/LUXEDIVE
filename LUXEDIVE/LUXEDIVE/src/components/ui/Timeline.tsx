import { cn } from '../../lib/utils'
import { CheckCircle2, Circle } from 'lucide-react'

interface TimelineEvent {
  title: string
  description?: string
  date?: string
  status: 'completed' | 'current' | 'upcoming'
}

interface TimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn("space-y-6 relative", className)}>
      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-luxe-gray/20 -z-10" />
      
      {events.map((event, idx) => (
        <div key={idx} className="flex gap-4">
            <div className={cn(
                "rounded-full bg-luxe-black border-2 z-10 flex items-center justify-center w-6 h-6 flex-shrink-0 mt-0.5",
                event.status === 'completed' ? "border-luxe-gold text-luxe-gold" : 
                event.status === 'current' ? "border-luxe-gold animate-pulse text-transparent" : "border-luxe-gray/40 bg-luxe-black"
            )}>
                {event.status === 'completed' && <div className="w-2 h-2 rounded-full bg-luxe-gold" />}
                {event.status === 'current' && <div className="w-2 h-2 rounded-full bg-luxe-gold" />}
            </div>
            
            <div>
                <h4 className={cn(
                    "text-sm font-medium leading-none mb-1",
                    event.status === 'upcoming' ? "text-luxe-gray" : "text-luxe-white"
                )}>{event.title}</h4>
                {event.description && <p className="text-xs text-luxe-gray/70 mb-1">{event.description}</p>}
                {event.date && <p className="text-[10px] uppercase text-luxe-gold font-medium">{event.date}</p>}
            </div>
        </div>
      ))}
    </div>
  )
}
