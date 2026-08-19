// components/EntropyDiffusion.tsx
"use client";

import { useEffect, useRef } from "react";
import { Flex, Text } from "@radix-ui/themes";

const COLD_COLOR = [99, 145, 255]; // blau
const HOT_COLOR = [255, 140, 90]; // warmes Orange

type Particle = {
  x: number;
  y: number;
  angle: number;
  heat: number; // 0..1
};

type Domain = {
  left: { x0: number; x1: number; y0: number; y1: number };
  right: { x0: number; x1: number; y0: number; y1: number };
  tube: { x0: number; x1: number; y0: number; y1: number };
};

function insideDomain(x: number, y: number, d: Domain) {
  // Box checks first: at the shared boundary x where a box meets the tube,
  // the full box height must win over the narrower tube slot.
  if (x >= d.left.x0 && x <= d.left.x1 && y >= d.left.y0 && y <= d.left.y1) {
    return true;
  }
  if (x >= d.right.x0 && x <= d.right.x1 && y >= d.right.y0 && y <= d.right.y1) {
    return true;
  }
  return x >= d.tube.x0 && x <= d.tube.x1 && y >= d.tube.y0 && y <= d.tube.y1;
}

function mixColor(heat: number) {
  const r = Math.round(COLD_COLOR[0] + (HOT_COLOR[0] - COLD_COLOR[0]) * heat);
  const g = Math.round(COLD_COLOR[1] + (HOT_COLOR[1] - COLD_COLOR[1]) * heat);
  const b = Math.round(COLD_COLOR[2] + (HOT_COLOR[2] - COLD_COLOR[2]) * heat);
  return `${r}, ${g}, ${b}`;
}

