import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onCheckedChange?: (checked: boolean) => void
    checked?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, checked, onCheckedChange, ...props }, ref) => (
        <label className="relative flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="peer sr-only"
                ref={ref}
                checked={checked}
                onChange={(e) => onCheckedChange?.(e.target.checked)}
                {...props}
            />
            <div
                className={cn(
                    "h-5 w-5 rounded border border-luxe-gray/50 bg-transparent transition-all peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-luxe-gold peer-focus:ring-offset-2 peer-focus:ring-offset-luxe-black",
                    checked ? "border-luxe-gold bg-luxe-gold text-luxe-black" : "hover:border-luxe-gray",
                    className
                )}
            >
               <Check className={cn("h-4 w-4 transform transition-transform", checked ? "scale-100" : "scale-0")} />
            </div>
        </label>
    )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
