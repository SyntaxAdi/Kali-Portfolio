import React, { useState, useEffect } from 'react';
import { WindowManagerProvider, useWindowManager } from './context/WindowManagerContext';
import { AnimatePresence } from 'framer-motion';
import BootSequence from './components/BootSequence';
import QuoteScreen from './components/QuoteScreen';
import Desktop from './components/Desktop';
import Window from './components/Window';
import LoginScreen from './components/LoginScreen';
import ShutdownSequence from './components/ShutdownSequence';

const DesktopEnvironment = ({ wallpaper, onShutdown }) => {
  const { windows, openWindow, closeWindow, focusWindow, focusedWindowId } = useWindowManager();

  useEffect(() => {
    // No default apps open on startup
  }, []);

  return (
    <Desktop wallpaper={wallpaper} onShutdown={onShutdown}>
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
  const [status, setStatus] = useState('quote'); // quote, booting, login, desktop, shutdown
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
        {status === 'quote' && (
          <QuoteScreen key="quote" onComplete={() => setStatus('booting')} />
        )}

        {status === 'booting' && (
          <BootSequence key="boot" onComplete={() => setStatus('login')} />
        )}

        {status === 'login' && (
          <LoginScreen key="login" onLogin={() => setStatus('desktop')} wallpaper={wallpaper} />
        )}

        {status === 'desktop' && (
          <DesktopEnvironment key="desktop" wallpaper={wallpaper} onShutdown={() => setStatus('shutdown')} />
        )}

        {status === 'shutdown' && (
          <ShutdownSequence key="shutdown" onComplete={() => setStatus('login')} />
        )}
      </AnimatePresence>
    </WindowManagerProvider>
  );
}

export default App;
