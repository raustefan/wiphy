import assert from "node:assert/strict";
import test from "node:test";
import { describeSendError, sendEach } from "../src/lib/server/email/sendReport";

const smtp = (code: string, responseCode?: number) => Object.assign(new Error(code), { code, responseCode });

// Stummschalten: `sendEach` loggt jeden Fehler fürs Server-Log.
test.beforeEach(() => test.mock.method(console, "error", () => {}));

test("sendEach skips a rejected address but aborts on a login error", async () => {
  const outcome: Record<string, Error> = { b: smtp("EENVELOPE", 553), d: smtp("EAUTH", 454) };
  const attempted: string[] = [];
  const result = await sendEach(["a", "b", "c", "d", "e"], async (user) => {
    attempted.push(user);
    if (outcome[user]) throw outcome[user];
  });
  assert.deepEqual(attempted, ["a", "b", "c", "d"]);
  assert.deepEqual(result.sent, ["a", "c"]);
  assert.deepEqual(result.failed, ["b", "d", "e"]);
  assert.match(describeSendError(result.error), /zu vieler Anmeldeversuche/);
});

test("describeSendError recognises Gmail's daily limit", () => {
  const error = Object.assign(new Error(), { responseCode: 550, response: "550 5.4.5 Daily user sending limit exceeded" });
  assert.match(describeSendError(error), /Versandlimit/);
});
