import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/server/authz";
import { getPostForEdit } from "@/lib/server/services/blogService";
import { getEventOptions } from "@/lib/server/services/eventService";
import { formatEventShort } from "@/lib/events";
import { Check, X } from "lucide-react";
import { savePost } from "../actions";
import MarkdownEditor from "@/components/MarkdownEditor";
import { DashboardPageHeader } from "../../DashboardPageHeader";
import { BlogImageManager } from "./BlogImageManager";
import {
    Button,
    ButtonLink,
    Card,
    Checkbox,
    Container,
    Field,
    Input,
    Select,
    TextArea,
} from "@/components/ui";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    await requireAdmin();

    // Neue Beiträge entstehen seit der Galerie als Entwurf in der Übersicht
    // (siehe `createDraft`) — die alte `/new`-Adresse führt nur noch dorthin
    // zurück, statt ein Formular ohne Beitrags-ID zu zeigen.
    if (resolvedParams.id === "new") {
        redirect("/dashboard/blog");
    }

    const [post, events] = await Promise.all([
        getPostForEdit(resolvedParams.id),
        getEventOptions(),
    ]);
    if (!post) {
        return (
            <Container size="2" className="py-16 text-center text-muted">
                Beitrag nicht gefunden
            </Container>
        );
    }

    const defaultDate = post.publishedAt.toISOString().split("T")[0];

    return (
        <Container size="3" className="grid gap-5 py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Internbereich"
                title="Beitrag bearbeiten"
                backHref="/dashboard/blog"
                backLabel="Zurück zur Übersicht"
            />

            <Card className="p-5 sm:p-6">
                <form action={savePost} className="grid gap-4">
                    <input type="hidden" name="id" value={post.id} />

                    <Field label="Titel" htmlFor="post-title">
                        <Input id="post-title" name="title" defaultValue={post.title} required />
                    </Field>

                    <Field label="Autor" htmlFor="post-author">
                        <Input id="post-author" name="author" defaultValue={post.author} required />
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
                        label="Gehört zu Termin"
                        htmlFor="post-event"
                        hint="Verknüpft den Beitrag als Rückblick mit einem Termin. Beide Seiten verlinken danach aufeinander."
                    >
                        <Select
                            id="post-event"
                            name="eventId"
                            defaultValue={post.event?.id ?? ""}
                        >
                            <option value="">— kein Termin —</option>
                            {events.map((event) => (
                                <option key={event.id} value={event.id}>
                                    {formatEventShort(event)} · {event.title}
                                    {event.published ? "" : " (Entwurf)"}
                                </option>
                            ))}
                        </Select>
                    </Field>

                    <Field label="Kurze Textpreview (Vorschau-Snippet)" htmlFor="post-preview">
                        <TextArea
                            id="post-preview"
                            name="preview"
                            defaultValue={post.preview}
                            placeholder="Kurze Zusammenfassung für die Blog-Übersichtsseite …"
                            required
                        />
                    </Field>

                    <div className="grid gap-2">
                        <span className="text-sm font-semibold text-foreground">
                            Inhalt (Markdown)
                        </span>
                        <MarkdownEditor initialValue={post.content} />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="post-published"
                            name="published"
                            defaultChecked={post.published}
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

            <BlogImageManager postId={post.id} images={post.images} />
        </Container>
    );
}
