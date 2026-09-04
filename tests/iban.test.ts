import assert from "node:assert/strict";
import test from "node:test";
import { formatIban, isValidBic, isValidIban, maskIban, normalizeIban } from "../src/lib/iban";

test("accepts a valid German IBAN regardless of spacing and case", () => {
  assert.ok(isValidIban("DE89 3704 0044 0532 0130 00"));
  assert.ok(isValidIban("de89370400440532013000"));
});

test("rejects a transposed digit", () => {
  // Same IBAN as above with two digits swapped — the checksum must catch it.
  assert.equal(isValidIban("DE89 3704 0044 0532 0131 00"), false);
});

test("rejects a correct checksum with the wrong length for its country", () => {
  assert.equal(isValidIban("DE8937040044053201300"), false);
});

test("rejects unknown country codes and malformed input", () => {
  assert.equal(isValidIban("XX89370400440532013000"), false);
  assert.equal(isValidIban("370400440532013000"), false);
  assert.equal(isValidIban(""), false);
});

test("accepts other SEPA countries", () => {
  assert.ok(isValidIban("AT61 1904 3002 3457 3201"));
  assert.ok(isValidIban("NL91ABNA0417164300"));
});

test("normalizes and formats in groups of four", () => {
  assert.equal(normalizeIban(" de89-3704 0044 0532 0130 00 "), "DE89370400440532013000");
  assert.equal(formatIban("DE89370400440532013000"), "DE89 3704 0044 0532 0130 00");
});

test("masking keeps only the country prefix and the last four digits", () => {
  const masked = maskIban("DE89370400440532013000");
  assert.equal(masked, "DE89 •••• 3000");
  assert.ok(!masked.includes("3704"));
});

test("BIC accepts 8 and 11 characters, rejects other lengths", () => {
  assert.ok(isValidBic("COBADEFF"));
  assert.ok(isValidBic("COBADEFFXXX"));
  assert.equal(isValidBic("COBADEF"), false);
  assert.equal(isValidBic("COBADEFFXX"), false);
});
