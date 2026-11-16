import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FlagMark from "./FlagMark";
import { Container, Eyebrow } from "./ui";
import type { Crumb } from "@/lib/site-map";

export default function PageHero({
  title,
  eyebrow,
  intro,
  trail,
}: {
  title: string;
  eyebrow?: string;
  intro?: ReactNode;
  trail: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Emblem is centred in the area BELOW the header bar (top-[4.5rem]) so the header never covers it. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[4.5rem]">
        <FlagMark className="absolute right-6 top-1/2 aspect-square h-[78%] -translate-y-1/2 text-electric/25 sm:right-12" />
      </div>
      <Container className="relative pb-14 pt-32 sm:pb-20 sm:pt-40">
        <Breadcrumbs trail={trail} current={title} onDark />
        <div className="mt-8 max-w-3xl">
          {eyebrow && <Eyebrow onDark>{eyebrow}</Eyebrow>}
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 text-lg leading-relaxed text-white/80">{intro}</p>}
        </div>
      </Container>
    </section>
  );
}
