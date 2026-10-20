"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Award,
  Banknote,
  BrainCircuit,
  Building2,
  CalendarDays,
  ChevronDown,
  Cloud,
  Database,
  FileText,
  Flame,
  Handshake,
  Hotel,
  Info,
  Landmark,
  Layers,
  LifeBuoy,
  Menu,
  MonitorSmartphone,
  Newspaper,
  RadioTower,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import Logo from "./Logo";
import FlagMark from "./FlagMark";
import { menu, type MenuGroup } from "@/lib/site-map";
import { industries, services, solutions } from "@/content/home";

// Descriptions reuse the approved homepage copy; items without copy show the title only.
const descriptions = new Map(
  [...solutions.items, ...services.items, ...industries.items].map((i) => [i.title, i.description]),
);

const icons: Record<string, LucideIcon[]> = {
  "who-we-are": [Info, Users, Building2, Award, Handshake, FileText],
  solutions: [Cloud, ShieldCheck, MonitorSmartphone, Layers, BrainCircuit, RadioTower, Banknote],
  services: [ServerCog, ShieldCheck, Layers, BrainCircuit, Database, LifeBuoy],
  industries: [Landmark, RadioTower, Building2, Flame, ShoppingBag, Hotel, Award],
  "media-center": [Newspaper, CalendarDays],
};

const taglines: Record<string, string> = {
  "who-we-are": "Your Technology Partner for What’s Next.",
  solutions: "One Connected Portfolio. Endless Possibilities.",
  services: "Expertise Beyond Implementation.",
  industries: "Industry Knowledge. Technology That Delivers.",
  "media-center": "News, events and insights from Raya IT.",
};

const pill =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors";

