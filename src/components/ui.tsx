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

// Pill button with a white arrow circle on the right (matches the "Discover Our Story" button).
const base =
  "group inline-flex items-center gap-4 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-semibold transition-colors";
const variants = {
  primary: { button: "bg-electric text-white hover:bg-blue", circle: "bg-white text-electric" },
  navy: { button: "bg-deep text-white hover:bg-navy", circle: "bg-white text-deep" },
  outline: {
    button: "border border-navy/25 text-navy hover:border-navy hover:bg-navy/5",
    circle: "bg-navy text-white",
  },
  outlineLight: {
    button: "border border-white/40 text-white hover:bg-white/10",
    circle: "bg-white text-deep",
  },
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
}) {
  const v = variants[variant];
  return (
    <Link href={href} className={`${base} ${v.button}`}>
      {children}
      <span
        className={`grid h-10 w-10 place-items-center rounded-full transition-transform group-hover:translate-x-0.5 ${v.circle}`}
      >
        <ArrowRight size={18} aria-hidden="true" />
      </span>
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
