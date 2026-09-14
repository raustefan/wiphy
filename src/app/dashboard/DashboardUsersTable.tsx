"use client";

import { Fragment, useMemo, useState } from "react";
import {
    User,
    UserCircle,
    CheckCircle2,
    Clock,
    Mail,
    Pencil,
    ShieldCheck,
    Check,
    X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { EmailComposerDialog } from "@/components/EmailComposerDialog";
import { formatStatus, formatStatusShort, getStatusTone } from "@/lib/statusLabels";
import type { Status } from "@prisma/client";
import {
    Badge,
    Button,
    IconButtonLink,
    Separator,
    SortableTh,
    Table,
    TableWrap,
    Td,
    Th,
    type SortState,
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
    const [sort, setSort] = useState<SortState<SortKey>>({
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
            {/*
              Vier Spalten statt sechs — sechs passten auf keinen Telefon-
              bildschirm, und `min-w-[640px]` hieß: bei jedem Blick auf die
              Mitgliederliste erst einmal seitwärts scrollen. Zusammengelegt
              wurde, was ohnehin zusammengehört: Name, Rolle und E-Mail
              beschreiben dasselbe Konto.

              Die Kontospalte bekommt `w-full max-w-0`: so nimmt sie den Rest
              der Zeile ein und ihr Inhalt darf kürzen, statt die Tabelle
              breiter zu machen. Ohne `max-w-0` bestimmt die längste
              E-Mail-Adresse die Tabellenbreite — und das war der Grund für den
              waagerechten Balken.
            */}
            <TableWrap>
                <Table>
                    <thead>
                        <tr className="bg-raised/60">
                            {/* Die Mitglieds-ID ist Buchhaltung des Vereins und
                                erst ab `sm` sichtbar: auf dem Telefon ist der
                                Name das Erkennungsmerkmal, und die Spalte kostet
                                dort ein Fünftel der Breite. */}
                            <SortableTh
                                sortKey="mitgliedId"
                                label="ID"
                                sort={sort}
                                onSort={toggleSort}
                                className="hidden sm:table-cell"
                            />
                            <SortableTh
                                sortKey="name"
                                label="Konto"
                                sort={sort}
                                onSort={toggleSort}
                            />
                            <SortableTh
                                sortKey="status"
                                label="Mitgliedschaft"
                                sort={sort}
                                onSort={toggleSort}
                            />
                            <Th className="px-2 text-right">
                                <span className="sr-only">Bearbeiten</span>
                            </Th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleUsers.map((u) => {
                            const name = displayName(u) || "—";
                            return (
                                <tr key={u.id} className="transition-colors hover:bg-raised/50">
                                    <Td className="hidden px-2 py-2 align-top font-mono tabular-nums text-muted sm:table-cell">
                                        {u.mitgliedId ?? "—"}
                                    </Td>

                                    <Td className="w-full max-w-0 px-2 py-2">
                                        <div className="flex items-center gap-1.5">
                                            {/* Auf schmalen Bildschirmen wird
                                                gekürzt — der volle Name bleibt
                                                über den Tooltip erreichbar. */}
                                            <span className="truncate font-medium" title={name}>
                                                {name}
                                            </span>
                                            {/* Nur Admins tragen ein Zeichen: „ist
                                                kein Admin“ ist der Normalfall und
                                                braucht kein eigenes Symbol. */}
                                            {u.role === "ADMIN" && (
                                                <span
                                                    title="Administrator"
                                                    className="shrink-0 text-market"
                                                >
                                                    <ShieldCheck size={14} aria-hidden="true" />
                                                    <span className="sr-only">Administrator</span>
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setMailUser(u)}
                                            title={`E-Mail an ${u.email} schreiben`}
                                            className={cn(
                                                // `py-1` statt nichts: die Zeile ist
                                                // sonst nur 16 px hoch und auf dem
                                                // Telefon kaum zu treffen.
                                                "flex w-full cursor-pointer items-center gap-1.5 rounded py-1 text-left text-xs underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-physics",
                                                u.emailVerified ? "text-muted" : "text-negative",
                                            )}
                                        >
                                            {/* Das Häkchen sagt „Adresse bestätigt“ —
                                                bestätigt ist der Normalfall, deshalb
                                                fällt hier nur das Kreuz farblich auf. */}
                                            {u.emailVerified ? (
                                                <Check size={13} aria-hidden="true" className="shrink-0" />
                                            ) : (
                                                <X size={13} aria-hidden="true" className="shrink-0" />
                                            )}
                                            <span className="truncate">{u.email}</span>
                                            <span className="sr-only">
                                                {u.emailVerified
                                                    ? " — Adresse bestätigt"
                                                    : " — Adresse nicht bestätigt"}
                                            </span>
                                        </button>
                                    </Td>

                                    <Td className="px-2 py-2 align-top">
                                        <Badge
                                            tone={getStatusTone(u.status)}
                                            title={formatStatus(u.status)}
                                        >
                                            {formatStatusShort(u.status)}
                                        </Badge>
                                    </Td>

                                    <Td className="px-2 py-2 align-top text-right">
                                        <div className="flex justify-end">
                                            <IconButtonLink
                                                href={`/dashboard/users/${u.id}`}
                                                aria-label={`${name || u.email} bearbeiten`}
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

/**
 * Rolle und E-Mail fehlen hier bewusst: seit beide in der Kontospalte stehen,
 * gibt es keinen Spaltenkopf mehr, über den man danach sortieren könnte — ein
 * Sortierschlüssel ohne Bedienelement wäre toter Code.
 */
export type SortKey = "mitgliedId" | "name" | "status";

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
        case "status":
            return (STATUS_RANK[String(a.status)] ?? 99) - (STATUS_RANK[String(b.status)] ?? 99);
    }
}
