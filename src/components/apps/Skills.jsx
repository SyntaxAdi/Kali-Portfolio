import React from 'react';

const skills = {
    Frontend: ["React", "Vue", "Next.js", "Tailwind CSS", "TypeScript"],
    Backend: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB"],
    Tools: ["Git", "Docker", "Linux", "AWS", "Figma"],
    Security: ["Burp Suite", "Metasploit", "Nmap", "Wireshark", "OWASP"]
};

export default function Skills() {
    return (
        <div className="h-full w-full bg-[#1e1e1e] p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-700 pb-2">Technical Arsenal</h2>

            <div className="space-y-8">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                        <h3 className="text-blue-400 font-mono text-lg mb-4 cursor-pointer hover:underline">./skills/{category.toLowerCase()}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {items.map(skill => (
                                <div key={skill} className="bg-[#2d2d2d] p-3 rounded text-center border border-gray-700 hover:border-blue-500 hover:bg-[#333] transition-all cursor-default">
                                    <span className="text-gray-200 font-medium">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
