import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Container, Card, Heading, Flex, Text, TextField, TextArea, Button, Select } from "@radix-ui/themes";
import Link from "next/link";
import { sendEmailAction } from "./actions";

export default async function MailDashboardPage() {
    const session = await auth();
    if ((session?.user as any)?.role !== "ADMIN") redirect("/dashboard");

    return (
        <Container size="2" mt="6" mb="6">
            <Card size="4">
                <Heading mb="4">Rundmail verschicken</Heading>

                <form action={sendEmailAction}>
                    <Flex direction="column" gap="4">

                        <label>
                            <Text size="2" weight="bold" mb="1" as="div">Empfänger-Gruppe</Text>
                            <Select.Root name="target" defaultValue="ALL">
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Item value="ALL">Alle Benutzer (Admins & Members)</Select.Item>
                                    <Select.Item value="MEMBER">Nur normale Mitglieder</Select.Item>
                                    <Select.Item value="ADMIN">Nur Administratoren</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </label>

                        <label>
                            <Text size="2" weight="bold">Betreff</Text>
                            <TextField.Root name="subject" required placeholder="Wichtige Info zum Sommerfest..." />
                        </label>

                        <label>
                            <Text size="2" weight="bold">Nachricht</Text>
                            <TextArea name="message" required rows={10} placeholder="Hallo zusammen..." />
                        </label>

                        <Flex gap="3" mt="4">
                            <Button type="submit" color="blue">E-Mail senden</Button>
                            <Link href="/dashboard">
                                <Button variant="soft" color="gray" type="button">Abbrechen</Button>
                            </Link>
                        </Flex>

                    </Flex>
                </form>
            </Card>
        </Container>
    );
}