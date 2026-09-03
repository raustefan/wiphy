"use client";

import dynamic from "next/dynamic";

/**
 * Die Diffusions-Visualisierung zieht Canvas-Code und Zufallssimulation nach
 * sich; beides wird erst gebraucht, wenn die Seite im Browser steht.
 */
const MarketDiffusion = dynamic(() => import("@/components/MarketDiffusion"), {
    ssr: false,
    loading: () => (
        <div
            aria-hidden="true"
            className="h-64 animate-pulse rounded-2xl border border-line bg-raised/50 sm:h-80"
        />
    ),
});

export default MarketDiffusion;
