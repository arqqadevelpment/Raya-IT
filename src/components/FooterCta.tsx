"use client";

import { usePathname } from "next/navigation";
import FlagMark from "./FlagMark";
import { ButtonLink, Container } from "./ui";
import { Reveal, SplitHeading } from "./motion";
import { footer } from "@/content/home";

// Closing "Let's Shape What's Next" call to action. Hidden on the Contact pages (the visitor is already
// where the CTA would send them). The Digital Workplace pages use the same layout with their own
// content: "Schedule a Meeting" / "Talk to our team about <solution>".
const WORKPLACE_TOPICS: Record<string, string> = {
  "/solutions/digital-workplace": "Digital Workplace Solutions",
  "/solutions/digital-workplace/collaboration": "Collaboration Solutions",
  "/solutions/digital-workplace/integrated-low-current": "Integrated Low Current",
};

export default function FooterCta() {
  const pathname = usePathname();
  if (pathname === "/contact" || pathname.startsWith("/contact/")) return null;

  const topic = WORKPLACE_TOPICS[pathname.replace(/\/$/, "")];
  const heading = topic ? `Talk to our team \n about ${topic}` : footer.closingHeadline;
  const accent = topic ?? footer.accent;
  const cta = topic
    ? { label: "Schedule a Meeting", href: `/contact?topic=${encodeURIComponent(topic)}` }
    : footer.cta;

  return (
    <>
      <section className="relative overflow-hidden">
        <FlagMark className="pointer-events-none absolute right-6 top-1/2 aspect-square h-[78%] -translate-y-1/2 text-white/10 sm:right-12" />
        <Container className="relative py-24 sm:py-32">
          <SplitHeading
            as="h2"
            text={heading}
            accent={accent}
            className={`font-bold leading-[1.05] tracking-tight ${
              topic ? "text-4xl sm:text-5xl lg:text-6xl" : "max-w-4xl text-4xl sm:text-7xl"
            }`}
          />
          <Reveal delay={0.25} className="mt-7 max-w-xl">
            {!topic && <p className="text-lg leading-relaxed text-white/75">{footer.closingText}</p>}
            <div className="mt-8">
              <ButtonLink href={cta.href} variant="navy">
                {cta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
      <Container>
        <div className="border-t border-white/15" />
      </Container>
    </>
  );
}
