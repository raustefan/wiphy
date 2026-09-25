/**
 * Bewertung der Passwortstärke — bewusst als reine Funktion ohne Abhängigkeit,
 * damit sie sowohl im Formular als auch im Test läuft.
 *
 * Die Bewertung ist eine Heuristik, kein Sicherheitsversprechen: sie soll beim
 * Wählen helfen und nicht behaupten, ein Passwort sei „geknackt in X Jahren“.
 * Deshalb vier grobe Stufen statt einer Prozentzahl — eine Zahl mit zwei
 * Nachkommastellen suggeriert eine Genauigkeit, die eine Abschätzung über den
 * Zeichenvorrat nicht hat.
 *
 * Gezählt wird beides: Länge *und* Vielfalt. Nur Vielfalt zu belohnen würde
 * „Aa1!“ über „gartenzaunblauwolke“ stellen, obwohl das lange Passwort um
 * Größenordnungen mehr Versuche kostet.
 */

/** 0 = unbrauchbar, 4 = sehr stark. Die Skala des Balkens im Formular. */
export type PasswordScore = 0 | 1 | 2 | 3 | 4;

export type PasswordCriterion = {
  id: "length" | "case" | "digit" | "symbol";
  label: string;
  met: boolean;
};

export type PasswordStrength = {
  score: PasswordScore;
  /** Kurzurteil für die Anzeige neben dem Balken. */
  label: string;
  /** Alle Kriterien samt Status — erfüllte werden mit angezeigt, nicht nur die offenen. */
  criteria: PasswordCriterion[];
};

/** Die Mindestlänge aus `registerSchema`. Kürzer ist immer Stufe 0. */
export const PASSWORD_MIN_LENGTH = 8;

const SCORE_LABELS: Record<PasswordScore, string> = {
  0: "Zu schwach",
  1: "Schwach",
  2: "Geht so",
  3: "Stark",
  4: "Sehr stark",
};

/**
 * Muster, die ein Wörterbuchangriff in Sekunden durchprobiert. Der Treffer
 * deckelt die Bewertung, statt Punkte abzuziehen: „Passwort2024!“ erfüllt alle
 * Zeichenklassen und käme sonst als „sehr stark“ durch.
 */
const WEAK_PATTERNS = [
  /passwor[dt]/i,
  /geheim/i,
  /qwert|asdf|yxcv/i,
  /12345|abcde/i,
  /willkommen|sommer|winter|hallo/i,
];

/** Drei gleiche Zeichen am Stück („aaa“, „111“) — typisch fürs Auffüllen auf die Mindestlänge. */
const REPEATED_RUN = /(.)\1{2,}/;

export function evaluatePassword(password: string): PasswordStrength {
  const hasLower = /[a-zäöüß]/.test(password);
  const hasUpper = /[A-ZÄÖÜ]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^\p{L}\p{N}]/u.test(password);

  const criteria: PasswordCriterion[] = [
    {
      id: "length",
      label: `Mindestens ${PASSWORD_MIN_LENGTH} Zeichen`,
      met: password.length >= PASSWORD_MIN_LENGTH,
    },
    { id: "case", label: "Groß- und Kleinbuchstaben", met: hasLower && hasUpper },
    { id: "digit", label: "Mindestens eine Ziffer", met: hasDigit },
    { id: "symbol", label: "Mindestens ein Sonderzeichen", met: hasSymbol },
  ];

  if (password.length < PASSWORD_MIN_LENGTH) {
    return { score: 0, label: SCORE_LABELS[0], criteria };
  }

  // Grobe Schätzung des Suchraums: Zeichenvorrat hoch Länge, in Bit. Das ist
  // die einzige Rechnung, die Länge und Vielfalt in derselben Einheit
  // vergleichbar macht — mit Punkten je Merkmal landete eine lange Passphrase
  // auf derselben Stufe wie „Aa1!bcde“, obwohl sie um Größenordnungen mehr
  // Versuche kostet.
  const alphabet =
    (hasLower ? 26 : 0) + (hasUpper ? 26 : 0) + (hasDigit ? 10 : 0) + (hasSymbol ? 33 : 0);
  const bits = password.length * Math.log2(alphabet);

  let score: PasswordScore = 1;
  if (bits >= 85) score = 4;
  else if (bits >= 60) score = 3;
  else if (bits >= 45) score = 2;

  // Der Suchraum oben gilt nur für zufällig gewählte Zeichen. Ein Passwort aus
  // dem Wörterbuch oder mit aufgefüllter Wiederholung fällt bei einem gezielten
  // Angriff lange vorher, also wird die Stufe gedeckelt statt verrechnet.
  if (WEAK_PATTERNS.some((pattern) => pattern.test(password))) {
    score = Math.min(score, 1) as PasswordScore;
  } else if (REPEATED_RUN.test(password)) {
    score = Math.min(score, 2) as PasswordScore;
  }

  return { score, label: SCORE_LABELS[score], criteria };
}

/** Ohne leicht verwechselbare Zeichen (0/O, 1/l/I) — das Passwort wird oft abgetippt. */
const GENERATOR_ALPHABET = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!#$%&*+-=?@_";

/** Zufälliges Passwort mit Stufe „sehr stark“, über die Web-Crypto-API (Browser und Node). */
export function generatePassword(length = 20): string {
  for (;;) {
    const values = crypto.getRandomValues(new Uint32Array(length));
    const password = Array.from(values, (v) => GENERATOR_ALPHABET[v % GENERATOR_ALPHABET.length]).join("");
    // Selten fehlt eine Zeichenklasse oder es entsteht ein „aaa“ — dann neu würfeln.
    const { score, criteria } = evaluatePassword(password);
    if (score === 4 && criteria.every((c) => c.met)) return password;
  }
}
