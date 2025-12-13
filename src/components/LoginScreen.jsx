import React, { useState, useEffect, useRef } from 'react';
import {
    Cloud,
    Wind,
    Terminal,
    ArrowRight,
    Lock,
    Cpu,
    Thermometer,
    HardDrive,
    Disc,
    BellOff,
    Music,
    SkipBack,
    Play,
    SkipForward,
    Pause
} from 'lucide-react';
import { motion } from 'framer-motion';
import { KaliLogo } from './KaliLogo';

const StatCircle = ({ icon: Icon, value }) => (
    <div className="w-full aspect-square bg-[#1f1f1f] rounded-2xl flex items-center justify-center relative shadow-lg group">
        <svg className="w-full h-full p-4 transform -rotate-90 drop-shadow-lg" viewBox="0 0 64 64">
            <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#333"
                strokeWidth="4"
                fill="none"
            />
            <circle
                cx="32"
                cy="32"
                r="28"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeDasharray={175}
                strokeDashoffset={175 - (175 * value) / 100}
                strokeLinecap="round"
                className="opacity-90 transition-all duration-1000 ease-out group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={32} className="text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
        </div>
    </div>
);

export default function LoginScreen({ onLogin, wallpaper }) {
    const [password, setPassword] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isInputVisible, setIsInputVisible] = useState(false);

    // Music Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            if (duration) setProgress((current / duration) * 100);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogin = (e) => {
        if (e) e.preventDefault();
        setLoading(true);
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
        setIsInputVisible(true);
        const fullPassword = 'aaditya';
        let currentIndex = 0;

        const typeInterval = setInterval(() => {
            if (currentIndex <= fullPassword.length) {
                setPassword(fullPassword.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    handleLogin();
                }, 400);
            }
        }, 80);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen w-screen bg-[#0a0a0a] flex items-center justify-center font-sans overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${wallpaper})` }}
        >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

            <div className="z-10 bg-[#111111]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-6 w-[1100px] h-[600px] grid grid-cols-[300px_1fr_300px] gap-8 shadow-2xl">

                {/* Left Column */}
                <div className="flex flex-col gap-4">
                    {/* Weather Widget */}
                    <div className="bg-[#1f1f1f] rounded-2xl p-4 h-[130px] flex flex-col justify-between relative">
                        <h3 className="w-full text-center text-white font-bold text-2xl tracking-wide pt-1">Weather</h3>

                        <div className="flex items-center gap-3">
                            <Cloud size={48} className="text-white" />
                            <div className="flex flex-col justify-center">
                                <p className="text-gray-100 font-bold text-lg leading-tight">Partly cloudy</p>
                                <p className="text-gray-400 text-xs font-medium flex items-center gap-1">
                                    <Wind size={12} /> Humidity: 71%
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* System Fetch Widget */}
                    <div className="bg-[#1f1f1f] rounded-2xl p-5 flex-1 relative overflow-hidden flex flex-col items-center">
                        <div className="flex items-center gap-4 mb-2 w-full">
                            <div className="bg-gray-200 text-black px-2.5 py-1 rounded-lg">
                                <span className="font-bold text-lg">&gt;</span>
                            </div>
                            <span className="text-white text-xl font-bold tracking-wide">Aaditya@Portfolio</span>
                        </div>

                        <div className="flex items-center gap-3 w-full justify-center px-2 flex-1">
                            <div className="drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                <KaliLogo size={70} className="text-cyan-400 fill-current" />
                            </div>
                            <div className="font-mono text-sm text-white font-bold space-y-3 tracking-wide flex-1 min-w-0">
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                    <span className="w-10 text-right text-gray-400">WM</span>
                                    <span className="text-gray-500">:</span>
                                    <span>Kali Linux</span>
                                </div>
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                    <span className="w-10 text-right text-gray-400">USER</span>
                                    <span className="text-gray-500">:</span>
                                    <span>Aaditya</span>
                                </div>
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                    <span className="w-10 text-right text-gray-400">UP</span>
                                    <span className="text-gray-500">:</span>
                                    <span>12 mins</span>
                                </div>
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                    <span className="w-10 text-right text-gray-400">BATT</span>
                                    <span className="text-gray-500">:</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>

                        {/* Color dots */}
                        {/* Color dots */}
                        <div className="flex gap-3 justify-center mt-2 w-full items-center">
                            <div className="w-5 h-5 rounded-lg bg-[#24283b] ring-1 ring-white/10"></div>
                            <div className="w-5 h-5 rounded-lg bg-[#b68bfb]"></div>
                            <div className="w-5 h-5 rounded-lg bg-[#7dcfff]"></div>
                            <div className="w-5 h-5 rounded-lg bg-[#f0c6c6]"></div>
                            <div className="w-5 h-5 rounded-lg bg-[#cfdae7]"></div>
                            <div className="w-5 h-5 rounded-lg bg-[#cba6f7]"></div>
                            <div className="w-5 h-5 rounded-lg bg-[#89dceb]"></div>
                            <div className="w-5 h-5 rounded-lg bg-[#e0af68]"></div>
                        </div>
                    </div>

                    {/* Music Player Mini Widget */}
                    <div className="bg-[#1f1f1f] rounded-2xl p-3 h-[120px] relative overflow-hidden group">
                        <audio
                            ref={audioRef}
                            src="/hills.mp3"
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={() => setIsPlaying(false)}
                        />

                        <div className="relative z-10 flex flex-col h-full">
                            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">Now Playing</span>

                            <div className="flex flex-1 items-center px-2 gap-4">
                                <img
                                    src="/music.jpg"
                                    alt="Cover Art"
                                    className="w-16 h-16 rounded-md object-cover shadow-lg border border-white/5 flex-shrink-0"
                                />
                                <div className="flex flex-col flex-1 items-center justify-center min-w-0 pt-1">
                                    <div className="flex flex-col items-center text-center w-full mb-2">
                                        <span className="text-white text-sm font-bold truncate w-full leading-tight">Hills</span>
                                        <span className="text-gray-400 text-xs truncate w-full">sindr</span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button className="text-gray-400 hover:text-white transition-colors">
                                            <SkipBack size={16} />
                                        </button>
                                        <button
                                            className="p-1.5 rounded-full bg-white text-black hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
                                            onClick={togglePlay}
                                        >
                                            {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                                        </button>
                                        <button className="text-gray-400 hover:text-white transition-colors">
                                            <SkipForward size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Blur */}
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
                            backgroundImage: 'url(/music.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(20px)'
                        }}></div>
                    </div>
                </div>

                {/* Center Column */}
                <div className="flex flex-col items-center justify-between py-10">
                    {/* Time */}
                    <div className="text-center flex flex-col items-center">
                        <h1 className="text-6xl font-bold text-white tracking-tight">
                            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(':', ' : ')}
                        </h1>
                        <p className="text-gray-400 font-medium text-2xl mt-2 tracking-wide">
                            {currentTime.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>

                    {/* Profile */}
                    <div
                        className="relative group cursor-pointer"
                        onClick={handleProfileClick}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                        <div className="relative w-40 h-40 rounded-full bg-[#1f1f1f] p-1 shadow-2xl overflow-hidden">
                            <video
                                src="/login-page.mp4"
                                autoPlay
                                muted
                                loop
                                className="w-full h-full object-cover rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>

                    {/* Helper Text */}
                    <p
                        className="text-gray-400 font-medium text-sm mt-6 mb-2 cursor-pointer hover:text-white transition-colors animate-pulse"
                        onClick={handleProfileClick}
                    >
                        Click on the Profile to Login -&gt;
                    </p>

                    {/* Login Input */}
                    <motion.div
                        className="w-72"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: isInputVisible ? 1 : 0, y: isInputVisible ? 0 : 50 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <form onSubmit={handleLogin} className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={16} className={`transition-colors ${error ? 'text-red-500' : 'text-gray-500 group-focus-within:text-blue-500'}`} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                                className={`w-full bg-[#1f1f1f]/80 text-white rounded-full py-3 pl-10 pr-10 outline-none border transition-all placeholder-gray-600 ${error
                                    ? 'border-red-500/50 bg-red-900/10'
                                    : 'border-white/5 hover:border-white/10 focus:border-blue-500/50 focus:bg-[#252525]'
                                    }`}
                                placeholder={error ? "Try 'aaditya'" : "Enter password"}
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                disabled={loading}
                            >
                                {loading
                                    ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    : <div className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                        <ArrowRight size={14} className="text-gray-400 group-focus-within:text-white" />
                                    </div>
                                }
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-4">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <StatCircle icon={Cpu} value={25} />
                        <StatCircle icon={Thermometer} value={45} />
                        <StatCircle icon={HardDrive} value={60} />
                        <StatCircle icon={Disc} value={80} />
                    </div>

                    {/* Notifications Widget */}
                    <div className="bg-[#1f1f1f] rounded-2xl p-5 flex-1 flex flex-col">
                        <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-4">Notifications</h3>
                        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-600">
                            <BellOff size={32} strokeWidth={1.5} />
                            <span className="text-sm font-medium">No Notifications</span>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div >
    );
}