export default function EntropyDiffusion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const N = 70;
    const BASE_HEAT = 0.12;
    let particles: Particle[] = [];
    const seed = () => {
      particles = Array.from({ length: N }, () => ({
        x: 0,
        y: 0,
        angle: Math.random() * Math.PI * 2,
        heat: BASE_HEAT,
      }));
    };
    seed();

    // Phasen eines Zyklus: aufheizen (links) -> ausgleichen -> abkühlen -> Pause
    const HEAT_MS = 4000;
    const EQUIL_MS = 12000;
    const COOL_MS = 2500;
    const PAUSE_MS = 1500;
    const TOTAL_MS = HEAT_MS + EQUIL_MS + COOL_MS + PAUSE_MS;
    let cycleMs = 0;
    let placed = false;

    const draw = () => {
      const dtMs = (reduce ? 8 : 16) * 1;
      cycleMs = (cycleMs + dtMs) % TOTAL_MS;

      let phase: "heat" | "equilibrate" | "cool" | "pause";
      if (cycleMs < HEAT_MS) phase = "heat";
      else if (cycleMs < HEAT_MS + EQUIL_MS) phase = "equilibrate";
      else if (cycleMs < HEAT_MS + EQUIL_MS + COOL_MS) phase = "cool";
      else phase = "pause";

      ctx.clearRect(0, 0, w, h);

      const margin = 22;
      const labelHeight = 30;
      const areaLeft = margin;
      const areaRight = w - margin;
      const areaTop = margin + labelHeight;
      const areaBottom = h - margin;

      const tubeWidth = Math.min(46, (areaRight - areaLeft) * 0.14);
      const boxW = (areaRight - areaLeft - tubeWidth) / 2;
      const tubeHalfH = (areaBottom - areaTop) * 0.13;
      const centerY = (areaTop + areaBottom) / 2;

      const domain: Domain = {
        left: { x0: areaLeft, x1: areaLeft + boxW, y0: areaTop, y1: areaBottom },
        right: { x0: areaRight - boxW, x1: areaRight, y0: areaTop, y1: areaBottom },
        tube: {
          x0: areaLeft + boxW,
          x1: areaRight - boxW,
          y0: centerY - tubeHalfH,
          y1: centerY + tubeHalfH,
        },
      };

      if (!placed) {
        placed = true;
        particles.forEach((p, i) => {
          const inLeft = i % 2 === 0;
          const b = inLeft ? domain.left : domain.right;
          p.x = b.x0 + Math.random() * (b.x1 - b.x0);
          p.y = b.y0 + Math.random() * (b.y1 - b.y0);
        });
      }

      // --- Kastenumriss ---
      ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
      ctx.lineWidth = 1;
      ctx.strokeRect(domain.left.x0, domain.left.y0, domain.left.x1 - domain.left.x0, domain.left.y1 - domain.left.y0);
      ctx.strokeRect(domain.right.x0, domain.right.y0, domain.right.x1 - domain.right.x0, domain.right.y1 - domain.right.y0);
      ctx.strokeRect(domain.tube.x0, domain.tube.y0, domain.tube.x1 - domain.tube.x0, domain.tube.y1 - domain.tube.y0);

      // --- Teilchen bewegen ---
      const heatRate = reduce ? 0.015 : 0.03;
      particles.forEach((p) => {
        if (phase === "heat" && p.x <= domain.left.x1) {
          p.heat += (1 - p.heat) * heatRate;
        } else if (phase === "cool") {
          p.heat += (BASE_HEAT - p.heat) * heatRate;
        }

        p.angle += (Math.random() - 0.5) * (reduce ? 0.08 : 0.18);
        const speed = 0.5 + 2.1 * p.heat;
        const vx = Math.cos(p.angle) * speed;

        let nx = p.x + vx;
        const ny0 = p.y;
        if (!insideDomain(nx, ny0, domain)) {
          p.angle = Math.PI - p.angle;
          nx = p.x + Math.cos(p.angle) * speed;
        }
        let ny = ny0 + Math.sin(p.angle) * speed;
        if (!insideDomain(nx, ny, domain)) {
          p.angle = -p.angle;
          ny = ny0 + Math.sin(p.angle) * speed;
        }
        if (!insideDomain(nx, ny, domain)) {
          ny = ny0;
        }
        p.x = nx;
        p.y = ny;
      });

      // --- Wärmeaustausch bei Kontakt: heiße Teilchen ziehen benachbarte kalte
      // Teilchen Richtung Rot, während sie selbst Richtung Blau abkühlen — die
      // Gesamtwärme bleibt dabei erhalten (nur Austausch, keine Erzeugung) ---
      const contactR = 22;
      const contactR2 = contactR * contactR;
      const relax = reduce ? 0.06 : 0.12;
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          if (dx * dx + dy * dy < contactR2) {
            const exchange = (pj.heat - pi.heat) * relax;
            pi.heat += exchange;
            pj.heat -= exchange;
          }
        }
      }

      // --- Teilchen zeichnen ---
      particles.forEach((p) => {
        const color = mixColor(p.heat);
        if (p.heat > 0.4) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 9);
          grad.addColorStop(0, `rgba(${color}, ${0.35 * p.heat})`);
          grad.addColorStop(1, `rgba(${color}, 0)`);
          ctx.beginPath();
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, 0.95)`;
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- Beschriftung + Temperaturanzeige ---
      const divider = domain.tube.x0 + (domain.tube.x1 - domain.tube.x0) / 2;
      const leftParticles = particles.filter((p) => p.x < divider);
      const rightParticles = particles.filter((p) => p.x >= divider);
      const avg = (arr: Particle[]) =>
        arr.length === 0 ? 0 : arr.reduce((s, p) => s + p.heat, 0) / arr.length;
      const leftAvg = Math.round(avg(leftParticles) * 100);
      const rightAvg = Math.round(avg(rightParticles) * 100);

      const phaseLabel =
        phase === "heat"
          ? "Aufheizen (links)"
          : phase === "equilibrate"
            ? "Temperaturausgleich"
            : phase === "cool"
              ? "Abkühlen"
              : "Neustart";

      ctx.font = "11px var(--font-mono, monospace)";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
      ctx.fillText(
        `${phaseLabel}  ·  ⌀ links ${leftAvg}%  ·  ⌀ rechts ${rightAvg}%`,
        margin,
        margin + 12,
      );

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <Flex direction="column" gap="3">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "280px",
          borderRadius: "var(--radius-4)",
          background: "var(--gray-a2)",
          border: "1px solid var(--gray-a5)",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>

      <Text size="1" color="gray" style={{ lineHeight: 1.5 }}>
        Links wird geheizt, durchs Röhrchen mischt sich die Wärme unumkehrbar in
        die rechte Kammer, bis beide Seiten gleich warm sind.
      </Text>
    </Flex>
  );
}
