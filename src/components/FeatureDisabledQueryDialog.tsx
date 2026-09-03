"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
import { FEATURE_FLAG_LABELS, isFeatureFlagKey } from "@/lib/featureFlags";

/**
 * Shows the FeatureDisabledDialog when the current URL carries a
 * `?featureDisabled=<KEY>` query param (set by server actions/pages that
 * redirect instead of returning a readable action result).
 */
export function FeatureDisabledQueryDialog() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const rawKey = searchParams.get("featureDisabled");
    // Der Query-Parameter ist die einzige Quelle der Wahrheit: Schließen
    // entfernt ihn aus der URL, wodurch der Dialog von selbst verschwindet.
    const open = rawKey != null;

    function handleOpenChange(next: boolean) {
        if (!next) {
            router.replace(pathname);
        }
    }

    const label = rawKey && isFeatureFlagKey(rawKey) ? FEATURE_FLAG_LABELS[rawKey] : undefined;

    return <FeatureDisabledDialog open={open} featureLabel={label} onOpenChange={handleOpenChange} />;
}
