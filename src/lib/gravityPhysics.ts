/**
 * Physik des Gravitations-Easter-Eggs — ohne DOM, damit sie testbar bleibt.
 * Einheiten: px und s; 1200 px/s² entsprechen „1 g“.
 *
 * Starre, gedrehte Rechtecke. Kontakte entstehen an Ecken: eine Ecke, die in
 * eine Wand oder eine andere Kachel ragt, bekommt dort einen Stoß samt
 * Hebelarm — wer auf einer Ecke landet, kippt; wer an eine Nachbarkachel
 * lehnt, bleibt schief liegen.
 */
export type Body = {
  /** Linke obere Ecke der *ungedrehten* Kachel; gedreht wird um die Mitte (wie CSS). */
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** rad, im Uhrzeigersinn — dieselbe Richtung wie CSS `rotate()`. */
  angle: number;
  vAngle: number;
  w: number;
  h: number;
  mass: number;
  /** Gezogene Körper folgen dem Zeiger und wirken bei Stößen unendlich schwer. */
  dragging: boolean;
  /** Ruhende Kacheln frieren ein, bis sie jemand anstößt — sonst zittert der Stapel ewig um ein Gleichgewicht. */
  sleeping?: boolean;
  restTime?: number;
  /** Wo die aktuelle Ruhephase begann — eingeklemmte Kacheln zittern hin und her, kommen netto aber nicht vom Fleck. */
  restAt?: { x: number; y: number; angle: number };
  /** Hatte im letzten Bild Kontakt — nur wer aufliegt, darf einschlafen (sonst friert er am Scheitel eines Sprungs ein). */
  touching?: boolean;
  /** cos/sin des Winkels, zwischengespeichert bis er sich ändert — die Winkelfunktionen waren der größte Einzelposten. */
  rot?: { angle: number; axes: [Vec, Vec] };
};

export type Field = { gx: number; gy: number } | { attractor: { x: number; y: number } };

export type Impact = { body: Body; speed: number };

export type Bounds = { top: number; bottom: number; width: number };

export const RESTITUTION = 0.35;
const FRICTION = 0.55;
/** Langsamere Stöße prallen nicht ab — sonst zittern liegende Kacheln ewig. */
const BOUNCE_THRESHOLD = 180;
/** Stöße darunter sind „Liegenbleiben“ — kein Ton, kein Zähler. */
export const AUDIBLE_IMPACT = 260;
const ITERATIONS = 3;
/** Längster Teilschritt (s): bei 60 Hz 5 Teilschritte pro Bild, bei 120 Hz 3 — nicht 5 pro Bild, das verdoppelte die Arbeit. */
const SUBSTEP = 1 / 300;
/** Nach einem langsamen Bild nicht noch mehr rechnen, sonst zieht ein Ruckler den nächsten nach sich. */
const MAX_SUBSTEPS = 6;
/** Geschwindigkeit, die pro Sekunde übrig bleibt (Luftwiderstand). */
const DRAG_PER_SECOND = 0.4;
/** Drehung klingt schneller ab, sonst kreiseln Kacheln lange nach. */
const SPIN_DRAG_PER_SECOND = 0.15;
/** Bleibt eine aufliegende Kachel so lange (s) … */
const SLEEP_AFTER = 0.15;
/** … innerhalb dieses Radius (px) um den Startpunkt, schläft sie ein. */
const SLEEP_DRIFT = 6;
/**
 * Wer sich schneller bewegt, weckt schlafende Kacheln, die er berührt. Gemessen an der Geschwindigkeit,
 * nicht an der Verschiebung: Positionskorrekturen versetzen frisch geweckte Kacheln um ein paar px —
 * als „Bewegung“ gezählt weckten sie die Nachbarn, die wieder sprangen, und so fort durch den Haufen.
 */
const WAKE_SPEED = 70;
/** So weit dürfen Kacheln ineinanderragen, ohne korrigiert zu werden (px) — etwas Spiel beruhigt Stapel. */
const SLOP = 1;

export const massFromArea = (w: number, h: number) => Math.max(0.5, (w * h) / 15000);

type Vec = { x: number; y: number };

const frozen = (b: Body | null) => !b || b.dragging || !!b.sleeping;
const invMass = (b: Body | null) => (frozen(b) ? 0 : 1 / b!.mass);
const invInertia = (b: Body | null) => (frozen(b) ? 0 : 12 / (b!.mass * (b!.w * b!.w + b!.h * b!.h)));

export function wake(b: Body) {
  b.sleeping = false;
  b.restTime = 0;
}
const center = (b: Body): Vec => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });

