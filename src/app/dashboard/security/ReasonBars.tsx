import { formatNumber } from "@/lib/format";
import type { ReasonStat } from "@/lib/server/services/securityEventService";
import { reasonLabel } from "./securityLabels";

/**
 * Häufigste Gründe für abgewiesene Vorgänge.
 *
 * Alle Balken tragen dieselbe Farbe: die Kategorien haben keine Rangfolge, und
 * ein Farbverlauf nach Größe würde nur die Balkenlänge ein zweites Mal
 * erzählen. Der Wert steht am Balkenende, damit die Grafik ohne Achse auskommt.
 */
export function ReasonBars({ reasons }: { reasons: ReasonStat[] }) {
  const max = Math.max(...reasons.map((reason) => reason.count), 1);

  return (
    <ul className="grid gap-3">
      {reasons.map((reason) => (
        <li key={reason.reason} className="grid gap-1">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate">{reasonLabel(reason.reason)}</span>
            <span className="shrink-0 tabular-nums text-muted">{formatNumber(reason.count)}</span>
          </div>
          <div className="h-2.5 w-full rounded-r-[4px] bg-raised">
            <div
              className="h-full rounded-r-[4px] bg-chart-accent"
              style={{ width: `${Math.max((reason.count / max) * 100, 2)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
