import { requireAdmin } from "@/lib/server/authz";
import { MailDashboard } from "./MailDashboard";

export default async function MailDashboardPage() {
    // The composer is a client component, so without this gate the whole admin
    // mail UI rendered for anyone who knew the URL — including logged-out
    // visitors. The send actions were already protected; this stops the page
    // itself from being reachable.
    await requireAdmin();

    return <MailDashboard />;
}
