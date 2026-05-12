import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PhoneCall,
    MapPin,
    Send,
    Paperclip,
    MoreVertical,
    AlertTriangle,
    CheckCheck,
    Clock,
    User,
    ShieldAlert
} from 'lucide-react';

interface Message {
    id: string;
    sender: 'user' | 'agent' | 'system';
    text: string;
    timestamp: string;
    isRead?: boolean;
}

const RoadsideTrackerV4: React.FC = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'm1',
            sender: 'system',
            text: 'System automatically shared your location with priority support.',
            timestamp: '10:42 AM'
        },
        {
            id: 'm2',
            sender: 'agent',
            text: "Hello Mr. Bruce, I see you've requested roadside assistance. I've dispatched a flatbed truck to your coordinates. Are you currently in a safe location away from traffic?",
            timestamp: '10:43 AM'
        },
        {
            id: 'm3',
            sender: 'user',
            text: "Yes, I managed to pull over to the shoulder. The engine just died completely.",
            timestamp: '10:44 AM',
            isRead: true
        },
        {
            id: 'm4',
            sender: 'agent',
            text: "Understood. Please stay inside the vehicle with your hazard lights on. Technician Mike is nearby and should be there in about 12 minutes.",
            timestamp: '10:45 AM'
        }
    ]);

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: false
        };
        setMessages([...messages, newMessage]);
        setInputText('');

        // Simulate read receipt
        setTimeout(() => {
            setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, isRead: true } : m));
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-16 font-sans">

            {/* Header */}
            <header className="fixed top-0 inset-x-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div>
                        <h1 className="text-sm font-bold text-gray-900">Roadside Assistance Ticket #8821</h1>
                        <p className="text-[10px] text-gray-400 font-medium">System Online</p>
                    </div>
                </div>
                <button className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest rounded border border-red-100 hover:bg-red-100 flex items-center gap-2 transition-colors">
                    <AlertTriangle className="w-4 h-4" /> Emergency Call
                </button>
            </header>

            <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-6 gap-6 h-[calc(100vh-64px)] overflow-hidden">

                {/* Left Panel - Fixed Info */}
                <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4 overflow-y-auto">

                    {/* ETA Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                            <Clock className="w-3 h-3" /> Estimated Arrival
                        </p>
                        <p className="text-4xl font-serif text-gray-900">12 <span className="text-base text-gray-400 font-sans">min</span></p>
                    </div>

                    {/* Map Preview */}
                    <div className="h-40 bg-gray-200 rounded-xl overflow-hidden relative border border-gray-200">
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/1024px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center opacity-60" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
                        <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold shadow text-gray-600">4.2 mi away</div>
                    </div>

                    {/* Technician Card */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">Technician Mike</p>
                                <p className="text-[10px] text-gray-500 truncate">Driving Flatbed Truck #4092</p>
                            </div>
                            <button className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors">
                                <PhoneCall className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold bg-yellow-50 text-yellow-600 px-2 py-1 rounded w-fit">
                            ★ 4.98 Rating
                        </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex-1">
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Live Status</h3>
                        <div className="space-y-4 pl-2 relative">
                            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />

                            <div className="relative flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white z-10 shadow-sm flex items-center justify-center">
                                    <span className="text-[8px] text-white">✓</span>
                                </div>
                                <span className="text-xs text-gray-500 line-through">Request Received</span>
                            </div>

                            <div className="relative flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white z-10 shadow-sm flex items-center justify-center">
                                    <span className="text-[8px] text-white">✓</span>
                                </div>
                                <span className="text-xs text-gray-500 line-through">Dispatcher Assigned</span>
                            </div>

                            <div className="relative flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-blue-600 border-4 border-blue-100 z-10 shadow-sm animate-pulse" />
                                <span className="text-xs font-bold text-blue-600">Help En Route</span>
                            </div>

                            <div className="relative flex items-center gap-3 opacity-50">
                                <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white z-10" />
                                <span className="text-xs text-gray-400">On Scene</span>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Right Panel - Chat Thread */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">

                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold border border-purple-200">
                                SA
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Agent Sarah</p>
                                <p className="text-[10px] text-purple-600 font-bold uppercase tracking-widest">Priority Support Team</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-black">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 bg-white p-6 overflow-y-auto space-y-6">
                        <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest mb-4">Today, 10:42 AM</p>

                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} ${msg.sender === 'system' ? 'justify-center' : ''}`}
                            >
                                {msg.sender === 'system' ? (
                                    <div className="bg-gray-100 px-4 py-2 rounded-full text-[10px] text-gray-500 font-medium flex items-center gap-2 border border-gray-200">
                                        <ShieldAlert className="w-3 h-3" /> {msg.text}
                                    </div>
                                ) : (
                                    <div className={`max-w-[75%] ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-l-2xl rounded-tr-2xl' : 'bg-gray-100 text-gray-800 rounded-r-2xl rounded-tl-2xl'} p-4 shadow-sm relative group`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <div className={`flex items-center gap-1 mt-1 justify-end text-[10px] ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                                            <span>{msg.timestamp}</span>
                                            {msg.sender === 'user' && msg.isRead && <CheckCheck className="w-3 h-3" />}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing Indicator Mock */}
                        <div className="flex justify-start opacity-0 animate-[fadeIn_0.5s_ease-in-out_2s_forwards]">
                            <div className="bg-gray-100 rounded-full px-4 py-3 flex gap-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-0" />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150" />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300" />
                            </div>
                        </div>

                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
                            <button className="text-gray-400 hover:text-gray-600">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MapPin className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message to Agent Sarah..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 h-10"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputText.trim()}
                                className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md shadow-blue-600/20"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-center text-[10px] text-gray-400 mt-3 flex items-center justify-center gap-1">
                            <ShieldAlert className="w-3 h-3" /> Your chats are encrypted and monitored for quality assurance.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default RoadsideTrackerV4;
