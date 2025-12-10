import React, { useState, useEffect } from 'react';

export default function RightClickMenu({ x, y, show, onClose, onRefresh, onChangeWallpaper }) {
    if (!show) return null;

    return (
        <div
            className="absolute z-50 bg-[#2d2d2d] border border-gray-700 rounded shadow-lg py-1 w-48 text-sm text-gray-200 animate-in fade-in zoom-in-95 duration-100"
            style={{ top: y, left: x }}
            onMouseLeave={onClose}
        >
            <div className="px-4 py-2 hover:bg-[#3d3d3d] cursor-pointer" onClick={() => { onRefresh(); onClose(); }}>Refresh</div>
            <div className="h-px bg-gray-700 my-1"></div>
            <div className="px-4 py-2 hover:bg-[#3d3d3d] cursor-pointer" onClick={() => { onChangeWallpaper(); onClose(); }}>Change Wallpaper</div>
            <div className="px-4 py-2 hover:bg-[#3d3d3d] cursor-pointer">Display Settings</div>
            <div className="h-px bg-gray-700 my-1"></div>
            <div className="px-4 py-2 hover:bg-[#3d3d3d] cursor-pointer">Open Terminal Here</div>
        </div>
    );
}
