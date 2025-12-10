import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    "[    0.234460] x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'",
    "[    0.234465] x86/fpu: Supporting XSAVE feature 0x004: 'AVX registers'",
    "[    0.234468] x86/fpu: xstate_offset[2]:  576, xstate_sizes[2]:  256",
    "[    0.234475] x86/fpu: Enabled xstate features 0x7, context size is 832 bytes, using 'compacted' format.",
    "[    0.235555] signal: max sigframe size: 3632",
    "[    0.236001] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable",
    "[    0.236005] BIOS-e820: [mem 0x000000000009fc00-0x000000000009ffff] reserved",
    "[    0.354000] ACPI: DMAR 0x0000000078FF1000 0000A8 (v01 INTEL  EDK2     00000002      01000013)",
    "[    0.410023] Console: colour dummy device 80x25",
    "[    0.410034] printk: console [tty0] enabled",
    "[    0.410045] ACPI: Core revision 20230628",
    "[    0.501200] apic: PM timer delta 123456",
    "[    0.502001] audit: initializing netlink subsys (disabled)",
    "[    0.502500] thermal_sys: Registered thermal governor 'fair_share'",
    "[    0.502500] thermal_sys: Registered thermal governor 'bang_bang'",
    "[    0.502500] thermal_sys: Registered thermal governor 'step_wise'",
    "[    1.000123] systemd[1]: Detected architecture x86-64.",
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
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        // Line-by-line printing effect
        const interval = setInterval(() => {
            setCurrentLine(prev => {
                if (prev >= bootLogs.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => setShowLogo(true), 800);
                    return prev;
                }
                return prev + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (showLogo) {
            setTimeout(onComplete, 2000);
        }
    }, [showLogo, onComplete]);

    return (
        <AnimatePresence mode="wait">
            {!showLogo ? (
                <motion.div
                    key="boot-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-screen w-screen bg-black text-gray-300 font-mono text-sm p-4 overflow-hidden flex flex-col justify-end crt-glow"
                >
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
                        <span className="animate-pulse">_</span>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="boot-logo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="h-screen w-screen bg-black flex items-center justify-center crt-glow"
                >
                    <div className="text-center">
                        <div className="text-9xl mb-4">🐉</div>
                        <h1 className="text-4xl font-bold text-blue-500">Kali Linux</h1>
                        <p className="text-gray-400 mt-2">The Quieter You Become, The More You Are Able To Hear.</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
