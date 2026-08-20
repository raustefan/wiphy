import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { adminCreateUser } from "@/lib/server/services/userService";
import { Flex, Heading, Text, Button, Container, Card, TextField, Select, Box } from "@radix-ui/themes";
import { ArrowLeftIcon, CheckIcon, MinusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { AppError } from "@/lib/server/errors";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { adminCreateUserSchema } from "@/lib/server/validation/schemas";
import { requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";
import { Suspense } from "react";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { STATUS_OPTIONS, ROLE_OPTIONS } from "@/lib/statusLabels";

async function createUserAction(formData: FormData) {
    "use server";
    const currentUser = await requireUser();
    if (currentUser.role !== "ADMIN") return redirect("/dashboard");

    await requireFeatureEnabledOrRedirect("USER_CREATION", "/dashboard/users/new");

    let parsed;
    try {
        parsed = parseFormData(adminCreateUserSchema, formData);
    } catch (error) {
        if (error instanceof AppError && error.code === "VALIDATION_ERROR") {
            redirect("/dashboard/users/new?error=missing_fields");
        }
        throw error;
    }

    try {
        await adminCreateUser({
            email: parsed.email,
            password: parsed.password,
            name: parsed.name,
            vorname: parsed.vorname,
            role: parsed.role,
            status: parsed.status,
        }, currentUser.role);
    } catch {
        redirect("/dashboard/users/new?error=creation_failed");
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export default async function NewUserPage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
    const currentUser = await requireUser();
    if (currentUser.role !== "ADMIN") return redirect("/dashboard");
    
    const resolvedSearchParams = searchParams ? await searchParams : undefined;

    return (
        <Box py="5" style={{ minHeight: "100%" }}>
            <Suspense fallback={null}>
                <FeatureDisabledQueryDialog />
            </Suspense>
            <Container size="2">
                <Flex justify="between" align="center" mb="4">
                    <Box>
                        <Text size="2" color="gray">
                            Internbereich
                        </Text>
                        <Heading size="6">Benutzer hinzufügen</Heading>
                    </Box>
                    <Link href="/dashboard">
                        <Button variant="soft" color="gray">
                            <ArrowLeftIcon /> Zurück zum Dashboard
                        </Button>
                    </Link>
                </Flex>

                <Card size="3">
                    {resolvedSearchParams?.error === "missing_fields" && (
                        <Card mb="4" style={{ backgroundColor: "var(--red-3)" }}>
                            <Text weight="bold" color="red" size="2">Bitte alle Pflichtfelder ausfüllen.</Text>
                        </Card>
                    )}
                    {resolvedSearchParams?.error === "creation_failed" && (
                        <Card mb="4" style={{ backgroundColor: "var(--red-3)" }}>
                            <Text weight="bold" color="red" size="2">Ein Fehler ist aufgetreten (evtl. existiert die E-Mail bereits).</Text>
                        </Card>
                    )}

                    <form action={createUserAction}>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text size="2" weight="bold">Vorname *</Text>
                                <TextField.Root name="vorname" required />
                            </label>

                            <label>
                                <Text size="2" weight="bold">Nachname *</Text>
                                <TextField.Root name="name" required />
                            </label>

                            <label>
                                <Text size="2" weight="bold">E-Mail *</Text>
                                <TextField.Root name="email" type="email" required />
                            </label>

                            <label>
                                <Text size="2" weight="bold">Passwort *</Text>
                                <TextField.Root name="password" type="password" required />
                            </label>

                            <Flex gap="3">
                                <Box flexGrow="1">
                                    <label>
                                        <Text size="2" weight="bold" mb="1" as="div">Rolle</Text>
                                        <Select.Root name="role" defaultValue="MEMBER">
                                            <Select.Trigger />
                                            <Select.Content>
                                                {ROLE_OPTIONS.map((o) => (
                                                    <Select.Item key={o.value} value={o.value}>
                                                        {o.label}
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Root>
                                    </label>
                                </Box>
                                <Box flexGrow="1">
                                    <label>
                                        <Text size="2" weight="bold" mb="1" as="div">Status</Text>
                                        <Select.Root name="status" defaultValue="KEIN_MITGLIED">
                                            <Select.Trigger />
                                            <Select.Content>
                                                {STATUS_OPTIONS.map((o) => (
                                                    <Select.Item key={o.value} value={o.value}>
                                                        {o.label}
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Root>
                                    </label>
                                </Box>
                            </Flex>

                            <Flex gap="3" mt="4">
                                <Button type="submit">
                                    <CheckIcon /> Hinzufügen
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