const CORNERS = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];
/**
 * Kantenmitten zusätzlich: Liegen zwei Kanten exakt auf gleicher Höhe (Kacheln
 * nebeneinander am Boden), steckt keine Ecke *echt* in der Nachbarkachel —
 * die Mitte der Seitenkante schon.
 */
const OUTLINE = [...CORNERS, [0, -1], [1, 0], [0, 1], [-1, 0]];

function corners(b: Body, points = CORNERS): Vec[] {
  const c = center(b);
  const [{ x: cos, y: sin }] = axes(b);
  return points.map(([sx, sy]) => {
    const lx = (sx * b.w) / 2;
    const ly = (sy * b.h) / 2;
    return { x: c.x + lx * cos - ly * sin, y: c.y + lx * sin + ly * cos };
  });
}

/**
 * Ein Bild in Teilschritten: Bei voller Fallgeschwindigkeit stäke eine Kachel
 * sonst 20 px tief in der darunter, und der kürzeste Weg hinaus wäre seitlich —
 * sie würde vom Stapel geschleudert statt aufzuliegen. Kräftige Dämpfung und
 * schnelles Einschlafen halten den Stapel ruhig, daher reichen 300 Teilschritte pro Sekunde.
 */
export function stepBodies(bodies: Body[], field: Field, bounds: Bounds, dt: number): Impact[] {
  bodies.forEach((b) => (b.touching = false));
  const impacts = new Map<Body, number>();
  const steps = Math.min(MAX_SUBSTEPS, Math.ceil(dt / SUBSTEP - 1e-9));
  for (let i = 0; i < steps; i++) {
    for (const { body, speed } of substep(bodies, field, bounds, dt / steps)) {
      impacts.set(body, Math.max(impacts.get(body) ?? 0, speed));
    }
  }

  // Die Singularität wandert mit dem Zeiger — da darf nichts einschlafen.
  const canSleep = !("attractor" in field);
  bodies.forEach((b) => {
    if (b.sleeping) return;
    const r = b.restAt;
    const resting =
      canSleep && b.touching && !b.dragging && !!r && Math.hypot(b.x - r.x, b.y - r.y) < SLEEP_DRIFT && Math.abs(b.angle - r.angle) < 0.05;
    b.restTime = resting ? (b.restTime ?? 0) + dt : 0;
    if (!resting) b.restAt = { x: b.x, y: b.y, angle: b.angle };
    if (b.restTime > SLEEP_AFTER) {
      b.sleeping = true;
      b.vx = b.vy = b.vAngle = 0;
    }
  });

  return [...impacts].map(([body, speed]) => ({ body, speed }));
}

function substep(bodies: Body[], field: Field, bounds: Bounds, dt: number): Impact[] {
  // Dämpfung pro Sekunde statt pro Bild, sonst fallen Körper auf 120-Hz-Displays träger.
  const drag = Math.pow(DRAG_PER_SECOND, dt);
  const spinDrag = Math.pow(SPIN_DRAG_PER_SECOND, dt);

  for (const b of bodies) {
    if (frozen(b)) continue;

    if ("attractor" in field) {
      const c = center(b);
      const dx = field.attractor.x - c.x;
      const dy = field.attractor.y - c.y;
      const dist = Math.max(60, Math.hypot(dx, dy));
      // Bewusst unphysikalisch flach abfallend statt 1/d²: Auch Kacheln am Ende einer langen
      // Seite sollen binnen Sekunden ins Loch stürzen, nicht erst nach einer Minute.
      const force = 3000 * Math.pow(60 / dist, 0.3);
      b.vx += (dx / dist) * force * dt;
      b.vy += (dy / dist) * force * dt;
    } else {
      b.vx += field.gx * dt;
      b.vy += field.gy * dt;
    }

    b.vx *= drag;
    b.vy *= drag;
    b.vAngle *= spinDrag;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.angle += b.vAngle * dt;
  }

  const impacts = new Map<Body, number>();
  for (let pass = 0; pass < ITERATIONS; pass++) {
    const report = (b: Body, speed: number) => {
      if (pass === 0 && speed > AUDIBLE_IMPACT) impacts.set(b, Math.max(impacts.get(b) ?? 0, speed));
    };
    // Sweep entlang x: nach linker Kante sortiert, Paare nur prüfen, solange sie sich in x überlappen
    // können — und in y, sonst prüft eine hohe Säule gestapelter Kacheln wieder jedes Paar.
    const sorted = bodies
      .map((b) => {
        const r = Math.hypot(b.w, b.h) / 2;
        const cx = b.x + b.w / 2;
        return { b, min: cx - r, max: cx + r, cy: b.y + b.h / 2, r };
      })
      .sort((p, q) => p.min - q.min);
    for (let i = 0; i < sorted.length; i++) {
      const p = sorted[i];
      for (let j = i + 1; j < sorted.length && sorted[j].min <= p.max; j++) {
        const q = sorted[j];
        if (Math.abs(p.cy - q.cy) <= p.r + q.r) collideBodies(p.b, q.b, report);
      }
    }
    for (const b of bodies) collideBounds(b, bounds, report);
  }

  return [...impacts].map(([body, speed]) => ({ body, speed }));
}

