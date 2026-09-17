import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/siteUrl";

export const metadata: Metadata = {
    // Jede Unterseite setzt nur ihren eigenen Namen; mit mehreren offenen
    // Verwaltungs-Tabs sind die sonst nicht auseinanderzuhalten.
    title: {
        default: "Dashboard",
        template: `%s · Dashboard — ${SITE_NAME}`,
    },
    robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return children;
}
