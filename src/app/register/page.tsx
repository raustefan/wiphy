import { createAltchaChallenge } from "@/lib/server/altcha";
import { RegisterForm } from "./RegisterForm";

// A fresh challenge must be minted on every request, never cached.
export const dynamic = "force-dynamic";

export default async function RegisterPage() {
    // Generate the ALTCHA challenge on the server and embed it directly in the
    // page. The widget solves it locally with no extra network request, so
    // there's no challenge endpoint that can fail or return the wrong content.
    const challenge = await createAltchaChallenge();

    return <RegisterForm challengeJson={JSON.stringify(challenge)} />;
}
