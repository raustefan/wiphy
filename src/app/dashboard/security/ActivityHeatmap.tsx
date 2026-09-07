import { formatNumber } from "@/lib/format";
import type { ActivityHeatmap as ActivityHeatmapData } from "@/lib/server/services/securityEventService";

/**
 * Vorgänge nach Wochentag und Stunde.
 *
 * Einfarbige Rampe, nur über die Helligkeit gestuft: die Zellen unterscheiden
 * sich in einer *Menge*, und dafür ist Farbe als Identitätsmerkmal die falsche
 * Wahl — ein Regenbogen würde eine Ordnung der Farbtöne behaupten, die niemand
 * ablesen kann. Die fünf Stufen und ihre Abstände sind in `globals.css`
 * dokumentiert und geprüft.
 *
 * Leere Stunden bekommen bewusst *keine* Rampenfarbe, sondern die neutrale
 * Fläche: „nichts passiert“ ist kein kleiner Wert, sondern gar keiner.
 */

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const WEEKDAYS_LONG = [
  "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag",
];

/** Fünf Stufen — mehr kann das Auge in einer Fläche dieser Größe nicht trennen. */
const STEPS = 5;

/**
 * Obergrenze jeder Stufe. Lineare Teilung des Höchstwerts: sie ist die einzige,
 * die sich in der Legende als ehrliche Spanne beschriften lässt. Eine
 * Quantilteilung sähe gleichmäßiger aus, würde aber verschweigen, wie weit die
 * Spitze über dem Rest liegt.
 */
function stepBounds(max: number): number[] {
  return Array.from({ length: STEPS }, (_, index) =>
    Math.max(index + 1, Math.ceil(((index + 1) * max) / STEPS)),
  );
}

function stepOf(value: number, bounds: number[]): number {
  if (value <= 0) return 0;
  const index = bounds.findIndex((bound) => value <= bound);
  return index === -1 ? STEPS : index + 1;
}

/** `7` → `07:00`. */
function hourLabel(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export function ActivityHeatmap({ data }: { data: ActivityHeatmapData }) {
  const bounds = stepBounds(data.max);

  return (
    <figure className="m-0">
      <div
        className="grid gap-[2px] text-xs"
        style={{ gridTemplateColumns: "2.25rem repeat(24, minmax(0, 1fr))" }}
        role="img"
        aria-label={`Raster der protokollierten Vorgänge nach Wochentag und Stunde. Insgesamt ${formatNumber(data.total)} Vorgänge, Spitzenwert ${formatNumber(data.max)} in einer Stunde.`}
      >
        {data.rows.map((row, weekday) => (
          <div key={weekday} className="contents">
            <span className="flex items-center pr-1 text-faint tabular-nums">
              {WEEKDAYS[weekday]}
            </span>
            {row.map((cell) => {
              const step = stepOf(cell.total, bounds);
              return (
                <span
                  key={cell.hour}
                  className="aspect-square rounded-[2px]"
                  style={{
                    // Stufe 0 ist keine Rampenfarbe, sondern die ruhige Fläche.
                    background: step === 0 ? "var(--raised)" : `var(--chart-seq-${step})`,
                  }}
                  title={
                    cell.total === 0
                      ? `${WEEKDAYS_LONG[weekday]}, ${hourLabel(cell.hour)} — keine Vorgänge`
                      : `${WEEKDAYS_LONG[weekday]}, ${hourLabel(cell.hour)}\n${formatNumber(cell.total)} Vorgänge\n· ${formatNumber(cell.success)} erfolgreich\n· ${formatNumber(cell.blocked)} abgewehrt\n· ${formatNumber(cell.failure)} fehlgeschlagen`
                  }
                />
              );
            })}
          </div>
        ))}

        {/* Stundenbeschriftung nur alle drei Stunden — 24 Zahlen nebeneinander
            wären auf einem Telefon ein grauer Strich. */}
        <span />
        {Array.from({ length: 24 }, (_, hour) => (
          <span key={hour} className="pt-1 text-center text-[10px] text-faint tabular-nums">
            {hour % 3 === 0 ? String(hour).padStart(2, "0") : ""}
          </span>
        ))}
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="size-3 shrink-0 rounded-[2px] border border-line"
            style={{ background: "var(--raised)" }}
            aria-hidden="true"
          />
          keine
        </span>
        {bounds.map((bound, index) => {
          const from = index === 0 ? 1 : bounds[index - 1] + 1;
          if (from > bound) return null;
          return (
            <span key={bound} className="inline-flex items-center gap-1.5">
              <span
                className="size-3 shrink-0 rounded-[2px]"
                style={{ background: `var(--chart-seq-${index + 1})` }}
                aria-hidden="true"
              />
              <span className="tabular-nums">
                {from === bound ? formatNumber(bound) : `${formatNumber(from)}–${formatNumber(bound)}`}
              </span>
            </span>
          );
        })}
        <span className="text-faint">Vorgänge je Stunde</span>
      </figcaption>
    </figure>
  );
}
