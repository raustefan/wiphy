/**
 * Erzeugt die App-Icons aus `public/logo-plain.png`.
 *
 * Als Skript und nicht von Hand, weil die Icons voneinander abhängen: ändert
 * sich die Wortmarke, müssen alle vier Größen neu raus, und ein vergessenes
 * apple-touch-icon fällt erst auf, wenn jemand die Seite auf den Homescreen
 * legt. Aufruf: `pnpm icons`.
 *
 * Die Vorlage ist quer (740×390) und transparent. Icons sind quadratisch und
 * werden von iOS und Android auf *undurchsichtig* getrimmt — ohne eigenen
 * Hintergrund stünde die Wortmarke auf Schwarz. Daher: heller Vereinston als
 * Fläche, Logo zentriert eingepasst.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SOURCE = "public/logo-plain.png";
const BACKGROUND = { r: 250, g: 250, b: 250, alpha: 1 }; // --background (hell)

/**
 * `padding` ist der Anteil der Kantenlänge, der frei bleibt. Maskierbare
 * Android-Icons werden zu einem Kreis beschnitten, deshalb dort deutlich mehr
 * Luft — sonst schneidet die Maske die Wortmarke an.
 */
async function icon(size: number, out: string, padding: number) {
  const inner = Math.round(size * (1 - 2 * padding));
  const logo = await sharp(SOURCE)
    .resize(inner, inner, { fit: "inside", withoutEnlargement: false })
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: BACKGROUND },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(out);

  console.log(`${out} (${size}×${size})`);
}

async function main() {
  await mkdir("public/icons", { recursive: true });
  await icon(180, "src/app/apple-icon.png", 0.08);
  await icon(192, "public/icons/icon-192.png", 0.08);
  await icon(512, "public/icons/icon-512.png", 0.08);
  await icon(512, "public/icons/icon-maskable-512.png", 0.22);
}

main();
