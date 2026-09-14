import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/siteUrl";

/**
 * Das Standard-Vorschaubild für geteilte Links.
 *
 * Gezeichnet statt als Datei hinterlegt, damit Wortlaut und Farben aus dem Code
 * kommen und nicht aus einer PNG, die beim nächsten Namenswechsel vergessen
 * wird. Einzelne Blogbeiträge überschreiben das hier mit ihrem Titelbild.
 */
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  /* `ImageResponse` rendert außerhalb des Browsers und kann deshalb keine URL
     laden — die Wortmarke muss als Bytes mitkommen. */
  const logo = await readFile(join(process.cwd(), "public", "logo-plain.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: 80,
          // Der Vereinston als schmaler Balken oben — genug Wiedererkennung,
          // ohne dass der Text auf Farbe steht und schlechter lesbar wird.
          borderTop: "16px solid #0f766e",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <img src={logoSrc} alt="" width={152} height={80} />
          <div
            style={{
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#2dd4bf",
            }}
          >
            Universität Ulm
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#fafafa", lineHeight: 1.1 }}>
            {SITE_NAME}
          </div>
        </div>
        <div style={{ fontSize: 30, color: "#a1a1aa", lineHeight: 1.4 }}>
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    size,
  );
}
