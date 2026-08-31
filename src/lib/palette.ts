/**
 * Canvas-Palette.
 *
 * Die Simulationen zeichnen auf <canvas> und können deshalb keine CSS-Variablen
 * verwenden. Damit Grafik und Layout trotzdem exakt dieselben Farben zeigen,
 * spiegelt diese Datei die Werte aus `globals.css` (--physics, --market …) und
 * wird über `useAppearance()` an den aktuellen Hell-/Dunkelmodus gebunden.
 */

export type Appearance = "light" | "dark";

export type CanvasPalette = {
  /** Teal aus dem Vereinslogo — steht für die physikalische Seite. */
  physics: string;
  /** Ruby aus dem Vereinslogo — steht für die ökonomische Seite. */
  market: string;
  /** Vordergrund für Achsenbeschriftungen. */
  ink: string;
  /** Zurückhaltende Hilfslinien, Achsen, Raster. */
  muted: string;
};

const LIGHT: CanvasPalette = {
  physics: "0, 168, 150",
  market: "168, 26, 82",
  ink: "22, 24, 29",
  muted: "100, 116, 132",
};

const DARK: CanvasPalette = {
  physics: "45, 212, 191",
  market: "236, 92, 134",
  ink: "232, 234, 237",
  muted: "138, 150, 166",
};

export function paletteFor(appearance: Appearance): CanvasPalette {
  return appearance === "dark" ? DARK : LIGHT;
}

/** `rgba(...)`-String aus einem Palettenkanal und einer Deckkraft. */
export function rgba(channel: string, alpha: number): string {
  return `rgba(${channel}, ${alpha})`;
}
