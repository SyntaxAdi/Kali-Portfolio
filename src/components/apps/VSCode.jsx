import React from 'react';

export default function VSCode() {
    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col text-gray-300 font-mono text-sm">
            {/* Title Bar - already handled by Window, but maybe tabs here? */}
            <div className="h-9 bg-[#252526] flex items-center px-4 gap-2 border-b border-[#1e1e1e]">
                <div className="bg-[#1e1e1e] px-3 py-1 text-white border-t-2 border-blue-500 text-xs">App.jsx</div>
                <div className="px-3 py-1 hover:bg-[#2d2d2d] text-xs">package.json</div>
                <div className="px-3 py-1 hover:bg-[#2d2d2d] text-xs">README.md</div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 border-r border-[#1e1e1e] text-gray-400">
                    <div className="hover:text-white cursor-pointer">📁</div>
                    <div className="hover:text-white cursor-pointer">🔍</div>
                    <div className="hover:text-white cursor-pointer">🌿</div>
                    <div className="hover:text-white cursor-pointer">🐞</div>
                    <div className="hover:text-white cursor-pointer">🧩</div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 p-4 overflow-auto">
                    <div className="text-gray-500">1</div>
                    <div><span className="text-pink-400">import</span> React <span className="text-pink-400">from</span> <span className="text-yellow-300">'react'</span>;</div>
                    <div className="text-gray-500">2</div>
                    <div></div>
                    <div className="text-gray-500">3</div>
                    <div><span className="text-blue-400">function</span> <span className="text-yellow-300">App</span>() {'{'}</div>
                    <div className="text-gray-500">4</div>
                    <div className="pl-4"><span className="text-pink-400">return</span> (</div>
                    <div className="text-gray-500">5</div>
                    <div className="pl-8">&lt;<span className="text-blue-300">div</span> <span className="text-green-300">className</span>=<span className="text-yellow-300">"App"</span>&gt;</div>
                    <div className="text-gray-500">6</div>
                    <div className="pl-12">&lt;<span className="text-blue-300">h1</span>&gt;Hello World&lt;/<span className="text-blue-300">h1</span>&gt;</div>
                    <div className="text-gray-500">7</div>
                    <div className="pl-8">&lt;/<span className="text-blue-300">div</span>&gt;</div>
                    <div className="text-gray-500">8</div>
                    <div className="pl-4">);</div>
                    <div className="text-gray-500">9</div>
                    <div>{'}'}</div>
                    <div className="text-gray-500">10</div>
                    <div><span className="text-pink-400">export default</span> App;</div>
                    <div className="mt-4 text-green-500 italic">// Welcome to my portfolio! Check out the file explorer for more project details.</div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#007acc] text-white flex items-center px-2 text-xs justify-between">
                <div className="flex gap-4">
                    <span>main*</span>
                    <span>0 errors</span>
                </div>
                <div className="flex gap-4">
                    <span>Ln 10, Col 1</span>
                    <span>UTF-8</span>
                    <span>JavaScript React</span>
                </div>
            </div>
        </div>
    );
}
