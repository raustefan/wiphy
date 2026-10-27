"""
Lageplan Oberer Eselsberg für den Hintergrund der Startseite.

Erzeugt src/components/campusPlan.json aus zwei OpenStreetMap-Exporten
(Daten © OpenStreetMap-Mitwirkende, ODbL — der Vermerk steht im Hero).
Die Exporte kommen von einem Overpass-Server, z. B. maps.mail.ru/osm/tools/overpass:

  ways.json:
    [out:json];(way["building"](48.4155,9.930,48.4300,9.975);
      way["highway"~"primary|secondary|tertiary|unclassified"](48.4155,9.930,48.4300,9.975);
      way["railway"="tram"](48.4155,9.930,48.4300,9.975););out geom;
  relations.json (Multipolygone, u. a. N25, N27, O27, Chirurgie):
    [out:json];relation["building"](48.4155,9.930,48.4300,9.975);out geom;
  routes.json (Linie 2 je Richtung: Gleisfolge und Haltepunkte im Ausschnitt):
    [out:json];relation["route"="tram"](48.4155,9.930,48.4300,9.975)->.r;
      .r out body;node(r.r)(48.4155,9.930,48.4300,9.975);out;

Aufruf: python3 scripts/campus-plan.py ways.json relations.json routes.json
"""

import json
import math
import sys
from pathlib import Path

# Ausschnitt (Nord, West, Süd, Ost) — Uni West bis Uni Ost.
LAT0, LON0, LAT1, LON1 = 48.4285, 9.934, 48.4160, 9.968
K = 111320  # Meter pro Breitengrad
KX = K * math.cos(math.radians((LAT0 + LAT1) / 2))
W, H = (LON1 - LON0) * KX, (LAT0 - LAT1) * K
RING = 260  # m je Zeichenwelle, ausgehend von N25
# Straßenbahnen, stilisiert: Plan-Meter pro Sekunde, Halt an jeder
# Haltestelle, eine Bahn je Richtung, die zweite um eine halbe Runde versetzt.
TRAM_SPEED = 45
TRAM_DWELL = 2.5  # s je Halt
TRAM_RAMP = 1.6  # s Zuschlag je Abschnitt fürs Bremsen und Anfahren
TRAM_PAUSE = 4  # s unsichtbar zwischen zwei Runden
TRAM_CURVE = 25  # m Kurvenradius an Knicken des Gleises
OUT = Path(__file__).resolve().parent.parent / "src/components/campusPlan.json"


def project(p):
    return ((p["lon"] - LON0) * KX, (LAT0 - p["lat"]) * K)


def simplify(pts, eps):
    """Douglas-Peucker auf einem offenen Linienzug."""
    if len(pts) < 3:
        return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    length = math.hypot(x2 - x1, y2 - y1) or 1e-9
    i, dmax = 0, -1.0
    for j in range(1, len(pts) - 1):
        x, y = pts[j]
        d = abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / length
        if d > dmax:
            i, dmax = j, d
    if dmax <= eps:
        return [pts[0], pts[-1]]
    return simplify(pts[: i + 1], eps)[:-1] + simplify(pts[i:], eps)


def simplify_ring(pts, eps):
    # Start = Ende ließe Douglas-Peucker kollabieren: am fernsten Punkt teilen.
    far = max(range(len(pts)), key=lambda j: math.dist(pts[0], pts[j]))
    return simplify(pts[: far + 1], eps)[:-1] + simplify(pts[far:], eps)[:-1]


def outer_rings(relation):
    """Außenringe eines Multipolygons aus seinen Teilwegen zusammensetzen."""
    key = lambda p: (round(p["lat"], 7), round(p["lon"], 7))
    segs = [m["geometry"] for m in relation["members"] if m.get("role") == "outer" and m.get("geometry")]
    while segs:
        ring = list(segs.pop(0))
        grown = True
        while key(ring[0]) != key(ring[-1]) and grown:
            grown = False
            for i, seg in enumerate(segs):
                if key(seg[0]) == key(ring[-1]):
                    ring += seg[1:]
                elif key(seg[-1]) == key(ring[-1]):
                    ring += seg[::-1][1:]
                else:
                    continue
                segs.pop(i)
                grown = True
                break
        yield ring


def d(pts, closed=False):
    return "M" + " ".join(f"{x:.0f} {y:.0f}" for x, y in pts) + ("Z" if closed else "")


