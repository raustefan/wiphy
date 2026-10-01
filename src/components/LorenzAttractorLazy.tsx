"use client";

import dynamic from "next/dynamic";

/** Reine Dekoration, nur im Browser — Bundle erst nach der Hydration laden. */
const LorenzAttractor = dynamic(() => import("@/components/LorenzAttractor"), {
    ssr: false,
    loading: () => <div aria-hidden="true" className="absolute inset-0" />,
});

export default LorenzAttractor;
