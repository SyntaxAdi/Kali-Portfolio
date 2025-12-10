import React from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';

const projects = [
    {
        title: "Vulnerability Scanner",
        desc: "A Python based automated vulnerability scanner for web applications.",
        tags: ["Python", "Security", "Automation"],
        links: { demo: "#", code: "#" }
    },
    {
        title: "Secure Chat App",
        desc: "End-to-end encrypted chat application using React and Socket.io.",
        tags: ["React", "Node.js", "Encryption"],
        links: { demo: "#", code: "#" }
    },
    {
        title: "Kali Portfolio",
        desc: "A web based desktop environment simulating Kali Linux.",
        tags: ["React", "Tailwind", "Framer Motion"],
        links: { demo: "#", code: "#" }
    },
    {
        title: "Network Monitor",
        desc: "Real-time network traffic analysis tool built with Go.",
        tags: ["Go", "Networking", "Analytics"],
        links: { demo: "#", code: "#" }
    }
];

export default function Projects() {
    return (
        <div className="h-full w-full bg-[#1e1e1e] p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Folder className="text-blue-500" /> Projects Directory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((proj, i) => (
                    <div key={i} className="bg-[#252526] p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-all hover:-translate-y-1 group">
                        <div className="flex justify-between items-start mb-2">
                            <Folder className="text-blue-400 group-hover:text-blue-300" size={24} />
                            <div className="flex gap-2">
                                <a href={proj.links.code} className="text-gray-400 hover:text-white"><Github size={18} /></a>
                                <a href={proj.links.demo} className="text-gray-400 hover:text-white"><ExternalLink size={18} /></a>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                        <p className="text-sm text-gray-400 mb-4 h-12 line-clamp-2">{proj.desc}</p>
                        <div className="flex flex-wrap gap-2">
                            {proj.tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-1 bg-[#333] text-gray-300 rounded-full border border-gray-600">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
