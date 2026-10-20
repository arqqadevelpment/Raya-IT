import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import FooterCta from "./FooterCta";
import { Container, Eyebrow } from "./ui";
import { menu } from "@/lib/site-map";
import { footer } from "@/content/home";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-electric via-navy to-deep text-white">

      <FooterCta />

      {/* Links */}
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
          <div>
            <Logo variant="white" height={30} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">{footer.about}</p>
          </div>

          <nav aria-label="Main">
            <Eyebrow onDark>Navigation</Eyebrow>
            <ul className="mt-4 space-y-2.5 text-sm">
              {menu.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/${g.slug}/${g.items[0].slug}`}
                    className="text-white/75 hover:text-white"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-white/75 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <Eyebrow onDark>Company</Eyebrow>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footer.companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/75 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Eyebrow onDark>Contact</Eyebrow>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-sky" aria-hidden="true" />
                <a href={`tel:${footer.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                  {footer.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-sky" aria-hidden="true" />
                <span className="leading-relaxed">{footer.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:justify-between">
          <p>{footer.legal}</p>
          <ul className="flex gap-5">
            {footer.legalLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
