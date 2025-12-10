import React from 'react';
import { User, MapPin, Mail, Github, Linkedin, Calendar, Terminal } from 'lucide-react';

export default function About() {
    return (
        <div className="h-full w-full bg-[#1e1e1e] text-gray-300 p-6 overflow-y-auto font-sans">
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gray-700 pb-8">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-1">
                            <div className="w-full h-full rounded-full bg-[#1e1e1e] flex items-center justify-center text-4xl">
                                👨‍💻
                            </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#1e1e1e]"></div>
                    </div>

                    <div className="text-center md:text-left space-y-2">
                        <h1 className="text-3xl font-bold text-white">Visitor User</h1>
                        <h2 className="text-blue-400 text-xl font-mono">Full Stack Developer & Pentester</h2>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-400 mt-4">
                            <span className="flex items-center gap-1"><MapPin size={14} /> Cyber City, Internet</span>
                            <span className="flex items-center gap-1"><Mail size={14} /> visitor@kali.net</span>
                            <span className="flex items-center gap-1"><Calendar size={14} /> Joined 2024</span>
                        </div>

                        <div className="flex gap-3 justify-center md:justify-start mt-4">
                            <button className="p-2 bg-[#333] rounded hover:bg-[#444] transition-colors"><Github size={18} /></button>
                            <button className="p-2 bg-[#333] rounded hover:bg-[#444] transition-colors"><Linkedin size={18} /></button>
                            <button className="p-2 bg-[#333] rounded hover:bg-[#444] transition-colors"><Terminal size={18} /></button>
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <section className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <User size={20} className="text-blue-500" /> About Me
                    </h3>
                    <p className="leading-relaxed text-gray-400">
                        I am a passionate developer with a knack for security. I build web applications that are not only beautiful but also robust and secure.
                        Inspired by the open-source community, I spend my time contributing to projects and learning everything about system architecture.
                    </p>
                    <p className="leading-relaxed text-gray-400">
                        When I'm not coding, you can find me solving CTF challenges, exploring new Linux distros, or configuring my neovim setup (again).
                    </p>
                </section>

                {/* Stats / Info Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#252526] p-4 rounded border border-gray-700 hover:border-blue-500/50 transition-colors">
                        <h4 className="text-lg font-bold text-white mb-2">Experience</h4>
                        <p className="text-sm text-gray-400">3+ Years in Full Stack Development</p>
                    </div>
                    <div className="bg-[#252526] p-4 rounded border border-gray-700 hover:border-blue-500/50 transition-colors">
                        <h4 className="text-lg font-bold text-white mb-2">Education</h4>
                        <p className="text-sm text-gray-400">B.Tech in Computer Science</p>
                    </div>
                </section>

            </div>
        </div>
    );
}
