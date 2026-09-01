import { createChallenge, extractParams, verifySolution } from "altcha-lib/v1";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getAltchaHmacKey } from "./env";

/**
 * How long a minted challenge stays solvable. The challenge is embedded in the
 * page on load, so it must still be valid whenever the user gets around to
 * submitting — but it also bounds how long a spent solution has to be
 * remembered for replay detection.
 */
const CHALLENGE_TTL_MS = 30 * 60 * 1000;

/**
 * Solving cost, expressed as the upper bound of the search space.
 *
 * `interactive` keeps login and registration snappy. `unauthenticated` is an
 * order of magnitude higher and is meant for fully public endpoints, where a
 * second or two of client-side work is invisible to a human but multiplies the
 * cost of bulk submission for a spammer.
 */
export const ALTCHA_COMPLEXITY = {
    interactive: 100_000,
    unauthenticated: 1_000_000,
} as const;

export async function createAltchaChallenge(
    maxNumber: number = ALTCHA_COMPLEXITY.interactive,
) {
    return createChallenge({
        hmacKey: getAltchaHmacKey(),
        maxNumber,
        expires: new Date(Date.now() + CHALLENGE_TTL_MS),
    });
}

/** The signature is the challenge's HMAC — unique per challenge, so it identifies a solution. */
function readSignature(payload: string): string | null {
    try {
        const decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
        const signature = (decoded as { signature?: unknown }).signature;
        return typeof signature === "string" && signature.length > 0 ? signature : null;
    } catch {
        return null;
    }
}

/** Falls back to the full TTL if the payload carries no readable `expires` param. */
function readExpiry(payload: string): Date {
    try {
        const expires = Number(extractParams(payload).expires);
        if (Number.isFinite(expires) && expires > 0) {
            return new Date(expires * 1000);
        }
    } catch {
        // fall through to the default below
    }
    return new Date(Date.now() + CHALLENGE_TTL_MS);
}

/**
 * Marks a verified solution as spent. Returns false if it was already spent.
 *
 * `verifySolution` alone only proves the payload is well-formed and unexpired —
 * it happily accepts the same payload over and over for the challenge's whole
 * validity window. Recording the signature under a primary key makes the second
 * insert fail, so one solve buys exactly one request.
 */
async function consumeAltchaSolution(payload: string): Promise<boolean> {
    const signature = readSignature(payload);
    if (!signature) {
        return false;
    }

    await prisma.solvedAltchaChallenge.deleteMany({
        where: { expiresAt: { lte: new Date() } },
    });

    try {
        await prisma.solvedAltchaChallenge.create({
            data: { signature, expiresAt: readExpiry(payload) },
        });
    } catch (error) {
        // P2002 (unique constraint) is the one error that means "already spent".
        // Anything else — a missing table, a dropped connection — must not be
        // silently reported to the user as a failed captcha.
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return false;
        }
        throw error;
    }

    return true;
}

export async function verifyAltchaPayload(payload: string | null | undefined) {
    if (!payload) {
        return false;
    }

    let solutionValid: boolean;
    try {
        solutionValid = await verifySolution(payload, getAltchaHmacKey());
    } catch {
        // A malformed payload is a legitimate "not verified", not an outage.
        return false;
    }
    if (!solutionValid) {
        return false;
    }

    // Deliberately not wrapped: if the replay store is unreachable, that is an
    // infrastructure fault and should surface as such rather than telling the
    // user their captcha expired.
    return consumeAltchaSolution(payload);
}
