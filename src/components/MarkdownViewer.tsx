"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Überschriften im Inhalt rücken eine Ebene tiefer: die Seite trägt ihren
 * Titel bereits als `h1`, und ein `# Überschrift` in einer Terminbeschreibung
 * oder einem Artikel ergäbe sonst eine zweite. Die Schriftgrade in
 * `.markdown-content` sind auf die verschobenen Ebenen abgestimmt.
 */
function headingAs(Tag: "h2" | "h3" | "h4" | "h5" | "h6") {
    return function ShiftedHeading(props: React.ComponentProps<"h1"> & { node?: unknown }) {
        // `node` ist der Syntaxbaum von react-markdown und gehört nicht ins DOM.
        const domProps = { ...props };
        delete domProps.node;
        return <Tag {...domProps} />;
    };
}

const shiftedHeadings: Components = {
    h1: headingAs("h2"),
    h2: headingAs("h3"),
    h3: headingAs("h4"),
    h4: headingAs("h5"),
    h5: headingAs("h6"),
};

export default function MarkdownViewer({ content }: { content: string }) {
    return (
        <div className="markdown-content" style={{ padding: "20px 0" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={shiftedHeadings} skipHtml>
                {content}
            </ReactMarkdown>
        </div>
    );
}
