import test from "node:test";
import assert from "node:assert/strict";
import { distanceToBody, massFromArea, RESTITUTION, stepBodies, wake, type Body } from "../src/lib/gravityPhysics";

const box = (x: number, y: number, extra: Partial<Body> = {}): Body => ({
  x, y, vx: 0, vy: 0, angle: 0, vAngle: 0, w: 100, h: 50, mass: 1, dragging: false, ...extra,
});
const bounds = { top: 0, bottom: 1000, width: 1000 };
const settle = (bodies: Body[], seconds: number) => {
  for (let t = 0; t < seconds; t += 1 / 60) stepBodies(bodies, { gx: 0, gy: 1200 }, bounds, 1 / 60);
};

test("Boden reflektiert mit Restitution und meldet hörbaren Stoß", () => {
  const b = box(0, 949, { vy: 800 });
  const impacts = stepBodies([b], { gx: 0, gy: 0 }, bounds, 1 / 60);
  assert.ok(b.y <= 950);
  assert.ok(b.vy < 0 && Math.abs(Math.abs(b.vy) - 800 * RESTITUTION) < 10, `prallt ab (${b.vy})`);
  assert.equal(impacts.length, 1);
  assert.ok(Math.abs(b.vAngle) < 0.01, "flach gelandet heißt: kein Drall");
});

test("Decke liegt bei bounds.top (Bildschirm-Modus auf dem Handy)", () => {
  const b = box(0, 505, { vy: -600 });
  stepBodies([b], { gx: 0, gy: 0 }, { top: 500, bottom: 1000, width: 1000 }, 1 / 60);
  assert.ok(b.y >= 499.5);
  assert.ok(b.vy > 0);
});

test("Kacheln stapeln sich statt sich zu durchdringen", () => {
  const bottom = box(0, 900);
  const top = box(20, 0);
  settle([bottom, top], 5);
  assert.ok(Math.abs(bottom.y - 950) < 1.5, `untere liegt am Boden (${bottom.y})`);
  assert.ok(Math.abs(top.y + top.h - bottom.y) < 2, `obere liegt auf der unteren (${top.y})`);
  assert.ok(Math.abs(top.angle) < 0.05 && Math.abs(bottom.angle) < 0.05, "Stapel bleibt gerade");
});

test("Schief gelandete Kachel kippt auf eine Seite und bleibt dort liegen", () => {
  const b = box(400, 700, { angle: 0.5 });
  settle([b], 6);
  const offFlat = Math.abs(Math.sin(2 * b.angle)); // 0 bei 0, ±90°, 180°
  assert.ok(offFlat < 0.05, `liegt flach (angle ${b.angle})`);
  assert.ok(Math.abs(b.angle) > 0.01 || Math.abs(b.vAngle) < 0.1, "hat sich bewegt oder liegt ruhig");
  assert.ok(Math.abs(b.vAngle) < 0.1 && Math.abs(b.vy) < 30, "kommt zur Ruhe");
});

test("Treffer auf die Kante einer anderen Kachel versetzt in Drehung", () => {
  const bottom = box(0, 950);
  const top = box(75, 800, { vy: 600 });
  let maxSpin = 0;
  for (let t = 0; t < 1; t += 1 / 60) {
    stepBodies([bottom, top], { gx: 0, gy: 1200 }, bounds, 1 / 60);
    maxSpin = Math.max(maxSpin, Math.abs(top.vAngle));
  }
  assert.ok(maxSpin > 1, `dreht sich (max ${maxSpin.toFixed(2)} rad/s)`);
});

test("Gezogene Kachel schiebt andere, wird selbst aber nicht verschoben", () => {
  const held = box(0, 500, { dragging: true });
  const other = box(90, 500, { vx: -300 });
  stepBodies([held, other], { gx: 0, gy: 0 }, bounds, 1 / 60);
  assert.equal(held.x, 0);
  assert.ok(other.x >= 99);
  assert.ok(other.vx > 0);
});

test("Ruhender Stapel schläft ein und steht dann still; Anstoßen weckt ihn", () => {
  const bottom = box(0, 900);
  const top = box(20, 700);
  settle([bottom, top], 4);
  assert.ok(bottom.sleeping && top.sleeping, "beide schlafen");
  const frozen = [top.x, top.y, top.angle];
  settle([bottom, top], 1);
  assert.deepEqual([top.x, top.y, top.angle], frozen, "kein Zittern mehr");

  const thrown = box(300, 920, { vx: -900, h: 30 });
  for (let t = 0; t < 0.3; t += 1 / 60) stepBodies([bottom, top, thrown], { gx: 0, gy: 1200 }, bounds, 1 / 60);
  assert.equal(bottom.sleeping, false, "geworfene Kachel weckt die getroffene");
});

// Seed 2 / 60 Hz: eingeklemmte Kacheln zitterten ewig. Seed 30 / 120 Hz: Korrektursprünge weckten reihum den Haufen.
for (const [startSeed, hz] of [
  [2, 60],
  [30, 120],
]) {
  test(`Großer Haufen kommt vollständig zur Ruhe (Seed ${startSeed}, ${hz} Hz)`, () => {
    let seed = startSeed;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5;
    const pile = Array.from({ length: 100 }, (_, i) =>
      box((i % 10) * 95 + 5, Math.floor(i / 10) * 120, { w: 90, h: 60, mass: 0.4, vx: rnd() * 120, vy: 50, vAngle: rnd() * 2.5 }),
    );
    for (let t = 0; t < 5; t += 1 / hz) stepBodies(pile, { gx: 0, gy: 1200 }, { top: 0, bottom: 1400, width: 1000 }, 1 / hz);
    assert.equal(pile.filter((b) => !b.sleeping).length, 0);
  });
}

test("Gezogene Kachel weckt schlafende Nachbarn", () => {
  const sleeper = box(100, 950, { sleeping: true });
  const held = box(30, 950, { dragging: true });
  stepBodies([sleeper, held], { gx: 0, gy: 1200 }, bounds, 1 / 60);
  assert.equal(sleeper.sleeping, false);
  wake(held);
});

test("Abstand zum Ereignishorizont misst bis zur nächsten Kante, auch gedreht", () => {
  const b = box(0, 0); // 100 × 50, Mitte (50, 25)
  assert.equal(distanceToBody(b, { x: 50, y: 25 }), 0, "Mitte liegt drin");
  assert.equal(distanceToBody(b, { x: 130, y: 25 }), 30, "30 px rechts neben der Kante");
  const turned = box(0, 0, { angle: Math.PI / 2 }); // jetzt 50 breit, 100 hoch
  assert.ok(Math.abs(distanceToBody(turned, { x: 50, y: 105 }) - 30) < 1e-9, "Drehung zählt");
});

test("Schwarzes Loch zieht auch weit entfernte Kacheln binnen Sekunden heran", () => {
  const far = box(0, 3000);
  const hole = { x: 50, y: 25 };
  const big = { top: -10000, bottom: 10000, width: 1000 };
  let t = 0;
  while (distanceToBody(far, hole) > 30 && t < 6) {
    stepBodies([far], { attractor: hole }, big, 1 / 60);
    t += 1 / 60;
  }
  assert.ok(t < 6, `erreicht das Loch nach ${t.toFixed(1)} s`);
});

test("Masse wächst mit der Fläche, Mindestmasse verhindert Division durch null", () => {
  assert.ok(massFromArea(400, 300) > massFromArea(120, 40));
  assert.equal(massFromArea(10, 10), 0.5);
});
