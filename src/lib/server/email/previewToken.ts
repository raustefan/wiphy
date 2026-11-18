/**
 * Bindet den Versand einer Rundmail an die zuletzt angesehene Vorschau.
 *
 * Die Vorschau-Aktion signiert alle versandrelevanten Angaben (inklusive der
 * Prüfsummen angehängter Fotos); der Versand rechnet die Signatur neu und
 * lehnt ab, wenn irgendetwas davon abweicht. So geht genau das raus, was der
 * Absender in der Vorschau gesehen hat — erzwungen auf dem Server, nicht nur im
 * Formular. Zustandslos, ohne Datenbank.
 *
 * Ohne Server-Imports, damit der Test ihn direkt laden kann.
 */
import { createHash, createHmac, timingSafeEqual } from "crypto";

function key(): Buffer {
  const secret = process.env.NEXTAUTH_SECRET?.trim() || process.env.AUTH_SECRET?.trim();
  if (!secret) throw new Error("Missing required environment variable: NEXTAUTH_SECRET");
  return createHmac("sha256", secret).update("wiphy mail preview v1").digest();
}

export function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

/**
 * `fields` ist die geparste Formulareingabe ohne den Token selbst. Die
 * Schlüsselreihenfolge kommt aus dem Zod-Schema und ist damit stabil;
 * Empfänger-IDs werden sortiert, ihre Reihenfolge ist bedeutungslos.
 */
export function createPreviewToken(fields: Record<string, unknown>, fileHashes: string[]): string {
  const normalized = {
    ...fields,
    selectedUserIds: Array.isArray(fields.selectedUserIds) ? [...fields.selectedUserIds].sort() : [],
    files: fileHashes,
  };
  return createHmac("sha256", key()).update(JSON.stringify(normalized)).digest("base64url");
}

export function verifyPreviewToken(
  token: string | undefined,
  fields: Record<string, unknown>,
  fileHashes: string[],
): boolean {
  if (!token) return false;
  const given = Buffer.from(token);
  const expected = Buffer.from(createPreviewToken(fields, fileHashes));
  return given.length === expected.length && timingSafeEqual(given, expected);
}
