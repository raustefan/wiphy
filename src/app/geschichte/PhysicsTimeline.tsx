"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { categories, events, type TimelineCategory } from "./milestones";

const FIRST_YEAR = events[0].year;

const categoryLabel: Record<TimelineCategory, string> = {
  uni: "Universität Ulm",
  physik: "Physik",
  wirtschaftsphysik: "Wirtschaftsphysik",
  alumni: "Alumni-Verein",
};

/**
 * Zählwerk: jede Ziffer ist ein senkrechter Streifen 0–9, der an einer Feder
 * auf den neuen Wert rollt (siehe `--spring` in globals.css).
 */
function Odometer({ value }: { value: number }) {
  return (
    <span aria-hidden="true" className="inline-flex overflow-hidden leading-none tabular-nums">
      {String(value)
        .split("")
        .map((digit, i) => (
          <span key={i} className="relative h-[1em] w-[0.5em] overflow-hidden">
            <span
              className="needle absolute inset-x-0 top-0 grid"
              style={{ transform: `translateY(${-Number(digit)}em)` }}
            >
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n} className="h-[1em] text-center">
                  {n}
                </span>
              ))}
            </span>
          </span>
        ))}
    </span>
  );
}

export function PhysicsTimeline() {
  const [filter, setFilter] = useState<"alle" | TimelineCategory>("alle");
  const visible = useMemo(
    () => events.filter((event) => filter === "alle" || event.category === filter),
    [filter],
  );
  const [activeId, setActiveId] = useState(visible[0].id);
  const active = visible.find((e) => e.id === activeId) ?? visible[0];
  const listRef = useRef<HTMLOListElement>(null);

  const lastYear = Math.max(new Date().getFullYear(), events[events.length - 1].year);
  const progress = (active.year - FIRST_YEAR) / (lastYear - FIRST_YEAR);

  /* Der Eintrag, der gerade im oberen Drittel des Fensters steht, ist der
     aktive — er treibt Zählwerk und Nadel. */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActiveId((hit.target as HTMLElement).id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    list.querySelectorAll("li[id]").forEach((li) => observer.observe(li));
    return () => observer.disconnect();
  }, [visible]);

  function selectFilter(next: "alle" | TimelineCategory) {
    setFilter(next);
    const first = events.find((event) => next === "alle" || event.category === next);
    if (first) setActiveId(first.id);
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Nach Bereich filtern"
        className="-mx-5 flex gap-x-6 overflow-x-auto border-b border-line-strong px-5 whitespace-nowrap sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={filter === category.id}
            onClick={() => selectFilter(category.id)}
            className={cn(
              "-mb-px min-h-12 cursor-pointer border-b-2 font-serif text-lg transition-colors",
              "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-physics",
              filter === category.id
                ? "border-physics text-foreground"
                : "border-transparent text-muted hover:text-foreground",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        {/* Zählwerk und Skala (ab lg, klebt beim Scrollen) */}
        <div aria-hidden="true" className="hidden lg:block">
          <div className="sticky top-28 flex gap-8">
            <div className="relative h-[22rem]">
              <div className="ruler-y h-full border-r border-line-strong" />
              <span
                className="needle absolute top-0 right-0 h-0.5 w-6 bg-physics"
                style={{ transform: `translateY(${(1 - progress) * 22}rem)` }}
              />
              <span className="absolute top-0 right-3 -translate-y-1/2 pr-1 text-xs text-muted">
                {lastYear}
              </span>
              <span className="absolute right-3 bottom-0 translate-y-1/2 pr-1 text-xs text-muted">
                {FIRST_YEAR}
              </span>
            </div>
            <div className="self-end">
              <p className="font-serif text-[6.5rem] leading-none">
                <Odometer value={active.year} />
              </p>
              <p className="mt-3 font-serif text-lg text-muted italic">{categoryLabel[active.category]}</p>
            </div>
          </div>
        </div>

        <ol ref={listRef} className="grid">
          {visible.map((event) => (
            <li
              key={event.id}
              id={event.id}
              className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0"
            >
              <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span
                  className={cn(
                    "font-serif text-2xl italic transition-colors",
                    event.id === active.id ? "text-physics" : "text-muted",
                  )}
                >
                  {event.label}
                </span>
                <span className="text-sm text-muted">{categoryLabel[event.category]}</span>
              </p>
              <h2 className="headline mt-2 text-3xl sm:text-4xl">{event.title}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty">{event.summary}</p>
              <ul className="mt-4 grid max-w-2xl list-disc gap-2 pl-5 leading-relaxed text-muted marker:text-physics">
                {event.details.map((detail) => (
                  <li key={detail} className="text-pretty">
                    {detail}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
