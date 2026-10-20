// Homepage copy — verbatim from docs/Raya_IT_Homepage_Content_Claude_Ready.docx.
// Do not edit wording without marking it as a proposed edit. Facts must be reconfirmed before launch.
import { menu } from "@/lib/site-map";

const solutionItems = menu.find((m) => m.slug === "solutions")!.items;
const serviceItems = menu.find((m) => m.slug === "services")!.items;
const industryItems = menu.find((m) => m.slug === "industries")!.items;

export const hero = {
  eyebrow: "RAYA INFORMATION TECHNOLOGY",
  headline: "Engineering What’s Next.",
  accent: "What’s Next.",
  text: "Empowering organizations with integrated technology solutions and expert services that connect today’s business needs with tomorrow’s opportunities.",
  primary: { label: "Explore Our Solutions", href: `/solutions/${solutionItems[0].slug}` },
  secondary: { label: "Discover Raya IT", href: "/who-we-are/about-raya-it" },
};

export const discover = {
  eyebrow: "WHO WE ARE",
  headline: "Your Technology Partner for What’s Next.",
  accent: "What’s Next.",
  // PROPOSED EDIT (requested by client): original two paragraphs condensed into one shorter paragraph.
  paragraphs: [
    "Since 1998, Raya Information Technology has helped enterprises and public-sector organizations transform the way they operate. Through consultancy, systems integration, and a broad portfolio of solutions and services, we connect today’s environments with future-ready technologies across Egypt, Saudi Arabia, and the UAE.",
  ],

  facts: [
    { to: 1000, suffix: "+", group: true, label: "Customers" },
    { to: 1500, suffix: "+", group: true, label: "Qualified Experts" },
    { to: 6, suffix: "", group: false, label: "Subsidiaries" },
  ],
  cta: { label: "Discover Our Story", href: "/who-we-are/about-raya-it" },
};

const solutionDescriptions = [
  "Create a resilient digital foundation through cloud technologies, data center infrastructure, enterprise networks, and scalable computing environments.",
  "Protect business-critical systems and information with integrated security technologies designed to strengthen visibility, protection, and resilience.",
  "Enable connected, productive work experiences through collaboration platforms, workplace technologies, and smarter digital environments.",
  "Connect people, processes, and information with enterprise applications, ERP platforms, and tailored software solutions.",
  "Turn data and emerging technologies into practical value through analytics, automation, AI-enabled capabilities, and intelligent integration.",
  "Support reliable, high-performance communication networks and telecommunications environments built for today’s connected economy.",
  "Deliver seamless, accessible customer interactions through integrated ATM and self-service technologies.",
];

export const solutions = {
  eyebrow: "OUR SOLUTIONS",
  headline: "One Connected Portfolio. Endless Possibilities.",
  accent: "Endless Possibilities.",
  text: "From cloud infrastructure to intelligent applications and customer-facing technologies, Raya IT brings together the capabilities organizations need to build, secure, connect, and advance their digital ecosystems.",
  cardCta: "Explore Solution",
  cta: { label: "View All Solutions", href: `/solutions/${solutionItems[0].slug}` },
  items: solutionItems.map((s, i) => ({
    title: s.title,
    description: solutionDescriptions[i],
    href: `/solutions/${s.slug}`,
  })),
};

const serviceDescriptions = [
  "Plan, deploy, integrate, relocate, and optimize enterprise technology infrastructure with expert technical delivery.",
  "Assess security needs and implement protection measures that help organizations manage risk and strengthen their security posture.",
  "Support enterprise application lifecycles through advisory, implementation, upgrades, integration, and ongoing support.",
  "Advance data-driven operations through intelligent technology consulting, integration, and implementation services.",
  "Access Raya Data Center capabilities and related services that support dependable, secure, and scalable IT operations.",
  "Improve reliability and operational efficiency through proactive management, monitoring, maintenance, and ongoing technology support.",
];

export const services = {
  eyebrow: "OUR SERVICES",
  headline: "Expertise Beyond Implementation.",
  accent: "Beyond Implementation.",
  text: "Our specialized teams support technology initiatives from planning and delivery to optimization and day-to-day operations, helping organizations achieve performance, continuity, and lasting value from their investments.",
  cardCta: "Explore Service",
  cta: { label: "View All Services", href: `/services/${serviceItems[0].slug}` },
  items: serviceItems.map((s, i) => ({
    title: s.title,
    description: serviceDescriptions[i],
    href: `/services/${s.slug}`,
    // Hover preview image. Drop a file at public/images/services/<slug>.webp to replace the placeholder.
    image: `/images/services/${s.slug}.webp`,
  })),
};

