import { requireAdmin } from "@/lib/server/authz";
import { getAdminPosts } from "@/lib/server/services/blogService";
import { Images, Pencil, Plus } from "lucide-react";
import { createDraft, deletePost } from "./actions";
import { Suspense } from "react";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { DeletePostButton } from "./DeletePostButton";
import { formatDateShort } from "@/lib/format";
import { blogImageUrl } from "@/lib/blogImages";
import {
    Badge,
    Button,
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
                {/* Knopf statt Link: der Entwurf entsteht sofort in der
                    Datenbank, damit die Bearbeitungsseite eine Beitrags-ID hat,
                    an der Bilder hängen können. */}
                <form action={createDraft} className="w-full sm:w-auto">
                    <Button type="submit" className="w-full sm:w-auto">
                        <Plus size={16} aria-hidden="true" /> Neuer Beitrag
                    </Button>
                </form>
            </DashboardPageHeader>

            <Card className="p-4 sm:p-6">
                <TableWrap>
                    <Table className="min-w-[640px]">
                        <thead>
                            <tr className="bg-raised/60">
                                <Th>Bild</Th>
                                <Th>Titel</Th>
                                <Th>Status</Th>
                                <Th>Datum</Th>
                                <Th className="text-right">Aktionen</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="transition-colors hover:bg-raised/50">
                                    <Td>
                                        {post.cover ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={blogImageUrl(post.cover.id, "thumb")}
                                                alt=""
                                                loading="lazy"
                                                decoding="async"
                                                className="size-12 rounded-lg border border-line object-cover"
                                            />
                                        ) : (
                                            <span
                                                className="grid size-12 place-items-center rounded-lg border border-dashed border-line text-faint"
                                                title="Kein Titelbild"
                                            >
                                                <Images size={16} aria-hidden="true" />
                                            </span>
                                        )}
                                    </Td>
                                    <Td className="font-medium">
                                        {post.title}
                                        {post.images.length > 1 && (
                                            <span className="ml-2 font-mono text-xs whitespace-nowrap text-faint">
                                                +{post.images.length - 1} Bilder
                                            </span>
                                        )}
                                    </Td>
                                    <Td>
                                        <Badge tone={post.published ? "positive" : "warning"}>
                                            {post.published ? "Veröffentlicht" : "Entwurf"}
                                        </Badge>
                                    </Td>
                                    <Td className="tabular-nums whitespace-nowrap text-muted">
                                        {formatDateShort(post.createdAt)}
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
                                    <Td colSpan={5} className="py-8 text-center text-muted">
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
