"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { massFromArea, stepBodies, wake, type Body, type Field } from "@/lib/gravityPhysics";

type GravityPreset = "earth" | "moon" | "zerog" | "antigravity" | "blackhole";

const PRESETS: { id: GravityPreset; icon: string; label: string; status: string; gy: number }[] = [
  { id: "earth", icon: "🌍", label: "Erde (1g)", status: "Erdschwerefeld: g = 9.81 m/s²", gy: 1200 },
  { id: "moon", icon: "🌙", label: "Mond", status: "Mondgravitation: g = 1.62 m/s² (schwebend)", gy: 200 },
  { id: "zerog", icon: "🛸", label: "Zero-G", status: "Schwerelosigkeit: g = 0 m/s² (Zero-G)", gy: 0 },
  { id: "antigravity", icon: "🎈", label: "Invertiert", status: "Antigravitation: g = -9.81 m/s²", gy: -1200 },
  { id: "blackhole", icon: "🕳️", label: "Singulär", status: "Singularität: Gravitationszug zu Zeiger oder Finger", gy: 0 },
];

interface PhysicsBody extends Body {
  el: HTMLElement;
  /** Seitenkoordinaten des umgebenden Blocks — `translate` wirkt relativ dazu. */
  originX: number;
  originY: number;
  homeX: number;
  homeY: number;
  savedCss: string;
  /** Im Bildschirm-Modus liegen Kacheln außerhalb des Viewports versteckt still. */
  offscreen: boolean;
}

const place = (b: PhysicsBody, x = b.x, y = b.y, angle = b.angle) => {
  b.el.style.transform = `translate3d(${(x - b.originX).toFixed(1)}px, ${(y - b.originY).toFixed(1)}px, 0) rotate(${angle.toFixed(3)}rad)`;
};

/* Synthetisierter Klanggenerator ohne externe Audio-Dateien */
class WebAudioFx {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /* Dumpfer Anschlag beim Aufprall */
  playThud(intensity: number, massRatio: number) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = Math.max(70, 320 - massRatio * 180);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);

      const vol = Math.min(0.25, Math.max(0.02, intensity * 0.18));
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Audio darf fehlschlagen, ohne das Spiel zu unterbrechen
    }
  }

  /* Kosmischer Sweep beim Aktivieren */
  playCollapse() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.6);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch {}
  }

  /* Aufsteigende Tonfolge beim Wiederherstellen der Entropie */
  playRewind() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [130.81, 164.81, 196.0, 261.63, 329.63, 392.0, 523.25].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + i * 0.07;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.12, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.2);
      });
    } catch {}
  }
}

/*
 * Sammelt die Kacheln und Inhaltsblöcke der ganzen Seite und löst sie aus dem Layout.
 * `screenOnly` (Touch): Nur was gerade sichtbar ist, fällt — innerhalb des Bildschirms.
 * Sonst landete alles am Ende einer langen Seite, der Bildschirm wäre leer, und
 * Wischen müsste zugleich scrollen und Kacheln ziehen.
 */
