// components/QuantumOscillator.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { useAppearance } from "@/components/AppThemeProvider";
import { paletteFor, rgba } from "@/lib/palette";

/**
 * Quantenharmonischer Oszillator, in natürlichen Einheiten ħ = m = ω = 1.
 *
 *   Ĥ = p̂²/2 + x̂²/2        E_n = n + ½        ψ_n(x) = H_n(x) e^{−x²/2} / √(2ⁿ n! √π)
 *
 * Gezeichnet wird die Zeitentwicklung  ψ(x,t) = Σ_n c_n ψ_n(x) e^{−i E_n t}
 * für zwei Klassen von Anfangszuständen:
 *
 *   · Eigenzustand |n⟩       — c_n = δ, |ψ|² ist zeitlich konstant (stationär).
 *   · Kohärenter Zustand |α⟩ — c_n = e^{−α²/2} αⁿ/√(n!) (Poisson-verteilt).
 *     Sein Wellenpaket zerfließt nicht, sondern schwingt als Ganzes mit
 *     ⟨x⟩(t) = √2 α cos(t) — die klassische Bahn, und es sättigt die
 *     Unschärferelation: Δx·Δp = ½ zu jedem Zeitpunkt.
 *
 * Die Wellenfunktionen werden über die stabile Rekursion
 *   ψ_n = x √(2/n) ψ_{n−1} − √((n−1)/n) ψ_{n−2}
 * berechnet (kein Überlauf durch 2ⁿ n!) und einmal pro Zustand tabelliert;
 * pro Frame werden nur noch die Phasen e^{−iE_n t} aufsummiert.
 */

type QState =
  | { kind: "fock"; n: number }
  | { kind: "coherent"; alpha: number };

const PRESETS: Array<{ label: string; state: QState; hint: string }> = [
  { label: "|0⟩", state: { kind: "fock", n: 0 }, hint: "Grundzustand — Nullpunktsenergie E₀ = ½ħω" },
  { label: "|1⟩", state: { kind: "fock", n: 1 }, hint: "Erster angeregter Zustand — ein Knoten bei x = 0" },
  { label: "|4⟩", state: { kind: "fock", n: 4 }, hint: "Vier Knoten; die Dichte drängt zu den Umkehrpunkten" },
  { label: "α=1", state: { kind: "coherent", alpha: 1 }, hint: "Kohärenter Zustand — minimales Wellenpaket auf klassischer Bahn" },
  { label: "α=2", state: { kind: "coherent", alpha: 2 }, hint: "Größere Amplitude, ⟨n⟩ = α² = 4 Quanten" },
  { label: "α=3", state: { kind: "coherent", alpha: 3 }, hint: "⟨n⟩ = 9 — der Grenzfall zur klassischen Schwingung" },
];

const SAMPLES = 420;

/** Normierte Eigenfunktionen ψ_0..ψ_nMax auf dem Gitter, per Rekursion. */
function tabulate(nMax: number, xs: Float64Array): Float64Array[] {
  const table: Float64Array[] = [];
  const pi4 = Math.PI ** -0.25;

  const psi0 = new Float64Array(xs.length);
  for (let i = 0; i < xs.length; i++) psi0[i] = pi4 * Math.exp(-(xs[i] * xs[i]) / 2);
  table.push(psi0);
  if (nMax === 0) return table;

  const psi1 = new Float64Array(xs.length);
  for (let i = 0; i < xs.length; i++) psi1[i] = Math.SQRT2 * xs[i] * psi0[i];
  table.push(psi1);

  for (let n = 2; n <= nMax; n++) {
    const prev = table[n - 1];
    const prev2 = table[n - 2];
    const next = new Float64Array(xs.length);
    const a = Math.sqrt(2 / n);
    const b = Math.sqrt((n - 1) / n);
    for (let i = 0; i < xs.length; i++) next[i] = a * xs[i] * prev[i] - b * prev2[i];
    table.push(next);
  }
  return table;
}

/** Entwicklungskoeffizienten c_n des gewählten Zustands. */
function coefficients(state: QState): number[] {
  if (state.kind === "fock") {
    const c = new Array<number>(state.n + 1).fill(0);
    c[state.n] = 1;
    return c;
  }

  const a2 = state.alpha * state.alpha;
  // Poisson-Verteilung mit Mittelwert α²: bis weit in die Flanke mitnehmen.
  const nMax = Math.min(26, Math.ceil(a2 + 6 * Math.sqrt(a2 + 1)));
  const c: number[] = [];
  let logFact = 0; // ln(n!)
  for (let n = 0; n <= nMax; n++) {
    if (n > 0) logFact += Math.log(n);
    c.push(Math.exp(-a2 / 2 + n * Math.log(state.alpha) - logFact / 2));
  }
  const norm = Math.sqrt(c.reduce((s, v) => s + v * v, 0));
  return c.map((v) => v / norm);
}

