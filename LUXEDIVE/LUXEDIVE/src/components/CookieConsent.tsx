import { useState } from 'react'
import { Button } from './ui/Button'
import { Shield, BarChart, X, Target, User, Check, Settings } from 'lucide-react'

// This would typically be a modal overlaid on the app, creating as a standalone page component for dev/demo
export default function CookieConsent() {
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: true
  })

  return (
    <div className="min-h-screen bg-black/95 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">

      <div className="w-full max-w-2xl bg-[#0F0F0F] rounded-2xl border border-white/5 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="p-8 border-b border-white/5 relative">
          <div className="absolute top-8 right-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-serif text-white mb-2">Privacy Preferences</h1>
          <p className="text-gray-400 text-sm font-light leading-relaxed max-w-lg">
            At LUXEDIVE, we curate more than just journeys; we curate trust. Customize your digital experience to match your privacy standards.
          </p>
        </div>

        {/* Content */}
        <div className="p-8 bg-[#121212]">
          <div className="mb-8">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-1 flex items-center gap-2">
              <Settings className="w-4 h-4 text-luxe-gold" /> Cookie Consent Manager
            </h2>
            <p className="text-xs text-gray-500">Manage your privacy settings for a tailored luxury experience in Ahmedabad.</p>
          </div>

          <div className="space-y-4">

            {/* Category 1 */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 flex gap-4 opacity-70">
              <div className="mt-1">
                <Shield className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-bold text-sm">Necessary Cookies</h3>
                  <span className="bg-white/10 text-gray-300 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">Required</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Essential for the website to function, ensuring secure booking transactions and vehicle availability checks. These cannot be disabled.
                </p>
              </div>
              <div className="w-10 h-6 bg-gray-700 rounded-full opacity-50 cursor-not-allowed relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-gray-400 rounded-full" />
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 flex gap-4">
              <div className="mt-1">
                <BarChart className="w-5 h-5 text-[#4169E1]" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-bold text-sm">Performance & Analytics</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Allows us to measure visits and traffic sources so we can improve the performance of our luxury fleet catalog.
                </p>
              </div>
              <button
                onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                className={`w-10 h-6 rounded-full relative transition-colors ${preferences.analytics ? 'bg-[#4169E1]' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${preferences.analytics ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            {/* Category 3 */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 flex gap-4">
              <div className="mt-1">
                <Target className="w-5 h-5 text-[#4169E1]" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-bold text-sm">Marketing & Personalization</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Enables tailored offers for premium vehicles in Ahmedabad based on your preferences and travel history.
                </p>
              </div>
              <button
                onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                className={`w-10 h-6 rounded-full relative transition-colors ${preferences.marketing ? 'bg-[#4169E1]' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${preferences.marketing ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-[#0F0F0F] border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-gray-600 uppercase tracking-widest space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none border-white/10 text-white hover:bg-white hover:text-black uppercase tracking-widest text-[10px] font-bold h-10 px-6">
              Save Preferences
            </Button>
            <Button className="flex-1 md:flex-none bg-white text-black hover:bg-luxe-gold uppercase tracking-widest text-[10px] font-bold h-10 px-6 shadow-lg shadow-white/10">
              Accept All Cookies
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
