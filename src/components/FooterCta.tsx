"use client";

import { usePathname } from "next/navigation";
import FlagMark from "./FlagMark";
import { ButtonLink, Container } from "./ui";
import { Reveal, SplitHeading } from "./motion";
import { footer } from "@/content/home";

// Closing "Let's Shape What's Next" call to action. Hidden on the Contact pages,
// since the visitor is already where the CTA would send them.
export default function FooterCta() {
  const pathname = usePathname();
  if (pathname === "/contact" || pathname.startsWith("/contact/")) return null;

  return (
    <>
      <section className="relative overflow-hidden">
        <FlagMark className="pointer-events-none absolute -right-20 -top-10 h-[26rem] w-[26rem] text-white/10" />
        <Container className="relative py-24 sm:py-32">
          <SplitHeading
            as="h2"
            text={footer.closingHeadline}
            accent={footer.accent}
            className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
          />
          <Reveal delay={0.25} className="mt-7 max-w-xl">
            <p className="text-lg leading-relaxed text-white/75">{footer.closingText}</p>
            <div className="mt-8">
              <ButtonLink href={footer.cta.href} variant="navy">
                {footer.cta.label}
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
