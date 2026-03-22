import { requireAdmin } from "@/lib/server/authz";
import { getAdminPosts } from "@/lib/server/services/blogService";
import { Flex, Heading, Button, Container, Card, Table, Badge } from "@radix-ui/themes";
import Link from "next/link";
import { deletePost } from "./actions";

export default async function AdminBlogPage() {
    await requireAdmin();
    const posts = await getAdminPosts();

    return (
        <Container size="4" mt="6">
            <Flex justify="between" mb="4">
                <Heading>Blog verwalten</Heading>
                <Flex gap="3">
                    <Link href="/dashboard"><Button variant="soft" color="gray">Zurück</Button></Link>
                    <Link href="/dashboard/blog/new"><Button>Neuer Beitrag</Button></Link>
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
                                            <Button size="1" variant="soft">Bearbeiten</Button>
                                        </Link>
                                        <form action={deletePost}>
                                            <input type="hidden" name="id" value={post.id} />
                                            <Button size="1" color="red" variant="soft" type="submit">Löschen</Button>
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
    );
}