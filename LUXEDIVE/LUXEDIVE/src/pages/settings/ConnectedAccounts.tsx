import { Link as RouterLink } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ShieldCheck, User, Settings, CreditCard, Bell, Lock as LockIcon, Link as LinkIcon } from 'lucide-react'

export default function ConnectedAccounts() {
    return (
        <div className="min-h-screen bg-luxe-black text-white pt-16 flex">

            {/* LEFT SIDEBAR */}
            <div className="w-80 bg-[#121212] border-r border-white/5 flex flex-col fixed h-full hidden lg:flex">
                <div className="p-8 border-b border-white/5">
                    <h2 className="font-serif text-white">Settings</h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Manage preferences</p>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-1">
                    {[
                        { name: 'Profile', icon: User },
                        { name: 'Connected Accounts', icon: LinkIcon, active: true },
                        { name: 'Billing', icon: CreditCard },
                        { name: 'Notifications', icon: Bell },
                        { name: 'Security', icon: LockIcon },
                    ].map(item => (
                        <div key={item.name} className={`px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer ${item.active ? 'bg-[#4169E1]/10 text-[#4169E1]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm tracking-wide font-medium">{item.name}</span>
                        </div>
                    ))}
                </nav>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 lg:ml-80 bg-[#0A0A0A] min-h-full p-12">
                <div className="max-w-4xl mx-auto">

                    <div className="mb-12">
                        <h1 className="text-3xl font-serif text-white mb-2">Connected Accounts</h1>
                        <p className="text-gray-400 font-light text-lg">Manage your social login methods for seamless access. Link your trusted accounts to sign in with a single click.</p>
                    </div>

                    <div className="space-y-4 mb-12">

                        {/* GOOGLE */}
                        <div className="bg-[#121212] border border-white/5 rounded-xl p-8 flex items-center justify-between group hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                    <img src="https://www.google.com/favicon.ico" className="w-6 h-6" alt="Google" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Google</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <p className="text-sm text-gray-400">Connected as <span className="text-white">luxedive.user@gmail.com</span></p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="border-white/10 text-white hover:bg-red-900/20 hover:text-red-400 hover:border-red-900/30 uppercase tracking-widest text-[10px] font-bold h-10 px-6">
                                Unlink
                            </Button>
                        </div>

                        {/* APPLE */}
                        <div className="bg-[#121212] border border-white/5 rounded-xl p-8 flex items-center justify-between group hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" /></svg>
                                    {/* Using generic path for visual */}
                                    <span className="font-bold -ml-[1px]"></span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Apple</h3>
                                    <p className="text-sm text-gray-500">Not connected</p>
                                </div>
                            </div>
                            <Button className="bg-white text-black hover:bg-gray-200 uppercase tracking-widest text-[10px] font-bold h-10 px-6">
                                Link Account
                            </Button>
                        </div>

                        {/* LINKEDIN */}
                        <div className="bg-[#121212] border border-white/5 rounded-xl p-8 flex items-center justify-between group hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-[#0077b5] rounded-full flex items-center justify-center text-white">
                                    <span className="font-bold text-xl">in</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">LinkedIn</h3>
                                    <p className="text-sm text-gray-500">Not connected</p>
                                </div>
                            </div>
                            <Button className="bg-white text-black hover:bg-gray-200 uppercase tracking-widest text-[10px] font-bold h-10 px-6">
                                Link Account
                            </Button>
                        </div>

                    </div>

                    {/* INFO BOX */}
                    <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="text-blue-200 font-bold text-sm mb-1 uppercase tracking-wide">One-Click Login Safety</h4>
                            <p className="text-sm text-blue-100/60 leading-relaxed font-light">
                                Connecting your social accounts allows for quicker login. LUXEDIVE uses bank-grade encryption and will never post to your social profiles without your explicit permission.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
