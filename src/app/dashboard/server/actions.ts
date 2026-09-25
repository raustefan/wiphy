"use server";

import { requireAdmin } from "@/lib/server/authz";
import { executeAction } from "@/lib/server/errors";
import { startDeploy } from "@/lib/server/serverStatus";

export async function triggerDeploy() {
    return executeAction(async () => {
        await requireAdmin();
        await startDeploy();
    });
}
