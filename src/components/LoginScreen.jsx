import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginScreen({ onLogin, wallpaper }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const handleLogin = (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        // Simulate auth delay
        setTimeout(() => {
            if (password === 'aaditya' || password === '') {
                onLogin();
            } else {
                setError(true);
                setLoading(false);
                setPassword('');
            }
        }, 800);
    };

    const handleProfileClick = () => {
        if (showPasswordInput) return;
        setShowPasswordInput(true);

        // Typewriter effect
        const fullPassword = 'aaditya';
        let currentIndex = 0;

        // Small delay before typing starts to allow animation to begin
        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (currentIndex <= fullPassword.length) {
                    setPassword(fullPassword.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(typeInterval);
                    // Auto login after typing finishes
                    setTimeout(() => {
                        setLoading(true);
                        setTimeout(() => {
                            onLogin();
                        }, 800);
                    }, 500);
                }
            }, 100);
        }, 600);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden font-sans"
        >
            {/* Background */}
            <div
                className="absolute inset-0 opacity-40 bg-cover bg-no-repeat bg-center transition-all duration-1000"
                style={{ backgroundImage: `url(${wallpaper})` }}
            />

            <div className="z-10 bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/10 w-96 flex flex-col items-center animate-in zoom-in-95 duration-500">
                <div
                    onClick={handleProfileClick}
                    className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 p-[2px] mb-6 shadow-lg shadow-blue-500/20 cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                        <video
                            src="/login-page.mp4"
                            autoPlay
                            muted
                            loop
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-1">Aaditya</h2>
                <p className="text-gray-400 text-sm mb-4">Kali Portfolio Login</p>
                <p className="text-gray-500 text-xs mb-8">Click on the user to login</p>

                <div
                    className={`w-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] transform overflow-hidden ${showPasswordInput
                        ? 'max-h-24 opacity-100 translate-y-0'
                        : 'max-h-0 opacity-0 translate-y-8'
                        }`}
                >
                    <form onSubmit={handleLogin} className="w-full relative pb-1" autoComplete="off">
                        <div className="relative group">
                            <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${error ? 'text-red-500' : 'text-gray-500 group-focus-within:text-blue-500'}`} />
                            <input
                                type="password"
                                name="password_fake"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                                className={`w-full bg-black/50 border rounded-lg py-2 pl-10 pr-10 text-sm outline-none transition-all ${error ? 'border-red-500 placeholder-red-500' : 'border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}`}
                                placeholder={error ? "Authentication Failed" : "Password (aaditya)"}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                            >
                                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ArrowRight size={16} />}
                            </button>
                        </div>
                    </form>
                </div>


            </div>

            <div className="absolute bottom-8 text-gray-600 text-xs font-mono">
                Kali GNU/Linux Rolling | Kernel 6.6.9-amd64
            </div>
        </motion.div>
    );
}
