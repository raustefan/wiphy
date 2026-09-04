/**
 * Vereins- und Designkonstanten für ausgehende E-Mails.
 *
 * Die Farben spiegeln `globals.css` (Teal = Physik, Ruby = Ökonomie), sind hier
 * aber als feste Hex-Werte hinterlegt: E-Mail-Clients kennen weder CSS-Variablen
 * noch Tailwind, jede Regel muss inline und aufgelöst im Markup stehen.
 */

export const VEREIN = {
  name: "WirtschaftsPhysik Alumni e.V.",
  tagline: "Physik · Wirtschaft · Ulm",
  email: "info@wirtschaftsphysik.de",
  address: ["c/o Universität Ulm, Studienkommission Physik", "Albert-Einstein-Allee 11", "89081 Ulm"],
  register: "Amtsgericht Ulm · VR 1891",
  /** Unterzeichnet die Mails, die im Namen des Vorstands rausgehen. */
  board: [
    { name: "Nikolas Tomek", role: "1. Vorsitzender" },
    { name: "Jannes Weghake", role: "2. Vorsitzender" },
  ],
} as const;

/** Im Footer verlinkte Seiten — Pfade werden gegen die Basis-URL absolut gemacht. */
export const FOOTER_LINKS = [
  { path: "/", label: "Website" },
  { path: "/blog", label: "Blog" },
  { path: "/kontakt", label: "Kontakt" },
  { path: "/impressum", label: "Impressum" },
  { path: "/datenschutz", label: "Datenschutz" },
] as const;

export const EMAIL_COLORS = {
  page: "#f4f4f5",
  surface: "#ffffff",
  footer: "#fafafa",
  foreground: "#18181b",
  muted: "#52525b",
  faint: "#71717a",
  line: "#e4e4e7",
  physics: "#0f766e",
  market: "#a81a52",
  onAccent: "#ffffff",
  quote: "#f8f8f9",
} as const;

/**
 * Schriftstapel für Inline-Styles. Die Familiennamen stehen in *einfachen*
 * Anführungszeichen: die Styles landen in `style="…"`-Attributen, doppelte
 * Anführungszeichen würden das Attribut mitten im Wert beenden.
 */
export const EMAIL_FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
