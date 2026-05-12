import { Outlet, Navigate } from 'react-router-dom'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import Breadcrumbs from '../components/dashboard/Breadcrumbs'
import { useAuth } from '../contexts/AuthContext'

export default function DashboardLayout() {
    const { profile } = useAuth()

    // Admin redirect removed to allow hybrid access
    // Admins can now use the customer dashboard normally.

    return (
        <div className="min-h-screen bg-luxe-black text-white pt-20 flex">
            {/* UNIFIED SIDEBAR */}
            <DashboardSidebar />

            {/* MAIN CONTENT WRAPPER */}
            <div className="flex-1 lg:ml-72 p-8 lg:p-12 min-h-[calc(100vh-5rem)]">
                <Breadcrumbs />
                <Outlet />
            </div>
        </div>
    )
}
