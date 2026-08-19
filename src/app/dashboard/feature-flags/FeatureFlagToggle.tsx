"use client";

import { useState, useTransition } from "react";
import { Switch, Text } from "@radix-ui/themes";
import type { FeatureFlagKey } from "@prisma/client";
import { setFeatureFlag } from "./actions";

type FeatureFlagToggleProps = {
    flagKey: FeatureFlagKey;
    enabled: boolean;
};

export function FeatureFlagToggle({ flagKey, enabled }: FeatureFlagToggleProps) {
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <Switch checked={checked} disabled={isPending} onCheckedChange={handleChange} size="3" />
            {error && (
                <Text size="1" color="red">
                    {error}
                </Text>
            )}
        </div>
    );
}
