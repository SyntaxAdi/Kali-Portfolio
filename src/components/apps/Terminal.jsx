import React, { useState, useEffect, useRef } from 'react';

export default function Terminal() {
    const [history, setHistory] = useState([
        "Kali GNU/Linux Rolling kali-portfolio tty1",
        "",
        "Login incorrect",
        "kali-portfolio login: visitor",
        "Password: ",
        "",
        "Linux kali-portfolio 6.6.9-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.9-1kali1 (2024-01-08) x86_64",
        "",
        "The programs included with the Kali GNU/Linux system are free software;",
        "the exact distribution terms for each program are described in the",
        "individual files in /usr/share/doc/*/copyright.",
        "",
        "Kali GNU/Linux comes with ABSOLUTE NO WARRANTY, to the extent",
        "permitted by applicable law.",
        "",
        "visitor@kali-portfolio:~$ help",
        "Available commands: help, whoami, ls, cat [file], clear, exit"
    ]);
    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const command = input.trim();
            const newHistory = [...history, `visitor@kali-portfolio:~$ ${command}`];

            switch (command) {
                case 'help':
                    newHistory.push("Available commands: help, whoami, ls, clear, about, projects, contact");
                    break;
                case 'clear':
                    setHistory([]);
                    setInput("");
                    return;
                case 'whoami':
                    newHistory.push("visitor");
                    break;
                case 'ls':
                    newHistory.push("Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos  user.txt");
                    break;
                case 'about':
                    newHistory.push("I am a Full Stack Developer/Security Enthusiast building cool things.");
                    break;
                // Add more commands later
                default:
                    if (command) newHistory.push(`bash: ${command}: command not found`);
            }

            setHistory(newHistory);
            setInput("");
        }
    };

    return (
        <div className="h-full w-full font-mono text-sm p-4 bg-transparent text-gray-200" onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
            ))}
            <div className="flex">
                <span className="text-green-500 font-bold mr-2">visitor@kali-portfolio:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none flex-1 text-gray-200"
                    autoFocus
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
}
