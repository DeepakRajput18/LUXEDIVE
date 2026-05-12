import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Flower, Divide as Ribbon, Check, RotateCw, ZoomIn, Sun, Moon, Maximize, ArrowRight, Save, Trash2, GripVertical } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

// Decor Item Interface
interface DecorItem {
    id: string;
    type: 'floral' | 'ribbon' | 'sticker';
    name: string;
    price: number;
    icon: React.ReactNode;
}

// Placed Item Interface
interface PlacedItem extends DecorItem {
    instanceId: string;
    x: number; // percentage
    y: number; // percentage
}

const DECOR_OPTIONS: DecorItem[] = [
    { id: 'bouquet_white', type: 'floral', name: 'White Rose Bouquet', price: 5000, icon: <Flower className="w-4 h-4 text-cyan-500" /> },
    { id: 'bouquet_red', type: 'floral', name: 'Red Rose Bouquet', price: 5500, icon: <Flower className="w-4 h-4 text-red-500" /> },
    { id: 'ribbon_silver', type: 'ribbon', name: 'Satin Silver Ribbon', price: 2000, icon: <Ribbon className="w-4 h-4 text-gray-300" /> },
    { id: 'ribbon_gold', type: 'ribbon', name: 'Satin Gold Ribbon', price: 2500, icon: <Ribbon className="w-4 h-4 text-yellow-500" /> },
    { id: 'sticker_justmarried', type: 'sticker', name: '"Just Married" Decal', price: 1500, icon: <Check className="w-4 h-4 text-white" /> },
];

export default function WeddingDecorVisualizer() {
    const navigate = useNavigate();
    const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Initial base price
    const BASE_PRICE = 0;

    const handleDragStart = (e: React.DragEvent, item: DecorItem) => {
        e.dataTransfer.setData('decorId', item.id);
        e.dataTransfer.effectAllowed = 'copy';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const decorId = e.dataTransfer.getData('decorId');
        const item = DECOR_OPTIONS.find(i => i.id === decorId);

        if (item) {
            // Calculate percentage position
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            const newItem: PlacedItem = {
                ...item,
                instanceId: Math.random().toString(36).substr(2, 9),
                x,
                y
            };

            setPlacedItems([...placedItems, newItem]);
            setTotalPrice(prev => prev + item.price);
            toast.success(`Added ${item.name}`);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const removeItem = (instanceId: string, price: number) => {
        setPlacedItems(prev => prev.filter(i => i.instanceId !== instanceId));
        setTotalPrice(prev => prev - price);
    };

    const handleSave = () => {
        console.log('Saved Design:', placedItems);
        toast.success("Design saved to your wedding portfolio!");
        // Simulate navigation to checkout or summary
        setTimeout(() => navigate('/dashboard/documents'), 1500); // Redirect to dashboard for demo
    };

    return (
        <div className="h-screen bg-[#0F172A] text-white overflow-hidden flex flex-col">

            {/* PROGRESS BAR */}
            <div className="h-14 bg-[#0B1121] border-b border-white/5 flex items-center justify-between px-6 shrink-0">
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-cyan-500/50">Selection</span>
                    <span className="text-gray-600">/</span>
                    <span className="text-cyan-500">Visualizer</span>
                    <span className="text-gray-600">/</span>
                    <span className="text-gray-600">Checkout</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="text-gray-400 hover:text-white uppercase tracking-widest text-[10px]">Support</Button>
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-xs font-bold">JD</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">

                {/* LEFT SIDEBAR - CONTROLS */}
                <div className="w-[350px] bg-[#080E1A] border-r border-white/5 flex flex-col p-6 z-20 shadow-2xl">

                    <div className="mb-8">
                        <h1 className="text-xl font-serif text-white mb-2">Decor Visualizer</h1>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">Drag and drop items onto the vehicle to visualize your wedding entrance.</p>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">

                        {/* Section 1: Draggable Items */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Flower className="w-4 h-4 text-cyan-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500">Available Decor</span>
                            </div>
                            <div className="space-y-3">
                                {DECOR_OPTIONS.map(item => (
                                    <div
                                        key={item.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item)}
                                        className="flex items-center justify-between p-3 bg-[#12182B] border border-white/5 rounded-lg cursor-grab active:cursor-grabbing hover:border-cyan-500/50 hover:bg-cyan-900/10 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <GripVertical className="w-4 h-4 text-gray-600 group-hover:text-cyan-500" />
                                            <span className="text-xs font-bold text-gray-300 group-hover:text-white">{item.name}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-cyan-500">₹{item.price.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* BOTTOM ESTIMATE */}
                    <div className="mt-6 pt-6 border-t border-white/5">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Total Add-ons</div>
                        <div className="text-3xl font-serif text-white mb-4">₹{totalPrice.toLocaleString()}</div>

                        <Button onClick={handleSave} className="w-full h-12 bg-white text-black hover:bg-cyan-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
                            Save Design <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                    <div className="mt-6 text-center text-[9px] text-gray-700 uppercase tracking-widest font-bold">
                        © 2024 LUXEDIVE LUXURY CAR RENTAL
                    </div>

                </div>

                {/* MAIN VIEW - 3D VISUALIZER */}
                <div className="flex-1 relative bg-gradient-to-b from-[#1a1a1a] to-black flex items-center justify-center overflow-hidden">

                    {/* Header Overlay */}
                    <div className="absolute top-8 left-0 right-0 text-center pointer-events-none z-10">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Canvasing</div>
                        <div className="text-3xl font-serif text-white opacity-80">Rolls-Royce Ghost Black Edition</div>
                    </div>

                    {/* Car Render & Drop Zone */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="relative w-full max-w-5xl aspect-[16/9] flex items-center justify-center transition-all bg-black/20 rounded-xl border border-white/5"
                    >
                        {/* Dynamic Background Image */}
                        <img
                            src="https://images.unsplash.com/photo-1631295868223-63265b40d9f4?q=80&w=2000"
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0 select-none"
                            draggable={false}
                        />

                        {/* Drop Zone Indicator */}
                        <div className="absolute inset-0 z-0 pointer-events-none border-2 border-dashed border-white/10 m-4 rounded-lg flex items-center justify-center">
                            {placedItems.length === 0 && <span className="text-white/20 text-sm font-bold uppercase tracking-widest">Drop Decor Here</span>}
                        </div>

                        {/* Placed Items */}
                        {placedItems.map((item) => (
                            <div
                                key={item.instanceId}
                                className="absolute z-10 cursor-pointer group animate-fade-in-up"
                                style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%, -50%)' }}
                            >
                                <div className="relative">
                                    <div className="p-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeItem(item.instanceId, item.price); }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Control Bar */}
                    <div className="absolute bottom-8 bg-[#0B1121]/80 backdrop-blur border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 z-20">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                            <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Exterior</span>
                        </button>
                        <div className="w-px h-4 bg-white/10"></div>
                        <button onClick={() => setPlacedItems([])} className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Clear All</span>
                        </button>
                    </div>

                    <div className="absolute bottom-6 right-6 text-[9px] font-bold uppercase tracking-widest text-gray-800">
                        Interactive Visualizer V2.0
                    </div>

                </div>

            </div>
        </div>
    )
}
