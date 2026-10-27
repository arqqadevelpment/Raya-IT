"use client";

// Solutions grid modelled on the reference "Our services" section (screen recording 0099.mp4):
//  - 3-column grid; the heading is the first cell and the intro text + button the last cell.
//  - Each card rises from below, tilted in 3D and dimmed, and settles flat as it scrolls into view.

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import GlassIcon from "./GlassIcons";
import FlagMark from "./FlagMark";
import { Reveal, SplitHeading } from "./motion";

type Item = { title: string; description: string; href: string };

function Card({
  item,
  index,
  cta,
}: {
  item: Item;
  index: number;
  cta: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();

  // Scroll-linked entrance: the card starts low, tilted and dim, then settles flat.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 1", "start 0.5"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.6 });
  const tilt = index % 2 === 0 ? 4 : -5; // alternating lean, as in the recording
  const y = useTransform(p, [0, 1], [150, 0]);
  const rotateX = useTransform(p, [0, 1], [32, 0]);
  const rotateZ = useTransform(p, [0, 1], [tilt, 0]);
  const scale = useTransform(p, [0, 1], [0.94, 1]);
  const opacity = useTransform(p, [0, 1], [0.3, 1]);

  return (
    <motion.li
      ref={ref}
      style={
        reduce
          ? undefined
          : { y, rotateX, rotateZ, scale, opacity, transformPerspective: 1100 }
      }
      className="[transform-style:preserve-3d]"
    >
      <Link
        href={item.href}
        className="card-noise group/card relative flex h-full min-h-[26rem] w-full flex-col overflow-hidden rounded-xl bg-[#f1f1f1] p-6 text-ink transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_28px_60px_-24px_rgba(1,101,232,0.65)]"
      >
        {/* Hover: a brand-blue fill sweeps up from the bottom and the card content turns white. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-electric to-navy transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-y-100"
        >
          <FlagMark className="absolute -bottom-8 -right-8 h-48 w-48 text-white/10" />
        </span>

        <motion.span
          className="relative block w-fit"
          whileHover={{ y: -3, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <GlassIcon index={index} size={64} />
        </motion.span>

        <div className="relative mt-auto">
          <p className="flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 group-hover/card:text-white">
            <span className="h-2 w-2 rounded-full bg-electric transition-colors duration-300 group-hover/card:bg-white" />
            Solution {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-xl font-normal leading-snug tracking-tight text-deep transition-colors duration-300 group-hover/card:text-white">
            {item.title}
          </h3>
          <span
            aria-hidden="true"
            className="mt-5 block h-px bg-ink/20 transition-colors duration-300 group-hover/card:bg-white/35"
          />
          <p className="mt-4 text-sm leading-relaxed text-ink/65 transition-colors duration-300 group-hover/card:text-white/85">
            {item.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-electric transition-colors duration-300 group-hover/card:text-white">
            {cta}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.li>
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

      {/* Cards start below the title: 4 in the first row, 3 in the second */}
      <ul className="mt-14 grid gap-5 [perspective:1100px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Card key={item.title} item={item} index={i} cta={cardCta} />
        ))}
      </ul>
    </>
  );
}
