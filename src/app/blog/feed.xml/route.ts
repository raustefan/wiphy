import { getPublishedPosts } from "@/lib/server/services/blogService";
import { blogImageUrl } from "@/lib/blogImages";
import { blogPostPath } from "@/lib/slug";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/siteUrl";

/**
 * RSS 2.0 für den Vereins-Blog.
 *
 * Von Hand zusammengebaut statt mit einer Abhängigkeit: das Format sind vier
 * Tags, und ein Feed-Generator, der nur hier benutzt wird, wäre mehr zu pflegen
 * als er einspart.
 *
 * Im `<description>` steht bewusst nur der Vorschautext, nicht das Markdown des
 * Beitrags — sonst läge der vollständige Inhalt in einem Format vor, das
 * Feedreader als HTML interpretieren, und die Bilder aus der Datenbank wären
 * dort ohnehin nur als nackte Links zu sehen.
 */

/** Alles, was in XML eine eigene Bedeutung hat. */
function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getPublishedPosts();
  const self = absoluteUrl("/blog/feed.xml");
  const updated = posts[0]?.publishedAt ?? new Date();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(blogPostPath(post));
      // Die guid bleibt die alte Adresse ohne Titelteil: sie leitet weiter und
      // ändert sich nie — sonst meldeten Feedreader jeden Beitrag als neu,
      // sobald sich sein Titel oder das Adressformat ändert.
      const guid = absoluteUrl(`/blog/${post.id}`);
      const cover = post.cover ? absoluteUrl(blogImageUrl(post.cover.id)) : null;

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(guid)}</guid>
      <pubDate>${post.publishedAt.toUTCString()}</pubDate>
      ${post.author ? `<dc:creator>${escapeXml(post.author)}</dc:creator>` : ""}
      <description>${escapeXml(post.preview)}</description>
      ${cover ? `<enclosure url="${escapeXml(cover)}" type="image/webp" />` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${SITE_NAME} — Vereins-Blog`)}</title>
    <link>${escapeXml(absoluteUrl("/blog"))}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>de-DE</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml" />
    <image>
      <url>${escapeXml(absoluteUrl("/icons/icon-512.png"))}</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${escapeXml(SITE_URL)}</link>
    </image>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      // Eine Stunde: Feedreader fragen oft nach, neue Beiträge sind selten.
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
