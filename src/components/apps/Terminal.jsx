import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

// --- Matrix Rain Effect Component ---
const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // precise sizing
        const resize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            }
        };

        resize();
        window.addEventListener('resize', resize);

        const columns = Math.floor(canvas.width / 20);
        const drops = Array(columns).fill(0).map(() => Math.random() * -100);
        const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ1234567890XYZ";

        const draw = () => {
            // Trail effect
            ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0f0'; // Matrix Green
            ctx.font = '14px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * 20;
                const y = drops[i] * 20;

                // Random brighter characters
                if (Math.random() > 0.95) {
                    ctx.fillStyle = '#cfc';
                    ctx.fillText(text, x, y);
                    ctx.fillStyle = '#0f0';
                } else {
                    ctx.fillText(text, x, y);
                }

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 40);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40 z-0" />;
};

// --- Main Terminal Component ---
export default function Terminal() {
    const [history, setHistory] = useState([
        { type: 'system', content: 'Kali GNU/Linux Rolling kali-portfolio tty1' },
        { type: 'system', content: 'Login: visitor' },
        { type: 'system', content: 'Password: *******' },
        { type: 'info', content: 'Welcome to Kali Linux. Type "help" for actions.' },
        { type: 'success', content: 'System integrity: Verified.' },
    ]);
    const [input, setInput] = useState("");
    const [matrixMode, setMatrixMode] = useState(false);

    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Keep focus
    const keepFocus = () => inputRef.current?.focus();

    useEffect(() => {
        keepFocus();
    }, []);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const args = cmd.split(' ');
            const mainCmd = args[0];

            // Add user command to history
            const newHistory = [...history, { type: 'user', content: `visitor@kali-portfolio:~$ ${input}` }];

            switch (mainCmd) {
                case 'help':
                    newHistory.push(
                        { type: 'info', content: 'Available commands:' },
                        { type: 'text', content: '  help     - Show this help message' },
                        { type: 'text', content: '  whoami   - Display current user' },
                        { type: 'text', content: '  uname    - System information' },
                        { type: 'text', content: '  ls       - List files' },
                        { type: 'text', content: '  pwd      - Print working directory' },
                        { type: 'text', content: '  date     - Show current date/time' },
                        { type: 'text', content: '  clear    - Clear terminal' },
                        { type: 'text', content: '  matrix   - Toggle the matrix' },
                        { type: 'text', content: '  pacman   - Arch package manager' },
                        { type: 'text', content: '  neofetch - System info with logo' },
                        { type: 'text', content: '  cowsay   - Cow says something' },
                        { type: 'text', content: '  fortune  - Random fortune' }
                    );
                    break;
                case 'clear':
                    setHistory([]);
                    setInput("");
                    return;
                case 'matrix':
                    setMatrixMode(!matrixMode);
                    newHistory.push({ type: 'success', content: matrixMode ? 'Disabling "The One"...' : 'Entering the Matrix...' });
                    break;
                case 'whoami':
                    newHistory.push({ type: 'success', content: 'visitor (Use "about" for more info)' });
                    break;
                case 'uname':
                    newHistory.push({ type: 'text', content: 'Linux kali-portfolio 6.6.9-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.9-1kali1 x86_64 GNU/Linux' });
                    break;
                case 'pwd':
                    newHistory.push({ type: 'text', content: '/home/visitor' });
                    break;
                case 'date':
                    newHistory.push({ type: 'text', content: new Date().toString() });
                    break;
                case 'ls':
                    newHistory.push({ type: 'text', content: 'drwxr-xr-x  Desktop  Documents  Downloads  Music  Pictures  secret.txt' });
                    break;
                case 'cat':
                    if (args[1] === 'secret.txt') {
                        newHistory.push({ type: 'text', content: 'The secret is: There is no spoon.' });
                    } else if (args[1]) {
                        newHistory.push({ type: 'error', content: `cat: ${args[1]}: Permission denied` });
                    } else {
                        newHistory.push({ type: 'error', content: 'usage: cat [file]' });
                    }
                    break;
                case 'pacman':
                    newHistory.push({ type: 'error', content: "Error: This is Kali (Debian based). We use apt-get here! (But nice try)" });
                    break;
                case 'cowsay':
                    const cowText = args.slice(1).join(' ') || "Moo! (Try: cowsay hello)";
                    newHistory.push({
                        type: 'text', content: `
 _______________________
< ${cowText} >
 -----------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||` });
                    break;
                case 'fortune':
                    const fortunes = [
                        "A computer scientist is someone who fixes things that aren't broken.",
                        "There is no place like 127.0.0.1",
                        "Have you tried turning it off and on again?",
                        "It works on my machine.",
                        "Real programmers count from 0.",
                        "Linux is only free if your time has no value."
                    ];
                    newHistory.push({ type: 'text', content: fortunes[Math.floor(Math.random() * fortunes.length)] });
                    break;
                case 'sudo':
                    newHistory.push({ type: 'error', content: 'visitor is not in the sudoers file. This incident will be reported.' });
                    break;
                case 'neofetch':
                case 'about':
                    newHistory.push({ type: 'info', content: 'Running neofetch...' });
                    newHistory.push({ type: 'text', content: 'Host: Kali Portfolio' });
                    newHistory.push({ type: 'text', content: 'Kernel: React v18.2.0' });
                    newHistory.push({ type: 'text', content: 'Uptime: Forever' });
                    break;
                default:
                    if (cmd) newHistory.push({ type: 'error', content: `bash: ${cmd}: command not found` });
            }

            setHistory(newHistory);
            setInput("");
        }
    };

    // Render line based on type
    const renderLine = (item, idx) => {
        let className = "mb-1 leading-relaxed break-all ";
        switch (item.type) {
            case 'user': className += "text-blue-400 font-bold mt-2"; break;
            case 'system': className += "text-gray-500 italic"; break;
            case 'info': className += "text-blue-300"; break;
            case 'success': className += "text-green-400"; break;
            case 'warn': className += "text-yellow-400"; break;
            case 'error': className += "text-red-400"; break;
            default: className += "text-gray-300";
        }
        return <div key={idx} className={className}>{item.content}</div>;
    };

    return (
        <div
            className="relative h-full w-full bg-[#050505] text-green-500 font-mono text-sm overflow-hidden select-none"
            onClick={keepFocus}
        >
            {/* Background Effects */}
            {matrixMode && <MatrixRain />}

            {/* Content Container */}
            <div className={`relative z-20 h-full p-4 overflow-y-auto custom-scrollbar ${matrixMode ? 'text-shadow-glow' : ''}`}>
                {/* CRT Screen Glare (Subtle) */}
                <div className="space-y-1">
                    {history.map((item, i) => renderLine(item, i))}
                </div>

                <div className="flex items-center mt-2 group">
                    <span className="text-blue-500 font-bold mr-2">visitor@kali-portfolio</span>
                    <span className="text-white mr-2">:</span>
                    <span className="text-blue-500 font-bold mr-2">~</span>
                    <span className="text-white mr-2">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        className="bg-transparent border-none outline-none flex-1 text-gray-100 font-bold caret-green-500 block w-full"
                        autoCapitalize="none"
                        autoComplete="off"
                        spellCheck="false"
                        autoFocus
                    />
                </div>
                <div ref={bottomRef} className="h-4" />
            </div>

            {/* Scanline CSS - Inline for portability */}
            <style>{`
                .text-shadow-glow {
                    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #111;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #444;
                }
            `}</style>
        </div>
    );
}
