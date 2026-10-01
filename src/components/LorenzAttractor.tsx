"use client";

import { useEffect, useRef } from "react";
import { useAppearance } from "@/components/AppThemeProvider";
import { paletteFor, rgba } from "@/lib/palette";
import { cappedDpr, createRenderLoop } from "@/lib/renderLoop";

/**
 * Lorenz-Attraktor als Hintergrund der Fehlerseiten — deterministisches Chaos,
 * passend zu einer Seite, auf der etwas Unvorhergesehenes passiert ist.
 *
 *   ẋ = σ (y − x),   ẏ = x (ρ − z) − y,   ż = x y − β z
 *
 * mit den klassischen Werten σ = 10, ρ = 28, β = 8/3. Zwei Bahnen starten nur
 * 10⁻³ voneinander entfernt und laufen nach wenigen Umläufen sichtbar
 * auseinander (Schmetterlingseffekt). Integriert wird mit RK4; die Ansicht
 * dreht sich langsam um die z-Achse und blickt leicht von oben.
 */

const SIGMA = 10;
const RHO = 28;
const BETA = 8 / 3;
const DT = 0.005;
const STEPS_PER_FRAME = 3;
/** Länge der sichtbaren Spur in Integrationsschritten. */
const TRAIL = 3000;
/** Die Spur wird in Abschnitten gezeichnet, jeder mit eigener Deckkraft. */
const CHUNKS = 24;
/** Kamera leicht von oben, sonst wirkt der Attraktor flach. */
const TILT = 0.45;

type Vec = [number, number, number];

const deriv = ([x, y, z]: Vec): Vec => [SIGMA * (y - x), x * (RHO - z) - y, x * y - BETA * z];

function rk4(p: Vec): Vec {
  const add = (a: Vec, b: Vec, s: number): Vec => [a[0] + b[0] * s, a[1] + b[1] * s, a[2] + b[2] * s];
  const k1 = deriv(p);
  const k2 = deriv(add(p, k1, DT / 2));
  const k3 = deriv(add(p, k2, DT / 2));
  const k4 = deriv(add(p, k3, DT));
  return [0, 1, 2].map((i) => p[i] + (DT / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])) as Vec;
}

export default function LorenzAttractor() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { appearance } = useAppearance();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = paletteFor(appearance);
    let w = 0;
    let h = 0;
    let angle = 0;

    const start: Vec = [Math.random() * 2 - 1, Math.random() * 2 - 1, 20];
    const orbits = [
      { color: colors.physics, p: start, trail: [] as Vec[] },
      { color: colors.market, p: [start[0] + 1e-3, start[1], start[2]] as Vec, trail: [] as Vec[] },
    ];
    // Vorlauf, damit beim ersten Bild schon eine volle Spur auf dem Attraktor liegt.
    for (const o of orbits) {
      for (let i = 0; i < TRAIL; i++) {
        o.p = rk4(o.p);
        o.trail.push(o.p);
      }
    }

    const resize = () => {
      const dpr = cappedDpr();
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      loop.redraw();
    });
    ro.observe(canvas);

    const draw = ({ reducedMotion }: { reducedMotion: boolean }) => {
      if (!reducedMotion) {
        angle += 0.0015;
        for (const o of orbits) {
          for (let i = 0; i < STEPS_PER_FRAME; i++) {
            o.p = rk4(o.p);
            o.trail.push(o.p);
          }
          o.trail.splice(0, o.trail.length - TRAIL);
        }
      }

      ctx.clearRect(0, 0, w, h);
      // Attraktor spannt grob x ∈ [−20, 20], z ∈ [0, 50] auf.
      const scale = Math.min(w / 50, h / 50);
      const cx = w / 2;
      const cy = h / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const tc = Math.cos(TILT);
      const ts = Math.sin(TILT);
      const project = ([x, y, z]: Vec) => [
        cx + (x * cos - y * sin) * scale,
        cy - ((z - 25) * tc + (x * sin + y * cos) * ts) * scale,
      ];

      ctx.lineWidth = 1.2;
      ctx.lineJoin = "round";
      for (const o of orbits) {
        const size = Math.ceil(o.trail.length / CHUNKS);
        for (let c = 0; c < CHUNKS; c++) {
          const from = c * size;
          const to = Math.min(o.trail.length, from + size + 1);
          if (to - from < 2) continue;
          ctx.strokeStyle = rgba(o.color, 0.08 + 0.7 * ((c + 1) / CHUNKS) ** 2);
          ctx.beginPath();
          for (let i = from; i < to; i++) {
            const [px, py] = project(o.trail[i]);
            if (i === from) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
        const [hx, hy] = project(o.p);
        ctx.fillStyle = rgba(o.color, 0.9);
        ctx.beginPath();
        ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = createRenderLoop(canvas, draw, { fps: 60 });

    return () => {
      loop.stop();
      ro.disconnect();
    };
  }, [appearance]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 block size-full opacity-80"
    />
  );
}
