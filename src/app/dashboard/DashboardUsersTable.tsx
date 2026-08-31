"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Badge,
    Box,
    Button,
    Flex,
    Separator,
    Table,
    Text,
} from "@radix-ui/themes";
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
import { Pencil2Icon } from "@radix-ui/react-icons";
import { EmailComposerDialog } from "@/components/EmailComposerDialog";
import { formatStatus, getStatusTone } from "@/lib/statusLabels";
import type { Status } from "@prisma/client";

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
            <Box style={{ overflowX: "auto" }} mx={{ initial: "-4", sm: "0" }}>
                <Table.Root variant="surface" style={{ minWidth: 640 }}>
                    <Table.Header>
                        <Table.Row>
                            {isAdmin && (
                                <Table.ColumnHeaderCell>
                                    <Flex align="center" gap="2">
                                        <IdCard size={14} />
                                        ID
                                    </Flex>
                                </Table.ColumnHeaderCell>
                            )}
                            <Table.ColumnHeaderCell>
                                <Flex align="center" gap="2">
                                    <User size={14} />
                                    Name
                                </Flex>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                <Flex align="center" gap="2">
                                    <UserCircle size={14} />
                                    Rolle
                                </Flex>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                <Flex align="center" gap="2">
                                    <CheckCircle2 size={14} />
                                    Mitgliedschaft
                                </Flex>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                <Flex align="center" gap="2">
                                    <Mail size={14} />
                                    E-Mail
                                </Flex>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell align="right">
                                <Flex align="center" gap="2" justify="end">
                                    <Pencil size={14} />
                                    Bearbeiten
                                </Flex>
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {visibleUsers.map((u) => {
                            const verified = u.emailVerified;
                            const color = verified ? "var(--green-11)" : "var(--red-11)";
                            return (
                                <Table.Row key={u.id}>
                                    {isAdmin && (
                                        <Table.Cell>
                                            <Text>{u.mitgliedId ?? "—"}</Text>
                                        </Table.Cell>
                                    )}
                                    <Table.Cell>
                                        <Text weight="medium">
                                            {[u.vorname, u.name].filter(Boolean).join(" ") || "—"}
                                        </Text>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge color={u.role === "ADMIN" ? "red" : "blue"} variant="soft">
                                            {u.role === "ADMIN" ? "Admin" : "Member"}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge color={getStatusTone(u.status)} variant="soft">
                                            {getStatusIcon(u.status)}
                                            {formatStatus(u.status)}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Flex
                                            align="center"
                                            gap="2"
                                            onClick={isAdmin ? () => setMailUser(u) : undefined}
                                            style={{
                                                color,
                                                cursor: isAdmin ? "pointer" : "default",
                                            }}
                                            title={isAdmin ? "E-Mail schreiben" : undefined}
                                        >
                                            {verified ? <Check size={16} /> : <X size={16} />}
                                            <Text style={{ color }}>{u.email}</Text>
                                        </Flex>
                                    </Table.Cell>
                                    <Table.Cell align="right">
                                        <Flex gap="2" justify="end">
                                            <Button size="2" variant="soft" asChild>
                                                <Link href={`/dashboard/users/${u.id}`}>
                                                    <Pencil2Icon />
                                                </Link>
                                            </Button>
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Root>
            </Box>

            {!showAll && sortedUsers.length > DEFAULT_VISIBLE && (
                <>
                    <Separator size="4" my="4" />
                    <Flex justify="center">
                        <Button variant="soft" onClick={() => setShowAll(true)}>
                            Zeige alle ({sortedUsers.length} Nutzer)
                        </Button>
                    </Flex>
                </>
            )}

            {isAdmin && (
                <EmailComposerDialog
                    open={mailUser != null}
                    onOpenChange={(open) => {
                        if (!open) setMailUser(null);
                    }}
                    recipients={
                        mailUser
                            ? [{ id: mailUser.id, name: mailDisplayName, email: mailUser.email }]
                            : []
                    }
                    defaultSubject=""
                    defaultMessage=""
                    submitLabel="E-Mail senden"
                />
            )}
        </>
    );
}
