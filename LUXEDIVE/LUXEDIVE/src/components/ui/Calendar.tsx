import { useState } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isBefore, startOfDay } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

interface CalendarProps {
  selected?: Date | null
  onSelect?: (date: Date) => void
  minDate?: Date
  className?: string
}

export function Calendar({ selected, onSelect, minDate = startOfDay(new Date()), className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: startDate, end: endDate })

  return (
    <div className={cn("p-3 bg-luxe-black border border-luxe-gray/20 rounded-lg inline-block text-luxe-white", className)}>
      <div className="flex items-center justify-between mb-4 px-2">
        <button onClick={prevMonth} className="p-1 hover:bg-luxe-gray/20 rounded-full transition-colors">
          <ChevronLeft className="w-4 h-4 text-luxe-gray" />
        </button>
        <h2 className="font-semibold text-sm">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={nextMonth} className="p-1 hover:bg-luxe-gray/20 rounded-full transition-colors">
          <ChevronRight className="w-4 h-4 text-luxe-gray" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-luxe-gray w-8 h-8 flex items-center justify-center font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, dayIdx) => {
            const isSelected = selected ? isSameDay(day, selected) : false
            const isToday = isSameDay(day, new Date())
            const isDisabled = isBefore(day, minDate)
            const isCurrentMonth = isSameMonth(day, monthStart)

            return (
                <button
                  key={day.toString()}
                  onClick={() => !isDisabled && onSelect?.(day)}
                  disabled={isDisabled}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center text-sm rounded-full transition-colors relative",
                    !isCurrentMonth && "text-luxe-gray/30",
                    isDisabled && "opacity-20 cursor-not-allowed",
                    isSelected 
                        ? "bg-luxe-gold text-luxe-black font-semibold shadow-sm" 
                        : "hover:bg-luxe-gray/20 text-luxe-white",
                    isToday && !isSelected && "border border-luxe-gold text-luxe-gold"
                  )}
                >
                  {format(day, 'd')}
                </button>
            )
        })}
      </div>
    </div>
  )
}
