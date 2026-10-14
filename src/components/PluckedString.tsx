"use client";

import { useEffect, useRef } from "react";

/**
 * Eine gespannte Saite als Trennlinie. Wer mit dem Zeiger hindurchfährt,
 * zupft sie an genau dieser Stelle an.
 *
 * Die Auslenkung ist eine Summe der Eigenmoden einer beidseitig
 * eingespannten Saite:
 *
 *   y(x, t) = Σ a_n(t) · sin(nπx),   ä_n = −ω_n² a_n − 2γ_n ȧ_n,   ω_n = n·ω_1
 *
 * Ein Zupfen bei x₀ = p mit Höhe A ist ein Dreieck; seine Fourier-
 * Koeffizienten sind b_n = 2A·sin(nπp) / (n²π²·p(1−p)). Höhere Moden klingen
 * schneller ab — deshalb wird aus dem spitzen Knick nach kurzer Zeit eine
 * weiche Grundschwingung, genau wie bei einer echten Saite.
 */

const MODES = 8;
const OMEGA_1 = 8; // rad/s — die Grundschwingung, bewusst träge
const HEIGHT = 40;
const MID = HEIGHT / 2;
const POINTS = 96;
const STEP = 1 / 120; // feste Teilschritte halten die Integration stabil

export default function PluckedString() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const a = new Float64Array(MODES + 1);
    const v = new Float64Array(MODES + 1);
    let raf = 0;
    let last = 0;
    let lastY: number | null = null;
    let lastT = 0;

    const draw = () => {
      let d = "";
      for (let i = 0; i <= POINTS; i++) {
        const x = i / POINTS;
        let y = MID;
        for (let n = 1; n <= MODES; n++) y += a[n] * Math.sin(n * Math.PI * x);
        d += `${i === 0 ? "M" : "L"}${(x * 1000).toFixed(1)} ${y.toFixed(2)}`;
      }
      path.setAttribute("d", d);
    };

    const tick = (now: number) => {
      let dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      let energy = 0;
      while (dt > 0) {
        const h = Math.min(STEP, dt);
        dt -= h;
        for (let n = 1; n <= MODES; n++) {
          const w = n * OMEGA_1;
          const gamma = 0.9 + 0.35 * n;
          v[n] += (-w * w * a[n] - 2 * gamma * v[n]) * h;
          a[n] += v[n] * h;
        }
      }
      for (let n = 1; n <= MODES; n++) energy += a[n] * a[n] + (v[n] * v[n]) / (n * OMEGA_1) ** 2;
      draw();
      raf = energy > 1e-4 ? requestAnimationFrame(tick) : 0;
      if (!raf) {
        a.fill(0);
        v.fill(0);
        draw();
      }
    };

    const pluck = (p: number, amp: number) => {
      p = Math.min(0.97, Math.max(0.03, p));
      for (let n = 1; n <= MODES; n++) {
        a[n] += (2 * amp * Math.sin(n * Math.PI * p)) / (n * n * Math.PI * Math.PI * p * (1 - p));
      }
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (motion.matches) return;
      const rect = svg.getBoundingClientRect();
      const y = event.clientY - rect.top - rect.height / 2;
      const now = event.timeStamp;
      // Gezupft wird beim Durchqueren der Ruhelage — nicht beim bloßen Darüberfahren.
      if (lastY !== null && now - lastT < 120 && Math.sign(y) !== Math.sign(lastY)) {
        const speed = Math.abs(y - lastY);
        pluck((event.clientX - rect.left) / rect.width, Math.sign(lastY) * Math.min(14, 5 + speed * 0.6));
      }
      lastY = y;
      lastT = now;
    };
    const onLeave = () => {
      lastY = null;
    };

    draw();
    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="decor relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 1000 ${HEIGHT}`}
        preserveAspectRatio="none"
        className="block h-10 w-full touch-pan-y"
      >
        <path
          ref={pathRef}
          d={`M0 ${MID}L1000 ${MID}`}
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Die beiden Einspannpunkte — außerhalb des SVG, sonst verzerrt
          `preserveAspectRatio="none"` die Kreise zu Ellipsen. */}
      <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-physics" />
      <span className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rounded-full bg-market" />
    </div>
  );
}
