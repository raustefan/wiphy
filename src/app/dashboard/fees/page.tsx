import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Container, Card, Heading, Text, Table, Badge, Flex, Box, Separator, Button, ScrollArea, TextArea } from "@radix-ui/themes";
import Link from "next/link";
import { toggleFee, updateFeeComment } from "./actions";

export default async function FeesDashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const currentUser = session.user as any;
  const isAdmin = currentUser.role === "ADMIN";

  if (!currentUser.id) return <Text>Session-Fehler: Bitte neu einloggen!</Text>;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i);

  const users = (await prisma.user.findMany({
    where: isAdmin ? {} : { id: currentUser.id },
    orderBy: {
      createdAt: "asc",
    } as any,
    include: {
      fees: true,
    },
  })) as any[];

  return (
    <Box
      py="5"
      style={{
        minHeight: "100%",
      }}
    >
      <Container size="4">
        <Flex justify="between" align="center" mb="4">
          <Box>
            <Text size="2" color="gray">
              Internbereich
            </Text>
            <Heading size="6">
              {isAdmin ? "Zahlungsübersicht aller Mitglieder" : "Meine Mitgliedsbeiträge"}
            </Heading>
            <Text size="2" color="gray">
              Jahre ab 2000
            </Text>
          </Box>
          <Link href="/dashboard">
            <Button variant="soft">Zurück zum Dashboard</Button>
          </Link>
        </Flex>

        <Card size="3">
          <Flex justify="between" align="baseline" mb="3">
            <Box>
              <Text size="2" color="gray">
                {isAdmin
                  ? "Admin-Sicht: Alle Benutzer und Jahresbeiträge"
                  : "Nur deine eigenen Beiträge, lesend"}
              </Text>
              <Heading size="4">Jahresbeiträge</Heading>
            </Box>
            <Text size="2" color="gray">
              {users.length} {users.length === 1 ? "Mitglied" : "Mitglieder"}
            </Text>
          </Flex>

          <Separator mb="3" />

          <ScrollArea scrollbars="both" style={{ maxHeight: 500 }}>
            <Table.Root variant="surface" size="1">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Mitglied</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Mitglieds-ID</Table.ColumnHeaderCell>
                  {isAdmin && (
                    <Table.ColumnHeaderCell>Kommentar</Table.ColumnHeaderCell>
                  )}
                  {years.map((year) => (
                    <Table.ColumnHeaderCell key={year} align="center">
                      {year}
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user) => (
                  <Table.Row key={user.id}>
                    <Table.Cell>
                      <Flex direction="column" gap="1">
                        <Text>{user.name || "—"}</Text>
                        <Text size="1" color="gray">
                          {user.email}
                        </Text>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="soft">
                        {user.mitgliedId ?? "—"}
                      </Badge>
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
                      const existing = user.fees.find(
                        (f: any) => f.jahr === year
                      );
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
                            <input
                              type="hidden"
                              name="paid"
                              value={paid ? "false" : "true"}
                            />
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
                ))}
              </Table.Body>
            </Table.Root>
          </ScrollArea>
        </Card>
      </Container>
    </Box>
  );
}

