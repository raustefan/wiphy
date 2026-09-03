"use client";

import { Moon, Sun } from "lucide-react";
import { useAppearance } from "@/components/AppThemeProvider";

export default function ThemeToggle({ className }: { className?: string }) {
    const { appearance, toggleAppearance } = useAppearance();
    const dark = appearance === "dark";

    return (
        <button
            type="button"
            aria-label={dark ? "Zu hellem Modus wechseln" : "Zu dunklem Modus wechseln"}
            onClick={toggleAppearance}
            className={`grid size-10 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics ${className ?? ""}`}
        >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
