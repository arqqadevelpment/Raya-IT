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
      <FlagMark className="pointer-events-none absolute -right-8 -top-8 h-80 w-80 text-electric/25" />
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
