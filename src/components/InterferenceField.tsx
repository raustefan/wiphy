"use client";

import { useEffect, useRef } from "react";
import { useAppearance } from "@/components/AppThemeProvider";
import { paletteFor, rgba } from "@/lib/palette";
import { cappedDpr, createRenderLoop, isCompactViewport } from "@/lib/renderLoop";

/**
 * Zwei Kreiswellen gleicher Frequenz, gezeichnet als Halbtonraster.
 *
 *   ψ(r, t) = Σ_i  cos(k·r_i − ωt) / √(1 + 3r_i / λ)
 *
 * Die Punktgröße folgt der Hüllkurve |Ψ| (zeitlich konstant), pulsiert aber
 * mit der Phase mit; die Farbe zeigt das Vorzeichen der momentanen
 * Auslenkung — Wellenberge Teal, Wellentäler Ruby. Wo Berg auf Tal trifft,
 * bleibt das Raster leer: die Knotenlinien sind Hyperbeln um die beiden
 * Quellen, und ihre Zahl hängt nur am Abstand d der Quellen: 2·⌊d/λ + ½⌋.
 *
 * S₂ folgt dem Zeiger über eine gedämpfte Feder (leicht unterkritisch, sie
 * schwingt also kurz nach). Steht der Zeiger auf einem Element mit
 * `data-observer` — dem Text neben der Abbildung —, bremst die Zeit fast bis
 * zum Stillstand: wer liest, wird nicht vom Flimmern abgelenkt.
 */

const LAMBDA = 72; // Wellenlänge in px — ≥ 8 Rasterpunkte pro Welle, sonst Aliasing
const K = (2 * Math.PI) / LAMBDA;
const OMEGA = 2 * Math.PI * 0.45; // rad/s
const LEVELS = 5;
const SPRING = 22; // Federkonstante (1/s²)
const DAMPING = 2 * Math.sqrt(SPRING) * 0.6;

