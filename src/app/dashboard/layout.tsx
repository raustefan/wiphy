import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/siteUrl";
import { requireUser } from "@/lib/server/authz";

export const metadata: Metadata = {
    // Jede Unterseite setzt nur ihren eigenen Namen; mit mehreren offenen
    // Verwaltungs-Tabs sind die sonst nicht auseinanderzuhalten.
    title: {
        default: "Dashboard",
        template: `%s · Dashboard — ${SITE_NAME}`,
    },
    robots: { index: false, follow: false },
};

/**
 * Die Anmeldung wird hier geprüft, nicht erst in den Seiten: das Layout
 * rendert vor `loading.tsx`. Ohne Sitzung leitet es deshalb um, bevor
 * irgendetwas vom Mitgliederbereich gestreamt wird — vorher blitzte
 * die Ladeanzeige kurz auf, bevor die Seite auf `/login` umlenkte.
 * Die Seiten behalten ihre eigenen Prüfungen (Rolle, Debug-Modus).
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    await requireUser();
    return children;
}
