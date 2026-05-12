import React, { useState, useRef, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface ImageCropperModalProps {
    imageUrl: string;
    onCrop: (croppedBase64: string) => void;
    onClose: () => void;
}

export default function ImageCropperModal({ imageUrl, onCrop, onClose }: ImageCropperModalProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            setImage(img);
            // Auto scale to fill the 250x250 crop area
            const scaleX = 250 / img.width;
            const scaleY = 250 / img.height;
            setScale(Math.max(scaleX, scaleY));
        };
    }, [imageUrl]);

    useEffect(() => {
        if (!image || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Calculate drawing dimensions
        const drawWidth = image.width * scale;
        const drawHeight = image.height * scale;

        // Calculate centered offset + drag position
        const dx = (canvas.width - drawWidth) / 2 + position.x;
        const dy = (canvas.height - drawHeight) / 2 + position.y;

        // Draw image
        ctx.drawImage(image, dx, dy, drawWidth, drawHeight);

        // Draw circular mask over it to show what will be cropped
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.arc(canvas.width / 2, canvas.height / 2, 125, 0, Math.PI * 2, true);
        ctx.fill('evenodd');

        // Draw border
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 125, 0, Math.PI * 2);
        ctx.stroke();

    }, [image, scale, position]);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
        setScale(Math.max(0.1, Math.min(newScale, 5)));
    };

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        setDragStart({ x: clientX - position.x, y: clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        const clientX = 'touches' in e ? (e as any).touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? (e as any).touches[0].clientY : (e as React.MouseEvent).clientY;
        setPosition({
            x: clientX - dragStart.x,
            y: clientY - dragStart.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        const handleTouchMove = (e: TouchEvent) => handleMouseMove(e);
        const handleTouchEnd = () => handleMouseUp();

        if (isDragging) {
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleTouchEnd);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('mousemove', handleMouseMove as any);
        }

        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove as any);
        };
    }, [isDragging, handleMouseMove]);

    const handleSave = () => {
        if (!image) return;

        // Create an offscreen canvas specifically for the cropped 250x250 area
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = 250;
        finalCanvas.height = 250;
        const ctx = finalCanvas.getContext('2d');
        if (!ctx) return;

        // Draw background just in case it's transparent
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, 250, 250);

        const drawWidth = image.width * scale;
        const drawHeight = image.height * scale;

        // We calculate the dx and dy based on the 250x250 canvas center rather than the preview canvas center
        // Preview canvas is 400x400
        const dx = (250 - drawWidth) / 2 + position.x;
        const dy = (250 - drawHeight) / 2 + position.y;

        ctx.drawImage(image, dx, dy, drawWidth, drawHeight);

        onCrop(finalCanvas.toDataURL('image/jpeg', 0.9));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#12141A] rounded-2xl w-full max-w-md overflow-hidden border border-white/10 shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/5">
                    <h2 className="text-xl font-serif text-white">Adjust Photo</h2>
                    <button onClick={onClose} className="p-2 bg-white/5 text-gray-400 hover:text-white rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cropper Area */}
                <div className="p-6 flex flex-col items-center gap-6">
                    <p className="text-sm text-gray-400 text-center">Scroll to zoom. Drag to reposition.</p>

                    <div
                        className="relative rounded-lg overflow-hidden border border-white/5 cursor-move touch-none bg-black/50"
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleMouseDown}
                    >
                        {/* We use 350x350 for the visual editor allowing padding around the 250x250 circle */}
                        <canvas
                            ref={canvasRef}
                            width={350}
                            height={350}
                            className="block"
                        />
                    </div>

                    <div className="w-full space-y-2">
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Zoom</span>
                            <span>{Math.round(scale * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0.1"
                            max="5"
                            step="0.05"
                            value={scale}
                            onChange={(e) => setScale(parseFloat(e.target.value))}
                            className="w-full accent-[#D4AF37]"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex p-6 border-t border-white/5 gap-3 bg-black/20">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 text-sm font-semibold text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-3 text-sm font-bold text-black bg-[#D4AF37] hover:bg-[#C4A030] rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    >
                        <Check className="w-4 h-4" /> Save Photo
                    </button>
                </div>
            </div>
        </div>
    );
}
