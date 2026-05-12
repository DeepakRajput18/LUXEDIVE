import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './Navbar'
import Footer from './Footer'
import { useNotificationsEngine } from '../../hooks/useNotificationsEngine'


export default function RootLayout() {
    useNotificationsEngine()
    const location = useLocation()

    // Footer is only visible on main public pages to keep booking/admin/dashboard clean
    const showFooter = 
      location.pathname === '/' || 
      location.pathname.startsWith('/fleet') || 
      location.pathname.startsWith('/services') || 
      location.pathname.startsWith('/about')

    return (
        <HelmetProvider>
            <div className="min-h-screen bg-luxe-black text-luxe-white font-sans antialiased selection:bg-luxe-gold selection:text-luxe-black">
                <div className="relative flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1">
                        <Outlet />
                    </main>
                    {showFooter && <Footer />}
                </div>
                <Toaster position="top-center" richColors theme="dark" />
            </div>
        </HelmetProvider>
    )
}
