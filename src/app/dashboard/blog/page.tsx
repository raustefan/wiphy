import { requireAdmin } from "@/lib/server/authz";
import { getAdminPosts } from "@/lib/server/services/blogService";
import { Flex, Heading, Button, Container, Card, Table, Badge, Text, Box } from "@radix-ui/themes";
import { ArrowLeftIcon, PlusIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { deletePost } from "./actions";

export default async function AdminBlogPage() {
    await requireAdmin();
    const posts = await getAdminPosts();

    return (
        <Box py="5" style={{ minHeight: "100%" }}>
            <Container size="4">
                <Flex justify="between" align="center" mb="4">
                    <Box>
                        <Text size="2" color="gray">
                            Internbereich
                        </Text>
                        <Heading size="6">Blog verwalten</Heading>
                    </Box>
                    <Flex gap="3">
                        <Link href="/dashboard">
                            <Button variant="soft" color="gray">
                                <ArrowLeftIcon /> Zurück zum Dashboard
                            </Button>
                        </Link>
                        <Link href="/dashboard/blog/new">
                            <Button color="green">
                                <PlusIcon /> Neuer Beitrag
                            </Button>
                        </Link>
                    </Flex>
                </Flex>

                <Card size="3">
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>Titel</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Datum</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Aktionen</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {posts.map((post) => (
                                <Table.Row key={post.id}>
                                    <Table.Cell>{post.title}</Table.Cell>
                                    <Table.Cell>
                                        <Badge color={post.published ? "green" : "orange"}>
                                            {post.published ? "Veröffentlicht" : "Entwurf"}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>{post.createdAt.toLocaleDateString('de-DE')}</Table.Cell>
                                    <Table.Cell>
                                        <Flex gap="2">
                                            <Link href={`/dashboard/blog/${post.id}`}>
                                                <Button size="1" variant="soft" color="blue">
                                                    <Pencil2Icon /> Bearbeiten
                                                </Button>
                                            </Link>
                                            <form action={deletePost}>
                                                <input type="hidden" name="id" value={post.id} />
                                                <Button size="1" color="red" variant="soft" type="submit">
                                                    <TrashIcon /> Löschen
                                                </Button>
                                            </form>
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                            {posts.length === 0 && (
                                <Table.Row>
                                    <Table.Cell colSpan={4}>Noch keine Beiträge vorhanden.</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Root>
                </Card>
            </Container>
        </Box>
    );
}
