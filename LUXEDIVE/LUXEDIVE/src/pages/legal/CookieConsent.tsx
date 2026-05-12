import { useState } from 'react'
import { Shield, Cookie, Check, X, ChevronRight, Lock as LockIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

export default function CookieConsent() {
    const [preferences, setPreferences] = useState({
        essential: true, // Always true
        functional: true,
        analytics: false,
        marketing: false,
    })

    const handleSave = () => {
        // In a real app, save to localStorage or backend
        toast.success("Cookie preferences updated successfully")
    }

    const togglePreference = (key: keyof typeof preferences) => {
        if (key === 'essential') return
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const COOKIE_TYPES = [
        {
            id: 'essential',
            title: 'Essential Cookies',
            description: 'These cookies are necessary for the website to function (e.g., login sessions, security). They cannot be switched off.',
            locked: true
        },
        {
            id: 'functional',
            title: 'Functional Cookies',
            description: 'Enable enhanced functionality and personalization, such as remembering your language or region preferences.',
            locked: false
        },
        {
            id: 'analytics',
            title: 'Analytics Cookies',
            description: 'Help us understand how visitors interact with the website by collecting and reporting information anonymously.',
            locked: false
        },
        {
            id: 'marketing',
            title: 'Marketing Cookies',
            description: 'Used to track visitors across websites to display relevant ads and marketing campaigns.',
            locked: false
        }
    ] as const

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-luxe-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Cookie className="w-8 h-8 text-luxe-gold" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif mb-4">Cookie Preference Center</h1>
                    <p className="text-luxe-gray max-w-2xl mx-auto">
                        We use cookies to enhance your experience, analyze site traffic, and serve personalized content. You can manage your preferences below.
                    </p>
                </div>

                {/* Main Control Panel */}
                <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                    {/* Intro Section */}
                    <div className="p-8 border-b border-white/10 bg-gradient-to-r from-luxe-gold/5 v-transparent">
                        <div className="flex items-start gap-4">
                            <Shield className="w-6 h-6 text-luxe-gold flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xl font-serif mb-2">Your Privacy Matters</h3>
                                <p className="text-sm text-luxe-gray leading-relaxed">
                                    At LUXEDIVE, we prioritize your data privacy. You have full control over how your data is collected and used.
                                    Review our <Link to="/legal/privacy" className="text-luxe-gold hover:underline">Privacy Policy</Link> for comprehensive details.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cookie Toggles */}
                    <div className="divide-y divide-white/5">
                        {COOKIE_TYPES.map((type) => (
                            <div key={type.id} className="p-8 flex flex-col md:flex-row gap-6 md:items-center hover:bg-white/[0.02] transition-colors">
                                <div className="flex-1">
                                    <h4 className="text-lg font-medium flex items-center gap-2 mb-2">
                                        {type.title}
                                        {type.locked && <LockIcon className="w-3 h-3 text-luxe-gray" />}
                                    </h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">{type.description}</p>
                                </div>

                                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                    <input
                                        type="checkbox"
                                        checked={preferences[type.id as keyof typeof preferences]}
                                        onChange={() => togglePreference(type.id as keyof typeof preferences)}
                                        disabled={type.locked}
                                        className="sr-only peer"
                                    />
                                    <div className={`w-14 h-8 rounded-full peer peer-focus:outline-none transition-colors duration-300 ease-in-out
                                        ${type.locked ? 'bg-emerald-900/50 cursor-not-allowed' : 'bg-gray-700 peer-checked:bg-luxe-gold'}
                                    `}></div>
                                    <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out flex items-center justify-center
                                        ${preferences[type.id as keyof typeof preferences] ? 'translate-x-6' : 'translate-x-0'}
                                    `}>
                                        {preferences[type.id as keyof typeof preferences]
                                            ? <Check className="w-3 h-3 text-black" />
                                            : <X className="w-3 h-3 text-gray-400" />
                                        }
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 bg-[#0A0A0A] border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <Button
                            variant="outline"
                            className="w-full md:w-auto border-white/10 text-luxe-gray hover:text-white"
                            onClick={() => setPreferences({ essential: true, functional: false, analytics: false, marketing: false })}
                        >
                            Decline All
                        </Button>

                        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                            <Button
                                variant="outline"
                                className="border-white/20 hover:bg-white hover:text-black w-full md:w-auto"
                                onClick={() => setPreferences({ essential: true, functional: true, analytics: true, marketing: true })}
                            >
                                Accept All
                            </Button>
                            <Button
                                className="bg-luxe-gold text-black hover:bg-luxe-gold/90 w-full md:w-auto px-8"
                                onClick={handleSave}
                            >
                                Save Preferences
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Additional Links */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <Link to="/legal/terms" className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                        <h5 className="font-serif mb-1 group-hover:text-luxe-gold transition-colors">Terms of Service</h5>
                        <p className="text-xs text-luxe-gray">Read our usage agreements</p>
                    </Link>
                    <Link to="/legal/privacy" className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                        <h5 className="font-serif mb-1 group-hover:text-luxe-gold transition-colors">Privacy Policy</h5>
                        <p className="text-xs text-luxe-gray">How we handle your data</p>
                    </Link>
                    <Link to="/contact" className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                        <h5 className="font-serif mb-1 group-hover:text-luxe-gold transition-colors">Data Request</h5>
                        <p className="text-xs text-luxe-gray">Request your personal data</p>
                    </Link>
                </div>

            </div>
        </div>
    )
}
