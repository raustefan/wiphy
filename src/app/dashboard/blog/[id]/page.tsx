import { requireAdmin } from "@/lib/server/authz";
import { getPostForEdit } from "@/lib/server/services/blogService";
import { Flex, Text, Button, Container, Card, TextField, TextArea, Checkbox, Box } from "@radix-ui/themes";
import { CheckIcon, MinusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { savePost } from "../actions";
import MarkdownEditor from "@/components/MarkdownEditor";
import { auth } from "@/auth";
import { DashboardPageHeader } from "../../DashboardPageHeader";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    await requireAdmin();
    const session = await auth();

    const isNew = resolvedParams.id === "new";

    let post = null;
    if (!isNew) {
        post = await getPostForEdit(resolvedParams.id);
        if (!post) return <Text>Beitrag nicht gefunden</Text>;
    }

    const defaultDate = (post?.publishedAt || new Date()).toISOString().split("T")[0];
    const defaultAuthor = post?.author || session?.user?.name || "";

    return (
        <Box py={{ initial: "6", sm: "8" }} style={{ minHeight: "100%" }}>
            <Container size="3" px={{ initial: "4", sm: "5" }}>
                <DashboardPageHeader
                    eyebrow="Internbereich"
                    title={isNew ? "Neuen Beitrag erstellen" : "Beitrag bearbeiten"}
                    backHref="/dashboard/blog"
                    backLabel="Zurück zur Übersicht"
                />

                <Card size="3">
                    <form action={savePost}>
                        <input type="hidden" name="id" value={isNew ? "new" : post?.id} />

                        <Flex direction="column" gap="4">
                            <label>
                                <Text size="2" weight="bold">Titel</Text>
                                <TextField.Root name="title" defaultValue={post?.title || ""} required />
                            </label>

                            <label>
                                <Text size="2" weight="bold">Autor</Text>
                                <TextField.Root name="author" defaultValue={defaultAuthor} required />
                            </label>

                            <label>
                                <Text size="2" weight="bold">Veröffentlichungsdatum</Text>
                                <TextField.Root type="date" name="publishedAt" defaultValue={defaultDate} required />
                            </label>

                            <label>
                                <Text size="2" weight="bold">Kurze Textpreview (Vorschau-Snippet)</Text>
                                <TextArea name="preview" defaultValue={post?.preview || ""} placeholder="Kurze Zusammenfassung für die Blog-Übersichtsseite..." required style={{ minHeight: "80px" }} />
                            </label>

                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <Text size="2" weight="bold">Inhalt (Markdown)</Text>
                                <MarkdownEditor initialValue={post?.content || ""} />
                            </div>

                            <Text as="label" size="2">
                                <Flex gap="2" align="center">
                                    <Checkbox name="published" defaultChecked={post?.published || false} />
                                    Beitrag veröffentlichen (sichtbar für alle)
                                </Flex>
                            </Text>

                            <Flex direction={{ initial: "column", xs: "row" }} gap="3" mt="4">
                                <Button size="3" type="submit">
                                    <CheckIcon /> Speichern
                                </Button>
                                <Button size="3" variant="soft" color="gray" asChild>
                                    <Link href="/dashboard/blog">
                                        <MinusIcon /> Abbrechen
                                    </Link>
                                </Button>
                            </Flex>
                        </Flex>
                    </form>
                </Card>
            </Container>
        </Box>
    );
}
