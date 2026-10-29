import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/server/authz";
import { Card, Container } from "@/components/ui";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { GUIDES, GuideMarkdown, readGuide } from "./guides";

export const metadata: Metadata = { title: "Anleitungen" };

export default async function GuidesPage() {
    await requireAdmin();
    // Aus der README nur der allgemeine Teil — ihre Inhaltstabelle sind hier die Kacheln.
    const readme = await readGuide("README");
    const basics = readme.slice(readme.indexOf("## Einstieg"));

    return (
        <Container size="4" className="grid gap-6 py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Internbereich"
                title="Anleitungen"
                description="Was in der Verwaltung passiert, wenn du etwas anklickst."
                backHref="/dashboard"
            />

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {GUIDES.map(({ slug, title, description, Icon }) => (
                    <li key={slug} className="min-w-0">
                        <Link
                            href={`/dashboard/anleitungen/${slug}`}
                            className="group flex h-full items-start gap-3 rounded-[3px] border border-line-strong bg-surface p-4 transition-colors hover:border-physics focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
                        >
                            <span
                                className="grid size-9 shrink-0 place-items-center rounded-[3px] border border-physics/40 text-physics transition-colors group-hover:bg-physics group-hover:text-on-physics"
                                aria-hidden="true"
                            >
                                <HugeiconsIcon icon={Icon} size={17} />
                            </span>
                            <span className="grid min-w-0 gap-0.5">
                                <span className="font-serif text-base font-medium">{title}</span>
                                <span className="text-sm text-muted text-pretty">{description}</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <Card className="px-5 sm:px-6">
                <GuideMarkdown content={basics} />
            </Card>
        </Container>
    );
}
