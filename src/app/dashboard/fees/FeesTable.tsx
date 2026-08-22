"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Table,
  Text,
  Badge,
  Flex,
  Button,
  IconButton,
  ScrollArea,
  TextArea,
  TextField,
  Select,
  Tooltip,
  Card,
  AlertDialog,
  Separator,
} from "@radix-ui/themes";
import {
  CheckIcon,
  PlusIcon,
  IdCardIcon,
  CheckCircledIcon,
  TokensIcon,
  CalendarIcon,
  Pencil2Icon,
  Cross2Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { CircleEuro, GraduationCap, MessageSquare } from "lucide-react";
import {
  EmailComposerDialog,
  type MailRecipient,
} from "@/components/EmailComposerDialog";
import { feeReminderTemplate } from "@/lib/email/templates";
import {
  updateFeeStatus,
  updateFeeAmount,
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
  fees: Array<{
    jahr: number;
    bezahlt: boolean;
    isStudent: boolean;
    beitrag: number;
  }>;
};

type FeesTableProps = {
  users: FeesTableUser[];
  selectedYear: number;
  isAdmin: boolean;
  availableYears: number[];
};

function hasOpenFee(user: FeesTableUser, year: number) {
  const existing = user.fees.find((f) => f.jahr === year);
  return !(existing?.bezahlt ?? false);
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCurrency(amount: number) {
  return amount.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}

function IconHeader({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Tooltip content={label}>
      <Flex align="center" justify="center" aria-label={label}>
        {icon}
      </Flex>
    </Tooltip>
  );
}

function CommentDialog({
  user,
  open,
  onOpenChange,
}: {
  user: FeesTableUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!user) return null;

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="480px">
        <AlertDialog.Title>
          Kommentar – {user.vorname} {user.name ?? ""}
        </AlertDialog.Title>
        <AlertDialog.Description size="2" mb="3">
          Zahlungs- oder Mitgliedschaftshinweis für dieses Mitglied.
        </AlertDialog.Description>
        <form action={updateFeeComment}>
          <input type="hidden" name="userId" value={user.id} />
          <TextArea
            name="comment"
            rows={4}
            defaultValue={user.zahlungsKommentar ?? ""}
            placeholder="Kommentar eingeben…"
            style={{ width: "100%" }}
          />
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button size="3" variant="soft" color="gray" type="button">
                Abbrechen
              </Button>
            </AlertDialog.Cancel>
            <Button size="3" type="submit" color="blue">
              Speichern
            </Button>
          </Flex>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

function UserPaymentHistoryDialog({
  user,
  open,
  onOpenChange,
}: {
  user: FeesTableUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!user) return null;

  const sortedFees = [...user.fees].sort((a, b) => b.jahr - a.jahr);
  const openCount = sortedFees.filter((f) => !f.bezahlt).length;

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="560px">
        <Flex justify="between" align="start" mb="1">
          <AlertDialog.Title mb="0">
            {user.vorname} {user.name ?? ""}
          </AlertDialog.Title>
          {openCount > 0 && (
            <Badge color="red" variant="soft">
              {openCount} offen
            </Badge>
          )}
        </Flex>
        <AlertDialog.Description size="2" mb="3" color="gray">
          {user.email}
        </AlertDialog.Description>

        <Flex gap="2" align="center" mb="3">
          <CalendarIcon
            style={{ width: 16, height: 16, color: "var(--gray-9)" }}
          />
          <Text size="2">
            Mitglied seit{" "}
            <Text weight="medium">{formatDate(user.aufnahmedatum)}</Text>
          </Text>
        </Flex>

        <Separator mb="3" size="4" />

        {sortedFees.length === 0 ? (
          <Text size="2" color="gray">
            Keine Zahlungsdaten vorhanden.
          </Text>
        ) : (
          <ScrollArea style={{ maxHeight: 320 }}>
            <Table.Root variant="surface" size="1">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Jahr</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="center">
                    <IconHeader icon={<GraduationCap size={16} />} label="Student" />
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="center">
                    <IconHeader icon={<CircleEuro size={16} />} label="Bezahlt" />
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right">
                    Betrag
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sortedFees.map((fee) => (
                  <Table.Row key={fee.jahr}>
                    <Table.Cell>
                      <Text weight="medium">{fee.jahr}</Text>
                    </Table.Cell>
                    <Table.Cell align="center">
                      <Badge color={fee.isStudent ? "blue" : "gray"} size="1">
                        {fee.isStudent ? "Ja" : "Nein"}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell align="center">
                      <Badge color={fee.bezahlt ? "green" : "red"} size="1">
                        {fee.bezahlt ? "Bezahlt" : "Offen"}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell align="right">
                      <Text size="2">{formatCurrency(fee.beitrag)}</Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </ScrollArea>
        )}

        <Flex mt="4" justify="end">
          <AlertDialog.Action>
            <Button size="3" variant="soft" color="gray">
              Schließen
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
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
  const [search, setSearch] = useState("");
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
    if (!term) return users;
    return users.filter((u) =>
      `${u.vorname} ${u.name ?? ""} ${u.email} ${u.mitgliedId ?? ""}`
        .toLowerCase()
        .includes(term),
    );
  }, [users, search]);

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
    return feeReminderTemplate({
      vorname: single?.vorname,
      name: single?.name,
      year: selectedYear,
    });
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
      <Card mb="4" variant="surface">
        <Flex justify="between" align="center" gap="3" wrap="wrap" direction={{ initial: "column", sm: "row" }}>
          <Flex gap="3" align="center" wrap="wrap" width={{ initial: "100%", sm: "auto" }}>
            <Flex gap="2" align="center">
              <CalendarIcon style={{ width: 16, height: 16, color: "var(--gray-9)" }} />
              <Text size="2" weight="medium">
                Jahr
              </Text>
              <Select.Root value={String(selectedYear)} onValueChange={handleYearChange}>
                <Select.Trigger variant="surface" />
                <Select.Content>
                  {availableYears.map((y) => (
                    <Select.Item key={y} value={String(y)}>
                      {y}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>

            <TextField.Root
              placeholder="Suche nach Name, E-Mail oder ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", maxWidth: 260 }}
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="14" width="14" />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          {isAdmin && (
            <form
              action={initializeBillingYear}
              style={{ display: "flex", gap: 6, alignItems: "center" }}
            >
              <Text size="1" color="gray">
                Neues Jahr anlegen:
              </Text>
              <TextField.Root
                type="number"
                name="year"
                defaultValue={new Date().getFullYear() + 1}
                style={{ width: 90 }}
                size="2"
              />
              <Tooltip content="Jahr für alle Mitglieder anlegen">
                <IconButton type="submit" size="2" color="green" variant="soft">
                  <PlusIcon />
                </IconButton>
              </Tooltip>
            </form>
          )}
        </Flex>

        {isAdmin && (
          <>
            <Separator my="3" size="4" />
            <Flex justify="between" align="center" gap="3" wrap="wrap" direction={{ initial: "column", sm: "row" }}>
              <Flex gap="2" align="center" wrap="wrap">
                <Badge variant="soft" color={selectedIds.size > 0 ? "blue" : "gray"}>
                  {selectedIds.size} ausgewählt
                </Badge>
                <Button size="2" variant="outline" type="button" onClick={selectAllWithOpenFees}>
                  Alle mit offenen Beiträgen
                </Button>
                {selectedIds.size > 0 && (
                  <Button size="2" variant="ghost" type="button" onClick={clearSelection}>
                    Auswahl leeren
                  </Button>
                )}
              </Flex>

              <Button
                size="3"
                color="blue"
                disabled={selectedIds.size === 0}
                type="button"
                onClick={() => setMailOpen(true)}
                style={{ width: "100%", maxWidth: 260 }}
              >
                <MessageSquare size={16} />
                Erinnerung senden
              </Button>
            </Flex>
          </>
        )}
      </Card>

      <ScrollArea scrollbars="horizontal">
        <Table.Root variant="surface" size="2" className="dashboard-table">
          <Table.Header>
            <Table.Row>
              {isAdmin && <Table.ColumnHeaderCell style={{ width: 40 }} />}
              <Table.ColumnHeaderCell style={{ width: 72 }}>
                <IconHeader icon={<IdCardIcon />} label="Mitglieds-ID" />
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Vorname</Table.ColumnHeaderCell>
              {isAdmin && (
                <Table.ColumnHeaderCell style={{ minWidth: 160 }}>
                  <IconHeader icon={<MessageSquare size={16} />} label="Kommentar" />
                </Table.ColumnHeaderCell>
              )}
              <Table.ColumnHeaderCell align="center" style={{ width: 72 }}>
                <IconHeader icon={<GraduationCap size={16} />} label="Student" />
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="center" style={{ width: 72 }}>
                <IconHeader icon={<CheckCircledIcon />} label="Bezahlt" />
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="center" style={{ width: 130 }}>
                <IconHeader icon={<TokensIcon />} label="Betrag" />
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredUsers.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={isAdmin ? 8 : 6}>
                  <Flex justify="center" py="6">
                    <Text size="2" color="gray">
                      Keine Mitglieder gefunden.
                    </Text>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            )}

            {filteredUsers.map((user) => {
              const isSelected = selectedIds.has(user.id);
              const checkboxId = `fees-select-${user.id}`;
              const existing = user.fees.find((f) => f.jahr === selectedYear);
              const paid = existing?.bezahlt ?? false;
              const isStudent = existing?.isStudent ?? false;
              const beitrag = existing?.beitrag ?? 0;

              return (
                <Table.Row
                  key={user.id}
                  style={{
                    cursor: "pointer",
                    backgroundColor: !paid ? "var(--red-2)" : undefined,
                  }}
                  onClick={() => openUserHistory(user)}
                >
                  {isAdmin && (
                    <Table.Cell onClick={stopRowClick}>
                      <input
                        id={checkboxId}
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelection(user.id)}
                        style={{
                          width: 18,
                          height: 18,
                          cursor: "pointer",
                          accentColor: "var(--accent-9)",
                        }}
                        aria-label={`${user.name || user.email} auswählen`}
                      />
                    </Table.Cell>
                  )}
                  <Table.Cell>
                    <Badge variant="soft">{user.mitgliedId ?? "—"}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text weight="medium">{user.name || "—"}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{user.vorname}</Text>
                  </Table.Cell>
                  {isAdmin && (
                    <Table.Cell onClick={stopRowClick}>
                      {user.zahlungsKommentar ? (
                        <Flex gap="1" align="center">
                          <Text
                            size="2"
                            style={{
                              flex: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: 180,
                            }}
                            title={user.zahlungsKommentar}
                          >
                            {user.zahlungsKommentar}
                          </Text>
                          <Tooltip content="Kommentar bearbeiten">
                            <IconButton
                              size="2"
                              variant="ghost"
                              color="gray"
                              type="button"
                              onClick={() => setCommentUser(user)}
                            >
                              <Pencil2Icon />
                            </IconButton>
                          </Tooltip>
                        </Flex>
                      ) : (
                        <Tooltip content="Kommentar hinzufügen">
                          <IconButton
                            size="2"
                            variant="soft"
                            color="gray"
                            type="button"
                            onClick={() => setCommentUser(user)}
                          >
                            <PlusIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Table.Cell>
                  )}
                  <Table.Cell align="center" onClick={stopRowClick}>
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
                        <Tooltip
                          content={
                            isStudent
                              ? "Student (Klicken zum Ändern)"
                              : "Regulär (Klicken zum Ändern)"
                          }
                        >
                          <IconButton
                            type="submit"
                            size="2"
                            variant={isStudent ? "solid" : "outline"}
                            color={isStudent ? "blue" : "gray"}
                          >
                            <GraduationCap size={16} />
                          </IconButton>
                        </Tooltip>
                      </form>
                    ) : (
                      <Badge color={isStudent ? "blue" : "gray"} size="1">
                        {isStudent ? "Ja" : "Nein"}
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell align="center" onClick={stopRowClick}>
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
                        <Tooltip
                          content={
                            paid
                              ? "Bezahlt (Klicken zum Ändern)"
                              : "Offen (Klicken zum Ändern)"
                          }
                        >
                          <IconButton
                            type="submit"
                            size="2"
                            variant={paid ? "solid" : "outline"}
                            color={paid ? "green" : "red"}
                          >
                            {paid ? <CheckIcon /> : <Cross2Icon />}
                          </IconButton>
                        </Tooltip>
                      </form>
                    ) : (
                      <Badge color={paid ? "green" : "red"} size="1">
                        {paid ? "Bezahlt" : "Offen"}
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell align="center" onClick={stopRowClick}>
                    {isAdmin ? (
                      <form action={updateFeeAmount}>
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="year" value={selectedYear} />
                        <Flex gap="1" align="center" justify="center">
                          <TextField.Root
                            type="number"
                            name="beitrag"
                            step="0.01"
                            min="0"
                            defaultValue={beitrag}
                            size="2"
                            style={{ width: 80, textAlign: "right" }}
                          />
                          <Tooltip content="Betrag speichern">
                            <IconButton type="submit" size="2" variant="soft" color="blue">
                              <CheckIcon />
                            </IconButton>
                          </Tooltip>
                        </Flex>
                      </form>
                    ) : (
                      <Text size="2" weight="medium">
                        {formatCurrency(beitrag)}
                      </Text>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </ScrollArea>

      <AlertDialog.Root
        open={revertConfirm != null}
        onOpenChange={(open) => {
          if (!open) setRevertConfirm(null);
        }}
      >
        <AlertDialog.Content maxWidth="420px">
          <AlertDialog.Title>Zahlung als offen markieren?</AlertDialog.Title>
          <AlertDialog.Description size="2" mb="3">
            Zahlung für {revertConfirm?.label} wirklich als offen markieren?
          </AlertDialog.Description>
          <Flex gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button size="2" variant="soft" color="gray" type="button">
                Abbrechen
              </Button>
            </AlertDialog.Cancel>
            <Button size="2" color="red" type="button" onClick={confirmRevert}>
              Als offen markieren
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <CommentDialog
        user={commentUser}
        open={commentUser != null}
        onOpenChange={(open) => {
          if (!open) setCommentUser(null);
        }}
      />

      <UserPaymentHistoryDialog
        user={historyUser}
        open={historyUser != null}
        onOpenChange={(open) => {
          if (!open) setHistoryUser(null);
        }}
      />

      {isAdmin && (
        <EmailComposerDialog
          open={mailOpen}
          onOpenChange={setMailOpen}
          recipients={mailRecipients}
          defaultSubject={reminderDefaults.subject}
          defaultMessage={reminderDefaults.message}
          submitLabel="Erinnerung senden"
          onSuccess={() => setSelectedIds(new Set())}
        />
      )}
    </>
  );
}