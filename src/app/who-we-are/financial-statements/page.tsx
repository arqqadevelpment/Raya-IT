import type { Metadata } from "next";
import { ArrowUpRight, FileText } from "lucide-react";
import FlagMark from "@/components/FlagMark";
import PageHero from "@/components/PageHero";
import { Reveal, SplitHeading } from "@/components/motion";
import { Container } from "@/components/ui";
import { financialIntro, statements } from "@/content/financial";

export const metadata: Metadata = { title: "Financial Statements" };

export default function FinancialStatementsPage() {
  return (
    <>
      <PageHero title="Financial Statements" trail={[{ title: "Who We Are" }]} />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <SplitHeading
            text={financialIntro}
            accent="Financial Statements"
            accentClassName="text-electric"
            className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl"
          />

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statements.map((s, i) => (
              <li key={s.year}>
                <Reveal delay={i * 0.1} className="h-full">
                  {/* Hover: lifts and a brand-blue fill sweeps up from the bottom, like the Solutions cards. */}
                  <a
                    href={s.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-2xl border border-mist bg-surface p-7 transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_28px_60px_-24px_rgba(1,101,232,0.65)]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br from-electric to-navy transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                    >
                      <FlagMark className="absolute -bottom-8 -right-8 h-48 w-48 text-white/10" />
                    </span>

                    <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-white text-electric shadow-[0_1px_6px_rgba(0,23,128,0.12)] transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white">
                      <FileText size={22} strokeWidth={1.5} aria-hidden="true" />
                    </span>

                    <div className="relative mt-auto pt-10">
                      <p className="text-5xl font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-white">
                        {s.year}
                      </p>
                      <p className="mt-2 text-base font-medium text-ink/70 transition-colors duration-300 group-hover:text-white/85">
                        {s.title}
                      </p>
                      <span className="mt-6 flex items-center justify-between border-t border-navy/15 pt-4 text-sm font-semibold text-electric transition-colors duration-300 group-hover:border-white/30 group-hover:text-white">
                        <span>
                          View PDF <span className="font-normal opacity-70">· {s.size}</span>
                        </span>
                        <ArrowUpRight size={18} aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </span>
                    </div>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
