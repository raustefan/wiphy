"use client";

import { Editor } from "@tiptap/react";
import { Button, Flex } from "@radix-ui/themes";

interface EmailEditorToolbarProps {
  editor: Editor | null;
}

export function EmailEditorToolbar({ editor }: EmailEditorToolbarProps) {
  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void;
    active: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        padding: "4px 8px",
        border: "1px solid var(--gray-6)",
        borderRadius: "4px",
        backgroundColor: active ? "var(--blue-9)" : "var(--gray-3)",
        color: active ? "white" : "var(--gray-12)",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      {children}
    </button>
  );

  return (
    <div
      style={{
        borderBottom: "1px solid var(--gray-6)",
        padding: "8px",
        display: "flex",
        gap: "4px",
        flexWrap: "wrap",
        backgroundColor: "var(--gray-3)",
        borderRadius: "var(--radius-2) var(--radius-2) 0 0",
      }}
    >
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
      <div style={{ width: "1px", backgroundColor: "var(--gray-6)", margin: "0 4px" }} />
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
      <div style={{ width: "1px", backgroundColor: "var(--gray-6)", margin: "0 4px" }} />
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
      <div style={{ width: "1px", backgroundColor: "var(--gray-6)", margin: "0 4px" }} />
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
