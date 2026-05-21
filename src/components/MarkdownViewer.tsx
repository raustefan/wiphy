"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownViewer({ content }: { content: string }) {
    return (
        <div className="markdown-content" style={{ padding: "20px 0" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
                {content}
            </ReactMarkdown>
        </div>
    );
}
