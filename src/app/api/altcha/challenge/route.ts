import { NextResponse } from "next/server";
import { createAltchaChallenge } from "@/lib/server/altcha";

export async function GET() {
    const challenge = await createAltchaChallenge();
    return NextResponse.json(challenge, {
        headers: { "Cache-Control": "no-store" },
    });
}
