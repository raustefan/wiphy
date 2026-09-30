import test from "node:test";
import assert from "node:assert/strict";
import { internalPath } from "../src/lib/internalPath";

test("internalPath keeps same-site paths", () => {
    assert.equal(internalPath("/dashboard"), "/dashboard");
    assert.equal(internalPath("/a/b?x=1#h"), "/a/b?x=1#h");
});

test("internalPath rejects anything that leaves the site", () => {
    for (const bad of [undefined, "", "https://evil.example", "//evil.example", "/\\evil.example", "/\t/evil.example", "/\\\\evil.example/x", "dashboard"]) {
        assert.equal(internalPath(bad), null, String(bad));
    }
});
