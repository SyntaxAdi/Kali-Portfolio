import React, { createContext, useContext, useState } from 'react';

const WindowContext = createContext();

export function useWindowManager() {
    return useContext(WindowContext);
}

export function WindowManagerProvider({ children }) {
    const [windows, setWindows] = useState([]);
    const [focusedWindowId, setFocusedWindowId] = useState(null);

    const openWindow = (appId, title, component, icon) => {
        // Check if already open
        const existing = windows.find(w => w.id === appId);
        if (existing) {
            setFocusedWindowId(appId);
            return;
        }

        const newWindow = {
            id: appId,
            title,
            component,
            icon,
            isMinimized: false,
        };
        setWindows([...windows, newWindow]);
        setFocusedWindowId(appId);
    };

    const closeWindow = (id) => {
        setWindows(windows.filter(w => w.id !== id));
        if (focusedWindowId === id) {
            setFocusedWindowId(null);
        }
    };

    const focusWindow = (id) => {
        setFocusedWindowId(id);
    };

    return (
        <WindowContext.Provider value={{ windows, openWindow, closeWindow, focusWindow, focusedWindowId }}>
            {children}
        </WindowContext.Provider>
    );
}
