"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FlagMark from "./FlagMark";
import { Reveal } from "./motion";
import type { Director } from "@/content/leadership";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** Photo, or a brand-gradient initials panel when no photo is available. */
export function DirectorPhoto({ d, sizes }: { d: Director; sizes: string }) {
  if (d.photo) {
    return (
      <Image
        src={d.photo}
        alt={`${d.name}, ${d.role}, ${d.org}`}
        fill
        unoptimized
        sizes={sizes}
        className="object-cover object-top"
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={d.name}
      className="absolute inset-0 grid place-items-center bg-gradient-to-br from-electric via-navy to-deep"
    >
      <FlagMark className="absolute bottom-5 right-5 h-36 w-36 text-white/10" />
      <span className="relative text-6xl font-bold tracking-tight text-white/90">{initials(d.name)}</span>
    </div>
  );
}

export default function DirectorCard({ d, index }: { d: Director; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={(index % 3) * 0.1}>
      <article className="group">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-mist">
          <div className="absolute inset-0 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
            <DirectorPhoto d={d} sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep/50 to-transparent" />
        </div>

        <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy">{d.name}</h3>
        <p className="mt-1 text-sm font-medium text-electric">{d.role}</p>
        <p className="text-sm text-ink/60">{d.org}</p>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={`bio-${d.slug}`}
          onClick={() => setOpen(!open)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-electric"
        >
          {open ? "Hide biography" : "Read biography"}
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <div
          id={`bio-${d.slug}`}
          className={`grid transition-[grid-template-rows] duration-500 ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 pt-4 text-sm leading-relaxed text-ink/70">
              {d.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
