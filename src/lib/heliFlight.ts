/**
 * Flugmodell des Hubschraubers im Hero-Lageplan (Helicopter.tsx): von Hand
 * gesteuert, auf Wunsch fliegt er selbst zur Basis zurück, und zu schnell gegen
 * Text oder Knöpfe stürzt er ab. Alle Maße in Plan-Metern, Winkel im Bogenmaß,
 * Zeiten in Sekunden.
 */
const SPEED = 320; // m/s vorwärts, rückwärts ein Drittel davon
const ACCEL = 300; // m/s²
const YAW = 2.1; // rad/s Drehrate
const YAW_ACCEL = 8; // rad/s²
const SPIN = 1.5; // s bis der Rotor läuft, und wieder bis er steht
const LIFT = 1.5; // s Steigen und Sinken auf der Stelle
const ROTOR = 16; // rad/s bei vollem Lauf
const PARK = 1; // m Abstand zur Basis, ab dem er sinkt
export const CRASH_SPEED = 180; // m/s, langsamer schwebt er gefahrlos vor dem Text
const CRASH_YAW = 7; // rad/s Trudeln
const CRASH_FALL = 2800; // m/s², entspricht der Schwerkraft der fallenden Seite
const CRASH_MARGIN = 100; // m unter dem Bildrand, ab denen er als abgestürzt gilt

export type HeliMode = "parked" | "manual" | "return" | "crash" | "down";
export type Heli = {
  mode: HeliMode;
  x: number;
  y: number;
  heading: number;
  speed: number;
  yaw: number;
  alt: number; // 0 am Boden, 1 in der Luft
  rotor: number; // 0 steht, 1 voller Lauf
  blade: number; // Winkel der Rotorblätter
  fall: number; // Fallgeschwindigkeit beim Absturz
};
export type Stick = { thrust: number; turn: number }; // je -1, 0 oder 1
export type Bounds = { left: number; top: number; right: number; bottom: number };

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const approach = (v: number, target: number, step: number) => v + clamp(target - v, -step, step);

export function parkedHeli(base: readonly number[]): Heli {
  return { mode: "parked", x: base[0], y: base[1], heading: 0, speed: 0, yaw: 0, alt: 0, rotor: 0, blade: 0, fall: 0 };
}

/** Ein Bild weiter. Tempo und Drehrate ändern sich nur stetig: er zuckt nie. */
export function stepHeli(h: Heli, stick: Stick, dt: number, base: readonly number[], bounds: Bounds) {
  let speed = 0;
  let yaw = 0;

  if (h.mode === "manual") {
    h.rotor = approach(h.rotor, 1, dt / SPIN);
    if (h.rotor === 1) h.alt = approach(h.alt, 1, dt / LIFT);
    if (h.alt === 1) {
      speed = stick.thrust > 0 ? SPEED : stick.thrust < 0 ? -SPEED / 3 : 0;
      yaw = stick.turn * YAW;
    }
  } else if (h.mode === "return") {
    const dist = Math.hypot(base[0] - h.x, base[1] - h.y);
    if (dist > PARK) {
      // Weicht die Richtung ab, bremst er und dreht auf der Stelle — so kann
      // er die Basis nicht endlos umkreisen, wie mit festem Wendekreis.
      const off = Math.atan2(base[1] - h.y, base[0] - h.x) - h.heading;
      const err = Math.atan2(Math.sin(off), Math.cos(off));
      yaw = clamp(err * 3, -YAW, YAW);
      speed = Math.min(SPEED, dist * 2) * Math.max(0, Math.cos(err));
    } else {
      [h.x, h.y, h.speed, h.yaw] = [base[0], base[1], 0, 0];
      h.alt = approach(h.alt, 0, dt / LIFT);
      if (h.alt === 0) h.rotor = approach(h.rotor, 0, dt / SPIN);
      if (h.rotor === 0) h.mode = "parked";
    }
  } else if (h.mode === "crash") {
    yaw = CRASH_YAW;
    h.alt = approach(h.alt, 0, dt / LIFT);
    h.rotor = approach(h.rotor, 0, dt / SPIN);
    h.fall += CRASH_FALL * dt;
    h.y += h.fall * dt;
    if (h.y > bounds.bottom + CRASH_MARGIN) h.mode = "down";
  }

  h.speed = approach(h.speed, speed, ACCEL * dt);
  h.yaw = approach(h.yaw, yaw, YAW_ACCEL * dt);
  h.heading += h.yaw * dt;
  h.x += Math.cos(h.heading) * h.speed * dt;
  h.y += Math.sin(h.heading) * h.speed * dt;
  h.blade += h.rotor * ROTOR * dt;
  // Nur von Hand: die Basis kann auf schmalen Fenstern außerhalb des Bildes liegen.
  if (h.mode === "manual") {
    h.x = clamp(h.x, bounds.left, bounds.right);
    h.y = clamp(h.y, bounds.top, bounds.bottom);
  }
}
