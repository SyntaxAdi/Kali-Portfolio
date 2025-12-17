import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';

export default function Window({ title, children, icon, onClose, isFocused, onFocus, initialPosition = { x: 100, y: 100 } }) {
    const [isMaximized, setIsMaximized] = useState(false);

    // Drag constraints could be the parent desktop ref usually.

    return (
        <motion.div
            drag={!isMaximized}
            dragMomentum={false}
            initial={initialPosition}
            animate={isMaximized ? { x: 0, y: 0, width: '100%', height: '100%' } : { width: '800px', height: '550px' }}
            onMouseDown={onFocus}
            className={`absolute flex flex-col pointer-events-auto bg-[#1c1d1f] border border-[#333] shadow-2xl overflow-hidden rounded-t-lg
        ${isFocused ? 'z-40 border-blue-500/50 ring-1 ring-blue-500/20' : 'z-10 opacity-90'}
      `}
            style={{ top: 0, left: 0 }} // Position handled by motion
        >
            {/* Window Title Bar */}
            <div
                className="h-8 bg-[#252525] flex items-center justify-between px-2 select-none cursor-default"
                onDoubleClick={() => setIsMaximized(!isMaximized)}
            >
                <div className="flex items-center gap-2">
                    {icon || <TerminalIcon size={14} className="text-gray-400" />}
                    <span className="text-xs font-bold text-gray-300">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-white/10 rounded-full" onClick={() => {/* Minimize logic */ }}>
                        <Minus size={12} className="text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-white/10 rounded-full" onClick={() => setIsMaximized(!isMaximized)}>
                        <Square size={10} className="text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-red-500 rounded-full group" onClick={onClose}>
                        <X size={12} className="text-gray-400 group-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto bg-[#0d1117] text-gray-200 p-2 font-mono text-sm scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {children}
            </div>
        </motion.div>
    );
}
