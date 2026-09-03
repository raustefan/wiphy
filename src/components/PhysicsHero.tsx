// components/PhysicsHero.tsx
"use client";

import { useEffect, useRef } from "react";
import { useAppearance } from "@/components/AppThemeProvider";
import { paletteFor, rgba } from "@/lib/palette";
import { cappedDpr, createRenderLoop, isCompactViewport } from "@/lib/renderLoop";

/**
 * Gitterschwingungen (Phononen) als Hintergrundfeld.
 *
 * Die Atome sitzen auf einem quadratischen Gitter mit Konstante a und werden
 * von drei überlagerten Normalmoden ausgelenkt:
 *
 *   u(r, t) = Σ_i  A_i ê_i cos(k_i · r − ω_i t + φ_i)
 *
 * Die Frequenzen folgen dabei nicht willkürlich, sondern der Dispersions-
 * relation der linearen Kette mit nächster-Nachbar-Kopplung:
 *
 *   ω(k) = 2 √(K/m) · √( sin²(k_x a / 2) + sin²(k_y a / 2) )
 *
 * Kurzwellige Moden schwingen dadurch schneller als langwellige, und am Rand
 * der Brillouin-Zone (k = π/a) läuft die Gruppengeschwindigkeit gegen null —
 * genau das erzeugt das charakteristische Flirren im Bild.
 *
 * Der Zeiger regt zusätzlich ein lokales Wellenpaket an, das mit 1/r² abklingt.
 */

type Mode = {
  kx: number;
  ky: number;
  omega: number;
  phase: number;
  amp: number;
  /** Polarisationsrichtung ê (Einheitsvektor). */
  ex: number;
  ey: number;
};

/** Gitterkonstante a in Pixeln; auf schmalen Viewports weiter, das spart Atome. */
const LATTICE_SPACING_WIDE = 44;
const LATTICE_SPACING_COMPACT = 60;
/** √(K/m) — setzt die Zeitskala der Schwingung. */
const OMEGA_0 = 0.9;

export default function PhysicsHero() {
  const ref = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0, strength: 0 });
  const { appearance } = useAppearance();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = paletteFor(appearance);
    let spacing = isCompactViewport() ? LATTICE_SPACING_COMPACT : LATTICE_SPACING_WIDE;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let t = 0;

    let cols = 0;
    let rows = 0;
    let originX = 0;
    let originY = 0;

    // Drei Moden mit zufälligem k im ersten Brillouin-Zonen-Viertel.
    const modes: Mode[] = Array.from({ length: 3 }, (_, i) => {
      const kx = ((Math.random() * 0.8 + 0.15) * Math.PI) / LATTICE_SPACING_WIDE;
      const ky = ((Math.random() * 0.8 + 0.15) * Math.PI) / LATTICE_SPACING_WIDE;
      const omega =
        2 *
        OMEGA_0 *
        Math.hypot(
          Math.sin((kx * LATTICE_SPACING_WIDE) / 2),
          Math.sin((ky * LATTICE_SPACING_WIDE) / 2),
        );
      const angle = Math.random() * Math.PI * 2;
      return {
        kx,
        ky,
        omega,
        phase: Math.random() * Math.PI * 2,
        // Langwellige Moden tragen mehr Amplitude (∝ 1/ω, thermisches Gewicht).
        amp: (5.5 - i * 1.1) / (0.6 + omega),
        ex: Math.cos(angle),
        ey: Math.sin(angle),
      };
    });

    const resize = () => {
      dpr = cappedDpr();
      spacing = isCompactViewport() ? LATTICE_SPACING_COMPACT : LATTICE_SPACING_WIDE;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / spacing) + 2;
      rows = Math.ceil(h / spacing) + 2;
      originX = (w - (cols - 1) * spacing) / 2;
      originY = (h - (rows - 1) * spacing) / 2;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      loop.redraw();
    });
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
      pointer.current.strength = 1;
    };
    const onLeave = () => {
      pointer.current.strength = 0;
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    // Auslenkung u(r, t) eines Gitterplatzes.
    const displace = (x0: number, y0: number, out: { x: number; y: number }) => {
      let ux = 0;
      let uy = 0;
      for (const m of modes) {
        const arg = m.kx * x0 + m.ky * y0 - m.omega * t + m.phase;
        const s = Math.cos(arg) * m.amp;
        ux += s * m.ex;
        uy += s * m.ey;
      }

      // Lokales Wellenpaket um den Zeiger: radiale Auslenkung ∝ sin(kr − ωt)/(1 + r²).
      if (pointer.current.strength > 0.01) {
        const dx = x0 - pointer.current.x;
        const dy = y0 - pointer.current.y;
        const r = Math.hypot(dx, dy) + 1e-3;
        const envelope = 1 / (1 + (r / 90) ** 2);
        const wave = Math.sin(r * 0.055 - t * 2.2) * 16 * envelope * pointer.current.strength;
        ux += (dx / r) * wave;
        uy += (dy / r) * wave;
      }

      out.x = ux;
      out.y = uy;
    };

    const draw = ({ reducedMotion }: { reducedMotion: boolean }) => {
      // Bei reduzierter Bewegung bleibt die Zeit stehen: ein statisches Bild.
      if (!reducedMotion) {
        t += 0.011;
        pointer.current.strength *= 0.985;
      }
      ctx.clearRect(0, 0, w, h);

      // Alle Positionen einmal berechnen, danach Bindungen und Atome zeichnen.
      const px = new Float32Array(cols * rows);
      const py = new Float32Array(cols * rows);
      const amp = new Float32Array(cols * rows);
      const u = { x: 0, y: 0 };

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x0 = originX + i * spacing;
          const y0 = originY + j * spacing;
          displace(x0, y0, u);
          const idx = j * cols + i;
          px[idx] = x0 + u.x;
          py[idx] = y0 + u.y;
          amp[idx] = Math.hypot(u.x, u.y);
        }
      }

      // Bindungen: Deckkraft folgt der Dehnung |Δu| gegenüber der Ruhelage.
      ctx.lineWidth = 1;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i;
          for (const [di, dj] of [
            [1, 0],
            [0, 1],
          ] as const) {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= cols || nj >= rows) continue;
            const nIdx = nj * cols + ni;
            const d = Math.hypot(px[nIdx] - px[idx], py[nIdx] - py[idx]);
            const strain = (d - spacing) / spacing;
            const a = Math.min(0.5, Math.abs(strain) * 1.5 + 0.06);
            // Dehnung teal, Stauchung ruby — das Feld zeigt seine eigene Spannung.
            ctx.strokeStyle = rgba(strain > 0 ? colors.physics : colors.market, a);
            ctx.beginPath();
            ctx.moveTo(px[idx], py[idx]);
            ctx.lineTo(px[nIdx], py[nIdx]);
            ctx.stroke();
          }
        }
      }

      // Atome.
      for (let idx = 0; idx < px.length; idx++) {
        const a = Math.min(1, 0.25 + amp[idx] / 14);
        const r = 1.1 + Math.min(2.2, amp[idx] / 7);
        ctx.beginPath();
        ctx.arc(px[idx], py[idx], r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(colors.physics, a * 0.8);
        ctx.fill();
      }
    };

    const loop = createRenderLoop(canvas, draw);

    return () => {
      loop.stop();
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [appearance]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        opacity: 0.85,
      }}
    />
  );
}
