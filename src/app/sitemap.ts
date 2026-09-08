import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/server/services/blogService";
import { getPastEvents, getUpcomingEvents } from "@/lib/server/services/eventService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
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
        { url: `${baseUrl}/impressum` },
        { url: `${baseUrl}/datenschutz` },
        ...posts.map((post) => ({
            url: `${baseUrl}/blog/${post.id}`,
            lastModified: post.updatedAt,
        })),
        ...[...upcoming, ...past].map((event) => ({
            url: `${baseUrl}/termine/${event.id}`,
            lastModified: event.updatedAt,
        })),
    ];
}
