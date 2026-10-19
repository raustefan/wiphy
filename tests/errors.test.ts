import assert from "node:assert/strict";
import test from "node:test";
import { z } from "zod";
import { executeAction } from "../src/lib/server/errors";

// Server-Aktionen verlassen sich darauf: `schema.parse()` statt eigener
// safeParse-Weiche, die erste Zod-Meldung landet trotzdem beim Client.
test("executeAction turns a ZodError into its first issue message", async () => {
  const schema = z.object({ id: z.string().min(1, "Ungültige ID.") });
  const result = await executeAction(async () => schema.parse({ id: "" }));
  assert.deepEqual(result, { ok: false, code: "VALIDATION_ERROR", message: "Ungültige ID." });
});
