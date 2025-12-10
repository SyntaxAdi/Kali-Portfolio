import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(30);

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col items-center justify-center p-6 text-white">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center mb-6">
                <Music size={48} className="text-white/80" />
            </div>

            <h3 className="text-xl font-bold mb-1">Epic Cinematic</h3>
            <p className="text-gray-400 text-sm mb-8">Pixabay Music</p>

            <div className="w-full flex items-center gap-3 mb-2 px-4">
                <span className="text-xs text-gray-500">0:45</span>
                <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-xs text-gray-500">2:30</span>
            </div>

            <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-white transition-colors"><SkipBack size={24} /></button>
                <button
                    className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors shadow-lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-1" />}
                </button>
                <button className="text-gray-400 hover:text-white transition-colors"><SkipForward size={24} /></button>
            </div>
        </div>
    );
}
