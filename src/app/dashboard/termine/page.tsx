import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, CalendarAdd01Icon, Megaphone01Icon, NewsIcon, PencilIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/server/authz";
import { getAdminEvents } from "@/lib/server/services/eventService";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { DeleteEventButton } from "./DeleteEventButton";
import { createEventDraft, deleteEventAction } from "./actions";
import { formatEventShort, isPastEvent } from "@/lib/events";
import {
    Badge,
    Button,
    ButtonLink,
    Card,
    Container,
    EmptyState,
    Table,
    TableWrap,
    Td,
    Th,
} from "@/components/ui";

export const metadata: Metadata = { title: "Termine verwalten" };

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
    await requireAdmin();
    const events = await getAdminEvents();
    const now = new Date();

    return (
        <Container size="4" className="py-8 sm:py-12">
            <Suspense fallback={null}>
                <FeatureDisabledQueryDialog />
            </Suspense>

            <DashboardPageHeader
                eyebrow="Internbereich"
                title="Termine verwalten"
                description="Veröffentlichte Termine erscheinen unter /termine, auf der Startseite und als Hinweis im Mitgliederbereich."
                backHref="/dashboard"
            >
                <form action={createEventDraft} className="w-full sm:w-auto">
                    <Button type="submit" className="w-full sm:w-auto">
                        <HugeiconsIcon icon={Add01Icon} size={16} aria-hidden="true" /> Neuer Termin
                    </Button>
                </form>
            </DashboardPageHeader>

            <Card className="p-4 sm:p-6">
                <TableWrap>
                    <Table className="min-w-[720px]">
                        <thead>
                            <tr className="bg-raised/60">
                                <Th>Wann</Th>
                                <Th>Titel</Th>
                                <Th>Status</Th>
                                <Th>Rückblick</Th>
                                <Th className="text-right">Aktionen</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => {
                                const past = isPastEvent(event, now);
                                return (
                                    <tr
                                        key={event.id}
                                        className="transition-colors hover:bg-raised/50"
                                    >
                                        <Td className="whitespace-nowrap tabular-nums text-muted">
                                            {formatEventShort(event)}
                                        </Td>
                                        <Td className="font-medium">
                                            {event.title}
                                            {event.location && (
                                                <span className="block text-xs text-faint">
                                                    {event.location}
                                                </span>
                                            )}
                                        </Td>
                                        <Td>
                                            <div className="flex flex-wrap gap-1.5">
                                                <Badge
                                                    tone={event.published ? "positive" : "warning"}
                                                >
                                                    {event.published ? "Veröffentlicht" : "Entwurf"}
                                                </Badge>
                                                {past && <Badge>Vergangen</Badge>}
                                            </div>
                                        </Td>
                                        <Td className="text-muted">
                                            {event._count.posts > 0 ? (
                                                <span className="inline-flex items-center gap-1.5 text-sm">
                                                    <HugeiconsIcon icon={NewsIcon} size={14} aria-hidden="true" className="text-market" />
                                                    {event._count.posts}
                                                </span>
                                            ) : (
                                                <span className="text-faint">—</span>
                                            )}
                                        </Td>
                                        <Td>
                                            <div className="flex flex-wrap justify-end gap-2">
                                                {/* Ankündigen nur für veröffentlichte Termine:
                                                    der Knopf in der Mail führt auf die
                                                    Terminseite, und die gibt es sonst nicht. */}
                                                {event.published && !past && (
                                                    <ButtonLink
                                                        href={`/dashboard/mail?termin=${event.id}`}
                                                        size="sm"
                                                        variant="soft"
                                                        color="market"
                                                    >
                                                        <HugeiconsIcon icon={Megaphone01Icon} size={16} aria-hidden="true" />{" "}
                                                        Ankündigen
                                                    </ButtonLink>
                                                )}
                                                <ButtonLink
                                                    href={`/dashboard/termine/${event.id}`}
                                                    size="sm"
                                                    variant="soft"
                                                >
                                                    <HugeiconsIcon icon={PencilIcon} size={16} aria-hidden="true" />{" "}
                                                    Bearbeiten
                                                </ButtonLink>
                                                <DeleteEventButton
                                                    eventId={event.id}
                                                    title={event.title}
                                                    linkedPosts={event._count.posts}
                                                    deleteAction={deleteEventAction}
                                                />
                                            </div>
                                        </Td>
                                    </tr>
                                );
                            })}
                            {events.length === 0 && (
                                <tr>
                                    <Td colSpan={5} className="p-0">
                                        <EmptyState
                                            icon={<HugeiconsIcon icon={CalendarAdd01Icon} size={22} />}
                                            title="Noch keine Termine"
                                            description="Angelegte Termine bleiben Entwürfe, bis du sie veröffentlichst."
                                            action={
                                                <form action={createEventDraft}>
                                                    <Button type="submit" variant="soft">
                                                        <HugeiconsIcon icon={Add01Icon} size={16} aria-hidden="true" />
                                                        Ersten Termin anlegen
                                                    </Button>
                                                </form>
                                            }
                                        />
                                    </Td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </TableWrap>
            </Card>
        </Container>
    );
}
