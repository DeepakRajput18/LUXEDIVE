import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InfiniteScrollingGalleryProps {
    images: string[];
}

export function InfiniteScrollingGallery({ images }: InfiniteScrollingGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Create 6 identical sets to ensure we have a massive buffer on both sides for seamless looping
    const infiniteImages = [...images, ...images, ...images, ...images, ...images, ...images];
    const totalSets = 6;

    // Center the scroll position initially
    useEffect(() => {
        if (containerRef.current) {
            // Small timeout allows layout to paint so scrollWidth is accurate
            setTimeout(() => {
                if (!containerRef.current) return;
                const setWidth = containerRef.current.scrollWidth / totalSets;
                // Start exactly at the beginning of the 3rd set
                containerRef.current.scrollLeft = setWidth * 2;
            }, 100);
        }
    }, [images]);

    // Continuous auto-scrolling logic
    useEffect(() => {
        if (isHovered) return;

        let animationId: number;
        const scroll = () => {
            if (containerRef.current) {
                // Auto-scroll speed
                containerRef.current.scrollLeft += 1;

                const setWidth = containerRef.current.scrollWidth / totalSets;

                // If we scrolled deep into the 5th set, seamlessly loop back to the 4th set
                if (containerRef.current.scrollLeft >= setWidth * 4) {
                    containerRef.current.scrollLeft -= setWidth;
                }
                // If the user manually scrolled backwards into the 1st set, seamlessly loop forward to the 2nd set
                else if (containerRef.current.scrollLeft <= setWidth * 1) {
                    containerRef.current.scrollLeft += setWidth;
                }
            }
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationId);
    }, [isHovered, totalSets]);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -500, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 500, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full overflow-hidden group/gallery" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>

            {/* Scroll Arrows */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 flex items-center justify-start px-4 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button onClick={scrollLeft} className="pointer-events-auto w-14 h-14 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-luxe-gold hover:text-black hover:scale-110 transition-all backdrop-blur-md shadow-2xl">
                    <ChevronLeft className="w-8 h-8" />
                </button>
            </div>

            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 flex items-center justify-end px-4 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button onClick={scrollRight} className="pointer-events-auto w-14 h-14 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-luxe-gold hover:text-black hover:scale-110 transition-all backdrop-blur-md shadow-2xl">
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>

            {/* Scrolling Track: overflow-x-hidden totally removes the ugly scrollbar */}
            <div className="overflow-x-hidden" ref={containerRef}>
                <div className="flex gap-4 w-max pb-8 pt-4">
                    {infiniteImages.map((src, idx) => (
                        <div
                            key={idx}
                            className="w-[85vw] md:w-[33vw] h-[400px] md:h-[500px] overflow-hidden rounded-sm group relative shrink-0 transition-opacity duration-700"
                        >
                            <img
                                src={src}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                alt={`Wedding Moment ${idx + 1}`}
                            />
                            <div className="absolute inset-0 border border-white/5 group-hover:border-[#D4AF37]/30 transition-colors pointer-events-none rounded-sm"></div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
