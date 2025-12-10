import React, { useState, useEffect } from 'react';
import { WindowManagerProvider, useWindowManager } from './context/WindowManagerContext';
import { AnimatePresence } from 'framer-motion';
import BootSequence from './components/BootSequence';
import Desktop from './components/Desktop';
import Window from './components/Window';
import LoginScreen from './components/LoginScreen';
import Terminal from './components/apps/Terminal';
import { Terminal as TerminalIcon } from 'lucide-react';

const DesktopEnvironment = ({ wallpaper }) => {
  const { windows, openWindow, closeWindow, focusWindow, focusedWindowId } = useWindowManager();

  useEffect(() => {
    // No default apps open on startup
  }, []);

  return (
    <Desktop wallpaper={wallpaper}>
      {/* Desktop Icons could go here */}

      {/* Render Windows */}
      {windows.map((win) => (
        <Window
          key={win.id}
          title={win.title}
          icon={win.icon}
          isFocused={focusedWindowId === win.id}
          onFocus={() => focusWindow(win.id)}
          onClose={() => closeWindow(win.id)}
          initialPosition={{ x: 50 + (windows.indexOf(win) * 20), y: 50 + (windows.indexOf(win) * 20) }}
        >
          {win.component}
        </Window>
      ))}
    </Desktop>
  );
};

function App() {
  const [status, setStatus] = useState('booting'); // booting, login, desktop
  const [wallpaper, setWallpaper] = useState('/wallpaper_1.jpg');

  useEffect(() => {
    const wallpapers = [
      '/wallpaper_1.jpg',
      '/wallpaper_2.jpg'
    ];
    const randomPick = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    setWallpaper(randomPick);
  }, []);

  return (
    <WindowManagerProvider>
      <AnimatePresence mode="wait">
        {status === 'booting' && (
          <BootSequence key="boot" onComplete={() => setStatus('login')} />
        )}

        {status === 'login' && (
          <LoginScreen key="login" onLogin={() => setStatus('desktop')} wallpaper={wallpaper} />
        )}

        {status === 'desktop' && (
          <DesktopEnvironment key="desktop" wallpaper={wallpaper} />
        )}
      </AnimatePresence>
    </WindowManagerProvider>
  );
}

export default App;
