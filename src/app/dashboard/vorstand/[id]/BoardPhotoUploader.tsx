"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Trash2, Upload, Users } from "lucide-react";
import { Button, Callout, Card, Dialog, DialogFooter } from "@/components/ui";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
import {
    BOARD_PHOTO_ACCEPT_ATTRIBUTE,
    MAX_BOARD_PHOTO_UPLOAD_BYTES,
    boardPhotoUrl,
    formatBytes,
} from "@/lib/boardImages";
import { deletePhotoAction } from "../actions";

type PhotoMeta = { id: string; width: number; height: number; byteSize: number };

/**
 * Verwaltet das eine Profilfoto eines Vorstandsmitglieds. Vereinfachte Version
 * von `BlogImageManager`: kein Reorder, kein Titelbild, keine Galerie — nur
 * hochladen, ersetzen, löschen.
 */
export function BoardPhotoUploader({
    memberId,
    photo,
}: {
    memberId: string;
    photo: PhotoMeta | null;
}) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState("");
    const [featureDisabled, setFeatureDisabled] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    async function uploadFile(file: File) {
        setError("");

        if (file.size > MAX_BOARD_PHOTO_UPLOAD_BYTES) {
            setError(
                `„${file.name}“ ist ${formatBytes(file.size)} groß — erlaubt sind ${formatBytes(
                    MAX_BOARD_PHOTO_UPLOAD_BYTES,
                )}.`,
            );
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.set("memberId", memberId);
        formData.set("file", file);

        try {
            const response = await fetch("/api/dashboard/vorstand/photo", {
                method: "POST",
                body: formData,
            });
            const payload: { error?: string; code?: string } = await response
                .json()
                .catch(() => ({}));

            if (!response.ok) {
                if (payload.code === "FEATURE_DISABLED") {
                    setFeatureDisabled(true);
                } else {
                    setError(payload.error ?? `„${file.name}“ konnte nicht gespeichert werden.`);
                }
                return;
            }
            router.refresh();
        } catch {
            setError(`„${file.name}“ konnte nicht hochgeladen werden.`);
        } finally {
            setUploading(false);
        }
    }

    function handleDrop(event: React.DragEvent) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) void uploadFile(file);
    }

    async function handleDelete() {
        setConfirmDelete(false);
        setDeleting(true);
        setError("");

        const formData = new FormData();
        formData.set("id", memberId);

        try {
            const result = await deletePhotoAction(formData);
            if (result.ok) {
                router.refresh();
            } else if (result.code === "FORBIDDEN") {
                setFeatureDisabled(true);
            } else {
                setError(result.message);
            }
        } finally {
            setDeleting(false);
        }
    }

    return (
        <Card className="p-5 sm:p-6">
            <h2 className="mb-1 text-lg font-bold tracking-tight">Profilfoto</h2>
            <p className="mb-4 text-sm text-muted">
                Erscheint als rundes Avatarbild auf /vorstand. Ohne Foto zeigt die Seite
                stattdessen die Initialen. Änderungen hier werden sofort gespeichert —
                unabhängig vom Formular oben.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={boardPhotoUrl(photo.id)}
                        alt=""
                        className="size-24 shrink-0 rounded-full border border-line object-cover"
                    />
                ) : (
                    <span className="grid size-24 shrink-0 place-items-center rounded-full border border-dashed border-line text-faint">
                        <Users size={28} aria-hidden="true" />
                    </span>
                )}

                <div
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleDrop}
                    className="grid flex-1 gap-3 rounded-xl border border-dashed border-line-strong bg-raised/40 px-4 py-5 text-center"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={BOARD_PHOTO_ACCEPT_ATTRIBUTE}
                        className="hidden"
                        onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) void uploadFile(file);
                            event.target.value = "";
                        }}
                    />
                    <Upload size={20} aria-hidden="true" className="mx-auto text-faint" />
                    <p className="text-sm text-muted">
                        Foto hierher ziehen oder auswählen — bis zu {formatBytes(
                            MAX_BOARD_PHOTO_UPLOAD_BYTES,
                        )}.
                    </p>
                    <div className="mx-auto flex flex-wrap justify-center gap-2">
                        <Button
                            type="button"
                            variant="soft"
                            disabled={uploading || deleting}
                            loading={uploading}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <ImagePlus size={16} aria-hidden="true" />
                            {photo ? "Foto ersetzen" : "Foto auswählen"}
                        </Button>
                        {photo && (
                            <Button
                                type="button"
                                variant="soft"
                                color="danger"
                                disabled={uploading || deleting}
                                loading={deleting}
                                onClick={() => setConfirmDelete(true)}
                            >
                                <Trash2 size={16} aria-hidden="true" /> Foto entfernen
                            </Button>
                        )}
                    </div>
                    <p className="text-xs text-faint">
                        JPEG, PNG, WebP, AVIF oder HEIC. Wird beim Hochladen quadratisch
                        zugeschnitten, als WebP neu gespeichert und von EXIF-Daten (z. B.
                        GPS-Standort) befreit.
                    </p>
                    {photo && (
                        <p className="font-mono text-[0.68rem] text-faint">
                            {photo.width}×{photo.height} px · {formatBytes(photo.byteSize)}
                        </p>
                    )}
                </div>
            </div>

            {error && (
                <Callout tone="danger" className="mt-4">
                    {error}
                </Callout>
            )}

            <Dialog
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                title="Foto entfernen?"
                size="sm"
            >
                <p className="text-sm leading-relaxed text-muted">
                    Das Foto wird endgültig aus der Datenbank entfernt. Die Seite zeigt
                    danach wieder die Initialen.
                </p>
                <DialogFooter>
                    <Button
                        size="sm"
                        variant="soft"
                        color="neutral"
                        type="button"
                        onClick={() => setConfirmDelete(false)}
                    >
                        Abbrechen
                    </Button>
                    <Button size="sm" color="danger" type="button" onClick={() => void handleDelete()}>
                        <Trash2 size={16} aria-hidden="true" /> Endgültig entfernen
                    </Button>
                </DialogFooter>
            </Dialog>

            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Vorstands-Verwaltung"
                onOpenChange={setFeatureDisabled}
            />
        </Card>
    );
}
