"use client";

// Card row moved by the previous / next arrows overlaid on the cards (no automatic scrolling).
// Arrows move one card at a time; touch swipe and trackpad scrolling also work. Loops at both ends.

import Image from "next/image";
import Link from "next/link";
import { animate } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

type Item = {
  title: string;
  description: string;
  image: string;
  href?: string;
};

const GAP = 16;

function Card({ item }: { item: Item }) {
  const cls =
    "group relative block aspect-[6/5] w-[19rem] shrink-0 overflow-hidden rounded-2xl text-white sm:w-[23rem]";
  const inner = (
    <>
      <Image
        src={item.image}
        alt=""
        fill
        unoptimized
        sizes="23rem"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/25 to-deep/5" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="flex items-center justify-between gap-3 text-xl font-semibold text-white">
          {item.title}
          {item.href && <ArrowUpRight size={20} className="shrink-0" />}
        </h3>
        {/* Title rests at the bottom; on hover it slides up as the description opens beneath it.
            Touch screens (no hover) always show the description. */}
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100">
          <div className="overflow-hidden">
            <p className="max-w-xs pt-2 text-sm leading-relaxed text-white/85">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
  return item.href ? (
    <Link href={item.href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function IndustriesSlider({ items }: { items: Item[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const pos = useRef(0); // current scroll position (kept in sync with touch / trackpad scrolling)
  const tween = useRef<{ stop: () => void } | null>(null);

  // Loop geometry. The track is: [left padding][group of cards][copy of the group].
  // One loop period = the width of a group. Positions "lo" and "lo + period" show the same thing,
  // so the row is always kept inside [lo, lo + period): the left edge of the view is then always
  // over cards (never over the empty left padding), and every position is fully covered.
  const period = useCallback(() => group.current?.offsetWidth ?? 0, []);
  const lo = useCallback(
    () => (track.current ? parseFloat(getComputedStyle(track.current).paddingLeft) || 0 : 0),
    [],
  );
  const apply = useCallback(
    (v: number) => {
      const h = period();
      const l = lo();
      pos.current = h ? l + ((((v - l) % h) + h) % h) : v;
      if (scroller.current) scroller.current.scrollLeft = pos.current;
    },
    [period, lo],
  );

  // Start one period in: the first card lines up with the section text and the last card peeks
  // in from the left edge (same picture as position 0, but without the empty gap on the left).
  useEffect(() => {
    apply(period());
  }, [apply, period]);

  // The row never moves on its own. This only keeps our position in step when the visitor
  // swipes or scrolls it by hand, and wraps around at either end.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - pos.current) > 1.5 && !tween.current) {
        pos.current = el.scrollLeft;
        const h = period();
        const l = lo();
        if (h && el.scrollLeft >= l + h) apply(el.scrollLeft - h);
        else if (h && el.scrollLeft < l) apply(el.scrollLeft + h);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [apply, period, lo]);

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector(
      "a, div[class*='aspect']",
    ) as HTMLElement | null;
    const size = (card?.offsetWidth ?? 368) + GAP;
    // make sure we have room to move backwards without leaving the loop range
    if (dir === -1 && pos.current - size < lo()) apply(pos.current + period());
    tween.current?.stop();
    const from = pos.current;
    tween.current = animate(from, from + dir * size, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => apply(v),
      onComplete: () => {
        tween.current = null;
      },
    });
  };

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous industries"
          className="absolute left-4 sm:left-8 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-navy shadow-[0_8px_24px_-6px_rgba(0,10,61,0.5)] backdrop-blur transition-colors hover:bg-electric hover:text-white"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next industries"
          className="absolute right-4 sm:right-8 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-navy shadow-[0_8px_24px_-6px_rgba(0,10,61,0.5)] backdrop-blur transition-colors hover:bg-electric hover:text-white"
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
        <div
          ref={scroller}
          className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Left padding lines the first card up with the section title (same edge as the page container). */}
          <div ref={track} className="flex w-max ps-[max(1.25rem,calc((100%-80rem)/2+1.25rem))] sm:ps-[max(2rem,calc((100%-80rem)/2+2rem))]">
            <div ref={group} className="flex shrink-0 gap-4 pr-4">
              {items.map((item) => (
                <Card key={item.title} item={item} />
              ))}
            </div>
            {/* second copy for the seamless loop: hidden from assistive tech, not focusable */}
            <div aria-hidden="true" inert className="flex shrink-0 gap-4 pr-4">
              {items.map((item) => (
                <Card key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
