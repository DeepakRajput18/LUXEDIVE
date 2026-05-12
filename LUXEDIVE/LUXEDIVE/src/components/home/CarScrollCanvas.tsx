import React, { useEffect, useRef } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

interface CarScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function CarScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: CarScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const loadImages = async () => {
            const imgPromises = [];
            for (let i = 1; i <= totalFrames; i++) {
                const promise = new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    img.src = `${imageFolderPath}${i}.jpg`;
                    img.onload = () => {
                        loadedCount++;
                        resolve(img);
                    };
                    // Push immediately or wait? We'll maintain order
                });
                imgPromises.push(promise);
            }
            imagesRef.current = await Promise.all(imgPromises);

            // Draw first frame immediately once loaded
            if (imagesRef.current.length > 0) {
                requestAnimationFrame(() => drawFrame(0));
            }
        };
        loadImages();
    }, [totalFrames, imageFolderPath]);

    const drawFrame = (frameIndex: number) => {
        if (frameIndex < 0 || frameIndex >= totalFrames || !imagesRef.current[frameIndex]) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = imagesRef.current[frameIndex];

        // Handle high-DPI displays
        const dpr = window.devicePixelRatio || 1;
        // Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        // Normalize coordinate system to use css pixels
        ctx.scale(dpr, dpr);

        // Object-fit: cover/contain logic (here we use cover to fill the screen similar to background-size: cover)
        const cw = window.innerWidth;
        const ch = window.innerHeight;
        const iw = img.width;
        const ih = img.height;

        const canvasRatio = cw / ch;
        const imgRatio = iw / ih;

        let drawWidth = cw;
        let drawHeight = ch;
        let offsetX = 0;
        let offsetY = 0;

        // Use containment for car to remain fully visible (object-fit: contain) as instructed:
        // "Draw using object-fit: contain logic. Keep car centered and fully visible"
        if (canvasRatio > imgRatio) {
            drawHeight = ch;
            drawWidth = imgRatio * ch;
            offsetX = (cw - drawWidth) / 2;
        } else {
            drawWidth = cw;
            drawHeight = cw / imgRatio;
            offsetY = (ch - drawHeight) / 2;
        }

        // Clear and draw
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Map latest (0.0 to 1.0) to frame index (0 to totalFrames - 1)
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );

        if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            requestAnimationFrame(() => drawFrame(frameIndex));
        }
    });

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            requestAnimationFrame(() => drawFrame(currentFrameRef.current));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden lg:block"
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#0b0d10' // base-dark fallback
            }}
            aria-hidden="true"
        />
    );
}
