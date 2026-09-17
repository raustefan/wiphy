import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";
import { eventPath } from "@/lib/events";
import { blogPostPath } from "@/lib/slug";
import { getPublishedPosts } from "@/lib/server/services/blogService";
import { getPastEvents, getUpcomingEvents } from "@/lib/server/services/eventService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SITE_URL;
    const now = new Date();
    const [posts, upcoming, past] = await Promise.all([
        getPublishedPosts(),
        getUpcomingEvents(now),
        getPastEvents(now),
    ]);

    return [
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
}
