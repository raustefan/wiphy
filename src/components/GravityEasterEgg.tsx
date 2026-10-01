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
import { distanceToBody, massFromArea, stepBodies, wake, type Body, type Field } from "@/lib/gravityPhysics";

type GravityPreset = "earth" | "blackhole";

const PRESETS: { id: GravityPreset; icon: string; label: string; status: string; gy: number }[] = [
  { id: "earth", icon: "🌍", label: "Erde (1g)", status: "Erdschwerefeld: g = 9.81 m/s²", gy: 1200 },
  { id: "blackhole", icon: "🕳️", label: "Singulär", status: "Singularität: Ein Schwarzes Loch entsteht", gy: 0 },
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
  /** Hinter dem Ereignishorizont — keine Physik mehr, bis das Loch verdampft. */
  absorbed?: boolean;
  /** Die Verschluck-Animation. Selbst gemerkt: Chrome listet sie nach dem Ende nicht mehr in `getAnimations()`, sie wirkt aber weiter. */
  swallowing?: Animation;
}

/** Schwarzes Loch in Bildschirmkoordinaten (das Overlay ist `fixed`). */
type Hole = { x: number; y: number; r: number; mass: number; bornAt: number; collapsed: boolean };

/** Kantenlänge der Loch-Grafik in px; skaliert wird auf den aktuellen Radius. */
const HOLE_SIZE = 200;
/** Spätestens dann verschluckt das Loch den ganzen Bildschirm (ms). */
const HOLE_COLLAPSE_AFTER = 7000;

