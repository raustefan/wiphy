import { formatNumber } from "@/lib/format";

/**
 * Verlauf einer Auslastung in Prozent über die letzten Messungen.
 *
 * Die Skala steht fest auf 0–100 %: eine mitwachsende Achse ließe 3 % CPU
 * wie Volllast aussehen. Die x-Achse hat einen festen Platz je Messung, neue
 * Werte laufen von rechts ein — kurz nach dem Öffnen ist der Verlauf also
 * noch kurz, statt über die ganze Breite gestreckt zu werden.
 */

// Schmaler Bildausschnitt, damit die Beschriftung auf dem Handy nicht auf
// Fußnotengröße zusammenschrumpft.
const VIEW = { width: 420, height: 150 };
const PAD = { top: 10, right: 8, bottom: 22, left: 40 };
const PLOT = {
  width: VIEW.width - PAD.left - PAD.right,
  height: VIEW.height - PAD.top - PAD.bottom,
};
const TICKS = [0, 25, 50, 75, 100];

export type UsagePoint = { at: number; value: number; detail: string };

export function UsageChart({
  label,
  points,
  slots,
  intervalSeconds,
}: {
  label: string;
  points: UsagePoint[];
  /** Anzahl Messplätze auf der x-Achse. */
  slots: number;
  intervalSeconds: number;
}) {
  const step = PLOT.width / Math.max(slots - 1, 1);
  const offset = slots - points.length;
  const toX = (index: number) => PAD.left + (offset + index) * step;
  const toY = (value: number) => PAD.top + PLOT.height - (value / 100) * PLOT.height;

  const line = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${toX(index).toFixed(2)} ${toY(point.value).toFixed(2)}`)
    .join(" ");
  const baseline = PAD.top + PLOT.height;
  const area =
    points.length > 1
      ? `${line} L ${toX(points.length - 1).toFixed(2)} ${baseline} L ${toX(0).toFixed(2)} ${baseline} Z`
      : "";
  const last = points.at(-1);
  const minutes = Math.round((slots * intervalSeconds) / 60);

  return (
    <svg
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      className="h-auto w-full"
      role="img"
      aria-label={`${label} der letzten ${minutes} Minuten${last ? `, aktuell ${formatNumber(last.value)} %` : ""}.`}
    >
      {TICKS.map((tick) => (
        <g key={tick}>
          <line
            x1={PAD.left}
            x2={PAD.left + PLOT.width}
            y1={toY(tick)}
            y2={toY(tick)}
            stroke={tick === 0 ? "var(--line-strong)" : "var(--line)"}
            strokeWidth={1}
          />
          <text
            x={PAD.left - 8}
            y={toY(tick)}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={11}
            className="fill-faint tabular-nums"
          >
            {tick} %
          </text>
        </g>
      ))}

      <text x={PAD.left} y={VIEW.height - 6} fontSize={11} className="fill-faint">
        vor {minutes} Min.
      </text>
      <text x={PAD.left + PLOT.width} y={VIEW.height - 6} textAnchor="end" fontSize={11} className="fill-faint">
        jetzt
      </text>

      {area && <path d={area} fill="var(--chart-accent)" fillOpacity={0.12} />}
      {points.length > 1 && (
        <path
          d={line}
          fill="none"
          stroke="var(--chart-accent)"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
      {last && (
        // Ring in Flächenfarbe: der aktuelle Punkt bleibt auf der Linie sichtbar.
        <circle
          cx={toX(points.length - 1)}
          cy={toY(last.value)}
          r={4}
          fill="var(--chart-accent)"
          stroke="var(--surface)"
          strokeWidth={2}
        />
      )}

      {/* Ein Greifbereich je Messung, breiter als die Linie selbst. */}
      {points.map((point, index) => (
        <rect
          key={point.at}
          x={toX(index) - step / 2}
          y={PAD.top}
          width={step}
          height={PLOT.height}
          className="fill-transparent hover:fill-foreground/6"
        >
          <title>{point.detail}</title>
        </rect>
      ))}
    </svg>
  );
}
