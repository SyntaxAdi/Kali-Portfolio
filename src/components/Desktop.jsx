import React, { useState, useEffect } from 'react';
import { useWindowManager } from '../context/WindowManagerContext';
import { motion } from 'framer-motion';
import { Terminal, User } from 'lucide-react';
import RightClickMenu from './RightClickMenu';
import SidePanel from './SidePanel';
import RightPanel from './RightPanel';
import PowerMenu from './PowerMenu';
import Activities from './Activities';
import TerminalApp from './apps/Terminal';
import About from './apps/About';

const DesktopIcon = ({ icon: Icon, label, onClick }) => (
    <button
        onClick={onClick}
        onDoubleClick={onClick}
        className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 w-24 group transition-colors focus:outline-none focus:bg-white/20 cursor-pointer"
    >
        <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors shadow-lg border border-blue-400/20">
            <Icon size={32} className="text-blue-400 group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-xs font-medium text-gray-200 drop-shadow-md text-center leading-tight bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/5">{label}</span>
    </button>
);

export default function Desktop({ children, wallpaper, onLogOff, onPowerOff, onChangeWallpaper }) {
    const { openWindow } = useWindowManager();
    const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
    const [showActivities, setShowActivities] = useState(false);
    const [showPowerMenu, setShowPowerMenu] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ show: true, x: e.clientX, y: e.clientY });
    };

    const handleCloseContext = () => {
        setContextMenu({ ...contextMenu, show: false });
    };

    const handleOpenTerminal = () => {
        openWindow('terminal', 'visitor@kali-portfolio: ~', <TerminalApp />, <Terminal size={16} />);
    };

    const handleOpenAbout = () => {
        openWindow('about', 'neofetch - About Me', <About />, <User size={16} />);
    };

    const handleRefresh = () => {
        // Simulate a refresh by forcing a re-render or "blinking" the UI
        setRefreshKey(prev => prev + 1);
    };

    return (
        <motion.div
            key={refreshKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-screen relative overflow-hidden select-none bg-gray-900"
            onContextMenu={handleContextMenu}
            onClick={handleCloseContext}
        >
            {/* Wallpaper Layer */}
            <div
                className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover transition-all duration-500"
                style={{
                    backgroundImage: `url(${wallpaper})`,
                    filter: showActivities ? 'blur(10px) scale(1.05)' : 'none'
                }}
            />

            {/* Main Content Area - Shifted for SidePanel */}
            <div className="absolute inset-0 pl-16 pt-4 pr-4 pb-4 z-20 pointer-events-none">
                {/* Desktop Icons Layer */}
                <div className="absolute inset-0 pl-16 pt-8 pr-4 z-10 pointer-events-auto flex flex-col flex-wrap content-start gap-6">
                    <DesktopIcon icon={User} label="About Me" onClick={handleOpenAbout} />
                </div>

                {/* Windows Layer */}
                <div className="pointer-events-none w-full h-full relative z-20">
                    {children}
                </div>
            </div>

            {/* Context Menu */}
            <RightClickMenu
                show={contextMenu.show}
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={handleCloseContext}
                onRefresh={handleRefresh}
                onChangeWallpaper={onChangeWallpaper}
                onOpenTerminal={handleOpenTerminal}
                onOpenSettings={() => setShowActivities(true)}
            />

            {/* Side Panel (Dock) */}
            <SidePanel
                onToggleActivities={() => setShowActivities(!showActivities)}
                onShutdown={() => setShowPowerMenu(true)}
            />

            {/* Right Side Control Panel */}
            <RightPanel />

            {/* Power Menu */}
            <PowerMenu
                isOpen={showPowerMenu}
                onClose={() => setShowPowerMenu(false)}
                onLogOff={onLogOff}
                onPowerOff={onPowerOff}
            />

            {/* Activities Overlay */}
            <Activities
                isOpen={showActivities}
                onClose={() => setShowActivities(false)}
                onShutdown={onPowerOff}
            />

        </motion.div>
    );
}
