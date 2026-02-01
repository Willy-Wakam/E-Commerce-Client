import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ theme: "system", setTheme: () => {} });

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "theme" }) {
    const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) ?? defaultTheme);

    useEffect(() => {
        const root = document.documentElement;
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const apply = () => {
            const isDark = theme === "dark" || (theme === "system" && media.matches);
            root.classList.toggle("dark", isDark);
            root.style.colorScheme = isDark ? "dark" : "light";
        };

        apply();
        media.addEventListener?.("change", apply);
        return () => media.removeEventListener?.("change", apply);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem(storageKey, theme);
    }, [theme, storageKey]);

    const value = useMemo(() => ({ theme, setTheme }), [theme]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