function MegaPanel({ group, close }: { group: MenuGroup; close: () => void }) {
  const groupIcons = icons[group.slug] ?? [];
  return (
    <div className="rounded-[2rem] border-4 border-white bg-[#f6f7fb] p-2 text-ink shadow-[0_30px_80px_-20px_rgba(0,10,61,0.55)]">
      <div className="grid gap-2 lg:grid-cols-[300px_1fr]">
        {/* Feature card */}
        <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-navy via-deep to-deep p-7 text-white">
          <FlagMark className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 text-electric/40" />
          <p className="text-2xl font-semibold leading-snug tracking-tight">{group.title}</p>
          <p className="mt-3 max-w-[14rem] text-base leading-relaxed text-white/70">
            {taglines[group.slug]}
          </p>
        </div>

        {/* Items */}
        <div className="flex flex-col px-5 pb-4 pt-5">
          <p className="text-sm font-medium text-ink/60">{group.title}</p>
          <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {group.items.map((item, i) => {
              const Icon = groupIcons[i] ?? Layers;
              // Solutions items show title and sub-pages only (no description line).
              const desc = group.slug === "solutions" ? undefined : descriptions.get(item.title);
              return (
                <li key={item.slug}>
                  <div
                    className={`group flex gap-4 rounded-2xl p-3 ${
                      !desc && !item.children ? "items-center" : ""
                    } transition-colors hover:bg-white hover:shadow-[0_4px_24px_-8px_rgba(0,23,128,0.2)]`}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-navy shadow-[0_1px_6px_rgba(0,23,128,0.12)]">
                      <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <Link
                        href={`/${group.slug}/${item.slug}`}
                        onClick={close}
                        className="block text-[0.95rem] font-semibold leading-snug text-navy hover:text-electric"
                      >
                        {item.title}
                      </Link>
                      {desc && (
                        <p className="mt-1 line-clamp-2 text-[0.8rem] leading-relaxed text-ink/60">
                          {desc}
                        </p>
                      )}
                      {item.children && (
                        <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
                          {item.children.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/${group.slug}/${item.slug}/${c.slug}`}
                              onClick={close}
                              className="text-xs font-medium text-electric hover:underline"
                            >
                              {c.title}
                            </Link>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex items-end justify-between gap-6 pt-6">
            <div>
              <p className="text-sm font-semibold text-navy">Not sure where to start?</p>
              <p className="mt-0.5 text-sm text-ink/60">
                Talk to our team and we will help you find the right fit.
              </p>
            </div>
            <Link
              href="/contact"
              onClick={close}
              className={`${pill} shrink-0 bg-deep px-6 py-3 text-white shadow-lg hover:bg-electric`}
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  // Close menus whenever the route changes (adjust state during render, per React docs).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const isActive = (slug: string) => pathname.startsWith(`/${slug}`);
  const current = menu.find((g) => g.slug === open);

  return (
    // h-0 sticky shell: the floating pill overlays the page's first section instead of pushing it down.
    <header ref={ref} onMouseLeave={() => setOpen(null)} className="sticky top-0 z-50 h-0">
      <div className="absolute inset-x-0 top-4 px-4 sm:px-6">
        <div className="relative mx-auto max-w-[88rem]">
          <div className="flex h-[68px] items-center justify-between rounded-full border border-white/15 bg-deep/80 px-4 pl-6 text-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <Link href="/" aria-label="Raya IT — home" className="shrink-0">
              <Logo variant="white" height={30} />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
              {menu.map((g) => (
                <button
                  key={g.slug}
                  type="button"
                  aria-expanded={open === g.slug}
                  aria-haspopup="true"
                  onClick={() => setOpen(open === g.slug ? null : g.slug)}
                  onMouseEnter={() => setOpen(g.slug)}
                  className={`flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-white ${
                    open === g.slug || isActive(g.slug) ? "bg-white/10 text-white" : "text-white/70"
                  }`}
                >
                  {g.title}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${open === g.slug ? "rotate-180" : ""}`}
                  />
                </button>
              ))}
              <Link
                href="/who-we-are/our-partners"
                onMouseEnter={() => setOpen(null)}
                className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                Partners
              </Link>
            </nav>

            <div className="hidden items-center gap-2 xl:flex">
              <Link
                href="/contact/technical-support"
                className={`${pill} border border-white/20 text-white hover:bg-white/10`}
              >
                Technical Support
              </Link>
              <Link href="/contact" className={`${pill} bg-electric text-white hover:bg-blue`}>
                Contact Us
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <button
              type="button"
              className="rounded-full p-2.5 text-white xl:hidden"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              onClick={() => setMobile(!mobile)}
            >
              {mobile ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Desktop mega menu — floats below the pill; pt-3 bridges the hover gap. */}
          {current && (
            <div className="absolute left-1/2 top-full hidden w-[min(1120px,100%)] -translate-x-1/2 pt-3 xl:block">
              <MegaPanel group={current} close={() => setOpen(null)} />
            </div>
          )}

          {/* Mobile menu */}
          {mobile && (
            <nav
              aria-label="Mobile"
              className="mt-3 max-h-[calc(100dvh-110px)] overflow-y-auto rounded-3xl bg-white text-ink shadow-2xl xl:hidden"
            >
              <ul className="divide-y divide-mist px-5 py-2">
                {menu.map((g) => (
                  <li key={g.slug}>
                    <button
                      type="button"
                      aria-expanded={mobileOpen === g.slug}
                      onClick={() => setMobileOpen(mobileOpen === g.slug ? null : g.slug)}
                      className="flex w-full items-center justify-between py-3.5 text-left font-semibold text-navy"
                    >
                      {g.title}
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${mobileOpen === g.slug ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileOpen === g.slug && (
                      <ul className="space-y-1 pb-4 pl-2">
                        {g.items.map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={`/${g.slug}/${item.slug}`}
                              className="block py-1.5 text-sm font-medium text-ink"
                            >
                              {item.title}
                            </Link>
                            {item.children?.map((c) => (
                              <Link
                                key={c.slug}
                                href={`/${g.slug}/${item.slug}/${c.slug}`}
                                className="block py-1 pl-4 text-sm text-ink/65"
                              >
                                {c.title}
                              </Link>
                            ))}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li>
                  <Link href="/who-we-are/our-partners" className="block py-3.5 font-semibold text-navy">
                    Partners
                  </Link>
                </li>
                <li className="flex flex-col gap-2 py-4">
                  <Link
                    href="/contact/technical-support"
                    className={`${pill} border border-navy/20 text-navy`}
                  >
                    Technical Support
                  </Link>
                  <Link href="/contact" className={`${pill} bg-electric py-3 text-white`}>
                    Contact Us
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
