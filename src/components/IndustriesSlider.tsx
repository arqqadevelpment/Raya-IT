"use client";

// Auto-scrolling card row with previous / next arrows overlaid on the cards.
// Scrolls itself slowly in a seamless loop, pauses on hover / focus / while the user steers it,
// and also supports touch swipe and trackpad scrolling. Arrows move one card at a time.

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

const SPEED = 45; // px per second
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
  const pos = useRef(0); // our own float scroll position
  const paused = useRef(false);
  const tween = useRef<{ stop: () => void } | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useRef(false);

  // Stable helpers (they only touch refs).
  const half = useCallback(
    () => (scroller.current ? scroller.current.scrollWidth / 2 : 0),
    [],
  );
  const apply = useCallback(
    (v: number) => {
      const h = half();
      pos.current = h ? ((v % h) + h) % h : v;
      if (scroller.current) scroller.current.scrollLeft = pos.current;
    },
    [half],
  );

  // Pause automatic movement, resume shortly after the user stops interacting.
  const holdThenResume = useCallback((ms = 2500) => {
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => (paused.current = false), ms);
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const el = scroller.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    let hovering = false;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!reduced.current && !paused.current && !hovering && !tween.current) {
        apply(pos.current + SPEED * dt);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // User-driven scrolling (touch swipe / trackpad): adopt the new position and hold auto-scroll.
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - pos.current) > 1.5 && !tween.current) {
        pos.current = el.scrollLeft;
        const h = half();
        if (h && el.scrollLeft >= h) apply(el.scrollLeft - h);
        else if (h && el.scrollLeft <= 0) apply(el.scrollLeft + h);
        holdThenResume();
      }
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const leave = () => (hovering = false);
    const focusIn = () => (paused.current = true);
    const focusOut = () => (paused.current = false);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focusin", focusIn);
    el.addEventListener("focusout", focusOut);
    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focusin", focusIn);
      el.removeEventListener("focusout", focusOut);
    };
  }, [holdThenResume, apply, half]);

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector(
      "a, div[class*='aspect']",
    ) as HTMLElement | null;
    const size = (card?.offsetWidth ?? 368) + GAP;
    // make sure we have room to move backwards without hitting 0
    if (dir === -1 && pos.current - size < 0) apply(pos.current + half());
    tween.current?.stop();
    const from = pos.current;
    tween.current = animate(from, from + dir * size, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => apply(v),
      onComplete: () => {
        tween.current = null;
        holdThenResume(3000);
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
          <div className="flex w-max">
            <div className="flex shrink-0 gap-4 pr-4">
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
