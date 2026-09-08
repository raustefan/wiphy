// components/MarketDiffusion.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useAppearance } from "@/components/AppThemeProvider";
import { paletteFor, rgba } from "@/lib/palette";
import { cappedDpr, createRenderLoop, isCompactViewport } from "@/lib/renderLoop";

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
 * Darstellung:
 *
 * • Die y-Achse ist *fest* und immer dieselbe: der heutige Kurs liegt exakt in
 *   der Mitte, die Ränder liegen bei 0,47× und 2,12× davon. Nur so ändert ein
 *   anderes σ sichtbar etwas — eine mitwachsende Achse würde jede Vola gleich
 *   aussehen lassen. Was aus dem Fenster läuft, läuft eben aus dem Fenster.
 *
 * • Rechts vom Jetzt-Strich steht keine „Vorhersage“, sondern die Verteilung,
 *   gezeichnet als Fächer feiner Quantillinien (±0,5σ … ±2σ) statt als
 *   eingefärbte Flächen. Ihre Breite wächst mit σ√t — dieselbe √t-Skalierung,
 *   die Einstein 1905 herleitete und die Bachelier 1900 auf die Pariser Börse
 *   angewandt hatte.
 *
 * • Die Zeit läuft kontinuierlich: zwischen zwei Handelstagen wird der Verlauf
 *   interpoliert, statt ruckweise um ein ganzes Pixelraster zu springen. Der
 *   vorderste Punkt von Pfad 0 wird dabei zur realisierten Vergangenheit — die
 *   Zukunft läuft sichtbar in die Historie hinein.
 *
 * Performance: zeitbasiert statt bildzahlbasiert, gedeckelte Bildrate, keine
 * flächigen Alpha-Füllungen und kein React-State im Zeichenpfad. Das Canvas
 * trägt seine Rundung selbst, damit iOS Safari nicht jedes Bild durch eine
 * Clipping-Maske schieben muss.
 */

const PAST = 140; // gezeichnete Handelstage der Vergangenheit
const HORIZON = 110; // Prognosehorizont in Handelstagen
const TOTAL = PAST + HORIZON;
const DT = 1 / 252; // ein Handelstag in Jahren
const MU = 0.07; // Drift μ (7 % p. a.)
const STEP_MS = 85; // Wanduhr-Dauer eines Handelstags

/** Halbe Höhe des Sichtfensters in ln S — fest, nie nachgeführt. */
const LOG_HALF_SPAN = 0.75;
/** Stützstellen des Quantilfächers (jeder n-te Handelstag). */
const BAND_STEP = 5;

/** Auswählbare Pfadanzahlen — der Startwert muss einer davon entsprechen. */
const PATH_COUNTS = [0, 3, 5] as const;
const DEFAULT_PATH_COUNT = 3;
/** Vorrat an Zufallspfaden; mehr als das Maximum oben wird nie gebraucht. */
const SHOCK_PATHS = 6;

const VOLATILITIES = [
  { label: "10 %", value: 0.1 },
  { label: "20 %", value: 0.2 },
  { label: "90 %", value: 0.9 },
];

/** Quantillinien: z-Wert und Deckkraft — außen blasser. */
const QUANTILES = [
  { z: 0.5, alpha: 0.32 },
  { z: 1.0, alpha: 0.24 },
  { z: 1.5, alpha: 0.16 },
  { z: 2.0, alpha: 0.1 },
];

type Tick = { mult: number; label: string; major: boolean };
const TICKS: Tick[] = [
  { mult: 0.5, label: "0,5×", major: true },
  { mult: 0.7, label: "0,7×", major: false },
  { mult: 1, label: "1×", major: true },
  { mult: 1.4, label: "1,4×", major: false },
  { mult: 2, label: "2×", major: true },
];

/** Standardnormalverteilte Zufallszahl (Box–Muller). */
function gauss(): number {
  let u = 0;
  while (u === 0) u = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
}

const fmt = (v: number) => v.toFixed(2).replace(".", ",");

