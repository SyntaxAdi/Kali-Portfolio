import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bootLogs = [
    "Loading Linux 6.6.9-amd64 ...",
    "Loading initial ramdisk ...",
    "[    0.000000] Linux version 6.6.9-kali1-amd64 (devel@kali.org) (gcc-13 13.2.0) #1 SMP PREEMPT_DYNAMIC Kali",
    "[    0.234123] Command line: BOOT_IMAGE=/boot/vmlinuz-6.6.9-amd64 root=UUID=kali-portfolio ro quiet splash",
    "[    0.234123] KERNEL supported cpus:",
    "[    0.234123]   Intel GenuineIntel",
    "[    0.234123]   AMD AuthenticAMD",
    "[    0.234123]   Hygon HygonGenuine",
    "[    0.234123]   Centaur CentaurHauls",
    "[    0.234123]   zhaoxin Shanghai  ",
    "[    0.234456] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'",
];

export default function BootSequence({ onComplete }) {
    const [currentLine, setCurrentLine] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Line-by-line printing effect
        const logTimer = setInterval(() => {
            setCurrentLine(prev => {
                if (prev < bootLogs.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 100);

        // Progress bar effect
        // 100 / 2 = 50 steps. 50 * 50ms = 2500ms = 2.5s
        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    clearInterval(logTimer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        return () => {
            clearInterval(logTimer);
            clearInterval(progressTimer);
        };
    }, [onComplete]);

    return (
        <div className="h-screen w-screen bg-black text-gray-300 font-mono text-sm p-4 overflow-hidden flex flex-col justify-between crt-glow">
            <div className="w-full">
                {bootLogs.slice(0, currentLine + 1).map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1 }}
                        className="mb-px whitespace-pre-wrap break-words"
                    >
                        {log}
                    </motion.div>
                ))}
            </div>

            <div className="w-full mb-8 px-4">
                <div className="w-full bg-gray-900 h-1 mb-2 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-500 font-mono">
                    <span>Loading...</span>
                    <span>{progress}%</span>
                </div>
            </div>
        </div>
    );
}
