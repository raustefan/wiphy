"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "@radix-ui/themes";

type Appearance = "light" | "dark";

const STORAGE_KEY = "theme-appearance";

const ThemeContext = createContext<{ appearance: Appearance; toggleAppearance: () => void }>({
    appearance: "light",
    toggleAppearance: () => {},
});

export function useAppearance() {
    return useContext(ThemeContext);
}

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
    // Start with "light" so the server-rendered markup and the first client
    // render match exactly; the real appearance (from localStorage/system
    // preference, already applied to <html> by the blocking inline script)
    // is synced right after mount so it never causes a hydration mismatch.
    const [appearance, setAppearance] = useState<Appearance>("light");

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        const initial: Appearance =
            stored === "light" || stored === "dark"
                ? stored
                : window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "dark"
                  : "light";
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with browser storage/media query on mount, not derivable from props/state
        setAppearance(initial);
    }, []);

    const toggleAppearance = () => {
        setAppearance((prev) => {
            const next: Appearance = prev === "dark" ? "light" : "dark";
            window.localStorage.setItem(STORAGE_KEY, next);
            document.documentElement.setAttribute("data-theme-appearance", next);
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ appearance, toggleAppearance }}>
            <Theme accentColor="teal" grayColor="slate" radius="medium" appearance={appearance}>
                {children}
            </Theme>
        </ThemeContext.Provider>
    );
}
