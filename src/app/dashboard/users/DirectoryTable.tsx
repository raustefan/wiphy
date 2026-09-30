"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Plus,
  Calendar,
  Check,
  Pencil,
  PencilLine,
  SearchX,
  CircleEuro,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CirclePlus,
  GraduationCap,
  HandCoins,
  Landmark,
  ListChecks,
  Lock,
  LockOpen,
  Mail,
  MessageSquareText,
  ShieldCheck,
  UserRound,
  UserX,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  EmailComposerDialog,
  type MailRecipient,
} from "@/components/EmailComposerDialog";
import { formatDate, formatDateShort, formatEuro } from "@/lib/format";
import { groupAccounts } from "@/lib/memberDirectory";
import { renderBlocksEditorHtml } from "@/lib/email/blocks";
import { feeReminderMessage } from "@/lib/email/messages";
import {
  Badge,
  Button,
  ButtonLink,
  Callout,
  Checkbox,
  Dialog,
  DialogFooter,
  Field,
  IconButton,
  IconButtonLink,
  Input,
  Select,
  Separator,
  Switch,
  SortableTh,
  Table,
  TableWrap,
  Td,
  TextArea,
  Th,
  type SortState,
} from "@/components/ui";
import {
  updateFeeStatus,
  updateFeeAmount,
  revertFeeAmount,
  updateFeeComment,
  initializeBillingYear,
} from "./feeActions";
import type { SepaCandidate } from "@/lib/server/services/feeService";
import { SepaDialog } from "./SepaDialog";

export type DirectoryAccount = {
  id: string;
  name: string | null;
  vorname: string;
  email: string;
  mitgliedId: number | null;
  zahlungsKommentar: string | null;
  aufnahmedatum: string | null;
  bankeinzug: boolean;
  /** Vom Mitglied erklärte Jahre mit Sonderstatus (§ 5). */
  studentYears: number[];
  role: string;
  status: string;
  emailVerified: boolean;
  loginDisabled: boolean;
  /** ISO-Zeitpunkt. */
  lastLogin: string;
  /** Steht in der Beitragsliste des gewählten Jahres. */
  inFeeYear: boolean;
  fees: Array<{
    jahr: number;
    bezahlt: boolean;
    isStudent: boolean;
    /** Tatsächlich fälliger Betrag: Standard oder manuelle Ausnahme. */
    beitrag: number;
    /** Was der beschlossene Standardbeitrag ergäbe. */
    standard: number;
    manuell: boolean;
    angelegt: boolean;
    breakdown: { monthly: number; months: number; base: number; surcharge: number };
  }>;
};

type SortKey = "mitgliedId" | "name" | "aufnahme" | "lastLogin" | "student" | "paid" | "amount";

function displayName(user: DirectoryAccount) {
  return [user.vorname, user.name].filter(Boolean).join(" ");
}

/** Beitragszeile des Jahres — nur für Konten in der Beitragsliste. */
function yearFee(user: DirectoryAccount, year: number) {
  return user.inFeeYear ? user.fees.find((f) => f.jahr === year) : undefined;
}

/** Leere Werte bleiben in beide Richtungen hinten — sie haben keinen Wert, nicht den kleinsten. */
function compareNullable<T>(a: T | null | undefined, b: T | null | undefined, compare: (a: T, b: T) => number) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return compare(a, b);
}

/**
 * Vergleich für die Sortierung innerhalb einer Gruppe. Zahlung und Tarif hängen
 * am gewählten Jahr; aufsteigend heißt dort „das Auffällige zuerst“: offene
 * Beiträge und Sonderstatus sind das, wonach gesucht wird.
 */
function compareBy(key: SortKey, a: DirectoryAccount, b: DirectoryAccount, year: number): number {
  switch (key) {
    case "mitgliedId":
      return compareNullable(a.mitgliedId, b.mitgliedId, (x, y) => x - y);
    case "name":
      return displayName(a).localeCompare(displayName(b), "de");
    case "aufnahme":
      return compareNullable(a.aufnahmedatum, b.aufnahmedatum, (x, y) => x.localeCompare(y));
    case "lastLogin":
      return a.lastLogin.localeCompare(b.lastLogin);
    case "paid":
      return compareNullable(yearFee(a, year)?.bezahlt, yearFee(b, year)?.bezahlt, (x, y) => Number(x) - Number(y));
    case "student":
      // Ohne Beitragszeile zählt die Erklärung des Mitglieds — genau das zeigt die Spalte.
      return compareNullable(
        a.inFeeYear ? (yearFee(a, year)?.isStudent ?? a.studentYears.includes(year)) : null,
        b.inFeeYear ? (yearFee(b, year)?.isStudent ?? b.studentYears.includes(year)) : null,
        (x, y) => Number(y) - Number(x),
      );
    case "amount":
      return compareNullable(yearFee(a, year)?.beitrag, yearFee(b, year)?.beitrag, (x, y) => x - y);
  }
}

