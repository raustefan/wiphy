"use client";

import "@uiw/react-markdown-preview/markdown.css";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function MarkdownViewer({ content }: { content: string }) {
    return (
        <div data-color-mode="light" style={{ padding: "20px 0" }}>
            <MarkdownPreview
                source={content}
                style={{ backgroundColor: "transparent", color: "inherit" }}
            />
        </div>
    );
}