"use client";

import { Editor } from "@tiptap/react";
import { cn } from "@/lib/cn";

interface EmailEditorToolbarProps {
  editor: Editor | null;
}

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={cn(
        "min-h-8 cursor-pointer rounded-md border border-line-strong px-2 py-1 text-sm transition-colors",
        active
          ? "border-physics bg-physics font-bold text-on-physics"
          : "bg-surface text-foreground hover:bg-raised",
      )}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div aria-hidden="true" className="mx-1 w-px self-stretch bg-line" />;
}

export function EmailEditorToolbar({ editor }: EmailEditorToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-xl border-b border-line bg-raised/60 p-2">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        title="Fett"
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        title="Kursiv"
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
        title="Durchgestrichen"
      >
        <s>S</s>
      </ToolbarButton>
      <ToolbarDivider />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        title="Aufzählungsliste"
      >
        •
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        title="Nummerierte Liste"
      >
        1.
      </ToolbarButton>
      <ToolbarDivider />
      <ToolbarButton
        onClick={() => {
          const url = window.prompt("Link URL eingeben:");
          if (!url) return;
          const trimmed = url.trim();
          const isSafe = /^(https?:|mailto:)/i.test(trimmed);
          if (!isSafe) {
            window.alert("Nur http(s)- oder mailto-Links sind erlaubt.");
            return;
          }
          editor.chain().focus().setLink({ href: trimmed }).run();
        }}
        active={editor.isActive("link")}
        title="Link einfügen"
      >
        🔗
      </ToolbarButton>
      {editor.isActive("link") && (
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          active={false}
          title="Link entfernen"
        >
          Link entfernen
        </ToolbarButton>
      )}
      <ToolbarDivider />
      <ToolbarButton
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        active={false}
        title="Formatierung entfernen"
      >
        Formatierung entfernen
      </ToolbarButton>
    </div>
  );
}
