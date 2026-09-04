"use client";

import { useMemo, useState } from "react";
import {
    User,
    UserCircle,
    IdCard,
    CheckCircle2,
    Clock,
    Mail,
    Pencil,
    Check,
    X,
} from "lucide-react";
import { EmailComposerDialog } from "@/components/EmailComposerDialog";
import { formatStatus, getStatusTone } from "@/lib/statusLabels";
import type { Status } from "@prisma/client";
import {
    Badge,
    Button,
    IconButtonLink,
    Separator,
    Table,
    TableWrap,
    Td,
    Th,
} from "@/components/ui";

const DEFAULT_VISIBLE = 5;

function getStatusIcon(status?: Status | string) {
    switch (status) {
        case "EHRENMITGLIED":
            return <CheckCircle2 size={14} />;
        case "ORDENTLICHES_MITGLIED":
            return <CheckCircle2 size={14} />;
        case "KEIN_MITGLIED":
        default:
            return <Clock size={14} />;
    }
}

export type DashboardTableUser = {
    id: string;
    email: string;
    vorname: string | null;
    name: string | null;
    mitgliedId: number | null;
    role: string;
    status: Status | string;
    emailVerified: boolean;
};

export function DashboardUsersTable({
    users,
    isAdmin,
}: {
    users: DashboardTableUser[];
    isAdmin: boolean;
}) {
    const [showAll, setShowAll] = useState(false);
    const [mailUser, setMailUser] = useState<DashboardTableUser | null>(null);

    const sortedUsers = useMemo(() => {
        return [...users].sort((a, b) => {
            const aHas = a.mitgliedId != null;
            const bHas = b.mitgliedId != null;
            if (aHas && bHas) return a.mitgliedId! - b.mitgliedId!;
            if (aHas) return -1;
            if (bHas) return 1;
            return (a.name ?? "").localeCompare(b.name ?? "", "de");
        });
    }, [users]);

    const visibleUsers =
        showAll || sortedUsers.length <= DEFAULT_VISIBLE
            ? sortedUsers
            : sortedUsers.slice(0, DEFAULT_VISIBLE);

    const mailDisplayName = mailUser
        ? [mailUser.vorname, mailUser.name].filter(Boolean).join(" ") || null
        : null;

    return (
        <>
            <TableWrap>
                <Table className="min-w-[640px]">
                    <thead>
                        <tr className="bg-raised/60">
                            {isAdmin && (
                                <Th>
                                    <span className="flex items-center gap-2">
                                        <IdCard size={14} aria-hidden="true" />
                                        ID
                                    </span>
                                </Th>
                            )}
                            <Th>
                                <span className="flex items-center gap-2">
                                    <User size={14} aria-hidden="true" />
                                    Name
                                </span>
                            </Th>
                            <Th>
                                <span className="flex items-center gap-2">
                                    <UserCircle size={14} aria-hidden="true" />
                                    Rolle
                                </span>
                            </Th>
                            <Th>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 size={14} aria-hidden="true" />
                                    Mitgliedschaft
                                </span>
                            </Th>
                            <Th>
                                <span className="flex items-center gap-2">
                                    <Mail size={14} aria-hidden="true" />
                                    E-Mail
                                </span>
                            </Th>
                            <Th className="text-right">
                                <span className="flex items-center justify-end gap-2">
                                    <Pencil size={14} aria-hidden="true" />
                                    Bearbeiten
                                </span>
                            </Th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleUsers.map((u) => {
                            const verified = u.emailVerified;
                            const mailColor = verified ? "text-positive" : "text-negative";
                            return (
                                <tr key={u.id} className="transition-colors hover:bg-raised/50">
                                    {isAdmin && (
                                        <Td className="font-mono tabular-nums">
                                            {u.mitgliedId ?? "—"}
                                        </Td>
                                    )}
                                    <Td className="font-medium">
                                        {[u.vorname, u.name].filter(Boolean).join(" ") || "—"}
                                    </Td>
                                    <Td>
                                        <Badge tone={u.role === "ADMIN" ? "market" : "info"}>
                                            {u.role === "ADMIN" ? "Admin" : "Member"}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        <Badge tone={getStatusTone(u.status)}>
                                            {getStatusIcon(u.status)}
                                            {formatStatus(u.status)}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        {isAdmin ? (
                                            <button
                                                type="button"
                                                onClick={() => setMailUser(u)}
                                                title="E-Mail schreiben"
                                                className={`flex cursor-pointer items-center gap-2 rounded-md text-left underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-physics ${mailColor}`}
                                            >
                                                {verified ? <Check size={16} /> : <X size={16} />}
                                                {u.email}
                                            </button>
                                        ) : (
                                            <span className={`flex items-center gap-2 ${mailColor}`}>
                                                {verified ? <Check size={16} /> : <X size={16} />}
                                                {u.email}
                                            </span>
                                        )}
                                    </Td>
                                    <Td className="text-right">
                                        <div className="flex justify-end">
                                            <IconButtonLink
                                                href={`/dashboard/users/${u.id}`}
                                                aria-label={`${
                                                    [u.vorname, u.name].filter(Boolean).join(" ") ||
                                                    u.email
                                                } bearbeiten`}
                                                variant="soft"
                                                color="accent"
                                                size="sm"
                                            >
                                                <Pencil size={15} aria-hidden="true" />
                                            </IconButtonLink>
                                        </div>
                                    </Td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </TableWrap>

            {!showAll && sortedUsers.length > DEFAULT_VISIBLE && (
                <>
                    <Separator className="my-4" />
                    <div className="flex justify-center">
                        <Button variant="soft" color="neutral" onClick={() => setShowAll(true)}>
                            Zeige alle ({sortedUsers.length} Nutzer)
                        </Button>
                    </div>
                </>
            )}

            {isAdmin && mailUser && (
                <EmailComposerDialog
                    onClose={() => setMailUser(null)}
                    recipients={[
                        { id: mailUser.id, name: mailDisplayName, email: mailUser.email },
                    ]}
                    defaultSubject=""
                    defaultMessage=""
                    submitLabel="E-Mail senden"
                />
            )}
        </>
    );
}