// The brief lists nine industries; the sitemap defines six pages. Items without a page have no href yet.
const industryCopy: [string, string][] = [
  ["Banking & Financial Services", "Enable trusted, secure, and seamless digital financial operations."],
  ["Telecommunications", "Support connectivity, infrastructure performance, and service innovation."],
  ["Government & Public Sector", "Help public institutions build reliable systems and more connected services."],
  ["Energy & Utilities", "Support resilient operations and modern digital infrastructure."],
  ["Oil & Gas", "Connect critical environments and enhance operational visibility."],
  ["Retail & Commercial", "Enable efficient operations and stronger customer experiences."],
  ["Hospitality & Real Estate", "Create smarter spaces and more connected guest experiences."],
  ["Healthcare", "Support secure, connected, and reliable healthcare technology."],
  ["Manufacturing", "Improve visibility, integration, and efficiency across operations."],
];

export const industries = {
  eyebrow: "INDUSTRY EXPERTISE",
  headline: "Industry Knowledge. Technology That Delivers.",
  accent: "Technology That Delivers.",
  text: "Different sectors demand different answers. We combine technology expertise with an understanding of industry requirements to help organizations modernize operations, manage complexity, and deliver better experiences.",
  cta: { label: "Explore Industries", href: `/industries/${industryItems[0].slug}` },
  items: industryCopy.map(([title, description]) => {
    const page = industryItems.find((i) => i.title === title);
    // Card image: public/images/industries/<card title, lowercase, "&" -> "and", hyphenated>.webp
    const image = `/images/industries/${title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-")}.webp`;
    return { title, description, image, href: page ? `/industries/${page.slug}` : undefined };
  }),
};

export const sustainability = {
  eyebrow: "OUR RESPONSIBILITY",
  // PROPOSED EDIT (requested by client): original headline was "Progress with Purpose."
  headline: "Technology for a Sustainable Future.",
  accent: "Sustainable Future.",
  // Shown on two lines.
  lines: ["Technology for", "a Sustainable Future."],
  text: "We recognize the role technology can play in a more efficient and sustainable future. By helping organizations modernize infrastructure, use resources more effectively, and adopt smarter digital systems, we aim to support responsible innovation and long-term value creation.",
  cta: { label: "Explore Our Sustainability Approach", href: "#" },
};

export const partners = {
  eyebrow: "OUR TECHNOLOGY ECOSYSTEM",
  headline: "Powered by Leading Technology Partnerships.",
  accent: "Leading Technology Partnerships.",
  text: "We work with established global technology providers to combine leading platforms and products with local delivery expertise. Together, we help customers build integrated solutions aligned with their business priorities.",
  cta: { label: "Meet Our Partners", href: "/who-we-are/our-partners" },
};

export const footer = {
  closingHeadline: "Let’s Shape What’s Next.",
  accent: "What’s Next.",
  closingText:
    "Have a technology challenge or transformation goal? Connect with Raya IT and discover the right solution for your business.",
  cta: { label: "Contact Us", href: "/contact" },
  companyLinks: [
    { label: "About Raya IT", href: "/who-we-are/about-raya-it" },
    { label: "Our Businesses", href: "/who-we-are/our-businesses" },
    { label: "Partners", href: "/who-we-are/our-partners" },
    { label: "Sustainability", href: "#" },
    { label: "Careers", href: "#" },
  ],
  // PROPOSED COPY (requested by client): short line about Raya, condensed from the approved "Discover Raya IT" text.
  about: "A regional systems integrator helping enterprises and public-sector organizations since 1998.",
  phone: "(+202) 38276000",
  // Brief: confirm current headquarters address before launch.
  address:
    "Building No. 35, Unit B35-G142A, Walk of Cairo, Kilo 38 Cairo–Alexandria Desert Road, Beverly Hills, Sheikh Zayed, Giza, Egypt",
  legal: "© 2026 Raya Information Technology. All rights reserved.",
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ],
};
