"use client";

import dynamic from "next/dynamic";

/** Reine Dekoration, nur im Browser — Bundle erst nach der Hydration laden. */
const GameOfLife = dynamic(() => import("@/components/GameOfLife"), { ssr: false });

export default GameOfLife;
