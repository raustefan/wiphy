// components/MarketDiffusion.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { useAppearance } from "@/components/AppThemeProvider";
import { paletteFor, rgba } from "@/lib/palette";

/**
 * Geometrische Brownsche Bewegung — dieselbe Mathematik wie beim Teilchen
 * in der Flüssigkeit, nur auf einen Kurs angewendet.
 *
 *   dS = μ S dt + σ S dW        (Langevin-Gleichung mit multiplikativem Rauschen)
 *
 * Nach dem Lemma von Itô besitzt sie die exakte Lösung
 *
 *   S_t = S_0 · exp[ (μ − σ²/2) t + σ W_t ],   W_t ~ N(0, t),
 *
 * ln S ist also normalverteilt und S selbst log-normal. Die Simulation
 * integriert deshalb nicht die SDE approximativ, sondern zieht die exakten
 * Inkremente Δln S = (μ − σ²/2)Δt + σ√Δt · Z mit Z ~ N(0,1) (Box–Muller).
 *
 * Rechts vom Jetzt-Strich steht keine „Vorhersage“, sondern die vollständige
 * Verteilung: Median, Erwartungswert und die 68-%- bzw. 95-%-Bänder aus der
 * analytischen Log-Normalverteilung. Ihre Breite wächst mit σ√t — dieselbe
 * √t-Skalierung, die Einstein 1905 für die Brownsche Bewegung herleitete und
 * die Bachelier bereits 1900 auf die Pariser Börse angewandt hatte.
 *
 * Die grauen Einzelpfade sind Monte-Carlo-Realisierungen mit *festen*
 * Zufallszahlen: bei jedem Zeitschritt rückt der vorderste Pfadpunkt über den
 * Jetzt-Strich und wird zur realisierten Vergangenheit. Die Zukunft läuft also
 * sichtbar in die Historie hinein.
 */

const PAST = 170; // gezeichnete Handelstage der Vergangenheit
const HORIZON = 120; // Prognosehorizont in Handelstagen
const DT = 1 / 252; // ein Handelstag in Jahren
const MU = 0.07; // Drift μ (7 % p. a.)
const FRAMES_PER_STEP = 4;

const VOLATILITIES = [
  { label: "σ = 10 %", value: 0.1 },
  { label: "σ = 20 %", value: 0.2 },
  { label: "σ = 40 %", value: 0.4 },
];

/** Standardnormalverteilte Zufallszahl (Box–Muller). */
function gauss(): number {
  let u = 0;
  while (u === 0) u = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
}

