import sharp from "sharp";
import type { Metadata, OutputInfo } from "sharp";
import { AppError } from "@/lib/server/errors";
import { MAX_BOARD_PHOTO_UPLOAD_BYTES } from "@/lib/boardImages";

/**
 * Wandelt ein hochgeladenes Foto in ein quadratisches Avatarbild um — dasselbe
 * Prinzip wie `blogImageProcessing.ts` (Neukodieren, EXIF weg, Größenlimit),
 * aber mit festem Seitenverhältnis: das Foto landet direkt im runden
 * Avatar-Element auf `/vorstand`, ein `fit: "inside"` wie beim Blog würde dort
 * je nach Ausgangsformat Ränder zeigen statt das Gesicht zu füllen.
 */

/** Kantenlänge des quadratischen Avatarbilds. */
const AVATAR_EDGE = 480;

const TARGET_BYTES = 120 * 1024;
const QUALITY_LADDER = [80, 70, 60, 50, 40];

/** Bremse gegen „Zip-Bomben“ für Bilder: 8000×8000 dekodiert schon 256 MB. */
const MAX_INPUT_PIXELS = 40_000_000;

export type ImageBytes = Uint8Array<ArrayBuffer>;

export type ProcessedBoardPhoto = {
  data: ImageBytes;
  width: number;
  height: number;
  byteSize: number;
  mimeType: "image/webp";
};

function open(input: Uint8Array) {
  return sharp(input, { limitInputPixels: MAX_INPUT_PIXELS, animated: false }).rotate();
}

export async function processBoardPhoto(input: Uint8Array): Promise<ProcessedBoardPhoto> {
  if (input.byteLength === 0) {
    throw new AppError("VALIDATION_ERROR", "Die Datei ist leer.");
  }
  if (input.byteLength > MAX_BOARD_PHOTO_UPLOAD_BYTES) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Die Datei ist größer als ${Math.round(MAX_BOARD_PHOTO_UPLOAD_BYTES / (1024 * 1024))} MB.`,
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

  const cropped = open(input).resize({
    width: AVATAR_EDGE,
    height: AVATAR_EDGE,
    fit: "cover",
    position: "attention",
  });

  let result: { data: Buffer; info: OutputInfo } | null = null;
  for (const quality of QUALITY_LADDER) {
    result = await cropped
      .clone()
      .webp({ quality, effort: 4 })
      .toBuffer({ resolveWithObject: true });
    if (result.data.byteLength <= TARGET_BYTES) break;
  }
  if (!result) {
    throw new AppError("INTERNAL_ERROR", "Das Bild konnte nicht verarbeitet werden.");
  }

  return {
    data: new Uint8Array(result.data),
    width: result.info.width,
    height: result.info.height,
    byteSize: result.data.byteLength,
    mimeType: "image/webp",
  };
}
