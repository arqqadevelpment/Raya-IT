"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";

type Item = { title: string; description: string; href: string; image?: string };

export default function ServicesAccordion({ items, cta }: { items: Item[]; cta: string }) {
  const [open, setOpen] = useState(0);

  return (
    <ul className="divide-y divide-navy/15 border-y border-navy/15">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.title}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`service-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center gap-5 py-6 text-left"
              >
                <span className="w-8 text-sm font-semibold tabular-nums text-electric">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 text-xl font-semibold tracking-tight transition-colors sm:text-2xl ${
                    isOpen ? "text-navy" : "text-navy/60 group-hover:text-navy"
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all ${
                    isOpen
                      ? "rotate-45 border-electric bg-electric text-white"
                      : "border-navy/25 text-navy group-hover:border-navy"
                  }`}
                >
                  <Plus size={18} aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`service-panel-${i}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-[3.25rem] pr-4 sm:pr-16">
                    <p className="max-w-xl leading-relaxed text-ink/70">{item.description}</p>
                    <Link
                      href={item.href}
                      className="group/l mt-5 inline-flex items-center gap-2 text-sm font-semibold text-electric hover:text-navy"
                    >
                      {cta}
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover/l:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
