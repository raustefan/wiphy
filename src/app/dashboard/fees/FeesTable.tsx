"use client";

import { useMemo, useState } from "react";
import {
  Table,
  Text,
  Badge,
  Flex,
  Button,
  ScrollArea,
  TextArea,
} from "@radix-ui/themes";
import { EmailComposerDialog, type MailRecipient } from "@/components/EmailComposerDialog";
import { feeReminderTemplate } from "@/lib/email/templates";
import { toggleFee, updateFeeComment } from "./actions";

export type FeesTableUser = {
  id: string;
  name: string | null;
  vorname: string;
  email: string;
  mitgliedId: number | null;
  zahlungsKommentar: string | null;
  fees: Array<{ jahr: number; bezahlt: boolean }>;
};

type FeesTableProps = {
  users: FeesTableUser[];
  years: number[];
  isAdmin: boolean;
};

function hasOpenFee(user: FeesTableUser, years: number[]) {
  return years.some((year) => {
    const existing = user.fees.find((f) => f.jahr === year);
    return !(existing?.bezahlt ?? false);
  });
}

export function FeesTable({ users, years, isAdmin }: FeesTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [mailOpen, setMailOpen] = useState(false);

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
        <Flex justify="between" align="center" mb="3" gap="2" wrap="wrap">
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
                    <Table.Cell>
                      <form action={updateFeeComment}>
                        <input type="hidden" name="userId" value={user.id} />
                        <TextArea
                          name="comment"
                          rows={3}
                          defaultValue={user.zahlungsKommentar || ""}
                        />
                        <Flex justify="end" mt="1">
                          <Button type="submit" size="1" variant="soft">
                            Speichern
                          </Button>
                        </Flex>
                      </form>
                    </Table.Cell>
                  )}
                  {years.map((year) => {
                    const existing = user.fees.find((f) => f.jahr === year);
                    const paid = existing?.bezahlt ?? false;

                    if (!isAdmin) {
                      return (
                        <Table.Cell key={year} align="center">
                          <Badge color={paid ? "green" : "gray"}>
                            {paid ? "bezahlt" : "offen"}
                          </Badge>
                        </Table.Cell>
                      );
                    }

                    return (
                      <Table.Cell key={year} align="center">
                        <form action={toggleFee}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input type="hidden" name="year" value={year} />
                          <input type="hidden" name="paid" value={paid ? "false" : "true"} />
                          <Button
                            type="submit"
                            size="1"
                            variant={paid ? "soft" : "outline"}
                            color={paid ? "green" : "red"}
                          >
                            {paid ? "✓" : "–"}
                          </Button>
                        </form>
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
