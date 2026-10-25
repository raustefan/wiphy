import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { FeatureFlagKey } from "@prisma/client";
import {
  FEATURE_FLAG_DESCRIPTIONS,
  FEATURE_FLAG_LABELS,
  FEATURE_FLAG_ORDER,
  PAGE_FLAGS,
} from "@/lib/featureFlags";

export type FeatureFlagWithMeta = {
  key: FeatureFlagKey;
  label: string;
  description: string;
  enabled: boolean;
};

// Flags default to enabled when no row exists yet, so a fresh deployment
// behaves exactly like the app did before feature flags existed.
export async function getAllFeatureFlags(): Promise<FeatureFlagWithMeta[]> {
  const rows = await prisma.featureFlag.findMany();
  const enabledByKey = new Map(rows.map((r) => [r.key, r.enabled]));

  return FEATURE_FLAG_ORDER.map((key) => ({
    key,
    label: FEATURE_FLAG_LABELS[key],
    description: FEATURE_FLAG_DESCRIPTIONS[key],
    enabled: enabledByKey.get(key) ?? true,
  }));
}

export async function isFeatureEnabled(key: FeatureFlagKey): Promise<boolean> {
  const row = await prisma.featureFlag.findUnique({ where: { key } });
  return row?.enabled ?? true;
}

/** Pfade aus `PAGE_FLAGS`, die gerade abgeschaltet sind — pro Request nur eine Abfrage für Header, Footer und Startseite. */
export const getDisabledPages = cache(async (): Promise<string[]> => {
  const rows = await prisma.featureFlag.findMany({
    where: { key: { in: Object.values(PAGE_FLAGS) }, enabled: false },
  });
  const disabled = new Set<FeatureFlagKey>(rows.map((r) => r.key));
  return Object.entries(PAGE_FLAGS)
    .filter(([, key]) => disabled.has(key))
    .map(([path]) => path);
});

export async function setFeatureFlagEnabled(key: FeatureFlagKey, enabled: boolean): Promise<void> {
  await prisma.featureFlag.upsert({
    where: { key },
    update: { enabled },
    create: { key, enabled },
  });
}
