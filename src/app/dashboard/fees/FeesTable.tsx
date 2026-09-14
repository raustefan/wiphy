"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Check,
  Plus,
  IdCard,
  CheckCircle2,
  Coins,
  Calendar,
  Pencil,
  X,
  Search,
  CircleEuro,
  GraduationCap,
  HandCoins,
  Landmark,
  MessageSquare,
} from "lucide-react";
import {
  EmailComposerDialog,
  type MailRecipient,
} from "@/components/EmailComposerDialog";
import { formatDate, formatEuro } from "@/lib/format";
import { renderBlocksEditorHtml } from "@/lib/email/blocks";
import { feeReminderMessage } from "@/lib/email/messages";
import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogFooter,
  Field,
  IconButton,
  Input,
  Select,
  Separator,
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
} from "./actions";

export type FeesTableUser = {
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

type FeesTableProps = {
  users: FeesTableUser[];
  selectedYear: number;
  isAdmin: boolean;
  availableYears: number[];
};

/** Anzeigename in einer Spalte — Vorname und Nachname stehen nicht mehr getrennt. */
function displayName(user: FeesTableUser) {
  return [user.vorname, user.name].filter(Boolean).join(" ");
}

export type FeesSortKey = "mitgliedId" | "name" | "paid" | "student";

/**
 * Vergleich für die Sortierung. `paid` und `student` hängen am angezeigten
 * Jahr — dieselbe Person ist 2024 offen und 2025 bezahlt, die Spalte zeigt
 * immer nur das gewählte Jahr.
 *
 * Aufsteigend heißt bei beiden Zuständen „das Auffällige zuerst“: offene
 * Beiträge und Sonderstatus sind das, wonach in dieser Tabelle gesucht wird.
 */
function compareBy(
  key: FeesSortKey,
  a: FeesTableUser,
  b: FeesTableUser,
  year: number,
): number {
  switch (key) {
    case "mitgliedId": {
      // Konten ohne Mitglieds-ID bleiben in beide Richtungen hinten: sie haben
      // keinen Wert, nicht den kleinsten.
      if (a.mitgliedId == null && b.mitgliedId == null) return 0;
      if (a.mitgliedId == null) return 1;
      if (b.mitgliedId == null) return -1;
      return a.mitgliedId - b.mitgliedId;
    }
    case "name":
      return displayName(a).localeCompare(displayName(b), "de");
    case "paid":
      return Number(hasOpenFee(b, year)) - Number(hasOpenFee(a, year));
    case "student": {
      const rank = (u: FeesTableUser) => {
        const fee = u.fees.find((f) => f.jahr === year);
        // Ohne Beitragszeile zählt die Erklärung des Mitglieds — genau das
        // zeigt die Spalte auch an.
        const student = fee?.isStudent ?? u.studentYears.includes(year);
        return student ? 0 : 1;
      };
      return rank(a) - rank(b);
    }
  }
}

function hasOpenFee(user: FeesTableUser, year: number) {
  const existing = user.fees.find((f) => f.jahr === year);
  return !(existing?.bezahlt ?? false);
}

/**
 * Erklärt, wie der Standardbeitrag zustande kommt — Monatssatz, anteilige
 * Monate im Eintrittsjahr und ggf. der 10-%-Aufschlag nach § 5 Abs. 5.
 */
function explainFee(fee: FeesTableUser["fees"][number]) {
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

/**
 * Spaltenkopf, der nur aus einem Icon besteht. Der Text steckt in `aria-label`
 * und `title` — das ersetzt den früheren Radix-Tooltip.
 */
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
  user: FeesTableUser | null;
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
  target: { user: FeesTableUser; fee: FeesTableUser["fees"][number] } | null;
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

function UserPaymentHistoryDialog({
  user,
  open,
  onClose,
}: {
  user: FeesTableUser | null;
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
      </DialogFooter>
    </Dialog>
  );
}

export function FeesTable({
  users,
  selectedYear,
  isAdmin,
  availableYears,
}: FeesTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [mailOpen, setMailOpen] = useState(false);
  const [commentUser, setCommentUser] = useState<FeesTableUser | null>(null);
  const [historyUser, setHistoryUser] = useState<FeesTableUser | null>(null);
  const [amountTarget, setAmountTarget] = useState<{
    user: FeesTableUser;
    fee: FeesTableUser["fees"][number];
  } | null>(null);
  const [search, setSearch] = useState("");
  // Voreinstellung wie die Reihenfolge aus der Datenbank: nach Mitglieds-ID,
  // Konten ohne ID hinten. Der erste Blick auf die Seite ändert sich dadurch
  // nicht.
  const [sort, setSort] = useState<SortState<FeesSortKey>>({
    key: "mitgliedId",
    desc: false,
  });
  const [revertConfirm, setRevertConfirm] = useState<{
    form: HTMLFormElement;
    label: string;
  } | null>(null);
  const bypassFormsRef = useRef<WeakSet<HTMLFormElement>>(new WeakSet());

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const userById = useMemo(() => new Map(users.map((u) => [u.id, u])), [users]);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    const matching = term
      ? users.filter((u) =>
          `${u.vorname} ${u.name ?? ""} ${u.email} ${u.mitgliedId ?? ""}`
            .toLowerCase()
            .includes(term),
        )
      : users;

    const direction = sort.desc ? -1 : 1;
    return [...matching].sort((a, b) => {
      const result = compareBy(sort.key, a, b, selectedYear);
      // Gleichstand bricht nach Namen auf: sonst springen Zeilen mit gleichem
      // Zahlungsstand bei jedem Sortierwechsel umher.
      if (result !== 0) return result * direction;
      return displayName(a).localeCompare(displayName(b), "de");
    });
  }, [users, search, sort, selectedYear]);

  function toggleSort(key: FeesSortKey) {
    setSort((current) =>
      current.key === key ? { key, desc: !current.desc } : { key, desc: false },
    );
  }

  const selectedUsers = useMemo(() => {
    return Array.from(selectedIds)
      .map((id) => userById.get(id))
      .filter((u): u is FeesTableUser => u != null);
  }, [selectedIds, userById]);

  const mailRecipients: MailRecipient[] = useMemo(
    () =>
      selectedUsers.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
      })),
    [selectedUsers],
  );

  const reminderDefaults = useMemo(() => {
    const single = selectedUsers.length === 1 ? selectedUsers[0] : undefined;
    const message = feeReminderMessage({
      vorname: single?.vorname,
      name: single?.name,
      year: selectedYear,
    });
    return { subject: message.subject, html: renderBlocksEditorHtml(message.blocks) };
  }, [selectedUsers, selectedYear]);

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
        filteredUsers.filter((u) => hasOpenFee(u, selectedYear)).map((u) => u.id),
      ),
    );
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  function openUserHistory(user: FeesTableUser) {
    setHistoryUser(user);
  }

  function stopRowClick(e: React.MouseEvent) {
    e.stopPropagation();
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
      <div className="mb-4 rounded-2xl border border-line bg-raised/40 p-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-faint" aria-hidden="true" />
              <label htmlFor="fees-year" className="text-sm font-medium">
                Jahr
              </label>
              <Select
                id="fees-year"
                value={String(selectedYear)}
                onChange={(e) => handleYearChange(e.target.value)}
                className="py-2"
              >
                {availableYears.map((y) => (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                ))}
              </Select>
            </div>

            <div className="relative w-full max-w-65">
              <Search
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-faint"
              />
              <Input
                placeholder="Suche nach Name, E-Mail oder ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Mitglieder durchsuchen"
                className="pl-9"
              />
            </div>
          </div>

          {isAdmin && (
            <form action={initializeBillingYear} className="flex items-center gap-2">
              <label htmlFor="fees-new-year" className="text-xs text-muted">
                Neues Jahr anlegen:
              </label>
              <Input
                id="fees-new-year"
                type="number"
                name="year"
                defaultValue={new Date().getFullYear() + 1}
                className="w-24 py-2"
              />
              <IconButton
                type="submit"
                variant="soft"
                color="accent"
                size="sm"
                aria-label="Jahr für alle Mitglieder anlegen"
              >
                <Plus size={16} aria-hidden="true" />
              </IconButton>
            </form>
          )}
        </div>

        {isAdmin && (
          <>
            <Separator className="my-3" />
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={selectedIds.size > 0 ? "info" : "neutral"}>
                  {selectedIds.size} ausgewählt
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  color="neutral"
                  type="button"
                  onClick={selectAllWithOpenFees}
                >
                  Alle mit offenen Beiträgen
                </Button>
                {selectedIds.size > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    color="neutral"
                    type="button"
                    onClick={clearSelection}
                  >
                    Auswahl leeren
                  </Button>
                )}
              </div>

              <Button
                disabled={selectedIds.size === 0}
                type="button"
                onClick={() => setMailOpen(true)}
                className="w-full sm:w-auto"
              >
                <MessageSquare size={16} aria-hidden="true" />
                Erinnerung senden
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Legende: die beiden Symbole am Namen stehen sonst ohne Erklärung da —
          zu erraten ist ein Bankgebäude nur, wenn man schon weiß, worum es
          geht. */}
      <p className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-faint">
        <span className="flex items-center gap-1.5">
          <Landmark size={13} aria-hidden="true" className="text-physics" />
          SEPA-Lastschrift
        </span>
        <span className="flex items-center gap-1.5">
          <HandCoins size={13} aria-hidden="true" />
          ohne Lastschrift — Aufschlag nach § 5 Abs. 5
        </span>
      </p>

      <TableWrap>
        {/* Vorher `min-w-[720px]` bei acht Spalten. Vorname und Nachname
            zusammengelegt spart eine ganze Spalte, und die Namensspalte nimmt
            über `w-full max-w-0` den Rest der Zeile ein, statt ihn zu fordern:
            lange Namen kürzen dann, anstatt die Tabelle breiter zu machen. */}
        <Table className="min-w-[560px]">
          <thead>
            <tr className="bg-raised/60">
              {isAdmin && <Th className="w-10 px-2" />}
              <SortableTh
                sortKey="mitgliedId"
                label="Mitglieds-ID"
                icon={<IdCard size={16} />}
                sort={sort}
                onSort={toggleSort}
                className="w-16"
              />
              <SortableTh sortKey="name" label="Name" sort={sort} onSort={toggleSort} />
              {isAdmin && (
                <Th className="hidden px-2 md:table-cell">
                  <IconHeader icon={<MessageSquare size={16} />} label="Kommentar" />
                </Th>
              )}
              <SortableTh
                sortKey="student"
                label="Studierendenstatus"
                icon={<GraduationCap size={16} />}
                sort={sort}
                onSort={toggleSort}
                align="center"
                className="w-14"
              />
              <SortableTh
                sortKey="paid"
                label="Zahlungsstatus"
                icon={<CheckCircle2 size={16} />}
                sort={sort}
                onSort={toggleSort}
                align="center"
                className="w-14"
              />
              <Th className="w-33 px-2 text-center">
                <IconHeader icon={<Coins size={16} />} label="Betrag" />
              </Th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <Td colSpan={isAdmin ? 7 : 5} className="py-10 text-center text-muted">
                  Keine Mitglieder gefunden.
                </Td>
              </tr>
            )}

            {filteredUsers.map((user) => {
              const isSelected = selectedIds.has(user.id);
              const checkboxId = `fees-select-${user.id}`;
              const existing = user.fees.find((f) => f.jahr === selectedYear);
              const paid = existing?.bezahlt ?? false;
              const isStudent = existing?.isStudent ?? false;
              // Für Jahre ohne Beitragszeile stammt der Sonderstatus aus der
              // Erklärung des Mitglieds — das soll man der Zeile ansehen.
              const declaredStudent = user.studentYears.includes(selectedYear);

              return (
                <tr
                  key={user.id}
                  className={`cursor-pointer transition-colors ${
                    paid ? "hover:bg-raised/50" : "bg-negative/6 hover:bg-negative/10"
                  }`}
                  onClick={() => openUserHistory(user)}
                >
                  {isAdmin && (
                    <Td onClick={stopRowClick}>
                      <Checkbox
                        id={checkboxId}
                        checked={isSelected}
                        onChange={() => toggleSelection(user.id)}
                        aria-label={`${user.name || user.email} auswählen`}
                      />
                    </Td>
                  )}
                  <Td className="px-2">
                    <Badge className="font-mono">{user.mitgliedId ?? "—"}</Badge>
                  </Td>
                  <Td className="w-full max-w-0 px-2 font-medium">
                    <div className="flex items-center gap-1.5">
                      {/* Die Zeile als Ganzes ist anklickbar, aber ein `<tr>`
                          nimmt keinen Fokus: über die Tastatur war der
                          Beitragsverlauf damit gar nicht erreichbar. Der Name ist
                          jetzt der eigentliche Auslöser, der Zeilenklick nur noch
                          die bequeme Zugabe für die Maus. */}
                      <button
                        type="button"
                        onClick={(event) => {
                          stopRowClick(event);
                          openUserHistory(user);
                        }}
                        title={displayName(user) || undefined}
                        className="cursor-pointer truncate rounded-sm text-left underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-physics"
                      >
                        {displayName(user) || "—"}
                        <span className="sr-only"> — Beitragsverlauf öffnen</span>
                      </button>
                      <SepaMark bankeinzug={user.bankeinzug} />
                    </div>
                  </Td>
                  {isAdmin && (
                    <Td className="hidden px-2 md:table-cell" onClick={stopRowClick}>
                      {user.zahlungsKommentar ? (
                        <div className="flex items-center gap-1">
                          <span
                            className="max-w-45 flex-1 truncate text-sm"
                            title={user.zahlungsKommentar}
                          >
                            {user.zahlungsKommentar}
                          </span>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            color="neutral"
                            type="button"
                            onClick={() => setCommentUser(user)}
                            aria-label="Kommentar bearbeiten"
                          >
                            <Pencil size={15} aria-hidden="true" />
                          </IconButton>
                        </div>
                      ) : (
                        <IconButton
                          size="sm"
                          variant="soft"
                          color="neutral"
                          type="button"
                          onClick={() => setCommentUser(user)}
                          aria-label="Kommentar hinzufügen"
                        >
                          <Plus size={15} aria-hidden="true" />
                        </IconButton>
                      )}
                    </Td>
                  )}
                  <Td className="px-2 text-center" onClick={stopRowClick}>
                    {isAdmin ? (
                      <form action={updateFeeStatus}>
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="year" value={selectedYear} />
                        <input type="hidden" name="field" value="isStudent" />
                        <input
                          type="hidden"
                          name="value"
                          value={isStudent ? "false" : "true"}
                        />
                        <IconButton
                          type="submit"
                          size="sm"
                          variant={isStudent ? "solid" : "outline"}
                          color={isStudent ? "accent" : "neutral"}
                          aria-label={
                            isStudent
                              ? "Sonderstatus (Klicken zum Ändern)"
                              : "Regulär (Klicken zum Ändern)"
                          }
                          title={
                            existing?.angelegt === false && declaredStudent
                              ? `Sonderstatus laut Erklärung des Mitglieds für ${selectedYear}`
                              : undefined
                          }
                        >
                          <GraduationCap size={16} aria-hidden="true" />
                        </IconButton>
                      </form>
                    ) : (
                      <Badge tone={isStudent ? "info" : "neutral"}>
                        {isStudent ? "Ja" : "Nein"}
                      </Badge>
                    )}
                  </Td>
                  <Td className="px-2 text-center" onClick={stopRowClick}>
                    {isAdmin ? (
                      <form
                        action={updateFeeStatus}
                        onSubmit={(e) => {
                          // Extra confirmation only when reverting a paid fee to unpaid.
                          const form = e.currentTarget;
                          if (paid && !bypassFormsRef.current.has(form)) {
                            e.preventDefault();
                            setRevertConfirm({
                              form,
                              label: `${user.vorname} ${user.name ?? ""} (${selectedYear})`,
                            });
                          }
                        }}
                      >
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="year" value={selectedYear} />
                        <input type="hidden" name="field" value="paid" />
                        <input
                          type="hidden"
                          name="value"
                          value={paid ? "false" : "true"}
                        />
                        <IconButton
                          type="submit"
                          size="sm"
                          variant={paid ? "solid" : "outline"}
                          color={paid ? "accent" : "danger"}
                          aria-label={
                            paid
                              ? "Bezahlt (Klicken zum Ändern)"
                              : "Offen (Klicken zum Ändern)"
                          }
                        >
                          {paid ? (
                            <Check size={16} aria-hidden="true" />
                          ) : (
                            <X size={16} aria-hidden="true" />
                          )}
                        </IconButton>
                      </form>
                    ) : (
                      <Badge tone={paid ? "positive" : "negative"}>
                        {paid ? "Bezahlt" : "Offen"}
                      </Badge>
                    )}
                  </Td>
                  <Td className="px-2 text-center" onClick={stopRowClick}>
                    <div className="flex items-center justify-center gap-1.5">
                      <span
                        className="text-sm font-medium tabular-nums"
                        title={existing ? explainFee(existing) : undefined}
                      >
                        {formatEuro(existing?.beitrag ?? 0)}
                      </span>
                      {existing?.manuell && <Badge tone="warning">Ausnahme</Badge>}
                      {existing?.angelegt === false && (
                        <Badge title={`Für ${selectedYear} ist noch keine Beitragszeile angelegt. Angezeigt wird der Standardbeitrag.`}>
                          Vorschau
                        </Badge>
                      )}
                      {isAdmin && existing && (
                        <IconButton
                          type="button"
                          size="sm"
                          variant="ghost"
                          color="neutral"
                          onClick={() => setAmountTarget({ user, fee: existing })}
                          aria-label={`Beitrag ${selectedYear} für ${user.vorname} ${user.name ?? ""} abweichend festlegen`}
                        >
                          <Pencil size={15} aria-hidden="true" />
                        </IconButton>
                      )}
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrap>

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
          <Button
            size="sm"
            variant="soft"
            color="neutral"
            type="button"
            onClick={() => setRevertConfirm(null)}
          >
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

      {isAdmin && mailOpen && (
        <EmailComposerDialog
          onClose={() => setMailOpen(false)}
          recipients={mailRecipients}
          defaultSubject={reminderDefaults.subject}
          defaultMessage={reminderDefaults.html}
          submitLabel="Erinnerung senden"
          onSuccess={() => setSelectedIds(new Set())}
        />
      )}
    </>
  );
}
