"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";
import { previewMailAction } from "@/lib/server/email/actions";
import { useActionForm } from "@/lib/client/useActionForm";
import { Button, Dialog } from "@/components/ui";

/**
 * „Vorschau“: zeigt die Mail so, wie der Server sie verschicken würde — mit
 * Briefpapier, Signatur und Terminblock. Gerendert wird auf dem Server, damit
 * die Vorschau nicht vom Versand abweichen kann.
 */
export function EmailPreviewButton({
  getFormData,
  size,
}: {
  getFormData: () => FormData;
  size?: "sm" | "md" | "lg";
}) {
  const [html, setHtml] = useState<string | null>(null);
  const form = useActionForm(previewMailAction, {
    onSuccess: (result) => setHtml(result ?? null),
  });

  return (
    <>
      <Button
        size={size}
        variant="outline"
        color="neutral"
        type="button"
        loading={form.pending}
        onClick={() => void form.submit(getFormData())}
      >
        <HugeiconsIcon icon={ViewIcon} size={16} aria-hidden="true" /> Vorschau
      </Button>
      {form.feedback}
      <Dialog
        open={html !== null}
        onClose={() => setHtml(null)}
        title="Vorschau"
        description="So kommt die Mail an. Platzhalter wie $Anrede werden erst beim Versand pro Empfänger ersetzt."
        size="lg"
      >
        {html !== null && (
          // `sandbox` ohne Rechte: keine Skripte, und Links (über `<base>` auf
          // ein neues Fenster gelenkt) öffnen nichts.
          <iframe
            title="Vorschau der E-Mail"
            sandbox=""
            srcDoc={html.replace("<head>", '<head><base target="_blank">')}
            className="h-[65dvh] w-full rounded-[3px] border border-line bg-white"
          />
        )}
      </Dialog>
    </>
  );
}
