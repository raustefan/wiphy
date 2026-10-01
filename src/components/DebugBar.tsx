import { execFile } from "node:child_process";
import { promisify } from "node:util";
import Link from "next/link";
import { Bug, Clock, Eye, Flag, GitCommit, Power, ShieldCheck, Timer } from "lucide-react";
import { auth } from "@/auth";
import { isDebugMode, isViewingAsMember } from "@/lib/server/authz";
import { getAllFeatureFlags } from "@/lib/server/services/featureFlagService";
import { ADMIN_SESSION_MAX_MS } from "@/lib/server/sessionPolicy";
import { toggleDebugMode, toggleMemberView } from "@/app/dashboard/actions";
import { DebugConsole } from "./DebugConsole";

const TIME = new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Berlin",
});

// Einmal pro Prozess: ein Deploy startet den Server ohnehin neu.
const commit = promisify(execFile)("git", ["rev-parse", "--short", "HEAD"])
    .then(({ stdout }) => stdout.trim())
    .catch(() => "unbekannt");

const LINKS = [
    { href: "/dashboard/feature-flags", label: "Flags" },
    { href: "/dashboard/security", label: "Sicherheit" },
    { href: "/dashboard/server", label: "Server" },
];

function Segment({ icon, children, title }: { icon: React.ReactNode; children: React.ReactNode; title?: string }) {
    return (
        <span title={title} className="flex shrink-0 items-center gap-1.5 border-l border-white/10 px-3">
            <span className="text-amber-400/70" aria-hidden="true">
                {icon}
            </span>
            {children}
        </span>
    );
}

/**
 * Leiste am unteren Rand, solange ein Admin den Debug-Modus an hat. Ohne das
 * Cookie bleibt es beim Lesen des Cookies — Besucher zahlen keine Session- oder
 * DB-Abfrage. Absichtlich immer dunkel: sie soll nie wie ein Teil der Seite
 * aussehen.
 */
