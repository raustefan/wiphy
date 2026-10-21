"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { useState, useTransition } from "react";
import type { MembershipApplicationStatus } from "@prisma/client";
import {
    Badge,
    Button,
    Card,
    Dialog,
    DialogFooter,
    Field,
    IconButton,
    Input,
    Separator,
    TextArea,
} from "@/components/ui";
import { formatIban, maskIban } from "@/lib/iban";
import { formatAddress } from "@/lib/countries";
import { formatEuro } from "@/lib/format";
import {
    acceptMembershipApplication,
    declineMembershipApplication,
    removeMembershipApplication,
} from "./actions";

export type ApplicationItem = {
    id: string;
    status: MembershipApplicationStatus;
    submittedAt: string;
    decidedAt: string | null;
    decisionNote: string | null;
    mailedAt: string | null;
    consentVersion: string;
    applicant: { id: string; email: string; status: string; memberNumber: number | null };
    firstName: string;
    lastName: string;
    title: string | null;
    birthDate: string;
    addressLine1: string;
    addressLine2: string | null;
    postalCode: string | null;
    city: string;
    region: string | null;
    countryCode: string;
    phone: string | null;
    degreeProgram: string | null;
    studyStart: string | null;
    studyEnd: string | null;
    employer: string | null;
    employmentStatus: string | null;
    industry: string | null;
    jobTitle: string | null;
    studentYears: number[];
    accountHolder: string | null;
    iban: string | null;
    bic: string | null;
    mandateSignedAt: string | null;
    regularFeeSnapshot: number;
    studentFeeSnapshot: number;
    feePlan: Array<{ year: number; isStudent: boolean; amount: number }>;
};

const dateFormat = new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" });
const dateTimeFormat = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
});

const STATUS_META: Record<
    MembershipApplicationStatus,
    { label: string; tone: "warning" | "positive" | "negative" | "neutral" }
> = {
    SUBMITTED: { label: "Offen", tone: "warning" },
    ACCEPTED: { label: "Angenommen", tone: "positive" },
    REJECTED: { label: "Abgelehnt", tone: "negative" },
    WITHDRAWN: { label: "Zurückgezogen", tone: "neutral" },
};

function todayInputValue() {
    return new Date().toISOString().slice(0, 10);
}

