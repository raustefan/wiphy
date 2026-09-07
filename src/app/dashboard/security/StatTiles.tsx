import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Kennzahlen-Kacheln.
 *
 * Die großen Zahlen laufen bewusst *ohne* `tabular-nums`: Ziffern in
 * Nullbreite lassen eine „121“ in dieser Schriftgröße auseinandergerissen
 * aussehen. Gleichbreite Ziffern gehören in Tabellenspalten, nicht in
 * freistehende Zahlen.
 */

type Tone = "neutral" | "success" | "blocked" | "failure";

const TONE_DOT: Record<Tone, string> = {
  neutral: "bg-muted",
  success: "bg-chart-success",
  blocked: "bg-chart-blocked",
  failure: "bg-chart-failure",
};

export type StatTileProps = {
  label: string;
  value: number;
  previous: number;
  tone?: Tone;
  /** Bei „fehlgeschlagen“ ist ein Anstieg schlecht — das färbt die Veränderung. */
  moreIsWorse?: boolean;
  hint?: string;
};

export function StatTile({ label, value, previous, tone = "neutral", moreIsWorse, hint }: StatTileProps) {
  return (
    <div className="grid gap-1">
      <p className="flex items-center gap-2 text-sm text-muted">
        <span className={cn("size-2 shrink-0 rounded-[2px]", TONE_DOT[tone])} aria-hidden="true" />
        {label}
      </p>
      <p className="text-3xl font-semibold tracking-tight">{formatNumber(value)}</p>
      <Delta value={value} previous={previous} moreIsWorse={moreIsWorse} />
      {hint && <p className="text-xs leading-relaxed text-faint">{hint}</p>}
    </div>
  );
}

function Delta({
  value,
  previous,
  moreIsWorse,
}: {
  value: number;
  previous: number;
  moreIsWorse?: boolean;
}) {
  if (previous === 0 && value === 0) {
    return <p className="text-xs text-faint">unverändert (keine Vorgänge im Vorzeitraum)</p>;
  }

  if (previous === 0) {
    return <p className="text-xs text-faint">neu gegenüber dem Vorzeitraum</p>;
  }

  const change = Math.round(((value - previous) / previous) * 100);
  const Icon = change > 0 ? ArrowUpRight : change < 0 ? ArrowDownRight : Minus;
  const worse = moreIsWorse ? change > 0 : change < 0;
  const better = moreIsWorse ? change < 0 : change > 0;

  return (
    <p
      className={cn(
        "flex items-center gap-1 text-xs",
        change === 0 && "text-faint",
        better && "text-positive",
        worse && "text-negative",
      )}
    >
      <Icon size={13} aria-hidden="true" />
      {change > 0 ? "+" : ""}
      {formatNumber(change)} % ggü. Vorzeitraum
    </p>
  );
}
