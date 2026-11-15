import type { Metadata } from "next";
import DirectorCard, { DirectorPhoto } from "@/components/DirectorCard";
import PageHero from "@/components/PageHero";
import { PixelReveal, Reveal, SplitHeading } from "@/components/motion";
import { Container } from "@/components/ui";
import { directors } from "@/content/leadership";

export const metadata: Metadata = { title: "Leadership" };

export default function LeadershipPage() {
  const [ceo, ...team] = directors;

  return (
    <>
      <PageHero title="Leadership" trail={[{ title: "Who We Are" }]} />

      {/* CEO */}
      <section className="bg-white py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <PixelReveal
            className="relative aspect-[4/5] w-full max-w-md rounded-3xl lg:max-w-none"
            coverClassName="bg-white"
            shape="triangle"
            cols={4}
            rows={5}
          >
            <DirectorPhoto d={ceo} sizes="(min-width: 1024px) 36rem, 100vw" />
          </PixelReveal>
          <div>
            <Reveal>
              <p className="text-base text-grey">
                {ceo.role.toUpperCase()}
              </p>
            </Reveal>
            <SplitHeading
              text={ceo.name}
              accent="Abbas"
              accentClassName="text-electric"
              className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-3 text-lg font-medium text-electric">{ceo.org}</p>
            </Reveal>
            <div className="mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-ink/70">
              {ceo.bio.map((p, i) => (
                <Reveal key={i} delay={0.12 + 0.08 * i}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Management team */}
      <section className="bg-surface py-24 sm:py-32">
        <Container>
          <SplitHeading
            text="Management Team"
            accent="Team"
            accentClassName="text-electric"
            className="text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
          />
          <div className="mt-14 grid items-start gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((d, i) => (
              <DirectorCard key={d.slug} d={d} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
