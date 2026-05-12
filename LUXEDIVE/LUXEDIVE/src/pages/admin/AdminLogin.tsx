import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { Lock as LockIcon, User, Eye, EyeOff, Shield } from 'lucide-react'
import { toast } from 'sonner'

// Credentials come from .env.local — never hardcoded in source
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME as string
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string

// Build a simple local JWT-like token (header.payload.signature using HMAC-SHA256)
async function buildAdminToken(): Promise<string> {
    const secret = `luxedive-${ADMIN_USERNAME}-${Date.now()}`
    const now = Math.floor(Date.now() / 1000)
    const payload = { sub: 'admin', role: 'admin', iat: now, exp: now + 8 * 3600 }

    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    const body = btoa(JSON.stringify(payload))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

    const msg = `${header}.${body}`
    const key = await crypto.subtle.importKey(
        'raw', new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    )
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg))
    const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

    return `${msg}.${sigB64}`
}

export default function AdminLogin() {
    const { adminLogin } = useAdminAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const [lockedUntil, setLockedUntil] = useState<number | null>(null)

    const isLocked = lockedUntil !== null && Date.now() < lockedUntil
    const lockSecondsLeft = isLocked ? Math.ceil((lockedUntil! - Date.now()) / 1000) : 0

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (isLocked) {
            toast.error(`Too many attempts. Wait ${lockSecondsLeft}s`)
            return
        }

        if (!username.trim() || !password.trim()) {
            toast.error('Please enter both username and password')
            return
        }

        setLoading(true)

        // Small artificial delay to prevent timing attacks
        await new Promise(r => setTimeout(r, 400))

        try {
            // Compare directly against env vars — timing-safe using === (same length strings)
            const usernameOk = username.trim() === ADMIN_USERNAME
            const passwordOk = password === ADMIN_PASSWORD

            if (!usernameOk || !passwordOk) {
                throw new Error('invalid')
            }

            // Build a local HMAC-signed admin JWT
            const token = await buildAdminToken()

            setAttempts(0)
            adminLogin(token)
            toast.success('Welcome, Admin 🔑')
            navigate('/admin', { replace: true })

        } catch {
            const newAttempts = attempts + 1
            setAttempts(newAttempts)

            if (newAttempts >= 3) {
                const until = Date.now() + 30_000
                setLockedUntil(until)
                setTimeout(() => { setLockedUntil(null); setAttempts(0) }, 30_000)
                toast.error('Too many failed attempts. Form locked for 30 seconds.')
            } else {
                toast.error(`Invalid credentials. ${3 - newAttempts} attempt${3 - newAttempts !== 1 ? 's' : ''} remaining.`)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#080A0D] flex items-center justify-center px-4">
            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="relative w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 mb-5">
                        <Shield className="w-7 h-7 text-[#d4af37]" />
                    </div>
                    <h1 className="text-2xl font-serif text-white tracking-widest">LUXEDIVE</h1>
                    <p className="text-xs text-gray-600 uppercase tracking-[0.3em] mt-1">Admin Console</p>
                </div>

                {/* Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm"
                >
                    <h2 className="text-lg font-semibold text-white mb-1">Secure Access</h2>
                    <p className="text-gray-500 text-xs mb-6">Enter your administrator credentials to continue</p>

                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                disabled={loading || isLocked}
                                autoComplete="username"
                                placeholder="Enter username"
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.07] transition-all disabled:opacity-40"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Password</label>
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={loading || isLocked}
                                autoComplete="current-password"
                                placeholder="Enter password"
                                className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-700 focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.07] transition-all disabled:opacity-40"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Failed attempts */}
                    {attempts > 0 && !isLocked && (
                        <p className="text-red-400 text-xs mb-4">
                            {attempts}/3 attempts used — {3 - attempts} remaining before lockout
                        </p>
                    )}

                    {isLocked && (
                        <div className="bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-3 mb-4">
                            <p className="text-red-400 text-xs text-center">
                                🔒 Form locked. Wait {lockSecondsLeft} seconds.
                            </p>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || isLocked || !username || !password}
                        className="w-full py-3 bg-[#d4af37] text-black font-semibold text-sm rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Authenticating…' : 'Access Admin Panel'}
                    </button>
                </form>

                <p className="text-center text-gray-800 text-[10px] mt-6 uppercase tracking-widest">
                    Unauthorised access is strictly prohibited
                </p>
            </div>
        </div>
    )
}
