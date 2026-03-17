"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// WICHTIG: SSR deaktivieren, da der Editor Browser-APIs nutzt
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function MarkdownEditor({ initialValue = "" }: { initialValue?: string }) {
    const [value, setValue] = useState(initialValue);

    return (
        <div data-color-mode="light">
            {/* Dieses unsichtbare Feld schickt den Markdown-Text an die Server-Action */}
            <input type="hidden" name="content" value={value} />

            <MDEditor
                value={value}
                onChange={(val) => setValue(val || "")}
                height={400}
            />
        </div>
    );
}