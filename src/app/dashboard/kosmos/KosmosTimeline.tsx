"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Mail, Maximize2, Minimize2, X } from "lucide-react";
import { Button, Switch } from "@/components/ui";
import { STAGE_CLASS, endOf, overlaps, packLanes, type KosmosMember } from "@/lib/kosmos";
import { revealKosmosEmailAction, setKosmosVisibilityAction } from "./actions";

/*
 * Maße in Pixeln. Die Jahre sind breiter als der Bildschirm: man scrollt
 * (oder zieht) durch die Zeit. Die Zeilenhöhe füllt die Bühne, mit Unter-
 * und Obergrenze — darunter wird auch vertikal gescrollt.
 */
const YEAR_PX = 110;
const YEAR_PX_PHONE = 76;
const PAD_L = 56;
const PAD_R = 64;
const TOP = 64;
const MIN_ROW = 26;
const MAX_ROW = 56;
const AXIS = 46;
const FONT = 11;


/** Fester Startwert: Server und Browser müssen denselben Himmel zeichnen. */
function random(seed: number) {
    return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

function starField(seed: number, count: number, size: [number, number], alpha: [number, number], twinkleEvery = 0) {
    const rnd = random(seed);
    return Array.from({ length: count }, (_, i) => ({
        x: (rnd() * SKY_W).toFixed(1),
        y: (rnd() * SKY_H).toFixed(1),
        r: (size[0] + rnd() * (size[1] - size[0])).toFixed(2),
        o: (alpha[0] + rnd() * (alpha[1] - alpha[0])).toFixed(2),
        twinkle: twinkleEvery > 0 && i % twinkleEvery === 0,
        delay: `${(rnd() * 4).toFixed(2)}s`,
    }));
}

function Stars({ stars }: { stars: ReturnType<typeof starField> }) {
    return stars.map((s, i) => (
        <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#fff"
            opacity={s.o}
            className={s.twinkle ? "k-twinkle" : undefined}
            style={s.twinkle ? { animationDelay: s.delay } : undefined}
        />
    ));
}

/* Jede Ebene ist so breit, dass sie auch nach dem Verschieben noch den
   ganzen Bildschirm deckt; ihre Höhe folgt der Bühne. */
const SKY_W = 2400;
const SKY_H = 700;

/**
 * Eine Tiefenebene: verschiebt sich beim Scrollen um `depth` × Scrollweite
 * (0 = steht, 1 = läuft mit den Spuren). Eigenes HTML-Element statt einer
 * SVG-Gruppe, damit der Browser die Ebene als fertiges Bild verschiebt,
 * statt Weichzeichner und Wolkenrauschen bei jedem Scrollschritt neu zu
 * rechnen.
 */
function Layer({ depth, className, children }: { depth: number; className: string; children: React.ReactNode }) {
    return (
        <div className={`k-par absolute inset-y-0 left-0 ${className}`} style={{ "--k-depth": depth } as React.CSSProperties}>
            <svg className="h-full w-auto max-w-none" viewBox={`0 0 ${SKY_W} ${SKY_H}`} preserveAspectRatio="xMinYMid slice">
                {children}
            </svg>
        </div>
    );
}

/**
 * Der Hintergrund — je Modus ein eigener Himmel, nicht nur andere Farben:
 * nachts Milchstraße, funkelnde Sterne und ab und zu eine Sternschnuppe,
 * tagsüber ziehende Wolken und Mond. Mehrere Ebenen in verschiedener Tiefe
 * ergeben beim Scrollen eine Parallaxe.
 */
export function Sky() {
    return (
        <div aria-hidden="true" className="k-sky pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <svg className="absolute size-0">
                <defs>
                    <filter id="k-haze" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="40" />
                    </filter>
                    <filter id="k-bokeh" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="1.6" />
                    </filter>
                    <filter id="k-clouds-far">
                        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.016" numOctaves="4" seed="4" />
                        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.7 -0.8" />
                    </filter>
                    <filter id="k-clouds-near">
                        <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.009" numOctaves="4" seed="17" />
                        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 2.4 -1.25" />
                    </filter>
                    <linearGradient id="k-shoot-tail" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="140" y2="0">
                        <stop offset="0" stopColor="#fff" stopOpacity="0" />
                        <stop offset="1" stopColor="#fff" />
                    </linearGradient>
                    <linearGradient id="k-near-fade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#fff" stopOpacity="0" />
                        <stop offset="0.55" stopColor="#fff" />
                    </linearGradient>
                    <mask id="k-near-mask">
                        <rect width={SKY_W} height={SKY_H} fill="url(#k-near-fade)" />
                    </mask>
                    <mask id="k-moon">
                        <circle cx="1080" cy="90" r="22" fill="#fff" />
                        <circle cx="1091" cy="83" r="20" fill="#000" />
                    </mask>
                </defs>
            </svg>

            {/* Nacht: Milchstraße und ferne Sterne → mittlere → nahe, unscharfe Sterne */}
            <Layer depth={0.06} className="k-night">
                <g className="k-drift">
                    <g filter="url(#k-haze)" transform="rotate(-14 1200 350)">
                        <ellipse cx="1200" cy="350" rx="1500" ry="95" fill="#3b4a8a" opacity="0.55" />
                        <ellipse cx="900" cy="360" rx="700" ry="36" fill="#c9b6ff" opacity="0.3" />
                        <ellipse cx="1500" cy="330" rx="420" ry="34" fill="#9a1449" opacity="0.5" />
                    </g>
                    <Stars stars={starField(11, 320, [0.2, 0.75], [0.2, 0.6])} />
                </g>
                <g className="k-shoot">
                    <line x1="0" y1="0" x2="140" y2="0" stroke="url(#k-shoot-tail)" strokeWidth="1.6" strokeLinecap="round" />
                </g>
            </Layer>
            <Layer depth={0.16} className="k-night">
                <Stars stars={starField(23, 140, [0.6, 1.3], [0.45, 0.95], 5)} />
            </Layer>
            <Layer depth={0.38} className="k-night">
                <g filter="url(#k-bokeh)">
                    <Stars stars={starField(37, 34, [1.6, 3], [0.25, 0.6], 3)} />
                </g>
            </Layer>

            {/* Tag: Mond und hohe Schleierwolken → tiefe, dichte Wolken am Horizont */}
            <Layer depth={0.04} className="k-day">
                <rect width={SKY_W} height={SKY_H} fill="#fff" opacity="0.9" mask="url(#k-moon)" />
                <rect className="k-clouds" width={SKY_W} height={SKY_H} filter="url(#k-clouds-far)" opacity="0.7" />
            </Layer>
            <Layer depth={0.3} className="k-day">
                <rect width={SKY_W} height={SKY_H} filter="url(#k-clouds-near)" mask="url(#k-near-mask)" opacity="0.85" />
            </Layer>
        </div>
    );
}

function years(m: KosmosMember) {
    const start = Math.floor(m.start);
    return m.end === null ? `seit ${start}` : `${start} – ${Math.floor(m.end)}`;
}

const subscribeFullscreen = (onChange: () => void) => {
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
};

export function KosmosTimeline({
    members,
    meId,
    now,
    actions,
    notice,
}: {
    members: KosmosMember[];
    meId: string;
    now: number;
    /** Steht oben rechts neben dem Vollbild-Knopf (Sichtbarkeitsschalter). */
    actions?: React.ReactNode;
    /** Hinweis unter dem Titel, z. B. wenn der eigene Studienbeginn fehlt. */
    notice?: React.ReactNode;
}) {
    const Y0 = Math.floor(Math.min(now - 10, ...members.map((m) => m.start)));
    const Y1 = Math.ceil(now);
    const span = Y1 - Y0;

    // Bis zur ersten Messung zeichnen wir mit einer Standardgröße, aber
    // unsichtbar — das Einblenden startet erst mit der echten Größe.
    const stageRef = useRef<HTMLElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [box, setBox] = useState<{ w: number; h: number } | null>(null);
    useLayoutEffect(() => {
        const el = boxRef.current;
        if (!el) return;
        let first = true;
        const observer = new ResizeObserver(([entry]) => {
            setBox({ w: entry.contentRect.width, h: entry.contentRect.height });
            if (!first) return;
            first = false;
            // Auf schmalen Schirmen zum eigenen Studienbeginn scrollen.
            requestAnimationFrame(() => {
                const cursor = el.querySelector(".k-cursor");
                if (!cursor) return;
                const c = cursor.getBoundingClientRect();
                const b = el.getBoundingClientRect();
                el.scrollLeft += c.left + c.width / 2 - (b.left + b.width / 2);
            });
        });
        observer.observe(el);

        // Mausrad dreht die Zeit, solange es vertikal nichts zu scrollen gibt.
        // Am Anfang und Ende der Zeitleiste scrollt wieder die Seite.
        const onWheel = (e: WheelEvent) => {
            if (e.ctrlKey || Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
            if (el.scrollHeight > el.clientHeight) return;
            const max = el.scrollWidth - el.clientWidth;
            if ((e.deltaY < 0 && el.scrollLeft <= 0) || (e.deltaY > 0 && el.scrollLeft >= max - 1)) return;
            e.preventDefault();
            el.scrollLeft += e.deltaY;
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => {
            observer.disconnect();
            el.removeEventListener("wheel", onWheel);
        };
    }, []);

    // Mit der Maus ins Leere greifen und ziehen; Touch scrollt ohnehin selbst.
    const pan = useRef<{ x: number; left: number; moved: boolean } | null>(null);
    const panned = useRef(false);
    const [scrollX, setScrollX] = useState(0);

    const w = box?.w ?? 1200;
    const h = box?.h ?? 600;
    const PX = Math.max(w < 640 ? YEAR_PX_PHONE : YEAR_PX, (w - PAD_L - PAD_R) / span);
    const W = PAD_L + PAD_R + span * PX;
    const x = (year: number) => PAD_L + (year - Y0) * PX;

    // Der Name steht über dem Streifen und darf in den nächsten nicht hineinragen.
    const charYears = (FONT * 0.6) / PX;
    const { lane, count } = packLanes(
        members.map((m) => [m.start, Math.max(endOf(m, now), m.start + (m.name.length + 5) * charYears)]),
        0.4,
    );
    const ROW = Math.min(MAX_ROW, Math.max(MIN_ROW, (h - TOP - AXIS) / Math.max(count, 1)));
    const H = Math.max(h, TOP + count * ROW + AXIS);
    const laneTop = TOP + (H - TOP - AXIS - count * ROW) / 2;

    const me = members.find((m) => m.id === meId);
    const [year, setYear] = useState(() => Math.min(Math.floor(me?.start ?? now), Y1 - 1));
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [emails, setEmails] = useState<Record<string, string>>({});
    const selected = members.find((m) => m.id === selectedId) ?? null;

    const atCursor = (m: KosmosMember) => m.start < year + 1 && endOf(m, now) > year;
    const cursorCount = members.filter(atCursor).length;

    const svgRef = useRef<SVGSVGElement>(null);
    const dragging = useRef(false);
    const yearAt = (clientX: number) => {
        const ctm = svgRef.current?.getScreenCTM();
        if (!ctm) return year;
        const px = new DOMPoint(clientX, 0).matrixTransform(ctm.inverse()).x;
        return Math.min(Y1 - 1, Math.max(Y0, Math.floor(Y0 + (px - PAD_L) / PX)));
    };

    const pillW = 172;
    const cursorX = x(year + 0.5);
    // Die Pille bleibt im Bild, auch wenn der Cursor am Rand steht.
    const pillDx = Math.min(W - 12 - pillW, Math.max(12, cursorX - pillW / 2)) - cursorX;

    const canFullscreen = useSyncExternalStore(subscribeFullscreen, () => document.fullscreenEnabled, () => false);
    const isFullscreen = useSyncExternalStore(subscribeFullscreen, () => document.fullscreenElement != null, () => false);

    return (
        <section
            ref={stageRef}
            aria-label="Alumni-Kosmos"
            className={`${STAGE_CLASS} flex flex-col ${box ? "k-ready" : ""}`}
            onKeyDown={(e) => e.key === "Escape" && setSelectedId(null)}
        >
            <Sky />

            <div className="flex items-start justify-between gap-4 px-5 pt-4 sm:px-8 sm:pt-6">
                <div className="grid min-w-0 flex-1 gap-1">
                    <Link
                        href="/dashboard"
                        className="inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium opacity-75 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-physics"
                    >
                        <ArrowLeft size={14} aria-hidden="true" />
                        Dashboard
                    </Link>
                    <h1 className="display text-[clamp(1.875rem,4.5vw,3rem)]">Alumni-Kosmos</h1>
                    <p className="text-sm opacity-80 text-pretty">
                        Jede Spur ist eine Studienzeit. Scroll durch die Jahre, zieh den Jahres-Cursor oder klick auf eine Spur.
                    </p>
                    {notice}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                    {actions}
                    {canFullscreen && (
                        <button
                            type="button"
                            onClick={() =>
                                isFullscreen ? document.exitFullscreen() : stageRef.current?.requestFullscreen()
                            }
                            aria-label={isFullscreen ? "Vollbild beenden" : "Vollbild"}
                            title={isFullscreen ? "Vollbild beenden" : "Vollbild"}
                            className="grid size-10 cursor-pointer place-items-center rounded-full border border-current/25 transition-colors hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-physics"
                        >
                            {isFullscreen ? <Minimize2 size={17} aria-hidden="true" /> : <Maximize2 size={17} aria-hidden="true" />}
                        </button>
                    )}
                </div>
            </div>

            <div
                ref={boxRef}
                className="k-scroll relative min-h-0 flex-1 cursor-grab overflow-auto active:cursor-grabbing"
                onPointerDown={(e) => {
                    panned.current = false;
                    if (e.pointerType !== "mouse" || e.button !== 0) return;
                    if ((e.target as Element).closest(".k-member, .k-cursor")) return;
                    pan.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
                }}
                onPointerMove={(e) => {
                    const p = pan.current;
                    if (!p) return;
                    const dx = e.clientX - p.x;
                    if (!p.moved && Math.abs(dx) < 5) return;
                    if (!p.moved) e.currentTarget.setPointerCapture(e.pointerId);
                    p.moved = true;
                    e.currentTarget.scrollLeft = p.left - dx;
                }}
                onPointerUp={() => {
                    panned.current = pan.current?.moved ?? false;
                    pan.current = null;
                }}
                onPointerCancel={() => (pan.current = null)}
                onScroll={(e) => {
                    const left = e.currentTarget.scrollLeft;
                    setScrollX(left);
                    stageRef.current?.querySelector<HTMLElement>(".k-sky")?.style.setProperty("--k-x", `${left}px`);
                }}
            >
                <svg
                    ref={svgRef}
                    width={W}
                    height={H}
                    viewBox={`0 0 ${W} ${H}`}
                    className="block max-w-none select-none"
                    role="group"
                    aria-label="Zeitstrahl der Studienzeiten"
                >
                    <defs>
                        <linearGradient id="k-trail">
                            <stop offset="0" style={{ stopColor: "var(--k-trail)", stopOpacity: 0 }} />
                            <stop offset="0.8" style={{ stopColor: "var(--k-trail)", stopOpacity: 0.9 }} />
                            <stop offset="1" style={{ stopColor: "var(--k-head)" }} />
                        </linearGradient>
                        <linearGradient id="k-trail-self">
                            <stop offset="0" style={{ stopColor: "var(--k-trail-self)", stopOpacity: 0 }} />
                            <stop offset="0.8" style={{ stopColor: "var(--k-trail-self)", stopOpacity: 0.95 }} />
                            <stop offset="1" style={{ stopColor: "var(--k-head)" }} />
                        </linearGradient>
                        <filter id="k-glow" x="-200%" y="-200%" width="500%" height="500%">
                            <feGaussianBlur stdDeviation="2.5" />
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="k-soft" x="-5%" y="-300%" width="110%" height="700%">
                            <feGaussianBlur stdDeviation="1.4" />
                        </filter>
                    </defs>

                    {/* Klick ins Leere: Jahr wählen und Auswahl aufheben. */}
                    <rect
                        width={W}
                        height={H}
                        fill="transparent"
                        onClick={(e) => {
                            if (panned.current) return;
                            setSelectedId(null);
                            setYear(yearAt(e.clientX));
                        }}
                    />

                    {Array.from({ length: span }, (_, i) => {
                        const y = Y0 + i;
                        const major = y % 5 === 0;
                        return (
                            <g key={y} pointerEvents="none">
                                {/* Große, fast unsichtbare Jahreszahl als Wegmarke beim Scrollen */}
                                {major && (
                                    <text
                                        x={x(y) + 8}
                                        y={H - AXIS - 8}
                                        fontSize={Math.min(140, PX * 1.3)}
                                        fontWeight={700}
                                        fill="var(--k-ink)"
                                        opacity={0.06}
                                        className="font-mono"
                                    >
                                        {y}
                                    </text>
                                )}
                                <line
                                    x1={x(y)}
                                    x2={x(y)}
                                    y1={TOP - 14}
                                    y2={H - AXIS + 6}
                                    stroke="var(--k-ink)"
                                    strokeOpacity={major ? 0.22 : 0.08}
                                />
                                <text
                                    x={x(y + 0.5)}
                                    y={H - AXIS + 24}
                                    textAnchor="middle"
                                    fontSize={major ? 12 : 10.5}
                                    fontWeight={major ? 700 : 400}
                                    fill="var(--k-ink)"
                                    opacity={major ? 0.9 : 0.6}
                                    className="font-mono"
                                >
                                    {y}
                                </text>
                            </g>
                        );
                    })}
                    <g pointerEvents="none">
                        <line
                            x1={x(now)}
                            x2={x(now)}
                            y1={TOP - 14}
                            y2={H - AXIS + 6}
                            stroke="var(--k-ink)"
                            strokeOpacity={0.5}
                            strokeDasharray="3 4"
                        />
                        <text x={x(now) + 6} y={TOP - 4} fontSize={10.5} fill="var(--k-ink)" opacity={0.8} className="font-mono">
                            heute
                        </text>
                    </g>

                    {/* Gewähltes Jahr als Band hinter den Streifen */}
                    <g className="k-move" style={{ transform: `translateX(${x(year)}px)` }} pointerEvents="none">
                        <rect width={PX} y={TOP - 14} height={H - AXIS - TOP + 20} fill="var(--market)" opacity={0.1} />
                    </g>

                    {members.map((m, i) => {
                        const cy = laneTop + lane[i] * ROW + ROW / 2 + 4;
                        const x1 = x(m.start);
                        const x2 = x(endOf(m, now));
                        const isMe = m.id === meId;
                        const isSelected = m.id === selectedId;
                        const lit = selected ? isSelected || overlaps(m, selected, now) : atCursor(m);
                        const th = isSelected ? 4 : 3;
                        const label = `${m.name}${isMe ? " · du" : ""}`;
                        // Namen laufen am linken Rand mit, solange ihre Spur noch zu sehen ist.
                        const labelX = Math.max(x1, Math.min(scrollX + 44, x2 - label.length * FONT * 0.6 - 12));
                        const toggle = () => setSelectedId(isSelected ? null : m.id);
                        return (
                            <g
                                key={m.id}
                                role="button"
                                tabIndex={0}
                                aria-pressed={isSelected}
                                aria-label={`${m.name}, ${years(m)}`}
                                className="k-member cursor-pointer outline-none"
                                opacity={lit ? 1 : 0.38}
                                // Einflug von links nach rechts, in der Reihenfolge des Studienbeginns.
                                style={{ "--d": `${((m.start - Y0) / span) * 1.4}s` } as React.CSSProperties}
                                onClick={toggle}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        toggle();
                                    }
                                }}
                            >
                                <rect
                                    className="k-hit"
                                    x={x1 - 4}
                                    y={cy - 20}
                                    width={Math.max(x2 - x1, label.length * FONT * 0.6) + 16}
                                    height={28}
                                    rx={4}
                                    fill="transparent"
                                />
                                <rect
                                    className="k-day k-trail"
                                    x={x1}
                                    y={cy - th / 2 + 1.5}
                                    width={x2 - x1}
                                    height={th}
                                    rx={th / 2}
                                    fill="var(--k-ink)"
                                    opacity={0.12}
                                />
                                <rect
                                    className="k-trail"
                                    x={x1}
                                    y={cy - th / 2}
                                    width={x2 - x1}
                                    height={th}
                                    rx={th / 2}
                                    fill={`url(#${isMe ? "k-trail-self" : "k-trail"})`}
                                />
                                <g className="k-head">
                                    <circle
                                        className="k-night"
                                        cx={x2}
                                        cy={cy}
                                        r={isSelected ? 4.5 : 3}
                                        fill="var(--k-head)"
                                        filter="url(#k-glow)"
                                    />
                                    <path className="k-day" d={`M${x2 + 3} ${cy} l-8 -4 2 4 -2 4z`} fill="var(--k-ink)" />
                                    {m.end === null && (
                                        <circle
                                            cx={x2}
                                            cy={cy}
                                            r={7.5}
                                            fill="none"
                                            stroke="var(--k-ink)"
                                            strokeOpacity={0.45}
                                            className="k-twinkle"
                                        />
                                    )}
                                    {isSelected && (
                                        <circle
                                            cx={x2}
                                            cy={cy}
                                            r={11}
                                            fill="none"
                                            stroke="var(--k-ink)"
                                            strokeDasharray="2 3"
                                            className="k-spin"
                                        />
                                    )}
                                </g>
                                <text
                                    className="k-head"
                                    x={labelX}
                                    y={cy - 7}
                                    fontSize={FONT}
                                    fill="var(--k-ink)"
                                    fontWeight={isMe || isSelected ? 700 : 400}
                                >
                                    {label}
                                </text>
                            </g>
                        );
                    })}

                    {/* Jahres-Cursor: ziehen, klicken oder mit den Pfeiltasten */}
                    <g
                        role="slider"
                        tabIndex={0}
                        aria-label="Jahr"
                        aria-valuemin={Y0}
                        aria-valuemax={Y1 - 1}
                        aria-valuenow={year}
                        aria-valuetext={`${year}: ${cursorCount} an der Uni`}
                        className="k-cursor k-move cursor-ew-resize outline-none"
                        style={{ touchAction: "none", transform: `translateX(${cursorX}px)` }}
                        onPointerDown={(e) => {
                            dragging.current = true;
                            e.currentTarget.setPointerCapture(e.pointerId);
                        }}
                        onPointerMove={(e) => dragging.current && setYear(yearAt(e.clientX))}
                        onPointerUp={() => (dragging.current = false)}
                        onPointerCancel={() => (dragging.current = false)}
                        onKeyDown={(e) => {
                            const next =
                                e.key === "ArrowLeft" || e.key === "ArrowDown" ? year - 1
                                : e.key === "ArrowRight" || e.key === "ArrowUp" ? year + 1
                                : e.key === "Home" ? Y0
                                : e.key === "End" ? Y1 - 1
                                : null;
                            if (next === null) return;
                            e.preventDefault();
                            setYear(Math.min(Y1 - 1, Math.max(Y0, next)));
                        }}
                    >
                        <rect x={-8} y={TOP - 46} width={16} height={H - AXIS - TOP + 52} fill="transparent" />
                        <line y1={TOP - 26} y2={H - AXIS + 6} stroke="var(--market)" strokeWidth={1.5} />
                        <rect className="k-pill" x={pillDx} y={TOP - 48} width={pillW} height={22} rx={11} fill="var(--market)" />
                        <text
                            x={pillDx + pillW / 2}
                            y={TOP - 33}
                            textAnchor="middle"
                            fontSize={11}
                            fontWeight={700}
                            fill="var(--on-market)"
                            className="font-mono"
                        >
                            ‹ {year} · {cursorCount} an der Uni ›
                        </text>
                    </g>
                </svg>
            </div>

            {members.length <= 1 && (
                <p className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center text-sm font-semibold">
                    Noch ist niemand außer dir im Kosmos. Sag es weiter!
                </p>
            )}

            {selected && (
                <MemberCard
                    key={selected.id}
                    member={selected}
                    isMe={selected.id === meId}
                    together={me != null && me.id !== selected.id && overlaps(me, selected, now)}
                    contemporaries={members.filter((m) => m.id !== selected.id && overlaps(m, selected, now)).length}
                    email={emails[selected.id] ?? null}
                    onEmail={(email) => setEmails((prev) => ({ ...prev, [selected.id]: email }))}
                    onClose={() => setSelectedId(null)}
                />
            )}
        </section>
    );
}

