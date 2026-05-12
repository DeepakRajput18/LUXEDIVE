import { Link, useLocation } from 'react-router-dom'
import { 
    LayoutDashboard, 
    Calendar, 
    FileText, 
    CreditCard, 
    Heart, 
    History, 
    HelpCircle, 
    User, 
    LogOut,
    Bell,
    Car
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export const NAVIGATION = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'My Bookings', icon: Calendar, path: '/dashboard/bookings' },
    { name: 'My Vehicles', icon: Car, path: '/dashboard/my-vehicles' },
    { name: 'Payments', icon: CreditCard, path: '/dashboard/payments' },
    { name: 'My Favorites', icon: Heart, path: '/dashboard/favorites' },
    { name: 'My Alerts', icon: Bell, path: '/dashboard/waitlist' },
    { name: 'History', icon: History, path: '/dashboard/history' },
    { name: 'Support', icon: HelpCircle, path: '/dashboard/support' },
]

export default function DashboardSidebar() {
    const location = useLocation()
    const { user, signOut } = useAuth()

    return (
        <aside className="w-72 bg-[#0A0A0A] border-r border-white/5 hidden lg:flex flex-col fixed h-[calc(100vh-5rem)] z-40 overflow-y-auto">
            <div className="p-8 pb-4">
                <h2 className="font-serif text-white text-lg tracking-widest uppercase">My Dashboard</h2>
                {/* <p className="text-[10px] text-luxe-gold font-bold uppercase tracking-widest mt-1">Premium Member</p> */}
            </div>

            <nav className="flex-1 px-4 space-y-1 pb-8">
                {NAVIGATION.map(item => {
                    // Check if active (exact match, or subpaths for specific routes like settings)
                    const isActive = location.pathname === item.path ||
                        (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                    return (
                        <Link
                            to={item.path}
                            key={item.name}
                            className={`px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${isActive
                                ? 'bg-luxe-gold/10 text-luxe-gold border border-luxe-gold/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm tracking-wide font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {user && (
                <div className="p-4 border-t border-white/5 bg-[#0A0A0A]">
                    <div className="flex items-center gap-3 px-4">
                        <Link to="/profile" className="flex items-center gap-3 flex-1 min-w-0 group cursor-pointer transition-all">
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-white/10 group-hover:border-white/30 truncate overflow-hidden">
                                {user?.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-4 h-4 text-gray-300 group-hover:text-white" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user?.user_metadata?.full_name || 'Valued Client'}</p>
                                <p className="text-xs text-gray-500 truncate group-hover:text-gray-400">{user?.email}</p>
                            </div>
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className="text-gray-500 hover:text-red-500 transition-colors p-2"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </aside>
    )
}