/** Alle Punkte einer Berührung (eine Ecke, oder eine aufliegende Kante), n von a nach b. */
type Contact = { points: Vec[]; n: Vec; depth: number };

function merge(found: { p: Vec; n: Vec; depth: number }[]): Contact | null {
  if (!found.length) return null;
  const deepest = found.reduce((m, c) => (c.depth > m.depth ? c : m));
  return { points: found.map((c) => c.p), n: deepest.n, depth: deepest.depth };
}

/**
 * Wo der Stoß an `body` angreift: der Punkt der Auflagefläche unter seinem
 * Schwerpunkt, an deren Rand geklemmt. Liegt der Schwerpunkt über der Fläche,
 * gibt es kein Drehmoment (Kachel bleibt liegen); ragt er darüber hinaus oder
 * berührt nur eine Ecke, greift der Stoß am Rand an — die Kachel kippt.
 */
function leverArm(body: Body | null, { points, n }: Contact): Vec {
  if (!body) return { x: 0, y: 0 };
  const c = center(body);
  const t = { x: -n.y, y: n.x };
  const along = points.map((p) => p.x * t.x + p.y * t.y);
  const s = Math.min(Math.max(c.x * t.x + c.y * t.y, Math.min(...along)), Math.max(...along));
  const base = points[0];
  const offset = s - (base.x * t.x + base.y * t.y);
  return { x: base.x + t.x * offset - c.x, y: base.y + t.y * offset - c.y };
}

function collideBounds(b: Body, bounds: Bounds, report: (b: Body, speed: number) => void) {
  if (frozen(b)) return;
  // n zeigt von der Kachel in die Wand
  const walls: [Vec, (p: Vec) => number][] = [
    [{ x: 0, y: 1 }, (p) => p.y - bounds.bottom],
    [{ x: 0, y: -1 }, (p) => bounds.top - p.y],
    [{ x: -1, y: 0 }, (p) => -p.x],
    [{ x: 1, y: 0 }, (p) => p.x - bounds.width],
  ];
  for (const [n, depthOf] of walls) {
    const contact = merge(
      corners(b)
        .map((p) => ({ p, n, depth: depthOf(p) }))
        .filter((c) => c.depth > 0),
    );
    if (contact) resolve(b, null, contact, report);
  }
}

function axes(b: Body): [Vec, Vec] {
  if (b.rot?.angle !== b.angle) {
    const cos = Math.cos(b.angle);
    const sin = Math.sin(b.angle);
    b.rot = {
      angle: b.angle,
      axes: [
        { x: cos, y: sin },
        { x: -sin, y: cos },
      ],
    };
  }
  return b.rot.axes;
}

const dot = (a: Vec, b: Vec) => a.x * b.x + a.y * b.y;

/** Halbe Ausdehnung der gedrehten Kachel entlang `axis`. */
function radius(b: Body, axis: Vec, [u, v] = axes(b)): number {
  return Math.abs(dot(u, axis)) * (b.w / 2) + Math.abs(dot(v, axis)) * (b.h / 2);
}

/** Abstand von p zur nächsten Stelle der gedrehten Kachel; 0, wenn p in ihr liegt. */
export function distanceToBody(b: Body, p: Vec): number {
  const c = center(b);
  const d = { x: p.x - c.x, y: p.y - c.y };
  const [u, v] = axes(b);
  return Math.hypot(Math.max(Math.abs(dot(d, u)) - b.w / 2, 0), Math.max(Math.abs(dot(d, v)) - b.h / 2, 0));
}

function inside(p: Vec, b: Body, c: Vec, [u, v]: [Vec, Vec]): boolean {
  const d = { x: p.x - c.x, y: p.y - c.y };
  return Math.abs(dot(d, u)) < b.w / 2 && Math.abs(dot(d, v)) < b.h / 2;
}

/**
 * Trennachsen-Test (SAT): Richtung und Tiefe kommen aus der Achse mit der
 * geringsten Überlappung — eine Richtung für den ganzen Kontakt, sonst
 * schieben einzelne Ecken gegeneinander und der Stapel zittert. Wo der Stoß
 * angreift, entscheiden die Ecken und Kantenmitten, die in der anderen Kachel stecken.
 */
