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
import {
  ArrowUpRight,
  Banknote,
  BrainCircuit,
  Cloud,
  Layers,
  MonitorSmartphone,
  RadioTower,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import FlagMark from "./FlagMark";
import { Reveal, SplitHeading } from "./motion";

type Item = { title: string; description: string; href: string };

const icons: LucideIcon[] = [
  Cloud,
  ShieldCheck,
  MonitorSmartphone,
  Layers,
  BrainCircuit,
  RadioTower,
  Banknote,
];

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
  const Icon = icons[index];

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
        className="card-noise group/card relative flex aspect-[4/5] min-h-[26rem] flex-col overflow-hidden rounded-xl bg-[#f1f1f1] p-7 text-ink transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_28px_60px_-24px_rgba(1,101,232,0.65)] sm:p-8"
      >
        {/* Hover: a brand-blue fill sweeps up from the bottom and the card content turns white. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-electric to-navy transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-y-100"
        >
          <FlagMark className="absolute -bottom-8 -right-8 h-48 w-48 text-white/10" />
        </span>

        <motion.span
          className="relative block w-fit text-electric transition-colors duration-300 group-hover/card:text-white"
          whileHover={{ rotate: -8, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <Icon size={52} strokeWidth={1} aria-hidden="true" />
        </motion.span>

        <div className="relative mt-auto">
          <p className="flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 group-hover/card:text-white">
            <span className="h-2 w-2 rounded-full bg-electric transition-colors duration-300 group-hover/card:bg-white" />
            Solution {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-2xl font-normal leading-snug tracking-tight text-deep transition-colors duration-300 group-hover/card:text-white">
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
    <ul className="grid gap-5 [perspective:1100px] md:grid-cols-2 lg:grid-cols-3">
      {/* Heading cell */}
      <li className="md:col-span-2 lg:col-span-1">
        <Reveal>
          <p className="text-base text-grey">{eyebrow}</p>
        </Reveal>
        <SplitHeading
          text={headline}
          accent={accent}
          className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
        />
      </li>

      {items.map((item, i) => (
        <Card key={item.title} item={item} index={i} cta={cardCta} />
      ))}

      {/* Closing cell: intro text + button */}
      <li className="flex flex-col justify-end md:col-span-2 lg:col-span-1">
        <Reveal>
          <p className="text-base leading-relaxed text-white/75">{text}</p>
        </Reveal>
      </li>
    </ul>
  );
}
