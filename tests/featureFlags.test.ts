import assert from "node:assert/strict";
import test from "node:test";
import { FeatureFlagKey } from "@prisma/client";
import { FEATURE_FLAG_ORDER } from "../src/lib/featureFlags";

// Ein Schlüssel ohne Kategorie fehlt auf der Admin-Seite und lässt sich nicht mehr schalten.
test("jeder Feature-Flag steht in genau einer Kategorie", () => {
  assert.deepEqual([...FEATURE_FLAG_ORDER].sort(), Object.values(FeatureFlagKey).sort());
});
