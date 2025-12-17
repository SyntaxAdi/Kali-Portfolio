import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Wifi, Volume2, Battery, Power, Calendar, Monitor, Radio, Terminal, Code, Globe, Folder, Music, Play, Pause, SkipForward, SkipBack, Bluetooth, Clock } from 'lucide-react';
import { KaliLogo } from './KaliLogo';
import { useWindowManager } from '../context/WindowManagerContext';
import { motion, AnimatePresence } from 'framer-motion';

// Import App Components for Launching
import TerminalApp from './apps/Terminal';
import VSCodeApp from './apps/VSCode';
import ChromeApp from './apps/Chrome';
import ProjectsApp from './apps/Projects';
import MusicPlayerApp from './apps/MusicPlayer';

// Better simple Pacman SVG
const PacmanIcon = ({ size = 24, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" fill="currentColor" stroke="none" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" fill="transparent" stroke="none" />
    </svg>
);

const DockItem = ({ icon: Icon, label, id, isOpen, isFocused, onClick, previewContent }) => {
    const [isHovered, setIsHovered] = useState(false);
    const iconRef = useRef(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const handleMouseEnter = () => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top + rect.height / 2,
                left: rect.right + 24
            });
        }
        setIsHovered(true);
    };

    return (
        <div
            className="relative flex justify-center w-full px-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.button
                layout
                onClick={onClick}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`
                    relative rounded-full transition-all duration-300 w-10 border overflow-visible
                    ${isFocused
                        ? 'h-20 bg-blue-600/20 border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                        : 'h-10 bg-transparent border-transparent hover:bg-white/5'
                    }
                `}
            >
                {/* IMMUTABLE ICON LAYER - Anchored to Top */}
                <div
                    ref={iconRef}
                    className="absolute top-0 left-0 w-full h-10 flex items-center justify-center z-20"
                >
                    <Icon
                        size={20}
                        className={`transition-all duration-300 ${isFocused ? 'text-blue-400 scale-110' : 'text-gray-400 group-hover:text-gray-200'}`}
                    />
                </div>

                {/* DECORATION LAYER - Anchored to Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-center z-10 pointer-events-none">
                    <AnimatePresence>
                        {isFocused && (
                            <motion.div
                                key="pacman"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="text-blue-400"
                            >
                                <PacmanIcon size={14} className="fill-blue-400" />
                            </motion.div>
                        )}

                        {!isFocused && isOpen && (
                            <motion.div
                                key="dot"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute bottom-1 w-1 h-1 rounded-full bg-gray-500"
                            />
                        )}
                    </AnimatePresence>
                </div>
            </motion.button>

            {/* Portal Preview - Viewport Anchored */}
            {createPortal(
                <AnimatePresence>
                    {isHovered && !isFocused && (
                        <motion.div
                            initial={{ opacity: 0, x: -10, y: "-50%", scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
                            exit={{ opacity: 0, x: -10, y: "-50%", scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'fixed',
                                top: coords.top,
                                left: coords.left,
                                zIndex: 9999,
                                pointerEvents: 'none'
                            }}
                            className="font-sans"
                        >
                            <div className="bg-[#1a1b26] border border-[#414868] rounded-xl shadow-2xl p-3 w-64 overflow-hidden relative text-left">
                                {/* Arrow */}
                                <div className="absolute top-1/2 right-full -translate-y-1/2 -mr-[0.5px] border-[6px] border-transparent border-r-[#414868]" />

                                {/* Header */}
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                                    <Icon size={14} className="text-blue-400" />
                                    <span className="text-xs font-bold text-gray-200">{label}</span>
                                    {isOpen && <span className="text-[9px] px-1.5 rounded bg-green-500/20 text-green-400 ml-auto">Running</span>}
                                </div>

                                {/* Content Preview */}
                                <div className="bg-[#0f0f14] rounded-lg p-2 min-h-[80px] flex flex-col items-center justify-center text-center gap-2 relative overflow-hidden">
                                    {/* Background decoration */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50" />
                                    {previewContent}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

// Monitor/Activites Toggle Component
const DesktopToggle = ({ onToggle, windows }) => {
    const [isHovered, setIsHovered] = useState(false);
    const textRef = useRef(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const handleMouseEnter = () => {
        if (textRef.current) {
            const rect = textRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top + rect.height / 2,
                left: rect.right + 35
            });
        }
        setIsHovered(true);
    };

    return (
        <div
            className="relative flex flex-col items-center gap-1 group w-full mt-8" // Increased margin top here
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Icon & Popup Container */}
            <div
                className={`transition-all duration-300 p-2 rounded-xl relative ${isHovered ? 'bg-[#1a1b26] text-white' : 'text-gray-400'}`}
            >
                <Monitor size={20} className={isHovered ? 'text-blue-400' : ''} />
            </div>

            {/* Vertical Text */}
            <div
                ref={textRef}
                className="flex flex-col items-center leading-[0.8] text-[9px] font-medium text-gray-500 group-hover:text-blue-300 transition-colors uppercase tracking-widest gap-[1px]"
            >
                {['a', 'y', 't', 'i', 'd', 'a', 'A'].map((char, i) => (
                    <span key={i} className="-rotate-90">{char}</span>
                ))}
            </div>

            {/* Portal Large Apps Preview Card */}
            {createPortal(
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: -10, y: "-50%", scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
                            exit={{ opacity: 0, x: -10, y: "-50%", scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'fixed',
                                top: coords.top,
                                left: coords.left,
                                zIndex: 9999,
                                pointerEvents: 'none'
                            }}
                        >
                            <div className="bg-[#1a1b26] border border-[#414868] rounded-xl shadow-2xl p-4 w-80 overflow-hidden relative flex flex-col gap-3">
                                {/* Arrow */}
                                <div className="absolute top-1/2 right-full -translate-y-1/2 -mr-[0.5px] border-[8px] border-transparent border-r-[#414868]" />

                                {/* Header */}
                                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                                    <Monitor size={16} className="text-blue-400" />
                                    <span className="text-sm font-bold text-gray-200">Active Workspaces</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 ml-auto">
                                        {windows.length} Active
                                    </span>
                                </div>

                                {/* Grid of Open Apps */}
                                <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                                    {windows.length === 0 ? (
                                        <div className="col-span-2 h-32 flex flex-col items-center justify-center text-gray-500 gap-2 border border-dashed border-white/10 rounded-xl">
                                            <Monitor size={24} className="opacity-20" />
                                            <span className="text-xs">No active windows</span>
                                        </div>
                                    ) : (
                                        windows.map((w, i) => (
                                            <div key={w.id} className="aspect-video bg-[#0f0f14] rounded-lg border border-white/5 overflow-hidden relative group/preview">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {/* Mini representation */}
                                                    <div className="scale-75 opacity-70 grayscale group-hover/preview:grayscale-0 group-hover/preview:opacity-100 transition-all text-white/50">
                                                        {/* Generic Icon */}
                                                        <div className="w-full h-full bg-white/5 flex items-center justify-center rounded">
                                                            <Monitor size={12} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 inset-x-0 bg-black/40 p-1 text-[8px] text-center text-white truncate backdrop-blur-sm">
                                                    {w.title}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    )
}


// System Control Icon with Tooltip
const SystemControl = ({ icon: Icon, label }) => {
    const [isHovered, setIsHovered] = useState(false);
    const iconRef = useRef(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const handleMouseEnter = () => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top + rect.height / 2,
                left: rect.right + 15
            });
        }
        setIsHovered(true);
    };

    const [title, value] = label.includes(':') ? label.split(':') : [label, ''];

    return (
        <>
            <div
                ref={iconRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative cursor-pointer"
            >
                <Icon size={16} className="text-gray-400 group-hover:text-white transition-colors" />
            </div>

            {createPortal(
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: -10, y: "-50%", scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
                            exit={{ opacity: 0, x: -10, y: "-50%", scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            style={{
                                position: 'fixed',
                                top: coords.top,
                                left: coords.left,
                                zIndex: 9999,
                                pointerEvents: 'none'
                            }}
                            className="flex items-center"
                        >
                            {/* Rich Tooltip Card */}
                            <div className="flex items-center gap-3 bg-[#0f0f14]/90 backdrop-blur-xl border border-white/10 p-2 pr-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.6)] min-w-[140px]">
                                {/* Icon Box */}
                                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">
                                    <Icon size={16} className="text-blue-400" />
                                </div>

                                {/* Text Info */}
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold leading-none">
                                        {title}
                                    </span>
                                    <span className="text-xs text-gray-100 font-medium leading-none">
                                        {value || title}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default function SidePanel({ onToggleActivities, onShutdown }) {
    const { openWindow, windows, focusWindow, focusedWindowId } = useWindowManager();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const dockApps = [
        {
            id: 'terminal',
            label: 'Terminal',
            icon: Terminal,
            component: <TerminalApp />,
            title: 'visitor@kali-portfolio: ~',
            preview: (
                <div className="w-full text-left font-mono text-[8px] text-green-400 opacity-70 leading-tight">
                    <span className="text-blue-400">➜</span> <span className="text-pink-400">~</span> ls -la<br />
                    drwxr-xr-x  user  staff<br />
                    -rw-r--r--  main.tsx
                </div>
            )
        },
        {
            id: 'chrome',
            label: 'Firefox',
            icon: Globe,
            component: <ChromeApp />,
            title: 'Mozilla Firefox',
            preview: (
                <div className="flex flex-col gap-1 w-full">
                    <div className="h-2 w-3/4 bg-gray-700 rounded-full animate-pulse" />
                    <div className="h-2 w-1/2 bg-gray-800 rounded-full" />
                    <div className="h-16 w-full bg-gray-800/50 rounded mt-1 border border-white/5" />
                </div>
            )
        },
        {
            id: 'vscode',
            label: 'VS Code',
            icon: Code,
            component: <VSCodeApp />,
            title: 'VS Code',
            preview: (
                <div className="w-full text-left font-mono text-[8px] opacity-70 leading-tight">
                    <span className="text-pink-400">import</span> React <span className="text-pink-400">from</span> <span className="text-green-400">'react'</span>;<br />
                    <span className="text-blue-400">const</span> <span className="text-yellow-400">App</span> = () {'=>'} {'{'}<br />
                    &nbsp;&nbsp;<span className="text-pink-400">return</span> {'<div />'};<br />
                    {'}'}
                </div>
            )
        },
        {
            id: 'projects',
            label: 'Files',
            icon: Folder,
            component: <ProjectsApp />,
            title: 'File Manager',
            preview: (
                <div className="grid grid-cols-3 gap-1 w-full opacity-60">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="aspect-square bg-blue-500/20 rounded flex items-center justify-center">
                            <Folder size={8} className="text-blue-400" />
                        </div>
                    ))}
                </div>
            )
        },
        {
            id: 'music',
            label: 'Music',
            icon: Music,
            component: <MusicPlayerApp />,
            title: 'Music Player',
            preview: (
                <div className="flex items-center gap-2 w-full">
                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                        <Music size={12} className="text-white" />
                    </div>
                </div>
            )
        }
    ];

    return (
        <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="fixed top-0 left-0 h-full w-14 bg-[#1a1b26]/95 backdrop-blur-md border-r border-[#414868] flex flex-col items-center pt-6 pb-2 z-50 shadow-2xl select-none text-[#a9b1d6]"
        >
            {/* 1. Logo (Top) - Click Disabled */}
            <div className="mb-0 group">
                <div className="p-1 rounded-xl transition-colors cursor-default opacity-80 hover:opacity-100">
                    <KaliLogo size={32} className="text-white rounded-full transition-all duration-300" />
                </div>
            </div>

            {/* Spacer - ~2cm (approx 3rem/48px to 4rem/64px) margin top for the container below */}

            {/* 2. Dock / Apps Container */}
            <div className="w-full flex flex-col items-center mt-[10px]">
                {/* Unified Background Container */}
                <motion.div
                    layout
                    className="flex flex-col items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full py-2 px-1 gap-2"
                >
                    {dockApps.map((app) => {
                        const isOpen = windows.some(w => w.id === app.id);
                        const isFocused = focusedWindowId === app.id;

                        return (
                            <DockItem
                                key={app.id}
                                {...app}
                                isOpen={isOpen}
                                isFocused={isFocused}
                                previewContent={app.preview}
                                onClick={() => {
                                    if (isOpen && isFocused) {
                                        // Minimize or noop
                                    } else {
                                        openWindow(app.id, app.title, app.component, <app.icon size={16} />);
                                        focusWindow(app.id);
                                    }
                                }}
                            />
                        );
                    })}
                </motion.div>
            </div>

            {/* 3. Box 2: Monitor / Aaditya */}
            <DesktopToggle onToggle={onToggleActivities} windows={windows} />

            {/* Spacer */}
            <div className="flex-1" />

            {/* 4. Box 4: Time Only (Vertical) */}
            <div className="flex flex-col items-center gap-2 mb-6 select-none">
                <Clock size={16} className="text-blue-400 opacity-80" />
                <div className="flex flex-col items-center leading-none">
                    {/* Hour */}
                    <span className="text-lg font-black text-gray-100 tracking-tight">
                        {(time.getHours() % 12 || 12).toString().padStart(2, '0')}
                    </span>
                    {/* Minute */}
                    <span className="text-lg font-black text-gray-100 tracking-tight">
                        {time.getMinutes().toString().padStart(2, '0')}
                    </span>
                    {/* AM/PM */}
                    <span className="text-[10px] font-bold text-gray-500 mt-1">
                        {time.getHours() >= 12 ? 'PM' : 'AM'}
                    </span>
                </div>
            </div>

            {/* 5. Box 5: System Controls */}
            <div className="w-10 bg-black/20 rounded-full py-4 flex flex-col items-center gap-3 border border-white/5 mb-1 shadow-lg">
                <SystemControl icon={Wifi} label="Wi-Fi: AADITYA_5G" />
                <SystemControl icon={Bluetooth} label="Bluetooth: On" />
                <SystemControl icon={Volume2} label="Volume: 80%" />
                <SystemControl icon={Battery} label="Battery: 100% (Charging)" />
            </div>

            {/* Power - Separated at the bottom */}
            <button
                onClick={onShutdown}
                className="group mt-1 p-2 rounded-full hover:bg-white/5 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-white/5"
            >
                <Power size={18} className="text-red-400 group-hover:text-red-300 transition-colors" />
            </button>

        </motion.div>
    );
}
