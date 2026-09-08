import sharp from "sharp";
import type { Metadata, OutputInfo } from "sharp";
import { AppError } from "@/lib/server/errors";
import { MAX_BLOG_IMAGE_UPLOAD_BYTES } from "@/lib/blogImages";

/**
 * Aus einer hochgeladenen Datei wird hier das, was in der Datenbank liegen darf.
 *
 * Drei Dinge passieren dabei, und jedes einzelne ist der Grund für diesen
 * Schritt:
 *
 * 1. **Verkleinern und neu kodieren.** Ein Handyfoto bringt 4000 px und mehrere
 *    Megabyte mit. In der Datenbank wären das Zeilen, die jede Sicherung und
 *    jede Abfrage ausbremsen. WebP mit begrenzter Kantenlänge macht daraus rund
 *    200 KB, ohne dass man auf einem Blog-Bild einen Unterschied sieht.
 * 2. **Metadaten wegwerfen.** `sharp` übernimmt per Voreinstellung kein EXIF —
 *    GPS-Koordinaten und Gerätedaten aus einem Foto landen also nicht im Netz.
 *    `.rotate()` steht davor, damit die Orientierung aus dem EXIF vorher noch
 *    in die Pixel wandert und Hochformat-Fotos nicht gekippt erscheinen.
 * 3. **Prüfen, dass es überhaupt ein Bild ist.** Was `sharp` nicht dekodieren
 *    kann, fliegt hier raus statt später als kaputtes `<img>` beim Leser.
 */

/** Längste Kante der Vollbild-Variante. Reicht für Lightbox und Retina-Cover. */
const MAX_EDGE = 1600;
/** Längste Kante der kleinen Variante — Listen und Galerie-Streifen. */
const THUMB_EDGE = 640;

/**
 * Wunschgröße der Vollbild-Variante. Kein hartes Limit: die Qualitätsstufen
 * werden der Reihe nach durchprobiert, und die letzte wird genommen, auch wenn
 * sie darüber liegt.
 */
const TARGET_IMAGE_BYTES = 220 * 1024;
const QUALITY_LADDER = [80, 70, 60, 50, 40];

/** Bremse gegen „Zip-Bomben“ für Bilder: 8000×8000 dekodiert schon 256 MB. */
const MAX_INPUT_PIXELS = 40_000_000;

/**
 * Bytes mit eigenem `ArrayBuffer` — genau das, was der Prisma-Client für eine
 * `Bytes`-Spalte verlangt; ein `Buffer` aus dem Pool von `sharp` passt dort
 * nicht hinein.
 */
export type ImageBytes = Uint8Array<ArrayBuffer>;

export type ProcessedBlogImage = {
  data: ImageBytes;
  thumbnail: ImageBytes;
  width: number;
  height: number;
  byteSize: number;
  mimeType: "image/webp";
};

function open(input: Uint8Array) {
  return sharp(input, { limitInputPixels: MAX_INPUT_PIXELS, animated: false }).rotate();
}

export async function processBlogImage(input: Uint8Array): Promise<ProcessedBlogImage> {
  if (input.byteLength === 0) {
    throw new AppError("VALIDATION_ERROR", "Die Datei ist leer.");
  }
  if (input.byteLength > MAX_BLOG_IMAGE_UPLOAD_BYTES) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Die Datei ist größer als ${Math.round(MAX_BLOG_IMAGE_UPLOAD_BYTES / (1024 * 1024))} MB.`,
    );
  }

  let metadata: Metadata;
  try {
    metadata = await open(input).metadata();
  } catch {
    throw new AppError("VALIDATION_ERROR", "Die Datei ist kein lesbares Bild.");
  }

  if (!metadata.width || !metadata.height) {
    throw new AppError("VALIDATION_ERROR", "Die Datei ist kein lesbares Bild.");
  }

  const resized = open(input).resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });

  let full: { data: Buffer; info: OutputInfo } | null = null;
  for (const quality of QUALITY_LADDER) {
    full = await resized.clone().webp({ quality, effort: 4 }).toBuffer({ resolveWithObject: true });
    if (full.data.byteLength <= TARGET_IMAGE_BYTES) break;
  }
  if (!full) {
    throw new AppError("INTERNAL_ERROR", "Das Bild konnte nicht verarbeitet werden.");
  }

  // Die kleine Variante entsteht aus der bereits verkleinerten: ein zweiter
  // Durchgang durch das Original kostet nur Zeit und sieht nicht besser aus.
  const thumbnail = await sharp(full.data)
    .resize({ width: THUMB_EDGE, height: THUMB_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 70, effort: 4 })
    .toBuffer();

  // Kopie statt Durchreichen: `sharp` gibt Puffer aus einem gemeinsamen Pool
  // zurück, und der Prisma-Client erwartet ein `Uint8Array` mit eigenem
  // Speicher.
  return {
    data: new Uint8Array(full.data),
    thumbnail: new Uint8Array(thumbnail),
    width: full.info.width,
    height: full.info.height,
    byteSize: full.data.byteLength,
    mimeType: "image/webp",
  };
}
