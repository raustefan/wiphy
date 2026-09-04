/**
 * Impressum nach § 5 TMG.
 *
 * Als Daten gepflegt, gerendert von `LegalPage` — siehe `src/lib/legal.ts`.
 */

import type { LegalDocument } from "@/lib/legal";

export const IMPRESSUM: LegalDocument = [
  {
    title: "Wirtschaftsphysik Alumni e.V.",
    blocks: [
      {
        lines: [
          "c/o Universität Ulm",
          "Studienkommission Physik",
          "Albert-Einstein-Allee 11",
          "D – 89081 Ulm",
        ],
      },
      "E-Mail: [info@wirtschaftsphysik.de](mailto:info@wirtschaftsphysik.de)",
    ],
  },
  {
    title: "Vertretungsberechtigter Vorstand",
    blocks: [
      {
        lines: [
          "Nikolas Tomek (1. Vorsitzender)",
          "Jannes Weghake (2. Vorsitzender)",
        ],
      },
    ],
  },
  {
    blocks: [
      {
        lines: [
          "Registergericht: Amtsgericht Ulm",
          "Registernummer: VR 1891",
        ],
      },
    ],
  },
  {
    title: "Bankverbindung",
    blocks: [
      {
        lines: [
          "Kontoinhaber: Wirtschaftsphysik Alumni e.V.",
          "IBAN: DE23 6305 0000 0021 0300 28",
          "BIC: SOLADES1ULM",
          "Institut: Sparkasse Ulm",
        ],
      },
    ],
  },
  {
    blocks: [
      "Homepage gestaltet von: Stefan Rau",
    ],
  },
  {
    title: "Haftungshinweis",
    blocks: [
      "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. Des Weiteren distanzieren wir uns von sämtlichen schriftlichen Äußerungen der Vereinsmitglieder, die nicht dem Vorstand angehören.",
    ],
  },
];

