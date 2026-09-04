"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { sendDirectMailAction } from "@/lib/server/email/actions";
import { EmailBodyField, useEmailEditor } from "@/components/EmailBodyField";
import { useActionForm } from "@/lib/client/useActionForm";
import {
  Button,
  Checkbox,
  Dialog,
  DialogFooter,
  Field,
  Input,
} from "@/components/ui";

export type MailRecipient = {
  id: string;
  name: string | null;
  email: string;
};

type EmailComposerDialogProps = {
  onClose: () => void;
  recipients: MailRecipient[];
  defaultSubject?: string;
  defaultMessage?: string;
  showBccToSelf?: boolean;
  submitLabel?: string;
  onSuccess?: () => void;
};

/**
 * Mail an ausgewählte Empfänger verfassen.
 *
 * Wird nur gerendert, solange der Dialog offen sein soll — dadurch startet jeder
 * Aufruf mit leerem Formular, ohne dass die Komponente ihren eigenen Zustand
 * beim Öffnen von Hand zurücksetzen muss.
 */
export function EmailComposerDialog({
  onClose,
  recipients,
  defaultSubject = "",
  defaultMessage = "",
  showBccToSelf = true,
  submitLabel = "E-Mail senden",
  onSuccess,
}: EmailComposerDialogProps) {
  const [subject, setSubject] = useState(defaultSubject);
  const [bccToSelf, setBccToSelf] = useState(true);
  const [success, setSuccess] = useState(false);

  const form = useActionForm(sendDirectMailAction, {
    featureLabel: "Mailversand",
    onSuccess: () => setSuccess(true),
  });

  const editor = useEmailEditor({ content: defaultMessage });

  function closeDialog() {
    if (success) onSuccess?.();
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (recipients.length === 0) return;

    const formData = new FormData();
    for (const r of recipients) {
      formData.append("selectedUserIds", r.id);
    }
    formData.set("subject", subject);
    formData.set("message", editor?.getHTML() ?? defaultMessage);
    if (bccToSelf) formData.set("bccToSelf", "on");

    void form.submit(formData);
  }

  /** Abbrechen/Esc/Backdrop — während des Versands bleibt der Dialog offen. */
  function handleClose() {
    if (form.pending) return;
    closeDialog();
  }

  if (success) {
    return (
      <Dialog open onClose={closeDialog} size="sm">
        <div className="grid justify-items-center gap-3 py-2 text-center">
          <CheckCircle2 size={48} className="text-positive" aria-hidden="true" />
          <h2 className="text-lg font-bold tracking-tight">E-Mail gesendet</h2>
          <p className="text-sm text-muted">
            Die Nachricht wurde an {recipients.length}{" "}
            {recipients.length === 1 ? "Empfänger" : "Empfänger"} versendet.
          </p>
          <Button className="mt-2" onClick={closeDialog}>
            Schließen
          </Button>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog
      open
      onClose={handleClose}
      title={submitLabel}
      description={
        recipients.length === 0
          ? "Keine Empfänger ausgewählt."
          : `${recipients.length} ${recipients.length === 1 ? "Empfänger" : "Empfänger"}`
      }
      size="lg"
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        {recipients.length > 0 && (
          <div className="grid max-h-32 gap-1 overflow-y-auto rounded-xl bg-raised p-3">
            {recipients.map((r) => (
              <div key={r.id}>
                <p className="text-sm font-medium">{r.name || "—"}</p>
                <p className="text-xs text-muted">{r.email}</p>
              </div>
            ))}
          </div>
        )}

        {form.feedback}

        <Field label="Betreff" htmlFor="email-composer-subject">
          <Input
            id="email-composer-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </Field>

        <EmailBodyField editor={editor} />

        {showBccToSelf && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="email-composer-bcc-self"
              checked={bccToSelf}
              onChange={(e) => setBccToSelf(e.target.checked)}
            />
            <label
              htmlFor="email-composer-bcc-self"
              className="cursor-pointer text-sm text-foreground"
            >
              BCC an mich
            </label>
          </div>
        )}

        <DialogFooter className="sm:items-end">
          <Button variant="soft" color="neutral" type="button" disabled={form.pending} onClick={handleClose}>
            Abbrechen
          </Button>
          <div className="grid gap-1 sm:justify-items-end">
            <Button type="submit" loading={form.pending} disabled={recipients.length === 0}>
              {form.pending ? "Wird gesendet…" : submitLabel}
            </Button>
            <p className="text-xs text-faint">
              E-Mail an {recipients.length} {recipients.length === 1 ? "Person" : "Personen"}{" "}
              senden
            </p>
          </div>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
