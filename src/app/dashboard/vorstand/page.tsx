import { requireAdmin } from "@/lib/server/authz";
import { getAdminMembers } from "@/lib/server/services/boardService";
import { ChevronDown, ChevronUp, Pencil, Plus, Users } from "lucide-react";
import { Suspense } from "react";
import { createDraft, deleteMember, moveMemberInList } from "./actions";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { DeleteMemberButton } from "./DeleteMemberButton";
import { boardPhotoUrl } from "@/lib/boardImages";
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

export default async function AdminBoardPage() {
    await requireAdmin();
    const members = await getAdminMembers();

    return (
        <Container size="4" className="py-8 sm:py-12">
            <Suspense fallback={null}>
                <FeatureDisabledQueryDialog />
            </Suspense>

            <DashboardPageHeader
                eyebrow="Internbereich"
                title="Vorstand verwalten"
                backHref="/dashboard"
            >
                <form action={createDraft} className="w-full sm:w-auto">
                    <Button type="submit" className="w-full sm:w-auto">
                        <Plus size={16} aria-hidden="true" /> Neues Mitglied
                    </Button>
                </form>
            </DashboardPageHeader>

            <Card className="p-4 sm:p-6">
                <TableWrap>
                    <Table className="min-w-[640px]">
                        <thead>
                            <tr className="bg-raised/60">
                                <Th>Foto</Th>
                                <Th>Name</Th>
                                <Th>Status</Th>
                                <Th>Signatur</Th>
                                <Th className="text-right">Aktionen</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member, index) => (
                                <tr key={member.id} className="transition-colors hover:bg-raised/50">
                                    <Td>
                                        {member.photo ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={boardPhotoUrl(member.photo.id)}
                                                alt=""
                                                loading="lazy"
                                                decoding="async"
                                                className="size-12 rounded-full border border-line object-cover"
                                            />
                                        ) : (
                                            <span
                                                className="grid size-12 place-items-center rounded-full border border-dashed border-line text-faint"
                                                title="Kein Foto"
                                            >
                                                <Users size={16} aria-hidden="true" />
                                            </span>
                                        )}
                                    </Td>
                                    <Td className="font-medium">
                                        {member.name}
                                        {member.role && (
                                            <span className="block text-xs font-normal text-muted">
                                                {member.role}
                                            </span>
                                        )}
                                    </Td>
                                    <Td>
                                        <Badge tone={member.published ? "positive" : "warning"}>
                                            {member.published ? "Veröffentlicht" : "Entwurf"}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        {member.inSignature ? (
                                            <Badge tone="positive">In Signatur</Badge>
                                        ) : (
                                            <span className="text-sm text-faint">—</span>
                                        )}
                                    </Td>
                                    <Td>
                                        <div className="flex flex-wrap justify-end gap-2">
                                            <form action={moveMemberInList}>
                                                <input type="hidden" name="id" value={member.id} />
                                                <input type="hidden" name="direction" value="up" />
                                                <Button
                                                    size="sm"
                                                    variant="soft"
                                                    color="neutral"
                                                    type="submit"
                                                    disabled={index === 0}
                                                    aria-label="Nach oben verschieben"
                                                >
                                                    <ChevronUp size={16} aria-hidden="true" />
                                                </Button>
                                            </form>
                                            <form action={moveMemberInList}>
                                                <input type="hidden" name="id" value={member.id} />
                                                <input type="hidden" name="direction" value="down" />
                                                <Button
                                                    size="sm"
                                                    variant="soft"
                                                    color="neutral"
                                                    type="submit"
                                                    disabled={index === members.length - 1}
                                                    aria-label="Nach unten verschieben"
                                                >
                                                    <ChevronDown size={16} aria-hidden="true" />
                                                </Button>
                                            </form>
                                            <ButtonLink
                                                href={`/dashboard/vorstand/${member.id}`}
                                                size="sm"
                                                variant="soft"
                                            >
                                                <Pencil size={16} aria-hidden="true" /> Bearbeiten
                                            </ButtonLink>
                                            <DeleteMemberButton
                                                memberId={member.id}
                                                name={member.name}
                                                deleteAction={deleteMember}
                                            />
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                            {members.length === 0 && (
                                <tr>
                                    <Td colSpan={5} className="p-0">
                                        <EmptyState
                                            icon={<Users size={22} />}
                                            title="Noch kein Vorstand hinterlegt"
                                            description="Lege ein Mitglied an, trage Name und Funktion ein und veröffentliche es — bis dahin sieht es niemand außer dir."
                                            action={
                                                <form action={createDraft}>
                                                    <Button type="submit" variant="soft">
                                                        <Plus size={16} aria-hidden="true" />
                                                        Erstes Mitglied anlegen
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
