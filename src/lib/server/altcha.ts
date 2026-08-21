import { createChallenge, verifySolution } from "altcha-lib/v1";
import { getAltchaHmacKey } from "./env";

export async function createAltchaChallenge() {
    return createChallenge({
        hmacKey: getAltchaHmacKey(),
        maxNumber: 100_000,
        expires: new Date(Date.now() + 5 * 60 * 1000),
    });
}

export async function verifyAltchaPayload(payload: string | null | undefined) {
    if (!payload) {
        return false;
    }
    try {
        return await verifySolution(payload, getAltchaHmacKey());
    } catch {
        return false;
    }
}
