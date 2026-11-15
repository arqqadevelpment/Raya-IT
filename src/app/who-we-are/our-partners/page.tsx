import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui";
import { partners } from "@/content/home";
import { partnerLogos } from "@/content/partners";

export const metadata: Metadata = { title: "Our Partners" };

export default function OurPartnersPage() {
  return (
    <>
      <PageHero title="Our Partners" trail={[{ title: "Who We Are" }]} intro={partners.text} />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {partnerLogos.map((p, i) => (
              <li key={p.file}>
                <Reveal delay={(i % 5) * 0.05} y={20}>
                  <div className="group flex h-28 items-center justify-center rounded-2xl border border-mist bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-[0_18px_40px_-18px_rgba(1,101,232,0.45)] sm:h-32">
                    <Image
                      src={`/images/partners/${p.file}`}
                      alt={p.name}
                      width={p.w}
                      height={p.h}
                      unoptimized
                      className="max-h-14 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