export default function QuantumOscillator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preset, setPreset] = useState(3);
  const [readout, setReadout] = useState({ x: 0, uncertainty: 0.5 });
  const { appearance } = useAppearance();

  const active = PRESETS[preset];

  const model = useMemo(() => {
    const c = coefficients(active.state);
    const nMax = c.length - 1;
    const meanN = c.reduce((s, v, n) => s + v * v * n, 0);
    const meanE = meanN + 0.5;

    // Sichtfenster: gut jenseits der klassischen Umkehrpunkte x = ±√(2⟨E⟩).
    const xMax = Math.max(4.6, Math.sqrt(2 * meanE) + 2.1);
    const xs = new Float64Array(SAMPLES + 1);
    for (let i = 0; i <= SAMPLES; i++) xs[i] = -xMax + (2 * xMax * i) / SAMPLES;

    return { c, nMax, meanN, meanE, xMax, xs, psi: tabulate(nMax, xs) };
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = paletteFor(appearance);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { c, nMax, meanE, xMax, xs, psi } = model;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let t = 0;
    let frame = 0;

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

    const LEFT = 54;
    const re = new Float64Array(xs.length);
    const im = new Float64Array(xs.length);
    const rho = new Float64Array(xs.length);

    const draw = () => {
      t += reduce ? 0.004 : 0.018;
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Energieachse so skalieren, dass ⟨E⟩ mittig sitzt und Platz nach oben bleibt.
      const eMax = meanE * 1.8 + 1.6;
      const plotW = w - LEFT - 14;
      const baseY = h - 26;
      const topY = 16;
      const eToY = (E: number) => baseY - (E / eMax) * (baseY - topY);
      const xToPx = (x: number) => LEFT + ((x + xMax) / (2 * xMax)) * plotW;

      // --- Potential V(x) = x²/2 -------------------------------------------
      ctx.beginPath();
      for (let i = 0; i <= SAMPLES; i++) {
        const px = xToPx(xs[i]);
        const py = eToY(0.5 * xs[i] * xs[i]);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.strokeStyle = rgba(colors.muted, 0.5);
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // --- Energieniveaus, Deckkraft ∝ Besetzung |c_n|² ---------------------
      ctx.font = "11px var(--font-mono, monospace)";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (let n = 0; n <= nMax; n++) {
        const E = n + 0.5;
        if (E > eMax) break;
        const occupation = c[n] * c[n];
        const y = eToY(E);
        // Niveaulinie nur zwischen den klassischen Umkehrpunkten ±√(2E).
        const turn = Math.sqrt(2 * E);
        ctx.beginPath();
        ctx.setLineDash([3, 4]);
        ctx.moveTo(xToPx(-turn), y);
        ctx.lineTo(xToPx(turn), y);
        ctx.strokeStyle = rgba(colors.physics, 0.12 + occupation * 0.75);
        ctx.lineWidth = 1 + occupation * 1.6;
        ctx.stroke();
        ctx.setLineDash([]);

        if (nMax <= 6 || occupation > 0.06) {
          ctx.fillStyle = rgba(colors.muted, 0.5 + occupation * 0.5);
          ctx.fillText(`E${n}`, LEFT - 8, y);
        }
      }
      ctx.lineWidth = 1;

      // --- ψ(x,t) = Σ c_n ψ_n(x) e^{−iE_n t} --------------------------------
      re.fill(0);
      im.fill(0);
      for (let n = 0; n <= nMax; n++) {
        const cn = c[n];
        if (cn < 1e-6) continue;
        const phase = -(n + 0.5) * t;
        const cosP = Math.cos(phase) * cn;
        const sinP = Math.sin(phase) * cn;
        const psiN = psi[n];
        for (let i = 0; i <= SAMPLES; i++) {
          re[i] += psiN[i] * cosP;
          im[i] += psiN[i] * sinP;
        }
      }

      // --- Erwartungswerte und Unschärfeprodukt -----------------------------
      const dx = xs[1] - xs[0];
      let norm = 0;
      let ex = 0;
      let ex2 = 0;
      let ep = 0;
      let ep2 = 0;
      for (let i = 0; i <= SAMPLES; i++) {
        rho[i] = re[i] * re[i] + im[i] * im[i];
        norm += rho[i];
        ex += xs[i] * rho[i];
        ex2 += xs[i] * xs[i] * rho[i];
        if (i > 0 && i < SAMPLES) {
          // p̂ = −i ∂x, zentrale Differenzen
          const dRe = (re[i + 1] - re[i - 1]) / (2 * dx);
          const dIm = (im[i + 1] - im[i - 1]) / (2 * dx);
          ep += re[i] * dIm - im[i] * dRe;
          ep2 += dRe * dRe + dIm * dIm;
        }
      }
      norm *= dx;
      ex = (ex * dx) / norm;
      ex2 = (ex2 * dx) / norm;
      ep = (ep * dx) / norm;
      ep2 = (ep2 * dx) / norm;
      const sigmaX = Math.sqrt(Math.max(0, ex2 - ex * ex));
      const sigmaP = Math.sqrt(Math.max(0, ep2 - ep * ep));

      const midY = eToY(meanE);
      const ampScale = (baseY - topY) * 0.17;

      // --- |ψ|² als gefüllte Fläche auf Höhe ⟨E⟩ ----------------------------
      ctx.beginPath();
      ctx.moveTo(xToPx(xs[0]), midY);
      for (let i = 0; i <= SAMPLES; i++) {
        ctx.lineTo(xToPx(xs[i]), midY - rho[i] * ampScale * 3.4);
      }
      ctx.lineTo(xToPx(xs[SAMPLES]), midY);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, midY - ampScale * 3, 0, midY);
      grad.addColorStop(0, rgba(colors.physics, 0.34));
      grad.addColorStop(1, rgba(colors.physics, 0.02));
      ctx.fillStyle = grad;
      ctx.fill();

      // --- Im ψ (hinten) und Re ψ (vorn) ------------------------------------
      const curve = (data: Float64Array, style: string, width: number) => {
        ctx.beginPath();
        for (let i = 0; i <= SAMPLES; i++) {
          const px = xToPx(xs[i]);
          const py = midY - data[i] * ampScale;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = style;
        ctx.lineWidth = width;
        ctx.stroke();
      };
      curve(im, rgba(colors.market, 0.75), 1.5);
      curve(re, rgba(colors.physics, 0.95), 2);

      // --- ⟨x⟩(t): der Schwerpunkt folgt exakt der klassischen Bahn ---------
      ctx.beginPath();
      ctx.arc(xToPx(ex), midY, 4, 0, Math.PI * 2);
      ctx.fillStyle = rgba(colors.market, 0.95);
      ctx.fill();

      // --- Achsen -----------------------------------------------------------
      ctx.beginPath();
      ctx.moveTo(LEFT, topY);
      ctx.lineTo(LEFT, baseY);
      ctx.lineTo(w - 10, baseY);
      ctx.strokeStyle = rgba(colors.muted, 0.35);
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = rgba(colors.muted, 0.75);
      ctx.font = "10px var(--font-mono, monospace)";
      ctx.textAlign = "left";
      ctx.fillText("x", w - 20, baseY - 10);
      ctx.save();
      ctx.translate(14, (topY + baseY) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillText("Energie E / ħω", 0, 0);
      ctx.restore();

      // Readout nur ~8×/s aktualisieren, damit React nicht pro Frame rendert.
      if (frame % 8 === 0) {
        setReadout({ x: ex, uncertainty: sigmaX * sigmaP });
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [model, appearance]);

  return (
    <Flex direction="column" gap="3">
      <div className="lab-canvas" style={{ height: 320 }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>

      <Flex gap="2" wrap="wrap">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            type="button"
            className="chip"
            aria-pressed={i === preset}
            title={p.hint}
            onClick={() => setPreset(i)}
          >
            {p.label}
          </button>
        ))}
      </Flex>

      <Flex gap="3" wrap="wrap" align="stretch">
        <dl className="readout">
          <dt>⟨n⟩</dt>
          <dd>{model.meanN.toFixed(2)}</dd>
        </dl>
        <dl className="readout">
          <dt>⟨E⟩ / ħω</dt>
          <dd>{model.meanE.toFixed(2)}</dd>
        </dl>
        <dl className="readout">
          <dt>⟨x⟩</dt>
          <dd>{readout.x >= 0 ? "+" : "−"}{Math.abs(readout.x).toFixed(2)}</dd>
        </dl>
        <dl className="readout">
          <dt>Δx · Δp</dt>
          <dd>{readout.uncertainty.toFixed(3)}</dd>
        </dl>
      </Flex>

      <Text size="1" color="gray" style={{ lineHeight: 1.65 }}>
        {active.hint}. Fläche: Aufenthaltswahrscheinlichkeit |ψ|², teal: Re ψ,
        ruby: Im ψ und der Schwerpunkt ⟨x⟩. Die gestrichelten Niveaus sind nach
        ihrer Besetzung |c<sub>n</sub>|² gewichtet und enden an den klassischen
        Umkehrpunkten ±√(2E<sub>n</sub>).
      </Text>
    </Flex>
  );
}
