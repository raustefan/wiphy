"use client";

import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import { EmailEditorToolbar } from "@/components/EmailEditorToolbar";

/**
 * Der Rich-Text-Editor für Mails — Konfiguration und Darstellung.
 *
 * Rundmail-Formular und Composer-Dialog hatten beide dieselbe Tiptap-Einrichtung
 * samt Werkzeugleiste und Platzhalter-Hinweis wörtlich stehen; sie
 * unterschieden sich nur in der Mindesthöhe des Textfelds.
 */
export function useEmailEditor({
  content = "",
  minHeight = 200,
}: { content?: string; minHeight?: number } = {}) {
  return useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-physics underline cursor-pointer" },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `max-w-none p-4 text-sm leading-relaxed focus:outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_p]:my-2`,
        style: `min-height:${minHeight}px`,
      },
    },
  });
}

export function EmailBodyField({ editor }: { editor: Editor | null }) {
  return (
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
  );
}
