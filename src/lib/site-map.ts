// Source of truth for the website structure: "Raya IT Site Map updated.xlsx".
// Menu groups without a landing page have no `href` and only exist in navigation.

export type PageKind = "landing" | "inner";

export type SiteNode = {
  title: string;
  slug: string;
  kind: PageKind;
  /** Sections rendered as anchors/tabs inside the page. */
  sections?: string[];
  children?: SiteNode[];
};

export type MenuGroup = {
  title: string;
  slug: string;
  /** True when the menu item has no landing page of its own (sitemap: "No Landing Page"). */
  hub: boolean;
  items: SiteNode[];
};

const inner = (title: string, slug: string, sections?: string[]): SiteNode => ({
  title,
  slug,
  kind: "inner",
  sections,
});

const landing = (
  title: string,
  slug: string,
  children?: SiteNode[],
  sections?: string[],
): SiteNode => ({ title, slug, kind: "landing", children, sections });

export const menu: MenuGroup[] = [
  {
    title: "Who We Are",
    slug: "who-we-are",
    hub: true,
    items: [
      inner("About Raya IT", "about-raya-it", [
        "Mission & Vision",
        "Our Journey",
        "Key Facts",
        "Regional Presence",
      ]),
      inner("Leadership", "leadership"),
      inner("Our Businesses", "our-businesses"),
      inner("Awards & Certifications", "awards-certifications"),
      inner("Our Partners", "our-partners"),
      inner("Financial Statements", "financial-statements"),
    ],
  },
  {
    title: "Solutions",
    slug: "solutions",
    hub: true,
    items: [
      landing("Cloud & Digital Infrastructure Solutions", "cloud-digital-infrastructure", [
        inner("Data Center Infrastructure Preparation", "data-center-infrastructure-preparation"),
        inner("Data Center Solutions & Private Cloud", "data-center-private-cloud"),
        inner("Enterprise Computing Solutions", "enterprise-computing"),
      ]),
      landing("Cyber Security Solutions", "cyber-security"),
      landing("Digital Workplace Solutions", "digital-workplace", [
        inner("Collaboration", "collaboration"),
        inner("Customer Experience", "customer-experience", [
          "Contact Center Solutions",
          "CX Solutions",
          "Raya Solutions (Coming Soon)",
        ]),
        inner("Integrated Low Current", "integrated-low-current"),
      ]),
      landing("Enterprise Applications & Software Solutions", "enterprise-applications", [
        inner("Oracle Applications & Technologies", "oracle-applications-technologies", [
          "Enterprise Business Solutions",
          "Raya Cloud Solutions",
        ]),
        inner("Digital Enterprise Management Solutions (DEMS)", "dems"),
        inner("Hospitality and F&B", "hospitality-fnb"),
      ]),
      landing("Digital Intelligence Solutions", "digital-intelligence", [
        inner("Digital Transformation", "digital-transformation", ["Solutions", "Use Cases"]),
        inner("Software Business Solutions", "software-business-solutions", [
          "Solutions",
          "Use Cases",
        ]),
      ]),
      landing("Telco Solutions", "telco"),
      landing("ATM & Self-Services Solutions", "atm-self-services"),
    ],
  },
  {
    title: "Services",
    slug: "services",
    hub: true,
    items: [
      landing("Infrastructure Professional Services", "infrastructure-professional-services"),
      landing("Cybersecurity Professional Services", "cybersecurity-professional-services"),
      landing("Business Application Services (ERP)", "business-application-services"),
      landing("Digital Intelligence Services", "digital-intelligence-services"),
      landing("RDC Services", "rdc-services"),
      landing("Managed Services", "managed-services", [
        inner("Collaboration Managed Services", "collaboration-managed-services", [
          "Business Communication",
          "Cloud Calling",
        ]),
        inner("Cybersecurity Managed Services", "cybersecurity-managed-services"),
      ]),
    ],
  },
  {
    title: "Industries",
    slug: "industries",
    hub: true,
    items: [
      inner("Banking & Financial Services", "banking-financial-services"),
      inner("Telecommunications", "telecommunications"),
      inner("Government & Public Sector", "government-public-sector"),
      inner("Oil & Gas", "oil-gas"),
      inner("Retail & Commercial", "retail-commercial"),
      inner("Hospitality & Real Estate", "hospitality-real-estate"),
      inner("Success Stories", "success-stories"),
    ],
  },
  {
    title: "Media Center",
    slug: "media-center",
    hub: true,
    items: [
      inner("Articles & News", "articles-news"),
      inner("Events & Exhibitions", "events-exhibitions"),
      // Blog is hidden initially per the sitemap: routable but not listed in navigation.
    ],
  },
];

/** Hidden pages: routable, excluded from menus. */
export const hiddenPages: { group: string; node: SiteNode }[] = [
  { group: "media-center", node: inner("Blog", "blog") },
];

export const contactPages: SiteNode[] = [
  inner("Sales Inquiry", "sales-inquiry"),
  inner("Technical Support", "technical-support"),
];

// ---------- Flattened page index ----------

export type Crumb = { title: string; href?: string };

export type PageEntry = {
  path: string; // "/solutions/digital-workplace/collaboration"
  title: string;
  kind: PageKind;
  trail: Crumb[]; // ancestors, excluding Home and the page itself
  sections: string[];
  children: PageEntry[];
  groupTitle: string;
};

function build(
  node: SiteNode,
  base: string,
  trail: Crumb[],
  groupTitle: string,
): PageEntry {
  const path = `${base}/${node.slug}`;
  const entry: PageEntry = {
    path,
    title: node.title,
    kind: node.kind,
    trail,
    sections: node.sections ?? [],
    children: [],
    groupTitle,
  };
  entry.children = (node.children ?? []).map((c) =>
    build(c, path, [...trail, { title: node.title, href: path }], groupTitle),
  );
  return entry;
}

const index: PageEntry[] = [];
const walk = (e: PageEntry) => {
  index.push(e);
  e.children.forEach(walk);
};

for (const g of menu) {
  for (const n of g.items) {
    walk(build(n, `/${g.slug}`, [{ title: g.title }], g.title));
  }
}
for (const h of hiddenPages) {
  const g = menu.find((m) => m.slug === h.group)!;
  walk(build(h.node, `/${g.slug}`, [{ title: g.title }], g.title));
}
for (const n of contactPages) {
  walk(build(n, "/contact", [{ title: "Contact Us", href: "/contact" }], "Contact Us"));
}

export const allPages = index;
export const findPage = (path: string) => index.find((p) => p.path === path);

/** Topics offered in inquiry forms (solutions + services). */
export const inquiryTopics: { group: string; options: string[] }[] = [
  {
    group: "Solutions",
    options: menu
      .find((m) => m.slug === "solutions")!
      .items.flatMap((n) => [n.title, ...(n.children?.map((c) => c.title) ?? [])]),
  },
  {
    group: "Services",
    options: menu.find((m) => m.slug === "services")!.items.map((n) => n.title),
  },
];
