import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { useAuth } from '../../contexts/AuthContext'
import { User, Menu } from 'lucide-react'

export default function Header() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-luxe-gray/20 bg-luxe-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif text-luxe-gold tracking-tight">
          LUXE<span className="text-luxe-white">DIVE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/fleet" className="text-sm font-medium text-luxe-gray hover:text-luxe-gold transition-colors">
            Fleet
          </Link>
          <Link to="/services" className="text-sm font-medium text-luxe-gray hover:text-luxe-gold transition-colors">
            Services
          </Link>
          <Link to="/membership" className="text-sm font-medium text-luxe-gray hover:text-luxe-gold transition-colors">
            Membership
          </Link>
          <Link to="/about" className="text-sm font-medium text-luxe-gray hover:text-luxe-gold transition-colors">
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Log Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Toggle (Functionality later) */}
          <button className="md:hidden text-luxe-white p-2">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
