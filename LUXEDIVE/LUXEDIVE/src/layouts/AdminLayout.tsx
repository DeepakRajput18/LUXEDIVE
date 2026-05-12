import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
    Menu, X, LogOut
} from 'lucide-react'
import { useState } from 'react'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import WorkerStatus from '../components/admin/WorkerStatus'
import AdminSidebar from '../components/admin/AdminSidebar'

export default function AdminLayout() {
    const location = useLocation()
    const navigate = useNavigate()
    const { adminLogout } = useAdminAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleLogout = () => {
        adminLogout()
        navigate('/admin/login', { replace: true })
    }

    return (
        <div className="flex min-h-screen bg-[#080A0D] text-white">
            {/* Desktop sidebar */}
            <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:z-40 md:w-60">
                <AdminSidebar />
                <div className="mt-auto p-4 border-t border-white/5 bg-[#0B0D10]">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-900/10 transition-all border border-transparent hover:border-red-900/30"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/70 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <div className={`fixed inset-y-0 left-0 z-50 w-60 md:hidden transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col bg-[#0B0D10]">
                    <AdminSidebar onClose={() => setSidebarOpen(false)} />
                    <div className="mt-auto p-4 border-t border-white/5">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-red-400"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="flex-1 md:ml-60 flex flex-col min-h-screen relative">
                {/* Top bar */}
                <header className="sticky top-0 z-30 h-14 bg-[#0B0D10]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 shadow-2xl shadow-black/20">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden text-gray-400 hover:text-white transition-colors"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="h-4 w-[1px] bg-white/10 mx-2 hidden md:block" />
                        <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-medium">
                            LUXEDIVE Command Center
                        </span>
                        
                        {/* Worker Health Status */}
                        <div className="hidden lg:block ml-6">
                            <WorkerStatus />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end mr-2 hidden sm:flex">
                            <span className="text-[10px] text-white font-semibold">Admin</span>
                            <span className="text-[8px] text-luxe-gold uppercase tracking-tighter">Super Admin</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-luxe-gold/20 to-luxe-gold/5 border border-luxe-gold/30 flex items-center justify-center shadow-inner">
                            <span className="text-luxe-gold text-xs font-bold">A</span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
