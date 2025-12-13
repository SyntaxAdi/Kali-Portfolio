import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bootLogs = [
    "[  OK  ] Started Show Plymouth Boot Screen.",
    "[  OK  ] Found device /dev/mapper/kali--vg-root.",
    "[  OK  ] Started File System Check on /dev/disk/by-uuid/067b-12A4.",
    "[  OK  ] Mounted /boot/efi.",
    "[  OK  ] Reached target Local Encrypted Volumes.",
    "[  OK  ] Reached target Paths.",
    "[  OK  ] Reached target Remote File Systems.",
    "[  OK  ] Reached target Swap.",
    "[  OK  ] Created slice User and Session Slice.",
    "[  OK  ] Listening on Device-mapper Event Daemon Socket.",
    "[  OK  ] Listening on LVM2 poll daemon socket.",
    "[  OK  ] Listening on Network Service Netlink Socket.",
    "[  OK  ] Reached target Slices.",
    "[  OK  ] Started Dispatch Password Requests to Console Directory Watch.",
    "[  OK  ] Started NetworkManager.",
    "[  OK  ] Reached target Network.",
    "[  OK  ] Started Accounts Service.",
    "[  OK  ] Started Power Profiles daemon.",
    "[  OK  ] Reached target System Initialization.",
    "[  OK  ] Started GNOME Display Manager.",
    "[  OK  ] Reached target Graphical Interface.",
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
        }, 30);

        // Progress bar effect
        // 100 / 2 = 50 steps. 50 * 20ms = 1000ms = 1s
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
        }, 20);

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
                        {log.includes("[  OK  ]") ? (
                            <span>
                                <span className="text-green-500 font-bold">[  OK  ]</span> {log.replace("[  OK  ]", "")}
                            </span>
                        ) : log}
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
