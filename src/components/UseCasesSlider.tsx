"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Handshake,
  Headset,
  Laptop,
  MonitorSmartphone,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { DetailItem } from "@/content/digital-workplace";

const icons: Record<string, LucideIcon> = {
  handshake: Handshake,
  remote: MonitorSmartphone,
  video: Video,
  team: Users,
  headset: Headset,
  laptop: Laptop,
};

const arrow =
  "grid h-12 w-12 place-items-center rounded-full border border-mist bg-white text-navy transition-colors hover:border-electric hover:bg-electric hover:text-white disabled:pointer-events-none disabled:opacity-40";

export default function UseCasesSlider({
  items,
  heading,
}: {
  items: DetailItem[];
  heading: ReactNode;
}) {
  const scroller = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div>{heading}</div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edge.start}
            aria-label="Previous use cases"
            className={arrow}
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edge.end}
            aria-label="Next use cases"
            className={arrow}
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={scroller}
        onScroll={update}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((u, i) => {
          const Icon = (u.icon && icons[u.icon]) || Users;
          return (
            <li
              key={u.title}
              className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <div className="group h-full rounded-2xl border border-mist bg-surface p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-[0_18px_40px_-18px_rgba(1,101,232,0.45)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-electric to-navy text-white shadow-[0_10px_24px_-10px_rgba(1,101,232,0.7),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-300 group-hover:scale-105">
                    <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-electric">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-snug text-navy">
                  {u.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {u.text}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
