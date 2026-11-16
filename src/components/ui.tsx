import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-page px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.18em] ${
        onDark ? "text-sky" : "text-electric"
      }`}
    >
      {children}
    </p>
  );
}

// Glowing gradient-stroke button (see .btn-glow in globals.css). Variants kept for call-site compatibility.
const base =
  "btn-glow group inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-sm font-semibold";

export function ButtonLink({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "navy" | "outline" | "outlineLight";
  /** "light" = white fill, for buttons that sit on white / light backgrounds. */
  tone?: "dark" | "light";
}) {
  return (
    <Link href={href} className={`${base}${tone === "light" ? " btn-glow-light" : ""}`}>
      {children}
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/** Sitemap rule: every "Read More" opens its destination in a new tab. */
export function ReadMore({ href, label = "Read More" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-electric hover:text-navy"
    >
      {label}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      <span className="sr-only"> (opens in a new tab)</span>
    </Link>
  );
}
