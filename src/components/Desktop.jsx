import React, { useState, useEffect } from 'react';
import { useWindowManager } from '../context/WindowManagerContext';
import { motion } from 'framer-motion';
import {
    Terminal,
    User,
    Folder,
    Code,
    Chrome,
    Briefcase
} from 'lucide-react';
import Taskbar from './Taskbar';
import RightClickMenu from './RightClickMenu';

// Apps Import
import TerminalApp from './apps/Terminal';
import AboutApp from './apps/About';
import ProjectsApp from './apps/Projects';
import SkillsApp from './apps/Skills';
import VSCodeApp from './apps/VSCode';
import ChromeApp from './apps/Chrome';
import Activities from './Activities';

const DesktopIcon = ({ icon: Icon, label, onClick }) => (
    <div
        className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 cursor-pointer w-24 active:scale-95 transition-transform"
        onClick={onClick}
    >
        <div className="w-12 h-12 flex items-center justify-center text-blue-500 bg-gray-800/50 rounded-lg shadow-lg backdrop-blur-sm">
            <Icon size={32} />
        </div>
        <span className="text-white text-xs text-center drop-shadow-md font-medium px-1 rounded bg-black/20">{label}</span>
    </div>
);

export default function Desktop({ children, wallpaper }) {
    const { openWindow } = useWindowManager();
    const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
    const [showActivities, setShowActivities] = useState(false);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ show: true, x: e.clientX, y: e.clientY });
    };

    const handleCloseContext = () => {
        setContextMenu({ ...contextMenu, show: false });
    };

    const apps = [
        { id: 'terminal', label: 'Terminal', icon: Terminal, component: <TerminalApp />, title: 'visitor@kali-portfolio: ~' },
        { id: 'about', label: 'About Me', icon: User, component: <AboutApp />, title: 'About - Visitor User' },
        { id: 'projects', label: 'Projects', icon: Folder, component: <ProjectsApp />, title: 'Project Explorer' },
        { id: 'skills', label: 'Skills', icon: Briefcase, component: <SkillsApp />, title: 'Technical Skills' },
        { id: 'vscode', label: 'VS Code', icon: Code, component: <VSCodeApp />, title: 'Visual Studio Code - [Portfolio]' },
        { id: 'chrome', label: 'Chrome', icon: Chrome, component: <ChromeApp />, title: 'Google Chrome' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-screen relative overflow-hidden select-none bg-gray-900"
            onContextMenu={handleContextMenu}
            onClick={handleCloseContext}
        >
            {/* Wallpaper Layer - Sized to fit above Taskbar (h-12 = 3rem) */}
            <div
                className="absolute top-0 left-0 w-full bg-no-repeat bg-center"
                style={{
                    height: 'calc(100vh - 3rem)',
                    backgroundImage: `url(${wallpaper})`,
                    backgroundSize: '100% 100%'
                }}
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] pointer-events-none" />

            {/* Grid Pattern Effect (simulated) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Desktop Icons */}
            <div className="absolute top-4 left-4 flex flex-col gap-4 z-10 flex-wrap h-[calc(100vh-80px)] content-start">
                {apps.map(app => (
                    <DesktopIcon
                        key={app.id}
                        icon={app.icon}
                        label={app.label}
                        onClick={(e) => {
                            e.stopPropagation();
                            openWindow(app.id, app.title, app.component, <app.icon size={16} />);
                        }}
                    />
                ))}
            </div>

            {/* Windows Layer */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="pointer-events-auto w-full h-full">
                    {children}
                </div>
            </div>

            {/* Context Menu */}
            <RightClickMenu
                show={contextMenu.show}
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={handleCloseContext}
                onRefresh={() => window.location.reload()}
                onChangeWallpaper={() => alert('Change Wallpaper Feature (Simulated)')}
            />

            {/* Taskbar */}
            <div className="absolute bottom-0 left-0 w-full z-40">
                <Taskbar onToggleActivities={() => setShowActivities(!showActivities)} />
            </div>

            {/* Activities Sidebar */}
            <Activities isOpen={showActivities} onClose={() => setShowActivities(false)} />

            {/* Scanline Effect Overlay */}
            <div className="scanline" />

        </motion.div>
    );
}