def route_line(relation, ways):
    """Gleise einer Fahrtrichtung in Reihenfolge zu einem Linienzug verketten.
    Lücken (Gleis außerhalb des Exports) beginnen einen neuen Zug; der längste gilt."""
    parts = []  # je Teil: [Punkte, Zahl der Gleise]
    for m in relation["members"]:
        geom = ways.get(m["ref"]) if m["type"] == "way" else None
        if not geom:
            continue
        part = parts[-1] if parts else None
        if part and part[1] == 1 and part[0][0] in (geom[0], geom[-1]):
            part[0].reverse()  # Das erste Gleis lag andersherum.
        if part and part[0][-1] == geom[0]:
            part[0] += geom[1:]
        elif part and part[0][-1] == geom[-1]:
            part[0] += geom[::-1][1:]
        else:
            parts.append([list(geom), 0])
        parts[-1][1] += 1
    return max((p for p, _ in parts), key=len)


def rounded(pts, radius):
    """Linienzug mit abgerundeten Ecken: jeder Knick wird zu einer quadratischen
    Kurve mit dem Knick als Kontrollpunkt. So dreht `rotate="auto"` die Bahn
    stetig, statt an jedem Stützpunkt zu springen. Liefert den SVG-Pfad und
    einen fein abgetasteten Linienzug derselben Form zum Messen."""
    r = lambda p: (round(p[0], 1), round(p[1], 1))
    fmt = lambda p: f"{p[0]:g} {p[1]:g}"
    pts = [r(p) for p in pts]
    path, fine = [f"M{fmt(pts[0])}"], [pts[0]]
    for a, b, c in zip(pts, pts[1:], pts[2:]):
        ab, bc = math.dist(a, b), math.dist(b, c)
        k = min(radius, ab / 2, bc / 2)
        start = r((b[0] + (a[0] - b[0]) * k / ab, b[1] + (a[1] - b[1]) * k / ab))
        end = r((b[0] + (c[0] - b[0]) * k / bc, b[1] + (c[1] - b[1]) * k / bc))
        # Bleibt bis zur letzten Kurve nur ein Stummel, beginnt die Kurve dort,
        # wo die letzte endete: ein paar Dezimeter Gerade zeigten nach dem
        # Runden schräg, und die Bahn zuckte in ihre Richtung.
        if math.dist(start, fine[-1]) < 2:
            start = fine[-1]
        else:
            path.append(f"L{fmt(start)}")
            fine.append(start)
        path.append(f"Q{fmt(b)} {fmt(end)}")
        for i in range(1, 17):
            t = i / 16
            fine.append(tuple((1 - t) ** 2 * s + 2 * (1 - t) * t * m + t**2 * e for s, m, e in zip(start, b, end)))
    path.append(f"L{fmt(pts[-1])}")
    fine.append(pts[-1])

    # Selbstprüfung: die Richtung darf sich zwischen zwei Abtastschritten nie
    # sprunghaft ändern — sonst zuckt die Bahn an dieser Stelle.
    heading = [math.atan2(b[1] - a[1], b[0] - a[0]) for a, b in zip(fine, fine[1:]) if math.dist(a, b) > 0.05]
    worst = max(abs((math.degrees(h2 - h1) + 180) % 360 - 180) for h1, h2 in zip(heading, heading[1:]))
    assert worst < 10, f"Fahrlinie knickt um {worst:.0f}°"
    return "".join(path), fine


