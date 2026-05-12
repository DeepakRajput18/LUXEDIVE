import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface ThemeToggleProps {
    className?: string
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`
        relative w-8 h-8 flex items-center justify-center rounded-full
        border transition-all duration-300
        ${isDark
                    ? 'border-white/10 bg-white/5 text-amber-400 hover:bg-white/10 hover:border-luxe-gold/30'
                    : 'border-black/10 bg-black/5 text-amber-600 hover:bg-black/10 hover:border-luxe-gold/40'
                }
        ${className}
      `}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            {/* Smooth icon swap */}
            <span
                className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                style={{ opacity: isDark ? 1 : 0, transform: isDark ? 'rotate(0deg)' : 'rotate(90deg)' }}
            >
                <Sun className="w-3.5 h-3.5" />
            </span>
            <span
                className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                style={{ opacity: isDark ? 0 : 1, transform: isDark ? 'rotate(-90deg)' : 'rotate(0deg)' }}
            >
                <Moon className="w-3.5 h-3.5" />
            </span>
        </button>
    )
}
