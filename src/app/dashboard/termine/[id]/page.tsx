import { redirect } from "next/navigation";
import { Newspaper } from "lucide-react";
import { requireAdmin } from "@/lib/server/authz";
import { getEventForEdit } from "@/lib/server/services/eventService";
import { DashboardPageHeader } from "../../DashboardPageHeader";
import { EventForm } from "./EventForm";
import { Card, Container } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await requireAdmin();

    // Neue Termine entstehen als Entwurf über die Übersicht (siehe
    // `createEventDraft`) — eine `/new`-Adresse gäbe es ohne Termin-ID nur als
    // halb benutzbares Formular.
    if (id === "new") {
        redirect("/dashboard/termine");
    }

    const event = await getEventForEdit(id);
    if (!event) {
        return (
            <Container size="2" className="py-16 text-center text-muted">
                Termin nicht gefunden
            </Container>
        );
    }

    return (
        <Container size="3" className="grid gap-5 py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Internbereich"
                title="Termin bearbeiten"
                backHref="/dashboard/termine"
                backLabel="Zurück zur Übersicht"
            />

            <EventForm event={event} />

            {event._count.posts > 0 && (
                <Card className="flex items-start gap-3 p-5 text-sm text-muted">
                    <Newspaper size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-market" />
                    <p className="leading-relaxed">
                        {event._count.posts === 1
                            ? "Ein Blogbeitrag ist mit diesem Termin verknüpft"
                            : `${event._count.posts} Blogbeiträge sind mit diesem Termin verknüpft`}{" "}
                        und erscheint als Rückblick auf der Terminseite. Die Verknüpfung wird im
                        jeweiligen Beitrag unter{" "}
                        <span className="font-semibold text-foreground">Blog verwalten</span>{" "}
                        gesetzt.
                    </p>
                </Card>
            )}
        </Container>
    );
}
