import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SplashScreen() {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(() => {
        // Only default to visible if it hasn't been shown in this session
        return !sessionStorage.getItem('splashShown');
    });

    useEffect(() => {
        // Define which pages are considered initial "Entry" pages
        const validEntryPaths = ['/', '/login', '/signup', '/admin/login'];

        // If the splash is not visible, or the user is deep-linking directly to 
        // an internal dashboard/page (not an entry page), kill the splash screen instantly.
        if (!isVisible || !validEntryPaths.includes(location.pathname)) {
            setIsVisible(false);
            document.body.style.overflow = 'unset';
            return;
        }

        // Lock body scroll while splash screen is active
        document.body.style.overflow = 'hidden';

        // The entire sequence takes about 4.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('splashShown', 'true');
            document.body.style.overflow = 'unset';
        }, 4500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'unset';
        };
    }, [isVisible, location.pathname]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-luxe-black flex flex-col items-center justify-center font-serif text-luxe-white"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
                >
                    {/* Main Title Container */}
                    <div className="relative text-center flex flex-col items-center">

                        {/* LUXEDIVE TITLE */}
                        <motion.h1
                            className="text-4xl md:text-6xl tracking-[0.3em] font-light text-luxe-gold mb-2"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                        >
                            LUXEDIVE
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.h2
                            className="text-sm md:text-lg tracking-widest text-luxe-gray uppercase font-light mb-12"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                        >
                            Private Automotive Society
                        </motion.h2>

                        {/* Subtle Gold Line Animation */}
                        <motion.div
                            className="h-[1px] bg-gradient-to-r from-transparent via-luxe-gold/50 to-transparent absolute -bottom-6"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "200px", opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
                        />
                    </div>

                    {/* Bottom Subtext */}
                    <motion.div
                        className="absolute bottom-16 text-xs tracking-widest text-luxe-gray/60 uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2.5 }}
                    >
                        Enter the Extraordinary
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
