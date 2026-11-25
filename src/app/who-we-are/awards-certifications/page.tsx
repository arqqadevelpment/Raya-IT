import type { Metadata } from "next";
import AwardsGrid from "@/components/AwardsGrid";
import PageHero from "@/components/PageHero";
import { Counter, SplitHeading } from "@/components/motion";
import { Container } from "@/components/ui";
import { awards } from "@/content/awards";

export const metadata: Metadata = { title: "Awards & Certifications" };

const years = awards.flatMap((a) => (a.year ? [a.year] : []));
const first = Math.min(...years);

export default function AwardsPage() {
  return (
    <>
      <PageHero
        title="Awards & Certifications"
        trail={[{ title: "Who We Are" }]}
        video="/awards-hero.mp4"
      />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SplitHeading
              text="Recognised by the world's leading technology vendors"
              accent="leading technology vendors"
              accentClassName="text-electric"
              className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
            />
            <dl className="flex gap-10">
              <div>
                <dt className="text-sm text-ink/55">Awards</dt>
                <dd className="text-4xl font-bold text-navy">
                  <Counter to={awards.length} suffix="+" />
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink/55">Since</dt>
                <dd className="text-4xl font-bold text-navy">{first}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-12">
            <AwardsGrid awards={awards} />
          </div>
        </Container>
      </section>
    </>
  );
}
