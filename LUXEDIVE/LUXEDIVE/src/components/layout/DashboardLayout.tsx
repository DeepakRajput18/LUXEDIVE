import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Car, Clock, Settings, LogOut, Map, FileText, Wallet, Gift, Bell, MapPin, Shield } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/utils'

export default function DashboardLayout() {
  const { signOut } = useAuth()
  const location = useLocation()

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Car, label: 'My Bookings', path: '/dashboard/bookings' },
    { icon: Map, label: 'Active Rental', path: '/rental/active/tracking' }, // Using general active route or dynamic redirect
    { icon: Wallet, label: 'Wallet', path: '/dashboard/wallet' },
    { icon: Gift, label: 'Rewards', path: '/dashboard/rewards' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: MapPin, label: 'Addresses', path: '/dashboard/addresses' },
    { icon: Shield, label: 'Security', path: '/dashboard/security' },
    { icon: Settings, label: 'Settings', path: '/dashboard/profile' },
  ]

  return (
    <div className="min-h-screen bg-luxe-black pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-luxe-dark/50 border border-luxe-gray/10 rounded-xl p-4">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path
                  const Icon = item.icon
                  return (
                    <Link key={item.path} to={item.path}>
                      <button className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-luxe-gold/10 text-luxe-gold border border-luxe-gold/20" 
                          : "text-luxe-gray hover:text-luxe-white hover:bg-luxe-gray/5"
                      )}>
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-8 pt-8 border-t border-luxe-gray/10">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-3">
             <div className="bg-luxe-dark/30 min-h-[500px] rounded-xl border border-luxe-gray/10 p-6 backdrop-blur-sm">
                <Outlet />
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
