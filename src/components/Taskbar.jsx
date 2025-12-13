import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Volume2, Battery, Power, Search, Terminal, User, Folder, Briefcase, Code, Chrome } from 'lucide-react';
import { KaliLogo } from './KaliLogo';
import { useWindowManager } from '../context/WindowManagerContext';
import TerminalApp from './apps/Terminal';
import AboutApp from './apps/About';
import ProjectsApp from './apps/Projects';
import SkillsApp from './apps/Skills';
import VSCodeApp from './apps/VSCode';
import ChromeApp from './apps/Chrome';

const StartMenu = ({ isOpen, onClose, openWindow }) => {
    if (!isOpen) return null;

    const appList = [
        { id: 'terminal', label: 'Terminal Emulator', icon: Terminal, component: <TerminalApp />, title: 'visitor@kali-portfolio: ~' },
        { id: 'about', label: 'About Me', icon: User, component: <AboutApp />, title: 'About - Visitor User' },
        { id: 'projects', label: 'Projects', icon: Folder, component: <ProjectsApp />, title: 'Project Explorer' },
        { id: 'skills', label: 'Skills & Tools', icon: Briefcase, component: <SkillsApp />, title: 'Technical Skills' },
        { id: 'vscode', label: 'VS Code', icon: Code, component: <VSCodeApp />, title: 'Visual Studio Code - [Portfolio]' },
        { id: 'chrome', label: 'Web Browser', icon: Chrome, component: <ChromeApp />, title: 'Google Chrome' },
    ];

    return (
        <div className="absolute bottom-14 left-4 w-64 bg-[#1a1b26]/95 backdrop-blur-md border border-[#414868] rounded-lg shadow-2xl text-[#a9b1d6] overflow-hidden animate-in slide-in-from-bottom-2 duration-200 z-50">
            <div className="p-3 border-b border-[#414868] flex items-center gap-2 bg-[#16161e]">
                <Search size={14} className="text-gray-400" />
                <input className="bg-transparent outline-none text-sm w-full placeholder-gray-500 text-white" placeholder="Search..." autoFocus />
            </div>
            <div className="py-2">
                <div className="px-4 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Applications</div>
                {appList.map(app => (
                    <div
                        key={app.id}
                        className="px-4 py-2 hover:bg-[#3d59a1] hover:text-white cursor-pointer flex items-center gap-3 transition-colors group"
                        onClick={() => {
                            openWindow(app.id, app.title, app.component, <app.icon size={16} />);
                            onClose();
                        }}
                    >
                        <app.icon size={18} className="text-[#7aa2f7] group-hover:text-white transition-colors" />
                        <span className="text-sm font-medium">{app.label}</span>
                    </div>
                ))}
            </div>
            <div className="border-t border-[#414868] p-3 bg-[#16161e] flex justify-between items-center text-xs text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <User size={12} className="text-blue-400" />
                    </div>
                    <span className="font-medium text-[#c0caf5]">visitor</span>
                </div>
                <Power size={14} className="hover:text-red-500 cursor-pointer transition-colors" />
            </div>
        </div>
    );
};

const TrayIcon = ({ icon: Icon, label, value, tooltipValue, colorClass = "text-gray-300" }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="relative flex items-center gap-2 cursor-pointer group"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Tooltip */}
            {hover && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#1f1f1f] border border-gray-600 px-3 py-1.5 shadow-xl whitespace-nowrap z-[100] min-w-[max-content] animate-in fade-in zoom-in-95 duration-200 rounded-sm">
                    <span className="text-orange-400 font-semibold text-xs font-mono">
                        {label}: <span className="text-gray-200">{tooltipValue || value}</span>
                    </span>
                    {/* Tiny arrow pointing down */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-gray-600" />
                </div>
            )}

            <Icon size={16} className={`${colorClass} transition-transform group-hover:scale-110`} />
            {/* Show value for Vol/Bat */}
            {(label === 'Volume' || label === 'Battery') && <span className="text-xs">{value}</span>}
        </div>
    );
};

export default function Taskbar({ onToggleActivities }) {
    const { openWindow } = useWindowManager();
    const [time, setTime] = useState(new Date());
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <div className="relative z-50" ref={menuRef}>
            <div className="w-full h-12 bg-[#1a1b26] border-t border-[#414868] text-[#a9b1d6] flex items-center justify-between px-4 shadow-lg text-sm font-medium">
                {/* Left: Activities & Workspace */}
                <div className="flex items-center gap-6 h-full">
                    <button
                        className="hover:text-white transition-colors flex items-center gap-2 group"
                        onClick={onToggleActivities}
                    >
                        <KaliLogo size={24} className="text-blue-400 group-hover:animate-pulse" />
                        <span className="font-bold tracking-tight">All Apps</span>
                    </button>

                    {/* Simulated Workspace Indicator */}
                    <div className="hidden md:flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                    </div>
                </div>

                {/* Center: Maybe Window List or just empty for now to match minimal look */}

                {/* Right: System Tray */}
                <div className="flex items-center gap-4">
                    {/* System Icons Group */}
                    <div className="flex items-center gap-4 bg-[#16161e] px-4 py-1.5 rounded-full border border-[#414868]">
                        <TrayIcon icon={Wifi} label="Network" value="Connected" tooltipValue="Wired Connection 1" colorClass="text-purple-400" />
                        <TrayIcon icon={Volume2} label="Volume" value="100%" colorClass="text-blue-400" />
                        <TrayIcon icon={Battery} label="Battery" value="100%" tooltipValue="100% (Charging)" colorClass="text-green-400" />
                    </div>

                    {/* Time & Date Group */}
                    <div className="flex flex-col items-end leading-tight text-xs cursor-default">
                        <span className="font-bold text-white">
                            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="text-gray-400 text-[10px]">
                            {time.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>

            <StartMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} openWindow={openWindow} />
        </div>
    );
}
