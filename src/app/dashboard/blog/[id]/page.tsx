import { requireAdmin } from "@/lib/server/authz";
import { getPostForEdit } from "@/lib/server/services/blogService";
import { Check, X } from "lucide-react";
import { savePost } from "../actions";
import MarkdownEditor from "@/components/MarkdownEditor";
import { auth } from "@/auth";
import { DashboardPageHeader } from "../../DashboardPageHeader";
import {
    Button,
    ButtonLink,
    Card,
    Checkbox,
    Container,
    Field,
    Input,
    TextArea,
} from "@/components/ui";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    await requireAdmin();
    const session = await auth();

    const isNew = resolvedParams.id === "new";

    let post = null;
    if (!isNew) {
        post = await getPostForEdit(resolvedParams.id);
        if (!post) {
            return (
                <Container size="2" className="py-16 text-center text-muted">
                    Beitrag nicht gefunden
                </Container>
            );
        }
    }

    const defaultDate = (post?.publishedAt || new Date()).toISOString().split("T")[0];
    const defaultAuthor = post?.author || session?.user?.name || "";

    return (
        <Container size="3" className="py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Internbereich"
                title={isNew ? "Neuen Beitrag erstellen" : "Beitrag bearbeiten"}
                backHref="/dashboard/blog"
                backLabel="Zurück zur Übersicht"
            />

            <Card className="p-5 sm:p-6">
                <form action={savePost} className="grid gap-4">
                    <input type="hidden" name="id" value={isNew ? "new" : post?.id} />

                    <Field label="Titel" htmlFor="post-title">
                        <Input
                            id="post-title"
                            name="title"
                            defaultValue={post?.title || ""}
                            required
                        />
                    </Field>

                    <Field label="Autor" htmlFor="post-author">
                        <Input
                            id="post-author"
                            name="author"
                            defaultValue={defaultAuthor}
                            required
                        />
                    </Field>

                    <Field label="Veröffentlichungsdatum" htmlFor="post-published-at">
                        <Input
                            id="post-published-at"
                            type="date"
                            name="publishedAt"
                            defaultValue={defaultDate}
                            required
                        />
                    </Field>

                    <Field
                        label="Bildvorschau (URL)"
                        htmlFor="post-image-url"
                        hint="Wird auf der Blog-Übersicht und beim Beitrag selbst als Vorschaubild angezeigt."
                    >
                        <Input
                            id="post-image-url"
                            name="imageUrl"
                            type="url"
                            defaultValue={post?.imageUrl || ""}
                            placeholder="https://.../vorschaubild.jpg"
                        />
                    </Field>

                    <Field label="Kurze Textpreview (Vorschau-Snippet)" htmlFor="post-preview">
                        <TextArea
                            id="post-preview"
                            name="preview"
                            defaultValue={post?.preview || ""}
                            placeholder="Kurze Zusammenfassung für die Blog-Übersichtsseite …"
                            required
                        />
                    </Field>

                    <div className="grid gap-2">
                        <span className="text-sm font-semibold text-foreground">
                            Inhalt (Markdown)
                        </span>
                        <MarkdownEditor initialValue={post?.content || ""} />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="post-published"
                            name="published"
                            defaultChecked={post?.published || false}
                        />
                        <label htmlFor="post-published" className="cursor-pointer text-sm">
                            Beitrag veröffentlichen (sichtbar für alle)
                        </label>
                    </div>

                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                        <Button size="lg" type="submit">
                            <Check size={16} aria-hidden="true" /> Speichern
                        </Button>
                        <ButtonLink
                            href="/dashboard/blog"
                            size="lg"
                            variant="soft"
                            color="neutral"
                        >
                            <X size={16} aria-hidden="true" /> Abbrechen
                        </ButtonLink>
                    </div>
                </form>
            </Card>
        </Container>
    );
}
