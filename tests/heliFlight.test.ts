import assert from "node:assert/strict";
import test from "node:test";
import { CRASH_SPEED, parkedHeli, stepHeli, type Heli, type Stick } from "../src/lib/heliFlight";

const BASE = [826, 228];
const BOUNDS = { left: 0, top: 0, right: 2512, bottom: 1392 };
const DT = 1 / 60;
const IDLE: Stick = { thrust: 0, turn: 0 };

function run(h: Heli, stick: Stick, seconds: number) {
  for (let i = 0; i < seconds / DT; i++) stepHeli(h, stick, DT, BASE, BOUNDS);
}

function airborne() {
  const h = parkedHeli(BASE);
  h.mode = "manual";
  run(h, IDLE, 4);
  return h;
}

test("ohne Klick bleibt er auf der Basis, Tasten allein starten ihn nicht", () => {
  const h = parkedHeli(BASE);
  run(h, { thrust: 1, turn: 1 }, 5);
  assert.deepEqual(h, parkedHeli(BASE));
});

test("nach dem Klick steigt er erst auf und schwebt, bis eine Taste kommt", () => {
  const h = parkedHeli(BASE);
  h.mode = "manual";
  run(h, { thrust: 1, turn: 0 }, 1);
  assert.deepEqual([h.x, h.y], BASE, "am Boden fährt er nicht los");

  const hover = airborne();
  assert.equal(hover.alt, 1);
  assert.deepEqual([hover.x, hover.y], BASE);
});

test("W fliegt vorwärts, S rückwärts, A und D drehen, ohne Taste bremst er", () => {
  const h = airborne();
  run(h, { thrust: 1, turn: 0 }, 1);
  assert.ok(h.x > BASE[0] + 100 && Math.abs(h.y - BASE[1]) < 1e-6);

  const x = h.x;
  run(h, IDLE, 2);
  assert.equal(h.speed, 0);
  const stopped = h.x;
  assert.ok(stopped > x);

  run(h, { thrust: -1, turn: 0 }, 1);
  assert.ok(h.x < stopped);

  run(h, IDLE, 2);
  const heading = h.heading;
  run(h, { thrust: 0, turn: 1 }, 0.5);
  assert.ok(h.heading > heading);
  const turned = h.heading;
  run(h, IDLE, 1);
  run(h, { thrust: 0, turn: -1 }, 0.5);
  assert.ok(h.heading < turned);
});

test("er bleibt beim Steuern im Bild und dreht nie sprunghaft", () => {
  const h = airborne();
  let worst = 0;
  for (let i = 0; i < 3000; i++) {
    const before = h.heading;
    const stick = { thrust: 1, turn: i % 400 < 200 ? 1 : -1 };
    stepHeli(h, stick, DT, BASE, BOUNDS);
    worst = Math.max(worst, Math.abs(h.heading - before));
    assert.ok(h.x >= 0 && h.x <= 2512 && h.y >= 0 && h.y <= 1392);
  }
  assert.ok(worst < 0.04, `${worst} rad pro Bild`);
});

test("von überall zurück landet er genau auf der Basis und parkt", () => {
  for (let i = 0; i < 40; i++) {
    const h = airborne();
    [h.x, h.y, h.heading] = [(i * 397) % 2512, (i * 211) % 1392, i * 0.77];
    h.speed = i % 3 === 0 ? 320 : 0;
    h.mode = "return";
    for (let t = 0; t < 60 && h.mode === "return"; t += DT) stepHeli(h, IDLE, DT, BASE, BOUNDS);
    assert.equal(h.mode, "parked", `Start ${i}`);
    assert.deepEqual([h.x, h.y, h.alt, h.rotor], [...BASE, 0, 0]);
  }
});

test("zurück zur Basis gelingt auch, wenn sie außerhalb des Bildes liegt", () => {
  const h = airborne();
  h.mode = "return";
  [h.x, h.y] = [1500, 700];
  for (let t = 0; t < 60 && h.mode === "return"; t += DT) {
    stepHeli(h, IDLE, DT, BASE, { left: 1200, top: 300, right: 2000, bottom: 1000 });
  }
  assert.equal(h.mode, "parked");
});

test("ein Klick mitten beim Abheben landet sofort wieder", () => {
  const h = parkedHeli(BASE);
  h.mode = "manual";
  run(h, IDLE, 2);
  h.mode = "return";
  run(h, IDLE, 5);
  assert.equal(h.mode, "parked");
});

test("beim Absturz fällt er aus dem Bild und zählt erst dann als abgestürzt", () => {
  const h = airborne();
  [h.x, h.y, h.speed] = [1500, 500, 320];
  h.mode = "crash";
  stepHeli(h, IDLE, DT, BASE, BOUNDS);
  assert.equal(h.mode, "crash");
  assert.ok(h.y > 500);

  const heading = h.heading;
  for (let t = 0; t < 5 && h.mode === "crash"; t += DT) stepHeli(h, { thrust: 1, turn: -1 }, DT, BASE, BOUNDS);
  assert.equal(h.mode, "down");
  assert.ok(h.y > BOUNDS.bottom);
  assert.ok(h.heading > heading, "trudelt, die Tasten wirken nicht mehr");
});

test("langsam und rückwärts bleibt er unter der Absturzgeschwindigkeit", () => {
  const h = airborne();
  run(h, { thrust: -1, turn: 0 }, 3);
  assert.ok(Math.abs(h.speed) < CRASH_SPEED);
  run(h, { thrust: 1, turn: 0 }, 3);
  assert.ok(Math.abs(h.speed) > CRASH_SPEED, "vorwärts wird er schnell genug");
});
