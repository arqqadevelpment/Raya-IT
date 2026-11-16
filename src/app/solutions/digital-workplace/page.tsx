import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Reveal, SplitHeading } from "@/components/motion";
import { ButtonLink, Container } from "@/components/ui";
import { digitalWorkplace } from "@/content/digital-workplace";

export const metadata: Metadata = { title: "Digital Workplace Solutions" };

export default function DigitalWorkplacePage() {
  return (
    <>
      <PageHero
        title="Digital Workplace Solutions"
        trail={[{ title: "Solutions", href: "/solutions" }]}
        intro={digitalWorkplace.intro}
      />

      {digitalWorkplace.sections.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            className={`${i % 2 === 0 ? "bg-white" : "bg-surface"} py-20 sm:py-28`}
          >
            <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal className={flip ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 40rem, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <div className={flip ? "lg:order-1" : ""}>
                <SplitHeading
                  text={s.title}
                  accent={s.accent}
                  accentClassName="text-electric"
                  className="text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
                />
                <p className="mt-6 text-base leading-relaxed text-ink/70">{s.summary}</p>
                <ul className="mt-6 space-y-2.5">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-base text-navy">
                      <Check size={20} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href={s.href} tone="light">Learn more</ButtonLink>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

    </>
  );
}
