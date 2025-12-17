import React from 'react';
import { KALI_ASCII } from '../../lib/ascii';

const About = () => {
    return (
        <div className="h-full w-full bg-[#0d1117] text-white font-mono p-4 md:p-8 overflow-y-auto overflow-x-hidden selection:bg-[#3d4451] selection:text-white">
            <div className="flex flex-col md:flex-row gap-12 items-start justify-center pt-10">
                {/* ASCII Art - Kali Logo */}
                <div className="text-blue-500 font-bold whitespace-pre leading-tight select-none text-xs sm:text-sm">
                    {KALI_ASCII}
                </div>

                {/* Info */}
                <div className="flex-1 max-w-lg space-y-1">
                    <div className="mb-4 text-lg">
                        <span className="text-blue-500 font-bold">Aaditya</span>
                        <span className="text-white">@</span>
                        <span className="text-blue-500 font-bold">kali-portfolio</span>
                    </div>
                    <div className="text-gray-500 mb-4">---------------------------</div>

                    <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1 text-sm">
                        <span className="text-blue-500 font-bold">OS:</span>
                        <span>Kali GNU/Linux Rolling x86_64</span>

                        <span className="text-blue-500 font-bold">Host:</span>
                        <span>Portfolio v1.0</span>

                        <span className="text-blue-500 font-bold">Kernel:</span>
                        <span>6.6.9-amd64</span>

                        <span className="text-blue-500 font-bold">Uptime:</span>
                        <span>Until Hired</span>

                        <span className="text-blue-500 font-bold">Shell:</span>
                        <span>zsh 5.9</span>

                        <span className="text-blue-500 font-bold">DE:</span>
                        <span>React Desktop Environment</span>

                        <span className="text-blue-500 font-bold">WM:</span>
                        <span>Framer Motion</span>

                        <span className="text-blue-500 font-bold">Theme:</span>
                        <span>Kali-Dark</span>

                        <span className="text-blue-500 font-bold">Terminal:</span>
                        <span>Web Terminal</span>

                        <span className="text-blue-500 font-bold">CPU:</span>
                        <span>Creative Mind @ 100% Capacity</span>

                        <span className="text-blue-500 font-bold">Memory:</span>
                        <span>Ideas / Passion</span>
                    </div>

                    {/* Color Palette */}
                    <div className="mt-6 flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-black"></div>
                        <div className="w-5 h-5 rounded-full bg-red-500"></div>
                        <div className="w-5 h-5 rounded-full bg-green-500"></div>
                        <div className="w-5 h-5 rounded-full bg-yellow-500"></div>
                        <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                        <div className="w-5 h-5 rounded-full bg-purple-500"></div>
                        <div className="w-5 h-5 rounded-full bg-cyan-500"></div>
                        <div className="w-5 h-5 rounded-full bg-white"></div>
                    </div>
                </div>
            </div>

            {/* Bio Section */}
            <div className="mt-12 max-w-3xl mx-auto space-y-4">
                <div className="flex items-center gap-2 text-lg">
                    <span className="text-blue-500 font-bold">$</span>
                    <span className="text-white">nano About-Me.txt</span>
                </div>
                <div className="text-gray-300 leading-relaxed text-sm md:text-base border-l-2 border-blue-500/30 pl-4">
                    <p className="mb-2">
                        I build systems, not demos — automation, bots, and AI-driven tools that solve real problems.
                    </p>
                    <p className="mb-2">
                        Strong in Python, backend engineering, and applied machine learning, with a bias toward execution.
                    </p>
                    <p className="mb-2">
                        I focus on performance, control, and scalability over buzzwords and shortcuts.
                    </p>
                    <p>
                        If it can be optimized, automated, or broken down logically, I’ll build it better.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