export function ApplicationList({
    applications,
    nextMemberNumber,
}: {
    applications: ApplicationItem[];
    nextMemberNumber: number;
}) {
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
    const [expanded, setExpanded] = useState<string | null>(null);
    const [revealedIban, setRevealedIban] = useState<string | null>(null);
    const [accepting, setAccepting] = useState<ApplicationItem | null>(null);
    const [declining, setDeclining] = useState<ApplicationItem | null>(null);
    const [pendingDelete, setPendingDelete] = useState<ApplicationItem | null>(null);
    const [joinedAt, setJoinedAt] = useState(todayInputValue);
    const [note, setNote] = useState("");
    const [memberNumberOverride, setMemberNumberOverride] = useState("");

    function run(
        action: (fd: FormData) => Promise<{ ok: boolean; message?: string }>,
        fd: FormData,
        onDone?: () => void,
    ) {
        setError("");
        startTransition(async () => {
            const result = await action(fd);
            if (!result.ok) {
                setError(result.message ?? "Aktion fehlgeschlagen.");
                return;
            }
            onDone?.();
        });
    }

    function openAccept(application: ApplicationItem) {
        setJoinedAt(todayInputValue());
        setNote("");
        setMemberNumberOverride(String(application.applicant.memberNumber ?? nextMemberNumber));
        setAccepting(application);
    }

    function confirmAccept() {
        if (!accepting) return;
        const fd = new FormData();
        fd.set("id", accepting.id);
        fd.set("joinedAt", joinedAt);
        fd.set("note", note);
        fd.set("memberNumber", memberNumberOverride);
        run(acceptMembershipApplication, fd, () => setAccepting(null));
    }

    function confirmDecline() {
        if (!declining) return;
        const fd = new FormData();
        fd.set("id", declining.id);
        fd.set("note", note);
        run(declineMembershipApplication, fd, () => setDeclining(null));
    }

    function confirmDelete() {
        if (!pendingDelete) return;
        const fd = new FormData();
        fd.set("id", pendingDelete.id);
        const target = pendingDelete;
        setPendingDelete(null);
        run(removeMembershipApplication, fd, () => {
            if (expanded === target.id) setExpanded(null);
        });
    }

    return (
        <div className="grid gap-3">
            {error && (
                <p role="alert" className="text-sm text-negative">
                    {error}
                </p>
            )}

            {applications.map((application) => {
                const meta = STATUS_META[application.status];
                const isOpen = expanded === application.id;
                const ibanVisible = revealedIban === application.id;

                return (
                    <Card key={application.id} className="grid gap-3 p-5">
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                            <div className="grid min-w-0 gap-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-semibold">
                                        {application.firstName} {application.lastName}
                                    </span>
                                    <Badge tone={meta.tone}>{meta.label}</Badge>
                                    {application.status === "SUBMITTED" &&
                                        !application.mailedAt && <Badge>Nicht gemailt</Badge>}
                                </div>
                                <p className="text-sm break-words text-muted">
                                    {application.applicant.email} · eingereicht am{" "}
                                    {dateTimeFormat.format(new Date(application.submittedAt))}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button
                                    size="sm"
                                    variant="soft"
                                    color="neutral"
                                    onClick={() => setExpanded(isOpen ? null : application.id)}
                                >
                                    {isOpen ? "Zuklappen" : "Details"}
                                </Button>
                                {application.status === "SUBMITTED" && (
                                    <>
                                        <Button
                                            size="sm"
                                            disabled={isPending}
                                            onClick={() => openAccept(application)}
                                        >
                                            Aufnehmen
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="soft"
                                            color="danger"
                                            disabled={isPending}
                                            onClick={() => {
                                                setNote("");
                                                setDeclining(application);
                                            }}
                                        >
                                            Ablehnen
                                        </Button>
                                    </>
                                )}
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    color="danger"
                                    disabled={isPending}
                                    onClick={() => setPendingDelete(application)}
                                >
                                    Löschen
                                </Button>
                            </div>
                        </div>

                        {application.decidedAt && (
                            <p className="text-sm text-muted">
                                Entschieden am{" "}
                                {dateTimeFormat.format(new Date(application.decidedAt))}
                                {application.decisionNote ? ` · ${application.decisionNote}` : ""}
                            </p>
                        )}

                        {isOpen && (
                            <>
                                <Separator />
                                <div className="grid gap-4 text-sm sm:grid-cols-2">
                                    <DetailGroup title="Person">
                                        <Detail label="Titel" value={application.title} />
                                        <Detail
                                            label="Geburtsdatum"
                                            value={dateFormat.format(
                                                new Date(application.birthDate),
                                            )}
                                        />
                                        <Detail
                                            label="Anschrift"
                                            value={formatAddress(application)}
                                        />
                                        <Detail label="Telefon" value={application.phone} />
                                    </DetailGroup>

                                    <DetailGroup title="Studium & Beruf">
                                        <Detail label="Studiengang" value={application.degreeProgram} />
                                        <Detail
                                            label="Studienzeitraum"
                                            value={formatRange(
                                                application.studyStart,
                                                application.studyEnd,
                                            )}
                                        />
                                        <Detail label="Arbeitgeber" value={application.employer} />
                                        <Detail label="Position" value={application.jobTitle} />
                                        <Detail label="Berufsstand" value={application.employmentStatus} />
                                        <Detail label="Berufszweig" value={application.industry} />
                                    </DetailGroup>

                                    <DetailGroup title="Zahlungsweise">
                                        {application.iban ? (
                                            <>
                                                <Detail
                                                    label="Weg"
                                                    value="SEPA-Lastschrift"
                                                />
                                                <Detail
                                                    label="Kontoinhaber:in"
                                                    value={application.accountHolder}
                                                />
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-muted">IBAN</span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="font-mono text-[13px] font-medium">
                                                            {ibanVisible
                                                                ? formatIban(application.iban)
                                                                : maskIban(application.iban)}
                                                        </span>
                                                        <IconButton
                                                            type="button"
                                                            size="sm"
                                                            aria-label={
                                                                ibanVisible
                                                                    ? "IBAN verbergen"
                                                                    : "IBAN anzeigen"
                                                            }
                                                            onClick={() =>
                                                                setRevealedIban(
                                                                    ibanVisible
                                                                        ? null
                                                                        : application.id,
                                                                )
                                                            }
                                                        >
                                                            {ibanVisible ? (
                                                                <HugeiconsIcon icon={ViewOffIcon} size={14} />
                                                            ) : (
                                                                <HugeiconsIcon icon={ViewIcon} size={14} />
                                                            )}
                                                        </IconButton>
                                                    </span>
                                                </div>
                                                <Detail label="BIC" value={application.bic} />
                                                <Detail
                                                    label="Mandat erteilt"
                                                    value={
                                                        application.mandateSignedAt
                                                            ? dateFormat.format(
                                                                  new Date(application.mandateSignedAt),
                                                              )
                                                            : null
                                                    }
                                                />
                                            </>
                                        ) : (
                                            /* Ohne Mandat gibt es keine Bankdaten — der Verein
                                               zieht nichts ein und hat sie deshalb nie erhoben.
                                               Der Hinweis erklärt dem Vorstand die Lücke, statt
                                               sie als fehlende Angabe erscheinen zu lassen. */
                                            <>
                                                <Detail label="Weg" value="Überweisung" />
                                                <p className="text-muted text-pretty">
                                                    Kein SEPA-Lastschriftmandat erteilt. Der
                                                    Beitrag erhöht sich nach § 5 Abs. 5 um 10 %;
                                                    Bankdaten liegen nicht vor.
                                                </p>
                                            </>
                                        )}
                                    </DetailGroup>

                                    <DetailGroup title="Beitrag">
                                        <Detail
                                            label="Satz bei Antragstellung"
                                            value={`${formatEuro(application.regularFeeSnapshot)} regulär / ${formatEuro(application.studentFeeSnapshot)} ermäßigt`}
                                        />
                                        <Detail
                                            label="Studienjahre"
                                            value={
                                                application.studentYears.length > 0
                                                    ? application.studentYears.join(", ")
                                                    : null
                                            }
                                        />
                                        <Detail
                                            label="Zustimmung"
                                            value={`Satzung & Datenschutz (${application.consentVersion})`}
                                        />
                                    </DetailGroup>
                                </div>
                            </>
                        )}
                    </Card>
                );
            })}

            <Dialog
                open={accepting != null}
                onClose={() => setAccepting(null)}
                title="Antrag annehmen"
                description="Die Mitgliedschaft beginnt mit dem Beschlussdatum des Vorstands."
            >
                <div className="grid gap-4">
                    <Field
                        label="Beschlussdatum"
                        hint="Bestimmt Aufnahmedatum und erstes Beitragsjahr."
                    >
                        <Input
                            type="date"
                            value={joinedAt}
                            onChange={(event) => setJoinedAt(event.target.value)}
                        />
                    </Field>
                    <Field label="Mitglieds-ID" hint="Bei Bedarf überschreiben (falls noch nicht vergeben).">
                        <Input
                            type="number"
                            min={1}
                            step={1}
                            className="max-w-32"
                            value={memberNumberOverride}
                            onChange={(event) => setMemberNumberOverride(event.target.value)}
                        />
                    </Field>
                    {accepting && (
                        <div className="grid gap-1 rounded-[3px] border border-line bg-raised/60 p-4 text-sm">
                            <p className="font-semibold">Es werden folgende Beiträge angelegt:</p>
                            {accepting.feePlan.map((fee) => (
                                <p key={fee.year} className="text-muted">
                                    {fee.year}: {formatEuro(fee.amount)}
                                    {fee.isStudent ? " (ermäßigt)" : ""}
                                </p>
                            ))}
                            <p className="mt-1 text-xs text-faint text-pretty">
                                Bereits vorhandene Beitragszeilen bleiben unverändert. Das
                                Beitragsjahr richtet sich nach dem oben gewählten Beschlussdatum.
                            </p>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        size="sm"
                        variant="soft"
                        color="neutral"
                        onClick={() => setAccepting(null)}
                        disabled={isPending}
                    >
                        Abbrechen
                    </Button>
                    <Button size="sm" onClick={confirmAccept} loading={isPending}>
                        Als Mitglied aufnehmen
                    </Button>
                </DialogFooter>
            </Dialog>

            <Dialog
                open={declining != null}
                onClose={() => setDeclining(null)}
                title="Antrag ablehnen"
                description="Der Antragsteller wird — sofern die Benachrichtigung aktiv ist — per Mail informiert."
            >
                <Field
                    label="Begründung (optional)"
                    hint="Wird in der Ablehnungsmail mitgeschickt."
                >
                    <TextArea value={note} onChange={(event) => setNote(event.target.value)} />
                </Field>
                <DialogFooter>
                    <Button
                        size="sm"
                        variant="soft"
                        color="neutral"
                        onClick={() => setDeclining(null)}
                        disabled={isPending}
                    >
                        Abbrechen
                    </Button>
                    <Button size="sm" color="danger" onClick={confirmDecline} loading={isPending}>
                        Ablehnen
                    </Button>
                </DialogFooter>
            </Dialog>

            <Dialog
                open={pendingDelete != null}
                onClose={() => setPendingDelete(null)}
                title="Antrag löschen?"
                size="sm"
            >
                <p className="text-sm leading-relaxed text-muted">
                    Der Antrag von {pendingDelete?.firstName} {pendingDelete?.lastName} wird endgültig
                    gelöscht — inklusive des dokumentierten SEPA-Mandats. Das lässt sich nicht
                    rückgängig machen.
                </p>
                <DialogFooter>
                    <Button
                        size="sm"
                        variant="soft"
                        color="neutral"
                        onClick={() => setPendingDelete(null)}
                    >
                        Abbrechen
                    </Button>
                    <Button size="sm" color="danger" onClick={confirmDelete}>
                        Endgültig löschen
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

function DetailGroup({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="grid content-start gap-1.5">
            <p className="text-sm font-semibold">{title}</p>
            {children}
        </div>
    );
}

function Detail({ label, value }: { label: string; value: string | null }) {
    return (
        <div className="flex justify-between gap-4">
            <span className="shrink-0 text-muted">{label}</span>
            <span className="min-w-0 text-right font-medium break-words">{value || "—"}</span>
        </div>
    );
}

function formatRange(from: string | null, to: string | null) {
    if (!from && !to) return null;
    const start = from ? dateFormat.format(new Date(from)) : "?";
    const end = to ? dateFormat.format(new Date(to)) : "offen";
    return `${start} – ${end}`;
}
