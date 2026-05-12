
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Star, X, ShieldCheck } from 'lucide-react';
import type { Chauffeur } from '../../pages/rental/ChauffeurDirectory';

interface AddReviewModalProps {
    chauffeur: Chauffeur;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reviewData: { rating: number; title: string; comment: string; isPublic: boolean }) => void;
}

export default function AddReviewModal({ chauffeur, isOpen, onClose, onSubmit }: AddReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API delay
        setTimeout(() => {
            onSubmit({ rating, title, comment, isPublic });
            setIsSubmitting(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-luxe-gold shadow-lg">
                            <img src={chauffeur.profilePhoto} alt={chauffeur.firstName} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-2xl font-serif text-white mb-1">Rate Your Experience</h2>
                        <p className="text-sm text-gray-400">How was your trip with <span className="text-white font-bold">{chauffeur.firstName}</span>?</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Rating Input */}
                        <div className="flex justify-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= (hoverRating || rating) ? 'fill-luxe-gold text-luxe-gold' : 'text-gray-600'}`}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Title Input */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Headline (Optional)</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Summarize your experience..."
                                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-luxe-gold/50 placeholder:text-gray-600"
                            />
                        </div>

                        {/* Comment Input */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Your Review</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                required
                                placeholder="What did you like or dislike? How was the car?"
                                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-luxe-gold/50 placeholder:text-gray-600 resize-none"
                            />
                        </div>

                        {/* Public Checkbox */}
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded border border-white/5">
                            <input
                                type="checkbox"
                                id="isPublic"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-600 text-luxe-gold focus:ring-luxe-gold bg-transparent"
                            />
                            <label htmlFor="isPublic" className="text-sm text-gray-300 cursor-pointer select-none flex-1">
                                Show my review publicly on {chauffeur.firstName}'s profile.
                            </label>
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        </div>

                        {/* Submit Actions */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={onClose} className="border-white/10 text-gray-400 hover:text-white uppercase tracking-widest text-xs font-bold">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={rating === 0 || isSubmitting}
                                className="bg-luxe-gold text-black hover:bg-white uppercase tracking-widest text-xs font-bold"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
