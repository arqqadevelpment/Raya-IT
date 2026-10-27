"use client";

// Glassy 3D-style icons for the Solutions cards: translucent blue glass with a white highlight,
// a soft blue shadow and small gold accents. Pure SVG, so they stay sharp at any size.

import { useId } from "react";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      {/* glass body: light top-left to deeper blue bottom-right */}
      <linearGradient id={`gl-${id}`} x1="0.1" y1="0" x2="0.9" y2="1">
        <stop offset="0" stopColor="#E4F2FF" stopOpacity="0.95" />
        <stop offset="0.45" stopColor="#7DB9FF" stopOpacity="0.8" />
        <stop offset="1" stopColor="#1F66F2" stopOpacity="0.92" />
      </linearGradient>
      {/* glossy highlight over the upper half */}
      <linearGradient id={`sh-${id}`} x1="0" y1="0" x2="0.6" y2="0.9">
        <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0.08" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      {/* gold accent */}
      <linearGradient id={`au-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFEDB0" />
        <stop offset="0.5" stopColor="#EBBB4C" />
        <stop offset="1" stopColor="#B8812A" />
      </linearGradient>
      <filter id={`sd-${id}`} x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#0165E8" floodOpacity="0.38" />
      </filter>
    </defs>
  );
}

type P = { id: string };

const stroke = { stroke: "#fff", strokeOpacity: 0.85, strokeWidth: 1 } as const;

// 01 Cloud & Digital Infrastructure
function Cloud({ id }: P) {
  const d = "M19 47h27a11 11 0 0 0 1.6-21.9A15 15 0 0 0 19.4 28 10 10 0 0 0 19 47Z";
  return (
    <g>
      <g filter={`url(#sd-${id})`}>
        <path d={d} fill={`url(#gl-${id})`} {...stroke} />
        <path d={d} fill={`url(#sh-${id})`} />
      </g>
      <path
        d="M32 43V31m0 0-4.6 4.6M32 31l4.6 4.6"
        fill="none"
        stroke={`url(#au-${id})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

// 02 Cyber Security
function Shield({ id }: P) {
  const d = "M32 8l20 7.5v14.5C52 43.5 43.5 52.5 32 57 20.5 52.5 12 43.5 12 30V15.5L32 8Z";
  return (
    <g>
      <g filter={`url(#sd-${id})`}>
        <path d={d} fill={`url(#gl-${id})`} {...stroke} />
        <path d={d} fill={`url(#sh-${id})`} />
      </g>
      <path
        d="M23 32l6.5 6.5L42 25"
        fill="none"
        stroke={`url(#au-${id})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

// 03 Digital Workplace
function Workplace({ id }: P) {
  return (
    <g>
      <g filter={`url(#sd-${id})`}>
        <rect x="6" y="11" width="38" height="27" rx="5" fill={`url(#gl-${id})`} {...stroke} />
        <rect x="6" y="11" width="38" height="27" rx="5" fill={`url(#sh-${id})`} />
        <rect x="21" y="39.5" width="8" height="5" fill={`url(#gl-${id})`} {...stroke} />
        <rect x="15" y="45" width="20" height="3.5" rx="1.75" fill={`url(#au-${id})`} />
        <rect x="42" y="25" width="16" height="28" rx="4.5" fill={`url(#gl-${id})`} {...stroke} />
        <rect x="42" y="25" width="16" height="28" rx="4.5" fill={`url(#sh-${id})`} />
      </g>
      <rect x="12" y="21" width="20" height="3.4" rx="1.7" fill={`url(#au-${id})`} />
      <circle cx="50" cy="48" r="2" fill={`url(#au-${id})`} />
    </g>
  );
}

// 04 Enterprise Applications & Software (layers)
function Layers({ id }: P) {
  const diamond = (y: number) =>
    `M32 ${y}L55 ${y + 10.5}L32 ${y + 21}L9 ${y + 10.5}Z`;
  return (
    <g filter={`url(#sd-${id})`}>
      <path d={diamond(36)} fill={`url(#gl-${id})`} {...stroke} />
      <path d={diamond(25)} fill={`url(#gl-${id})`} {...stroke} />
      <path d={diamond(14)} fill={`url(#gl-${id})`} stroke={`url(#au-${id})`} strokeWidth="2" />
      <path d={diamond(14)} fill={`url(#sh-${id})`} />
    </g>
  );
}

// 05 Digital Intelligence (AI chip)
function Chip({ id }: P) {
  const pins = [24, 32, 40];
  return (
    <g>
      {pins.map((p) => (
        <g key={p} fill={`url(#au-${id})`}>
          <rect x="8" y={p - 1.5} width="8" height="3" rx="1.5" />
          <rect x="48" y={p - 1.5} width="8" height="3" rx="1.5" />
          <rect x={p - 1.5} y="8" width="3" height="8" rx="1.5" />
          <rect x={p - 1.5} y="48" width="3" height="8" rx="1.5" />
        </g>
      ))}
      <g filter={`url(#sd-${id})`}>
        <rect x="15" y="15" width="34" height="34" rx="9" fill={`url(#gl-${id})`} {...stroke} />
        <rect x="15" y="15" width="34" height="34" rx="9" fill={`url(#sh-${id})`} />
      </g>
      <circle cx="32" cy="32" r="7.5" fill={`url(#au-${id})`} />
      <ellipse cx="29.6" cy="29.2" rx="3" ry="2" fill="#fff" fillOpacity="0.65" />
    </g>
  );
}

// 06 Telco (antenna tower)
function Tower({ id }: P) {
  const gold = {
    fill: "none",
    stroke: `url(#au-${id})`,
    strokeWidth: 2.8,
    strokeLinecap: "round" as const,
  };
  return (
    <g>
      <g filter={`url(#sd-${id})`}>
        <path d="M32 27L45 57H19Z" fill={`url(#gl-${id})`} {...stroke} />
        <path d="M32 27L45 57H19Z" fill={`url(#sh-${id})`} />
      </g>
      <path d="M25.5 43h13M22 51h20" stroke="#fff" strokeOpacity="0.75" strokeWidth="1.4" />
      <circle cx="32" cy="22" r="4.4" fill={`url(#au-${id})`} />
      <path d="M24.5 15.5a11 11 0 0 0 0 13" {...gold} />
      <path d="M39.5 15.5a11 11 0 0 1 0 13" {...gold} />
      <path d="M18.5 10.5a19 19 0 0 0 0 23" {...gold} opacity="0.7" />
      <path d="M45.5 10.5a19 19 0 0 1 0 23" {...gold} opacity="0.7" />
    </g>
  );
}

// 07 ATM & Self-Services (card)
function Card({ id }: P) {
  return (
    <g>
      <g filter={`url(#sd-${id})`}>
        <rect x="6" y="15" width="52" height="34" rx="7" fill={`url(#gl-${id})`} {...stroke} />
        <rect x="6" y="15" width="52" height="34" rx="7" fill={`url(#sh-${id})`} />
      </g>
      <rect x="6" y="21" width="52" height="7.5" fill={`url(#au-${id})`} />
      <rect x="12" y="36" width="15" height="2.6" rx="1.3" fill="#fff" fillOpacity="0.85" />
      <rect x="12" y="41" width="9" height="2.6" rx="1.3" fill="#fff" fillOpacity="0.85" />
      <circle cx="46" cy="39.5" r="6" fill={`url(#au-${id})`} />
      <text x="46" y="42.6" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#7A5210">
        $
      </text>
    </g>
  );
}

const icons = [Cloud, Shield, Workplace, Layers, Chip, Tower, Card];

export default function GlassIcon({ index, size = 64 }: { index: number; size?: number }) {
  const id = useId().replace(/:/g, "");
  const Icon = icons[index] ?? Cloud;
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      className="overflow-visible"
    >
      <Defs id={id} />
      <Icon id={id} />
    </svg>
  );
}
