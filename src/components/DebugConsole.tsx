"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, X } from "lucide-react";
import type { AppLogs } from "@/lib/server/serverStatus";

const POLL_MS = 2000;

/**
 * Knopf in der Debug-Leiste plus Panel darüber mit den PM2-Logs — nur lesen.
 * Abgefragt wird nur, solange das Panel offen ist.
 */
export function DebugConsole() {
    const [open, setOpen] = useState(false);
    const [stream, setStream] = useState<"out" | "err">("err");
    const [logs, setLogs] = useState<AppLogs | null>(null);
    const [failed, setFailed] = useState(false);
    const logRef = useRef<HTMLPreElement>(null);
    const stickRef = useRef(true);

    useEffect(() => {
        if (!open) return;
        let alive = true;
        const poll = async () => {
            try {
                const response = await fetch("/api/dashboard/logs", { cache: "no-store" });
                if (!response.ok) throw new Error(String(response.status));
                const data = (await response.json()) as AppLogs;
                if (alive) {
                    setLogs(data);
                    setFailed(false);
                }
            } catch {
                if (alive) setFailed(true);
            }
        };
        poll();
        const id = setInterval(poll, POLL_MS);
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            alive = false;
            clearInterval(id);
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const text = logs?.[stream] ?? "";

    // Unten mitlaufen wie `pm2 logs` — aber nicht, wenn gerade weiter oben gelesen wird.
    useEffect(() => {
        const el = logRef.current;
        if (el && stickRef.current) el.scrollTop = el.scrollHeight;
    }, [text, open]);

    return (
        <>
            <button
                type="button"
                aria-expanded={open}
                aria-controls="debug-konsole"
                title="PM2-Logs anzeigen"
                onClick={() => {
                    stickRef.current = true;
                    setOpen((o) => !o);
                }}
                className={
                    open
                        ? "flex items-center gap-1 rounded bg-zinc-100 px-2 py-1 font-semibold text-zinc-950 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-zinc-100"
                        : "flex items-center gap-1 rounded border border-white/20 px-2 py-1 text-zinc-200 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-zinc-100"
                }
            >
                <Terminal size={12} aria-hidden="true" />
                <span className="hidden sm:inline">Konsole</span>
            </button>

            {open && (
                <div
                    id="debug-konsole"
                    role="region"
                    aria-label="Konsole"
                    className="fixed inset-x-0 bottom-[calc(6.5rem+env(safe-area-inset-bottom))] z-40 flex h-[min(50dvh,28rem)] flex-col border-t border-amber-400/40 bg-zinc-950/95 font-mono text-xs text-zinc-300 backdrop-blur md:bottom-10"
                >
                    <div className="flex shrink-0 items-center gap-1 border-b border-white/10 px-2 py-1">
                        {(
                            [
                                ["err", "Fehler"],
                                ["out", "Ausgabe"],
                            ] as const
                        ).map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                aria-pressed={stream === key}
                                onClick={() => {
                                    stickRef.current = true;
                                    setStream(key);
                                }}
                                className={`rounded px-2 py-1 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-amber-400 ${
                                    stream === key ? (key === "err" ? "bg-red-400/15 text-red-300" : "bg-white/10 text-zinc-100") : "text-zinc-500"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                        <span className="ml-2 min-w-0 truncate text-zinc-500">
                            {failed ? "Server nicht erreichbar …" : "pm2 logs wiphy · live"}
                        </span>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Konsole schließen"
                            className="ml-auto rounded p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-amber-400"
                        >
                            <X size={14} aria-hidden="true" />
                        </button>
                    </div>
                    <pre
                        ref={logRef}
                        onScroll={(e) => {
                            const el = e.currentTarget;
                            stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
                        }}
                        className="min-h-0 flex-1 overflow-auto overscroll-contain p-3 leading-relaxed break-words whitespace-pre-wrap"
                    >
                        {logs && !logs.available
                            ? "Die Website läuft hier nicht unter PM2 — Logs gibt es nur auf dem Server. Lokal stehen sie im Terminal von `next dev`."
                            : text || (logs ? "Leer." : "Wird geladen …")}
                    </pre>
                </div>
            )}
        </>
    );
}