export default function MarketDiffusion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sigma, setSigma] = useState(0.2);
  const [pathCount, setPathCount] = useState(12);
  const [probe, setProbe] = useState<{ days: number; lo: number; hi: number } | null>(
    null,
  );
  const { appearance } = useAppearance();

  const pointer = useRef({ x: -1, y: -1, inside: false });
  // Die Pfadanzahl darf die Simulation nicht neu starten, deshalb über ein Ref.
  const pathCountRef = useRef(pathCount);
  pathCountRef.current = pathCount;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = paletteFor(appearance);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
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

    // --- Zustand ---------------------------------------------------------
    // Vergangenheit als log-Kurs relativ zum Startwert.
    const history: number[] = [0];
    // Feste Zufalls-Inkremente je Monte-Carlo-Pfad; werden geschoben, nicht neu gezogen.
    const shocks: number[][] = Array.from({ length: 24 }, () =>
      Array.from({ length: HORIZON }, gauss),
    );

    // Vorlauf, damit die Historie beim ersten Frame schon gefüllt ist.
    const driftPerStep = () => (MU - (sigma * sigma) / 2) * DT;
    for (let i = 1; i < PAST; i++) {
      history.push(history[i - 1] + driftPerStep() + sigma * Math.sqrt(DT) * gauss());
    }

    let yCenter = 0;
    let ySpan = 0.4;

    const advance = () => {
      // Der vorderste Punkt von Pfad 0 wird zur Realität.
      const z = shocks[0][0];
      const last = history[history.length - 1];
      history.push(last + driftPerStep() + sigma * Math.sqrt(DT) * z);
      if (history.length > PAST) history.shift();
      for (const path of shocks) {
        path.shift();
        path.push(gauss());
      }
    };

    const onPointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = clientX - rect.left;
      pointer.current.y = clientY - rect.top;
      pointer.current.inside = true;
    };
    const onMove = (e: MouseEvent) => onPointer(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length) onPointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      pointer.current.inside = false;
      setProbe(null);
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);

    const draw = () => {
      frame++;
      if (!reduce && frame % FRAMES_PER_STEP === 0) advance();
      ctx.clearRect(0, 0, w, h);

      const padTop = 16;
      const padBottom = 26;
      const padRight = 12;
      const padLeft = 46;
      const plotW = w - padLeft - padRight;
      const plotH = h - padTop - padBottom;
      const nowX = padLeft + plotW * (PAST / (PAST + HORIZON));

      const anchor = history[history.length - 1];
      const sqrtH = Math.sqrt(HORIZON * DT);

      // Sichtfenster ruhig nachführen: Historie + 2σ-Kegel müssen hineinpassen.
      const histMin = Math.min(...history);
      const histMax = Math.max(...history);
      const coneHalf = 2.1 * sigma * sqrtH + Math.abs(MU * HORIZON * DT);
      const targetCenter = (Math.min(histMin, anchor - coneHalf) + Math.max(histMax, anchor + coneHalf)) / 2;
      const targetSpan =
        Math.max(histMax, anchor + coneHalf) - Math.min(histMin, anchor - coneHalf) + 0.06;
      yCenter += (targetCenter - yCenter) * 0.06;
      ySpan += (targetSpan - ySpan) * 0.06;

      const yToPx = (logValue: number) =>
        padTop + plotH * (0.5 - (logValue - yCenter) / ySpan);
      const iToPx = (i: number) => padLeft + (i / (PAST + HORIZON - 1)) * plotW;

      // --- Kursraster: gleichabständig in ln S, beschriftet als Vielfaches --
      ctx.font = "10px var(--font-mono, monospace)";
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      const tickStep = ySpan > 0.9 ? 0.25 : ySpan > 0.4 ? 0.1 : 0.05;
      const first = Math.ceil((yCenter - ySpan / 2) / tickStep) * tickStep;
      for (let v = first; v < yCenter + ySpan / 2; v += tickStep) {
        const py = yToPx(v);
        ctx.beginPath();
        ctx.moveTo(padLeft, py);
        ctx.lineTo(w - padRight, py);
        ctx.strokeStyle = rgba(colors.muted, 0.1);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = rgba(colors.muted, 0.7);
        ctx.fillText(`${Math.exp(v).toFixed(2)}×`, padLeft - 6, py);
      }

      // --- Konfidenzkegel aus der Log-Normalverteilung ----------------------
      // ln S_τ ~ N(anchor + (μ − σ²/2)τ, σ²τ)  ⇒  Bänder bei ±z·σ√τ
      const band = (z: number, alpha: number) => {
        ctx.beginPath();
        for (let k = 0; k <= HORIZON; k++) {
          const tau = k * DT;
          const m = anchor + (MU - (sigma * sigma) / 2) * tau;
          ctx.lineTo(iToPx(PAST - 1 + k), yToPx(m + z * sigma * Math.sqrt(tau)));
        }
        for (let k = HORIZON; k >= 0; k--) {
          const tau = k * DT;
          const m = anchor + (MU - (sigma * sigma) / 2) * tau;
          ctx.lineTo(iToPx(PAST - 1 + k), yToPx(m - z * sigma * Math.sqrt(tau)));
        }
        ctx.closePath();
        ctx.fillStyle = rgba(colors.market, alpha);
        ctx.fill();
      };
      band(1.96, 0.09); // 95 %
      band(1.0, 0.13); // 68 %

      // Median exp(m) und Erwartungswert exp(m + σ²τ/2): die Log-Normal-Schiefe.
      const centralLine = (offset: (tau: number) => number, dash: number[], alpha: number) => {
        ctx.beginPath();
        ctx.setLineDash(dash);
        for (let k = 0; k <= HORIZON; k++) {
          const tau = k * DT;
          const m = anchor + (MU - (sigma * sigma) / 2) * tau + offset(tau);
          const px = iToPx(PAST - 1 + k);
          k === 0 ? ctx.moveTo(px, yToPx(m)) : ctx.lineTo(px, yToPx(m));
        }
        ctx.strokeStyle = rgba(colors.market, alpha);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
      };
      centralLine(() => 0, [5, 4], 0.85); // Median
      centralLine((tau) => (sigma * sigma * tau) / 2, [1, 3], 0.5); // Erwartungswert

      // --- Monte-Carlo-Pfade ------------------------------------------------
      for (let p = 0; p < pathCountRef.current; p++) {
        const path = shocks[p % shocks.length];
        let value = anchor;
        ctx.beginPath();
        ctx.moveTo(iToPx(PAST - 1), yToPx(value));
        for (let k = 0; k < HORIZON; k++) {
          value += (MU - (sigma * sigma) / 2) * DT + sigma * Math.sqrt(DT) * path[k];
          ctx.lineTo(iToPx(PAST + k), yToPx(value));
        }
        // Pfad 0 wird als nächstes Realität — er bekommt mehr Gewicht.
        ctx.strokeStyle =
          p === 0 ? rgba(colors.market, 0.55) : rgba(colors.muted, 0.28);
        ctx.lineWidth = p === 0 ? 1.4 : 1;
        ctx.stroke();
      }

      // --- Realisierter Kursverlauf ----------------------------------------
      ctx.beginPath();
      history.forEach((v, i) => {
        const px = iToPx(i);
        const py = yToPx(v);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.strokeStyle = rgba(colors.physics, 0.95);
      ctx.lineWidth = 2;
      ctx.stroke();

      // --- Jetzt-Strich ------------------------------------------------------
      ctx.beginPath();
      ctx.setLineDash([2, 3]);
      ctx.moveTo(nowX, padTop);
      ctx.lineTo(nowX, padTop + plotH);
      ctx.strokeStyle = rgba(colors.muted, 0.55);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(nowX, yToPx(anchor), 3.5, 0, Math.PI * 2);
      ctx.fillStyle = rgba(colors.physics, 1);
      ctx.fill();

      ctx.textAlign = "left";
      ctx.fillStyle = rgba(colors.muted, 0.75);
      ctx.fillText("heute", nowX + 6, padTop + 8);

      // --- Sonde: Verteilung an einem gewählten Horizont ---------------------
      if (pointer.current.inside && pointer.current.x > nowX) {
        const k = Math.max(
          1,
          Math.min(
            HORIZON,
            Math.round(
              ((pointer.current.x - padLeft) / plotW) * (PAST + HORIZON - 1) - (PAST - 1),
            ),
          ),
        );
        const tau = k * DT;
        const m = anchor + (MU - (sigma * sigma) / 2) * tau;
        const s = sigma * Math.sqrt(tau);
        const px = iToPx(PAST - 1 + k);

        ctx.beginPath();
        ctx.moveTo(px, padTop);
        ctx.lineTo(px, padTop + plotH);
        ctx.strokeStyle = rgba(colors.market, 0.5);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Dichte von ln S (Normalverteilung), nach links aufgetragen.
        const width = Math.min(96, plotW * 0.22);
        ctx.beginPath();
        for (let i = 0; i <= 90; i++) {
          const v = m - 3.2 * s + (6.4 * s * i) / 90;
          const density = Math.exp(-((v - m) ** 2) / (2 * s * s));
          const py = yToPx(v);
          const dxPx = density * width;
          i === 0 ? ctx.moveTo(px - dxPx, py) : ctx.lineTo(px - dxPx, py);
        }
        ctx.lineTo(px, yToPx(m + 3.2 * s));
        ctx.lineTo(px, yToPx(m - 3.2 * s));
        ctx.closePath();
        ctx.fillStyle = rgba(colors.market, 0.2);
        ctx.fill();
        ctx.strokeStyle = rgba(colors.market, 0.75);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (frame % 6 === 0) {
          setProbe({
            days: k,
            lo: Math.exp(m - 1.645 * s),
            hi: Math.exp(m + 1.645 * s),
          });
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
    };
  }, [sigma, appearance]);

  return (
    <Flex direction="column" gap="3">
      <div className="lab-canvas" style={{ height: 320 }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>

      <Flex gap="2" wrap="wrap">
        {VOLATILITIES.map((v) => (
          <button
            key={v.label}
            type="button"
            className="chip"
            aria-pressed={v.value === sigma}
            onClick={() => setSigma(v.value)}
          >
            {v.label}
          </button>
        ))}
        <span style={{ width: 12 }} />
        {[0, 12, 24].map((n) => (
          <button
            key={n}
            type="button"
            className="chip"
            aria-pressed={n === pathCount}
            onClick={() => setPathCount(n)}
          >
            {n === 0 ? "ohne Pfade" : `${n} Pfade`}
          </button>
        ))}
      </Flex>

      <Flex gap="3" wrap="wrap">
        <dl className="readout">
          <dt>Drift μ</dt>
          <dd>{(MU * 100).toFixed(0)} %</dd>
        </dl>
        <dl className="readout">
          <dt>Vola σ</dt>
          <dd>{(sigma * 100).toFixed(0)} %</dd>
        </dl>
        <dl className="readout">
          <dt>σ · √T</dt>
          <dd>{(sigma * Math.sqrt(HORIZON * DT) * 100).toFixed(1)} %</dd>
        </dl>
        <dl className="readout">
          <dt>{probe ? `90 % nach ${probe.days} T` : "90 %-Band"}</dt>
          <dd>
            {probe
              ? `${probe.lo.toFixed(2)}–${probe.hi.toFixed(2)}×`
              : "Zeiger in die Zukunft"}
          </dd>
        </dl>
      </Flex>

      <Text size="1" color="gray" style={{ lineHeight: 1.65 }}>
        Teal: der realisierte Kurs. Rechts vom Jetzt-Strich die vollständige
        Verteilung — 68-%- und 95-%-Band, gestrichelt der Median, gepunktet der
        Erwartungswert. Dass beide auseinanderlaufen, ist der σ²/2-Term aus Itôs
        Lemma. Zeiger in den Prognosebereich bewegen, um die Dichte von ln S an
        einem Horizont zu sehen.
      </Text>
    </Flex>
  );
}
