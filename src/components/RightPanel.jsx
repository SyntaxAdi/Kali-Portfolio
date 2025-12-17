import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Volume2, Monitor } from 'lucide-react';

const VerticalSlider = ({ icon: Icon, value, onChange, color = "bg-white" }) => {
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);

    const handleInteraction = (clientY) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const y = clientY - rect.top;
        const height = rect.height;
        const percentage = Math.max(0, Math.min(100, 100 - (y / height * 100)));
        onChange(percentage);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleInteraction(e.clientY);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            handleInteraction(e.clientY);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging]);

    return (
        <div
            ref={sliderRef}
            className="group relative h-32 w-10 bg-black/20 rounded-full overflow-hidden cursor-pointer border border-white/5 shadow-inner"
            onMouseDown={handleMouseDown}
        >
            {/* Background Track */}
            <div className="absolute inset-0 bg-[#0f0f14]/50" />

            {/* Fill Level */}
            <motion.div
                className={`absolute bottom-0 left-0 w-full ${color}/20 backdrop-blur-sm transition-none`}
                style={{ height: `${value}%` }}
                animate={{ height: `${value}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Solid Fill */}
            <motion.div
                className={`absolute bottom-0 left-0 w-full ${color} opacity-80`}
                style={{ height: `${value}%` }}
                animate={{ height: `${value}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Glass/Cover Highlight Overlay */}
            <div className="absolute inset-0 rounded-full pointer-events-none z-20">
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
                <div className="absolute inset-0 border-[0.5px] border-white/20 rounded-full" />
            </div>

            {/* Icon Container */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-black/20 backdrop-blur-md shadow-lg z-10 border border-white/5 pointer-events-none">
                <Icon size={14} className="text-white drop-shadow-md" />
            </div>

            {/* Value Label (Hover) */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-bold text-white/80 select-none pointer-events-none">
                {Math.round(value)}
            </div>
        </div>
    );
};

export default function RightPanel() {
    const [isVisible, setIsVisible] = useState(false);
    const [brightness, setBrightness] = useState(80);
    const [volume, setVolume] = useState(65);

    return (
        <>
            {/* Trigger Zone */}
            <div
                className="fixed top-0 right-0 h-full w-4 z-[60] hover:bg-transparent"
                onMouseEnter={() => setIsVisible(true)}
            />

            {/* Panel Area */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                        }}
                        onMouseLeave={() => setIsVisible(false)}
                        className="fixed inset-y-0 right-0 flex items-center px-4 z-[55]"
                    >
                        <div className="relative h-[300px] flex flex-col items-center justify-center">
                            {/* Background Panel shape */}
                            <div className="absolute inset-0 bg-[#0f0f14]/90 backdrop-blur-md border-l border-y border-white/10 rounded-l-2xl shadow-2xl -z-10" />

                            {/* Controls Stack */}
                            <div className="flex flex-col gap-5">
                                <VerticalSlider
                                    icon={Monitor}
                                    value={brightness}
                                    onChange={setBrightness}
                                    color="bg-blue-500"
                                />
                                <VerticalSlider
                                    icon={Volume2}
                                    value={volume}
                                    onChange={setVolume}
                                    color="bg-purple-500"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
