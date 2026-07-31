import { redirect } from "next/navigation";
import { assertCanEditUser, requireUser } from "@/lib/server/authz";
import { AppError } from "@/lib/server/errors";
import { getEditableUser, updateUserProfile } from "@/lib/server/services/userService";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { userUpdateSchema } from "@/lib/server/validation/schemas";
import {
    Flex,
    Heading,
    Text,
    Button,
    Container,
    Card,
    TextField,
    Select,
    Box,
} from "@radix-ui/themes";
import { ArrowLeftIcon, CheckIcon, MinusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function updateUser(formData: FormData) {
    "use server";
    const currentUser = await requireUser();

    let parsed;
    try {
        parsed = parseFormData(userUpdateSchema, formData);
    } catch (e) {
        if (e instanceof AppError && e.code === "VALIDATION_ERROR") {
            const id = formData.get("id");
            const idStr = typeof id === "string" ? id : "";
            if (idStr) {
                redirect(`/dashboard/users/${idStr}?validationError=1`);
            }
            redirect("/dashboard");
        }
        throw e;
    }

    assertCanEditUser(currentUser, parsed.id);

    const result = await updateUserProfile({
        idToEdit: parsed.id,
        currentUserRole: currentUser.role,
        currentUserId: currentUser.id,
        // basic
        name: parsed.name,
        vorname: parsed.vorname,
        email: parsed.email,
        titel: parsed.titel,
        // kontakt & adresse
        plz: parsed.plz,
        stadt: parsed.stadt,
        strasse: parsed.strasse,
        telefon: parsed.telefon,
        land: parsed.land,
        geburtsdatum: parsed.geburtsdatum,
        website: parsed.website,
        // studium
        studiengang: parsed.studiengang,
        studienbeginn: parsed.studienbeginn,
        studienende: parsed.studienende,
        diplomarbeit: parsed.diplomarbeit,
        bachelorarbeit: parsed.bachelorarbeit,
        masterarbeit: parsed.masterarbeit,
        dissertation: parsed.dissertation,
        // beruf
        arbeitgeber: parsed.arbeitgeber,
        berufsstand: parsed.berufsstand,
        berufszweig: parsed.berufszweig,
        position: parsed.position,
        praktika: parsed.praktika,
        berufserfahrung: parsed.berufserfahrung,
        // zahlungs/admin
        zahlungsKommentar: parsed.zahlungsKommentar,
        bank: parsed.bank,
        BLZ: parsed.BLZ,
        KTO: parsed.KTO,
        bankeinzug: parsed.bankeinzug,
        zuwendungsbesch: parsed.zuwendungsbesch,
        mahnung: parsed.mahnung,
        IBAN: parsed.IBAN,
        BIC: parsed.BIC,
        mandatserteilung: parsed.mandatserteilung,
        datensperren: parsed.datensperren,
        ausschluss: parsed.ausschluss,
        // Mitglieds- / role (admin only allowed to change)
        role:
            parsed.role === "ADMIN" || parsed.role === "MEMBER"
                ? parsed.role
                : undefined,
        status:
            parsed.status === "ORDENTLICHES_MITGLIED" ||
                parsed.status === "EHRENMITGLIED" ||
                parsed.status === "KEIN_MITGLIED"
                ? parsed.status
                : undefined,
        mitgliedId: parsed.mitgliedId,
    });

    if (!result.ok && result.reason === "mitgliedId_conflict") {
        redirect(`/dashboard/users/${parsed.id}?mitgliedIdError=1`);
    }

    revalidatePath("/dashboard");
    if (result.emailChanged) {
        redirect("/dashboard?emailChanged=1");
    } else {
        redirect("/dashboard");
    }
}

export default async function EditUserPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ mitgliedIdError?: string; validationError?: string }>;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;

    const currentUser = await requireUser();
    const isAdmin = currentUser.role === "ADMIN";

    // SICHERHEIT: MEMBER wird beim Zugriff auf fremde Profile aufs Dashboard geschickt
    if (!isAdmin && currentUser.id !== resolvedParams.id) {
        redirect("/dashboard");
    }

    const user = await getEditableUser(resolvedParams.id);
    if (!user) return <Text>User nicht gefunden</Text>;

    return (
        <Box py="5" style={{ minHeight: "100%" }}>
            <Container size="2">
                <Flex justify="between" align="center" mb="4">
                    <Box>
                        <Text size="2" color="gray">
                            Internbereich
                        </Text>
                        <Heading size="6">
                            {isAdmin ? "Benutzer bearbeiten" : "Mein Profil bearbeiten"}
                        </Heading>
                    </Box>
                    <Link href="/dashboard">
                        <Button variant="soft" color="gray">
                            <ArrowLeftIcon /> Zurück zum Dashboard
                        </Button>
                    </Link>
                </Flex>

                <Card size="3">
                    {resolvedSearchParams?.validationError === "1" && (
                        <Card mb="4" style={{ backgroundColor: "var(--red-3)" }}>
                            <Text weight="bold" color="red" size="2">
                                Bitte prüfe deine Eingaben.
                            </Text>
                            <Text size="2" color="red">
                                Ein oder mehrere Felder sind ungültig oder fehlen.
                            </Text>
                        </Card>
                    )}

                    {isAdmin && resolvedSearchParams?.mitgliedIdError === "1" && (
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
                                Vorname
                            </Text>
                            <TextField.Root name="vorname" defaultValue={user.vorname || ""} />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Name
                            </Text>
                            <TextField.Root name="name" defaultValue={user.name || ""} required />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                E-Mail
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
                                Geburtsdatum
                            </Text>
                            <input
                                name="geburtsdatum"
                                type="date"
                                defaultValue={
                                    user.geburtsdatum
                                        ? new Date(user.geburtsdatum).toISOString().slice(0, 10)
                                        : ""
                                }
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Land
                            </Text>
                            <TextField.Root name="land" defaultValue={user.land || ""} />
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
                                Website
                            </Text>
                            <TextField.Root name="website" defaultValue={user.website || ""} />
                        </label>

                        <Heading size="3" mb="2">
                            Studium
                        </Heading>

                        <label>
                            <Text size="2" weight="bold">
                                Studiengang
                            </Text>
                            <TextField.Root
                                name="studiengang"
                                defaultValue={user.studiengang || ""}
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Studienbeginn
                            </Text>
                            <input
                                name="studienbeginn"
                                type="date"
                                defaultValue={
                                    user.studienbeginn
                                        ? new Date(user.studienbeginn).toISOString().slice(0, 10)
                                        : ""
                                }
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Studienende
                            </Text>
                            <input
                                name="studienende"
                                type="date"
                                defaultValue={
                                    user.studienende
                                        ? new Date(user.studienende).toISOString().slice(0, 10)
                                        : ""
                                }
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Diplomarbeit
                            </Text>
                            <TextField.Root
                                name="diplomarbeit"
                                defaultValue={user.diplomarbeit || ""}
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Bachelorarbeit
                            </Text>
                            <TextField.Root
                                name="bachelorarbeit"
                                defaultValue={user.bachelorarbeit || ""}
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Masterarbeit
                            </Text>
                            <TextField.Root
                                name="masterarbeit"
                                defaultValue={user.masterarbeit || ""}
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Dissertation
                            </Text>
                            <TextField.Root
                                name="dissertation"
                                defaultValue={user.dissertation || ""}
                            />
                        </label>

                        <Heading size="3" mb="2">
                            Beruf
                        </Heading>

                        <label>
                            <Text size="2" weight="bold">
                                Arbeitgeber
                            </Text>
                            <TextField.Root
                                name="arbeitgeber"
                                defaultValue={user.arbeitgeber || ""}
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Berufsstand
                            </Text>
                            <TextField.Root
                                name="berufsstand"
                                defaultValue={user.berufsstand || ""}
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Berufszweig
                            </Text>
                            <TextField.Root
                                name="berufszweig"
                                defaultValue={user.berufszweig || ""}
                            />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Position
                            </Text>
                            <TextField.Root name="position" defaultValue={user.position || ""} />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Praktika
                            </Text>
                            <TextField.Root name="praktika" defaultValue={user.praktika || ""} />
                        </label>

                        <label>
                            <Text size="2" weight="bold">
                                Berufserfahrung
                            </Text>
                            <TextField.Root
                                name="berufserfahrung"
                                defaultValue={user.berufserfahrung || ""}
                            />
                        </label>

                        {isAdmin && (
                            <>
                                <Heading size="3" mb="2">
                                    Zahlungs- & Admin-Informationen
                                </Heading>

                                <label>
                                    <Text size="2" weight="bold">
                                        Zahlungs-Kommentar
                                    </Text>
                                    <TextField.Root
                                        name="zahlungsKommentar"
                                        defaultValue={user.zahlungsKommentar || ""}
                                    />
                                </label>

                                <label>
                                    <Text size="2" weight="bold">
                                        Bank
                                    </Text>
                                    <TextField.Root name="bank" defaultValue={user.bank || ""} />
                                </label>

                                <label>
                                    <Text size="2" weight="bold">
                                        BLZ
                                    </Text>
                                    <TextField.Root name="BLZ" defaultValue={user.BLZ || ""} />
                                </label>

                                <label>
                                    <Text size="2" weight="bold">
                                        Kontonummer
                                    </Text>
                                    <TextField.Root name="KTO" defaultValue={user.KTO || ""} />
                                </label>

                                <label>
                                    <Text size="2" weight="bold">
                                        Bankeinzug
                                    </Text>
                                    <input
                                        name="bankeinzug"
                                        type="checkbox"
                                        defaultChecked={Boolean(user.bankeinzug)}
                                    />
                                </label>

                                <label>
                                    <Text size="2" weight="bold">
                                        Zuwendungsbeschreibung
                                    </Text>
                                    <input
                                        name="zuwendungsbesch"
                                        type="checkbox"
                                        defaultChecked={Boolean(user.zuwendungsbesch)}
                                    />
                                </label>

                                <label>
                                    <Text size="2" weight="bold">
                                        Mahnung
                                    </Text>
                                    <TextField.Root name="mahnung" defaultValue={user.mahnung || ""} />
                                </label>

                                <label>
                                    <Text size="2" weight="bold">
                                        IBAN
                                    </Text>
                                    <TextField.Root name="IBAN" defaultValue={user.IBAN || ""} />
                                </label>

                                <label>
                                    <Text size="2" weight="bold">
                                        BIC
                                    </Text>
                                    <TextField.Root name="BIC" defaultValue={user.BIC || ""} />
                                </label>

                                <label>
                                    <Text size="2" weight="bold">
                                        Mandatserteilung
                                    </Text>
                                    <input
                                        name="mandatserteilung"
                                        type="date"
                                        defaultValue={
                                            user.mandatserteilung
                                                ? new Date(user.mandatserteilung).toISOString().slice(0, 10)
                                                : ""
                                        }
                                    />
                                </label>

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

                                <label>
                                    <Text size="2" weight="bold" mb="1" as="div">
                                        Status
                                    </Text>
                                    <Select.Root name="status" defaultValue={user.status}>
                                        <Select.Trigger />
                                        <Select.Content>
                                            <Select.Item value="ORDENTLICHES_MITGLIED">
                                                ORDENTLICHES_MITGLIED
                                            </Select.Item>
                                            <Select.Item value="EHRENMITGLIED">
                                                EHRENMITGLIED
                                            </Select.Item>
                                            <Select.Item value="KEIN_MITGLIED">KEIN_MITGLIED</Select.Item>
                                        </Select.Content>
                                    </Select.Root>
                                </label>

                                <label>
                                    <Text size="2" weight="bold">
                                        Datensperren
                                    </Text>
                                    <input
                                        name="datensperren"
                                        type="checkbox"
                                        defaultChecked={Boolean(user.datensperren)}
                                    />
                                </label>

                                <label>
                                    <Text size="2" weight="bold">
                                        Ausschluss
                                    </Text>
                                    <input
                                        name="ausschluss"
                                        type="checkbox"
                                        defaultChecked={Boolean(user.ausschluss)}
                                    />
                                </label>
                            </>
                        )}

                        <Flex gap="3" mt="4">
                            <Button type="submit">
                                <CheckIcon /> Speichern
                            </Button>
                            <Link href="/dashboard">
                                <Button variant="soft" color="gray" type="button">
                                    <MinusIcon /> Abbrechen
                                </Button>
                            </Link>
                        </Flex>
                    </Flex>
                </form>
            </Card>
        </Container>
    </Box>
    );
}
