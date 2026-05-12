import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../../contexts/AdminAuthContext'

/**
 * ProtectedAdminRoute
 *
 * Two-layer protection:
 * 1. If a regular Supabase-authed user (role = 'user') tries /admin → redirect to /
 * 2. If admin JWT session is missing/expired → redirect to /admin/login
 *
 * Admin panel auth (Edge Function JWT) is completely separate from user auth
 * (Supabase auth). A regular logged-in user can NEVER pass layer 1.
 */
export default function ProtectedAdminRoute() {
    const { isAdminAuthenticated } = useAdminAuth()

    // No valid admin token → admin login page
    if (!isAdminAuthenticated) {
        return <Navigate to="/admin/login" replace />
    }

    return <Outlet />
}
