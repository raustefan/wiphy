"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Theme } from "@radix-ui/themes";

type Appearance = "light" | "dark";

const STORAGE_KEY = "theme-appearance";

/** Muss mit --background aus globals.css übereinstimmen. */
const BAR_COLOR: Record<Appearance, string> = {
    light: "#fbfbfa",
    dark: "#0b0d10",
};

const ThemeContext = createContext<{ appearance: Appearance; toggleAppearance: () => void }>({
    appearance: "light",
    toggleAppearance: () => {},
});

export function useAppearance() {
    return useContext(ThemeContext);
}

/**
 * Schreibt die Erscheinung an alle Stellen, die sie brauchen:
 * `data-theme-appearance` fürs eigene CSS, `color-scheme` für native
 * Bedienelemente und Scrollbars, und `<meta name="theme-color">` für die
 * Browserleiste in iOS-Safari — die reagiert auf nichts anderes.
 */
function applyAppearance(next: Appearance) {
    const root = document.documentElement;
    root.setAttribute("data-theme-appearance", next);
    root.style.colorScheme = next;
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", BAR_COLOR[next]);
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
        applyAppearance(initial);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with browser storage/media query on mount, not derivable from props/state
        setAppearance(initial);
    }, []);

    const toggleAppearance = useCallback(() => {
        setAppearance((prev) => {
            const next: Appearance = prev === "dark" ? "light" : "dark";
            window.localStorage.setItem(STORAGE_KEY, next);
            applyAppearance(next);
            return next;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ appearance, toggleAppearance }}>
            <Theme accentColor="teal" grayColor="slate" radius="medium" appearance={appearance}>
                {children}
            </Theme>
        </ThemeContext.Provider>
    );
}
