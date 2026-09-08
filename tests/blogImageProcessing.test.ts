import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";
import { processBlogImage } from "../src/lib/server/images/blogImageProcessing";

/**
 * Ein gemustertes Testbild. Eine einfarbige Fläche wäre als Vorlage wertlos —
 * die komprimiert auf wenige hundert Byte und würde jede Aussage über Größen
 * verfälschen. Die Kacheln erzeugen genug Struktur, ohne dass die Vorlage
 * selbst schon über der Upload-Grenze läge.
 */
async function patternedJpeg(width: number, height: number) {
  const pixels = Buffer.alloc(width * height * 3);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 3;
      pixels[offset] = ((x >> 3) * 37) % 256;
      pixels[offset + 1] = ((y >> 3) * 53) % 256;
      pixels[offset + 2] = (((x + y) >> 4) * 29) % 256;
    }
  }
  return sharp(pixels, { raw: { width, height, channels: 3 } }).jpeg({ quality: 85 }).toBuffer();
}

test("ein großes Foto wird auf 1600 px begrenzt und als WebP gespeichert", async () => {
  const processed = await processBlogImage(await patternedJpeg(3000, 2000));

  assert.equal(processed.mimeType, "image/webp");
  assert.equal(processed.width, 1600);
  assert.equal(processed.height, 1067);
  assert.equal(processed.byteSize, processed.data.byteLength);

  const full = await sharp(processed.data).metadata();
  assert.equal(full.format, "webp");

  const thumb = await sharp(processed.thumbnail).metadata();
  assert.equal(thumb.format, "webp");
  assert.equal(thumb.width, 640);
  assert.ok(
    processed.thumbnail.byteLength < processed.data.byteLength,
    "die kleine Variante muss kleiner sein als das Vollbild",
  );
});

test("kleine Bilder werden nicht künstlich vergrößert", async () => {
  const processed = await processBlogImage(await patternedJpeg(400, 300));
  assert.equal(processed.width, 400);
  assert.equal(processed.height, 300);
});

test("EXIF-Daten überleben die Verarbeitung nicht", async () => {
  // GPS-Koordinaten aus einem Handyfoto haben auf einer öffentlichen Seite
  // nichts verloren; `sharp` übernimmt Metadaten nur auf ausdrücklichen Wunsch.
  const withExif = await sharp(await patternedJpeg(800, 600))
    .withExif({ IFD0: { Copyright: "Testverein", Software: "Kamera" } })
    .toBuffer();

  const processed = await processBlogImage(withExif);
  const metadata = await sharp(processed.data).metadata();
  assert.equal(metadata.exif, undefined);
});

test("was kein Bild ist, wird abgelehnt", async () => {
  await assert.rejects(
    () => processBlogImage(new Uint8Array(Buffer.from("<html>kein Bild</html>"))),
    /kein lesbares Bild/,
  );
  await assert.rejects(() => processBlogImage(new Uint8Array(0)), /leer/);
});