function explainFee(fee: DirectoryAccount["fees"][number]) {
  const parts = [
    `${formatEuro(fee.breakdown.monthly)}/Monat × ${fee.breakdown.months} ${
      fee.breakdown.months === 1 ? "Monat" : "Monate"
    }`,
  ];
  if (fee.breakdown.months < 12) parts.push("anteilig ab Eintritt (§ 5 Abs. 3)");
  if (fee.breakdown.surcharge > 0) {
    parts.push(`+ ${formatEuro(fee.breakdown.surcharge)} ohne Lastschrift (§ 5 Abs. 5)`);
  }
  return parts.join(" · ");
}

/**
 * Zeigt am Namen, ob der Beitrag per SEPA-Lastschrift eingezogen wird.
 *
 * Beide Zustände bekommen ein eigenes Symbol statt eines vorhandenen gegen ein
 * fehlendes: „kein Zeichen“ ließe offen, ob die Angabe fehlt oder das Mandat.
 * Die Unterscheidung hängt außerdem nicht an der Farbe allein — Bankgebäude
 * gegen Münzen in der Hand —, und der Klartext steht im `title` wie für
 * Screenreader.
 *
 * Die Angabe gehört hierher, weil sie den Betrag daneben erklärt: ohne
 * Lastschrift kommen 10 % Aufschlag dazu (§ 5 Abs. 5).
 */
function SepaMark({ bankeinzug }: { bankeinzug: boolean }) {
  const label = bankeinzug
    ? "SEPA-Lastschrift erteilt"
    : "Keine SEPA-Lastschrift — Beitrag mit Aufschlag (§ 5 Abs. 5)";

  return (
    <span
      title={label}
      className={`shrink-0 ${bankeinzug ? "text-physics" : "text-faint"}`}
    >
      {bankeinzug ? (
        <Landmark size={14} aria-hidden="true" />
      ) : (
        <HandCoins size={14} aria-hidden="true" />
      )}
      <span className="sr-only">{label}</span>
    </span>
  );
}


const chipTones = {
  neutral: "bg-raised text-muted",
  info: "bg-info/12 text-info",
  positive: "bg-positive/12 text-positive",
  negative: "bg-negative/12 text-negative",
} as const;

/**
 * Status als runder Symbol-Chip — gesperrt reine Anzeige, freigeschaltet ein
 * Knopf, der den Zustand umschaltet. Symbol *und* Farbe tragen die Aussage,
 * der Klartext steht im `title` und für Screenreader im `aria-label`. Beide
 * Formen sind gleich groß: der Rand ist ein `ring-inset`, beim Freischalten
 * springt nichts.
 */
function StatusChip({
  interactive,
  tone,
  icon,
  actionLabel,
  title,
}: {
  interactive: boolean;
  tone: keyof typeof chipTones;
  icon: React.ReactNode;
  actionLabel: string;
  title: string;
}) {
  const className = cn(
    "inline-flex size-8 items-center justify-center rounded-full",
    chipTones[tone],
    interactive &&
      "cursor-pointer ring-1 ring-current/35 ring-inset transition-shadow hover:ring-2 hover:ring-current/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
  );
  return interactive ? (
    <button type="submit" className={className} aria-label={actionLabel} title={title}>
      <span aria-hidden="true">{icon}</span>
    </button>
  ) : (
    <span role="img" className={className} aria-label={actionLabel} title={title}>
      <span aria-hidden="true">{icon}</span>
    </span>
  );
}

function IconHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center justify-center" aria-label={label} title={label}>
      {icon}
    </span>
  );
}

