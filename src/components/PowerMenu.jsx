import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Power } from 'lucide-react';

export default function PowerMenu({ isOpen, onClose, onLogOff, onPowerOff }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed inset-y-0 right-0 flex items-center px-4 z-[60]"
                >
                    {/* Backdrop to close on click outside */}
                    <div className="fixed inset-0 z-[-1]" onClick={onClose} />

                    <div className="relative flex flex-col items-center justify-center p-3 bg-[#0f0f14]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl gap-5 min-w-[80px]">

                        {/* Log Off Button */}
                        <button
                            onClick={onLogOff}
                            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all group flex flex-col items-center gap-1"
                            title="Log Off"
                        >
                            <LogOut size={20} className="text-white/70 group-hover:text-red-400 transition-colors" />
                        </button>

                        {/* Video Circle / Avatar */}
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shadow-lg relative bg-black">
                            <video
                                src="/right-panel.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Power Off Button */}
                        <button
                            onClick={onPowerOff}
                            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all group flex flex-col items-center gap-1"
                            title="Power Off"
                        >
                            <Power size={20} className="text-white/70 group-hover:text-red-500 transition-colors" />
                        </button>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
