import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'dark',
    toggleTheme: () => { },
    setTheme: () => { },
})

const STORAGE_KEY = 'luxedive-theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Read the theme that was already applied by the anti-flicker script
    const [theme, setThemeState] = useState<Theme>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
            return saved === 'light' ? 'light' : 'dark'
        } catch {
            return 'dark'
        }
    })

    // Keep <html> class and localStorage in sync whenever theme changes
    useEffect(() => {
        const html = document.documentElement
        html.classList.remove('dark', 'light')
        html.classList.add(theme)
        try {
            localStorage.setItem(STORAGE_KEY, theme)
        } catch { }
    }, [theme])

    const setTheme = (next: Theme) => setThemeState(next)

    const toggleTheme = () =>
        setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    return useContext(ThemeContext)
}