export default function MarketDiffusion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sigma, setSigma] = useState(0.2);
  const [pathCount, setPathCount] = useState<number>(DEFAULT_PATH_COUNT);
  const { appearance } = useAppearance();

  // Beide Regler dürfen die Simulation nicht neu starten — deshalb über Refs.
  // Ein Vola-Wechsel wirkt so live auf die Zukunft, während die Vergangenheit
  // stehen bleibt: genau das macht den Unterschied sichtbar.
  const sigmaRef = useRef(sigma);
  sigmaRef.current = sigma;
  const pathCountRef = useRef(pathCount);
  pathCountRef.current = pathCount;
  const pointer = useRef({ x: -1, inside: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = paletteFor(appearance);
    const compactDevice = isCompactViewport();
    const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

    // --- Geometrie ---------------------------------------------------------
    let w = 0;
    let h = 0;
    let padLeft = 40;
    const padTop = 14;
    const padRight = 12;
    const padBottom = 18;
    let plotW = 0;
    let plotH = 0;
    let stepW = 0;
    let nowX = 0;
    let fontSize = 10;
    let ticks: { tick: Tick; py: number }[] = [];

    const layout = () => {
      const narrow = w < 380;
      fontSize = narrow ? 10 : 11;
      padLeft = narrow ? 34 : 44;
      plotW = Math.max(10, w - padLeft - padRight);
      plotH = Math.max(10, h - padTop - padBottom);
      stepW = plotW / (TOTAL - 1);
      nowX = padLeft + (PAST - 1) * stepW;
      // Die Achse steht fest, die Rasterlinien liegen also auf festen Pixeln.
      ticks = TICKS.filter((t) => !narrow || t.major).map((tick) => ({
        tick,
        py:
          padTop +
          plotH * (0.5 - Math.log(tick.mult) / (2 * LOG_HALF_SPAN)),
      }));
    };

    const resize = () => {
      const dpr = cappedDpr();
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      loop.redraw();
    });
    ro.observe(canvas);

    // --- Zustand -----------------------------------------------------------
    // Vergangenheit als log-Kurs; der letzte Eintrag ist der jüngste Handelstag.
    const history: number[] = [0];
    // Feste Zufalls-Inkremente je Monte-Carlo-Pfad; werden geschoben, nicht neu gezogen.
    const shocks: number[][] = Array.from({ length: SHOCK_PATHS }, () =>
      Array.from({ length: HORIZON }, gauss),
    );

    // Vorlauf, damit die Historie beim ersten Frame schon gefüllt ist.
    const seedDrift = (MU - (sigma * sigma) / 2) * DT;
    for (let i = 1; i <= PAST; i++) {
      history.push(history[i - 1] + seedDrift + sigma * Math.sqrt(DT) * gauss());
    }

    let accumulated = 0;
    let lastNow = 0;

    const advance = (vol: number) => {
      // Der vorderste Punkt von Pfad 0 wird zur Realität.
      const drift = (MU - (vol * vol) / 2) * DT;
      history.push(
        history[history.length - 1] + drift + vol * Math.sqrt(DT) * shocks[0][0],
      );
      if (history.length > PAST + 1) history.shift();
      for (const path of shocks) {
        path.shift();
        path.push(gauss());
      }
    };

    const onPointer = (clientX: number) => {
      pointer.current.x = clientX - canvas.getBoundingClientRect().left;
      pointer.current.inside = true;
    };
    const onMove = (e: MouseEvent) => onPointer(e.clientX);
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length) onPointer(e.touches[0].clientX);
    };
    const onLeave = () => {
      pointer.current.inside = false;
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchstart", onTouch, { passive: true });
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);

    const draw = ({ reducedMotion, now }: { reducedMotion: boolean; now: number }) => {
      const vol = sigmaRef.current;
      const sqrtDt = Math.sqrt(DT);
      const drift = (MU - (vol * vol) / 2) * DT;

      // Zeitbasiert: gleiche Geschwindigkeit bei 30, 60 oder 120 Hz.
      const elapsed = lastNow ? Math.min(now - lastNow, 250) : 0;
      lastNow = now;
      if (!reducedMotion) {
        accumulated += elapsed;
        while (accumulated >= STEP_MS) {
          accumulated -= STEP_MS;
          advance(vol);
        }
      }
      const progress = reducedMotion ? 0 : accumulated / STEP_MS;

      // Der Kurs „heute“ liegt zwischen dem letzten und dem nächsten Handelstag.
      const last = history[history.length - 1];
      const upcoming = last + drift + vol * sqrtDt * shocks[0][0];
      const anchor = last + (upcoming - last) * progress;

      // Feste Achse: der heutige Kurs sitzt immer exakt in der Mitte.
      const yToPx = (v: number) =>
        padTop + plotH * (0.5 - (v - anchor) / (2 * LOG_HALF_SPAN));
      const xToPx = (tau: number) => nowX + tau * stepW;

      ctx.clearRect(0, 0, w, h);
      ctx.font = `${fontSize}px ${MONO}`;
      ctx.textBaseline = "middle";
      ctx.lineJoin = "round";

      // --- Kursraster: feste Vielfache des heutigen Kurses -------------------
      ctx.textAlign = "right";
      for (const { tick, py } of ticks) {
        ctx.beginPath();
        ctx.moveTo(padLeft, py);
        ctx.lineTo(padLeft + plotW, py);
        ctx.strokeStyle = rgba(colors.muted, tick.mult === 1 ? 0.26 : 0.12);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = rgba(colors.muted, tick.mult === 1 ? 0.95 : 0.6);
        ctx.fillText(tick.label, padLeft - 6, py);
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(padLeft, padTop, plotW, plotH);
      ctx.clip();

      // --- Quantilfächer aus der Log-Normalverteilung ------------------------
      // ln S_τ ~ N(anchor + (μ − σ²/2)τ, σ²τ)  ⇒  Linien bei ±z·σ√τ
      const quantile = (z: number, alpha: number) => {
        ctx.beginPath();
        for (let k = 0; k <= HORIZON; k += BAND_STEP) {
          const tau = k * DT;
          const m = anchor + drift * k + z * vol * Math.sqrt(tau);
          const px = xToPx(k);
          if (k === 0) ctx.moveTo(px, yToPx(m));
          else ctx.lineTo(px, yToPx(m));
        }
        ctx.strokeStyle = rgba(colors.market, alpha);
        ctx.lineWidth = 1;
        ctx.stroke();
      };
      for (const q of QUANTILES) {
        quantile(q.z, q.alpha);
        quantile(-q.z, q.alpha);
      }

      // --- Monte-Carlo-Pfade -------------------------------------------------
      for (let p = 0; p < pathCountRef.current; p++) {
        const path = shocks[p % shocks.length];
        let value = anchor;
        ctx.beginPath();
        ctx.moveTo(nowX, yToPx(value));
        for (let k = 0; k < HORIZON; k++) {
          value += drift + vol * sqrtDt * path[k];
          ctx.lineTo(xToPx(k + 1), yToPx(value));
        }
        // Pfad 0 wird als nächstes Realität — er bekommt mehr Gewicht.
        ctx.strokeStyle =
          p === 0 ? rgba(colors.market, 0.45) : rgba(colors.muted, 0.3);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Median exp(m) und Erwartungswert exp(m + σ²τ/2): die Log-Normal-Schiefe.
      const centralLine = (
        offset: (tau: number) => number,
        dash: number[],
        alpha: number,
        width: number,
      ) => {
        ctx.beginPath();
        ctx.setLineDash(dash);
        for (let k = 0; k <= HORIZON; k += BAND_STEP) {
          const tau = k * DT;
          const m = anchor + drift * k + offset(tau);
          const px = xToPx(k);
          if (k === 0) ctx.moveTo(px, yToPx(m));
          else ctx.lineTo(px, yToPx(m));
        }
        ctx.strokeStyle = rgba(colors.market, alpha);
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.setLineDash([]);
      };
      centralLine((tau) => (vol * vol * tau) / 2, [1.5, 3.5], 0.5, 1.2); // Erwartungswert
      centralLine(() => 0, [6, 5], 0.9, 1.6); // Median

      // --- Realisierter Kursverlauf ------------------------------------------
      ctx.beginPath();
      for (let i = 0; i <= PAST; i++) {
        const px = xToPx(i - PAST - progress);
        const py = yToPx(history[i]);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.lineTo(nowX, yToPx(anchor)); // angefangener Handelstag
      ctx.strokeStyle = rgba(colors.physics, 0.95);
      ctx.lineWidth = compactDevice ? 1.6 : 2;
      ctx.stroke();

      // --- Jetzt-Strich --------------------------------------------------------
      ctx.beginPath();
      ctx.setLineDash([2, 3]);
      ctx.moveTo(nowX, padTop);
      ctx.lineTo(nowX, padTop + plotH);
      ctx.strokeStyle = rgba(colors.muted, 0.5);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(nowX, yToPx(anchor), 3.5, 0, Math.PI * 2);
      ctx.fillStyle = rgba(colors.physics, 1);
      ctx.fill();

      ctx.textAlign = "right";
      ctx.fillStyle = rgba(colors.muted, 0.8);
      ctx.fillText("heute", nowX - 6, padTop + 8);

      // --- Sonde: Verteilung an einem gewählten Horizont -----------------------
      if (pointer.current.inside && pointer.current.x > nowX + stepW) {
        const k = Math.max(
          1,
          Math.min(HORIZON, Math.round((pointer.current.x - nowX) / stepW)),
        );
        const tau = k * DT;
        const m = anchor + drift * k;
        const s = vol * Math.sqrt(tau);
        const px = xToPx(k);

        ctx.beginPath();
        ctx.moveTo(px, padTop);
        ctx.lineTo(px, padTop + plotH);
        ctx.strokeStyle = rgba(colors.market, 0.45);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Dichte von ln S (Normalverteilung), nach links aufgetragen.
        const width = Math.min(88, plotW * 0.2);
        ctx.beginPath();
        ctx.moveTo(px, yToPx(m - 3.2 * s));
        for (let i = 0; i <= 60; i++) {
          const v = m - 3.2 * s + (6.4 * s * i) / 60;
          const density = Math.exp(-((v - m) ** 2) / (2 * s * s));
          ctx.lineTo(px - density * width, yToPx(v));
        }
        ctx.lineTo(px, yToPx(m + 3.2 * s));
        ctx.strokeStyle = rgba(colors.market, 0.8);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Ablesewert oben links, auf eigenem Grund — sonst kreuzt der Kurs.
        const lines = [
          `+${k} Handelstage`,
          `90 %  ${fmt(Math.exp(m - 1.645 * s))} – ${fmt(Math.exp(m + 1.645 * s))}×`,
        ];
        const lineH = fontSize + 5;
        const boxW =
          Math.max(...lines.map((l) => ctx.measureText(l).width)) + 16;
        const boxH = lines.length * lineH + 10;
        const boxX = padLeft + 8;
        const boxY = padTop + 6;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(boxX, boxY, boxW, boxH, 8);
        else ctx.rect(boxX, boxY, boxW, boxH);
        ctx.fillStyle = rgba(colors.surface, 0.92);
        ctx.fill();
        ctx.strokeStyle = rgba(colors.muted, 0.2);
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.textAlign = "left";
        lines.forEach((line, i) => {
          ctx.fillStyle = rgba(i === 0 ? colors.muted : colors.ink, i === 0 ? 0.8 : 0.95);
          ctx.fillText(line, boxX + 8, boxY + 5 + lineH * (i + 0.5));
        });
      }

      ctx.restore();
    };

    const loop = createRenderLoop(canvas, draw, { fps: compactDevice ? 30 : 60 });

    return () => {
      loop.stop();
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchstart", onTouch);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
    };
    // sigma und pathCount laufen absichtlich über Refs: ein Reglerwechsel darf
    // die Historie nicht wegwerfen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appearance]);

  return (
    <figure className="m-0 grid gap-3 sm:gap-4">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Simulation einer geometrischen Brownschen Bewegung: links vom Jetzt-Strich der realisierte Kursverlauf, rechts davon der Quantilfächer der Log-Normalverteilung."
        className="block aspect-[5/4] w-full touch-pan-y rounded-2xl border border-line bg-surface sm:aspect-[2/1] lg:aspect-[3/2]"
      />

      <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-4">
        <Segmented
          label="Volatilität σ"
          value={sigma}
          onChange={setSigma}
          options={VOLATILITIES}
        />
        <Segmented
          label="Monte-Carlo-Pfade"
          value={pathCount}
          onChange={setPathCount}
          options={PATH_COUNTS.map((n) => ({
            label: n === 0 ? "keine" : String(n),
            value: n,
          }))}
        />
      </div>

      <figcaption className="text-xs leading-relaxed text-muted">
        Die y-Achse ist fest: „heute“ liegt in der Mitte, die Ränder bei 0,5×
        und 2×. Rechts vom Jetzt-Strich der Quantilfächer bis ±2σ, gestrichelt
        der Median, gepunktet der Erwartungswert. In den Prognosebereich tippen
        zeigt die Dichte an einem Horizont.
      </figcaption>
    </figure>
  );
}

/** Segmentierte Umschalter — auf dem Telefon volle Breite, sonst nebeneinander. */
function Segmented({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: number }[];
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="grid gap-1.5">
      <span className="font-mono text-[0.62rem] tracking-[0.16em] text-faint uppercase">
        {label}
      </span>
      <div
        role="group"
        aria-label={label}
        className="flex gap-1 rounded-xl border border-line bg-raised/40 p-1"
      >
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.label}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={[
                "flex-1 cursor-pointer rounded-lg px-2 py-2.5 text-[13px] font-semibold transition-colors sm:py-2 sm:text-xs",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
                active
                  ? "bg-market text-on-market"
                  : "text-muted hover:bg-raised hover:text-foreground",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
