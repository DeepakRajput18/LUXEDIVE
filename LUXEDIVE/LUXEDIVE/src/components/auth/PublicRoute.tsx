import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Redirects authenticated users away from public auth pages (login/signup)
export default function PublicRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen bg-luxe-black flex items-center justify-center text-white">Loading...</div>;
    }

    if (user) {
        // Redirect to dashboard or home if already logged in
        const from = (location.state as any)?.from?.pathname || '/';
        return <Navigate to={from} replace />;
    }

    return <>{children}</>;
}
