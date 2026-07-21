"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  Button,
  Flex,
  Text,
  TextField,
  Box,
} from "@radix-ui/themes";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { sendDirectMailAction } from "@/lib/server/email/actions";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import { EmailEditorToolbar } from "@/components/EmailEditorToolbar";

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
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
    ],
    content: defaultMessage,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1",
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

  function handleOpenChange(next: boolean) {
    if (pending) return;
    if (!next) {
      if (success) onSuccess?.();
      setSuccess(false);
    }
    onOpenChange(next);
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={handleOpenChange}>
      <AlertDialog.Content maxWidth="520px">
        {success ? (
          <Flex direction="column" align="center" gap="3" py="4">
            <CheckCircledIcon
              width={56}
              height={56}
              color="var(--green-9)"
              aria-hidden
            />
            <AlertDialog.Title mb="0">E-Mail gesendet</AlertDialog.Title>
            <AlertDialog.Description size="2" align="center" mb="0">
              Die Nachricht wurde an {sentCount}{" "}
              {sentCount === 1 ? "Empfänger" : "Empfänger"} versendet.
            </AlertDialog.Description>
            <Flex justify="center" mt="2" width="100%">
              <AlertDialog.Action>
                <Button onClick={closeDialog}>Schließen</Button>
              </AlertDialog.Action>
            </Flex>
          </Flex>
        ) : (
          <form onSubmit={handleSubmit}>
            <AlertDialog.Title>{submitLabel}</AlertDialog.Title>
            <AlertDialog.Description size="2" mb="3">
              {recipients.length === 0
                ? "Keine Empfänger ausgewählt."
                : `${recipients.length} ${recipients.length === 1 ? "Empfänger" : "Empfänger"}`}
            </AlertDialog.Description>

            {recipients.length > 0 && (
              <Box
                mb="3"
                p="2"
                style={{
                  maxHeight: 120,
                  overflowY: "auto",
                  borderRadius: "var(--radius-2)",
                  backgroundColor: "var(--gray-3)",
                }}
              >
                <Flex direction="column" gap="1">
                  {recipients.map((r) => (
                    <Flex key={r.id} direction="column" gap="0">
                      <Text size="2" weight="medium">
                        {r.name || "—"}
                      </Text>
                      <Text size="1" color="gray">
                        {r.email}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Box>
            )}

            {error && (
              <Text size="2" color="red" mb="2" role="alert">
                {error}
              </Text>
            )}

            <Flex direction="column" gap="3" mb="4">
              <label>
                <Text size="2" weight="bold">
                  Betreff
                </Text>
                <TextField.Root
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  mt="1"
                />
              </label>
              <label>
                <Text size="2" weight="bold">
                  Nachricht
                </Text>
                <Text size="1" color="gray" mb="2">
                  Verfügbare Platzhalter: $Vorname, $Nachname, $Name
                </Text>
                <Box mt="1">
                  <Box
                    style={{
                      border: "1px solid var(--gray-6)",
                      borderRadius: "var(--radius-2)",
                      minHeight: "200px",
                    }}
                  >
                    <EmailEditorToolbar editor={editor} />
                    <EditorContent editor={editor} />
                  </Box>
                </Box>
              </label>
              {showBccToSelf && (
                <Flex align="center" gap="2">
                  <input
                    type="checkbox"
                    id="email-composer-bcc-self"
                    checked={bccToSelf}
                    onChange={(e) => setBccToSelf(e.target.checked)}
                    style={{
                      width: 18,
                      height: 18,
                      cursor: "pointer",
                      accentColor: "var(--accent-9)",
                    }}
                  />
                  <Text
                    size="2"
                    as="label"
                    htmlFor="email-composer-bcc-self"
                    style={{ cursor: "pointer" }}
                  >
                    BCC an mich
                  </Text>
                </Flex>
              )}
            </Flex>

            <Flex gap="3" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray" type="button" disabled={pending}>
                  Abbrechen
                </Button>
              </AlertDialog.Cancel>
              <Flex direction="column" align="end" gap="1">
                <Button
                  type="submit"
                  color="blue"
                  disabled={pending || recipients.length === 0}
                >
                  {pending ? "Wird gesendet…" : submitLabel}
                </Button>
                <Text size="1" color="gray">
                  E-Mail an {recipients.length} {recipients.length === 1 ? "Person" : "Personen"} senden
                </Text>
              </Flex>
            </Flex>
          </form>
        )}
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
