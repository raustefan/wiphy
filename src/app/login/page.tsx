import { createAltchaChallenge } from "@/lib/server/altcha";
import { LoginForm } from "./LoginForm";

// A fresh challenge must be minted on every request, never cached.
export const dynamic = "force-dynamic";

export default async function LoginPage() {
    // Generate the ALTCHA challenge on the server and embed it directly in the
    // page, exactly like the registration form does — the widget solves it
    // locally, so there's no challenge endpoint that can fail.
    const challenge = await createAltchaChallenge();

    return <LoginForm challengeJson={JSON.stringify(challenge)} />;
}
