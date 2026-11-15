"use client";

// Visuals for the About page: a journey timeline and a regional-presence network map.

import { motion, useReducedMotion } from "motion/react";
import { Counter } from "./motion";
import { MAP_H, MAP_LAT1, MAP_LON0, MAP_SCALE, MAP_W, WORLD_DOTS } from "./worldDots";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- Journey timeline ---------- */

export function JourneyTimeline() {
  return (
    <div className="mt-14">
      <div className="relative flex items-center">
        <span className="relative z-10 h-4 w-4 shrink-0 rounded-full bg-electric ring-8 ring-electric/15" />
        <div className="relative mx-2 h-px flex-1 bg-navy/15">
          <motion.div
            className="absolute inset-0 origin-left bg-gradient-to-r from-electric to-sky"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 1.8, ease }}
          />
          {/* Intermediate milestones are not supplied yet. */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-mist bg-surface px-4 py-1.5 text-xs font-medium text-ink/55">
            More milestones to be added
          </span>
        </div>
        <span className="relative z-10 h-4 w-4 shrink-0 rounded-full bg-navy ring-8 ring-navy/10" />
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-5xl font-bold tracking-tight text-navy sm:text-6xl">1998</p>
          <p className="mt-3 text-lg font-semibold text-navy">Established</p>
          <p className="mt-2 max-w-sm text-ink/65">
            Founded with a vision to lead the information technology market through a dynamic portfolio.
          </p>
        </div>
        <div className="md:text-right">
          <p className="text-5xl font-bold tracking-tight text-electric sm:text-6xl">Today</p>
          <ul className="mt-4 space-y-1.5 text-lg text-navy md:ml-auto">
            <li>
              <span className="font-semibold">
                <Counter to={1000} suffix="+" />
              </span>{" "}
              customers
            </li>
            <li>
              <span className="font-semibold">
                <Counter to={1500} suffix="+" />
              </span>{" "}
              qualified experts
            </li>
            <li>
              <span className="font-semibold">
                <Counter to={6} />
              </span>{" "}
              subsidiaries
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Regional presence ---------- */

type Pin = {
  id: string;
  name: string;
  sub: string;
  lon: number;
  lat: number;
  label: "above" | "below" | "right" | "left" | "none";
};

const W = MAP_W;
const H = MAP_H;
const px = (lon: number) => (lon - MAP_LON0) * MAP_SCALE;
const py = (lat: number) => (MAP_LAT1 - lat) * MAP_SCALE;

const pins: Pin[] = [
  { id: "cairo", name: "Egypt", sub: "Head Office", lon: 31.2, lat: 30.0, label: "left" },
  { id: "riyadh", name: "Saudi Arabia", sub: "Riyadh", lon: 46.7, lat: 24.7, label: "below" },
  { id: "dubai", name: "UAE", sub: "Dubai · Abu Dhabi", lon: 55.3, lat: 25.2, label: "above" },
  { id: "abudhabi", name: "", sub: "", lon: 54.4, lat: 24.4, label: "none" },
  { id: "dar", name: "East Africa", sub: "Dar Es Salaam", lon: 39.3, lat: -6.8, label: "right" },
];

const hq = pins[0];

function arc(a: Pin, b: Pin) {
  const x1 = px(a.lon), y1 = py(a.lat), x2 = px(b.lon), y2 = py(b.lat);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.max(40, Math.abs(x2 - x1) * 0.32);
  return `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`;
}

export function RegionNetwork() {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="World map with Raya IT offices in Egypt, Saudi Arabia, the UAE and East Africa"
      className="h-auto w-full"
    >
      <defs>
        <radialGradient id="glow" cx="0.55" cy="0.42" r="0.5">
          <stop offset="0" stopColor="#0165E8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#0165E8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#89C1F0" />
          <stop offset="1" stopColor="#0165E8" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#glow)" />

      {/* dotted world map */}
      <motion.path
        d={WORLD_DOTS}
        fill="none"
        stroke="#89C1F0"
        strokeWidth="3.4"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.55 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      {/* connections from the head office */}
      {pins.slice(1).map((p, i) => (
        <motion.path
          key={p.id}
          d={arc(hq, p)}
          fill="none"
          stroke="url(#arc)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.95 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 1.4, ease, delay: 0.4 + i * 0.18 }}
        />
      ))}

      {pins.map((p, i) => {
        const x = px(p.lon);
        const y = py(p.lat);
        const anchor = p.label === "left" ? "end" : p.label === "right" ? "start" : "middle";
        const lx = p.label === "right" ? x + 20 : p.label === "left" ? x - 20 : x;
        const ny =
          p.label === "above" ? y - 44 : p.label === "below" ? y + 42 : y + 2; // name baseline
        return (
          <motion.g
            key={p.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
          >
            {!reduce && (
              <motion.circle
                cx={x}
                cy={y}
                fill="none"
                stroke="#89C1F0"
                strokeWidth="1.5"
                initial={{ r: 7, opacity: 0.7 }}
                animate={{ r: 26, opacity: 0 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 0.35 }}
              />
            )}
            <circle cx={x} cy={y} r={i === 0 ? 9 : 7} fill={i === 0 ? "#fff" : "#89C1F0"} />
            <circle cx={x} cy={y} r={i === 0 ? 4 : 3} fill="#0165E8" />
            {p.label !== "none" && (
              <>
                <text x={lx} y={ny} textAnchor={anchor} fontSize="23" fontWeight="600" fill="#fff">
                  {p.name}
                </text>
                <text x={lx} y={ny + 22} textAnchor={anchor} fontSize="17" fill="#fff" fillOpacity="0.7">
                  {p.sub}
                </text>
              </>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}
