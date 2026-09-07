import { formatNumber } from "@/lib/format";
import type { TypeStat } from "@/lib/server/services/securityEventService";
import { Card } from "@/components/ui";
import { longDayLabel, sparkGeometry } from "./chartGeometry";
import { typeHint, typeLabel } from "./securityLabels";

/**
 * Kleine Verlaufsgrafiken je Vorgangsart („small multiples“).
 *
 * Bewusst sieben getrennte Bilder statt sieben Linien in einem: sieben
 * Kategoriefarben lassen sich nicht mehr sicher auseinanderhalten, und die
 * Anmeldungen würden alles andere plattdrücken. Jede Grafik hat deshalb ihre
 * eigene Skala — damit niemand die Höhen zwischen den Kacheln vergleicht, ist
 * die jeweilige Spitze direkt beschriftet.
 */

const SPARK = { width: 240, height: 56 };

/**
 * Luft über der Kurve für die Beschriftung der Tagesspitze. Ohne sie steht die
 * Zahl im Bild oder wird am oberen Rand abgeschnitten, sobald die Spitze den
 * Skalenanfang berührt — und das tut sie per Definition immer.
 */
const HEADROOM = 18;

export function TypeSparklines({ stats, dayKeys }: { stats: TypeStat[]; dayKeys: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <TypeCard key={stat.type} stat={stat} dayKeys={dayKeys} />
      ))}
    </div>
  );
}

function TypeCard({ stat, dayKeys }: { stat: TypeStat; dayKeys: string[] }) {
  const max = Math.max(...stat.series, 0);
  const { line, area, peak } = sparkGeometry(stat.series, SPARK.width, SPARK.height, max);
  const successRate = stat.total > 0 ? Math.round((stat.success / stat.total) * 100) : null;

  return (
    <Card className="p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold">{typeLabel(stat.type)}</h3>
        <span className="text-lg font-semibold">{formatNumber(stat.total)}</span>
      </div>

      <svg
        viewBox={`0 0 ${SPARK.width} ${SPARK.height + HEADROOM}`}
        className="mt-2 h-auto w-full"
        role="img"
        aria-label={`Verlauf „${typeLabel(stat.type)}“: ${formatNumber(stat.total)} Vorgänge, Spitze ${formatNumber(max)} an einem Tag.`}
      >
        <g transform={`translate(0 ${HEADROOM})`}>
          {stat.total > 0 && (
            <>
              <path d={area} fill="var(--chart-accent)" fillOpacity={0.1} />
              <path
                d={line}
                fill="none"
                stroke="var(--chart-accent)"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {peak && (
                <>
                  {/* Ring in Flächenfarbe: der Punkt bleibt lesbar, wo er die Linie kreuzt. */}
                  <circle cx={peak.x} cy={peak.y} r={4} fill="var(--chart-accent)" stroke="var(--surface)" strokeWidth={2} />
                  <text
                    x={Math.min(Math.max(peak.x, 12), SPARK.width - 12)}
                    // Darf in die Kopfluft hineinragen, aber nicht darüber hinaus:
                    // die Spitze liegt bauartbedingt immer am oberen Rand.
                    y={Math.max(peak.y - 9, 10 - HEADROOM)}
                    textAnchor="middle"
                    fontSize={10}
                    className="fill-muted tabular-nums"
                  >
                    {formatNumber(peak.value)}
                  </text>
                </>
              )}
            </>
          )}

          <line
            x1={0}
            x2={SPARK.width}
            y1={SPARK.height}
            y2={SPARK.height}
            stroke="var(--line)"
            strokeWidth={1}
          />

          {/* Ein Greifbereich je Tag — sonst wäre der Tageswert nur über die Tabelle zu bekommen. */}
          {stat.series.map((value, index) => (
            <rect
              key={dayKeys[index] ?? index}
              x={(index * SPARK.width) / stat.series.length}
              y={0}
              width={SPARK.width / stat.series.length}
              height={SPARK.height}
              className="fill-transparent hover:fill-foreground/6"
            >
              <title>{`${longDayLabel(dayKeys[index] ?? "")}: ${formatNumber(value)}`}</title>
            </rect>
          ))}
        </g>
      </svg>

      <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-chart-success" aria-hidden="true" />
          <dt className="sr-only">Erfolgreich</dt>
          <dd className="tabular-nums">{formatNumber(stat.success)}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-chart-blocked" aria-hidden="true" />
          <dt className="sr-only">Abgewehrt</dt>
          <dd className="tabular-nums">{formatNumber(stat.blocked)}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-chart-failure" aria-hidden="true" />
          <dt className="sr-only">Fehlgeschlagen</dt>
          <dd className="tabular-nums">{formatNumber(stat.failure)}</dd>
        </div>
        {successRate !== null && <div className="ml-auto">Erfolgsquote {successRate} %</div>}
      </dl>

      <p className="mt-2 text-xs leading-relaxed text-faint">{typeHint(stat.type)}</p>
    </Card>
  );
}