function MemberCard({
    member,
    isMe,
    together,
    contemporaries,
    email,
    onEmail,
    onClose,
}: {
    member: KosmosMember;
    isMe: boolean;
    together: boolean;
    contemporaries: number;
    email: string | null;
    onEmail: (email: string) => void;
    onClose: () => void;
}) {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const reveal = () =>
        startTransition(async () => {
            const result = await revealKosmosEmailAction(member.id);
            if (result.ok && result.data) onEmail(result.data);
            else if (!result.ok) setError(result.message);
        });

    return (
        <div
            role="dialog"
            aria-label={member.name}
            className="k-card absolute inset-x-3 bottom-3 grid gap-3 rounded-[10px] border p-4 backdrop-blur-md sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-80"
        >
            <button
                type="button"
                onClick={onClose}
                aria-label="Schließen"
                className="absolute top-2.5 right-2.5 grid size-8 cursor-pointer place-items-center rounded-full opacity-70 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-physics"
            >
                <X size={16} aria-hidden="true" />
            </button>
            <div className="grid gap-1 pr-8">
                <p className="text-lg leading-tight font-semibold">{member.name}</p>
                <p className="font-mono text-[11px] tracking-wider uppercase opacity-80">
                    {member.degreeProgram ? `${member.degreeProgram} · ` : ""}
                    {years(member)}
                </p>
                <p className="font-mono text-[11px] tracking-wider uppercase opacity-80">
                    {isMe ? "Das bist du" : together ? "Ihr wart gleichzeitig an der Uni" : `${contemporaries} gleichzeitig an der Uni`}
                </p>
            </div>

            {!isMe &&
                (email ? (
                    <div className="flex flex-wrap items-center gap-2">
                        <a href={`mailto:${email}`} className="k-cta inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold">
                            <Mail size={15} aria-hidden="true" />
                            E-Mail schreiben
                        </a>
                        <button
                            type="button"
                            onClick={async () => {
                                await navigator.clipboard.writeText(email);
                                setCopied(true);
                            }}
                            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-current/30 px-3 text-sm font-semibold"
                        >
                            {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                            {copied ? "Kopiert" : "Kopieren"}
                        </button>
                        <p className="w-full truncate font-mono text-xs opacity-80">{email}</p>
                    </div>
                ) : (
                    <Button size="sm" onClick={reveal} loading={pending} className="k-cta w-fit rounded-full">
                        <Mail size={15} aria-hidden="true" />
                        E-Mail-Adresse anzeigen
                    </Button>
                ))}
            {error && (
                <p role="alert" className="text-sm font-semibold">
                    {error}
                </p>
            )}
        </div>
    );
}

/** Schalter für die eigene Sichtbarkeit; aus heißt auch: Kosmos zu. */
export function KosmosVisibility({ visible }: { visible: boolean }) {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const set = (next: boolean) =>
        startTransition(async () => {
            const result = await setKosmosVisibilityAction(next);
            if (!result.ok) setError(result.message);
        });

    if (!visible) {
        return (
            <div className="grid gap-2">
                <Button onClick={() => set(true)} loading={pending} className="w-fit">
                    Sichtbar werden & Kosmos öffnen
                </Button>
                {error && <p role="alert" className="text-sm text-negative">{error}</p>}
            </div>
        );
    }
    return (
        <div className="grid gap-1">
            <label className="flex cursor-pointer items-center gap-3 text-sm font-medium">
                <Switch checked={visible} disabled={pending} onCheckedChange={set} aria-label="Für andere Mitglieder sichtbar" />
                <span className="hidden sm:inline">Für andere sichtbar</span>
            </label>
            {error && <p role="alert" className="text-sm text-negative">{error}</p>}
        </div>
    );
}
