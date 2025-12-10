import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home } from 'lucide-react';

export default function Chrome() {
    const [url, setUrl] = useState('https://www.google.com/webhp?igu=1'); // igu=1 allows some google embedding
    const [input, setInput] = useState('https://google.com');

    const handleNavigate = (e) => {
        if (e.key === 'Enter') {
            let target = input;
            if (!target.startsWith('http')) target = 'https://' + target;
            setUrl(target);
        }
    };

    return (
        <div className="h-full w-full flex flex-col bg-white">
            {/* Chrome Toolbar */}
            <div className="h-10 bg-gray-100 border-b flex items-center px-2 gap-2">
                <div className="flex gap-1 text-gray-600">
                    <button className="p-1 hover:bg-gray-200 rounded-full"><ArrowLeft size={14} /></button>
                    <button className="p-1 hover:bg-gray-200 rounded-full"><ArrowRight size={14} /></button>
                    <button className="p-1 hover:bg-gray-200 rounded-full"><RotateCw size={14} /></button>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full px-3 py-1 flex items-center">
                    <input
                        className="bg-transparent border-none outline-none w-full text-sm text-gray-700"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleNavigate}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white relative">
                <iframe src={url} className="w-full h-full border-none" title="Browser" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" />
                {/* Overlay for sites that block iframing */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center bg-gray-50/50 -z-10">
                    <span className="text-gray-400">Loading...</span>
                </div>
            </div>
        </div>
    );
}
