import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // `/register` fehlt hier bewusst: der Pfad leitet dauerhaft auf
            // die öffentliche Seite „Mitglied werden“ um, die gefunden werden soll.
            disallow: ["/login", "/dashboard", "/api"],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
