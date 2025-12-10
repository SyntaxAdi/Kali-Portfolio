import React from 'react';
import { Search, Music, Chrome, Camera, Info, Terminal } from 'lucide-react';
import { useWindowManager } from '../context/WindowManagerContext';
import MusicPlayerApp from './apps/MusicPlayer';
import ChromeApp from './apps/Chrome';
import AboutApp from './apps/About';
import TerminalApp from './apps/Terminal';

// Sidebar Item Component
const SidebarItem = ({ icon: Icon, label, onClick }) => (
    <div
        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group"
        onClick={onClick}
    >
        <div className="p-3 bg-gray-800 rounded-2xl group-hover:scale-105 transition-transform shadow-lg">
            <Icon size={28} className="text-white" />
        </div>
        <span className="text-xs text-gray-300 font-medium text-center w-20 leading-tight">{label}</span>
    </div>
);

export default function Activities({ isOpen, onClose }) {
    const { openWindow } = useWindowManager();

    if (!isOpen) return null;

    const handleLaunch = (id, title, component, icon) => {
        openWindow(id, title, component, icon);
        onClose();
    };

    return (
        <div className="absolute inset-0 z-40 flex">
            {/* Sidebar Area */}
            <div className="w-24 h-full bg-[#111111]/95 backdrop-blur-md border-r border-white/5 flex flex-col items-center py-4 gap-2 animate-in slide-in-from-left duration-300">
                <div className="mb-4 text-blue-500 font-bold tracking-widest text-xs uppercase">Activities</div>

                <SidebarItem
                    icon={Music}
                    label="Music Player"
                    onClick={() => handleLaunch('music', 'Music Player', <MusicPlayerApp />, <Music size={16} />)}
                />
                <SidebarItem
                    icon={Chrome}
                    label="Firefox"
                    onClick={() => handleLaunch('chrome', 'Firefox - Web Browser', <ChromeApp />, <Chrome size={16} />)}
                />
                <SidebarItem
                    icon={Camera}
                    label="Camera"
                    onClick={() => alert('Camera not available in simulated environment.')}
                />
                <SidebarItem
                    icon={Info}
                    label="About System"
                    onClick={() => handleLaunch('about', 'About System', <AboutApp />, <Info size={16} />)}
                />
                <SidebarItem
                    icon={Terminal}
                    label="Terminal"
                    onClick={() => handleLaunch('terminal', 'Terminal', <TerminalApp />, <Terminal size={16} />)}
                />
            </div>

            {/* Overlay to close */}
            <div
                className="flex-1 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />
        </div>
    );
}
