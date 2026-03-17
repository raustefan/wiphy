import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Flex, Heading, Text, Button, Container, Card, TextField, Checkbox } from "@radix-ui/themes";
import Link from "next/link";
import { savePost } from "../actions";
import MarkdownEditor from "@/components/MarkdownEditor";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const session = await auth();
    if ((session?.user as any)?.role !== "ADMIN") redirect("/dashboard");

    const isNew = resolvedParams.id === "new";

    let post = null;
    if (!isNew) {
        post = await prisma.blogPost.findUnique({ where: { id: resolvedParams.id } });
        if (!post) return <Text>Beitrag nicht gefunden</Text>;
    }

    return (
        <Container size="3" mt="6" mb="6">
            <Card size="4">
                <Heading mb="4">{isNew ? "Neuen Beitrag erstellen" : "Beitrag bearbeiten"}</Heading>

                <form action={savePost}>
                    <input type="hidden" name="id" value={isNew ? "new" : post?.id} />

                    <Flex direction="column" gap="4">
                        <label>
                            <Text size="2" weight="bold">Titel</Text>
                            <TextField.Root name="title" defaultValue={post?.title || ""} required />
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

                        <Flex gap="3" mt="4">
                            <Button type="submit">Speichern</Button>
                            <Link href="/dashboard/blog">
                                <Button variant="soft" color="gray" type="button">Abbrechen</Button>
                            </Link>
                        </Flex>
                    </Flex>
                </form>
            </Card>
        </Container>
    );
}