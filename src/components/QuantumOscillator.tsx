// components/QuantumOscillator.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Badge, Flex, Text } from "@radix-ui/themes";

function hermite(n: number, x: number): number {
  if (n === 0) return 1;
  if (n === 1) return 2 * x;
  let hPrev = 1;
  let hCurr = 2 * x;
  for (let k = 2; k <= n; k++) {
    const hNext = 2 * x * hCurr - 2 * (k - 1) * hPrev;
    hPrev = hCurr;
    hCurr = hNext;
  }
  return hCurr;
}

function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

// psi_n(x) reell (m = omega = hbar = 1)
function psiN(n: number, x: number): number {
  const norm = 1 / Math.sqrt(2 ** n * factorial(n) * Math.sqrt(Math.PI));
  return norm * hermite(n, x) * Math.exp(-(x * x) / 2);
}

// E_n = n + 1/2 (hbar = omega = 1)
const energyOf = (n: number) => n + 0.5;

export default function QuantumOscillator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maxMode, setMaxMode] = useState(3);

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

    const XMIN = -5;
    const XMAX = 5;
    const SAMPLES = 260;

    // Fixed reference used only for the potential parabola so its shape
    // never changes when maxMode / EMAX changes.
    const V_EMAX_REF = 12;

    // Energieachse: von 0 bis über das höchste sichtbare Niveau hinaus
    const EMAX = energyOf(maxMode) + 2.2;
    const leftMargin = 46; // Platz für E-Achsen-Beschriftung

    const energyToY = (E: number) => h * 0.92 - (E / EMAX) * h * 0.82;

    // Separate, fixed-scale mapping used only for drawing V(x), so the
    // parabola's shape is always identical regardless of maxMode.
    const potentialToY = (V: number) =>
      h * 0.92 - (V / V_EMAX_REF) * h * 0.82;

    const xToPx = (x: number) =>
      leftMargin + ((x - XMIN) / (XMAX - XMIN)) * (w - leftMargin - 10);

    const draw = () => {
      t += reduce ? 0.004 : 0.011;
      ctx.clearRect(0, 0, w, h);

      // Restrict the parabola's horizontal extent to 3/4 of the plot
      // width, centered, independent of maxMode.
      const plotWidth = w - leftMargin - 10;
      const parabolaHalfWidth = (plotWidth * 0.75) / 2;
      const parabolaCenterPx = leftMargin + plotWidth / 2;
      const potXToPx = (x: number) =>
        parabolaCenterPx + (x / XMAX) * parabolaHalfWidth;

      // --- Potential V(x) = 1/2 x^2 auf der Energieachse ---
      ctx.beginPath();
      for (let i = 0; i <= SAMPLES; i++) {
        const x = XMIN + (i / SAMPLES) * (XMAX - XMIN);
        const V = 0.5 * x * x;
        const px = potXToPx(x);
        const py = potentialToY(V);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "rgba(148, 163, 184, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // --- Energie-Niveaus E_n als horizontale Linien + Achsenbeschriftung ---
      ctx.font = "11px var(--font-mono, monospace)";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (let n = 0; n <= maxMode; n++) {
        const E = energyOf(n);
        const y = energyToY(E);
        ctx.beginPath();
        ctx.setLineDash([3, 4]);
        ctx.moveTo(leftMargin, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle =
          n === maxMode
            ? "rgba(99, 145, 255, 0.4)"
            : "rgba(148, 163, 184, 0.18)";
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
        ctx.fillText(`E${n}`, leftMargin - 6, y);
      }

      // --- Superposition berechnen ---
      const n0 = maxMode;
      const coeffs = Array.from({ length: n0 + 1 }, (_, n) => {
        const weight = Math.exp(-((n - n0 / 2) ** 2) / (n0 + 1));
        return weight;
      });
      const normSum = Math.sqrt(coeffs.reduce((s, c) => s + c * c, 0));
      const cNorm = coeffs.map((c) => c / normSum);

      // mittlere Energie <E> der Superposition -> Referenzlinie für die Wellenfunktion
      const meanE = cNorm.reduce((s, c, n) => s + c * c * energyOf(n), 0);
      const midY = energyToY(meanE);

      const ampScale = h * 0.16; // Amplitude der Wellenfunktion um <E>

      const reArr: number[] = [];
      const imArr: number[] = [];
      const probArr: number[] = [];

      for (let i = 0; i <= SAMPLES; i++) {
        const x = XMIN + (i / SAMPLES) * (XMAX - XMIN);
        let re = 0;
        let im = 0;
        for (let n = 0; n <= n0; n++) {
          const c = cNorm[n];
          const E = energyOf(n);
          const phase = -E * t;
          const psi = psiN(n, x);
          re += c * psi * Math.cos(phase);
          im += c * psi * Math.sin(phase);
        }
        reArr.push(re);
        imArr.push(im);
        probArr.push(re * re + im * im);
      }

      // --- |psi|^2 als gefüllte Fläche, zentriert auf <E> ---
      ctx.beginPath();
      ctx.moveTo(leftMargin, midY);
      for (let i = 0; i <= SAMPLES; i++) {
        const x = XMIN + (i / SAMPLES) * (XMAX - XMIN);
        const px = xToPx(x);
        const py = midY - probArr[i] * ampScale * 3.2;
        ctx.lineTo(px, py);
      }
      ctx.lineTo(w, midY);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(99, 145, 255, 0.28)");
      grad.addColorStop(1, "rgba(99, 145, 255, 0.02)");
      ctx.fillStyle = grad;
      ctx.fill();

      // --- Re(psi) ---
      ctx.beginPath();
      for (let i = 0; i <= SAMPLES; i++) {
        const x = XMIN + (i / SAMPLES) * (XMAX - XMIN);
        const px = xToPx(x);
        const py = midY - reArr[i] * ampScale;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "rgba(99, 145, 255, 0.95)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // --- Im(psi) ---
      ctx.beginPath();
      for (let i = 0; i <= SAMPLES; i++) {
        const x = XMIN + (i / SAMPLES) * (XMAX - XMIN);
        const px = xToPx(x);
        const py = midY - imArr[i] * ampScale;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "rgba(148, 163, 184, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // --- vertikale Achse links ---
      ctx.beginPath();
      ctx.moveTo(leftMargin, h * 0.08);
      ctx.lineTo(leftMargin, h * 0.95);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.save();
      ctx.translate(12, h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
      ctx.font = "11px var(--font-mono, monospace)";
      ctx.fillText("Energie E", 0, 0);
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [maxMode]);

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
        Parabolisches Potential und Energieniveaus. Blau: Realteil, grau: Imaginärteil, Fläche:
        Aufenthaltswahrscheinlichkeit |ψ|²
      </Text>

      <Flex justify="between" align="center" wrap="wrap" gap="3">
        <Text size="1" color="gray">
          Superposition der Zustände n = 0 bis n = {maxMode}
        </Text>
        <Flex gap="2">
          {[0, 1, 2, 3, 4, 15].map((n) => (
            <Badge
              key={n}
              variant={n === maxMode ? "solid" : "surface"}
              color="blue"
              size="1"
              radius="full"
              style={{ cursor: "pointer" }}
              onClick={() => setMaxMode(n)}
            >
              n = {n}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}