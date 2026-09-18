import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Die Wortmarke als Data-URL für PDF-Dokumente.
 *
 * `@react-pdf/renderer` rendert außerhalb des Browsers und lädt keine relative
 * URL nach — das Bild muss als Bytes im Dokument ankommen (dieselbe Lage wie
 * bei `opengraph-image.tsx`).
 *
 * Einmal gelesen und dann behalten: die Datei ändert sich nur beim Deployment,
 * und jeder Download würde sie sonst erneut von der Platte holen und neu in
 * Base64 umschreiben. Schlägt das Lesen fehl, bleibt es bei `null` statt bei
 * einem Fehler — ein Zertifikat ohne Wortmarke ist besser als keines.
 */
let cached: Promise<string | null> | null = null;

export function loadLogoDataUrl(): Promise<string | null> {
  cached ??= readFile(join(process.cwd(), "public", "logo-plain.png"))
    .then((bytes) => `data:image/png;base64,${bytes.toString("base64")}`)
    .catch(() => null);

  return cached;
}
