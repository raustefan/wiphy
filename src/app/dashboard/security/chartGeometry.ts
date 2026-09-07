/**
 * Geometrie für die SVG-Diagramme der Sicherheitsseite.
 *
 * Reine Funktionen ohne React, damit die Diagrammkomponenten nur noch Markup
 * sind — und damit die Rundungen und Achsenschritte an einer Stelle stehen
 * statt in jedem Chart neu erfunden zu werden.
 */

export type Scale = {
  /** Oberes Achsenende, immer ein glatter Wert. */
  max: number;
  ticks: number[];
};

/**
 * Achsenteilung auf glatte Schritte (1 / 2 / 5 × 10^n). Krumme Maxima wie 37
 * ergeben sonst Beschriftungen wie „9,25“, die niemand liest.
 */
export function niceScale(max: number, tickCount = 4): Scale {
  if (!Number.isFinite(max) || max <= 0) {
    return { max: 1, ticks: [0, 1] };
  }

  const rawStep = max / tickCount;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;
  const step = (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) * magnitude;
  const top = Math.ceil(max / step) * step;

  const ticks: number[] = [];
  for (let value = 0; value <= top + step / 1000; value += step) {
    ticks.push(Math.round(value * 1000) / 1000);
  }
  return { max: top, ticks };
}

/**
 * Säule mit abgerundetem Datenende und rechtwinkligem Fuß auf der Nulllinie.
 * Ein rundum abgerundetes Rechteck würde den Fuß von der Achse abheben und den
 * Wert dadurch kleiner aussehen lassen als er ist.
 */
export function columnPath(x: number, y: number, width: number, height: number, radius = 4) {
  const r = Math.max(0, Math.min(radius, width / 2, height));
  const bottom = y + height;
  return [
    `M ${x} ${bottom}`,
    `L ${x} ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    `L ${x + width - r} ${y}`,
    `Q ${x + width} ${y} ${x + width} ${y + r}`,
    `L ${x + width} ${bottom}`,
    "Z",
  ].join(" ");
}

export type SparkGeometry = {
  line: string;
  area: string;
  peak: { x: number; y: number; value: number; index: number } | null;
};

/**
 * Linien- und Flächenpfad für die kleinen Verlaufsgrafiken. Der Höhepunkt wird
 * mitgeliefert, weil er der einzige Punkt ist, den wir direkt beschriften —
 * eine Zahl an jedem Tag wäre unlesbar.
 */
export function sparkGeometry(
  values: number[],
  width: number,
  height: number,
  max: number,
): SparkGeometry {
  if (values.length === 0) {
    return { line: "", area: "", peak: null };
  }

  const top = Math.max(max, 1);
  const stepX = values.length > 1 ? width / (values.length - 1) : 0;
  const pointFor = (value: number, index: number) => ({
    x: index * stepX,
    y: height - (value / top) * height,
  });

  const points = values.map(pointFor);
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
  const area = `${line} L ${points[points.length - 1].x.toFixed(2)} ${height} L ${points[0].x.toFixed(2)} ${height} Z`;

  let peakIndex = 0;
  for (let index = 1; index < values.length; index += 1) {
    if (values[index] > values[peakIndex]) peakIndex = index;
  }
  const peak =
    values[peakIndex] > 0
      ? { ...pointFor(values[peakIndex], peakIndex), value: values[peakIndex], index: peakIndex }
      : null;

  return { line, area, peak };
}

/** `2026-09-04` → `04.09.` — ohne Date-Objekt, damit keine Zeitzone dazwischenfunkt. */
export function shortDayLabel(dayKey: string) {
  const [, month, day] = dayKey.split("-");
  return `${day}.${month}.`;
}

/** `2026-09-04` → `4. September 2026`. */
const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

export function longDayLabel(dayKey: string) {
  const [year, month, day] = dayKey.split("-");
  return `${Number(day)}. ${MONTHS[Number(month) - 1]} ${year}`;
}

/**
 * Jede wievielte Tagesbeschriftung gezeichnet wird. Bei 90 Tagen stünden sonst
 * 90 Datumsangaben auf 700 Pixeln übereinander.
 */
export function labelStride(count: number, maxLabels = 7) {
  return Math.max(1, Math.ceil(count / maxLabels));
}
