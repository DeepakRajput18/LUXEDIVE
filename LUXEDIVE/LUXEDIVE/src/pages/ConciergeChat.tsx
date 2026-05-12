import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Link } from 'react-router-dom'
import { Phone, Mic, Send, Headphones, Car, Settings, User, Grip, Clock, MapPin, MessageSquare, AlertTriangle } from 'lucide-react'

// Image 10: Concierge Chat Interface
export default function ConciergeChat() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Alfred', text: "Welcome back, Mr. Wayne. Your McLaren 720S is scheduled for pickup at 2:00 PM at the Gotham Marina. The keys have been prepared.", time: "10:23 AM", type: 'received' },
        { id: 2, sender: 'Alfred', text: "Is there anything else we can arrange for your journey today?", time: "10:23 AM", type: 'received' },
        { id: 3, sender: 'You', text: "I'm running a few minutes late. Will the driver still be at the location?", time: "10:43 AM", type: 'sent', status: 'Read' },
    ])
    const [input, setInput] = useState('')

    const handleSend = (e?: any) => {
        e?.preventDefault()
        if (!input.trim()) return
        setMessages([...messages, { id: Date.now(), sender: 'You', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'sent', status: 'Sent' }])
        setInput('')
    }

    return (
        <div className="flex h-screen bg-black overflow-hidden">
            {/* LEFT SIDEBAR */}
            <div className="w-80 bg-luxe-black border-r border-white/5 flex flex-col hidden lg:flex">
                {/* Header */}
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <span className="font-serif text-luxe-gold text-lg tracking-widest">LUXEDIVE</span>
                    <span className="ml-2 text-[10px] bg-white/10 text-white px-1.5 py-0.5 rounded uppercase">Premium</span>
                </div>

                {/* Nav */}
                <div className="p-4 space-y-1">
                    {[
                        { label: 'Dashboard', icon: Grip, active: false, path: '/dashboard' },
                        { label: 'My Rentals', icon: Car, active: false, path: '/dashboard/bookings' },
                        { label: 'Concierge', icon: Headphones, active: true, path: '/concierge' },
                        { label: 'Settings', icon: Settings, active: false, path: '/settings' },
                    ].map(item => (
                        <Link key={item.label} to={item.path}>
                            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${item.active ? 'bg-teal-900/20 text-teal-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-auto p-4">
                    {/* Active Rental Widget */}
                    <div className="bg-luxe-dark rounded-xl p-4 border border-white/5 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] text-luxe-gray uppercase tracking-wider">Current Rental</span>
                            <span className="text-[10px] text-teal-500 font-mono">#LX-9921</span>
                        </div>
                        <div className="flex gap-3 mb-3">
                            <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=200" className="w-16 h-12 object-cover rounded bg-gray-800" />
                            <div>
                                <p className="text-sm text-white font-medium truncate">McLaren 720S</p>
                                <p className="text-[10px] text-teal-400 uppercase">Elite Class</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                <Clock className="w-3 h-3 text-emerald-500" />
                                <span>Pickup: 02:00 PM Today</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                <MapPin className="w-3 h-3 text-emerald-500" />
                                <span className="truncate">Gotham Marina, Pier 4</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=100" />
                                </div>
                                <div>
                                    <p className="text-xs text-white">James Gordon</p>
                                    <p className="text-[10px] text-luxe-gray">⭐ 4.96</p>
                                </div>
                            </div>
                            <button className="p-2 rounded-full bg-teal-500/10 text-teal-500 hover:bg-teal-500 hover:text-black transition-colors">
                                <Phone className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Profile */}
                    <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                        <div className="w-10 h-10 rounded-full bg-luxe-gold text-black flex items-center justify-center font-bold">BW</div>
                        <div className="flex-1">
                            <p className="text-sm text-white">Bruce Wayne</p>
                            <Link to="/profile" className="text-[10px] text-gray-500 hover:text-white">View Profile</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CHAT */}
            <div className="flex-1 flex flex-col bg-luxe-dark relative z-10">
                {/* Chat Header */}
                <div className="h-16 border-b border-white/5 flex justify-between items-center px-6">
                    <div>
                        <h1 className="text-lg font-serif text-white">Concierge & Support</h1>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs text-emerald-500">Online • Avg Reply 1 min</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="hidden md:flex border-white/10 text-gray-400 hover:text-white">
                            <Phone className="w-4 h-4 mr-2" /> Call Support
                        </Button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-lg ${msg.type === 'sent' ? 'items-end' : 'items-start'} flex flex-col`}>
                                {msg.type === 'received' && <span className="text-[10px] text-gray-500 mb-1 ml-1">{msg.sender} • {msg.time}</span>}

                                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.type === 'sent'
                                        ? 'bg-teal-600 text-white rounded-tr-none'
                                        : 'bg-luxe-black border border-white/10 text-gray-300 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>

                                {msg.type === 'sent' && (
                                    <span className="text-[10px] text-gray-600 mt-1 mr-1 text-right block">
                                        {msg.status} {msg.time} ✓
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    <div className="flex justify-start animate-pulse">
                        <span className="text-xs text-gray-600 italic ml-2">Alfred is typing...</span>
                    </div>
                </div>

                {/* Quick Actions (Floating) */}
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <Button size="sm" className="bg-luxe-black/80 backdrop-blur border border-white/10 text-xs text-gray-300 hover:bg-white hover:text-black rounded-full h-8 px-4">
                        <MessageSquare className="w-3 h-3 mr-2" /> Chat with Driver
                    </Button>
                    <Button size="sm" className="bg-luxe-black/80 backdrop-blur border border-white/10 text-xs text-gray-300 hover:bg-white hover:text-black rounded-full h-8 px-4">
                        <Headphones className="w-3 h-3 mr-2" /> Talk to Support
                    </Button>
                    <Button size="sm" className="bg-luxe-black/80 backdrop-blur border border-red-500/20 text-xs text-red-400 hover:bg-red-500 hover:text-white rounded-full h-8 px-4">
                        <AlertTriangle className="w-3 h-3 mr-2" /> Roadside Assistance
                    </Button>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-luxe-black">
                    <form onSubmit={handleSend} className="relative max-w-4xl mx-auto flex items-center gap-3">
                        <button type="button" className="p-3 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-colors">
                            <Mic className="w-5 h-5" />
                        </button>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="bg-luxe-dark border-transparent focus:border-white/20 h-12 rounded-full pl-6 pr-12 text-white placeholder:text-gray-600"
                        />
                        <button type="submit" className="absolute right-3 top-1.5 p-2 rounded-full bg-teal-600 text-white hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/20">
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </form>
                    <p className="text-center text-[10px] text-gray-600 mt-2">
                        Press Enter to send. All conversations are encrypted end-to-end.
                    </p>
                </div>
            </div>
        </div>
    )
}
