import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, MapPin, Target } from "lucide-react";
import FlagMark from "@/components/FlagMark";
import PageHero from "@/components/PageHero";
import { JourneyTimeline, RegionNetwork } from "@/components/AboutVisuals";
import {
  Reveal,
  ScrollWords,
  SplitHeading,
} from "@/components/motion";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "About Raya IT" };

// Content taken from https://raya-it.net/about-raya/ (verify figures before launch).
const intro =
  "Raya Information Technology, the leading system integrator, was established in 1998 with a vision to lead the information technology market depending on its dynamic portfolio.";

const statement =
  "Building on the fact that sustainable growth starts with strong roots, Raya Information Technology helped over 1000+ customers in all market sectors in adopting new technologies and achieving higher levels of business performance.";

const paragraphs = [
  "With a regional presence across MEA region through 3 regional offices in Egypt, Saudi Arabia and United Arab Emirates, we serve customers in the sectors of financial services (FSI), Telecommunications, Public, Oil & Gas, Hospitality, Commercial and Retail.",
  "Raya Extensive Expertise in the field of system integration and technology consultancy uniquely positions it as the Digital Transformation enabler bridging the gap between legacy and future technologies.",
];

const offering =
  "Our offering ranges from ATM & Self Service solutions, infrastructure solutions, Oracle Apps & Tech Solutions to Data Center, Co-location and Cloud Solutions using its large pool of 900+ certified skilled team and leveraging its unique portfolio of class A technology vendors.";

const vision =
  "To be the leading system integrator regionally, recognized for our customer-centric approach and technological expertise";
const mission =
  "Empower businesses through cutting-edge digital transformation innovations, that drive efficiency, excellence and sustainable growth";

const facts = [
  { to: 1000, suffix: "+", decimals: 0, label: "Customers" },
  { to: 6, suffix: "", decimals: 0, label: "Subsidiaries" },
  { to: 1500, suffix: "+", decimals: 0, label: "Qualified Experts" },
  { to: 18.7, suffix: "", decimals: 1, label: "Billion EGP Turnover" },
];

const offices = [
  { name: "Head Office", place: "6th of October, Egypt" },
  { name: "Raya Saudi", place: "Riyadh, Saudi Arabia" },
  { name: "Raya UAE", place: "Dubai Internet City" },
  { name: "Raya Middle East", place: "Abu Dhabi, UAE" },
  { name: "Raya East Africa", place: "Dar Es Salaam, Tanzania" },
];

const sections = [
  { id: "mission-vision", label: "Mission & Vision" },
  { id: "our-journey", label: "Our Journey" },
  { id: "key-facts", label: "Key Facts" },
  { id: "regional-presence", label: "Regional Presence" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Raya IT" trail={[{ title: "Who We Are" }]} intro={intro} />

      <nav aria-label="On this page" className="sticky top-[100px] z-30 border-b border-mist bg-white">
        <Container className="flex gap-6 overflow-x-auto py-3 text-sm font-medium">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="whitespace-nowrap text-navy hover:text-electric">
              {s.label}
            </a>
          ))}
        </Container>
      </nav>

      {/* Overview */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <ScrollWords
            text={statement}
            className="max-w-4xl text-2xl font-medium leading-snug text-navy sm:text-4xl"
          />
          <div className="mt-16 grid gap-6 text-lg leading-relaxed text-ink/70 md:grid-cols-2 md:gap-12">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section id="mission-vision" className="scroll-mt-32 bg-deep py-24 text-white sm:py-32">
        <Container>
          <SplitHeading
            text="Mission & Vision"
            accent="Vision"
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { Icon: Eye, label: "Vision", text: vision },
              { Icon: Target, label: "Mission", text: mission },
            ].map(({ Icon, label, text }, i) => (
              <Reveal key={label} delay={0.12 * i} className="h-full">
                {/* Hover: lifts and a brand-blue fill sweeps up from the bottom, like the Solutions cards. */}
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_28px_60px_-24px_rgba(1,101,232,0.65)] sm:p-10">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-electric to-navy transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  >
                    <FlagMark className="absolute bottom-5 right-5 h-36 w-36 text-white/10" />
                  </span>
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/25 bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
                    <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-sky transition-colors duration-300 group-hover:text-white/80">
                    {label}
                  </h3>
                  <p className="relative mt-4 text-2xl font-medium leading-snug sm:text-[1.7rem]">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Journey */}
      <section id="our-journey" className="scroll-mt-32 bg-surface py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <SplitHeading
              text="Our Journey"
              accent="Journey"
              accentClassName="text-electric"
              className="text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
            />
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-ink/70">{offering}</p>
            </Reveal>
          </div>
          <JourneyTimeline />
        </Container>
      </section>

      {/* Key Facts */}
      <section id="key-facts" className="scroll-mt-32 bg-white py-24 sm:py-32">
        <Container>
          <SplitHeading
            text="Key Facts"
            accent="Facts"
            accentClassName="text-electric"
            className="text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
          />
          <Reveal className="mt-12">
            <dl className="grid overflow-hidden rounded-2xl border border-mist sm:grid-cols-2 lg:grid-cols-5">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="group relative flex flex-col border-b border-mist p-8 transition-colors last:border-b-0 hover:bg-surface sm:border-r lg:border-b-0"
                >
                  <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-electric transition-transform duration-500 group-hover:scale-x-100" />
                  <dd className="order-1 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
                    {f.to.toLocaleString("en-US", { minimumFractionDigits: f.decimals ?? 0, maximumFractionDigits: f.decimals ?? 0 })}
                    {f.suffix}
                  </dd>
                  <dt className="order-2 mt-4 text-sm leading-snug text-ink/65">{f.label}</dt>
                </div>
              ))}
              <div className="group relative flex flex-col p-8 transition-colors hover:bg-surface">
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-electric transition-transform duration-500 group-hover:scale-x-100" />
                <dd className="order-1 flex items-start gap-2 text-xl font-bold leading-snug text-navy sm:text-2xl">
                  <MapPin size={22} className="mt-1 shrink-0 text-electric" aria-hidden="true" />
                  Egypt, Saudi Arabia &amp; GCC
                </dd>
                <dt className="order-2 mt-4 text-sm leading-snug text-ink/65">Geo Coverage</dt>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Regional Presence */}
      <section id="regional-presence" className="scroll-mt-32 bg-deep py-24 text-white sm:py-32">
        <Container>
          <SplitHeading
            text="Regional Presence"
            accent="Presence"
            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
          />
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
                <RegionNetwork />
              </div>
            </Reveal>
            <div>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {offices.map((o, i) => (
                  <Reveal key={o.name} delay={0.06 * i}>
                    <li className="flex items-baseline justify-between gap-4 py-4">
                      <span className="font-semibold">{o.name}</span>
                      <span className="text-right text-sm text-white/65">{o.place}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <Link
                href="/contact#offices"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky hover:text-white"
              >
                Offices and contact details
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
