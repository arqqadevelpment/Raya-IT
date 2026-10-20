"use client";

// Motion primitives modelled on the Protexy reference: staggered word reveals, fade-up sections,
// stat counters, pixel-mosaic image reveals, scroll-linked text, spotlight cards and marquees.
// <MotionProvider> makes every transform animation respect prefers-reduced-motion.

import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// Two ways to split a tile into two triangles; alternated in a checkerboard for a faceted look.
const TRI_A = ["polygon(0 0, 100% 0, 0 100%)", "polygon(100% 0, 100% 100%, 0 100%)"];
const TRI_B = ["polygon(0 0, 100% 0, 100% 100%)", "polygon(0 0, 100% 100%, 0 100%)"];

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Headline that reveals word by word; everything from `accent` onward takes the accent colour. */
export function SplitHeading({
  text,
  accent,
  as: Tag = "h2",
  className = "",
  accentClassName = "text-sky",
  delay = 0,
  once = true,
}: {
  text: string;
  accent?: string;
  as?: ElementType;
  className?: string;
  accentClassName?: string;
  delay?: number;
  once?: boolean;
}) {
  const accentAt = accent ? text.indexOf(accent) : -1;
  const split = text.split(" ");
  const words = split.map((w, i) => {
    const start = split.slice(0, i).join(" ").length + (i > 0 ? 1 : 0);
    return { w, accent: accentAt >= 0 && start >= accentAt };
  });

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "0px 0px -80px 0px" }}
        transition={{ staggerChildren: 0.07, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]">
              <motion.span
                className={`inline-block ${word.accent ? accentClassName : ""}`}
                variants={{ hidden: { y: "115%" }, show: { y: 0 } }}
                transition={{ duration: 0.75, ease }}
              >
                {word.w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function Counter({
  to,
  suffix = "",
  group = true,
  className,
}: {
  to: number;
  suffix?: string;
  group?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  const text = group ? n.toLocaleString("en-US") : String(n);
  return (
    <span ref={ref} className={className}>
      {text}
      {suffix}
    </span>
  );
}

/** Pixel-mosaic reveal (as on the reference's image blocks): a tile grid that dissolves in random order. */
export function PixelReveal({
  children,
  className = "",
  cols = 8,
  rows = 6,
  coverClassName = "bg-deep",
  shape = "rect",
}: {
  children: ReactNode;
  className?: string;
  cols?: number;
  rows?: number;
  coverClassName?: string;
  /** "triangle" splits every tile into two triangles (brand flag motif) that dissolve independently. */
  shape?: "rect" | "triangle";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const count = cols * rows;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
      {!reduce && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
        >
          {Array.from({ length: count }, (_, i) =>
            shape === "triangle" ? (
              <span key={i} className="relative block">
                {[0, 1].map((k) => (
                  <motion.span
                    key={k}
                    className={`absolute inset-0 ${coverClassName}`}
                    style={{ clipPath: ((i + Math.floor(i / cols)) % 2 === 0 ? TRI_A : TRI_B)[k] }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: inView ? 0 : 1 }}
                    transition={{ duration: 0.3, delay: ((((i * 2 + k) * 7919) % 97) / 97) * 0.8 }}
                  />
                ))}
              </span>
            ) : (
              <motion.span
                key={i}
                className={coverClassName}
                initial={{ opacity: 1 }}
                animate={{ opacity: inView ? 0 : 1 }}
                // deterministic pseudo-random delay so server and client markup match
                transition={{ duration: 0.25, delay: (((i * 7919) % 97) / 97) * 0.7 }}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

/** Text whose words light up as the section scrolls through the viewport. */
export function ScrollWords({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word
            key={i}
            word={w}
            progress={scrollYProgress}
            range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
          />
        ))}
      </span>
    </Tag>
  );
}

/** Card with a cursor-following highlight. */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={`group/card relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(137,193,240,0.18), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}

export function Marquee({
  children,
  duration = 45,
  reverse = false,
  fade = true,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  /** Soft fade at both edges. */
  fade?: boolean;
}) {
  return (
    <div
      className={`marquee overflow-hidden ${
        fade ? "[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]" : ""
      }`}
    >
      <div
        className={`marquee-track flex w-max gap-4 ${reverse ? "reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {children}
        {/* second copy for the seamless loop: hidden from assistive tech and not focusable */}
        <div aria-hidden="true" inert className="flex gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Background layer that drifts slower than the page (parallax). Children fill the layer. */
export function ParallaxBg({
  children,
  strength = 14,
  className = "",
}: {
  children: ReactNode;
  /** Travel in % of the layer height, in each direction. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} aria-hidden="true" className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Layer is taller than the section so the drift never reveals an edge. */}
      <motion.div
        style={reduce ? { top: 0, bottom: 0 } : { y, top: `-${strength}%`, bottom: `-${strength}%` }}
        className="absolute inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Floating flag-mark composition for the hero, with scroll parallax. */
export function HeroVisual({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);

  const tri = [
    { d: "M0 35 68 0v70Z", fill: "#0165E8", float: -10, delay: 0 },
    { d: "M148 35 80 0v70Z", fill: "#89C1F0", float: 12, delay: 0.6 },
    { d: "M0 113 68 78v70Z", fill: "#2460AC", float: 14, delay: 1.2 },
    { d: "M148 113 80 78v70Z", fill: "#FFFFFF", float: -12, delay: 1.8 },
  ];

  return (
    <motion.div ref={ref} style={{ y, rotate }} className={className} aria-hidden="true">
      <div className="absolute inset-0 -z-10 rounded-full bg-electric/30 blur-[90px]" />
      <svg viewBox="-6 -6 160 160" className="h-full w-full overflow-visible">
        {tri.map((t, i) => (
          <motion.path
            key={i}
            d={t.d}
            fill={t.fill}
            fillOpacity={i === 3 ? 0.14 : 0.9}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, t.float, 0] }}
            transition={{
              opacity: { duration: 0.9, delay: 0.3 + i * 0.12 },
              scale: { duration: 0.9, delay: 0.3 + i * 0.12, ease },
              y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: t.delay },
            }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
