import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Car, CalendarCheck, Users, FileText, Settings, LogOut, ShieldAlert } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/utils'

export default function AdminLayout() {
  const { signOut } = useAuth()
  const location = useLocation()

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: CalendarCheck, label: 'Bookings', path: '/admin/bookings' },
    { icon: Car, label: 'Fleet Manager', path: '/admin/fleet' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: ShieldAlert, label: 'Disputes', path: '/admin/disputes' },
    { icon: FileText, label: 'Content', path: '/admin/content' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ]

  return (
    <div className="min-h-screen bg-luxe-black pt-16">
      <div className="container mx-auto px-4 py-8">
        
        {/* Admin Header Banner */}
        <div className="mb-8 flex items-center justify-between bg-red-900/10 border border-red-900/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-red-200">
                <ShieldAlert className="h-5 w-5" />
                <span className="font-medium">Administrator Mode</span>
            </div>
            <span className="text-xs text-red-300/60">Authorized Personnel Only</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-luxe-dark/50 border border-luxe-gray/10 rounded-xl p-4">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path
                  const Icon = item.icon
                  return (
                    <Link key={item.path} to={item.path}>
                      <button className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-luxe-gold text-luxe-black font-bold" 
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
                  className="w-full justify-start text-luxe-gray hover:text-luxe-white"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Exit Panel
                </Button>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-4">
             <div className="bg-luxe-dark/30 min-h-[600px] rounded-xl border border-luxe-gray/10 p-6 backdrop-blur-sm">
                <Outlet />
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
