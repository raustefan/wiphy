"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, ImagePlus, Star, Trash2, Upload } from "lucide-react";
import {
    Badge,
    Button,
    Callout,
    Card,
    Dialog,
    DialogFooter,
    IconButton,
    Input,
} from "@/components/ui";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
import type { ActionResult } from "@/lib/server/errors";
import {
    BLOG_IMAGE_ACCEPT_ATTRIBUTE,
    MAX_BLOG_IMAGES,
    MAX_BLOG_IMAGE_UPLOAD_BYTES,
    blogImageUrl,
    formatBytes,
    type BlogImageMeta,
} from "@/lib/blogImages";
import { deleteBlogImage, moveBlogImage, saveBlogImageAlt, setBlogCoverImage } from "../actions";

/**
 * Galerie-Verwaltung eines Beitrags: hochladen, sortieren, Titelbild wählen.
 *
 * Steht bewusst **außerhalb** des Beitragsformulars und speichert sofort. Ein
 * `<form>` im `<form>` gibt es in HTML nicht, und ein Upload, der erst beim
 * Absenden losläuft, müsste die Dateien bis dahin im Browser halten — bei sechs
 * Fotos ein zweistelliger Megabyte-Betrag, der bei jedem Verwerfen verloren
 * geht.
 */
export function BlogImageManager({
    postId,
    images,
}: {
    postId: string;
    images: BlogImageMeta[];
}) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState("");
    const [featureDisabled, setFeatureDisabled] = useState(false);
    // Welche Zeile gerade arbeitet — `useActionForm` kennt nur ein einziges
    // `pending` für das ganze Formular, hier soll aber genau der geklickte Knopf
    // seinen Spinner bekommen und nicht die ganze Galerie einfrieren.
    const [busyKey, setBusyKey] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<string | null>(null);
    const [pendingDelete, setPendingDelete] = useState<BlogImageMeta | null>(null);

    const remaining = MAX_BLOG_IMAGES - images.length;
    const isFull = remaining <= 0;
    const busy = busyKey !== null;

    async function run(
        action: (formData: FormData) => Promise<ActionResult<void>>,
        fields: Record<string, string>,
        key: string,
    ) {
        setError("");
        setBusyKey(key);

        const formData = new FormData();
        formData.set("postId", postId);
        for (const [name, value] of Object.entries(fields)) formData.set(name, value);

        try {
            const result = await action(formData);
            if (result.ok) {
                router.refresh();
            } else if (result.code === "FORBIDDEN") {
                setFeatureDisabled(true);
            } else {
                setError(result.message);
            }
        } finally {
            setBusyKey(null);
        }
    }

    /**
     * Lädt die ausgewählten Dateien nacheinander hoch.
     *
     * Nacheinander und nicht parallel: jedes Bild wird auf dem Server neu
     * kodiert, und sechs gleichzeitige `sharp`-Durchläufe belegen auf einem
     * kleinen Server mehr Speicher als der Rest der Anwendung zusammen.
     */
    async function uploadFiles(fileList: FileList | File[]) {
        const files = Array.from(fileList).slice(0, Math.max(remaining, 0));
        if (files.length === 0) {
            setError(
                isFull
                    ? `Es sind bereits ${MAX_BLOG_IMAGES} Bilder hinterlegt. Lösche zuerst eines.`
                    : "Keine Datei ausgewählt.",
            );
            return;
        }

        setError("");
        const problems: string[] = [];

        for (const [index, file] of files.entries()) {
            setUploadProgress(`Lade ${index + 1} von ${files.length} …`);

            if (file.size > MAX_BLOG_IMAGE_UPLOAD_BYTES) {
                problems.push(
                    `„${file.name}“ ist ${formatBytes(file.size)} groß — erlaubt sind ${formatBytes(
                        MAX_BLOG_IMAGE_UPLOAD_BYTES,
                    )}.`,
                );
                continue;
            }

            const formData = new FormData();
            formData.set("postId", postId);
            formData.set("file", file);

            try {
                const response = await fetch("/api/dashboard/blog/images", {
                    method: "POST",
                    body: formData,
                });
                const payload: { error?: string; code?: string } = await response
                    .json()
                    .catch(() => ({}));

                if (!response.ok) {
                    if (payload.code === "FEATURE_DISABLED") {
                        setFeatureDisabled(true);
                        break;
                    }
                    problems.push(payload.error ?? `„${file.name}“ konnte nicht gespeichert werden.`);
                }
            } catch {
                problems.push(`„${file.name}“ konnte nicht hochgeladen werden.`);
            }
        }

        setUploadProgress(null);
        if (problems.length > 0) setError(problems.join(" "));
        router.refresh();
    }

    function handleDrop(event: React.DragEvent) {
        event.preventDefault();
        if (event.dataTransfer.files.length > 0) void uploadFiles(event.dataTransfer.files);
    }

    return (
        <Card className="p-5 sm:p-6">
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold tracking-tight">Bildergalerie</h2>
                <Badge tone={isFull ? "warning" : "neutral"}>
                    {images.length} von {MAX_BLOG_IMAGES} Bildern
                </Badge>
            </div>
            <p className="mb-4 text-sm text-muted">
                Das erste Bild ist das <strong className="font-semibold">Titelbild</strong> und
                erscheint in der Blog-Übersicht. Dazu kommen bis zu {MAX_BLOG_IMAGES - 1} weitere
                Bilder, die auf der Beitragsseite als Galerie angezeigt werden. Änderungen hier
                werden sofort gespeichert — unabhängig vom Formular oben.
            </p>

            <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
                className="grid gap-3 rounded-xl border border-dashed border-line-strong bg-raised/40 px-4 py-5 text-center"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={BLOG_IMAGE_ACCEPT_ATTRIBUTE}
                    multiple
                    className="hidden"
                    onChange={(event) => {
                        if (event.target.files) void uploadFiles(event.target.files);
                        event.target.value = "";
                    }}
                />
                <Upload size={20} aria-hidden="true" className="mx-auto text-faint" />
                <p className="text-sm text-muted">
                    {isFull
                        ? "Die Galerie ist voll. Lösche ein Bild, um Platz zu schaffen."
                        : `Bilder hierher ziehen oder auswählen — noch ${remaining} möglich, je bis ${formatBytes(
                              MAX_BLOG_IMAGE_UPLOAD_BYTES,
                          )}.`}
                </p>
                <Button
                    type="button"
                    variant="soft"
                    className="mx-auto"
                    disabled={isFull || busy}
                    loading={uploadProgress !== null}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <ImagePlus size={16} aria-hidden="true" />
                    {uploadProgress ?? "Bilder auswählen"}
                </Button>
                <p className="text-xs text-faint">
                    JPEG, PNG, WebP, AVIF oder HEIC. Jedes Bild wird beim Hochladen verkleinert, als
                    WebP neu gespeichert und von EXIF-Daten (z. B. GPS-Standort) befreit.
                </p>
            </div>

            {error && (
                <Callout tone="danger" className="mt-4">
                    {error}
                </Callout>
            )}

            {images.length > 0 && (
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {images.map((image, index) => (
                        <li
                            key={image.id}
                            className="grid gap-3 rounded-xl border border-line bg-raised/30 p-3"
                        >
                            <div className="relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={blogImageUrl(image.id, "thumb")}
                                    alt={image.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-[4/3] w-full rounded-lg border border-line bg-surface object-cover"
                                />
                                {image.isCover && (
                                    <Badge tone="physics" className="absolute top-2 left-2 shadow">
                                        <Star size={12} aria-hidden="true" /> Titelbild
                                    </Badge>
                                )}
                            </div>

                            <div className="grid gap-1">
                                <label
                                    htmlFor={`alt-${image.id}`}
                                    className="text-xs font-semibold text-muted"
                                >
                                    Alternativtext
                                </label>
                                <Input
                                    id={`alt-${image.id}`}
                                    defaultValue={image.alt}
                                    placeholder="Was ist zu sehen? (für Screenreader)"
                                    maxLength={300}
                                    disabled={busy}
                                    className="px-3 py-2 text-sm"
                                    onBlur={(event) => {
                                        const alt = event.target.value.trim();
                                        if (alt === image.alt) return;
                                        void run(
                                            saveBlogImageAlt,
                                            { imageId: image.id, alt },
                                            `alt-${image.id}`,
                                        );
                                    }}
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                {!image.isCover && (
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="soft"
                                        disabled={busy}
                                        loading={busyKey === `cover-${image.id}`}
                                        onClick={() =>
                                            void run(
                                                setBlogCoverImage,
                                                { imageId: image.id },
                                                `cover-${image.id}`,
                                            )
                                        }
                                    >
                                        <Star size={14} aria-hidden="true" /> Als Titelbild
                                    </Button>
                                )}

                                {!image.isCover && (
                                    <>
                                        <IconButton
                                            size="sm"
                                            variant="soft"
                                            aria-label="Bild nach vorne schieben"
                                            disabled={busy || index <= 1}
                                            onClick={() =>
                                                void run(
                                                    moveBlogImage,
                                                    { imageId: image.id, direction: "up" },
                                                    `move-${image.id}`,
                                                )
                                            }
                                        >
                                            <ArrowUp size={15} aria-hidden="true" />
                                        </IconButton>
                                        <IconButton
                                            size="sm"
                                            variant="soft"
                                            aria-label="Bild nach hinten schieben"
                                            disabled={busy || index === images.length - 1}
                                            onClick={() =>
                                                void run(
                                                    moveBlogImage,
                                                    { imageId: image.id, direction: "down" },
                                                    `move-${image.id}`,
                                                )
                                            }
                                        >
                                            <ArrowDown size={15} aria-hidden="true" />
                                        </IconButton>
                                    </>
                                )}

                                <IconButton
                                    size="sm"
                                    variant="soft"
                                    color="danger"
                                    aria-label="Bild löschen"
                                    className="ml-auto"
                                    disabled={busy}
                                    onClick={() => setPendingDelete(image)}
                                >
                                    <Trash2 size={15} aria-hidden="true" />
                                </IconButton>
                            </div>

                            <p className="font-mono text-[0.68rem] text-faint">
                                {image.width}×{image.height} px · {formatBytes(image.byteSize)}
                                {image.fileName ? ` · ${image.fileName}` : ""}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            <Dialog
                open={pendingDelete !== null}
                onClose={() => setPendingDelete(null)}
                title="Bild löschen?"
                size="sm"
            >
                <p className="text-sm leading-relaxed text-muted">
                    Das Bild wird endgültig aus der Datenbank entfernt.
                    {pendingDelete?.isCover &&
                        " Es ist das Titelbild — das nächste Bild rückt automatisch nach."}
                </p>
                <DialogFooter>
                    <Button
                        size="sm"
                        variant="soft"
                        color="neutral"
                        type="button"
                        onClick={() => setPendingDelete(null)}
                    >
                        Abbrechen
                    </Button>
                    <Button
                        size="sm"
                        color="danger"
                        type="button"
                        onClick={() => {
                            const image = pendingDelete;
                            setPendingDelete(null);
                            if (image) {
                                void run(deleteBlogImage, { imageId: image.id }, `delete-${image.id}`);
                            }
                        }}
                    >
                        <Trash2 size={16} aria-hidden="true" /> Endgültig löschen
                    </Button>
                </DialogFooter>
            </Dialog>

            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Blog-Verwaltung"
                onOpenChange={setFeatureDisabled}
            />
        </Card>
    );
}