function collideBodies(a: Body, b: Body, report: (b: Body, speed: number) => void) {
  const dragWakes = (a.dragging && b.sleeping) || (b.dragging && a.sleeping);
  if (invMass(a) + invMass(b) === 0 && !dragWakes) return;
  const ca = center(a);
  const cb = center(b);
  const reach = (Math.hypot(a.w, a.h) + Math.hypot(b.w, b.h)) / 2;
  if (Math.abs(ca.x - cb.x) > reach || Math.abs(ca.y - cb.y) > reach) return;

  const between = { x: cb.x - ca.x, y: cb.y - ca.y };
  const axesA = axes(a);
  const axesB = axes(b);
  let best: { n: Vec; depth: number } | null = null;
  for (const axis of [...axesA, ...axesB]) {
    const dist = dot(between, axis);
    const depth = radius(a, axis, axesA) + radius(b, axis, axesB) - Math.abs(dist);
    if (depth <= 0) return; // Trennachse gefunden
    if (!best || depth < best.depth) {
      const sign = dist < 0 ? -1 : 1;
      best = { n: { x: axis.x * sign, y: axis.y * sign }, depth };
    }
  }
  if (!best) return;

  // Schlafende Kachel wacht auf, wenn etwas Bewegtes sie berührt (auch eine wegrutschende Stütze)
  for (const [sleeper, other] of [
    [a, b],
    [b, a],
  ]) {
    if (sleeper.sleeping && !other.sleeping && (other.dragging || Math.hypot(other.vx, other.vy) > WAKE_SPEED)) wake(sleeper);
  }
  if (invMass(a) + invMass(b) === 0) return;

  const points = [
    ...corners(a, OUTLINE).filter((p) => inside(p, b, cb, axesB)),
    ...corners(b, OUTLINE).filter((p) => inside(p, a, ca, axesA)),
  ];
  // Überkreuzt ohne eingeschlossene Ecke: Stoß zwischen den Mittelpunkten
  if (!points.length) points.push({ x: (ca.x + cb.x) / 2, y: (ca.y + cb.y) / 2 });
  resolve(a, b, { points, ...best }, report);
}

/** Stoß- und Reibungsimpuls; n zeigt von a nach b, b = null ist eine Wand. */
function resolve(a: Body, b: Body | null, contact: Contact, report: (b: Body, speed: number) => void) {
  const { n, depth } = contact;
  const ia = invMass(a);
  const ib = invMass(b);
  const Ia = invInertia(a);
  const Ib = invInertia(b);
  if (ia + ib === 0) return;

  a.touching = true;
  if (b) b.touching = true;
  const ra = leverArm(a, contact);
  const rb = leverArm(b, contact);

  // Ineinanderragen sofort auflösen (bis auf SLOP, sonst zittert der Stapel)
  const correction = Math.max(depth - SLOP, 0) / (ia + ib);
  a.x -= n.x * correction * ia;
  a.y -= n.y * correction * ia;
  if (b) {
    b.x += n.x * correction * ib;
    b.y += n.y * correction * ib;
  }

  const velocityAt = (body: Body | null, r: Vec): Vec =>
    body ? { x: body.vx - body.vAngle * r.y, y: body.vy + body.vAngle * r.x } : { x: 0, y: 0 };
  const va = velocityAt(a, ra);
  const vb = velocityAt(b, rb);
  const rel = { x: vb.x - va.x, y: vb.y - va.y };
  const vn = rel.x * n.x + rel.y * n.y;
  if (vn >= 0) return; // trennen sich bereits

  report(ia ? a : b!, -vn);

  const cross = (r: Vec, v: Vec) => r.x * v.y - r.y * v.x;
  const effMass = (dir: Vec) =>
    ia + ib + cross(ra, dir) ** 2 * Ia + cross(rb, dir) ** 2 * Ib;
  const apply = (impulse: Vec) => {
    a.vx -= impulse.x * ia;
    a.vy -= impulse.y * ia;
    a.vAngle -= cross(ra, impulse) * Ia;
    if (b) {
      b.vx += impulse.x * ib;
      b.vy += impulse.y * ib;
      b.vAngle += cross(rb, impulse) * Ib;
    }
  };

  const e = -vn > BOUNCE_THRESHOLD ? RESTITUTION : 0;
  const jn = (-(1 + e) * vn) / effMass(n);
  apply({ x: n.x * jn, y: n.y * jn });

  // Coulomb-Reibung: bremst das Rutschen, deshalb kippt eine Kachel über ihre Ecke statt zu gleiten
  const t = { x: -n.y, y: n.x };
  const vt = rel.x * t.x + rel.y * t.y;
  const jt = Math.max(-FRICTION * jn, Math.min(FRICTION * jn, -vt / effMass(t)));
  apply({ x: t.x * jt, y: t.y * jt });
}
