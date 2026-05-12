import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { ToggleSwitch } from '../ui/ToggleSwitch'
import { X, Shield, BarChart2, Target, User } from 'lucide-react'
// Assuming existing icon names, might need adjustment if BarChart2/Target not available
// Lucide react exports: 'BarChart2' -> 'Chart', 'Target' -> 'Target'

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: true,
        marketing: true
    })

    useEffect(() => {
        const hasConsented = localStorage.getItem('luxedive_cookie_consent')
        if (!hasConsented) {
            const timer = setTimeout(() => setIsVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleSave = () => {
        localStorage.setItem('luxedive_cookie_consent', JSON.stringify(preferences))
        setIsVisible(false)
    }

    const handleAcceptAll = () => {
        const all = { necessary: true, analytics: true, marketing: true }
        setPreferences(all)
        localStorage.setItem('luxedive_cookie_consent', JSON.stringify(all))
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="w-full max-w-2xl bg-luxe-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 relative">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-serif text-white mb-2">Privacy Preferences</h2>
                                    <p className="text-sm text-luxe-gray">
                                        At LUXEDIVE, we curate more than just journeys; we curate trust. Customize your digital experience to match your privacy standards.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleSave()} // Treat close as save current
                                    className="p-2 text-luxe-gray hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            {/* User Icon Top Right (Simulated as per design) */}
                            <div className="absolute top-6 right-16 hidden md:block">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                                    <User className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-medium text-white mb-1">Cookie Consent Manager</h3>
                                <p className="text-xs text-luxe-gray">Manage your privacy settings for a tailored luxury experience in Ahmedabad.</p>
                            </div>

                            {/* Category 1 */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="mt-1">
                                    <Shield className="w-6 h-6 text-luxe-gold" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-white font-medium">Necessary Cookies</h4>
                                            <span className="text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20">REQUIRED</span>
                                        </div>
                                        <ToggleSwitch checked={true} onChange={() => { }} disabled={true} className="opacity-50" />
                                    </div>
                                    <p className="text-sm text-luxe-gray leading-relaxed">
                                        Essential for the website to function, ensuring secure booking transactions and vehicle availability checks. These cannot be disabled.
                                    </p>
                                </div>
                            </div>

                            {/* Category 2 */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="mt-1">
                                    <BarChart2 className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="text-white font-medium">Performance & Analytics</h4>
                                        <ToggleSwitch
                                            checked={preferences.analytics}
                                            onChange={(v) => setPreferences({ ...preferences, analytics: v })}
                                        />
                                    </div>
                                    <p className="text-sm text-luxe-gray leading-relaxed">
                                        Allows us to measure visits and traffic sources so we can improve the performance of our luxury fleet catalog.
                                    </p>
                                </div>
                            </div>

                            {/* Category 3 */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="mt-1">
                                    <Target className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="text-white font-medium">Marketing & Personalization</h4>
                                        <ToggleSwitch
                                            checked={preferences.marketing}
                                            onChange={(v) => setPreferences({ ...preferences, marketing: v })}
                                        />
                                    </div>
                                    <p className="text-sm text-luxe-gray leading-relaxed">
                                        Enables tailored offers for premium vehicles in Ahmedabad based on your preferences and travel history.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-black/20 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-xs text-luxe-gray flex gap-4">
                                <Link to="/privacy" className="hover:text-white underline">Privacy Policy</Link>
                                <Link to="/terms" className="hover:text-white underline">Terms of Service</Link>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button variant="outline" onClick={handleSave} className="flex-1 md:flex-none border-white/20 text-white hover:bg-white hover:text-black">
                                    Save Preferences
                                </Button>
                                <Button onClick={handleAcceptAll} className="flex-1 md:flex-none bg-white text-black hover:bg-luxe-gold">
                                    Accept All Cookies
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
