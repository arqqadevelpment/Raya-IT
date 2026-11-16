import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Counter, PixelReveal, Reveal, SplitHeading } from "@/components/motion";
import { ButtonLink, Container } from "@/components/ui";
import { businesses } from "@/content/businesses";

export const metadata: Metadata = { title: "Our Businesses" };

export default function OurBusinessesPage() {
  return (
    <>
      <PageHero title="Our Businesses" trail={[{ title: "Who We Are" }]} />

      <nav aria-label="On this page" className="sticky top-[100px] z-30 border-b border-mist bg-white">
        <Container className="flex gap-6 overflow-x-auto py-3 text-sm font-medium">
          {businesses.map((b) => (
            <a key={b.id} href={`#${b.id}`} className="whitespace-nowrap text-navy hover:text-electric">
              {b.name}
            </a>
          ))}
        </Container>
      </nav>

      {businesses.map((b, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={b.id}
            id={b.id}
            className={`scroll-mt-32 py-20 sm:py-28 ${i % 2 === 0 ? "bg-white" : "bg-surface"}`}
          >
            <Container className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-20">
              <PixelReveal
                className={`relative min-h-[20rem] w-full rounded-3xl lg:min-h-0 ${flip ? "lg:order-2" : ""}`}
                coverClassName={i % 2 === 0 ? "bg-white" : "bg-surface"}
                shape="triangle"
                cols={4}
                rows={3}
              >
                {b.zoomOut ? (
                  <>
                    <Image
                      src={b.image}
                      alt=""
                      fill
                      unoptimized
                      aria-hidden="true"
                      sizes="(min-width: 1024px) 40rem, 100vw"
                      className="scale-110 object-cover blur-2xl"
                    />
                    <div
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                      style={{
                        height: `${b.zoomOut * 100}%`,
                        maskImage:
                          "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
                      }}
                    >
                      <Image
                        src={b.image}
                        alt={`${b.name}`}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 40rem, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <Image
                    src={b.image}
                    alt={`${b.name}`}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 40rem, 100vw"
                    className="object-cover"
                  />
                )}
              </PixelReveal>

              <div className={flip ? "lg:order-1" : ""}>
                <Reveal>
                  <p className="text-base text-grey">{String(i + 1).padStart(2, "0")}</p>
                </Reveal>
                <SplitHeading
                  text={b.name}
                  accent={b.accent}
                  accentClassName="text-electric"
                  className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
                />
                <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/70 sm:text-lg">
                  {b.paragraphs.map((p, k) => (
                    <Reveal key={k} delay={0.1 + 0.08 * k}>
                      <p>{p}</p>
                    </Reveal>
                  ))}
                </div>

                {b.stats.length > 0 && (
                  <Reveal delay={0.2} className="mt-8">
                    <dl className="grid overflow-hidden rounded-2xl border border-mist bg-white sm:grid-cols-2">
                      {b.stats.map((s) => (
                        <div key={s.label} className="flex flex-col border-b border-mist p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                          <dd className="order-1 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                            <Counter to={s.to} suffix={s.suffix ?? ""} group={false} />
                          </dd>
                          <dt className="order-2 mt-2 text-sm leading-snug text-ink/65">{s.label}</dt>
                        </div>
                      ))}
                    </dl>
                  </Reveal>
                )}

                {b.href && (
                  <Reveal delay={0.25} className="mt-8">
                    <ButtonLink href={b.href} tone="light">
                      Visit website
                      <span className="sr-only"> (opens in a new tab)</span>
                    </ButtonLink>
                  </Reveal>
                )}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