export default function InterferenceField({
  readoutId,
}: {
  /** Element, in das der Quellenabstand geschrieben wird (ohne Re-Render). */
  readoutId?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { appearance } = useAppearance();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = paletteFor(appearance);
    const serif =
      getComputedStyle(document.documentElement).getPropertyValue("--font-stix").trim() || "serif";
    const readout = readoutId ? document.getElementById(readoutId) : null;

    let w = 0;
    let h = 0;
    let spacing = 12;
    const s1 = { x: 0, y: 0 };
    const s2 = { x: 0, y: 0, vx: 0, vy: 0 };
    const target = { x: 0, y: 0, active: false };
    let observed = 0;
    let observedTarget = 0;
    let phase = 0;
    let last = performance.now();
    let lastReadout = "";

    const resize = () => {
      const dpr = cappedDpr();
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spacing = isCompactViewport() ? 9 : 10;
      s1.x = w * 0.26;
      s1.y = h * 0.66;
      if (!s2.x) {
        s2.x = w * 0.68;
        s2.y = h * 0.36;
      }
    };

    const draw = ({ reducedMotion, now }: { reducedMotion: boolean; now: number }) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      const t = now / 1000;

      // Ohne Zeiger zieht S₂ eine langsame Lissajous-Bahn.
      const tx = target.active ? target.x : w * (0.7 + 0.08 * Math.sin(0.21 * t));
      const ty = target.active ? target.y : h * (0.34 + 0.12 * Math.sin(0.29 * t + 1));

      if (reducedMotion) {
        s2.x = tx;
        s2.y = ty;
      } else {
        s2.vx += (SPRING * (tx - s2.x) - DAMPING * s2.vx) * dt;
        s2.vy += (SPRING * (ty - s2.y) - DAMPING * s2.vy) * dt;
        s2.x += s2.vx * dt;
        s2.y += s2.vy * dt;
        observed += (observedTarget - observed) * Math.min(1, dt * 3);
        phase += dt * OMEGA * (1 - 0.94 * observed);
      }

      ctx.clearRect(0, 0, w, h);

      const maxR = spacing * 0.4;
      const crest: Path2D[] = [];
      const trough: Path2D[] = [];
      for (let l = 0; l < LEVELS; l++) {
        crest.push(new Path2D());
        trough.push(new Path2D());
      }

      const half = spacing / 2;
      const cosPhase = Math.cos(phase);
      const sinPhase = Math.sin(phase);
      for (let y = half; y < h; y += spacing) {
        for (let x = half; x < w; x += spacing) {
          const r1 = Math.hypot(x - s1.x, y - s1.y);
          const r2 = Math.hypot(x - s2.x, y - s2.y);
          const a1 = 1 / Math.sqrt(1 + (3 * r1) / LAMBDA);
          const a2 = 1 / Math.sqrt(1 + (3 * r2) / LAMBDA);
          // Komplexe Amplitude Ψ = Σ a_i·e^{ik r_i}; Momentanwert Re(Ψ·e^{−iωt}).
          const re = a1 * Math.cos(K * r1) + a2 * Math.cos(K * r2);
          const im = a1 * Math.sin(K * r1) + a2 * Math.sin(K * r2);
          const envelope = Math.min(1, Math.hypot(re, im) * 1.3);
          if (envelope < 0.14) continue;
          const inst = re * cosPhase + im * sinPhase;
          const swing = Math.abs(inst) / (Math.hypot(re, im) || 1);
          const mag = envelope * (0.3 + 0.7 * swing);
          const v = inst >= 0 ? mag : -mag;
          const level = Math.min(LEVELS - 1, Math.floor(mag * LEVELS));
          const r = 0.6 + ((level + 1) / LEVELS) * (maxR - 0.6);
          const path = v > 0 ? crest[level] : trough[level];
          path.moveTo(x + r, y);
          path.arc(x, y, r, 0, Math.PI * 2);
        }
      }

      // Auf hellem Grund kräftiger, auf dunklem (wo dieselben Werte leuchten) leiser.
      const gain = appearance === "dark" ? 0.8 : 1.2;
      for (let l = 0; l < LEVELS; l++) {
        const alpha = gain * (0.1 + (0.6 * (l + 1)) / LEVELS);
        ctx.fillStyle = rgba(colors.physics, alpha);
        ctx.fill(crest[l]);
        ctx.fillStyle = rgba(colors.market, alpha * 0.85);
        ctx.fill(trough[l]);
      }

      // Die Quellen: Fadenkreuz und Beschriftung wie in einer Skizze.
      ctx.lineWidth = 1;
      ctx.font = `italic 16px ${serif}`;
      for (const [s, label] of [
        [s1, "S₁"],
        [s2, "S₂"],
      ] as const) {
        ctx.strokeStyle = rgba(colors.ink, 0.85);
        ctx.fillStyle = rgba(colors.surface, 1);
        ctx.beginPath();
        ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s.x - 11, s.y);
        ctx.lineTo(s.x - 7, s.y);
        ctx.moveTo(s.x + 7, s.y);
        ctx.lineTo(s.x + 11, s.y);
        ctx.moveTo(s.x, s.y - 11);
        ctx.lineTo(s.x, s.y - 7);
        ctx.moveTo(s.x, s.y + 7);
        ctx.lineTo(s.x, s.y + 11);
        ctx.stroke();
        ctx.fillStyle = rgba(colors.ink, 0.9);
        ctx.fillText(label, s.x + 10, s.y - 10);
      }

      if (readout) {
        const d = Math.hypot(s2.x - s1.x, s2.y - s1.y) / LAMBDA;
        const nodes = 2 * Math.floor(d + 0.5);
        const text = `d = ${d.toFixed(1).replace(".", ",")} λ, ${nodes} Knotenlinien`;
        if (text !== lastReadout) {
          readout.textContent = text;
          lastReadout = text;
        }
      }
    };

    resize();
    const loop = createRenderLoop(canvas, draw, { fps: 40 });
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const ro = new ResizeObserver(() => {
      resize();
      loop.redraw();
    });
    ro.observe(canvas);

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      target.active = inside;
      if (inside) {
        target.x = x;
        target.y = y;
      }
      const el = event.target instanceof Element ? event.target : null;
      observedTarget = el?.closest("[data-observer]") ? 1 : 0;
      // Ohne laufende Schleife (reduzierte Bewegung) springt S₂ direkt.
      if (motion.matches && inside) loop.redraw();
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });

    return () => {
      loop.stop();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [appearance, readoutId]);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 block size-full touch-pan-y" />;
}
