import { createContext, useContext, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

interface AdminAuthContextValue {
    isAdminAuthenticated: boolean
    adminLogin: (token: string) => void
    adminLogout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextValue>({
    isAdminAuthenticated: false,
    adminLogin: () => { },
    adminLogout: () => { },
})

const SESSION_KEY = 'luxedive_admin_token'

function isTokenValid(token: string | null): boolean {
    if (!token) return false
    try {
        const parts = token.split('.')
        if (parts.length !== 3) return false
        const payload = JSON.parse(atob(parts[1]))
        // Check expiry
        if (payload.exp && Date.now() / 1000 > payload.exp) return false
        // Must have role=admin (set by AdminLogin when credentials verified)
        if (payload.role !== 'admin') return false
        return true
    } catch {
        return false
    }
}

export function AdminAuthProvider() {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
        const token = sessionStorage.getItem(SESSION_KEY)
        return isTokenValid(token)
    })

    useEffect(() => {
        const token = sessionStorage.getItem(SESSION_KEY)
        setIsAdminAuthenticated(isTokenValid(token))
    }, [])

    const adminLogin = (token: string) => {
        sessionStorage.setItem(SESSION_KEY, token)
        setIsAdminAuthenticated(true)
    }

    const adminLogout = () => {
        sessionStorage.removeItem(SESSION_KEY)
        setIsAdminAuthenticated(false)
    }

    return (
        <AdminAuthContext.Provider value={{ isAdminAuthenticated, adminLogin, adminLogout }}>
            <Outlet />
        </AdminAuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdminAuth() {
    return useContext(AdminAuthContext)
}
