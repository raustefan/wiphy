"use client";

import { IconButton } from "@radix-ui/themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useAppearance } from "@/components/AppThemeProvider";

export default function ThemeToggle() {
    const { appearance, toggleAppearance } = useAppearance();

    return (
        <IconButton
            variant="soft"
            color="gray"
            radius="full"
            aria-label={appearance === "dark" ? "Zu hellem Modus wechseln" : "Zu dunklem Modus wechseln"}
            onClick={toggleAppearance}
            style={{ cursor: "pointer" }}
        >
            {appearance === "dark" ? <SunIcon /> : <MoonIcon />}
        </IconButton>
    );
}
