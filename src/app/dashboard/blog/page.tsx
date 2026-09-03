import { requireAdmin } from "@/lib/server/authz";
import { getAdminPosts } from "@/lib/server/services/blogService";
import { Plus, Pencil } from "lucide-react";
import { deletePost } from "./actions";
import { Suspense } from "react";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { DeletePostButton } from "./DeletePostButton";
import {
    Badge,
    ButtonLink,
    Card,
    Container,
    Table,
    TableWrap,
    Td,
    Th,
} from "@/components/ui";

export default async function AdminBlogPage() {
    await requireAdmin();
    const posts = await getAdminPosts();

    return (
        <Container size="4" className="py-8 sm:py-12">
            <Suspense fallback={null}>
                <FeatureDisabledQueryDialog />
            </Suspense>

            <DashboardPageHeader
                eyebrow="Internbereich"
                title="Blog verwalten"
                backHref="/dashboard"
            >
                <ButtonLink href="/dashboard/blog/new" className="w-full sm:w-auto">
                    <Plus size={16} aria-hidden="true" /> Neuer Beitrag
                </ButtonLink>
            </DashboardPageHeader>

            <Card className="p-4 sm:p-6">
                <TableWrap>
                    <Table className="min-w-[560px]">
                        <thead>
                            <tr className="bg-raised/60">
                                <Th>Titel</Th>
                                <Th>Status</Th>
                                <Th>Datum</Th>
                                <Th className="text-right">Aktionen</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="transition-colors hover:bg-raised/50">
                                    <Td className="font-medium">{post.title}</Td>
                                    <Td>
                                        <Badge tone={post.published ? "positive" : "warning"}>
                                            {post.published ? "Veröffentlicht" : "Entwurf"}
                                        </Badge>
                                    </Td>
                                    <Td className="tabular-nums whitespace-nowrap text-muted">
                                        {post.createdAt.toLocaleDateString("de-DE")}
                                    </Td>
                                    <Td>
                                        <div className="flex flex-wrap justify-end gap-2">
                                            <ButtonLink
                                                href={`/dashboard/blog/${post.id}`}
                                                size="sm"
                                                variant="soft"
                                            >
                                                <Pencil size={16} aria-hidden="true" /> Bearbeiten
                                            </ButtonLink>
                                            <DeletePostButton
                                                postId={post.id}
                                                title={post.title}
                                                deleteAction={deletePost}
                                            />
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <Td colSpan={4} className="py-8 text-center text-muted">
                                        Noch keine Beiträge vorhanden.
                                    </Td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </TableWrap>
            </Card>
        </Container>
    );
}
