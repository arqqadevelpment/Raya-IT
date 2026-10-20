"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  ArrowRight,
  Database,
  Layers,
  LifeBuoy,
  BrainCircuit,
  Plus,
  ServerCog,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import FlagMark from "./FlagMark";

type Item = { title: string; description: string; href: string; image?: string };

const icons: LucideIcon[] = [ServerCog, ShieldCheck, Layers, BrainCircuit, Database, LifeBuoy];

/** Floating preview that follows the cursor. Shows the service image, or a branded placeholder. */
function Preview({ item, index }: { item: Item; index: number }) {
  const [failed, setFailed] = useState(false);
  const Icon = icons[index] ?? Layers;
  const showImage = item.image && !failed;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-navy">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt=""
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-electric via-navy to-deep p-5 text-white">
          <FlagMark className="absolute -bottom-6 -right-6 h-36 w-36 text-white/15" />
          <Icon size={34} strokeWidth={1.25} aria-hidden="true" />
          <p className="relative max-w-[12rem] text-lg font-semibold leading-snug">{item.title}</p>
        </div>
      )}
    </div>
  );
}

export default function ServicesAccordion({ items, cta }: { items: Item[]; cta: string }) {
  const [open, setOpen] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  // false on the server and during hydration, true afterwards (portal target only exists client-side).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Cursor-follow position (spring-smoothed).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 28, mass: 0.5 });

  const track = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mx.set(e.clientX + 28);
    my.set(e.clientY - 110);
  };

  return (
    <>
      <ul
        className="divide-y divide-navy/15 border-y border-navy/15"
        onPointerMove={track}
        onPointerLeave={() => setHover(null)}
      >
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li
              key={item.title}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                track(e);
                x.jump(e.clientX + 28);
                y.jump(e.clientY - 110);
                setHover(i);
              }}
              onPointerLeave={() => setHover(null)}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${i}`}
                  onClick={() => {
                    setOpen(isOpen ? -1 : i);
                    // Clicking a service hides the floating image; it returns on entering another row.
                    setHover(null);
                  }}
                  className="group flex w-full items-center gap-5 py-6 text-left"
                >
                  <span className="w-8 text-sm font-semibold tabular-nums text-electric">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 text-xl font-semibold tracking-tight transition-colors sm:text-2xl ${
                      isOpen || hover === i ? "text-navy" : "text-navy/60"
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

      {/* Floating image box (portal avoids transformed ancestors breaking position: fixed). */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                key="service-preview"
                aria-hidden="true"
                style={{ x, y }}
                className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[13.5rem] w-[19rem] md:block"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <div className="h-full w-full rounded-2xl shadow-[0_30px_70px_-20px_rgba(0,10,61,0.6)]">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={hover}
                      className="h-full w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Preview item={items[hover]} index={hover} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
