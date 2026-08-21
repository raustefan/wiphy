import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "altcha-widget": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
                challenge?: string;
                name?: string;
                auto?: string;
                theme?: string;
                language?: string;
            };
        }
    }
}

export {};