/** Holt eine verschluckte Kachel sichtbar an ihre letzte Physik-Position zurück. */
function release(b: PhysicsBody) {
  b.swallowing?.cancel();
  b.swallowing = undefined;
  b.absorbed = false;
  b.el.style.opacity = "";
  if (!b.offscreen) b.el.style.visibility = "";
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
  /** Zähler direkt ins DOM — ein React-Render pro Stoß-Bild ließ die Animation ruckeln. */
  const collisionsRef = useRef(0);
  const collisionElRef = useRef<HTMLSpanElement>(null);
  const [hasTiltSensor, setHasTiltSensor] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const bodiesRef = useRef<PhysicsBody[]>([]);
  const restoreTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioFxRef = useRef<WebAudioFx>(new WebAudioFx());
  /** Zeiger bzw. Finger in Bildschirmkoordinaten — das Loch folgt ihm träge. */
  const pointerRef = useRef({ x: 0, y: 0 });
  const holeRef = useRef<Hole | null>(null);
  const holeElRef = useRef<HTMLDivElement>(null);
  const holeSizeRef = useRef<HTMLDivElement>(null);
  const holeFxRef = useRef<HTMLDivElement>(null);
  /** Neue id = frische DOM-Knoten = Geburtsanimation läuft neu. */
  const [holeId, setHoleId] = useState<number | null>(null);
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
      release(b);
      b.el.style.cssText = b.savedCss;
    });
    document.body.style.minHeight = "";
    document.documentElement.style.overflow = "";
    delete document.documentElement.dataset.gravityActive;
    bodiesRef.current = [];
    holeRef.current = null;
    setHoleId(null);
    setPreset("earth");
    setIsActive(false);
  }, []);

  /*
   * Das Loch verdampft (Hawking-Strahlung): Overlay blendet aus. Mit `reemit`
   * spuckt es alles Verschluckte in zufällige Richtungen wieder aus — sonst
   * (Esc) fliegen die Kacheln ohnehin gleich an ihren Platz zurück.
   */
  const dissolveHole = useCallback((reemit: boolean) => {
    const hole = holeRef.current;
    if (!hole) return;
    holeRef.current = null;

    bodiesRef.current.forEach((b) => {
      if (!b.absorbed) return;
      release(b);
      if (!reemit) return;
      const dir = Math.random() * Math.PI * 2;
      const speed = 500 + Math.random() * 700;
      b.x = hole.x + window.scrollX - b.w / 2 + Math.cos(dir) * 30;
      b.y = hole.y + window.scrollY - b.h / 2 + Math.sin(dir) * 30;
      b.vx = Math.cos(dir) * speed;
      b.vy = Math.sin(dir) * speed;
      b.vAngle = (Math.random() - 0.5) * 12;
      wake(b);
      place(b);
    });

    const id = holeId;
    const fade = holeElRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, easing: "ease-out", fill: "forwards" });
    if (fade) fade.onfinish = () => setHoleId((current) => (current === id ? null : current));
    else setHoleId(null);
  }, [holeId]);

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
    // Schwebende Hinweise der Seite (z. B. InstallHint) räumen damit die Bühne
    document.documentElement.dataset.gravityActive = "";
    collisionsRef.current = 0;
    setIsActive(true);
  }, [isActive, showStatus]);

  /* Umkehrung der Entropie / 2. Hauptsatz der Thermodynamik (Reset / Schließen) */
  const restoreOrder = useCallback(() => {
    if (restoreTimerRef.current) return; // läuft schon
    audioFxRef.current.playRewind();
    showStatus("2. Hauptsatz der Thermodynamik: Entropie umgekehrt! ↺");

    dissolveHole(false);
    bodiesRef.current.forEach((b) => {
      b.dragging = false;
      release(b); // verschluckte Kacheln kommen vom Loch aus zurückgeflogen
      b.el.style.transition = "transform 0.75s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.75s ease";
      b.el.style.boxShadow = "";
      place(b, b.homeX, b.homeY, 0);
    });
    // Gesetzter Timer hält Physik und Ziehen an, damit nichts die Transition überschreibt
    restoreTimerRef.current = setTimeout(cleanupImmediate, 800);
  }, [showStatus, cleanupImmediate, dissolveHole]);

  const selectPreset = (id: GravityPreset) => {
    if (id === preset) return;
    if (preset === "blackhole") {
      dissolveHole(true);
      audioFxRef.current.playRewind();
    }
    if (id === "blackhole") {
      // Geburt in der Bildmitte, nicht unter dem Knopf in der Leiste; von dort folgt es dem Zeiger
      const x = window.innerWidth / 2;
      const y = window.innerHeight * 0.42;
      holeRef.current = { x, y, r: 0, mass: 0, bornAt: performance.now(), collapsed: false };
      pointerRef.current = { x, y };
      setHoleId(Date.now());
      audioFxRef.current.playCollapse();
    }
    setPreset(id);
    showStatus(id !== "blackhole" && preset === "blackhole" ? "Hawking-Strahlung: Das Schwarze Loch verdampft" : PRESETS.find((p) => p.id === id)!.status);
  };

  // ESC bricht ab; "gravity" tippen startet
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
      if (keyBuffer.endsWith("gravity")) {
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
      const target = e.target as HTMLElement;
      if (restoreTimerRef.current || target.closest("[data-gravity-ignore]")) return;
      // Touch kennt kein Hover: das Loch zieht dorthin, wo der Finger aufsetzt
      pointerRef.current = { x: e.clientX, y: e.clientY };
      const body = bodiesRef.current.find((b) => !b.offscreen && !b.absorbed && b.el.contains(target));
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
      // Auf dem Weg zur Leiste soll das Loch nicht mitwandern
      if (!(e.target as HTMLElement).closest?.("[data-gravity-ignore]")) pointerRef.current = { x: e.clientX, y: e.clientY };
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
    bodiesRef.current.forEach(wake); // neues Schwerefeld
    let last = performance.now();
    let frame = requestAnimationFrame(function step(time) {
      const dt = Math.min(0.04, (time - last) / 1000);
      last = time;
      frame = requestAnimationFrame(step);
      if (restoreTimerRef.current) return;

      const hole = preset === "blackhole" ? holeRef.current : null;
      if (hole && !hole.collapsed) moveHole(hole, dt);
      const attractor = hole && { x: hole.x + window.scrollX, y: hole.y + window.scrollY };
      const field: Field = attractor
        ? { attractor }
        : hasTiltSensor && preset === "earth"
          ? tiltRef.current
          : { gx: 0, gy };
      // Jedes Bild frisch aus dem Ref: nach dem Aufräumen ist er sofort leer, die Schleife
      // endet aber erst mit dem nächsten Render — sonst schriebe ein letzter Frame die eben
      // zurückgesetzten Kacheln wieder verschoben zurück.
      const live = bodiesRef.current.filter((b) => !b.offscreen && !b.absorbed);

      // Breite ohne Scrollleiste. Touch: Kiste = Bildschirm über der Leiste; sonst die ganze Seite.
      const bounds = screenOnlyRef.current
        ? {
            top: window.scrollY,
            bottom: window.scrollY + window.innerHeight - (hudRef.current?.offsetHeight ?? 0),
            width: document.documentElement.clientWidth,
          }
        : { top: 0, bottom: parseFloat(document.body.style.minHeight) - 15, width: document.documentElement.clientWidth };
      const impacts = stepBodies(live, field, bounds, dt);
      live.forEach((b) => b.sleeping || place(b));
      if (hole && attractor) swallow(hole, attractor, live, time);

      // Gezählt wird alles, hörbar nur, was man auch sieht
      const top = window.scrollY - 100;
      const bottom = window.scrollY + window.innerHeight + 100;
      // Höchstens drei Töne pro Bild — prallt ein ganzer Haufen, klänge jeder weitere Oszillator nur nach Rauschen
      impacts
        .filter(({ body }) => body.y + body.h >= top && body.y <= bottom)
        .sort((p, q) => q.speed - p.speed)
        .slice(0, 3)
        .forEach(({ body, speed }) => audioFxRef.current.playThud(speed / 1200, body.mass));
      if (impacts.length && collisionElRef.current) {
        collisionsRef.current += impacts.length;
        collisionElRef.current.textContent = String(collisionsRef.current);
      }
    });

    /* Träge dem Zeiger nach; der Radius wächst mit der verschluckten Masse */
    function moveHole(hole: Hole, dt: number) {
      const follow = 1 - Math.exp(-dt * 3);
      hole.x += (pointerRef.current.x - hole.x) * follow;
      hole.y += (pointerRef.current.y - hole.y) * follow;
      const targetR = 26 + 7 * Math.sqrt(hole.mass);
      hole.r += (targetR - hole.r) * (1 - Math.exp(-dt * 5));
      if (holeElRef.current) holeElRef.current.style.transform = `translate3d(${hole.x.toFixed(1)}px, ${hole.y.toFixed(1)}px, 0)`;
      if (holeSizeRef.current) holeSizeRef.current.style.transform = `scale(${(hole.r / (HOLE_SIZE / 2)).toFixed(3)})`;
    }

    function swallow(hole: Hole, at: { x: number; y: number }, live: PhysicsBody[], time: number) {
      if (hole.collapsed) return;
      for (const b of live) {
        if (b.dragging || distanceToBody(b, at) > hole.r * 0.9) continue;
        b.absorbed = true;
        hole.mass += b.mass;
        audioFxRef.current.playThud(0.9, b.mass * 3);
        // Spiralig hinein: zur Mitte, dabei drehen, schrumpfen, verglühen
        const anim = b.el.animate(
          [
            { transform: b.el.style.transform, opacity: 1, filter: "none" },
            {
              transform: `translate3d(${(at.x - b.originX - b.w / 2).toFixed(1)}px, ${(at.y - b.originY - b.h / 2).toFixed(1)}px, 0) rotate(${(b.angle + 9).toFixed(2)}rad) scale(0.02)`,
              opacity: 0,
              filter: "blur(4px) brightness(0.4)",
            },
          ],
          { duration: 900, easing: "cubic-bezier(0.55, 0, 0.85, 0.35)" },
        );
        b.swallowing = anim;
        // Danach weg — ausdrücklich, statt auf ein stehenbleibendes Animationsende zu bauen
        anim.onfinish = () => {
          if (b.swallowing === anim) b.el.style.opacity = "0";
        };
      }

      const age = time - hole.bornAt;
      const anyLeft = live.some((b) => !b.absorbed);
      if (age < 1500 || (anyLeft && age < HOLE_COLLAPSE_AFTER)) return;

      // Alles verschluckt (oder Geduld am Ende): der Ereignishorizont wächst über den ganzen Bildschirm
      hole.collapsed = true;
      live.forEach((b) => (b.absorbed = true));
      const farthest = Math.max(
        ...[
          [0, 0],
          [window.innerWidth, 0],
          [0, window.innerHeight],
          [window.innerWidth, window.innerHeight],
        ].map(([x, y]) => Math.hypot(x - hole.x, y - hole.y)),
      );
      // Scheibe und Leuchten verglühen, sonst bleiben riesige orange Schlieren statt Schwarz
      holeFxRef.current?.querySelectorAll("[data-glow]").forEach((el) =>
        el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1100, easing: "ease-in", fill: "forwards" }),
      );
      holeFxRef.current?.animate([{ transform: "scale(1)" }, { transform: `scale(${((farthest / hole.r) * 1.1).toFixed(2)})` }], {
        duration: 1800,
        easing: "cubic-bezier(0.7, 0, 0.2, 1)",
        fill: "forwards",
      });
      audioFxRef.current.playCollapse();
      showStatus("Ereignishorizont überschritten — hier entkommt nicht einmal Licht");
    }

    return () => cancelAnimationFrame(frame);
  }, [isActive, preset, hasTiltSensor, showStatus]);

  if (!isActive) return null;

  return (
    <>
      {holeId !== null && (
        <div
          key={holeId}
          ref={holeElRef}
          aria-hidden="true"
          // Über Kacheln, Kopfzeile und Daumenleiste (z-40), unter der Gravity-Bedienung (z-50)
          className="pointer-events-none fixed top-0 left-0 z-[45]"
          style={{ transform: `translate3d(${holeRef.current?.x ?? 0}px, ${holeRef.current?.y ?? 0}px, 0)` }}
        >
          <div
            ref={holeSizeRef}
            className="absolute will-change-transform"
            style={{ width: HOLE_SIZE, height: HOLE_SIZE, left: -HOLE_SIZE / 2, top: -HOLE_SIZE / 2, transform: "scale(0)" }}
          >
            <BlackHoleGraphic fxRef={holeFxRef} />
          </div>
        </div>
      )}

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
                <span ref={collisionElRef}>{collisionsRef.current}</span> Stöße {hasTiltSensor && "· Neigungssensor aktiv"}
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
                onClick={() => selectPreset(p.id)}
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

/*
 * Schwarzes Loch im Stil von „Gargantua“ (Interstellar): schwarzer Schatten mit
 * dünnem Photonenring, davor fast von der Kante gesehen die Akkretionsscheibe
 * (die vordere Hälfte läuft über den Schatten). Die Rückseite der Scheibe wird
 * vom Loch umgelenkt und erscheint als Lichtbogen über und unter dem Schatten.
 * Die auf uns zu rotierende Seite ist heller (Doppler-Effekt).
 * Nur Gradienten und eine Rotation — kein `filter`, damit der Compositor alles trägt.
 */
function BlackHoleGraphic({ fxRef }: { fxRef: React.RefObject<HTMLDivElement | null> }) {
  // Farbe nach Temperatur: innen weißglühend, außen rot. Schlieren zeigen die Drehung.
  const disk = (
    <div
      className="absolute inset-0 animate-spin rounded-full"
      style={{
        animationDuration: "7s",
        background:
          "repeating-conic-gradient(rgba(70,15,0,0.35) 0deg 3deg, transparent 3deg 8deg, rgba(255,255,255,0.14) 8deg 10deg, transparent 10deg 15deg), radial-gradient(closest-side, #fffaf0 48%, #ffe0a0 54%, #ffa040 66%, #d9461a 80%, #5a1200 100%)",
        mask: "radial-gradient(closest-side, transparent 46%, #000 50%, #000 70%, transparent 100%)",
      }}
    />
  );
  // Flach geneigt; links (auf uns zu) hell, rechts gedämpft. Der Container muss so groß wie die
  // Scheibe sein — eine Maske schneidet alles außerhalb ihres Elements ab.
  const tilt = {
    transform: "rotate(-10deg) scaleY(0.2)",
    maskImage: "linear-gradient(90deg, #000 15%, rgba(0,0,0,0.3))",
  };

  return (
    <div
      ref={(el) => {
        fxRef.current = el;
        if (!el) return;
        el.animate(
          [
            { transform: "scale(0)", filter: "brightness(6)" },
            { transform: "scale(1.35)", filter: "brightness(2)", offset: 0.55 },
            { transform: "scale(1)", filter: "brightness(1)" },
          ],
          { duration: 1100, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
        );
        el.querySelector("[data-shockwave]")?.animate(
          [
            { transform: "scale(0.3)", opacity: 0.9 },
            { transform: "scale(6)", opacity: 0 },
          ],
          { duration: 1200, easing: "cubic-bezier(0.1, 0.7, 0.3, 1)", fill: "forwards" },
        );
      }}
      className="relative size-full"
    >
      <div
        data-glow
        className="absolute -inset-[90%] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,150,70,0.25), rgba(255,90,40,0.08) 50%, transparent 75%)" }}
      />
      <div data-glow className="absolute -inset-[75%]" style={tilt}>
        {disk}
      </div>
      {/* Gelinste Rückseite der Scheibe: Lichtbogen knapp außerhalb des Schattens */}
      <div
        data-glow
        className="absolute -inset-[24%] rounded-full"
        style={{
          transform: "rotate(-10deg)",
          background:
            "radial-gradient(closest-side, transparent 79%, rgba(255,246,228,0.95) 81%, rgba(255,170,80,0.6) 85%, rgba(220,80,30,0.15) 91%, transparent 97%)",
          maskImage: "linear-gradient(90deg, #000 10%, rgba(0,0,0,0.35))",
        }}
      />
      <div
        className="absolute inset-0 rounded-full bg-black"
        style={{ boxShadow: "0 0 0 1px rgba(255,244,220,0.9), 0 0 8px 1px rgba(255,190,110,0.6)" }}
      />
      {/* Vordere Hälfte der Scheibe verdeckt den Schatten */}
      <div data-glow className="absolute -inset-[75%]" style={{ ...tilt, clipPath: "inset(50% -100% -100% -100%)" }}>
        {disk}
      </div>
      <div data-shockwave className="absolute inset-0 rounded-full border-2 border-white/80 opacity-0" />
    </div>
  );
}
