import Image from "next/image";
import {
} from "lucide-react";
import HeroNetwork from "@/components/HeroNetwork";
import IndustriesSlider from "@/components/IndustriesSlider";
import ServicesAccordion from "@/components/ServicesAccordion";
import SolutionsGrid from "@/components/SolutionCards";
import {
  Counter,
  Marquee,
  ParallaxBg,
  PixelReveal,
  Reveal,
  ScrollWords,
  SplitHeading,
} from "@/components/motion";
import { ButtonLink, Container } from "@/components/ui";
import {
  discover,
  hero,
  industries,
  partners,
  services,
  solutions,
  sustainability,
} from "@/content/home";
import { partnerLogos, type Partner } from "@/content/partners";

export default function Home() {
  return (
    <>
      {/* 01 — Hero: blue gradient field with a thin connected network that eases toward the cursor */}
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-gradient-to-br from-electric via-navy to-deep pt-28 text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <HeroNetwork />
          {/* Light tint keeps the text readable over the network. */}
          <div className="absolute inset-0 bg-gradient-to-b from-deep/20 via-transparent to-deep/30" />
        </div>

        <Container className="relative flex flex-1 flex-col items-center justify-center py-24 text-center">
          <SplitHeading
            as="h1"
            text={hero.headline}
            delay={0.15}
            className="whitespace-nowrap text-[clamp(1.6rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight"
          />
          <Reveal delay={0.55} className="mx-auto mt-8 max-w-2xl">
            <p className="text-lg leading-relaxed text-white/75">{hero.text}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href={hero.secondary.href} variant="outlineLight">
                {hero.secondary.label}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 02 — Discover Raya IT */}
      <section className="relative bg-white pb-24 pt-24 sm:pb-32 sm:pt-32">
        <Container className="grid items-stretch gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <div className="flex flex-col">
            <Reveal>
              <p className="text-base text-grey">{discover.eyebrow}</p>
            </Reveal>
            <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              <SplitHeading as="span" text="Your Technology Partner" className="block text-navy" />
              <SplitHeading
                as="span"
                text="for What’s Next."
                delay={0.2}
                className="block text-electric"
              />
            </h2>
            <div className="mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-ink/70 sm:text-lg">
              {discover.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 * i}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-8">
              <ButtonLink href={discover.cta.href}>{discover.cta.label}</ButtonLink>
            </Reveal>

            {/* Stats: one bordered container, divided cells */}
            <Reveal delay={0.1} className="mt-auto pt-12">
              <dl className="grid grid-cols-1 divide-y divide-mist overflow-hidden rounded-2xl border border-mist sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {discover.facts.map((f) => (
                  <div key={f.label} className="flex flex-col p-6">
                    <dd className="order-1 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                      <Counter to={f.to} suffix={f.suffix} group={f.group} />
                    </dd>
                    <dt className="order-2 mt-4 text-sm leading-snug text-ink/65">{f.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <PixelReveal
            className="relative min-h-[22rem] rounded-3xl lg:min-h-0"
            coverClassName="bg-white"
            shape="triangle"
            cols={4}
            rows={6}
          >
            <Image
              src="/images/who-we-are.webp"
              alt="Raya IT engineer reviewing a data center rack on a tablet"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
          </PixelReveal>
        </Container>
      </section>

      {/* 03 — Solutions */}
      <section className="relative overflow-hidden bg-deep py-24 text-white sm:py-32" id="solutions">
        <Container>
          <SolutionsGrid
            eyebrow={solutions.eyebrow}
            headline={solutions.headline}
            accent={solutions.accent}
            text={solutions.text}
            cardCta={solutions.cardCta}
            items={solutions.items}
          />
        </Container>
      </section>

      {/* 04 — Services (accordion) */}
      <section className="relative bg-surface py-24 sm:py-32" id="services">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-base text-grey">{services.eyebrow}</p>
            </Reveal>
            <SplitHeading
              text={services.headline}
              accent={services.accent}
              accentClassName="text-electric"
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-ink/70">{services.text}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ServicesAccordion items={services.items} cta={services.cardCta} />
          </Reveal>
        </Container>
      </section>

      {/* 05 — Industries */}
      <section className="bg-white py-24 sm:py-32" id="industries">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <Reveal>
                <p className="text-base text-grey">{industries.eyebrow}</p>
              </Reveal>
              <SplitHeading
                text={industries.headline}
                accent={industries.accent}
                accentClassName="text-electric"
                className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
              />
            </div>
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-ink/70">{industries.text}</p>
            </Reveal>
          </div>

        </Container>

        {/* Auto-scrolling row of industry cards with previous / next arrows overlaid on the cards. */}
        <div className="mt-14">
          <IndustriesSlider items={industries.items} />
        </div>
      </section>

      {/* 06 — Sustainability: photo background with parallax */}
      <section className="relative overflow-hidden py-28 text-white sm:py-40" id="sustainability">
        <ParallaxBg strength={14}>
          <Image
            src="/images/sustainability.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
          {/* Dark brand-blue wash keeps the text legible over the photo. */}
          <div className="absolute inset-0 bg-gradient-to-br from-deep/85 via-navy/65 to-deep/80" />
        </ParallaxBg>
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div>
              <Reveal>
                <p className="text-base text-white/70">{sustainability.eyebrow}</p>
              </Reveal>
              <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                <SplitHeading as="span" text={sustainability.lines[0]} className="block text-white" />
                <SplitHeading
                  as="span"
                  text={sustainability.lines[1]}
                  delay={0.2}
                  className="block text-sky"
                />
              </h2>
            </div>
            <div>
              <ScrollWords
                text={sustainability.text}
                className="text-lg leading-relaxed text-white/90"
              />
              <Reveal className="mt-8">
                <ButtonLink href={sustainability.cta.href}>{sustainability.cta.label}</ButtonLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 07 — Partners */}
      <section className="bg-white py-24 sm:py-32" id="partners">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div>
              <SplitHeading
                text={partners.headline}
                accent={partners.accent}
                accentClassName="text-electric"
                className="text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
              />
            </div>
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-ink/70">{partners.text}</p>
              <div className="mt-8">
                <ButtonLink href={partners.cta.href}>
                  {partners.cta.label}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Partner logos (from raya-it.net/partners), two rows moving in opposite directions. */}
        <div className="mt-16 space-y-4">
          <Marquee duration={90}>
            <LogoCards logos={partnerLogos.filter((_, i) => i % 2 === 0)} />
          </Marquee>
          <Marquee duration={100} reverse>
            <LogoCards logos={partnerLogos.filter((_, i) => i % 2 === 1)} />
          </Marquee>
        </div>
      </section>
    </>
  );
}

function LogoCards({ logos }: { logos: Partner[] }) {
  return (
    <>
      {logos.map((l) => (
        <div
          key={l.file}
          className="flex h-24 w-52 shrink-0 items-center justify-center rounded-xl border border-mist bg-white px-6"
        >
          <Image
            src={`/images/partners/${l.file}`}
            alt={l.name}
            width={l.w}
            height={l.h}
            unoptimized
            className="max-h-12 w-auto max-w-full object-contain"
          />
        </div>
      ))}
    </>
  );
}
