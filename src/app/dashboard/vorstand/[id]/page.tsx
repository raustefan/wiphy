import type { Metadata } from "next";
import { requireAdmin } from "@/lib/server/authz";
import { getMemberForEdit } from "@/lib/server/services/boardService";
import { Check, X } from "lucide-react";
import { saveMember } from "../actions";
import { DashboardPageHeader } from "../../DashboardPageHeader";
import { BoardPhotoUploader } from "./BoardPhotoUploader";
import { Button, ButtonLink, Card, Checkbox, Container, Field, Input } from "@/components/ui";

export const metadata: Metadata = { title: "Vorstandsmitglied bearbeiten" };

export default async function EditBoardMemberPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    await requireAdmin();

    const member = await getMemberForEdit(resolvedParams.id);
    if (!member) {
        return (
            <Container size="2" className="py-16 text-center text-muted">
                Vorstandsmitglied nicht gefunden
            </Container>
        );
    }

    return (
        <Container size="3" className="grid gap-5 py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Internbereich"
                title="Vorstandsmitglied bearbeiten"
                backHref="/dashboard/vorstand"
                backLabel="Zurück zur Übersicht"
            />

            <Card className="p-5 sm:p-6">
                <form action={saveMember} className="grid gap-4">
                    <input type="hidden" name="id" value={member.id} />

                    <Field label="Name" htmlFor="member-name">
                        <Input id="member-name" name="name" defaultValue={member.name} required />
                    </Field>

                    <Field label="Funktion" htmlFor="member-role">
                        <Input
                            id="member-role"
                            name="role"
                            defaultValue={member.role}
                            placeholder="z. B. 1. Vorstandsvorsitzender"
                        />
                    </Field>

                    <Field
                        label="LinkedIn-Link"
                        htmlFor="member-linkedin"
                        hint="Optional. Muss mit https:// beginnen."
                    >
                        <Input
                            id="member-linkedin"
                            name="linkedin"
                            type="url"
                            defaultValue={member.linkedin}
                            placeholder="https://www.linkedin.com/in/…"
                        />
                    </Field>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="member-published"
                            name="published"
                            defaultChecked={member.published}
                        />
                        <label htmlFor="member-published" className="cursor-pointer text-sm">
                            Auf /vorstand veröffentlichen
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="member-in-signature"
                            name="inSignature"
                            defaultChecked={member.inSignature}
                        />
                        <label htmlFor="member-in-signature" className="cursor-pointer text-sm">
                            In der Mail-Signatur nennen
                        </label>
                    </div>

                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                        <Button size="lg" type="submit">
                            <Check size={16} aria-hidden="true" /> Speichern
                        </Button>
                        <ButtonLink
                            href="/dashboard/vorstand"
                            size="lg"
                            variant="soft"
                            color="neutral"
                        >
                            <X size={16} aria-hidden="true" /> Abbrechen
                        </ButtonLink>
                    </div>
                </form>
            </Card>

            <BoardPhotoUploader memberId={member.id} photo={member.photo} />
        </Container>
    );
}
