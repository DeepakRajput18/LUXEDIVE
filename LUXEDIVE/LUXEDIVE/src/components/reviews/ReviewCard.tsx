
import { useState } from 'react';
import { Star, ShieldCheck, Car, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { type ChauffeurReview, formatDate } from '../../types/review';
import { Button } from '../ui/Button';

interface ReviewCardProps {
    review: ChauffeurReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 150;
    const shouldTruncate = review.comment.length > MAX_LENGTH;

    const displayComment = isExpanded ? review.comment :
        (shouldTruncate ? `${review.comment.substring(0, MAX_LENGTH)}...` : review.comment);

    return (
        <div className="bg-[#121212] border border-white/5 rounded-xl p-6 hover:border-luxe-gold/20 transition-all duration-300">
            {/* Header: User, Rating, Date */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-luxe-gold font-bold font-serif text-lg border border-white/5">
                        {review.userFirstName.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-white font-medium text-sm flex items-center gap-2">
                            {review.userFirstName}
                            {review.isVerifiedRide && (
                                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-900/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" title="Verified Ride">
                                    <ShieldCheck className="w-3 h-3" /> Verified
                                </span>
                            )}
                        </h4>
                        <div className="flex items-center gap-1 mt-0.5">
                            <div className="flex text-luxe-gold">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'opacity-30'}`} />
                                ))}
                            </div>
                            <span className="text-[10px] text-gray-500 mx-1">•</span>
                            <span className="text-[10px] text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Title */}
            {review.title && (
                <h5 className="text-white font-serif text-lg mb-2 leading-tight">{review.title}</h5>
            )}

            {/* Comment */}
            <div className="mb-4">
                <p className="text-gray-300 text-sm font-light leading-relaxed">"{displayComment}"</p>
                {shouldTruncate && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-[10px] text-luxe-gold uppercase tracking-widest font-bold mt-2 flex items-center gap-1 hover:text-white transition-colors"
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                )}
            </div>

            {/* Footer: Trip Details */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/5 mt-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Car className="w-3.5 h-3.5 text-gray-400" />
                    <span>Trip with <span className="text-gray-300 font-medium">{review.carName}</span></span>
                </div>
                <div className="w-px h-3 bg-white/10 hidden sm:block"></div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{new Date(review.tripDate).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' })}</span>
                </div>
            </div>
        </div>
    );
}
