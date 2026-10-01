import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/siteUrl";
import { blogPostPath } from "@/lib/slug";

/**
 * Strukturierte Daten als `<script type="application/ld+json">`.
 *
 * Suchmaschinen und Link-Vorschauen lesen daraus, *was* eine Seite ist — ohne
 * das bleibt ein Beitrag für Google eine beliebige HTML-Seite ohne Autor und
 * Datum. `JSON.stringify` schreibt keine Tags, deshalb ist `dangerously…` hier
 * unbedenklich; zusätzlich wird `<` maskiert, damit ein `</script>` in einem
 * Beitragstitel das Skript nicht vorzeitig beenden kann.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Der Verein selbst — steht auf jeder Seite im Layout. */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: "Wirtschaftsphysik Alumni e.V.",
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        logo: absoluteUrl("/icons/icon-512.png"),
        email: "info@wirtschaftsphysik.de",
        address: {
          "@type": "PostalAddress",
          streetAddress: "c/o Universität Ulm, Albert-Einstein-Allee 11",
          postalCode: "89081",
          addressLocality: "Ulm",
          addressCountry: "DE",
        },
      }}
    />
  );
}

/** Ein einzelner Blogbeitrag. */
export function BlogPostingJsonLd({
  id,
  title,
  preview,
  author,
  publishedAt,
  updatedAt,
  imageUrl,
}: {
  id: string;
  title: string;
  preview: string;
  author: string | null;
  publishedAt: Date;
  updatedAt: Date;
  imageUrl?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: preview || undefined,
        url: absoluteUrl(blogPostPath({ id, title })),
        mainEntityOfPage: absoluteUrl(blogPostPath({ id, title })),
        datePublished: publishedAt.toISOString(),
        dateModified: updatedAt.toISOString(),
        inLanguage: "de-DE",
        image: imageUrl ? [imageUrl] : undefined,
        author: { "@type": author ? "Person" : "Organization", name: author || SITE_NAME },
        publisher: { "@id": `${SITE_URL}/#organization` },
      }}
    />
  );
}

/**
 * Ein Termin — Grundlage für die Veranstaltungs-Kacheln in der Google-Suche.
 * Ganztägige Termine bekommen nur das Datum (Berliner Kalendertag), sonst
 * stünde dort Mitternacht UTC.
 */
export function EventJsonLd({
  title,
  summary,
  path,
  start,
  end,
  allDay,
  location,
  address,
  onlineUrl,
}: {
  title: string;
  summary: string;
  path: string;
  start: Date;
  end: Date | null;
  allDay: boolean;
  location: string;
  address: string;
  onlineUrl: string;
}) {
  const date = (d: Date) =>
    allDay ? d.toLocaleDateString("sv-SE", { timeZone: "Europe/Berlin" }) : d.toISOString();
  const place = (location || address) && {
    "@type": "Place",
    name: location || address,
    address: address || undefined,
  };
  const online = onlineUrl && { "@type": "VirtualLocation", url: onlineUrl };

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Event",
        name: title,
        description: summary || undefined,
        url: absoluteUrl(path),
        startDate: date(start),
        endDate: end ? date(end) : undefined,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: `https://schema.org/${
          place && online ? "Mixed" : online ? "Online" : "Offline"
        }EventAttendanceMode`,
        location: [place, online].filter(Boolean),
        image: [absoluteUrl("/opengraph-image")],
        organizer: { "@id": `${SITE_URL}/#organization` },
      }}
    />
  );
}
