import React from 'react';
import {
    X,
    Music,
    Globe,
    Camera,
    Gamepad2,
    Info,
    Code,
    Github,
    Linkedin,
    Instagram,
    Twitter,
    Power,
    ChevronRight
} from 'lucide-react';
import { useWindowManager } from '../context/WindowManagerContext';
import { KaliLogo } from './KaliLogo';
import MusicPlayerApp from './apps/MusicPlayer';
import ChromeApp from './apps/Chrome';
import AboutApp from './apps/About';
import TerminalApp from './apps/Terminal';

// Compact App Grid Item
const AppGridItem = ({ icon: Icon, label, onClick, colorClass = "text-white" }) => (
    <div
        className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-all hover:-translate-y-1 active:scale-95 group"
        onClick={onClick}
    >
        <div className="p-2.5 bg-gray-800/80 rounded-xl shadow-lg border border-white/5 group-hover:border-blue-500/30 group-hover:shadow-blue-500/10 transition-all">
            <Icon size={24} className={colorClass} />
        </div>
        <span className="text-[10px] text-gray-400 group-hover:text-gray-200 font-medium text-center leading-tight tracking-wide">{label}</span>
    </div>
);

// Compact Connect Item
const ConnectItem = ({ icon: Icon, label, onClick }) => (
    <div
        className="flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-white/5 cursor-pointer transition-colors text-gray-400 hover:text-white group"
        onClick={onClick}
    >
        <Icon size={14} className="group-hover:text-blue-400 transition-colors" />
        <span className="text-xs font-medium">{label}</span>
        <ChevronRight size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-gray-500" />
    </div>
);

export default function Activities({ isOpen, onClose }) {
    const { openWindow } = useWindowManager();

    if (!isOpen) return null;

    const handleLaunch = (id, title, component, icon) => {
        openWindow(id, title, component, icon);
        onClose();
    };

    const handleExternalLink = (url) => {
        window.open(url, '_blank');
        onClose();
    };

    return (
        <>
            {/* Invisible Backdrop to handle clicks outside */}
            <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose} />

            {/* Floating Menu Card */}
            <div className="fixed bottom-14 left-4 z-50 w-[540px] h-[360px] flex flex-col rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-6 zoom-in-95 duration-200 border border-white/10 font-sans">

                {/* Header */}
                <div className="h-10 bg-[#0098FF] flex items-center justify-between px-4 shadow-md shrink-0 bg-gradient-to-r from-[#0098FF] to-[#007ccf]">
                    <div className="flex items-center gap-2">
                        <KaliLogo size={18} className="text-white" />
                        <span className="text-white font-bold text-sm tracking-wide shadow-sm">Activities</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Content Body */}
                <div className="flex-1 flex bg-[#0f0f0f]/95 backdrop-blur-xl">

                    {/* APPLICATIONS SECTION (Left) */}
                    <div className="flex-[2] p-5 border-r border-white/5 bg-gradient-to-b from-[#131313] to-[#0f0f0f]">
                        <h3 className="text-[10px] font-bold text-gray-500 mb-4 tracking-[0.2em] uppercase pl-1">Applications</h3>

                        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                            <AppGridItem
                                icon={Music}
                                label="Music"
                                colorClass="text-green-400"
                                onClick={() => handleLaunch('music', 'Music Player', <MusicPlayerApp />, <Music size={16} />)}
                            />
                            <AppGridItem
                                icon={Globe}
                                label="Firefox"
                                colorClass="text-orange-500"
                                onClick={() => handleLaunch('chrome', 'Firefox - Web Browser', <ChromeApp />, <Globe size={16} />)}
                            />
                            <AppGridItem
                                icon={Camera}
                                label="Camera"
                                colorClass="text-gray-300"
                                onClick={() => alert('Camera not available in simulated environment.')}
                            />
                            <AppGridItem
                                icon={Gamepad2}
                                label="Games"
                                colorClass="text-purple-400"
                                onClick={() => alert('Minecraft launcher not installed.')}
                            />
                            <AppGridItem
                                icon={Info}
                                label="About"
                                colorClass="text-blue-400"
                                onClick={() => handleLaunch('about', 'About System', <AboutApp />, <Info size={16} />)}
                            />
                            {/* Placeholder for expansion */}
                            <AppGridItem
                                icon={Code}
                                label="VS Code"
                                colorClass="text-blue-500"
                                onClick={() => alert('VS Code shortcut.')}
                            />
                        </div>
                    </div>

                    {/* CONNECT SECTION (Right) */}
                    <div className="flex-1 p-5 flex flex-col bg-[#0a0a0a]/50">
                        <h3 className="text-[10px] font-bold text-gray-500 mb-3 tracking-[0.2em] uppercase">Connect</h3>
                        <div className="flex flex-col gap-0.5">
                            <ConnectItem
                                icon={Code}
                                label="Source"
                                onClick={() => handleExternalLink('https://github.com/aaditya-srivastava/Kali-Portfolio')}
                            />
                            <ConnectItem
                                icon={Github}
                                label="GitHub"
                                onClick={() => handleExternalLink('https://github.com/aaditya-srivastava')}
                            />
                            <ConnectItem
                                icon={Linkedin}
                                label="LinkedIn"
                                onClick={() => handleExternalLink('https://linkedin.com/in/aaditya-srivastava')}
                            />
                            <ConnectItem
                                icon={Instagram}
                                label="Instagram"
                                onClick={() => handleExternalLink('https://instagram.com')}
                            />
                            <ConnectItem
                                icon={Twitter}
                                label="Twitter"
                                onClick={() => handleExternalLink('https://twitter.com')}
                            />
                        </div>

                        <div className="mt-auto pt-3 border-t border-white/5">
                            <ConnectItem
                                icon={Power}
                                label="Power Off"
                                onClick={() => window.location.reload()}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
