import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

export function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const [isVerifiedAdmin, setIsVerifiedAdmin] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function verifyAdmin() {
      if (!user) {
        setChecking(false)
        return
      }

      try {
        // Check if user has ANY entry in admin_roles
        const { data, error } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle()

        if (data && !error) {
          setIsVerifiedAdmin(true)
        }
      } catch (err) {
        console.error('Admin verification failed:', err)
      } finally {
        setChecking(false)
      }
    }

    if (!authLoading) {
      verifyAdmin()
    }
  }, [user, authLoading])

  if (authLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxe-black">
        <Loader2 className="h-8 w-8 animate-spin text-luxe-gold" />
      </div>
    )
  }

  if (!user || !isVerifiedAdmin) {
    // Redirect to home or login if not admin
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
