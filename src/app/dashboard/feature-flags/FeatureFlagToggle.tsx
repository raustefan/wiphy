"use client";

import { useState } from "react";
import type { FeatureFlagKey } from "@prisma/client";
import { Switch } from "@/components/ui";
import { useActionForm } from "@/lib/client/useActionForm";
import { setFeatureFlag } from "./actions";

type FeatureFlagToggleProps = {
    flagKey: FeatureFlagKey;
    label: string;
    enabled: boolean;
};

export function FeatureFlagToggle({ flagKey, label, enabled }: FeatureFlagToggleProps) {
    const [checked, setChecked] = useState(enabled);
    // Der Schalter springt sofort um und wird zurückgedreht, falls der Server ablehnt.
    const form = useActionForm(setFeatureFlag, {
        onError: () => setChecked((current) => !current),
    });

    function handleChange(next: boolean) {
        setChecked(next);
        void form.run({ key: flagKey, enabled: String(next) });
    }

    return (
        <div className="flex flex-col items-start gap-1 sm:items-end">
            <Switch
                checked={checked}
                disabled={form.pending}
                onCheckedChange={handleChange}
                aria-label={`${label} ${checked ? "deaktivieren" : "aktivieren"}`}
            />
            {form.error && <p className="text-xs text-negative">{form.error}</p>}
        </div>
    );
}
