import { useState } from 'react'
import { Plus, Trash2, Save, ShoppingBag, Shield, Bell, Globe, MapPin, CreditCard, Clock } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { toast } from 'sonner'

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState('pricing')
    const [loading, setLoading] = useState(false)

    // Mock Data State
    const [pricingRules, setPricingRules] = useState([
        { id: 1, name: 'Weekend Surge', multiplier: 1.2, active: true },
        { id: 2, name: 'Holiday Season', multiplier: 1.5, active: false },
        { id: 3, name: 'Long Duration Discount (7+ Days)', multiplier: 0.85, active: true },
    ])

    const [globalConfig, setGlobalConfig] = useState({
        siteName: 'LUXEDIVE',
        supportEmail: 'concierge@luxedive.com',
        supportPhone: '+91 98765 43210',
        currency: 'INR',
        taxRate: 18,
        depositAmount: 50000,
    })

    const handleSaveConfig = () => {
        setLoading(true)
        // Simulate API Call
        setTimeout(() => {
            setLoading(false)
            toast.success('System configuration updated successfully')
        }, 1000)
    }

    const toggleRule = (id: number) => {
        setPricingRules(pricingRules.map(rule =>
            rule.id === id ? { ...rule, active: !rule.active } : rule
        ))
        toast.success('Pricing rule status updated')
    }

    return (
        <div className="space-y-8 text-white min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-serif text-white">System Settings</h1>
                    <p className="text-luxe-gray mt-2">Manage global configurations, pricing rules, and security policies.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="border-white/10 hover:bg-white hover:text-black">
                        Discard Changes
                    </Button>
                    <Button onClick={handleSaveConfig} disabled={loading} className="bg-luxe-gold text-black hover:bg-luxe-gold/90">
                        {loading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Configuration</>}
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-white/10 text-sm font-medium">
                {['pricing', 'general', 'notifications', 'security'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 px-2 uppercase tracking-widest transition-colors ${activeTab === tab
                                ? 'text-luxe-gold border-b-2 border-luxe-gold'
                                : 'text-luxe-gray hover:text-white'
                            }`}
                    >
                        {tab.replace('-', ' ')}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Settings Panel */}
                <div className="lg:col-span-2 space-y-8">

                    {activeTab === 'pricing' && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-8">
                            <div>
                                <h3 className="text-xl font-serif mb-4 flex items-center gap-3">
                                    <ShoppingBag className="w-5 h-5 text-luxe-gold" /> Pricing Rules
                                </h3>
                                <p className="text-sm text-luxe-gray mb-6">Configure dynamic pricing multipliers and automatic discounts.</p>
                            </div>

                            <div className="space-y-4">
                                {pricingRules.map((rule) => (
                                    <div key={rule.id} className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
                                        <div>
                                            <p className="font-medium text-white">{rule.name}</p>
                                            <p className="text-xs text-luxe-gray mt-1">Multiplier: x{rule.multiplier}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={rule.active}
                                                    onChange={() => toggleRule(rule.id)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-luxe-gold/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                            </label>
                                            <button className="text-gray-500 hover:text-red-400">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button className="w-full py-3 border border-dashed border-white/20 rounded-lg text-sm text-luxe-gray hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2">
                                    <Plus className="w-4 h-4" /> Add New Pricing Rule
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'general' && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
                            <h3 className="text-xl font-serif mb-4 flex items-center gap-3">
                                <Globe className="w-5 h-5 text-luxe-gold" /> General Configuration
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-luxe-gray">Site Name</label>
                                    <input
                                        type="text"
                                        value={globalConfig.siteName}
                                        onChange={(e) => setGlobalConfig({ ...globalConfig, siteName: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxe-gold/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-luxe-gray">Support Email</label>
                                    <input
                                        type="text"
                                        value={globalConfig.supportEmail}
                                        onChange={(e) => setGlobalConfig({ ...globalConfig, supportEmail: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxe-gold/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-luxe-gray">Default Currency</label>
                                    <select 
                                        value={globalConfig.currency}
                                        onChange={(e) => setGlobalConfig({ ...globalConfig, currency: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxe-gold/50"
                                    >
                                        <option value="INR">INR (₹) - Default</option>
                                        <option value="USD" disabled>USD ($)</option>
                                        <option value="EUR" disabled>EUR (€)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-luxe-gray">Tax Rate (%)</label>
                                    <input
                                        type="number"
                                        value={globalConfig.taxRate}
                                        onChange={(e) => setGlobalConfig({ ...globalConfig, taxRate: Number(e.target.value) })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxe-gold/50"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
                            <h3 className="text-xl font-serif mb-4 flex items-center gap-3">
                                <Bell className="w-5 h-5 text-luxe-gold" /> Notification Channels
                            </h3>
                            <div className="space-y-4">
                                {['Email Notifications', 'SMS Alerts', 'WhatsApp Updates', 'Push Notifications'].map((channel, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
                                        <span className="text-white font-medium">{channel}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-luxe-gold after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
                            <h3 className="text-xl font-serif mb-4 flex items-center gap-3">
                                <Shield className="w-5 h-5 text-luxe-gold" /> Security Policies
                            </h3>

                            <div className="space-y-6">
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-4">
                                    <div className="p-2 bg-red-500/20 rounded-full text-red-400">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-red-200">Session Timeout</h4>
                                        <p className="text-xs text-red-300/60 mt-1">Automatically log out inactive admin sessions after 30 minutes.</p>
                                    </div>
                                    <div className="ml-auto">
                                        <select className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white">
                                            <option>15 mins</option>
                                            <option>30 mins</option>
                                            <option>1 hour</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-4">
                                    <div className="p-2 bg-blue-500/20 rounded-full text-blue-400">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-blue-200">IP Whitelisting</h4>
                                        <p className="text-xs text-blue-300/60 mt-1">Restrict admin access to specific IP addresses.</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="ml-auto text-xs h-8 border-blue-500/30 text-blue-300 hover:bg-blue-500/20">Manage IPs</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-[#121212] border border-white/10 rounded-xl p-6">
                        <h4 className="font-serif text-lg mb-4 text-white">System Status</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-luxe-gray">Server Status</span>
                                <span className="text-emerald-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Online</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-luxe-gray">Database Load</span>
                                <span className="text-white">12%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-luxe-gray">Last Backup</span>
                                <span className="text-white">2 mins ago</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-luxe-gray">Version</span>
                                <span className="text-luxe-gold font-mono text-xs">v2.4.0-prod</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#121212] border border-white/10 rounded-xl p-6">
                        <h4 className="font-serif text-lg mb-4 text-white">Quick Actions</h4>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start text-luxe-gray hover:text-white border-white/10 hover:border-white/30">
                                <CreditCard className="w-4 h-4 mr-3" /> Payment Gateways
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-luxe-gray hover:text-white border-white/10 hover:border-white/30">
                                <Globe className="w-4 h-4 mr-3" /> Tax Settings
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20">
                                <Clock className="w-4 h-4 mr-3" /> Maintenance Mode
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
