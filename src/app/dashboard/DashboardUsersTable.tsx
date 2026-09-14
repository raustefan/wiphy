"use client";

import { Fragment, useMemo, useState } from "react";
import {
    ArrowUp,
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
import { cn } from "@/lib/cn";
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
    // Voreinstellung wie bisher: nach Mitglieds-ID, Konten ohne ID hinten.
    const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({
        key: "mitgliedId",
        desc: false,
    });

    const sortedUsers = useMemo(() => {
        const direction = sort.desc ? -1 : 1;
        return [...users].sort((a, b) => {
            const result = compareBy(sort.key, a, b);
            // Gleichstand bricht immer nach Namen auf — ohne das springen
            // Zeilen mit gleicher Rolle bei jedem Sortierwechsel umher.
            if (result !== 0) return result * direction;
            return displayName(a).localeCompare(displayName(b), "de");
        });
    }, [users, sort]);

    function toggleSort(key: SortKey) {
        setSort((current) =>
            current.key === key ? { key, desc: !current.desc } : { key, desc: false },
        );
    }

    const visibleUsers =
        showAll || sortedUsers.length <= DEFAULT_VISIBLE
            ? sortedUsers
            : sortedUsers.slice(0, DEFAULT_VISIBLE);

    const mailDisplayName = mailUser
        ? [mailUser.vorname, mailUser.name].filter(Boolean).join(" ") || null
        : null;

    /* Ohne Adminrechte steht in dieser Tabelle genau eine Zeile: die eigene.
       Als Tabelle mit `min-w-[640px]` hieß das auf dem Telefon, die eigenen
       Stammdaten seitwärts scrollen zu müssen — sechs Spalten Kopfzeile für
       einen einzigen Datensatz. Für den Fall ist eine Beschreibungsliste die
       richtige Form: sie bricht um und passt auf jeden Bildschirm. */
    if (!isAdmin) {
        return (
            <dl className="grid gap-3 sm:grid-cols-2">
                {sortedUsers.map((u) => (
                    <Fragment key={u.id}>
                        <ProfileRow
                            icon={<User size={15} aria-hidden="true" />}
                            label="Name"
                            value={[u.vorname, u.name].filter(Boolean).join(" ") || "—"}
                        />
                        <ProfileRow
                            icon={<Mail size={15} aria-hidden="true" />}
                            label="E-Mail"
                            value={
                                <span
                                    className={`flex items-center gap-2 break-all ${
                                        u.emailVerified ? "text-positive" : "text-negative"
                                    }`}
                                >
                                    {u.emailVerified ? <Check size={15} /> : <X size={15} />}
                                    {u.email}
                                </span>
                            }
                        />
                        <ProfileRow
                            icon={<UserCircle size={15} aria-hidden="true" />}
                            label="Rolle"
                            value={
                                <Badge tone={u.role === "ADMIN" ? "market" : "info"}>
                                    {u.role === "ADMIN" ? "Admin" : "Member"}
                                </Badge>
                            }
                        />
                        <ProfileRow
                            icon={<CheckCircle2 size={15} aria-hidden="true" />}
                            label="Mitgliedschaft"
                            value={
                                <Badge tone={getStatusTone(u.status)}>
                                    {getStatusIcon(u.status)}
                                    {formatStatus(u.status)}
                                </Badge>
                            }
                        />
                    </Fragment>
                ))}
            </dl>
        );
    }

    return (
        <>
            <TableWrap>
                <Table className="min-w-[640px]">
                    <thead>
                        <tr className="bg-raised/60">
                            <SortableTh
                                sortKey="mitgliedId"
                                label="ID"
                                icon={<IdCard size={14} aria-hidden="true" />}
                                sort={sort}
                                onSort={toggleSort}
                            />
                            <SortableTh
                                sortKey="name"
                                label="Name"
                                icon={<User size={14} aria-hidden="true" />}
                                sort={sort}
                                onSort={toggleSort}
                            />
                            <SortableTh
                                sortKey="role"
                                label="Rolle"
                                icon={<UserCircle size={14} aria-hidden="true" />}
                                sort={sort}
                                onSort={toggleSort}
                            />
                            <SortableTh
                                sortKey="status"
                                label="Mitgliedschaft"
                                icon={<CheckCircle2 size={14} aria-hidden="true" />}
                                sort={sort}
                                onSort={toggleSort}
                            />
                            <SortableTh
                                sortKey="email"
                                label="E-Mail"
                                icon={<Mail size={14} aria-hidden="true" />}
                                sort={sort}
                                onSort={toggleSort}
                            />
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
                                    <Td className="font-mono tabular-nums">
                                        {u.mitgliedId ?? "—"}
                                    </Td>
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
                                        <button
                                            type="button"
                                            onClick={() => setMailUser(u)}
                                            title="E-Mail schreiben"
                                            className={`flex cursor-pointer items-center gap-2 rounded-md text-left underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-physics ${mailColor}`}
                                        >
                                            {verified ? <Check size={16} /> : <X size={16} />}
                                            {u.email}
                                        </button>
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

            {mailUser && (
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

/**
 * Eine Zeile der Beschreibungsliste im Mitglieder-Fall: Beschriftung mit Symbol
 * über dem Wert, damit lange E-Mail-Adressen umbrechen können statt die Spalte
 * zu sprengen.
 */
function ProfileRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="grid gap-1 rounded-xl border border-line bg-raised/50 px-4 py-3">
            <dt className="flex items-center gap-2 text-sm text-muted">
                <span className="text-faint">{icon}</span>
                {label}
            </dt>
            <dd className="text-sm font-semibold text-foreground">{value}</dd>
        </div>
    );
}

export type SortKey = "mitgliedId" | "name" | "role" | "status" | "email";

function displayName(u: DashboardTableUser) {
    return [u.vorname, u.name].filter(Boolean).join(" ");
}

/**
 * Rangfolge der Mitgliedschaft — alphabetisch wäre hier Unsinn: „Ehrenmitglied“
 * vor „Kein Mitglied“ vor „Ordentliches Mitglied“ sortiert nach Anfangsbuchstabe
 * und nicht nach dem, was die Spalte aussagt.
 */
const STATUS_RANK: Record<string, number> = {
    EHRENMITGLIED: 0,
    ORDENTLICHES_MITGLIED: 1,
    KEIN_MITGLIED: 2,
};

function compareBy(key: SortKey, a: DashboardTableUser, b: DashboardTableUser): number {
    switch (key) {
        case "mitgliedId": {
            // Konten ohne Mitglieds-ID bleiben hinten, in beide Richtungen:
            // sie sind kein „kleinster Wert“, sondern haben schlicht keinen.
            if (a.mitgliedId == null && b.mitgliedId == null) return 0;
            if (a.mitgliedId == null) return 1;
            if (b.mitgliedId == null) return -1;
            return a.mitgliedId - b.mitgliedId;
        }
        case "name":
            return displayName(a).localeCompare(displayName(b), "de");
        case "role":
            // Admins zuerst — die kleinere Gruppe ist die gesuchte.
            return (a.role === "ADMIN" ? 0 : 1) - (b.role === "ADMIN" ? 0 : 1);
        case "status":
            return (STATUS_RANK[String(a.status)] ?? 99) - (STATUS_RANK[String(b.status)] ?? 99);
        case "email":
            return a.email.localeCompare(b.email, "de");
    }
}

/**
 * Spaltenkopf, der die Tabelle sortiert.
 *
 * `aria-sort` sitzt am `<th>`, nicht am Knopf: Screenreader lesen die
 * Sortierung beim Betreten der Spalte vor, nicht erst beim Fokussieren des
 * Knopfes. Der Pfeil daneben ist `aria-hidden` — er wiederholt nur, was
 * `aria-sort` schon sagt.
 */
function SortableTh({
    sortKey,
    label,
    icon,
    sort,
    onSort,
}: {
    sortKey: SortKey;
    label: string;
    icon: React.ReactNode;
    sort: { key: SortKey; desc: boolean };
    onSort: (key: SortKey) => void;
}) {
    const active = sort.key === sortKey;

    return (
        <Th
            aria-sort={active ? (sort.desc ? "descending" : "ascending") : "none"}
            className="p-0"
        >
            <button
                type="button"
                onClick={() => onSort(sortKey)}
                className={cn(
                    "flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-xs font-semibold tracking-wide uppercase transition-colors",
                    "hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-physics",
                    active ? "text-foreground" : "text-faint",
                )}
            >
                {icon}
                {label}
                <ArrowUp
                    size={13}
                    aria-hidden="true"
                    className={cn(
                        "shrink-0 transition-transform motion-reduce:transition-none",
                        active ? "opacity-100" : "opacity-0",
                        active && sort.desc && "rotate-180",
                    )}
                />
            </button>
        </Th>
    );
}
