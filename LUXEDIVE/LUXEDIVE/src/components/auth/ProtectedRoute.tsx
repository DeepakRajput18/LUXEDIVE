import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, profile, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen bg-luxe-black flex items-center justify-center text-white">Loading...</div>;
    }

    if (!user) {
        // Redirect to login but save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Note: Admin-specific steering is now handled at the /dashboard route group level
    // to allow admins to browse the public user-facing site (Home, Fleet, etc.)

    return <>{children}</>;
}
