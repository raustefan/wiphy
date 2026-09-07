import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import { formatNumber } from "@/lib/format";
import type { DayBucket } from "@/lib/server/services/securityEventService";
import { columnPath, labelStride, longDayLabel, niceScale, shortDayLabel } from "./chartGeometry";

/**
 * Tagesverlauf aller protokollierten Vorgänge, gestapelt nach Ergebnis.
 *
 * Die Stapelreihenfolge (erfolgreich → abgewehrt → fehlgeschlagen) ist keine
 * Geschmacksfrage: Grün und Rot direkt aneinander sind bei Rot-Grün-Schwäche
 * praktisch dieselbe Farbe. Blau dazwischen trennt beide Nachbarschaften
 * sicher. Wer die Reihenfolge ändert, macht die Grafik für rund 8 % der Männer
 * unlesbar.
 */

const VIEW = { width: 760, height: 250 };
const PAD = { top: 12, right: 12, bottom: 26, left: 42 };

const PLOT = {
  width: VIEW.width - PAD.left - PAD.right,
  height: VIEW.height - PAD.top - PAD.bottom,
};

/** Weißer Trennabstand zwischen zwei gestapelten Abschnitten. */
const GAP = 2;

const SEGMENTS = [
  { key: "success", label: "Erfolgreich", color: "var(--chart-success)" },
  { key: "blocked", label: "Abgewehrt", color: "var(--chart-blocked)" },
  { key: "failure", label: "Fehlgeschlagen", color: "var(--chart-failure)" },
] as const;

export function OutcomeTimeline({ daily }: { daily: DayBucket[] }) {
  const scale = niceScale(Math.max(...daily.map((day) => day.total), 0));
  const band = PLOT.width / Math.max(daily.length, 1);
  const barWidth = Math.max(2, Math.min(24, band - Math.max(2, band * 0.25)));
  const stride = labelStride(daily.length);
  // Der Radius wächst mit der Balkenbreite: 4 px auf einem 5 px schmalen Balken
  // (90-Tage-Ansicht) machen aus dem Datenende eine Kugel statt einer Säule.
  const radius = Math.min(4, barWidth / 4);
  const toY = (value: number) => PAD.top + PLOT.height - (value / scale.max) * PLOT.height;

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Tagesverlauf der protokollierten Vorgänge über ${daily.length} Tage, gestapelt nach Ergebnis.`}
      >
        {/* Raster: Haarlinien, eine Stufe von der Fläche abgesetzt. */}
        {scale.ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={PAD.left + PLOT.width}
              y1={toY(tick)}
              y2={toY(tick)}
              stroke="var(--line)"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 8}
              y={toY(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={10}
              className="fill-faint tabular-nums"
            >
              {formatNumber(tick)}
            </text>
          </g>
        ))}

        {daily.map((day, index) => {
          const x = PAD.left + index * band + (band - barWidth) / 2;
          const topSegment = [...SEGMENTS].reverse().find((segment) => day[segment.key] > 0);
          let cursor = PAD.top + PLOT.height;

          return (
            <g key={day.day}>
              {SEGMENTS.map((segment) => {
                const value = day[segment.key];
                if (value <= 0) return null;

                const full = (value / scale.max) * PLOT.height;
                const isTop = segment.key === topSegment?.key;
                // Der Abstand wird oben abgezogen, nie unten: sonst schwebte der
                // unterste Abschnitt über der Nulllinie.
                const height = Math.max(1, full - (isTop ? 0 : GAP));
                const y = cursor - full;
                cursor -= full;

                return (
                  <path
                    key={segment.key}
                    d={columnPath(x, y + (full - height), barWidth, height, isTop ? radius : 0)}
                    fill={segment.color}
                  />
                );
              })}

              {/* Trefferfläche über die volle Höhe: der Tageswert lässt sich auch
                  dann greifen, wenn die Säule nur zwei Pixel hoch ist. */}
              <rect
                x={PAD.left + index * band}
                y={PAD.top}
                width={band}
                height={PLOT.height}
                className="fill-transparent hover:fill-foreground/6"
              >
                <title>
                  {`${longDayLabel(day.day)}\n${formatNumber(day.total)} Vorgänge\n· ${formatNumber(day.success)} erfolgreich\n· ${formatNumber(day.blocked)} abgewehrt\n· ${formatNumber(day.failure)} fehlgeschlagen`}
                </title>
              </rect>
            </g>
          );
        })}

        {/* Nulllinie kräftiger als das Raster — sie ist der Bezugspunkt. */}
        <line
          x1={PAD.left}
          x2={PAD.left + PLOT.width}
          y1={PAD.top + PLOT.height}
          y2={PAD.top + PLOT.height}
          stroke="var(--line-strong)"
          strokeWidth={1}
        />

        {daily.map((day, index) =>
          index % stride === 0 ? (
            <text
              key={day.day}
              x={PAD.left + index * band + band / 2}
              y={VIEW.height - 8}
              textAnchor="middle"
              fontSize={10}
              className="fill-faint tabular-nums"
            >
              {shortDayLabel(day.day)}
            </text>
          ) : null,
        )}
      </svg>

      <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <LegendItem color="var(--chart-success)" icon={<CheckCircle2 size={14} aria-hidden="true" />} label="Erfolgreich" />
        <LegendItem color="var(--chart-blocked)" icon={<ShieldCheck size={14} aria-hidden="true" />} label="Abgewehrt" />
        <LegendItem color="var(--chart-failure)" icon={<XCircle size={14} aria-hidden="true" />} label="Fehlgeschlagen" />
      </figcaption>
    </figure>
  );
}

/**
 * Farbe steht nie allein: Statusfarben tragen immer Symbol und Text, sonst
 * hängt die Aussage an einer Eigenschaft, die nicht jeder wahrnimmt.
 */
function LegendItem({ color, icon, label }: { color: string; icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-muted">
      <span className="size-2.5 shrink-0 rounded-[3px]" style={{ background: color }} aria-hidden="true" />
      <span className="text-faint">{icon}</span>
      {label}
    </span>
  );
}