export async function DebugBar() {
    if (!(await isDebugMode())) return null;
    const user = (await auth())?.user as
        | { email?: string | null; role?: string; loginAt?: number }
        | undefined;
    if (user?.role !== "ADMIN") return null;

    // `auth()` statt `getOptionalUser()`: die Leiste braucht die echte Rolle,
    // sonst verschwände sie in der Mitgliederansicht samt Rückweg.
    const [flags, sha, asMember] = await Promise.all([getAllFeatureFlags(), commit, isViewingAsMember()]);
    const off = flags.filter((f) => !f.enabled);
    const sessionEnd = user.loginAt ? user.loginAt + ADMIN_SESSION_MAX_MS : null;

    return (
        <>
            {/* Platzhalter im Fluss, damit die Leiste den Footer nicht verdeckt. */}
            <div className="h-10" aria-hidden="true" />
            <div
                role="region"
                aria-label="Debug-Leiste"
                className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-40 h-10 border-t border-amber-400/40 bg-zinc-950/95 font-mono text-xs text-zinc-300 shadow-[0_-8px_24px_-12px_rgba(251,191,36,0.35)] backdrop-blur md:bottom-0"
            >
                {/* Nur die Mitte scrollt; Kennung und Knöpfe bleiben bei jeder
                    Fensterbreite sichtbar. */}
                <div className="flex h-full items-stretch whitespace-nowrap">
                    <span className="flex shrink-0 items-center bg-[repeating-linear-gradient(-45deg,#fbbf24_0_8px,#18181b_8px_16px)] px-1.5 sm:px-3">
                        <span className="flex items-center gap-1.5 rounded bg-zinc-950 px-2 py-0.5 font-bold tracking-widest text-amber-400">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75 motion-reduce:hidden" />
                                <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
                            </span>
                            <span className="hidden sm:inline">DEBUG</span>
                        </span>
                    </span>

                    <div className="flex min-w-0 flex-1 items-stretch overflow-x-auto overscroll-x-contain [scrollbar-width:none]">
                    <span className="flex shrink-0 items-center gap-2 px-3">
                        <Bug size={13} className="text-amber-400/70" aria-hidden="true" />
                        <span className="text-zinc-100">{user.email}</span>
                        {asMember ? (
                            <span
                                title="Seiten, Aktionen und APIs behandeln dich wie ein Mitglied"
                                className="rounded bg-sky-400/15 px-1.5 text-[10px] font-bold text-sky-300"
                            >
                                ADMIN → MITGLIED
                            </span>
                        ) : (
                            <span className="rounded bg-amber-400/15 px-1.5 text-[10px] font-bold text-amber-300">
                                {user.role}
                            </span>
                        )}
                    </span>

                    <Segment icon={<Timer size={13} />} title="Ende der Admin-Sitzung (12 h ab Login)">
                        Sitzung bis {sessionEnd ? TIME.format(sessionEnd).slice(0, 5) : "?"}
                    </Segment>

                    <Segment
                        icon={<Flag size={13} />}
                        title={off.length ? `Aus: ${off.map((f) => f.label).join(", ")}` : "Alle Funktionen aktiv"}
                    >
                        <span className={off.length ? "text-red-400" : "text-emerald-400"}>
                            {flags.length - off.length}/{flags.length}
                        </span>
                        {off.length > 0 && (
                            <span className="max-w-48 truncate text-zinc-500">
                                aus: {off.map((f) => f.label).join(", ")}
                            </span>
                        )}
                    </Segment>

                    <Segment icon={<GitCommit size={13} />} title="Laufender Commit · NODE_ENV">
                        <span className="text-zinc-100">{sha}</span>
                        <span className="text-zinc-500">{process.env.NODE_ENV}</span>
                    </Segment>

                    <Segment icon={<Clock size={13} />} title="Zeitpunkt, an dem der Server dieses Layout gerendert hat">
                        {TIME.format(new Date())}
                    </Segment>

                    {/* In der Mitgliederansicht leiteten die Links nur um. */}
                    {!asMember && (
                        <span className="flex shrink-0 items-center gap-1 border-l border-white/10 px-2">
                            {LINKS.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="rounded px-2 py-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-amber-400"
                            >
                                {label}
                            </Link>
                            ))}
                        </span>
                    )}
                    </div>

                    <span className="flex shrink-0 items-center gap-1 border-l border-white/10 pl-2 pr-2 shadow-[-12px_0_12px_-8px_rgba(0,0,0,0.8)]">
                        <DebugConsole />
                        <form action={toggleMemberView}>
                            <button
                                type="submit"
                                aria-pressed={asMember}
                                title={asMember ? "Zurück zur Admin-Ansicht" : "Seite so sehen, wie ein Mitglied sie sieht"}
                                className={
                                    asMember
                                        ? "ml-1 flex items-center gap-1 rounded bg-sky-400 px-2 py-1 font-semibold text-zinc-950 transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-sky-400"
                                        : "ml-1 flex items-center gap-1 rounded border border-sky-400/40 px-2 py-1 text-sky-300 transition-colors hover:bg-sky-400 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-sky-400"
                                }
                            >
                                {asMember ? <ShieldCheck size={12} aria-hidden="true" /> : <Eye size={12} aria-hidden="true" />}
                                <span className="hidden sm:inline">{asMember ? "Admin-Ansicht" : "Als Mitglied"}</span>
                            </button>
                        </form>
                        <form action={toggleDebugMode}>
                            <button
                                type="submit"
                                title="Debug-Modus beenden"
                                className="ml-1 flex items-center gap-1 rounded border border-amber-400/40 px-2 py-1 text-amber-300 transition-colors hover:bg-amber-400 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-amber-400"
                            >
                                <Power size={12} aria-hidden="true" />
                                <span className="hidden sm:inline">Beenden</span>
                            </button>
                        </form>
                    </span>
                </div>
            </div>
        </>
    );
}
