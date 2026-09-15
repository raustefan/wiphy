/**
 * Der Weg in den Verein als ein einziges Modell.
 *
 * Bis hierher verteilte sich der Ablauf über drei Seiten, die nichts
 * voneinander wussten: Registrierung (`/register`), Bestätigungsmail und der
 * Antrag tief im Dashboard. Jede Seite kannte nur ihren eigenen Ausschnitt —
 * niemand sagte dem Besucher, an welcher Stelle eines vierteiligen Ablaufs er
 * gerade steht und was danach kommt.
 *
 * Die vier Stationen stehen deshalb einmal hier, und `resolveJourneyStage`
 * entscheidet allein aus dem Zustand des Kontos, welche davon dran ist. An den
 * Stationen selbst ändert das nichts: Konto, bestätigte Adresse, Antrag,
 * Beschluss des Vorstands sind unverändert nötig.
 *
 * Bewusst frei von Prisma- und Server-Importen (wie `lib/membership.ts`):
 * Seite, Fortschrittsleiste und Tests teilen sich dieselbe Entscheidung.
 */

export const JOURNEY_STEPS = [
  {
    id: "konto",
    /** Kurzform für die Leiste auf schmalen Geräten. */
    short: "Konto",
    title: "Konto erstellen",
    description:
      "Name, E-Mail-Adresse, Passwort. Ein Konto ist noch keine Mitgliedschaft — es ist der Zugang, über den du den Antrag stellst.",
  },
  {
    id: "bestaetigung",
    short: "E-Mail",
    title: "E-Mail-Adresse bestätigen",
    description:
      "Wir schicken dir einen Link. Erst wenn du ihn angeklickt hast, kannst du dich anmelden und den Antrag stellen.",
  },
  {
    id: "antrag",
    short: "Antrag",
    title: "Aufnahmeantrag ausfüllen",
    description:
      "Angaben zur Person, Zahlungsweise und die Einwilligungen — in sechs kurzen Schritten, unterbrechbar.",
  },
  {
    id: "pruefung",
    short: "Aufnahme",
    title: "Aufnahme durch den Vorstand",
    description:
      "Über die Aufnahme entscheidet der Vorstand. Bis dahin besteht weder Mitgliedschaft noch Beitragspflicht.",
  },
] as const;

export type JourneyStepId = (typeof JOURNEY_STEPS)[number]["id"];

/** `mitglied` ist keine Station, sondern das Ziel dahinter. */
export type JourneyStage = JourneyStepId | "mitglied";

export type JourneyState = {
  signedIn: boolean;
  emailVerified: boolean;
  /** Irgendein Mitgliedsstatus außer `KEIN_MITGLIED`. */
  isMember: boolean;
  hasOpenApplication: boolean;
  /**
   * Die Registrierung ist gerade durchgelaufen. Ein Konto gibt es dann schon,
   * eine Sitzung aber noch nicht — ohne dieses Signal fiele der Besucher
   * unmittelbar nach dem Absenden auf „Konto erstellen“ zurück.
   */
  justRegistered: boolean;
};

export function resolveJourneyStage(state: JourneyState): JourneyStage {
  if (state.signedIn) {
    // Zuerst geprüft: für ein Mitglied ist der ganze Ablauf gegenstandslos,
    // auch wenn aus einer früheren Runde noch ein Antrag offen stünde.
    if (state.isMember) return "mitglied";
    if (!state.emailVerified) return "bestaetigung";
    if (state.hasOpenApplication) return "pruefung";
    return "antrag";
  }
  return state.justRegistered ? "bestaetigung" : "konto";
}

/**
 * Position in der Leiste. `mitglied` liegt hinter der letzten Station — dort
 * sind alle vier erledigt.
 */
export function journeyStepIndex(stage: JourneyStage): number {
  if (stage === "mitglied") return JOURNEY_STEPS.length;
  return JOURNEY_STEPS.findIndex((step) => step.id === stage);
}
