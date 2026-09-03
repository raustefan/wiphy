"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { sendDirectMailAction } from "@/lib/server/email/actions";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import { EmailEditorToolbar } from "@/components/EmailEditorToolbar";
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipients: MailRecipient[];
  defaultSubject?: string;
  defaultMessage?: string;
  showBccToSelf?: boolean;
  submitLabel?: string;
  onSuccess?: () => void;
};

export function EmailComposerDialog({
  open,
  onOpenChange,
  recipients,
  defaultSubject = "",
  defaultMessage = "",
  showBccToSelf = true,
  submitLabel = "E-Mail senden",
  onSuccess,
}: EmailComposerDialogProps) {
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState(defaultMessage);
  const [bccToSelf, setBccToSelf] = useState(true);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const wasOpenRef = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-physics underline cursor-pointer",
        },
      }),
    ],
    content: defaultMessage,
    editorProps: {
      attributes: {
        class:
          "max-w-none min-h-[200px] p-4 text-sm leading-relaxed focus:outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_p]:my-2",
      },
    },
  });

  // Reset only when the dialog opens — not when parent props change while open.
  useEffect(() => {
    if (open && !wasOpenRef.current) {
      setSubject(defaultSubject);
      setMessage(defaultMessage);
      setBccToSelf(true);
      setError("");
      setSuccess(false);
      setSentCount(0);
      editor?.commands.setContent(defaultMessage);
    }
    wasOpenRef.current = open;
  }, [open, defaultSubject, defaultMessage, editor]);

  function closeDialog() {
    if (success) onSuccess?.();
    setSuccess(false);
    onOpenChange(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (recipients.length === 0) return;

    setError("");
    setPending(true);
    try {
      const formData = new FormData();
      for (const r of recipients) {
        formData.append("selectedUserIds", r.id);
      }
      formData.set("subject", subject);
      formData.set("message", editor?.getHTML() || message);
      if (bccToSelf) formData.set("bccToSelf", "on");

      const result = await sendDirectMailAction(formData);
      if (!result.ok) {
        setError(result.message);
        return;
      }

      setSentCount(recipients.length);
      setSuccess(true);
    } finally {
      setPending(false);
    }
  }

  /** Abbrechen/Esc/Backdrop — während des Versands bleibt der Dialog offen. */
  function handleClose() {
    if (pending) return;
    closeDialog();
  }

  if (success) {
    return (
      <Dialog open={open} onClose={closeDialog} size="sm">
        <div className="grid justify-items-center gap-3 py-2 text-center">
          <CheckCircle2 size={48} className="text-positive" aria-hidden="true" />
          <h2 className="text-lg font-bold tracking-tight">E-Mail gesendet</h2>
          <p className="text-sm text-muted">
            Die Nachricht wurde an {sentCount} {sentCount === 1 ? "Empfänger" : "Empfänger"}{" "}
            versendet.
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
      open={open}
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

        {error && (
          <p role="alert" className="text-sm text-negative">
            {error}
          </p>
        )}

        <Field label="Betreff" htmlFor="email-composer-subject">
          <Input
            id="email-composer-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </Field>

        <div className="grid gap-1.5">
          <span className="text-sm font-semibold text-foreground">Nachricht</span>
          <p className="text-sm text-faint">
            Verfügbare Platzhalter: $Vorname, $Nachname, $Name
          </p>
          <div className="overflow-hidden rounded-xl border border-line-strong bg-surface">
            <EmailEditorToolbar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </div>

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
          <Button variant="soft" color="neutral" type="button" disabled={pending} onClick={handleClose}>
            Abbrechen
          </Button>
          <div className="grid gap-1 sm:justify-items-end">
            <Button type="submit" loading={pending} disabled={recipients.length === 0}>
              {pending ? "Wird gesendet…" : submitLabel}
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
