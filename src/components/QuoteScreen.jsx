import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { KaliLogo } from './KaliLogo';

export default function QuoteScreen({ onComplete }) {
    useEffect(() => {
        // Show for 4 seconds then complete
        const timer = setTimeout(() => {
            onComplete();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white relative z-50"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex flex-col items-center gap-8"
            >
                {/* Large Kali Dragon Logo */}
                <KaliLogo size={200} className="text-gray-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />

                {/* The Quote */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="font-mono text-xl md:text-2xl text-gray-400 text-center tracking-wider"
                >
                    "The quieter you become, the more you are able to hear."
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
