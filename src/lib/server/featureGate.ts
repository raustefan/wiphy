import { redirect } from "next/navigation";
import type { FeatureFlagKey } from "@prisma/client";
import { AppError } from "@/lib/server/errors";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { FEATURE_FLAG_LABELS } from "@/lib/featureFlags";

/** For actions consumed via `executeAction`/`ActionResult` — surfaces as a normal action error. */
export async function requireFeatureEnabled(key: FeatureFlagKey): Promise<void> {
  if (!(await isFeatureEnabled(key))) {
    throw new AppError(
      "FORBIDDEN",
      `${FEATURE_FLAG_LABELS[key]} wurde von einem Administrator deaktiviert.`,
    );
  }
}

/** For plain `<form action>` server actions whose result is never read — redirects with a query flag instead. */
export async function requireFeatureEnabledOrRedirect(
  key: FeatureFlagKey,
  redirectTo: string,
): Promise<void> {
  if (!(await isFeatureEnabled(key))) {
    const separator = redirectTo.includes("?") ? "&" : "?";
    redirect(`${redirectTo}${separator}featureDisabled=${key}`);
  }
}
