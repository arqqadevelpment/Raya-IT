"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Award as AwardIcon } from "lucide-react";
import type { Award } from "@/content/awards";

type Filter = "all" | "2025" | "2024" | "2023" | "2022" | "2021" | "earlier";

function matches(a: Award, f: Filter) {
  if (f === "all") return true;
  if (a.year === null) return false;
  if (f === "earlier") return a.year <= 2020;
  return a.year === Number(f);
}

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "2025", label: "2025" },
  { id: "2024", label: "2024" },
  { id: "2023", label: "2023" },
  { id: "2022", label: "2022" },
  { id: "2021", label: "2021" },
  { id: "earlier", label: "2020 & earlier" },
];

export default function AwardsGrid({ awards }: { awards: Award[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(() => awards.filter((a) => matches(a, filter)), [awards, filter]);

  return (
    <div>
      <div role="group" aria-label="Filter awards by year" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          const count = awards.filter((a) => matches(a, f.id)).length;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                active
                  ? "border-electric bg-electric text-white"
                  : "border-mist bg-white text-ink/70 hover:border-electric/50 hover:text-electric"
              }`}
            >
              {f.label} <span className={active ? "text-white/70" : "text-ink/40"}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((a) => (
            <motion.li
              key={a.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist bg-white transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-[0_18px_40px_-18px_rgba(1,101,232,0.45)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    unoptimized
                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 items-start gap-3 p-5">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface text-electric">
                    <AwardIcon size={16} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold leading-snug text-navy">{a.title}</h3>
                    {a.year && <p className="mt-1 text-sm text-ink/55">{a.year}</p>}
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
