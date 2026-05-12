import { Outlet, Link } from 'react-router-dom';
import { Toaster } from 'sonner';

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-luxe-black text-luxe-white font-sans antialiased selection:bg-luxe-gold selection:text-luxe-black flex flex-col">
            {/* Minimal Header with Logo only */}
            <header className="absolute top-0 left-0 w-full p-6 z-50">
                <Link to="/" className="text-2xl font-serif text-luxe-white tracking-widest hover:opacity-80 transition-opacity">
                    LUXEDIVE
                </Link>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <Toaster position="top-center" richColors theme="dark" />
        </div>
    );
}
