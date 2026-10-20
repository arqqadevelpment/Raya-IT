import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import ScheduleMeeting from "@/components/ScheduleMeeting";
import { Container } from "@/components/ui";
import { allPages, findPage } from "@/lib/site-map";

type Params = { slug: string[] };

export function generateStaticParams(): Params[] {
  return allPages.map((p) => ({ slug: p.path.slice(1).split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(`/${slug.join("/")}`);
  return page ? { title: page.title } : {};
}

export default async function SitePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = findPage(`/${slug.join("/")}`);
  if (!page) notFound();

  const showSchedule = page.path.startsWith("/solutions") || page.path.startsWith("/services");

  return (
    <>
      <PageHero title={page.title} eyebrow={page.groupTitle} trail={page.trail} />

      {page.sections.length > 0 && (
        <nav aria-label="On this page" className="sticky top-[100px] z-30 border-b border-mist bg-white">
          <Container className="flex gap-6 overflow-x-auto py-3 text-sm font-medium">
            {page.sections.map((s) => (
              <a key={s} href={`#${toId(s)}`} className="whitespace-nowrap text-navy hover:text-electric">
                {s}
              </a>
            ))}
          </Container>
        </nav>
      )}

      <Container className="py-16">
        {page.children.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-navy">Explore</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.children.map((c) => (
                <li key={c.path}>
                  <Link
                    href={c.path}
                    className="group flex h-full items-start justify-between gap-4 rounded-lg border border-mist p-6 transition-colors hover:border-electric"
                  >
                    <span className="font-semibold text-navy">{c.title}</span>
                    <ArrowUpRight
                      size={18}
                      className="mt-0.5 shrink-0 text-grey transition-colors group-hover:text-electric"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {page.sections.length > 0 ? (
          <div className="space-y-12">
            {page.sections.map((s) => (
              <section key={s} id={toId(s)} className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-navy">{s}</h2>
                <Placeholder />
              </section>
            ))}
          </div>
        ) : (
          page.children.length === 0 && <Placeholder />
        )}
      </Container>

      {showSchedule && <ScheduleMeeting topic={page.title} />}
    </>
  );
}

const toId = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Placeholder() {
  return (
    <p className="mt-4 rounded-lg border border-dashed border-grey/60 bg-surface p-6 text-sm text-ink/60">
      Content to be provided.
    </p>
  );
}
