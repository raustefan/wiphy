import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { SITE_URL } from "@/lib/siteUrl";
import { eventPath } from "@/lib/events";
import { blogPostPath } from "@/lib/slug";
import { getPublishedPosts } from "@/lib/server/services/blogService";
import { getPastEvents, getUpcomingEvents } from "@/lib/server/services/eventService";
import { getDisabledPages } from "@/lib/server/services/featureFlagService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await connection(); // sonst beim Build eingefroren — Feature Flags greifen dann nie
    const baseUrl = SITE_URL;
    const now = new Date();
    const [posts, upcoming, past, hiddenPaths] = await Promise.all([
        getPublishedPosts(),
        getUpcomingEvents(now),
        getPastEvents(now),
        getDisabledPages(),
    ]);

    const entries: MetadataRoute.Sitemap = [
        { url: baseUrl },
        { url: `${baseUrl}/blog` },
        { url: `${baseUrl}/termine` },
        { url: `${baseUrl}/geschichte` },
        { url: `${baseUrl}/vorstand` },
        { url: `${baseUrl}/satzung` },
        { url: `${baseUrl}/kontakt` },
        { url: `${baseUrl}/mitglied-werden` },
        { url: `${baseUrl}/impressum` },
        { url: `${baseUrl}/datenschutz` },
        ...posts.map((post) => ({
            url: `${baseUrl}${blogPostPath(post)}`,
            lastModified: post.updatedAt,
        })),
        ...[...upcoming, ...past].map((event) => ({
            url: `${baseUrl}${eventPath(event)}`,
            lastModified: event.updatedAt,
        })),
    ];
    // Abgeschaltete Seiten samt Unterseiten (Beiträge, Termine) liefern 404 — nicht anbieten.
    return entries.filter(({ url }) =>
        !hiddenPaths.some((path) => url === baseUrl + path || url.startsWith(`${baseUrl}${path}/`)),
    );
}
