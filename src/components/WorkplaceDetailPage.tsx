import Image from "next/image";
import {
  Award,
  Building2,
  Check,
  Cog,
  Headset,
  MessagesSquare,
  MousePointerClick,
  PiggyBank,
  SmilePlus,
  TrendingUp,
  Users,
  Wrench,
  Zap,
  MonitorCog,
  MonitorPlay,
  Network,
  ParkingCircle,
  Presentation,
  Radar,
  ShieldCheck,
  Speaker,
  Tv,
  Video,
  type LucideIcon,
} from "lucide-react";
import UseCasesSlider from "@/components/UseCasesSlider";
import { Card } from "@/components/IndustriesSlider";
import PageHero from "@/components/PageHero";
import { ParallaxBg, Reveal, SplitHeading } from "@/components/motion";
import { Container } from "@/components/ui";
import { industries } from "@/content/home";
import type { WorkplaceDetail } from "@/content/digital-workplace";

const icons: Record<string, LucideIcon> = {
  messages: MessagesSquare,
  video: Video,
  headset: Headset,
  signage: MonitorPlay,
  tv: Tv,
  audiovisual: Speaker,
  security: ShieldCheck,
  command: Radar,
  building: Building2,
  smart: Network,
  room: Presentation,
  automation: Cog,
  parking: ParkingCircle,
};

const valueIcons: Record<string, LucideIcon> = {
  award: Award,
  team: Users,
  wrench: Wrench,
  reliability: ShieldCheck,
  productivity: TrendingUp,
  efficiency: Zap,
  morale: SmilePlus,
  savings: PiggyBank,
  convenience: MousePointerClick,
};

const card =
  "group h-full rounded-2xl border border-white/15 bg-deep/70 p-6 backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-sky/60 hover:shadow-[0_18px_40px_-18px_rgba(137,193,240,0.45)]";

export default function WorkplaceDetailPage({ d }: { d: WorkplaceDetail }) {
  // Only the sectors listed for this solution (matched to the home page's industry cards).
  const cards = d.industries.flatMap((name) => {
    const key = name.toLowerCase().split(" ")[0];
    const hit = industries.items.find((i) => i.title.toLowerCase().includes(key));
    return hit ? [hit] : [];
  });

  return (
    <>
      <PageHero
        title={d.title}
        trail={[
          { title: "Solutions", href: "/solutions" },
          { title: "Digital Workplace Solutions", href: "/solutions/digital-workplace" },
        ]}
      />

      {/* Introduction */}
      <section className="bg-white py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-base text-ink/60">Introduction</p>
            <SplitHeading
              text={d.title}
              accent={d.title.split(" ").slice(-1)[0]}
              accentClassName="text-electric"
              className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
            />
            {d.questions && (
              <ul className="mt-8 space-y-3">
                {d.questions.map((q) => (
                  <li key={q} className="flex gap-3 text-base font-medium leading-snug text-navy">
                    <Check size={20} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
                    {q}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/70">
              {d.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={d.image}
                alt={d.title}
                fill
                unoptimized
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Components */}
      <section className="relative overflow-hidden bg-deep py-20 sm:py-28">
        <ParallaxBg strength={14}>
          <Image
            src="/images/workplace/components-bg.webp"
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        </ParallaxBg>
        <div className="absolute inset-0 bg-deep/60" />
        <Container className="relative">
          <p className="text-base text-white/70">Solution</p>
          <SplitHeading
            text={d.componentsTitle}
            className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.components.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <div className={card}>
                    <div className="flex items-center justify-between">
                      {(() => {
                        const Icon = (c.icon && icons[c.icon]) || MonitorCog;
                        return (
                          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/25 bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                            <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                          </span>
                        );
                      })()}
                      <span className="text-sm font-semibold text-sky">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-snug text-white">{c.title}</h3>
                    {c.text && <p className="mt-3 text-sm leading-relaxed text-white/75">{c.text}</p>}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {d.useCases && (
        <section className="bg-white py-20 sm:py-28">
          <Container>
            <UseCasesSlider
              items={d.useCases}
              heading={
                <>
                  <p className="text-base text-ink/60">Use Cases</p>
                  <SplitHeading
                    text="Use Cases"
                    accent="Cases"
                    accentClassName="text-electric"
                    className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
                  />
                </>
              }
            />
          </Container>
        </section>
      )}

      {d.value && (
        <section className="relative overflow-hidden bg-deep py-20 sm:py-28">
          <Image
            src="/images/workplace/added-value-bg.webp"
            alt=""
            fill
            unoptimized
            aria-hidden="true"
            sizes="100vw"
            className="object-cover object-[78%_center]"
          />
          {/* Darkens the photo so the two text columns stay readable. */}
          <div className="absolute inset-0 bg-deep/70" />
          <Container className="relative">
            <div>
              <p className="text-base text-white/70">Why Raya</p>
              <SplitHeading
                text={d.valueTitle ?? "Raya Added Value"}
                accent="Added Value"
                accentClassName="text-sky"
                className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl"
              />
              <ul className="mt-12 grid gap-x-14 gap-y-8 md:grid-cols-2">
                {d.value.map((v, i) => {
                  const Icon = (v.icon && valueIcons[v.icon]) || Award;
                  return (
                    <li key={v.title ?? v.text}>
                      <Reveal delay={Math.min(i, 4) * 0.05} y={20}>
                        <div className="flex items-center gap-5">
                          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/25 bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md">
                            <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                          </span>
                          <div>
                            {v.title && <h3 className="text-lg font-semibold text-white">{v.title}</h3>}
                            {v.text && (
                              <p className={`${v.title ? "mt-1" : ""} text-base leading-relaxed text-white/80`}>
                                {v.text}
                              </p>
                            )}
                          </div>
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* Industries: the home page's industry cards, limited to the sectors this solution serves */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <SplitHeading
                text={"Industries \n we serve"}
                accent="serve"
                accentClassName="text-electric"
                className="text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
              />
            </div>
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-ink/70">{industries.text}</p>
            </Reveal>
          </div>
        </Container>
        <Container className="mt-14">
          <ul
            className={`grid gap-4 sm:grid-cols-2 ${cards.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
          >
            {cards.map((item) => (
              <li key={item.title}>
                <Card item={item} fluid />
              </li>
            ))}
          </ul>
        </Container>
      </section>

    </>
  );
}
