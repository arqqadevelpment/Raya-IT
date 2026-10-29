"use client";

import { useEffect, useRef } from "react";

const SRC = "/digital-data-technology-network-connection-backgro-2026-10-03-16-57-05-utc.mp4";

// Looping background video. Stays paused (first frame) for visitors who prefer reduced motion.
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
    }
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-deep">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={SRC} type="video/mp4" />
      </video>
      {/* Keeps headline and buttons legible over the footage. */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/35 to-deep/80" />
    </div>
  );
}
