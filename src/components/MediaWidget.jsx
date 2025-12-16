
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, Disc, Heart, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MediaWidget() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1a1b26]/90 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl flex items-center gap-4 z-40 w-96 group hover:scale-105 transition-transform duration-300"
        >
            {/* Album Art */}
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center shrink-0 overflow-hidden shadow-lg animate-[spin_8s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]">
                <div className="absolute inset-0 bg-black/10" />
                <Music size={24} className="text-white relative z-10" />
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-bold truncate">Midnight City</h3>
                <p className="text-gray-400 text-xs truncate">M83 • Hurry Up, We're Dreaming</p>
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-1/3 bg-blue-500 rounded-full" />
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white transition-colors">
                    <SkipBack size={20} />
                </button>
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg active:scale-95"
                >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <SkipForward size={20} />
                </button>
            </div>
        </motion.div>
    );
}
