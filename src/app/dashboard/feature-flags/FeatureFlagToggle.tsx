"use client";

import { useState, useTransition } from "react";
import type { FeatureFlagKey } from "@prisma/client";
import { Switch } from "@/components/ui";
import { setFeatureFlag } from "./actions";

type FeatureFlagToggleProps = {
    flagKey: FeatureFlagKey;
    label: string;
    enabled: boolean;
};

export function FeatureFlagToggle({ flagKey, label, enabled }: FeatureFlagToggleProps) {
    const [checked, setChecked] = useState(enabled);
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    function handleChange(next: boolean) {
        const previous = checked;
        setChecked(next);
        setError("");

        startTransition(async () => {
            const formData = new FormData();
            formData.set("key", flagKey);
            formData.set("enabled", String(next));
            const result = await setFeatureFlag(formData);
            if (!result.ok) {
                setChecked(previous);
                setError(result.message);
            }
        });
    }

    return (
        <div className="flex flex-col items-start gap-1 sm:items-end">
            <Switch
                checked={checked}
                disabled={isPending}
                onCheckedChange={handleChange}
                aria-label={`${label} ${checked ? "deaktivieren" : "aktivieren"}`}
            />
            {error && <p className="text-xs text-negative">{error}</p>}
        </div>
    );
}
