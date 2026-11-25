"use client";

// Solutions carousel: heading + intro on top, then one horizontal row of glass cards that can be
// moved with the arrows, by swiping, or with a trackpad (snaps card by card).

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import FlagMark from "./FlagMark";
import { Reveal, SplitHeading } from "./motion";

type Item = { title: string; description: string; href: string };

function Card({ item, cta }: { item: Item; cta: string }) {
  return (
    <li className="w-[17rem] shrink-0 snap-start sm:w-[19rem]">
      <Link
        href={item.href}
        className="card-noise group/card relative flex h-full min-h-[22rem] w-full flex-col overflow-hidden rounded-xl border border-white/15 bg-deep/85 p-6 text-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_28px_60px_-24px_rgba(1,101,232,0.65)]"
      >
        {/* Hover: a brand-blue fill sweeps up from the bottom and the card content turns white. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-electric to-navy transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-y-100"
        >
          <FlagMark className="absolute bottom-5 right-5 h-32 w-32 text-white/10" />
        </span>

        <div className="relative flex flex-1 flex-col">
          <h3 className="text-xl font-normal leading-snug tracking-tight text-white transition-colors duration-300 group-hover/card:text-white">
            {item.title}
          </h3>
          <span
            aria-hidden="true"
            className="mt-5 block h-px bg-white/20 transition-colors duration-300 group-hover/card:bg-white/35"
          />
          <p className="mt-4 text-sm leading-relaxed text-white/75 transition-colors duration-300 group-hover/card:text-white/85">
            {item.description}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-sky transition-colors duration-300 group-hover/card:text-white">
            {cta}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </li>
  );
}

export default function SolutionsGrid({
  eyebrow,
  headline,
  accent,
  text,
  cardCta,
  items,
}: {
  eyebrow: string;
  headline: string;
  accent: string;
  text: string;
  cardCta: string;
  items: Item[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const move = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("li") as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 336) + 20), behavior: "smooth" });
  };

  return (
    <>
      {/* Header: tag + title on the left, intro text on the right */}
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div>
          <Reveal>
            <p className="text-base text-grey">{eyebrow}</p>
          </Reveal>
          <SplitHeading
            text={headline}
            accent={accent}
            className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
          />
        </div>
        <Reveal delay={0.15}>
          <p className="text-lg leading-relaxed text-white/70">{text}</p>
        </Reveal>
      </div>

      {/* One scrolling row; it bleeds to the page edges so the next card peeks in. */}
      <div
        ref={scroller}
        className="-mx-5 mt-10 overflow-x-auto px-5 pb-10 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-px-5 sm:scroll-px-8"
      >
        <ul className="flex w-max gap-5">
          {items.map((item) => (
            <Card key={item.title} item={item} cta={cardCta} />
          ))}
        </ul>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous solutions"
          className="grid size-12 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors hover:border-electric hover:bg-electric"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next solutions"
          className="grid size-12 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors hover:border-electric hover:bg-electric"
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