function collectAndDetachBodies(screenOnly: boolean): PhysicsBody[] {
  const container = document.getElementById("inhalt") || document.body;
  const selectors = [
    "section > div",
    "[class*='rounded-3xl']",
    "[class*='rounded-2xl']",
    "[class*='rounded-xl']",
    "h1",
    "h2",
    "h3",
    "dl",
    "code.formula-block",
    "article",
    "a[class*='rounded-full']",
  ];

  // Nur äußerste Treffer, damit Kacheln als Ganzes fallen (querySelectorAll liefert Eltern vor Kindern)
  const picked: HTMLElement[] = [];
  for (const el of container.querySelectorAll<HTMLElement>(selectors.join(","))) {
    if (el.closest("[data-gravity-ignore]")) continue;
    if (picked.some((parent) => parent.contains(el))) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 50 || rect.height < 20) continue;
    picked.push(el);
  }

  // Seitenhöhe festhalten, damit man während des Effekts weiter scrollen kann
  const totalHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight);
  document.body.style.minHeight = `${totalHeight}px`;

  // Erst alles messen, dann schreiben, dann einmal nachmessen — sonst verschiebt jeder Schritt das Layout der nächsten Kachel
  const rects = picked.map((el) => el.getBoundingClientRect());
  const savedCss = picked.map((el) => el.style.cssText);

  picked.forEach((el, i) => {
    Object.assign(el.style, {
      position: "absolute",
      left: "0px",
      top: "0px",
      width: `${rects[i].width}px`,
      height: `${rects[i].height}px`,
      margin: "0",
      transform: "none",
      transition: "none",
      zIndex: "40",
      cursor: "grab",
      touchAction: "none",
      userSelect: "none",
      willChange: "transform",
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15)",
    });
  });

  // Der umgebende Block ist nicht immer <body> (z. B. `relative`-Sections) — seine Lage direkt ablesen
  const origins = picked.map((el) => el.getBoundingClientRect());

  return picked.map((el, i) => {
    const { width: w, height: h } = rects[i];
    const offscreen = screenOnly && (rects[i].bottom <= 0 || rects[i].top >= window.innerHeight);
    if (offscreen) el.style.visibility = "hidden";
    const body: PhysicsBody = {
      el,
      x: rects[i].left + window.scrollX,
      y: rects[i].top + window.scrollY,
      vx: (Math.random() - 0.5) * 120,
      vy: Math.random() * 80 + 30,
      angle: 0,
      vAngle: (Math.random() - 0.5) * 2.5,
      w,
      h,
      mass: massFromArea(w, h),
      dragging: false,
      originX: origins[i].left + window.scrollX,
      originY: origins[i].top + window.scrollY,
      homeX: rects[i].left + window.scrollX,
      homeY: rects[i].top + window.scrollY,
      savedCss: savedCss[i],
      offscreen,
    };
    place(body);
    return body;
  });
}

