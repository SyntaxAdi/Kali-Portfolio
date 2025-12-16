import React, { useState, useEffect } from 'react';
import { useWindowManager } from '../context/WindowManagerContext';
import { motion } from 'framer-motion';
import RightClickMenu from './RightClickMenu';
import SidePanel from './SidePanel';
import MediaWidget from './MediaWidget';
import Activities from './Activities';

export default function Desktop({ children, wallpaper, onShutdown }) {
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
            {/* Wallpaper Layer */}
            <div
                className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover transition-all duration-500"
                style={{
                    backgroundImage: `url(${wallpaper})`,
                    filter: showActivities ? 'blur(10px) scale(1.05)' : 'none'
                }}
            />

            {/* Main Content Area - Shifted for SidePanel */}
            <div className="absolute inset-0 pl-24 pt-4 pr-4 pb-4 z-20 pointer-events-none">
                <div className="pointer-events-auto w-full h-full relative">
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

            {/* Side Panel (Dock) */}
            <SidePanel
                onToggleActivities={() => setShowActivities(!showActivities)}
                onShutdown={onShutdown}
            />

            {/* Activities Overlay */}
            <Activities
                isOpen={showActivities}
                onClose={() => setShowActivities(false)}
                onShutdown={onShutdown}
            />

        </motion.div>
    );
}
