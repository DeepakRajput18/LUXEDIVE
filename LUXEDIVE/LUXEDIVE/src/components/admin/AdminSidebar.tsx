import { Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard, Car, Calendar, Users, FileText,
    Settings, Star, TrendingUp, CreditCard, Heart,
    Activity, BarChart2, Shield, MonitorSmartphone, Search,
    CheckCircle2, UserCheck, MessageSquare
} from 'lucide-react'

const LINKS = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/admin/fleet', label: 'Main Fleet', icon: Car },
    { to: '/admin/fleet/approvals', label: 'Fleet Approvals', icon: CheckCircle2 },
    { to: '/admin/bookings', label: 'Bookings', icon: Calendar },
    { to: '/admin/customers', label: 'User Directory', icon: Users },
    { to: '/admin/favorites', label: 'User Favorites', icon: Heart },
    { to: '/admin/payments', label: 'Payments & Refunds', icon: CreditCard },
    { to: '/admin/chauffeurs', label: 'Chauffeur Stats', icon: UserCheck },
    { to: '/admin/pricing', label: 'Dynamic Pricing', icon: TrendingUp },
    { to: '/admin/inquiries', label: 'Guest Inquiries', icon: MessageSquare },
]

const ANALYTICS_LINKS = [
    { to: '/admin/analytics', label: 'BI Analytics', icon: BarChart2 },
    { to: '/admin/activity', label: 'Live Activity', icon: Activity },
    { to: '/admin/sessions', label: 'Active Sessions', icon: MonitorSmartphone },
    { to: '/admin/search-analytics', label: 'Search Trends', icon: Search },
    { to: '/admin/audit', label: 'Audit Log', icon: Shield },
]

const SYSTEM_LINKS = [
    { to: '/admin/reports', label: 'Financial Reports', icon: FileText },
    { to: '/admin/reviews', label: 'Platform Reviews', icon: Star },
    { to: '/admin/settings', label: 'Global Settings', icon: Settings },
]

interface AdminSidebarProps {
    onClose?: () => void
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
    const location = useLocation()

    const isActive = (to: string, exact?: boolean) =>
        exact ? location.pathname === to : location.pathname.startsWith(to)

    const NavLink = ({ link }: { link: typeof LINKS[0] }) => {
        const Icon = link.icon
        const active = isActive(link.to, link.exact)
        return (
            <Link
                to={link.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${active
                    ? 'bg-luxe-gold text-black font-semibold'
                    : 'text-gray-500 hover:text-white hover:bg-white/5 shadow-sm'
                    }`}
            >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{link.label}</span>
            </Link>
        )
    }

    return (
        <aside className="w-60 bg-[#0B0D10] border-r border-white/5 flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                <p className="text-white font-serif text-lg tracking-[0.2em]">LUXEDIVE</p>
                <p className="text-luxe-gold text-[9px] uppercase tracking-[0.4em] font-medium mt-1">Admin Console</p>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-8 overflow-y-auto scrollbar-hide">
                <div>
                    <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-3 mb-3">Management</h4>
                    <div className="space-y-1">
                        {LINKS.map(link => <NavLink key={link.to} link={link} />)}
                    </div>
                </div>

                <div>
                    <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-3 mb-3">Intelligence</h4>
                    <div className="space-y-1">
                        {ANALYTICS_LINKS.map(link => <NavLink key={link.to} link={link} />)}
                    </div>
                </div>

                <div>
                    <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-3 mb-3">Platform</h4>
                    <div className="space-y-1">
                        {SYSTEM_LINKS.map(link => <NavLink key={link.to} link={link} />)}
                    </div>
                </div>
            </nav>
        </aside>
    )
}
