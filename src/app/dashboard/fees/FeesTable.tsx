"use client";

import { useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Table,
  Text,
  Badge,
  Flex,
  Button,
  ScrollArea,
  TextArea,
  Box,
} from "@radix-ui/themes";
import { CheckIcon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { EmailComposerDialog, type MailRecipient } from "@/components/EmailComposerDialog";
import { feeReminderTemplate } from "@/lib/email/templates";
import { updateFeeStatus, updateFeeAmount, updateFeeComment, initializeBillingYear } from "./actions";

export type FeesTableUser = {
  id: string;
  name: string | null;
  vorname: string;
  email: string;
  mitgliedId: number | null;
  zahlungsKommentar: string | null;
  fees: Array<{
    jahr: number;
    bezahlt: boolean;
    isStudent: boolean;
    beitrag: number;
  }>;
};

type FeesTableProps = {
  users: FeesTableUser[];
  years: number[];
  isAdmin: boolean;
  availableYears: number[];
  startYear: number;
  endYear: number;
};

function hasOpenFee(user: FeesTableUser, years: number[]) {
  return years.some((year) => {
    const existing = user.fees.find((f) => f.jahr === year);
    return !(existing?.bezahlt ?? false);
  });
}

export function FeesTable({ users, years, isAdmin, availableYears, startYear, endYear }: FeesTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [mailOpen, setMailOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentYear = new Date().getFullYear();

  const userById = useMemo(() => new Map(users.map((u) => [u.id, u])), [users]);

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
      year: currentYear,
    });
  }, [selectedUsers, currentYear]);

  function handleYearChange(type: "startYear" | "endYear", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
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
    setSelectedIds(new Set(users.filter((u) => hasOpenFee(u, years)).map((u) => u.id)));
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  return (
    <>
      {isAdmin && (
        <Flex justify="between" align="center" mb="3" gap="3" wrap="wrap">
          <Flex gap="2" align="center" wrap="wrap">
            <Badge variant="soft">{selectedIds.size} ausgewählt</Badge>
            <Button size="1" variant="outline" type="button" onClick={selectAllWithOpenFees}>
              Alle mit offenen Beiträgen
            </Button>
            {selectedIds.size > 0 && (
              <Button size="1" variant="ghost" type="button" onClick={clearSelection}>
                Auswahl leeren
              </Button>
            )}
          </Flex>

          <Flex gap="3" align="center" wrap="wrap">
            <Flex gap="2" align="center">
              <Text size="1" color="gray">Anzeigezeitraum:</Text>
              <select
                value={startYear}
                onChange={(e) => handleYearChange("startYear", e.target.value)}
                style={{
                  fontSize: "12px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid var(--gray-6)",
                  background: "var(--color-background)",
                }}
              >
                {availableYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <Text size="1" color="gray">bis</Text>
              <select
                value={endYear}
                onChange={(e) => handleYearChange("endYear", e.target.value)}
                style={{
                  fontSize: "12px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid var(--gray-6)",
                  background: "var(--color-background)",
                }}
              >
                {availableYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </Flex>

            <form action={initializeBillingYear} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Text size="1" color="gray">Jahr anlegen:</Text>
              <input
                type="number"
                name="year"
                defaultValue={new Date().getFullYear() + 1}
                style={{
                  width: "65px",
                  fontSize: "12px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid var(--gray-6)",
                  background: "var(--color-background)",
                }}
              />
              <Button type="submit" size="1" color="green" variant="soft" title="Jahr für alle anlegen">
                <PlusIcon style={{ width: 12, height: 12 }} />
              </Button>
            </form>
          </Flex>

          <Button
            color="blue"
            disabled={selectedIds.size === 0}
            onClick={() => setMailOpen(true)}
          >
            Erinnerung senden
          </Button>
        </Flex>
      )}

      <ScrollArea scrollbars="both" style={{ maxHeight: 500 }}>
        <Table.Root variant="surface" size="1">
          <Table.Header>
            <Table.Row>
              {isAdmin && <Table.ColumnHeaderCell style={{ width: 40 }} />}
              <Table.ColumnHeaderCell>Mitglied</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Mitglieds-ID</Table.ColumnHeaderCell>
              {isAdmin && <Table.ColumnHeaderCell>Kommentar</Table.ColumnHeaderCell>}
              {years.map((year) => (
                <Table.ColumnHeaderCell key={year} align="center">
                  {year}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => {
              const isSelected = selectedIds.has(user.id);
              const checkboxId = `fees-select-${user.id}`;

              return (
                <Table.Row key={user.id}>
                  {isAdmin && (
                    <Table.Cell>
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
                    <Flex direction="column" gap="1">
                      <Text>{user.name || "—"}</Text>
                      <Text size="1" color="gray">
                        {user.email}
                      </Text>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="soft">{user.mitgliedId ?? "—"}</Badge>
                  </Table.Cell>
                  {isAdmin && (
                    <Table.Cell style={{ minWidth: "180px" }}>
                      <form action={updateFeeComment}>
                        <input type="hidden" name="userId" value={user.id} />
                        <Flex gap="1" align="end" width="100%">
                          <Box style={{ flexGrow: 1 }}>
                            <TextArea
                              name="comment"
                              rows={user.zahlungsKommentar ? 2 : 1}
                              defaultValue={user.zahlungsKommentar || ""}
                              placeholder="Kommentar..."
                              style={{
                                minHeight: user.zahlungsKommentar ? "48px" : "32px",
                                fontSize: "11px",
                                width: "100%",
                              }}
                            />
                          </Box>
                          <Button
                            type="submit"
                            size="1"
                            variant="soft"
                            color="blue"
                            title="Speichern"
                            style={{ height: "32px", width: "32px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <CheckIcon style={{ width: 16, height: 16 }} />
                          </Button>
                        </Flex>
                      </form>
                    </Table.Cell>
                  )}
                  {years.map((year) => {
                    const existing = user.fees.find((f) => f.jahr === year);
                    const paid = existing?.bezahlt ?? false;
                    const isStudent = existing?.isStudent ?? false;
                    const beitrag = existing?.beitrag ?? 0;

                    if (!isAdmin) {
                      return (
                        <Table.Cell key={year} align="center">
                          <Flex direction="column" gap="1" align="center" style={{ minWidth: "80px" }}>
                            <Badge color={paid ? "green" : "gray"} size="1">
                              {paid ? "bezahlt" : "offen"}
                            </Badge>
                            <Badge color={isStudent ? "blue" : "gray"} size="1">
                              {isStudent ? "Student" : "Regulär"}
                            </Badge>
                            <Text size="1" color="gray" weight="medium">
                              Beitrag: {beitrag.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
                            </Text>
                          </Flex>
                        </Table.Cell>
                      );
                    }

                    return (
                      <Table.Cell key={year} align="center">
                        <Flex direction="column" gap="2" align="center" style={{ minWidth: "120px", padding: "4px" }}>
                          {/* Paid status checkmark button */}
                          <form action={updateFeeStatus}>
                            <input type="hidden" name="userId" value={user.id} />
                            <input type="hidden" name="year" value={year} />
                            <input type="hidden" name="field" value="paid" />
                            <input type="hidden" name="value" value={paid ? "false" : "true"} />
                            <Flex gap="1" align="center">
                              <Text size="1" color="gray" weight="medium">Bezahlt:</Text>
                              <Button
                                type="submit"
                                size="1"
                                variant={paid ? "soft" : "outline"}
                                color={paid ? "green" : "red"}
                                style={{ width: "24px", height: "24px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                                title={paid ? "Bezahlt (Klicken zum Ändern)" : "Offen (Klicken zum Ändern)"}
                              >
                                {paid ? <CheckIcon style={{ width: 16, height: 16 }} /> : <MinusIcon style={{ width: 16, height: 16 }} />}
                              </Button>
                            </Flex>
                          </form>

                          {/* Student status checkbox */}
                          <form action={updateFeeStatus}>
                            <input type="hidden" name="userId" value={user.id} />
                            <input type="hidden" name="year" value={year} />
                            <input type="hidden" name="field" value="isStudent" />
                            <input type="hidden" name="value" value={isStudent ? "false" : "true"} />
                            <Flex gap="1" align="center" style={{ cursor: "pointer" }}>
                              <Text size="1" color="gray" weight="medium">Student:</Text>
                              <input
                                key={`${user.id}-${year}-${isStudent}`}
                                type="checkbox"
                                defaultChecked={isStudent}
                                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                                style={{
                                  cursor: "pointer",
                                  width: "15px",
                                  height: "15px",
                                  accentColor: "var(--accent-9)",
                                }}
                              />
                            </Flex>
                          </form>

                          {/* Amount edit form */}
                          <form action={updateFeeAmount}>
                            <input type="hidden" name="userId" value={user.id} />
                            <input type="hidden" name="year" value={year} />
                            <Flex gap="1" align="center">
                              <Text size="1" color="gray" weight="medium">Beitrag:</Text>
                              <input
                                type="number"
                                name="beitrag"
                                step="0.01"
                                defaultValue={beitrag}
                                style={{
                                  width: "48px",
                                  height: "20px",
                                  fontSize: "11px",
                                  padding: "2px",
                                  textAlign: "right",
                                  borderRadius: "4px",
                                  border: "1px solid var(--gray-6)",
                                  background: "var(--color-background)",
                                }}
                              />
                              <Button
                                type="submit"
                                size="1"
                                variant="soft"
                                color="blue"
                                style={{ padding: 0, width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                title="Betrag speichern"
                              >
                                <CheckIcon style={{ width: 12, height: 12 }} />
                              </Button>
                            </Flex>
                          </form>
                        </Flex>
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </ScrollArea>

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