def tram_run(relation, ways, stops):
    d_path, pts = rounded(simplify([project(p) for p in route_line(relation, ways)], 1), TRAM_CURVE)
    # Bogenlänge an jedem Stützpunkt — so misst auch der Browser keyPoints.
    acc = [0.0]
    for a, b in zip(pts, pts[1:]):
        acc.append(acc[-1] + math.dist(a, b))
    total = acc[-1]

    def along(stop):
        # Fußpunkt der Haltestelle auf dem Linienzug, als Anteil der Länge.
        best = (math.inf, 0.0)
        for (ax, ay), (bx, by), s0 in zip(pts, pts[1:], acc):
            seg = math.dist((ax, ay), (bx, by)) or 1e-9
            t = max(0.0, min(1.0, ((stop[0] - ax) * (bx - ax) + (stop[1] - ay) * (by - ay)) / seg**2))
            dist = math.dist(stop, (ax + t * (bx - ax), ay + t * (by - ay)))
            best = min(best, (dist, (s0 + t * seg) / total))
        return best

    halts = sorted(f for dist, f in map(along, stops) if dist < 15 and 0.01 < f < 0.99)
    # Fahrplan: anfahren, fahren, bremsen, halten — bis zum Ende, dann Pause.
    # Fahrten bekommen eine S-Kurve (anfahren/bremsen), Halte eine Gerade.
    drive, still = "0.45 0 0.55 1", "0 0 1 1"
    points, times, splines, t = [0.0], [0.0], [], 0.0
    for f in halts + [1.0]:
        t += (f - points[-1]) * total / TRAM_SPEED + TRAM_RAMP
        points.append(f), times.append(t), splines.append(drive)
        if f < 1.0:
            t += TRAM_DWELL
            points.append(f), times.append(t), splines.append(still)
    arrival = t
    dur = t + TRAM_PAUSE
    points.append(1.0), times.append(dur), splines.append(still)
    fmt = lambda xs: ";".join(f"{x:.4f}".rstrip("0").rstrip(".") or "0" for x in xs)
    return {
        "d": d_path,
        "dur": round(dur, 2),
        "keyPoints": fmt(points),
        "keyTimes": fmt([x / dur for x in times]),
        "keySplines": ";".join(splines),
        # Am Anfang einblenden, nach der Ankunft an der Endstation ausblenden.
        "fade": fmt([0, 1.5 / dur, (arrival + 1) / dur, 1]),
        "halts": [[round(c) for c in point_at(pts, acc, f * total)] for f in halts],
    }


def point_at(pts, acc, s):
    for (a, b), s0, s1 in zip(zip(pts, pts[1:]), acc, acc[1:]):
        if s <= s1:
            t = (s - s0) / ((s1 - s0) or 1)
            return (a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1]))
    return pts[-1]


def main(ways_path, relations_path, routes_path):
    elements = json.load(open(ways_path))["elements"]
    tram_ways = {e["id"]: e["geometry"] for e in elements if e.get("tags", {}).get("railway") == "tram"}
    route_data = json.load(open(routes_path))["elements"]
    stop_nodes = {n["id"]: project(n) for n in route_data if n["type"] == "node"}
    trams = [
        tram_run(r, tram_ways, [stop_nodes[m["ref"]] for m in r["members"] if m["ref"] in stop_nodes])
        for r in route_data
        if r["type"] == "relation"
    ]
    for rel in json.load(open(relations_path))["elements"]:
        if rel["type"] == "relation":
            elements += [{"tags": rel["tags"], "geometry": ring} for ring in outer_rings(rel)]

    buildings, roads, tram = [], [], []
    for el in elements:
        tags, geom = el.get("tags", {}), el.get("geometry")
        if not geom:
            continue
        pts = [project(p) for p in geom]
        if "building" in tags:
            pts = simplify_ring(pts, 1.2)
            xs, ys = [p[0] for p in pts], [p[1] for p in pts]
            cx, cy = sum(xs) / len(xs), sum(ys) / len(ys)
            # Schuppen und alles außerhalb des Ausschnitts weglassen.
            if (max(xs) - min(xs)) * (max(ys) - min(ys)) < 150 or not (0 < cx < W and 0 < cy < H):
                continue
            buildings.append((tags.get("name"), pts, cx, cy))
        elif tags.get("railway") == "tram":
            tram.append(d(simplify(pts, 2)))
        elif tags.get("highway") in ("primary", "secondary", "tertiary", "unclassified"):
            roads.append(d(simplify(pts, 2)))

    # Gezeichnet wird in Wellen, die von der Uni Ost (N25) nach außen laufen.
    _, _, ox, oy = next(b for b in buildings if b[0] == "N25")
    rings = []
    for _, pts, cx, cy in buildings:
        n = min(8, int(math.hypot(cx - ox, cy - oy) / RING))
        rings += [[] for _ in range(n + 1 - len(rings))]
        rings[n].append(d(pts, closed=True))

    OUT.write_text(json.dumps({"w": round(W), "h": round(H), "rings": rings, "roads": roads, "tram": tram, "trams": trams}))
    print(f"{OUT}: {len(buildings)} Gebäude, {len(roads)} Straßen, {len(tram)} Gleise, "
          + ", ".join(f"{t['dur']} s / {len(t['halts'])} Halte" for t in trams))


if __name__ == "__main__":
    main(*sys.argv[1:4])
