
import { useState } from 'react';
import type { ChauffeurReview } from '../../types/review';
import ReviewCard from './ReviewCard';
import { Button } from '../ui/Button';
import { Filter, ChevronDown, MessageSquareX } from 'lucide-react';

interface ReviewsListProps {
    reviews: ChauffeurReview[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
    const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');
    const [filterFiveStar, setFilterFiveStar] = useState(false);

    // 7️⃣ SORTING & FILTERING
    const filteredReviews = reviews
        .filter(review => !filterFiveStar || review.rating === 5)
        .sort((a, b) => {
            if (sortBy === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (sortBy === 'highest') return b.rating - a.rating;
            if (sortBy === 'lowest') return a.rating - b.rating;
            return 0;
        });

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/5">
                <MessageSquareX className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-serif text-white">No Reviews Yet</h3>
                <p className="text-sm text-gray-400">Be the first to share your experience with this chauffeur.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h3 className="text-lg font-serif text-white flex items-center gap-2">
                    Latest Reviews <span className="text-sm font-sans text-gray-500 font-normal">({filteredReviews.length})</span>
                </h3>

                <div className="flex items-center gap-2">
                    {/* Filter Toggle */}
                    <button
                        onClick={() => setFilterFiveStar(!filterFiveStar)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors ${filterFiveStar
                            ? 'bg-luxe-gold text-black border-luxe-gold'
                            : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                            }`}
                    >
                        <Filter className="w-3 h-3" /> 5★ Only
                    </button>

                    {/* Sort Dropdown (Simplified) */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-transparent text-gray-400 border border-white/10 hover:text-white transition-colors">
                            Sort: {sortBy === 'recent' ? 'Most Recent' : sortBy === 'highest' ? 'Highest Rated' : 'Lowest Rated'}
                            <ChevronDown className="w-3 h-3" />
                        </button>
                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full mt-2 w-40 bg-[#121212] border border-white/10 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                            <button onClick={() => setSortBy('recent')} className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white">Most Recent</button>
                            <button onClick={() => setSortBy('highest')} className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white">Highest Rated</button>
                            <button onClick={() => setSortBy('lowest')} className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-white">Lowest Rated</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 gap-6">
                {filteredReviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>

            {/* Pagination (Visual Only) */}
            {filteredReviews.length > 3 && (
                <div className="text-center mt-12">
                    <Button variant="outline" className="text-xs text-gray-500 hover:text-white border-white/10 hover:border-white/30 rounded-full px-6">
                        Load More Reviews
                    </Button>
                </div>
            )}
        </div>
    );
}
