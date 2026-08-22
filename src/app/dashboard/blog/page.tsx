import { requireAdmin } from "@/lib/server/authz";
import { getAdminPosts } from "@/lib/server/services/blogService";
import { Flex, Button, Container, Card, Table, Badge, Text, Box } from "@radix-ui/themes";
import { PlusIcon, Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { deletePost } from "./actions";
import { Suspense } from "react";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { DeletePostButton } from "./DeletePostButton";

export default async function AdminBlogPage() {
    await requireAdmin();
    const posts = await getAdminPosts();

    return (
        <Box py={{ initial: "6", sm: "8" }} style={{ minHeight: "100%" }}>
            <Suspense fallback={null}>
                <FeatureDisabledQueryDialog />
            </Suspense>
            <Container size="4" px={{ initial: "4", sm: "5" }}>
                <DashboardPageHeader
                    eyebrow="Internbereich"
                    title="Blog verwalten"
                    backHref="/dashboard"
                >
                    <Button size="3" color="green" asChild style={{ width: "fit-content" }}>
                        <Link href="/dashboard/blog/new">
                            <PlusIcon /> Neuer Beitrag
                        </Link>
                    </Button>
                </DashboardPageHeader>

                <Card size="3">
                    <Box style={{ overflowX: "auto" }} mx={{ initial: "-4", sm: "0" }}>
                        <Table.Root style={{ minWidth: 560 }}>
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
                                            <Flex gap="2" direction={{ initial: "column", xs: "row" }}>
                                                <Button size="2" variant="soft" color="blue" asChild>
                                                    <Link href={`/dashboard/blog/${post.id}`}>
                                                        <Pencil2Icon /> Bearbeiten
                                                    </Link>
                                                </Button>
                                                <DeletePostButton
                                                    postId={post.id}
                                                    title={post.title}
                                                    deleteAction={deletePost}
                                                />
                                            </Flex>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                                {posts.length === 0 && (
                                    <Table.Row>
                                        <Table.Cell colSpan={4}>
                                            <Text size="2" color="gray">Noch keine Beiträge vorhanden.</Text>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Root>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
}
