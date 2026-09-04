import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/server/services/blogService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const posts = await getPublishedPosts();

    return [
        { url: baseUrl },
        { url: `${baseUrl}/blog` },
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
    ];
}
