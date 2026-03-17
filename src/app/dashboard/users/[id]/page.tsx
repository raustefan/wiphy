import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
    Flex,
    Heading,
    Text,
    Button,
    Container,
    Card,
    TextField,
    Select,
} from "@radix-ui/themes";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function updateUser(formData: FormData) {
    "use server";
    const session = await auth();
    if (!session) redirect("/login");

    const currentUser = session.user as any;
    const currentUserId = currentUser.id;
    const currentUserRole = currentUser.role;
    const idToEdit = formData.get("id") as string;

    // SICHERHEIT: Nur Admins oder der Besitzer selbst dürfen speichern
    if (currentUserRole !== "ADMIN" && currentUserId !== idToEdit) {
        throw new Error("Keine Berechtigung");
    }

    const data: any = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        titel: (formData.get("titel") as string) || null,
        berufsstand: (formData.get("berufsstand") as string) || null,
        plz: (formData.get("plz") as string) || null,
        stadt: (formData.get("stadt") as string) || null,
        strasse: (formData.get("strasse") as string) || null,
        telefon: (formData.get("telefon") as string) || null,
        arbeitgeber: (formData.get("arbeitgeber") as string) || null,
    };

    // SICHERHEIT: Nur Admins dürfen Rolle & Mitgliedsdaten ändern
    if (currentUserRole === "ADMIN") {
        const roleValue = formData.get("role");
        if (roleValue) {
            data.role = roleValue as "ADMIN" | "MEMBER";
        }

        const mitgliedIdRaw = formData.get("mitgliedId") as string;
        if (mitgliedIdRaw !== null && mitgliedIdRaw !== "") {
            const parsed = Number(mitgliedIdRaw);
            if (!Number.isNaN(parsed)) {
                // Prüfen, ob diese Mitglieds-ID bereits bei einem ANDEREN User vergeben ist
                const existingWithMitgliedId = await prisma.user.findFirst({
                    where: {
                        mitgliedId: parsed,
                        id: { not: idToEdit },
                    },
                } as any);

                if (existingWithMitgliedId) {
                    // Zurück zur Bearbeitungsseite mit Fehlermeldungs-Query
                    redirect(`/dashboard/users/${idToEdit}?mitgliedIdError=1`);
                }

                data.mitgliedId = parsed;
            }
        } else {
            data.mitgliedId = null;
        }
    }

    await prisma.user.update({
        where: { id: idToEdit },
        data,
    });

    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export default async function EditUserPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams?: { mitgliedIdError?: string };
}) {
    const resolvedParams = await params;

    const session = await auth();
    if (!session) redirect("/login");

    const currentUser = session.user as any;
    const isAdmin = currentUser.role === "ADMIN";

    // SICHERHEIT: MEMBER wird beim Zugriff auf fremde Profile aufs Dashboard geschickt
    if (!isAdmin && currentUser.id !== resolvedParams.id) {
        redirect("/dashboard");
    }

    const user = (await prisma.user.findUnique({
        where: { id: resolvedParams.id },
    })) as any;
    if (!user) return <Text>User nicht gefunden</Text>;

    return (
        <Container size="2" mt="6">
            <Card size="4">
                <Heading mb="4">
                    {isAdmin ? "Benutzer bearbeiten" : "Mein Profil bearbeiten"}
                </Heading>

                {isAdmin && searchParams?.mitgliedIdError === "1" && (
                    <Card mb="4" style={{ backgroundColor: "var(--red-3)" }}>
                        <Text weight="bold" color="red" size="2">
                            Diese Mitglieds-ID ist bereits einem anderen Mitglied zugeordnet.
                        </Text>
                        <Text size="2" color="red">
                            Bitte wähle eine andere eindeutige Nummer.
                        </Text>
                    </Card>
                )}
                <form action={updateUser}>
                    <input type="hidden" name="id" value={user.id} />

                    <Flex direction="column" gap="3">
                        <label>
                            <Text size="2" weight="bold">
                                Name
                            </Text>
                            <TextField.Root
                                name="name"
                                defaultValue={user.name || ""}
                                required
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Email
                            </Text>
                            <TextField.Root
                                name="email"
                                type="email"
                                defaultValue={user.email}
                                required
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Titel
                            </Text>
                            <TextField.Root name="titel" defaultValue={user.titel || ""} />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Berufsstand
                            </Text>
                            <TextField.Root name="berufsstand" defaultValue={user.berufsstand || ""} />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                PLZ
                            </Text>
                            <TextField.Root name="plz" defaultValue={user.plz || ""} />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Stadt
                            </Text>
                            <TextField.Root name="stadt" defaultValue={user.stadt || ""} />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Straße
                            </Text>
                            <TextField.Root name="strasse" defaultValue={user.strasse || ""} />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Telefon
                            </Text>
                            <TextField.Root name="telefon" defaultValue={user.telefon || ""} />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Arbeitgeber
                            </Text>
                            <TextField.Root name="arbeitgeber" defaultValue={user.arbeitgeber || ""} />
                        </label>

                        {/* Mitgliedsdaten & Rolle können NUR vom Admin geändert werden */}
                        {isAdmin && (
                            <>
                                <label>
                                    <Text size="2" weight="bold">
                                        Mitglieds-ID
                                    </Text>
                                    <TextField.Root
                                        name="mitgliedId"
                                        type="number"
                                        defaultValue={String(user.mitgliedId ?? "")}
                                    />
                                </label>

                                <label>
                                    <Text size="2" weight="bold" mb="1" as="div">
                                        Rolle
                                    </Text>
                                    <Select.Root name="role" defaultValue={user.role}>
                                        <Select.Trigger />
                                        <Select.Content>
                                            <Select.Item value="MEMBER">MEMBER</Select.Item>
                                            <Select.Item value="ADMIN">ADMIN</Select.Item>
                                        </Select.Content>
                                    </Select.Root>
                                </label>
                            </>
                        )}

                        <Flex gap="3" mt="4">
                            <Button type="submit">Speichern</Button>
                            <Link href="/dashboard">
                                <Button variant="soft" color="gray">
                                    Abbrechen
                                </Button>
                            </Link>
                        </Flex>
                    </Flex>
                </form>
            </Card>
        </Container>
    );
}