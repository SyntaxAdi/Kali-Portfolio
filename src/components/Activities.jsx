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
    Send,
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

export default function Activities({ isOpen, onClose, onShutdown }) {
    const { openWindow } = useWindowManager();
    const [view, setView] = React.useState('grid'); // 'grid' | 'about'

    // Reset view when closed
    React.useEffect(() => {
        if (!isOpen) setView('grid');
    }, [isOpen]);

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
            <div className="fixed inset-0 m-auto z-50 w-[640px] h-[480px] flex flex-col rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-white/10 font-sans">

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

                    {/* APPLICATIONS / ABOUT SECTION (Left) */}
                    <div className="flex-[2] p-5 border-r border-white/5 bg-gradient-to-b from-[#131313] to-[#0f0f0f] relative overflow-hidden">

                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase pl-1">Applications</h3>
                        </div>

                        {/* View Content */}
                        <div className="relative w-full h-full">

                            {/* Grid View */}
                            <div className={`absolute inset-0 transition-opacity duration-300 ${view === 'grid' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
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
                                        label="About System"
                                        colorClass="text-blue-400"
                                        onClick={() => setView('about')}
                                    />
                                    <AppGridItem
                                        icon={Code}
                                        label="VS Code"
                                        colorClass="text-blue-500"
                                        onClick={() => alert('VS Code shortcut.')}
                                    />
                                </div>
                            </div>

                            {/* About View */}
                            <div className={`absolute inset-0 transition-all duration-300 transform ${view === 'about' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 z-0 pointer-events-none'}`}>
                                <button
                                    onClick={() => setView('grid')}
                                    className="text-xs text-blue-400 hover:text-blue-300 mb-6 flex items-center gap-1 transition-colors font-medium"
                                >
                                    + Back to apps
                                </button>

                                <div className="flex flex-col gap-6 pl-1">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/5 rounded-full border border-white/10">
                                            <KaliLogo size={42} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-white font-bold text-lg leading-tight">Kali Portfolio</h2>
                                            <span className="text-gray-500 text-xs font-mono">Version 2024.1</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 font-mono text-xs">
                                        <div className="flex">
                                            <span className="text-blue-400 w-20">OS:</span>
                                            <span className="text-gray-300">Kali Linux x86_64</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-blue-400 w-20">Kernel:</span>
                                            <span className="text-gray-300">6.6.9-kali1-amd64</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-blue-400 w-20">Shell:</span>
                                            <span className="text-gray-300">zsh 5.9</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-blue-400 w-20">DE:</span>
                                            <span className="text-gray-300">Portfolio DE</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-blue-400 w-20">User:</span>
                                            <span className="text-gray-300">Aaditya</span>
                                        </div>
                                        <div className="flex">
                                            <span className="text-blue-400 w-20">Theme:</span>
                                            <span className="text-gray-300">Kali Dark</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* CONNECT SECTION (Right) */}
                    <div className="flex-1 p-5 flex flex-col bg-[#0a0a0a]/50">
                        <h3 className="text-[10px] font-bold text-gray-500 mb-3 tracking-[0.2em] uppercase">Connect</h3>
                        <div className="flex flex-col gap-0.5">
                            <ConnectItem
                                icon={Code}
                                label="Source Code"
                                onClick={() => handleExternalLink('https://github.com/SyntaxAdi/Kali-Portfolio')}
                            />
                            <ConnectItem
                                icon={Github}
                                label="GitHub"
                                onClick={() => handleExternalLink('https://github.com/SyntaxAdi')}
                            />
                            <ConnectItem
                                icon={Linkedin}
                                label="LinkedIn"
                                onClick={() => handleExternalLink('https://www.linkedin.com/in/aaditya-pawar2004/')}
                            />
                            <ConnectItem
                                icon={Instagram}
                                label="Instagram"
                                onClick={() => handleExternalLink('https://www.instagram.com/lol_aaditya_lol')}
                            />
                            <ConnectItem
                                icon={Send}
                                label="Telegram"
                                onClick={() => handleExternalLink('https://t.me/ItzAditya_xD')}
                            />
                        </div>

                        <div className="mt-auto pt-3 border-t border-white/5">
                            <ConnectItem
                                icon={Power}
                                label="Power Off"
                                onClick={onShutdown}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
