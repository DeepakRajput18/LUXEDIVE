import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Star, Camera, X } from 'lucide-react'

// Page 49: Post-Rental Review
export default function PostRentalReview() {
    const [rating, setRating] = useState(0)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag))
        } else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    return (
        <div className="min-h-screen bg-luxe-black/90 flex items-center justify-center p-6 backdrop-blur-sm relative">

            {/* MODAL CONTAINER */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl w-full max-w-5xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row">

                <button className="absolute top-6 right-6 text-gray-500 hover:text-white z-20">
                    <X className="w-6 h-6" />
                </button>

                {/* LEFT: VEHICLE */}
                <div className="lg:w-1/3 bg-[#121212] p-10 border-r border-white/5 flex flex-col items-center text-center relative">
                    <div className="mb-8 w-full aspect-video bg-gray-900 rounded-xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=600" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-2xl font-serif text-white mb-2">Porsche 911 Carrera S</h2>
                    <p className="text-xs text-gray-500 font-mono mb-8 uppercase tracking-widest">Oct 12 - Oct 15 • #LD-992</p>

                    <div className="mt-auto">
                        <p className="text-[10px] text-luxe-gold uppercase tracking-widest font-bold mb-4">Rate Your Experience</p>
                        <div className="flex gap-2 justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setRating(star)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= rating ? 'text-[#4169E1] fill-current' : 'text-gray-700'}`}
                                        strokeWidth={1.5}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: FORM */}
                <div className="lg:w-2/3 p-10 bg-[#1A1A1A]">
                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-3xl font-serif text-white mb-2">How was your drive?</h1>
                        <p className="text-gray-400 font-light">Your feedback ensures the LUXEDIVE standard remains impeccable.</p>
                    </div>

                    <div className="space-y-8">

                        {/* Tags */}
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">What stood out?</p>
                            <div className="flex flex-wrap gap-3">
                                {['Cleanliness', 'Driving Experience', 'Pick-up Process', 'Car Condition', 'Concierge Service'].map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${selectedTags.includes(tag) ? 'bg-[#4169E1] border-[#4169E1] text-white' : 'bg-[#121212] border-white/10 text-gray-400 hover:border-white/30'}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Textarea */}
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Write a review</p>
                            <textarea
                                className="w-full bg-[#121212] border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#4169E1] outline-none min-h-[120px] placeholder:text-gray-700 resize-none"
                                placeholder="Share details about the vehicle condition, handling, or service..."
                            />
                        </div>

                        {/* Photo Upload */}
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors">
                            <Camera className="w-8 h-8 text-gray-600 mb-2" />
                            <p className="text-xs text-gray-300 font-bold">Click to upload or drag and drop</p>
                            <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-widest">JPG or PNG, max 8MB</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4">
                            <button className="text-xs text-gray-500 hover:text-white font-bold uppercase tracking-widest transition-colors">
                                Maybe Later
                            </button>
                            <Button className="bg-white text-black hover:bg-luxe-gold h-12 px-8 uppercase tracking-widest text-[10px] font-bold shadow-lg shadow-white/5">
                                Submit Review
                            </Button>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}
