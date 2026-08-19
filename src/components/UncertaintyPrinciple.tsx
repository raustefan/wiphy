// components/UncertaintyPrinciple.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Badge, Flex, Text } from "@radix-ui/themes";

const POS_COLOR = [99, 145, 255]; // blue accent — dominant when Ort scharf ist
const MOM_COLOR = [129, 199, 199]; // teal accent — dominant when Impuls scharf ist

type PathMode = "circle" | "figure8";

function mixColor(k: number) {
  const r = Math.round(POS_COLOR[0] + (MOM_COLOR[0] - POS_COLOR[0]) * k);
  const g = Math.round(POS_COLOR[1] + (MOM_COLOR[1] - POS_COLOR[1]) * k);
  const b = Math.round(POS_COLOR[2] + (MOM_COLOR[2] - POS_COLOR[2]) * k);
  return `${r}, ${g}, ${b}`;
}

/** Kürzeste (vorzeichenbehaftete) Differenz a-b im Bahnparameter, auf [-π, π] gewickelt. */
function wrapDiff(a: number, b: number) {
  let d = (a - b) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

/** Position + Einheitstangente entlang der gewählten Bahn beim Parameter p (0..2π). */
function pathPoint(mode: PathMode, p: number, cx: number, cy: number, rx: number, ry: number) {
  if (mode === "circle") {
    return {
      x: cx + Math.cos(p) * rx,
      y: cy + Math.sin(p) * rx,
      tx: -Math.sin(p),
      ty: Math.cos(p),
    };
  }
  // Liegende Acht (Lissajous 1:2) — dieselbe Bahn-Idee auf einer geschlossenen,
  // sich selbst kreuzenden Kurve statt eines Kreises.
  const x = cx + Math.sin(p) * rx;
  const y = cy + Math.sin(p) * Math.cos(p) * ry * 2;
  const dx = Math.cos(p) * rx;
  const dy = 2 * ry * Math.cos(2 * p);
  const norm = Math.hypot(dx, dy) || 1;
  return { x, y, tx: dx / norm, ty: dy / norm };
}

export default function UncertaintyPrinciple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0.5, active: false });
  const [pathMode, setPathMode] = useState<PathMode>("circle");

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
    let t = 0;

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

    // Pointer-Handling (Maus + Touch) — x-Position steuert, welche Größe scharf ist
    const setPointer = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = Math.min(
        1,
        Math.max(0, (clientX - rect.left) / rect.width),
      );
      pointer.current.active = true;
    };
    const onMouseMove = (e: MouseEvent) => setPointer(e.clientX);
    const onMouseLeave = () => {
      pointer.current.active = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      setPointer(e.touches[0].clientX);
    };
    const onTouchEnd = () => {
      pointer.current.active = false;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", onTouchEnd);

    // "Teilchen auf einem Ring": Bahnparameter φ und die dazu konjugierte
    // Impulsgröße bilden ein Paar wie Ort und Impuls. Ein Zustand mit scharfem
    // Impuls ist exakt gleichmäßig über die gesamte geschlossene Bahn verteilt.
    let truePhase = Math.random() * Math.PI * 2;
    const OMEGA = reduce ? 0.006 : 0.016; // konstante Bahngeschwindigkeit -> gut sichtbare Bewegung

    const MIN_SIGMA = 0.06; // sehr scharf lokalisiert
    const MAX_SIGMA = 1.35; // nahezu vollständig delokalisiert
    const RING_SAMPLES = 96;
    const MAX_BLUR = 10;

    // k = 0  -> Ort scharf, Impuls unbekannt
    // k = 1  -> Impuls scharf, Ort gleichmäßig über die ganze Bahn verteilt
    let k = 0.5;

    const draw = () => {
      t += reduce ? 0.003 : 0.006;
      ctx.clearRect(0, 0, w, h);

      const kTarget = pointer.current.active
        ? pointer.current.x
        : 0.5 + Math.sin(t * 0.6) * 0.44;
      k += (kTarget - k) * 0.045;

      truePhase = (truePhase + OMEGA) % (Math.PI * 2);

      const margin = 26;
      const labelHeight = 30;
      const areaLeft = margin;
      const areaRight = w - margin;
      const areaTop = margin + labelHeight;
      const areaBottom = h - margin;
      const cx = (areaLeft + areaRight) / 2;
      const cy = (areaTop + areaBottom) / 2;
      const R = Math.max(
        30,
        Math.min((areaRight - areaLeft) / 2, (areaBottom - areaTop) / 2) - 14,
      );
      const rx = R;
      const ry = pathMode === "circle" ? R : R * 0.55;

      // --- gestrichelte Führungslinie entlang der Bahn ---
      ctx.beginPath();
      const GUIDE_SAMPLES = 140;
      for (let i = 0; i <= GUIDE_SAMPLES; i++) {
        const p = pathPoint(pathMode, (i / GUIDE_SAMPLES) * Math.PI * 2, cx, cy, rx, ry);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(148, 163, 184, 0.28)";
      ctx.setLineDash([5, 6]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      const color = mixColor(k);

      // --- Beschriftung oben ---
      ctx.font = "11px var(--font-mono, monospace)";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
      ctx.fillText(
        `Ort scharf ${Math.round((1 - k) * 100)}%  ·  Impuls scharf ${Math.round(k * 100)}%`,
        areaLeft,
        margin + 12,
      );

      // --- Aufenthaltswahrscheinlichkeit entlang der Bahn: von scharfem Punkt
      // bis zur exakt gleichmäßigen Verteilung ---
      const sigma = MIN_SIGMA * Math.pow(MAX_SIGMA / MIN_SIGMA, k);
      const uniformWeight = Math.pow(k, 3); // exakte Gleichverteilung im Grenzfall k -> 1
      const blurPx = k * MAX_BLUR;

      ctx.save();
      if (blurPx > 0.4) {
        ctx.filter = `blur(${blurPx}px)`;
      }
      for (let i = 0; i < RING_SAMPLES; i++) {
        const sampleP = (i / RING_SAMPLES) * Math.PI * 2;
        const d = wrapDiff(sampleP, truePhase);
        const gaussian = Math.exp(-(d * d) / (2 * sigma * sigma));
        const density = gaussian * (1 - uniformWeight) + uniformWeight;
        const alpha = 0.05 + 0.8 * density;

        const s = pathPoint(pathMode, sampleP, cx, cy, rx, ry);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // --- scharfer Kernpunkt: markiert "hier ist es gerade" — verblasst, je
      // unschärfer der Ort wird ---
      const core = pathPoint(pathMode, truePhase, cx, cy, rx, ry);
      const coreAlpha = 1 - k * 0.92;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${color}, ${coreAlpha})`;
      ctx.arc(core.x, core.y, 3, 0, Math.PI * 2);
      ctx.fill();

      // --- Bewegungsrichtung: erscheint erst, wenn der Impuls scharf genug
      // bekannt ist — als tangentiale Pfeile rings um die Bahn, weil ein
      // Zustand mit scharfem Impuls überall dieselbe, exakt bekannte
      // Bewegungsrichtung besitzt (Wahrscheinlichkeitsstrom) ---
      if (k > 0.15) {
        const arrowAlpha = ((k - 0.15) / 0.85) * 0.9;
        const arrowCount = 8;
        const len = 9 + k * 5;
        for (let i = 0; i < arrowCount; i++) {
          const a = (i / arrowCount) * Math.PI * 2 + t * 0.4;
          const s = pathPoint(pathMode, a, cx, cy, rx, ry);
          const tipX = s.x + s.tx * len;
          const tipY = s.y + s.ty * len;
          const backX = s.x - s.tx * len * 0.5;
          const backY = s.y - s.ty * len * 0.5;
          const leftX = tipX - s.tx * 5 - s.ty * 3.5;
          const leftY = tipY - s.ty * 5 + s.tx * 3.5;
          const rightX = tipX - s.tx * 5 + s.ty * 3.5;
          const rightY = tipY - s.ty * 5 - s.tx * 3.5;

          ctx.beginPath();
          ctx.moveTo(backX, backY);
          ctx.lineTo(tipX, tipY);
          ctx.strokeStyle = `rgba(${color}, ${arrowAlpha})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(tipX, tipY);
          ctx.lineTo(leftX, leftY);
          ctx.lineTo(rightX, rightY);
          ctx.closePath();
          ctx.fillStyle = `rgba(${color}, ${arrowAlpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [pathMode]);

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
          touchAction: "none",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>

      <Text size="1" color="gray" style={{ lineHeight: 1.5 }}>
        Bewege den Mauszeiger (oder tippe) horizontal über die Fläche: links ein
        scharfer Punkt, rechts eine gleichmäßige Wolke über die ganze Bahn.
      </Text>

      <Flex justify="between" align="center" wrap="wrap" gap="3">
        <Text size="1" color="gray">
          Bahnform
        </Text>
        <Flex gap="2">
          <Badge
            variant={pathMode === "circle" ? "solid" : "surface"}
            color="blue"
            size="1"
            radius="full"
            style={{ cursor: "pointer" }}
            onClick={() => setPathMode("circle")}
          >
            Kreis
          </Badge>
          <Badge
            variant={pathMode === "figure8" ? "solid" : "surface"}
            color="blue"
            size="1"
            radius="full"
            style={{ cursor: "pointer" }}
            onClick={() => setPathMode("figure8")}
          >
            Liegende 8
          </Badge>
        </Flex>
      </Flex>
    </Flex>
  );
}
