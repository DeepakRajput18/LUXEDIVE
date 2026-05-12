import { Link } from 'react-router-dom';
import { 
    User, 
    LogOut, 
    Settings, 
    CreditCard, 
    Calendar, 
    Heart,
    LayoutDashboard
} from 'lucide-react';
import type { Profile } from '../../types/app.types';

interface ProfileDropdownProps {
    user: any;
    profile: Profile | null;
    onSignOut: () => void;
    onClose: () => void;
}

export default function ProfileDropdown({ user, profile, onSignOut, onClose }: ProfileDropdownProps) {
    return (
        <div className="absolute right-0 mt-4 w-60 bg-[#12151A] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
            <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                <p className="text-white font-medium truncate">{profile?.full_name || 'User'}</p>
                <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[10px] text-gray-500 truncate font-mono flex-1">{user.email}</p>
                </div>
            </div>
            
            <div className="p-2 space-y-1">
                <Link
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-luxe-gold rounded-lg transition-colors group"
                    onClick={onClose}
                >
                    <User className="h-4 w-4 group-hover:scale-110 transition-transform" /> My Profile
                </Link>
                <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-luxe-gold rounded-lg transition-colors group"
                    onClick={onClose}
                >
                    <LayoutDashboard className="h-4 w-4 group-hover:scale-110 transition-transform" /> My Dashboard
                </Link>
                <Link
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-luxe-gold rounded-lg transition-colors group"
                    onClick={onClose}
                >
                    <Settings className="h-4 w-4 group-hover:scale-110 transition-transform" /> Settings
                </Link>
            </div>
            
            <div className="p-2 border-t border-white/5 bg-black/20">
                <button
                    onClick={onSignOut}
                    className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-900/10 hover:text-red-300 rounded-lg transition-colors"
                >
                    <LogOut className="h-4 w-4" /> Log Out
                </button>
            </div>
        </div>
    );
}
