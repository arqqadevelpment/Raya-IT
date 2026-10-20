import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/site-map";

export default function Breadcrumbs({
  trail,
  current,
  onDark = false,
}: {
  trail: Crumb[];
  current: string;
  onDark?: boolean;
}) {
  const crumbs: Crumb[] = [{ title: "Home", href: "/" }, ...trail];
  const muted = onDark ? "text-white/70" : "text-ink/60";
  const link = onDark ? "hover:text-white" : "hover:text-navy";
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className={`flex flex-wrap items-center gap-1.5 ${muted}`}>
        {crumbs.map((c) => (
          <li key={c.title} className="flex items-center gap-1.5">
            {c.href ? (
              <Link href={c.href} className={`underline-offset-4 hover:underline ${link}`}>
                {c.title}
              </Link>
            ) : (
              <span>{c.title}</span>
            )}
            <ChevronRight size={14} aria-hidden="true" />
          </li>
        ))}
        <li aria-current="page" className={onDark ? "font-medium text-white" : "font-medium text-navy"}>
          {current}
        </li>
      </ol>
    </nav>
  );
}
