import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { KaliLogo } from './KaliLogo';

// Logs based on the user's request/image
const shutdownLogs = [
    "[  OK  ] Stopping user sessions...",
    "[  OK  ] Unmounting filesystems...",
    "[  OK  ] Stopping system services...",
    "[  OK  ] Saving system state...",
    "[  OK  ] Powering off..."
];

export default function ShutdownSequence({ onComplete }) {
    const [currentLine, setCurrentLine] = useState(-1);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Start showing logs
        const logTimer = setInterval(() => {
            setCurrentLine(prev => {
                if (prev < shutdownLogs.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 600); // 600ms per log * 5 logs = 3000ms total

        // Progress bar effect
        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    clearInterval(logTimer);
                    // Additional delay before actual "power off" feel
                    setTimeout(onComplete, 1000);
                    return 100;
                }
                return prev + 1; // 100 steps * 40ms = 4000ms (4 seconds)
            });
        }, 40);

        return () => {
            clearInterval(logTimer);
            clearInterval(progressTimer);
        };
    }, [onComplete]);

    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center font-mono relative overflow-hidden">

            <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-8 z-10">
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <KaliLogo size={120} className="text-[#0098FF]" />
                </motion.div>

                {/* Logs Section - Centered nicely */}
                <div className="w-full flex flex-col items-start pl-20 sm:pl-40">
                    {shutdownLogs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: currentLine >= i ? 1 : 0,
                                y: currentLine >= i ? 0 : 10
                            }}
                            className="text-gray-300 text-sm sm:text-base font-bold tracking-wide py-1"
                        >
                            <span className="text-green-500 mr-3">[  OK  ]</span>
                            {log.replace("[  OK  ] ", "")}
                        </motion.div>
                    ))}
                </div>

                {/* Progress Bar Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-96 mt-8"
                >
                    <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden border border-gray-800">
                        <motion.div
                            className="h-full bg-[#0098FF]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.05 }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Version Text */}
            <div className="absolute bottom-10 text-gray-500 text-xs font-mono">
                Kali Linux 6.6.9-kali1-amd64 (tty1)
            </div>
        </div>
    );
}
