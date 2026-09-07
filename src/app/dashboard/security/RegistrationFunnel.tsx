import { ArrowDown, Trash2 } from "lucide-react";
import { formatNumber } from "@/lib/format";
import type { RegistrationFunnel as FunnelData } from "@/lib/server/services/securityEventService";

/**
 * Der Weg vom Registrierungsformular bis zur beschlossenen Mitgliedschaft.
 *
 * Alle Balken teilen sich dieselbe Grundlinie und dieselbe Skala — die Breite
 * ist immer der Anteil an der ersten Stufe. Die verbreitete Trichterform mit
 * mittig zulaufenden Trapezen sieht hübscher aus, verschiebt aber jede Stufe
 * gegen die vorige und macht damit genau den Vergleich schwer, für den die
 * Grafik da ist.
 *
 * Die Farben sind eine Reihenfolge, keine Kategorien: ein Farbton, von Stufe zu
 * Stufe dunkler. Man sieht die Richtung des Ablaufs also auch dann, wenn zwei
 * Stufen zufällig gleich lang sind.
 */

type Stage = {
  key: keyof FunnelData;
  label: string;
  hint: string;
  /** Wie der Übergang von der vorigen Stufe zu lesen ist. */
  transition?: string;
};

const STAGES: Stage[] = [
  {
    key: "registered",
    label: "Registriert",
    hint: "Konto über das öffentliche Formular angelegt.",
  },
  {
    key: "verified",
    label: "E-Mail bestätigt",
    hint: "Link aus der Registrierungsmail geklickt.",
    transition: "bestätigen ihre Adresse",
  },
  {
    key: "applied",
    label: "Mitgliedschaft beantragt",
    hint: "Aufnahmeantrag im Mitgliederbereich eingereicht.",
    transition: "stellen einen Aufnahmeantrag",
  },
  {
    key: "accepted",
    label: "Aufgenommen",
    hint: "Antrag vom Vorstand angenommen.",
    transition: "werden aufgenommen",
  },
];

function share(value: number, base: number) {
  return base > 0 ? Math.round((value / base) * 100) : null;
}

export function RegistrationFunnel({ data, days }: { data: FunnelData; days: number }) {
  const base = Math.max(data.registered, 1);

  return (
    <figure className="m-0">
      <ol className="grid gap-0">
        {STAGES.map((stage, index) => {
          const value = data[stage.key];
          const previous = index > 0 ? data[STAGES[index - 1].key] : null;
          const step = share(value, previous ?? 0);
          const lost = previous !== null ? previous - value : 0;

          return (
            <li key={stage.key} className="grid gap-1.5">
              {/* Übergang zwischen zwei Stufen: der Prozentsatz bezieht sich
                  immer auf die *vorige* Stufe, nicht auf die erste — sonst
                  liest man denselben Verlust mehrfach. */}
              {index > 0 && (
                <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 py-2 pl-1 text-xs text-muted">
                  <ArrowDown size={13} className="shrink-0 text-faint" aria-hidden="true" />
                  {step === null ? (
                    <span className="text-faint">keine Grundlage im Zeitraum</span>
                  ) : (
                    <>
                      <span className="font-semibold tabular-nums text-foreground">{step} %</span>
                      <span>{stage.transition}</span>
                      {lost > 0 && (
                        <span className="text-faint">
                          · {formatNumber(lost)} nicht weiter
                        </span>
                      )}
                    </>
                  )}
                </p>
              )}

              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 text-sm font-medium">{stage.label}</span>
                <span className="shrink-0 text-sm font-semibold tabular-nums">
                  {formatNumber(value)}
                </span>
              </div>

              <div className="h-3 w-full rounded-[4px] bg-raised">
                <div
                  className="h-full rounded-[4px]"
                  style={{
                    // Mindestbreite, damit eine Stufe mit wenigen Vorgängen
                    // sichtbar bleibt statt zu einem Strich zu werden.
                    width: value > 0 ? `${Math.max((value / base) * 100, 1.5)}%` : "0%",
                    background: `var(--chart-stage-${index + 1})`,
                  }}
                />
              </div>

              <p className="text-xs leading-relaxed text-faint">{stage.hint}</p>
            </li>
          );
        })}
      </ol>

      <figcaption className="mt-5 grid gap-3 border-t border-line pt-4 text-xs leading-relaxed text-muted">
        {data.expired > 0 && (
          <p className="flex items-start gap-2">
            <Trash2 size={13} className="mt-0.5 shrink-0 text-faint" aria-hidden="true" />
            <span>
              Zusätzlich wurden{" "}
              <span className="font-semibold tabular-nums text-foreground">
                {formatNumber(data.expired)}
              </span>{" "}
              unbestätigte Registrierungen nach Ablauf der Frist automatisch gelöscht. Sie
              stecken in der ersten Stufe mit drin.
            </span>
          </p>
        )}
        <p className="text-faint">
          Gezählt wird, was in den letzten {days} Tagen passiert ist — nicht, was aus den
          Registrierungen dieses Zeitraums geworden ist. Wer sich im Mai anmeldet und im Juli
          den Antrag stellt, erscheint in beiden Zeiträumen je einmal. Für die Frage „läuft der
          Ablauf rund?“ ist das die richtige Zählweise, für „was wurde aus diesen Leuten?“ nicht.
        </p>
      </figcaption>
    </figure>
  );
}