function CommentDialog({
  user,
  open,
  onClose,
}: {
  user: DirectoryAccount | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Kommentar – ${user.vorname} ${user.name ?? ""}`}
      description="Zahlungs- oder Mitgliedschaftshinweis für dieses Mitglied."
    >
      <form action={updateFeeComment}>
        <input type="hidden" name="userId" value={user.id} />
        <TextArea
          name="comment"
          rows={4}
          defaultValue={user.zahlungsKommentar ?? ""}
          placeholder="Kommentar eingeben…"
        />
        <DialogFooter>
          <Button variant="soft" color="neutral" type="button" onClick={onClose}>
            Abbrechen
          </Button>
          <Button type="submit">Speichern</Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}

/**
 * Ausnahme-Dialog für den Beitrag.
 *
 * Der Regelfall braucht keine Eingabe — er ergibt sich aus den beschlossenen
 * Standardsätzen. Nur wer davon abweichen will, öffnet diesen Dialog; ein
 * Zurücksetzen führt die Zeile wieder in den Automatismus zurück.
 */
function AmountDialog({
  target,
  onClose,
}: {
  target: { user: DirectoryAccount; fee: DirectoryAccount["fees"][number] } | null;
  onClose: () => void;
}) {
  if (!target) return null;
  const { user, fee } = target;

  return (
    <Dialog
      open
      onClose={onClose}
      title={`Beitrag ${fee.jahr} – ${user.vorname} ${user.name ?? ""}`}
      description="Nur für Ausnahmefälle. Ohne Abweichung gilt automatisch der Standardbeitrag."
    >
      <div className="mb-4 grid gap-1 rounded-xl border border-line bg-raised/60 p-4 text-sm">
        <p>
          Standardbeitrag:{" "}
          <span className="font-semibold tabular-nums">{formatEuro(fee.standard)}</span>
        </p>
        <p className="text-muted">{explainFee(fee)}</p>
      </div>

      <form action={updateFeeAmount} onSubmit={onClose}>
        <input type="hidden" name="userId" value={user.id} />
        <input type="hidden" name="year" value={fee.jahr} />
        <Field label="Abweichender Betrag (€)">
          <Input
            type="number"
            name="beitrag"
            step="0.01"
            min="0"
            defaultValue={fee.beitrag}
            autoFocus
          />
        </Field>
        <DialogFooter>
          <Button variant="soft" color="neutral" type="button" onClick={onClose}>
            Abbrechen
          </Button>
          <Button type="submit">Ausnahme speichern</Button>
        </DialogFooter>
      </form>

      {fee.manuell && (
        <form action={revertFeeAmount} onSubmit={onClose} className="mt-2">
          <input type="hidden" name="userId" value={user.id} />
          <input type="hidden" name="year" value={fee.jahr} />
          <Button type="submit" variant="ghost" color="neutral" size="sm" className="w-full">
            Auf Standardbeitrag zurücksetzen
          </Button>
        </form>
      )}
    </Dialog>
  );
}

export function UserPaymentHistoryDialog({
  user,
  open,
  onClose,
}: {
  user: DirectoryAccount | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!user) return null;

  const sortedFees = [...user.fees].sort((a, b) => b.jahr - a.jahr);
  const openCount = sortedFees.filter((f) => !f.bezahlt).length;

  return (
    <Dialog open={open} onClose={onClose} size="lg">
      <div className="mb-1 flex items-start justify-between gap-3">
        <h2 className="text-lg font-bold tracking-tight">
          {user.vorname} {user.name ?? ""}
        </h2>
        {openCount > 0 && <Badge tone="negative">{openCount} offen</Badge>}
      </div>
      <p className="text-sm text-muted">{user.email}</p>

      <p className="mt-3 flex items-center gap-2 text-sm">
        <Calendar size={16} className="text-faint" aria-hidden="true" />
        Mitglied seit <span className="font-medium">{formatDate(user.aufnahmedatum)}</span>
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
        <GraduationCap size={16} className="text-faint" aria-hidden="true" />
        Sonderstatus erklärt für:
        {user.studentYears.length === 0 ? (
          <span className="font-medium">—</span>
        ) : (
          user.studentYears.map((year) => (
            <Badge key={year} tone="info">
              {year}
            </Badge>
          ))
        )}
      </div>

      <p className="mt-1 flex items-center gap-2 text-sm text-muted">
        <CircleEuro size={16} className="text-faint" aria-hidden="true" />
        {user.bankeinzug
          ? "Lastschrifteinzug erteilt"
          : "Kein Lastschriftmandat — Beiträge mit 10 % Aufschlag (§ 5 Abs. 5)"}
      </p>

      <Separator className="my-3" />

      {sortedFees.length === 0 ? (
        <p className="text-sm text-muted">Keine Zahlungsdaten vorhanden.</p>
      ) : (
        <div className="max-h-80 overflow-y-auto">
          <Table>
            <thead>
              <tr className="bg-raised/60">
                <Th>Jahr</Th>
                <Th className="text-center">
                  <IconHeader icon={<GraduationCap size={16} />} label="Student" />
                </Th>
                <Th className="text-center">
                  <IconHeader icon={<CircleEuro size={16} />} label="Bezahlt" />
                </Th>
                <Th className="text-right">Betrag</Th>
              </tr>
            </thead>
            <tbody>
              {sortedFees.map((fee) => (
                <tr key={fee.jahr}>
                  <Td className="font-mono font-medium tabular-nums">{fee.jahr}</Td>
                  <Td className="text-center">
                    <Badge tone={fee.isStudent ? "info" : "neutral"}>
                      {fee.isStudent ? "Ja" : "Nein"}
                    </Badge>
                  </Td>
                  <Td className="text-center">
                    <Badge tone={fee.bezahlt ? "positive" : "negative"}>
                      {fee.bezahlt ? "Bezahlt" : "Offen"}
                    </Badge>
                  </Td>
                  <Td className="text-right tabular-nums">
                    {formatEuro(fee.beitrag)}
                    {fee.manuell && (
                      <Badge tone="warning" className="ml-2">
                        Ausnahme
                      </Badge>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <DialogFooter>
        <Button variant="soft" color="neutral" onClick={onClose}>
          Schließen
        </Button>
        <ButtonLink href={`/dashboard/users/${user.id}`} variant="soft">
          <Pencil size={15} aria-hidden="true" />
          Profil bearbeiten
        </ButtonLink>
      </DialogFooter>
    </Dialog>
  );
}


const GROUPS = [
  { key: "members", label: "Mitglieder" },
  { key: "honorary", label: "Ehrenmitglieder" },
  { key: "none", label: "Keine Mitglieder" },
] as const;

/** Spaltenzahl inklusive der auf dem Telefon ausgeblendeten — für `colSpan`. */
const COLUMNS = 9;

/**
 * Eine Tabelle für alle Konten, hart getrennt in Mitglieder, Ehrenmitglieder
 * und Konten ohne Mitgliedschaft. Jede Gruppe ist ein eigener `<tbody>` mit
 * Trennzeile; sortiert wird innerhalb der Gruppen, die Reihenfolge der Gruppen
 * bleibt.
 *
 * Alles, was Zahlungen und Tarif ändert, ist erst nach „Bearbeiten“
 * anklickbar. Auswahl, Notiz, E-Mail, Beitragsverlauf und Profil jederzeit.
 */
export function DirectoryTable({
  users,
  visibleIds,
  selectedYear,
  availableYears,
  sepaCandidates,
}: {
  users: DirectoryAccount[];
  /** Treffer der Suche und Filter; ohne Angabe alle. */
  visibleIds?: Set<string>;
  selectedYear: number;
  availableYears: number[];
  sepaCandidates: SepaCandidate[];
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [mailUsers, setMailUsers] = useState<DirectoryAccount[] | null>(null);
  const [sepaOpen, setSepaOpen] = useState(false);
  const [commentUser, setCommentUser] = useState<DirectoryAccount | null>(null);
  const [historyUser, setHistoryUser] = useState<DirectoryAccount | null>(null);
  const [amountTarget, setAmountTarget] = useState<{
    user: DirectoryAccount;
    fee: DirectoryAccount["fees"][number];
  } | null>(null);
  // Schutz vor Fehlklicks: Zahlungsstatus, Sonderstatus, Beträge und neue
  // Beitragsjahre lassen sich erst nach bewusstem Freischalten ändern. Nach
  // einem Neuladen ist wieder gesperrt.
  const [editing, setEditing] = useState(false);
  const [sort, setSort] = useState<SortState<SortKey>>({ key: "name", desc: false });
  const [revertConfirm, setRevertConfirm] = useState<{
    form: HTMLFormElement;
    label: string;
  } | null>(null);
  const bypassFormsRef = useRef<WeakSet<HTMLFormElement>>(new WeakSet());

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const userById = useMemo(() => new Map(users.map((u) => [u.id, u])), [users]);

  const groups = useMemo(() => {
    const visible = visibleIds ? users.filter((u) => visibleIds.has(u.id)) : users;
    const direction = sort.desc ? -1 : 1;
    const sorted = [...visible].sort((a, b) => {
      const result = compareBy(sort.key, a, b, selectedYear);
      // Gleichstand bricht nach Namen auf: sonst springen Zeilen bei jedem
      // Sortierwechsel umher.
      if (result !== 0) return result * direction;
      return displayName(a).localeCompare(displayName(b), "de");
    });
    const grouped = groupAccounts(sorted);
    return GROUPS.map((g) => ({ ...g, users: grouped[g.key] }));
  }, [users, visibleIds, sort, selectedYear]);
  const visibleUsers = groups.flatMap((g) => g.users);

  // Jahr ohne angelegte Beitragszeilen: erklären und das Anlegen anbieten.
  const feeRows = users.filter((u) => u.inFeeYear);
  const missing = feeRows.filter((u) => yearFee(u, selectedYear)?.angelegt === false).length;

  const selectedUsers = useMemo(
    () =>
      Array.from(selectedIds)
        .map((id) => userById.get(id))
        .filter((u): u is DirectoryAccount => u != null),
    [selectedIds, userById],
  );

  const mailRecipients: MailRecipient[] = (mailUsers ?? []).map((u) => ({
    id: u.id,
    name: displayName(u) || null,
    email: u.email,
  }));
  // Die Beitragserinnerung ist nur vorbelegt, wenn alle Empfänger in der
  // Beitragsliste stehen — einem Ehrenmitglied schreibt man etwas anderes.
  const mailIsReminder = mailUsers != null && mailUsers.every((u) => u.inFeeYear);
  const reminderDefaults = useMemo(() => {
    const single = mailUsers?.length === 1 ? mailUsers[0] : undefined;
    const message = feeReminderMessage({
      vorname: single?.vorname,
      name: single?.name,
      year: selectedYear,
    });
    return { subject: message.subject, html: renderBlocksEditorHtml(message.blocks) };
  }, [mailUsers, selectedYear]);

  function toggleSort(key: SortKey) {
    setSort((current) =>
      current.key === key ? { key, desc: !current.desc } : { key, desc: false },
    );
  }

  function handleYearChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  function toggleSelection(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAllWithOpenFees() {
    setSelectedIds(
      new Set(
        visibleUsers
          .filter((u) => {
            const fee = yearFee(u, selectedYear);
            return fee != null && !fee.bezahlt;
          })
          .map((u) => u.id),
      ),
    );
  }

  function confirmRevert() {
    if (revertConfirm) {
      bypassFormsRef.current.add(revertConfirm.form);
      revertConfirm.form.requestSubmit();
    }
    setRevertConfirm(null);
  }

  return (
    <>
      <div className="mb-3 grid gap-3 rounded-2xl border border-line bg-raised/40 p-3 sm:p-4">
        {/* Schalter und „Neues Jahr“ stehen in beiden Zuständen an derselben
            Stelle und in derselben Breite — nichts rutscht unter den
            Mauszeiger, der den Schalter gerade bedient hat. */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-faint" aria-hidden="true" />
            <label htmlFor="fees-year" className="text-sm font-medium">
              Beitragsjahr
            </label>
            <Select
              id="fees-year"
              value={String(selectedYear)}
              onChange={(e) => handleYearChange(e.target.value)}
              className="py-1.5"
            >
              {availableYears.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <form action={initializeBillingYear}>
              <fieldset
                disabled={!editing}
                className="flex items-center gap-2"
                title={editing ? undefined : "Zum Anlegen erst „Bearbeiten“ freischalten"}
              >
                <label htmlFor="fees-new-year" className="text-xs whitespace-nowrap text-muted">
                  Neues Jahr
                </label>
                {/* Eigene Breite am Wrapper: `Input` bringt `w-full` mit. */}
                <div className="w-22">
                  <Input
                    id="fees-new-year"
                    type="number"
                    name="year"
                    defaultValue={new Date().getFullYear() + 1}
                    className="py-1.5"
                  />
                </div>
                <IconButton
                  type="submit"
                  variant="soft"
                  color="accent"
                  size="sm"
                  aria-label="Jahr für alle Mitglieder anlegen"
                >
                  <Plus size={16} aria-hidden="true" />
                </IconButton>
              </fieldset>
            </form>

            <div
              className={cn(
                "flex items-center gap-2 rounded-full border py-1 pr-3 pl-1 transition-colors",
                editing ? "border-physics/40 bg-physics/10" : "border-line bg-surface",
              )}
            >
              <Switch
                checked={editing}
                onCheckedChange={setEditing}
                aria-label="Zahlungsdaten bearbeiten"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium",
                  editing ? "text-physics" : "text-muted",
                )}
              >
                {editing ? <LockOpen size={14} /> : <Lock size={14} />}
                Bearbeiten
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={selectedIds.size > 0 ? "info" : "neutral"}>
              <ListChecks size={13} aria-hidden="true" />
              {selectedIds.size} ausgewählt
            </Badge>
            <Button size="sm" variant="outline" color="neutral" type="button" onClick={selectAllWithOpenFees}>
              <CircleAlert size={15} aria-hidden="true" />
              Alle offenen
            </Button>
            {selectedIds.size > 0 && (
              <Button
                size="sm"
                variant="ghost"
                color="neutral"
                type="button"
                onClick={() => setSelectedIds(new Set())}
              >
                Auswahl leeren
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              type="button"
              disabled={selectedIds.size === 0}
              onClick={() => setSepaOpen(true)}
            >
              <Landmark size={15} aria-hidden="true" />
              SEPA-Lastschrift
            </Button>
            <Button
              size="sm"
              type="button"
              disabled={selectedIds.size === 0}
              onClick={() => setMailUsers(selectedUsers)}
            >
              <Mail size={15} aria-hidden="true" />
              E-Mail an Auswahl
            </Button>
          </div>
        </div>
      </div>

      {missing > 0 && (
        <Callout tone="info" className="mb-3" icon={<CircleDashed size={16} aria-hidden="true" />}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-pretty">
              <strong className="font-semibold">
                {missing === feeRows.length
                  ? `Das Beitragsjahr ${selectedYear} ist noch nicht angelegt.`
                  : `${missing} von ${feeRows.length} Mitgliedern ${missing === 1 ? "hat" : "haben"} für ${selectedYear} noch keinen Beitragseintrag.`}
              </strong>{" "}
              Die Beträge sind aus den Standardsätzen berechnet und gelten als offen, bis sie als
              bezahlt markiert werden.
            </p>
            <form action={initializeBillingYear} className="shrink-0">
              <input type="hidden" name="year" value={selectedYear} />
              <Button
                type="submit"
                size="sm"
                variant="outline"
                disabled={!editing}
                title={editing ? undefined : "Erst „Bearbeiten“ freischalten"}
              >
                <CirclePlus size={15} aria-hidden="true" />
                Einträge für {selectedYear} anlegen
              </Button>
            </form>
          </div>
        </Callout>
      )}

      <TableWrap
        className={cn(
          "rounded-xl border transition-colors",
          editing ? "border-physics/50" : "border-line",
        )}
      >
        <Table>
          <thead>
            <tr className="bg-raised/60">
              <Th className="w-10 px-3">
                <span className="sr-only">Auswahl</span>
              </Th>
              <SortableTh sortKey="mitgliedId" label="Nr." sort={sort} onSort={toggleSort} className="hidden w-14 sm:table-cell" />
              <SortableTh sortKey="name" label="Konto" sort={sort} onSort={toggleSort} />
              <SortableTh sortKey="aufnahme" label="Aufnahme" sort={sort} onSort={toggleSort} className="hidden w-24 md:table-cell" />
              <SortableTh sortKey="lastLogin" label="Login" sort={sort} onSort={toggleSort} className="hidden w-24 lg:table-cell" />
              <SortableTh
                sortKey="student"
                label="Tarif"
                icon={<GraduationCap size={15} />}
                align="center"
                sort={sort}
                onSort={toggleSort}
                className="hidden w-12 sm:table-cell"
              />
              <SortableTh
                sortKey="paid"
                label="Zahlung"
                icon={<CircleCheck size={15} />}
                align="center"
                sort={sort}
                onSort={toggleSort}
                className="w-12"
              />
              <SortableTh sortKey="amount" label={String(selectedYear)} align="right" sort={sort} onSort={toggleSort} className="w-24" />
              <Th className="w-20 px-2">
                <span className="sr-only">Aktionen</span>
              </Th>
            </tr>
          </thead>

          {visibleUsers.length === 0 && (
            <tbody>
              <tr>
                <Td colSpan={COLUMNS} className="py-10 text-center text-muted">
                  <SearchX size={20} aria-hidden="true" className="mx-auto mb-2 text-faint" />
                  Keine Konten gefunden.
                </Td>
              </tr>
            </tbody>
          )}

          {groups.map(
            (group) =>
              group.users.length > 0 && (
                <tbody key={group.key}>
                  {/* Trennzeile: die kräftige Linie oben trennt die Gruppen hart. */}
                  <tr>
                    <th
                      scope="rowgroup"
                      colSpan={COLUMNS}
                      className="border-t-2 border-line-strong bg-raised/70 px-3 py-1.5 text-left text-xs font-semibold tracking-wide text-muted uppercase"
                    >
                      {group.label}{" "}
                      <span className="font-normal text-faint tabular-nums">· {group.users.length}</span>
                    </th>
                  </tr>
                  {group.users.map((user) => {
                    const name = displayName(user) || "—";
                    const fee = yearFee(user, selectedYear);
                    const paid = fee?.bezahlt ?? false;
                    const isStudent = fee?.isStudent ?? false;
                    const declaredStudent = user.studentYears.includes(selectedYear);
                    const isSelected = selectedIds.has(user.id);
                    const leftThisYear = user.inFeeYear && user.status === "KEIN_MITGLIED";
                    return (
                      <tr
                        key={user.id}
                        className={cn("transition-colors hover:bg-raised/50", isSelected && "bg-info/6")}
                      >
                        <Td className="px-3 py-1.5 pointer-coarse:py-2">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => toggleSelection(user.id)}
                            aria-label={`${name} auswählen`}
                          />
                        </Td>
                        <Td className="hidden px-2 py-1.5 font-mono text-xs text-muted tabular-nums sm:table-cell">
                          {user.mitgliedId ?? "—"}
                        </Td>

                        {/* `w-full max-w-0`: die Spalte nimmt den Rest der
                            Zeile und kürzt, statt die Tabelle mit der längsten
                            Adresse zu verbreitern. */}
                        <Td className="w-full max-w-0 px-2 py-1.5 pointer-coarse:py-2">
                          <div className="flex items-center gap-1.5">
                            {/* Der Name öffnet den Beitragsverlauf — mit Link zum Profil. */}
                            <button
                              type="button"
                              onClick={() => setHistoryUser(user)}
                              title={`${name} — Beitragsverlauf öffnen`}
                              className="min-w-0 cursor-pointer truncate rounded-sm text-left font-medium underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-physics"
                            >
                              {name}
                              <span className="sr-only"> — Beitragsverlauf öffnen</span>
                            </button>
                            {user.role === "ADMIN" && (
                              <span title="Administrator" className="shrink-0 text-market">
                                <ShieldCheck size={13} aria-hidden="true" />
                                <span className="sr-only">Administrator</span>
                              </span>
                            )}
                            {user.loginDisabled && (
                              <span title="Login gesperrt" className="shrink-0 text-negative">
                                <UserX size={13} aria-hidden="true" />
                                <span className="sr-only">Login gesperrt</span>
                              </span>
                            )}
                            <SepaMark bankeinzug={user.bankeinzug} />
                            {leftThisYear && (
                              <Badge className="shrink-0 px-1.5 py-0 text-[11px]" title="Im Beitragsjahr ausgetreten">
                                ausgetreten
                              </Badge>
                            )}
                            {!user.inFeeYear && user.status === "ORDENTLICHES_MITGLIED" && (
                              <Badge className="shrink-0 px-1.5 py-0 text-[11px]" title={`Erst nach ${selectedYear} eingetreten`}>
                                neu
                              </Badge>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => setMailUsers([user])}
                            title={`E-Mail an ${user.email} schreiben`}
                            className={cn(
                              "flex w-full cursor-pointer items-center gap-1 rounded text-left text-xs underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-physics",
                              user.emailVerified ? "text-muted" : "text-negative",
                            )}
                          >
                            {user.emailVerified ? (
                              <Check size={12} aria-hidden="true" className="shrink-0" />
                            ) : (
                              <X size={12} aria-hidden="true" className="shrink-0" />
                            )}
                            <span className="truncate">{user.email}</span>
                            <span className="sr-only">
                              {user.emailVerified ? " — Adresse bestätigt" : " — Adresse nicht bestätigt"}
                            </span>
                          </button>
                        </Td>

                        <Td className="hidden px-2 py-1.5 text-xs whitespace-nowrap text-muted tabular-nums md:table-cell">
                          {formatDateShort(user.aufnahmedatum)}
                        </Td>
                        <Td className="hidden px-2 py-1.5 text-xs whitespace-nowrap text-muted tabular-nums lg:table-cell">
                          {formatDateShort(user.lastLogin)}
                        </Td>

                        <Td className="hidden px-1 py-1.5 text-center sm:table-cell">
                          {fee ? (
                            <form action={updateFeeStatus}>
                              <input type="hidden" name="userId" value={user.id} />
                              <input type="hidden" name="year" value={selectedYear} />
                              <input type="hidden" name="field" value="isStudent" />
                              <input type="hidden" name="value" value={isStudent ? "false" : "true"} />
                              <StatusChip
                                interactive={editing}
                                tone={isStudent ? "info" : "neutral"}
                                icon={isStudent ? <GraduationCap size={15} /> : <UserRound size={15} />}
                                actionLabel={`${name}: ${isStudent ? "Sonderstatus" : "regulärer Beitrag"}${editing ? " — klicken zum Ändern" : ""}`}
                                title={
                                  fee.angelegt === false && declaredStudent
                                    ? `Sonderstatus laut Erklärung des Mitglieds für ${selectedYear}`
                                    : isStudent
                                      ? "Sonderstatus nach § 5 (z. B. Studierende)"
                                      : "Regulärer Beitrag"
                                }
                              />
                            </form>
                          ) : (
                            <span className="text-faint">—</span>
                          )}
                        </Td>

                        <Td className="px-1 py-1.5 text-center">
                          {fee ? (
                            <form
                              action={updateFeeStatus}
                              onSubmit={(e) => {
                                // Rückfrage nur, wenn eine Zahlung wieder auf offen gesetzt wird.
                                const form = e.currentTarget;
                                if (paid && !bypassFormsRef.current.has(form)) {
                                  e.preventDefault();
                                  setRevertConfirm({ form, label: `${name} (${selectedYear})` });
                                }
                              }}
                            >
                              <input type="hidden" name="userId" value={user.id} />
                              <input type="hidden" name="year" value={selectedYear} />
                              <input type="hidden" name="field" value="paid" />
                              <input type="hidden" name="value" value={paid ? "false" : "true"} />
                              <StatusChip
                                interactive={editing}
                                tone={paid ? "positive" : "negative"}
                                icon={paid ? <CircleCheck size={15} /> : <CircleAlert size={15} />}
                                actionLabel={`${name}: ${paid ? "bezahlt" : "offen"}${editing ? " — klicken zum Ändern" : ""}`}
                                title={paid ? "Bezahlt" : "Offen"}
                              />
                            </form>
                          ) : (
                            <span className="text-faint">—</span>
                          )}
                        </Td>

                        <Td className="px-2 py-1.5 text-right whitespace-nowrap">
                          {fee ? (
                            <span className="inline-flex items-center justify-end gap-1">
                              {fee.manuell && (
                                <span title="Betrag abweichend vom Standard festgelegt" className="text-warning">
                                  <PencilLine size={13} aria-hidden="true" />
                                  <span className="sr-only">Ausnahme:</span>
                                </span>
                              )}
                              {fee.angelegt === false && (
                                <span
                                  title={`Für ${selectedYear} gibt es noch keinen Beitragseintrag. Der Betrag ist aus den Standardsätzen berechnet.`}
                                  className="text-faint"
                                >
                                  <CircleDashed size={13} aria-hidden="true" />
                                  <span className="sr-only">Kein Eintrag:</span>
                                </span>
                              )}
                              {/* Freigeschaltet wird der Betrag selbst zum Knopf
                                  für die Ausnahme — kein eigener Stift nötig. */}
                              {editing ? (
                                <button
                                  type="button"
                                  onClick={() => setAmountTarget({ user, fee })}
                                  title={`${explainFee(fee)} — klicken für abweichenden Betrag`}
                                  className="cursor-pointer rounded-sm text-sm font-semibold tabular-nums underline decoration-dashed underline-offset-4 hover:text-physics focus-visible:outline-2 focus-visible:outline-physics"
                                >
                                  {formatEuro(fee.beitrag)}
                                </button>
                              ) : (
                                <span className="text-sm font-semibold tabular-nums" title={explainFee(fee)}>
                                  {formatEuro(fee.beitrag)}
                                </span>
                              )}
                            </span>
                          ) : (
                            <span className="text-faint">—</span>
                          )}
                        </Td>

                        <Td className="px-2 py-1.5">
                          <div className="flex justify-end gap-1">
                            <IconButton
                              type="button"
                              size="sm"
                              variant="soft"
                              color="neutral"
                              onClick={() => setCommentUser(user)}
                              aria-label={user.zahlungsKommentar ? `Notiz: ${user.zahlungsKommentar}` : "Notiz hinzufügen"}
                              title={user.zahlungsKommentar ?? "Notiz hinzufügen"}
                              className={cn(
                                user.zahlungsKommentar
                                  ? "bg-warning/20 text-warning hover:bg-warning/30"
                                  : "text-faint",
                              )}
                            >
                              <MessageSquareText size={15} aria-hidden="true" />
                            </IconButton>
                            <IconButtonLink
                              href={`/dashboard/users/${user.id}`}
                              aria-label={`${name} bearbeiten`}
                              title="Profil bearbeiten"
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
              ),
          )}
        </Table>
      </TableWrap>

      {/* Legende: die Symbole stehen sonst ohne Erklärung da. */}
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-faint">
        {[
          [<CircleCheck key="i" size={13} className="text-positive" />, "bezahlt"],
          [<CircleAlert key="i" size={13} className="text-negative" />, "offen"],
          [<GraduationCap key="i" size={13} className="text-info" />, "Sonderstatus (§ 5)"],
          [<Landmark key="i" size={13} className="text-physics" />, "SEPA-Lastschrift"],
          [<HandCoins key="i" size={13} />, "ohne Lastschrift, 10 % Aufschlag"],
          [<PencilLine key="i" size={13} className="text-warning" />, "Betrag als Ausnahme"],
          [<CircleDashed key="i" size={13} />, "noch kein Beitragseintrag"],
          [<MessageSquareText key="i" size={13} className="text-warning" />, "Notiz vorhanden"],
          [<ShieldCheck key="i" size={13} className="text-market" />, "Admin"],
          [<UserX key="i" size={13} className="text-negative" />, "Login gesperrt"],
        ].map(([icon, text]) => (
          <span key={String(text)} className="flex items-center gap-1.5">
            <span aria-hidden="true">{icon}</span>
            {text}
          </span>
        ))}
      </p>

      <Dialog
        open={revertConfirm != null}
        onClose={() => setRevertConfirm(null)}
        title="Zahlung als offen markieren?"
        size="sm"
      >
        <p className="text-sm leading-relaxed text-muted">
          Zahlung für {revertConfirm?.label} wirklich als offen markieren?
        </p>
        <DialogFooter>
          <Button size="sm" variant="soft" color="neutral" type="button" onClick={() => setRevertConfirm(null)}>
            Abbrechen
          </Button>
          <Button size="sm" color="danger" type="button" onClick={confirmRevert}>
            Als offen markieren
          </Button>
        </DialogFooter>
      </Dialog>

      <AmountDialog target={amountTarget} onClose={() => setAmountTarget(null)} />

      <CommentDialog
        user={commentUser}
        open={commentUser != null}
        onClose={() => setCommentUser(null)}
      />

      <UserPaymentHistoryDialog
        user={historyUser}
        open={historyUser != null}
        onClose={() => setHistoryUser(null)}
      />

      {sepaOpen && (
        <SepaDialog
          year={selectedYear}
          candidates={sepaCandidates}
          selectedUsers={selectedUsers}
          onClose={() => setSepaOpen(false)}
        />
      )}

      {mailUsers && (
        <EmailComposerDialog
          onClose={() => setMailUsers(null)}
          recipients={mailRecipients}
          defaultSubject={mailIsReminder ? reminderDefaults.subject : ""}
          defaultMessage={mailIsReminder ? reminderDefaults.html : ""}
          submitLabel={mailIsReminder ? "Erinnerung senden" : "E-Mail senden"}
          onSuccess={() => {
            if (mailUsers.length > 1) setSelectedIds(new Set());
          }}
        />
      )}
    </>
  );
}
