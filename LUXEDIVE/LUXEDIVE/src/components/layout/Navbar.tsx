import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import {
    User,
    LogOut,
    Settings,
    CreditCard,
    Calendar,
    ChevronDown,
    Menu,
    X,
    Heart,
    Plus
} from 'lucide-react';
import ProfileDropdown from '../dashboard/ProfileDropdown';
import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import type { Profile } from '../../types/app.types';

export default function Navbar() {
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileRef]);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
        setIsProfileOpen(false);
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const getFirstName = (profile: Profile | null) => {
        if (!profile?.full_name) return 'User';
        return profile.full_name.split(' ')[0];
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Fleet', path: '/fleet' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        ...(user ? [{ name: 'Add Vehicle', path: '/add-vehicle' }] : []),
    ];

    return (
        <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-luxe-black/80 backdrop-blur-md transition-all duration-300">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo & Mobile Menu Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                    <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-white">
                        LUXE<span className="text-luxe-gold">DIVE</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                "text-sm font-medium transition-all duration-300 relative py-1",
                                isActive(link.path)
                                    ? "text-luxe-gold"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            {link.name}
                            {isActive(link.path) && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-luxe-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] rounded-full" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Removed standalone Add Vehicle Button */}

                {/* Auth Actions */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <ThemeToggle />
                    {user ? (
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 group focus:outline-none"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs text-gray-400">Welcome,</p>
                                    <p className="text-sm font-medium text-white group-hover:text-luxe-gold transition-colors">
                                        {getFirstName(profile)}
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-full bg-luxe-surface border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-luxe-gold/50 transition-colors">
                                        {profile?.avatar_url ? (
                                            <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                                        ) : (
                                            <User className="h-5 w-5 text-luxe-gold" />
                                        )}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-luxe-black rounded-full p-[2px] border border-white/10">
                                        <ChevronDown className="h-3 w-3 text-gray-400" />
                                    </div>
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <ProfileDropdown 
                                    user={user} 
                                    profile={profile} 
                                    onSignOut={handleSignOut} 
                                    onClose={() => setIsProfileOpen(false)} 
                                />
                            )}
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="ghost" className="text-gray-300 hover:text-white">Log In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="primary" className="shadow-[0_0_15px_rgba(212,175,55,0.3)]">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-[#0B0D10] border-b border-white/10 animate-in slide-in-from-top-5">
                    <div className="p-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "block text-lg font-medium py-2 border-b border-white/5",
                                    isActive(link.path) ? "text-luxe-gold" : "text-gray-400"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {!user && (
                            <div className="pt-4 flex flex-col gap-3">
                                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center">Log In</Button>
                                </Link>
                                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="primary" className="w-full justify-center">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
