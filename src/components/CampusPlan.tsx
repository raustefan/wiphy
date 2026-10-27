import plan from "@/components/campusPlan.json";
import PauseOffscreen from "@/components/PauseOffscreen";

/**
 * Lageplan des Oberen Eselsbergs als Blaupause hinter dem Hero. Straßen und
 * Gebäude zeichnen sich beim Laden einmal selbst, in Wellen von der Uni Ost
 * nach außen (Stile in globals.css, `.plan`). Erzeugt mit
 * scripts/campus-plan.py aus OpenStreetMap-Daten.
 */
export default function CampusPlan({ className }: { className?: string }) {
  const svg = {
    viewBox: `0 0 ${plan.w} ${plan.h}`,
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": true,
  } as const;

  return (
    <>
      <svg {...svg} className={`plan ${className ?? ""}`}>
        <g className="plan-roads">
          {plan.roads.map((d, i) => (
            <path key={i} d={d} pathLength={1} />
          ))}
        </g>
        <g className="plan-tram">
          {plan.tram.map((d, i) => (
            <path key={i} d={d} />
          ))}
          {plan.trams.flatMap((tram, i) =>
            tram.halts.map(([x, y]) => <circle key={`${i}-${x}-${y}`} cx={x} cy={y} r={6} />),
          )}
        </g>
        {plan.rings.map((ring, i) => (
          <g key={i} className="plan-buildings" style={{ "--i": i } as React.CSSProperties}>
            {ring.map((d, j) => (
              <path key={j} d={d} pathLength={1} />
            ))}
          </g>
        ))}
      </svg>

      {/* Linie 2, je Richtung eine Bahn: hält an jeder Haltestelle, bremst
          und fährt an (Fahrplan aus dem Generator). SMIL statt CSS, weil nur
          `animateMotion` Bahn und Drehung zugleich einem Pfad folgen lässt.
          Eigenes SVG, damit der Plan darunter nicht in jedem Bild neu gemalt
          wird. Die zweite Bahn startet eine halbe Runde später. */}
      <PauseOffscreen className={`plan-trams ${className ?? ""}`}>
        <svg {...svg} className="plan size-full">
          {plan.trams.map((tram, i) => {
            const timing = { dur: `${tram.dur}s`, begin: `${3 + (i * tram.dur) / 2}s`, repeatCount: "indefinite" };
            return (
              <rect key={i} x={-21} y={-4.5} width={42} height={9} rx={4.5} opacity={0}>
                <animateMotion
                  {...timing}
                  path={tram.d}
                  rotate="auto"
                  calcMode="spline"
                  keyPoints={tram.keyPoints}
                  keyTimes={tram.keyTimes}
                  keySplines={tram.keySplines}
                />
                <animate {...timing} attributeName="opacity" values="0;1;1;0" keyTimes={tram.fade} />
              </rect>
            );
          })}
        </svg>
      </PauseOffscreen>
    </>
  );
}
