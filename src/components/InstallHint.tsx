"use client";

import { useEffect, useRef, useState } from "react";
import { Share, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Chromium-only, fehlt deshalb in den DOM-Typen. */
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/* Speichert nur „weggeklickt“ — kein Personenbezug, wie `theme-appearance`. */
const DISMISSED_KEY = "install-hint-dismissed";

/**
 * Dezenter Hinweis für Telefon-Besuche, die Seite auf den Homescreen zu legen.
 * Chromium liefert mit `beforeinstallprompt` einen echten Installationsdialog;
 * iOS-Safari und andere Browser kennen keinen, dort steht die Anleitung.
 */
export default function InstallHint() {
  const [mode, setMode] = useState<"prompt" | "ios" | "manual" | null>(null);
  const installEvent = useRef<BeforeInstallPromptEvent | null>(null);

  // Offline-Seite für die installierte App (siehe `public/sw.js`). Nur im
  // Produktivbetrieb: im Dev-Server stünde der Worker dem Hot Reload im Weg.
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem(DISMISSED_KEY) ||
      window.matchMedia("(display-mode: standalone)").matches ||
      !window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    // iPadOS meldet sich als Mac — nur die Touchpunkte verraten es.
    const ios =
      /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes("Macintosh") && navigator.maxTouchPoints > 1);

    const onPrompt = (event: Event) => {
      event.preventDefault();
      installEvent.current = event as BeforeInstallPromptEvent;
      setMode("prompt");
    };
    const onInstalled = () => setMode(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    // Nicht sofort über den Inhalt legen; bis dahin hat Chromium sein
    // Ereignis gefeuert, falls die Seite installierbar ist.
    const timer = setTimeout(
      () => setMode((current) => current ?? (ios ? "ios" : "manual")),
      4000,
    );
    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!mode) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setMode(null);
  };

  const install = async () => {
    const event = installEvent.current;
    if (!event) return;
    await event.prompt();
    await event.userChoice;
    dismiss();
  };

  return (
    <aside
      aria-label="Als App installieren"
      className="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-30 flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-lg md:hidden"
    >
      <div className="grid flex-1 gap-1 text-sm">
        <p className="font-semibold text-foreground">Als App auf den Homescreen</p>
        {mode === "prompt" && (
          <>
            <p className="text-muted">Schneller Zugriff, ohne Browserleiste.</p>
            <Button size="sm" className="mt-2 justify-self-start" onClick={install}>
              Installieren
            </Button>
          </>
        )}
        {mode === "ios" && (
          <p className="text-muted">
            Tippe unten auf{" "}
            <Share size={15} aria-label="Teilen" className="inline align-[-2px] text-physics" />{" "}
            und dann auf „Zum Home-Bildschirm“.
          </p>
        )}
        {mode === "manual" && (
          <p className="text-muted">
            Öffne das Browsermenü und wähle „Zum Startbildschirm hinzufügen“.
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Hinweis schließen"
        className="-mt-2 -mr-2 grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-foreground focus-visible:outline-2 focus-visible:outline-physics"
      >
        <X size={18} />
      </button>
    </aside>
  );
}
