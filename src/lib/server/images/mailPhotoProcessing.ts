import sharp from "sharp";
import { AppError } from "@/lib/server/errors";
import { MAIL_PHOTO_LIMITS } from "@/lib/mailPhotos";

/**
 * Fotos als Mailanhang: neu kodiert als JPEG (WebP zeigen ältere Outlooks
 * nicht an), auf 1600 px begrenzt und ohne EXIF — GPS-Position und Gerätedaten
 * gehen nicht an hundert Postfächer. Gespeichert wird nichts.
 */
const MAX_EDGE = 1600;
const MAX_INPUT_PIXELS = 40_000_000;

export type MailPhoto = { filename: string; content: Buffer; contentType: "image/jpeg" };

function jpegName(name: string, index: number): string {
  const base = name
    .replace(/\.[^.]*$/, "")
    .normalize("NFKD")
    .replace(/[^\w\- ]+/g, "")
    .trim()
    .slice(0, 60);
  return `${base || `foto-${index + 1}`}.jpg`;
}

export async function processMailPhotos(files: File[]): Promise<MailPhoto[]> {
  if (files.length > MAIL_PHOTO_LIMITS.count) {
    throw new AppError("VALIDATION_ERROR", `Höchstens ${MAIL_PHOTO_LIMITS.count} Fotos pro Mail.`);
  }

  const photos: MailPhoto[] = [];
  for (const [index, file] of files.entries()) {
    if (file.size === 0 || file.size > MAIL_PHOTO_LIMITS.uploadBytes) {
      throw new AppError("VALIDATION_ERROR", `„${file.name}“ ist leer oder zu groß.`);
    }
    let content: Buffer;
    try {
      content = await sharp(new Uint8Array(await file.arrayBuffer()), {
        limitInputPixels: MAX_INPUT_PIXELS,
        animated: false,
      })
        .rotate()
        .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
    } catch {
      throw new AppError("VALIDATION_ERROR", `„${file.name}“ ist kein lesbares Bild.`);
    }
    photos.push({ filename: jpegName(file.name, index), content, contentType: "image/jpeg" });
  }

  const total = photos.reduce((sum, photo) => sum + photo.content.byteLength, 0);
  if (total > MAIL_PHOTO_LIMITS.totalBytes) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Die Fotos sind zusammen zu groß für eine Rundmail. Bitte weniger oder kleinere Fotos anhängen.",
    );
  }
  return photos;
}
