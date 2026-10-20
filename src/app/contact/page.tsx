import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Headset, Mail, MapPin, Phone, Printer, type LucideIcon } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Contact Us" };

type Office = {
  name: string;
  address: string;
  phones: string[];
  fax?: string;
  email?: string;
};

// Source: client-supplied contact details (Oct 2026). Verify before launch.
const offices: Office[] = [
  {
    name: "Head Office",
    address: "26th July St, Touristic zone, 6th of October, 12568, Egypt",
    phones: ["(+202) 38276000"],
    fax: "(+202) 38276001",
    email: "rayait_info@rayacorp.com",
  },
  {
    name: "Raya Saudi",
    address:
      "Prince Mamdouh ben Abdel Aziz St., Olyia Solimania, Riyadh 11595, P.O. Box 62956, Saudi Arabia",
    phones: ["00966 1 1288 6500", "00966504328532"],
    fax: "00966 1 1288 6450",
  },
  {
    name: "Raya UAE",
    address: "G-65 Building 17, Dubai Internet City",
    phones: ["00971-5030-83857"],
    fax: "00971-4-3908719",
  },
  {
    name: "Raya Middle East",
    address:
      "Building Sh. Khalid Bin Ahmed Al Hamed, Plot no. 45, Office M1 Mezzanine, Tourist Club, Abu Dhabi",
    phones: ["00971-5030-83857"],
    fax: "00971-2-6459910",
  },
  {
    name: "Raya East Africa",
    address: "7th Floor Amani Place, Ohio Street, Dar Es Salaam, Tanzania, P.O. Box 38568",
    phones: [],
  },
];

const support = { shortNumber: "(+202) 16260", email: "tsupport@rayacorp.com" };

const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;

function Row({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-ink/75">
      <Icon size={16} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

const rowLink = "font-medium text-navy underline-offset-4 hover:text-electric hover:underline";

// Reading searchParams is runtime data, so it sits behind Suspense and the rest stays static.
async function Form({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  return <InquiryForm defaultTopic={topic} />;
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  return (
    <>
      <PageHero
        title="Contact Us"
        trail={[]}
        intro="If you have any questions, just fill in the form and we will answer you shortly. If you are nearby, come visit us at one of our offices."
      />
      {/* Inquiry form: full width, first */}
      <section aria-labelledby="inquiry" className="bg-white py-16 sm:py-20">
        <Container>
          <h2 id="inquiry" className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Send an inquiry
          </h2>
          <div className="mt-8">
            <Suspense fallback={<div className="h-96 rounded-lg bg-surface" />}>
              <Form searchParams={searchParams} />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* Offices: three per row */}
      <section id="offices" aria-labelledby="offices-h" className="scroll-mt-28 bg-surface py-16 sm:py-20">
        <Container>
          <h2 id="offices-h" className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Offices
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {offices.map((o) => (
              <li key={o.name} className="border-l-2 border-electric pl-4">
                <p className="font-semibold text-navy">{o.name}</p>
                <ul className="mt-3 space-y-2.5">
                  <Row icon={MapPin}>{o.address}</Row>
                  {o.phones.length > 0 && (
                    <Row icon={Phone}>
                      <span className="text-ink/55">Phone: </span>
                      {o.phones.map((p, i) => (
                        <span key={p}>
                          {i > 0 && " – "}
                          <a href={tel(p)} className={rowLink}>
                            {p}
                          </a>
                        </span>
                      ))}
                    </Row>
                  )}
                  {o.fax && (
                    <Row icon={Printer}>
                      <span className="text-ink/55">Fax: </span>
                      {o.fax}
                    </Row>
                  )}
                  {o.email && (
                    <Row icon={Mail}>
                      <span className="text-ink/55">Email: </span>
                      <a href={`mailto:${o.email}`} className={rowLink}>
                        {o.email}
                      </a>
                    </Row>
                  )}
                </ul>
              </li>
            ))}
            <li className="border-l-2 border-electric pl-4">
              <p className="font-semibold text-navy">For Technical Support</p>
              <ul className="mt-3 space-y-2.5">
                <Row icon={Headset}>
                  <span className="text-ink/55">Short No: </span>
                  <a href={tel(support.shortNumber)} className={rowLink}>
                    {support.shortNumber}
                  </a>
                </Row>
                <Row icon={Mail}>
                  <span className="text-ink/55">Email: </span>
                  <a href={`mailto:${support.email}`} className={rowLink}>
                    {support.email}
                  </a>
                </Row>
              </ul>
              <p className="mt-3 text-sm">
                <Link href="/contact/technical-support" className="font-semibold text-electric hover:underline">
                  Submit a support request
                </Link>
              </p>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
}
