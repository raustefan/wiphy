"use client";

import dynamic from "next/dynamic";

/**
 * Das Wellenfeld ist reine Dekoration und lebt ausschließlich im Browser — es
 * serverseitig zu rendern brächte nichts, also wird das Canvas-Bundle erst
 * nach der Hydration nachgeladen.
 */
const InterferenceField = dynamic(() => import("@/components/InterferenceField"), {
    ssr: false,
    loading: () => <div aria-hidden="true" className="absolute inset-0" />,
});

export default InterferenceField;
