import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    MoreVertical,
    Paperclip,
    Send,
    Download,
    Settings,
    Clock,
    MapPin,
    Check,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

interface Message {
    id: string;
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
    isRead?: boolean;
}

const SupportThread: React.FC = () => {
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'user',
            text: "Good morning. I noticed a hold on my card for the security deposit, but I returned the vehicle yesterday. Could you please clarify when this will be released back to my account?",
            timestamp: '10:42 AM',
            isRead: true
        },
        {
            id: '2',
            sender: 'agent',
            text: "Good morning, Mr. Wayne. Thank you for choosing LUXEDIVE for your recent drive. I have reviewed your reservation #RES-8821. The vehicle inspection was completed successfully this morning with no issues reported.",
            timestamp: '11:15 AM'
        },
        {
            id: '3',
            sender: 'agent',
            text: "We have initiated the release of your ₹50,000 security deposit. Depending on your bank (HDFC Infinia), this should reflect in your available balance within 3-5 business days.",
            timestamp: '11:15 AM'
        },
        {
            id: '4',
            sender: 'user',
            text: "Understood, thank you Sarah. Is it possible to expedite this? I'm planning another booking for next weekend.",
            timestamp: '11:20 AM',
            isRead: true
        },
        {
            id: '5',
            sender: 'agent',
            text: "Certainly. Given your Platinum status, I can manually override the standard processing time. I've just sent an authorization release code to our merchant processor. You should see the funds released by end of day today. We look forward to serving you again soon!",
            timestamp: '11:22 AM'
        }
    ]);

    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col h-screen">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Ticket #{ticketId || 'LX-9942'}</h1>
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded border border-blue-100">In Progress</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">Inquiry regarding Lamborghini Urus Deposit</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-colors">
                        <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-white">

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-gray-50/50">
                        <div className="flex justify-center">
                            <span className="px-3 py-1 bg-gray-200 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-full">October 12, 2023</span>
                        </div>

                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

                                {msg.sender === 'agent' && (
                                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs mr-3 mt-1 flex-shrink-0">
                                        L
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white translate-x-1 translate-y-1" />
                                    </div>
                                )}

                                <div className={`max-w-[70%] ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-l-2xl rounded-tr-2xl' : 'bg-white border border-gray-100 text-gray-800 rounded-r-2xl rounded-tl-2xl shadow-sm'} p-5 relative group`}>
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                    <div className={`flex items-center gap-1 mt-2 text-[10px] font-medium ${msg.sender === 'user' ? 'text-blue-200 justify-end' : 'text-gray-400'}`}>
                                        <span>{msg.timestamp}</span>
                                        {msg.sender === 'user' && msg.isRead && <CheckCircle2 className="w-3 h-3" />}
                                    </div>
                                </div>

                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white border-t border-gray-200 flex items-end gap-4">
                        <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Type your message..."
                                className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 resize-none h-6 max-h-32"
                                style={{ minHeight: '1.5rem' }}
                            />
                        </div>
                        <button
                            onClick={handleSend}
                            disabled={!inputText.trim()}
                            className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 disabled:shadow-none transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="bg-white px-6 pb-2 text-[10px] text-gray-400 flex justify-between items-center">
                        <span>Press Enter to send • Shift + Enter to add a new line</span>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Ahmedabad, Gujarat
                        </div>
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto hidden lg:flex flex-col">

                    {/* Related Reservation */}
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Related Reservation</h3>

                        <div className="rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:border-gray-300 transition-colors">
                            <div className="h-32 bg-gray-100 relative">
                                <img src="https://images.unsplash.com/photo-1632733711679-529326f6db6b?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest rounded shadow">
                                    Completed
                                </div>
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-sm mb-1">Lamborghini Urus</h4>
                                <p className="text-xs text-gray-500 mb-3">Nero Noctis • 2023</p>

                                <div className="flex justify-between items-end text-xs">
                                    <span className="text-gray-400">Oct 09 - Oct 11</span>
                                    <span className="font-bold">₹1,25,000.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support Details */}
                    <div className="p-6 space-y-8">

                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Assigned Agent</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold border border-purple-200">
                                    SJ
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Sarah Jenkins</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Senior Concierge</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Response Time</h3>
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit border border-green-100">
                                <Clock className="w-4 h-4" />
                                <span className="text-xs font-bold">Under 15 mins</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Priority Level</h3>
                            <div className="bg-gradient-to-r from-gray-900 to-black text-white p-4 rounded-xl shadow-lg">
                                <div className="flex items-center gap-2 mb-2 text-yellow-500">
                                    <span className="text-lg">♚</span>
                                    <span className="text-xs font-bold uppercase tracking-widest">Platinum Concierge</span>
                                </div>
                                <p className="text-[10px] text-gray-400 leading-relaxed italic">
                                    "LUXEDIVE guarantees a seamless experience. Our support team is available 24/7 for our Platinum members."
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default SupportThread;
