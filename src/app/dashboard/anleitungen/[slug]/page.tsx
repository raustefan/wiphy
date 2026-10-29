import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/server/authz";
import { Card, Container } from "@/components/ui";
import { DashboardPageHeader } from "../../DashboardPageHeader";
import { findGuide, GuideMarkdown, readGuide } from "../guides";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const guide = findGuide((await params).slug);
    return { title: guide ? `Anleitung: ${guide.title}` : "Anleitungen" };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    await requireAdmin();
    const guide = findGuide(slug);
    if (!guide) notFound();

    return (
        <Container size="3" className="grid gap-6 py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Anleitung"
                title={guide.title}
                description={guide.description}
                backHref="/dashboard/anleitungen"
                backLabel="Alle Anleitungen"
            />
            <Card className="px-5 sm:px-6">
                <GuideMarkdown content={await readGuide(guide.slug)} />
            </Card>
        </Container>
    );
}
