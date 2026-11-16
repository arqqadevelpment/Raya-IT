"use client";

// Services as an orbit: an animated dot-mesh sphere in the centre, a dashed ring around it and one
// numbered node per service on the ring. Hover / focus / tap a node to read that service below.
// The sphere is a canvas port of the supplied "Animated Dot Mesh" (public/index.html), recoloured
// for the dark section.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Item = { title: string; description: string; href: string };

/** Animated dot-mesh sphere. Transparent background so it sits on any dark section. */
function DotSphere() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = 62; // density (original: 100). Lower = lighter on the CPU.
    const morph = 0.28;
    let W = 0;
    let H = 0;
    let t = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;

    // base unit-sphere directions on a lat/long grid
    const list: number[] = [];
    for (let i = 1; i < N; i++) {
      const phi = (Math.PI * i) / N;
      const sp = Math.sin(phi);
      const cp = Math.cos(phi);
      const n = Math.max(8, Math.round(N * 2 * sp));
      for (let j = 0; j < n; j++) {
        const th = (2 * Math.PI * j) / n;
        list.push(sp * Math.cos(th), cp, sp * Math.sin(th));
      }
    }
    const dirs = new Float32Array(list);
    const count = dirs.length / 3;
    const px = new Float32Array(count);
    const py = new Float32Array(count);
    const pz = new Float32Array(count);

    const field = (x: number, y: number, z: number, tt: number) => {
      const a = Math.sin(2.1 * x + 1.3 * y + tt * 0.9) * Math.cos(1.7 * y - 1.9 * z + tt * 0.7);
      const b = Math.sin(3.2 * z + 2.4 * x - tt * 1.1 + a) * 0.6;
      const ridge = Math.abs(Math.sin(2.6 * y + 1.8 * z + tt * 0.6 + 1.5 * a)) * 0.5;
      return a + b + ridge - 0.25;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      W = cv.width = Math.max(1, Math.round(r.width * dpr));
      H = cv.height = Math.max(1, Math.round(r.height * dpr));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const S = Math.min(W, H) * 0.31;
      const cx = W / 2;
      const cy = H / 2;
      const ry = t * 0.35;
      const rx = 0.35 + Math.sin(t * 0.23) * 0.2;
      const cyw = Math.cos(ry);
      const syw = Math.sin(ry);
      const cxw = Math.cos(rx);
      const sxw = Math.sin(rx);

      let zmin = 9;
      let zmax = -9;
      for (let i = 0; i < count; i++) {
        const x = dirs[3 * i];
        const y = dirs[3 * i + 1];
        const z = dirs[3 * i + 2];
        const r = 1 + morph * field(x, y, z, t);
        const X = x * r;
        const Y = y * r;
        const Z = z * r;
        const X1 = X * cyw + Z * syw;
        const Z1 = -X * syw + Z * cyw;
        const Y2 = Y * cxw - Z1 * sxw;
        const Z2 = Y * sxw + Z1 * cxw;
        px[i] = cx + X1 * S;
        py[i] = cy + Y2 * S;
        pz[i] = Z2;
        if (Z2 < zmin) zmin = Z2;
        if (Z2 > zmax) zmax = Z2;
      }

      // bucket by depth: far points small / dim, near points larger / bright
      const B = 6;
      const base = Math.max(0.9, S * 0.0075);
      for (let b = 0; b < B; b++) {
        const k = b / (B - 1);
        ctx.beginPath();
        const rad = base * (0.55 + 0.85 * k);
        for (let i = 0; i < count; i++) {
          const d = (pz[i] - zmin) / (zmax - zmin + 1e-6);
          if (Math.min(B - 1, Math.floor(d * B)) !== b) continue;
          ctx.moveTo(px[i] + rad, py[i]);
          ctx.arc(px[i], py[i], rad, 0, 6.2832);
        }
        // Raya blues for a light background: far = pale, near = saturated electric
        const hue = 222 - 6 * k;
        const light = 62 - 16 * k;
        ctx.fillStyle = `hsla(${hue},100%,${light}%,${0.3 + 0.7 * k})`;
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      if (visible) draw();
      raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(cv);

    if (reduce) {
      t = 2;
      draw();
    } else {
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

export default function ServicesOrbit({ items, cta }: { items: Item[]; cta: string }) {
  const [active, setActive] = useState<number | null>(null);
  const n = items.length;

  // Dark glass card (whole card is the link).
  const card = (item: Item, i: number) => (
    <Link
      href={item.href}
      className="block w-72 rounded-2xl border border-white/10 bg-gradient-to-br from-navy/90 via-deep to-deep p-6 text-left shadow-[0_24px_60px_-18px_rgba(0,10,61,0.7)] backdrop-blur-md sm:w-80"
    >
      <p className="bg-gradient-to-r from-electric to-sky bg-clip-text text-sm font-semibold tracking-[0.2em] text-transparent">
        {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
      </p>
      <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-white">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{item.description}</p>
      <span className="sr-only">{cta}</span>
    </Link>
  );

  return (
    <div
      className="relative mx-auto aspect-square w-[min(100%,30rem)] sm:w-[min(100%,34rem)]"
      onMouseLeave={() => setActive(null)}
    >
      {/* soft glow behind the sphere */}
      <div className="pointer-events-none absolute inset-[18%] rounded-full bg-electric/15 blur-3xl" />
      {/* dashed ring */}
      <div className="pointer-events-none absolute inset-[6%] rounded-full border border-dashed border-navy/25" />
      {/* sphere */}
      <div className="absolute inset-[14%]">
        <DotSphere />
      </div>

      {items.map((item, i) => {
        const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const isActive = i === active;
        const labelPos =
          cos > 0.3
            ? "left-full ml-4 text-left"
            : cos < -0.3
              ? "right-full mr-4 text-right"
              : sin < 0
                ? "bottom-full mb-4 left-1/2 -translate-x-1/2 text-center"
                : "top-full mt-4 left-1/2 -translate-x-1/2 text-center";
        // Hover card sits just outside the node; its padding (not a margin) keeps the hover unbroken.
        const cardPos =
          cos > 0.3
            ? "left-full top-1/2 -translate-y-1/2 pl-4"
            : cos < -0.3
              ? "right-full top-1/2 -translate-y-1/2 pr-4"
              : "left-full top-1/2 -translate-y-1/2 pl-4"; // top / bottom nodes: card sits beside the number
        return (
          <div
            key={item.title}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${isActive ? "z-30" : "z-10"}`}
            style={{ left: `${50 + 44 * cos}%`, top: `${50 + 44 * sin}%` }}
            onMouseEnter={() => setActive(i)}
          >
            <button
              type="button"
              aria-label={`${String(i + 1).padStart(2, "0")} ${item.title}`}
              aria-expanded={isActive}
              onFocus={() => setActive(i)}
              onClick={() => setActive(isActive ? null : i)}
              className={`relative grid h-11 w-11 place-items-center rounded-full border text-sm font-semibold transition-all duration-300 sm:h-14 sm:w-14 sm:text-base ${
                isActive
                  ? "scale-110 border-sky bg-deep text-white shadow-[0_0_26px_-2px_rgba(1,101,232,0.85)]"
                  : "border-navy/15 bg-white text-navy shadow-[0_4px_16px_-6px_rgba(0,23,128,0.25)] hover:border-electric/50"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute hidden w-44 text-sm font-semibold leading-snug transition-colors duration-300 lg:block xl:w-52 xl:text-base ${labelPos} ${
                isActive ? "text-navy opacity-0" : "text-navy/55"
              }`}
            >
              {item.title}
            </span>
            {/* Large screens: card appears beside the hovered node */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute z-40 hidden lg:block ${cardPos}`}
                >
                  {card(item, i)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Small screens: card appears centred over the sphere */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={`m-${active}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 lg:hidden"
          >
            {card(items[active], active)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
