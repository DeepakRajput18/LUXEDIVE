import { cn } from '../../lib/utils'
import { Check } from 'lucide-react'

interface ColorSwatchProps {
    colors: { value: string; label: string; hex: string }[]
    selected: string
    onChange: (value: string) => void
    className?: string
}

export function ColorSwatch({ colors, selected, onChange, className }: ColorSwatchProps) {
    return (
        <div className={cn("flex flex-wrap gap-3", className)}>
            {colors.map((color) => {
                const isSelected = selected === color.value
                return (
                    <button
                        key={color.value}
                        title={color.label}
                        onClick={() => onChange(color.value)}
                        className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center",
                            isSelected ? "border-luxe-white scale-110 shadow-lg" : "border-transparent hover:scale-105"
                        )}
                        style={{ backgroundColor: color.hex }}
                    >
                         {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                    </button>
                )
            })}
        </div>
    )
}
