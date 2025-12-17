import React, { useState, useEffect } from 'react';
import { RefreshCw, Image, Terminal, Settings } from 'lucide-react';

export default function RightClickMenu({ x, y, show, onClose, onRefresh, onChangeWallpaper, onOpenTerminal, onOpenSettings }) {
    if (!show) return null;

    return (
        <div
            className="absolute z-[100] bg-[#1a1b26]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-1 w-56 text-sm text-gray-200 animate-in fade-in zoom-in-95 duration-100 overflow-hidden"
            style={{ top: y, left: x }}
            onMouseLeave={onClose}
        >
            <div className="px-3 py-2.5 hover:bg-white/10 cursor-pointer flex items-center gap-3 transition-colors" onClick={() => { onRefresh(); onClose(); }}>
                <RefreshCw size={14} className="text-blue-400" />
                <span>Refresh</span>
            </div>

            <div className="h-px bg-white/10 my-1 mx-2"></div>

            <div className="px-3 py-2.5 hover:bg-white/10 cursor-pointer flex items-center gap-3 transition-colors" onClick={() => { onChangeWallpaper(); onClose(); }}>
                <Image size={14} className="text-purple-400" />
                <span>Change Background</span>
            </div>

            <div className="px-3 py-2.5 hover:bg-white/10 cursor-pointer flex items-center gap-3 transition-colors" onClick={() => { onOpenSettings(); onClose(); }}>
                <Settings size={14} className="text-gray-400" />
                <span>Settings</span>
            </div>

            <div className="h-px bg-white/10 my-1 mx-2"></div>

            <div className="px-3 py-2.5 hover:bg-white/10 cursor-pointer flex items-center gap-3 transition-colors" onClick={() => { onOpenTerminal(); onClose(); }}>
                <Terminal size={14} className="text-green-400" />
                <span>Open Terminal Here</span>
            </div>
        </div>
    );
}
