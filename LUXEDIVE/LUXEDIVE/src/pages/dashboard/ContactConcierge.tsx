import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Send, Mic, Phone, Headphones, AlertTriangle, Check, User, MapPin, Clock } from 'lucide-react'

export default function ContactConcierge() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([
        { id: 1, sender: 'alfred', text: 'Welcome back, Mr. Wayne. Your McLaren 720S is scheduled for pickup at 2:00 PM at the Gotham Marina. The keys have been prepared.', time: '10:23 AM' },
        { id: 2, sender: 'alfred', text: 'Is there anything else we can arrange for your journey today?', time: '10:23 AM' },
        { id: 3, sender: 'user', text: "I'm running a few minutes late. Will the driver still be at the location?", time: '10:43 AM', read: true },
    ])
    const [isTyping, setIsTyping] = useState(true)

    const handleSend = () => {
        if (!message.trim()) return
        setMessages([...messages, { id: Date.now(), sender: 'user', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: false }])
        setMessage('')
    }

    return (
        <div className="flex h-screen bg-luxe-black overflow-hidden pt-16">

            {/* LEFT SIDEBAR */}
            <div className="w-80 bg-[#0A0A0A] border-r border-white/5 flex flex-col hidden lg:flex">
                <div className="p-8 border-b border-white/5">
                    <p className="text-luxe-gold text-[10px] tracking-[0.2em] uppercase font-bold mb-1">LUXEDIVE</p>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Premium Member</span>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-1">
                    {['Dashboard', 'My Rentals', 'Concierge', 'Settings'].map(item => (
                        <div key={item} className={`px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer ${item === 'Concierge' ? 'bg-teal-900/20 text-teal-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                            {item === 'Concierge' && <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />}
                            <span className="text-sm tracking-wide font-medium">{item}</span>
                        </div>
                    ))}
                </nav>

                {/* Rental Widget */}
                <div className="p-6 relative">
                    <div className="bg-[#121212] border border-white/5 rounded-xl p-4 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 to-transparent" />
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-3 relative z-10">Current Rental - #LX-9921</p>

                        <div className="h-24 bg-black rounded-lg mb-4 overflow-hidden relative z-10">
                            <img src="https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=400" className="w-full h-full object-cover opacity-80" />
                        </div>

                        <h4 className="text-white font-serif text-sm relative z-10">McLaren 720S</h4>
                        <p className="text-teal-400 text-[10px] lowercase italic relative z-10 mb-4">elite class</p>

                        <div className="space-y-2 relative z-10">
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Car Ready • 10:00 AM
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-white">
                                <Clock className="w-3 h-3 text-luxe-gold" />
                                Pickup • 02:00 PM
                            </div>
                        </div>
                    </div>
                </div>

                {/* Driver Profile */}
                <div className="p-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden border border-white/10">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-sm font-bold">James Gordon</p>
                            <p className="text-[10px] text-luxe-gold flex items-center gap-1">★ 4.96 Rating</p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                            <Phone className="w-4 h-4 text-white" />
                        </button>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wide">
                        <MapPin className="w-3 h-3" /> Gotham Marina, Pier 4
                    </div>
                </div>

                {/* User Profile */}
                <div className="p-6 border-t border-white/5 bg-[#080808]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-luxe-gold/20 flex items-center justify-center text-luxe-gold border border-luxe-gold/30">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-white text-sm font-bold">Bruce Wayne</p>
                            <button className="text-[10px] text-gray-400 hover:text-white transition-colors">View Profile</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CHAT AREA */}
            <div className="flex-1 flex flex-col bg-[#121212] relative">

                {/* Header */}
                <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#121212] z-20 shadow-xl">
                    <div>
                        <h2 className="text-xl font-serif text-white">Concierge & Support</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Online • Avg Reply 1 min</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                    {messages.map((msg, i) => (
                        <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                            {msg.sender === 'alfred' && i === 0 && (
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 ml-1">Alfred • Concierge</span>
                            )}
                            <div className={`max-w-lg p-6 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                    ? 'bg-[#1A2634] text-white rounded-br-none border border-teal-900/30'
                                    : 'bg-[#1A1A1A] text-gray-200 rounded-bl-none border border-white/5'
                                }`}>
                                {msg.text}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] text-gray-600 font-mono">{msg.time}</span>
                                {msg.sender === 'user' && msg.read && (
                                    <Check className="w-3 h-3 text-emerald-500" />
                                )}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex items-center gap-1 ml-1 animate-in fade-in duration-300">
                            <span className="text-[10px] text-gray-600 mr-2">Alfred is typing</span>
                            <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-0" />
                            <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-150" />
                            <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-300" />
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="px-8 pb-4 flex gap-4 overflow-x-auto">
                    <Button variant="outline" className="border-white/5 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white text-xs py-2 h-auto rounded-full whitespace-nowrap">
                        <Phone className="w-3 h-3 mr-2 text-teal-400" /> Chat with Driver
                    </Button>
                    <Button variant="outline" className="border-white/5 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white text-xs py-2 h-auto rounded-full whitespace-nowrap">
                        <Headphones className="w-3 h-3 mr-2 text-blue-400" /> Talk to Support
                    </Button>
                    <Button variant="outline" className="border-white/5 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white text-xs py-2 h-auto rounded-full whitespace-nowrap">
                        <AlertTriangle className="w-3 h-3 mr-2 text-red-400" /> Roadside Assistance
                    </Button>
                </div>

                {/* Input Area */}
                <div className="p-8 pt-0 bg-[#121212]">
                    <div className="relative">
                        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                            <Mic className="w-4 h-4 text-gray-500" />
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-4 pl-14 pr-14 text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-900/50 transition-colors h-14"
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-teal-900/30 hover:bg-teal-900/50 text-teal-400 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </div>
                    <p className="text-[9px] text-center text-gray-700 mt-3 uppercase tracking-wider">
                        Press Enter to send. All conversations are encrypted.
                    </p>
                </div>
            </div>
        </div>
    )
}