export default function GravityEasterEgg() {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  const [isActive, setIsActive] = useState(false);
  const [preset, setPreset] = useState<GravityPreset>("earth");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [collisionCount, setCollisionCount] = useState(0);
  const [hasTiltSensor, setHasTiltSensor] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const bodiesRef = useRef<PhysicsBody[]>([]);
  const restoreTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioFxRef = useRef<WebAudioFx>(new WebAudioFx());
  const mousePosRef = useRef({ x: 0, y: 0 });
  const tiltRef = useRef({ gx: 0, gy: 0 });
  const screenOnlyRef = useRef(false);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    audioFxRef.current.enabled = soundEnabled;
  }, [soundEnabled]);

  const showStatus = useCallback((msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage((current) => (current === msg ? null : current));
    }, 2800);
  }, []);

  // Sofort zurücksetzen, ohne Animation (Seitenwechsel, Unmount, Ende der Rückflug-Animation)
  const cleanupImmediate = useCallback(() => {
    if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current);
    restoreTimerRef.current = null;
    bodiesRef.current.forEach((b) => {
      b.el.style.cssText = b.savedCss;
    });
    document.body.style.minHeight = "";
    document.documentElement.style.overflow = "";
    bodiesRef.current = [];
    setIsActive(false);
  }, []);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (isActive) cleanupImmediate();
    }
  }, [pathname, isActive, cleanupImmediate]);

  useEffect(() => cleanupImmediate, [cleanupImmediate]);

  const triggerCollapse = useCallback(() => {
    if (isActive) return;

    // iOS gibt den Neigungssensor nur nach Rückfrage innerhalb einer Nutzergeste frei
    if (typeof DeviceOrientationEvent !== "undefined") {
      const orientation = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
      orientation.requestPermission?.().catch(() => {});
    }

    audioFxRef.current.playCollapse();
    showStatus("Gravitationskonstante manipuliert! G = 9.81 m/s²");
    screenOnlyRef.current = window.matchMedia("(pointer: coarse)").matches;
    if (screenOnlyRef.current) document.documentElement.style.overflow = "hidden";
    bodiesRef.current = collectAndDetachBodies(screenOnlyRef.current);
    setIsActive(true);
    setCollisionCount(0);
  }, [isActive, showStatus]);

  /* Umkehrung der Entropie / 2. Hauptsatz der Thermodynamik (Reset / Schließen) */
  const restoreOrder = useCallback(() => {
    if (restoreTimerRef.current) return; // läuft schon
    audioFxRef.current.playRewind();
    showStatus("2. Hauptsatz der Thermodynamik: Entropie umgekehrt! ↺");

    bodiesRef.current.forEach((b) => {
      b.dragging = false;
      b.el.style.transition = "transform 0.75s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.75s ease";
      b.el.style.boxShadow = "";
      place(b, b.homeX, b.homeY, 0);
    });
    // Gesetzter Timer hält Physik und Ziehen an, damit nichts die Transition überschreibt
    restoreTimerRef.current = setTimeout(cleanupImmediate, 800);
  }, [showStatus, cleanupImmediate]);

  // ESC bricht ab; "gravity" / "zerog" tippen startet
  useEffect(() => {
    let keyBuffer = "";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) {
        e.preventDefault();
        restoreOrder();
        return;
      }

      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.key.length !== 1) return; // Shift, Tab & Co. nicht in den Puffer

      keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-7);
      if (keyBuffer.endsWith("gravity") || keyBuffer.endsWith("zerog")) {
        keyBuffer = "";
        triggerCollapse();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isActive, triggerCollapse, restoreOrder]);

  // Auslöser aus dem Footer
  useEffect(() => {
    const handleTrigger = () => triggerCollapse();
    window.addEventListener("wiphy:gravity-collapse", handleTrigger);
    return () => window.removeEventListener("wiphy:gravity-collapse", handleTrigger);
  }, [triggerCollapse]);

  // Neigungssensor (Mobilgeräte)
  useEffect(() => {
    if (!isActive) return;

    let wokenAt = tiltRef.current;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      setHasTiltSensor(true);
      const tilt = {
        gx: Math.sin((e.gamma * Math.PI) / 180) * 1200,
        gy: Math.sin((e.beta * Math.PI) / 180) * 1200,
      };
      tiltRef.current = tilt;
      // Spürbar gekippt: eingeschlafene Kacheln sollen nachrutschen. Sensorrauschen weckt niemanden.
      if (Math.hypot(tilt.gx - wokenAt.gx, tilt.gy - wokenAt.gy) > 150) {
        wokenAt = tilt;
        bodiesRef.current.forEach(wake);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isActive]);

  /* Ziehen & Werfen */
  useEffect(() => {
    if (!isActive) return;

    let drag: { body: PhysicsBody; offsetX: number; offsetY: number; lastT: number; moved: boolean } | null = null;

    const onPointerDown = (e: PointerEvent) => {
      // Touch kennt kein Hover: die Singularität springt dorthin, wo der Finger aufsetzt
      mousePosRef.current = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY };
      const target = e.target as HTMLElement;
      if (restoreTimerRef.current || target.closest("[data-gravity-ignore]")) return;
      const body = bodiesRef.current.find((b) => !b.offscreen && b.el.contains(target));
      if (!body) return;

      e.preventDefault();
      wake(body);
      body.dragging = true;
      body.el.style.cursor = "grabbing";
      drag = {
        body,
        offsetX: e.clientX + window.scrollX - body.x,
        offsetY: e.clientY + window.scrollY - body.y,
        lastT: performance.now(),
        moved: false,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const pageX = e.clientX + window.scrollX;
      const pageY = e.clientY + window.scrollY;
      mousePosRef.current = { x: pageX, y: pageY };
      if (!drag) return;

      const { body } = drag;
      const now = performance.now();
      const dt = Math.max(0.001, (now - drag.lastT) / 1000);
      const x = pageX - drag.offsetX;
      const y = pageY - drag.offsetY;
      body.vx = (x - body.x) / dt;
      body.vy = (y - body.y) / dt;
      body.x = x;
      body.y = y;
      drag.lastT = now;
      drag.moved = true;
    };

    // Wer eine verlinkte Kachel wirft, will nicht dorthin navigieren
    const swallowClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const onPointerUp = () => {
      if (!drag) return;
      drag.body.dragging = false;
      drag.body.el.style.cursor = "grab";
      if (drag.moved) {
        window.addEventListener("click", swallowClick, { capture: true, once: true });
        setTimeout(() => window.removeEventListener("click", swallowClick, { capture: true }), 0);
      }
      drag = null;
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [isActive]);

  /* Physik-Schleife über die ganze Seitenhöhe */
  useEffect(() => {
    if (!isActive) return;

    const { gy } = PRESETS.find((p) => p.id === preset)!;
    const bodies = bodiesRef.current.filter((b) => !b.offscreen);
    bodies.forEach(wake); // neues Schwerefeld
    let last = performance.now();
    let frame = requestAnimationFrame(function step(time) {
      const dt = Math.min(0.04, (time - last) / 1000);
      last = time;
      frame = requestAnimationFrame(step);
      if (restoreTimerRef.current) return;

      const field: Field =
        preset === "blackhole"
          ? { attractor: mousePosRef.current }
          : hasTiltSensor && preset === "earth"
            ? tiltRef.current
            : { gx: 0, gy };

      // Breite ohne Scrollleiste. Touch: Kiste = Bildschirm über der Leiste; sonst die ganze Seite.
      const bounds = screenOnlyRef.current
        ? {
            top: window.scrollY,
            bottom: window.scrollY + window.innerHeight - (hudRef.current?.offsetHeight ?? 0),
            width: document.documentElement.clientWidth,
          }
        : { top: 0, bottom: parseFloat(document.body.style.minHeight) - 15, width: document.documentElement.clientWidth };
      const impacts = stepBodies(bodies, field, bounds, dt);
      bodies.forEach((b) => b.sleeping || place(b));

      // Gezählt wird alles, hörbar nur, was man auch sieht
      const top = window.scrollY - 100;
      const bottom = window.scrollY + window.innerHeight + 100;
      impacts.forEach(({ body, speed }) => {
        if (body.y + body.h >= top && body.y <= bottom) audioFxRef.current.playThud(speed / 1200, body.mass);
      });
      if (impacts.length) setCollisionCount((c) => c + impacts.length);
    });

    return () => cancelAnimationFrame(frame);
  }, [isActive, preset, hasTiltSensor]);

  if (!isActive) return null;

  return (
    <>
      {/* Schwebender Schließen-Button oben rechts (auch via ESC erreichbar) */}
      <button
        type="button"
        data-gravity-ignore
        onClick={restoreOrder}
        title="Gravitation wiederherstellen (Esc)"
        aria-label="Gravitation wiederherstellen und schließen"
        className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border border-line bg-surface/95 px-3.5 py-2 text-xs font-semibold text-foreground shadow-2xl backdrop-blur-md transition-all hover:bg-raised hover:scale-105 active:scale-95 cursor-pointer"
      >
        <X size={16} className="text-physics" />
        <span className="hidden sm:inline">Schließen</span>
        <kbd className="hidden sm:inline rounded bg-raised px-1.5 py-0.5 font-mono text-[10px] text-muted border border-line">
          ESC
        </kbd>
      </button>

      {/* Kontroll-Leiste am unteren Bildschirmrand */}
      <div
        ref={hudRef}
        data-gravity-ignore
        className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4"
      >
        <div role="status" aria-live="polite">
          {statusMessage && (
            <div className="rounded-full border border-physics/30 bg-surface/95 px-4 py-1.5 text-xs font-semibold text-physics shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
              {statusMessage}
            </div>
          )}
        </div>

        <div className="flex max-w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-line bg-surface/90 px-2 py-2 shadow-2xl backdrop-blur-lg sm:max-w-4xl sm:justify-between sm:gap-3 sm:px-6 sm:py-2.5">
          <div className="hidden items-center gap-2.5 sm:flex">
            <span className="grid size-8 place-items-center rounded-lg bg-physics/10 text-physics">
              <Sparkles size={17} />
            </span>
            <div className="grid leading-tight">
              <span className="text-xs font-bold tracking-wide uppercase text-foreground">
                Entropie-Modus
              </span>
              <span className="font-mono text-[10px] text-muted">
                {collisionCount} Stöße {hasTiltSensor && "· Neigungssensor aktiv"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-0.5 rounded-xl bg-raised p-1 text-xs sm:gap-1">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                title={p.label}
                aria-label={p.label}
                aria-pressed={preset === p.id}
                onClick={() => {
                  setPreset(p.id);
                  showStatus(p.status);
                }}
                className={cn(
                  "rounded-lg px-1.5 py-1 font-medium whitespace-nowrap transition-colors sm:px-2.5",
                  preset === p.id
                    ? "bg-surface font-semibold text-foreground shadow-xs"
                    : "text-muted hover:text-foreground"
                )}
              >
                <span aria-hidden="true">{p.icon}</span>
                <span className="hidden sm:inline"> {p.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              aria-label={soundEnabled ? "Audio stumm" : "Audio an"}
              className="grid size-8 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:text-foreground"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Auf dem Handy reicht das × oben — für einen dritten 48-px-Knopf ist die Leiste zu schmal */}
            <button
              type="button"
              onClick={restoreOrder}
              className="hidden h-8 items-center gap-1.5 rounded-lg bg-physics px-3 text-xs font-semibold text-on-physics shadow-md transition-all hover:bg-physics-strong hover:shadow-lg active:scale-95 sm:inline-flex"
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>2. Hauptsatz: Entropie umkehren</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
