// Subsidiaries — text and images from https://raya-it.net/discover-raya-subsidiaries/
// (wording kept as published; verify before launch). Add `href` to show a "Visit website" button.

export type Business = {
  id: string;
  name: string;
  /** Trailing part of the name shown in the accent colour. */
  accent: string;
  image: string;
  paragraphs: string[];
  stats: { to: number; suffix?: string; label: string }[];
  /** Standalone website of the subsidiary (not supplied yet). */
  href?: string;
};

export const businesses: Business[] = [
  {
    id: "raya-integration",
    name: "Raya Integration",
    accent: "Integration",
    image: "/images/businesses/raya-integration.webp",
    paragraphs: [
      "Raya Integration is the core subsidiary of Raya Information Technology as it enables industries with the needed Digital Transformation. Raya Integration provides its customers with a wide range of crucial solutions & services including Enterprise Network Infrastructure & Enterprise Management, Telecom solutions, security systems, Voice & Multimedia, Microsoft Solutions, as well as ATM & Self Service solutions.",
      "Raya Integration is leading the market for the implementation of new technological trends like Financial Inclusion Solutions, mobile wallet, Omni channel, Block chain, Analytics & Big Data, Cyber Security and Customer Experience (CX) that cater to the needs of the different industries it serves. Raya Integration prides itself in serving over 1000 customers across industries.",
    ],
    stats: [{ to: 1000, suffix: "+", label: "Customers across industries" }],
  },
  {
    id: "raya-international-services",
    name: "Raya International Services",
    accent: "International Services",
    image: "/images/businesses/raya-international-services.webp",
    paragraphs: [
      "For more than 20 years, Raya International services offers its customers business solutions through its wide range of products and services that automate and optimize their business processes and help them boost their business efficiency.",
      "With Regional offices located in Egypt, Saudi Arabia and UAE, Raya International Services has expanded its geographical presence and was able to have a solid track record in the field of Oracle ERP implementations and business solutions for top-notch customers in the government, utilities, health care and banking industries.",
      "Raya International Services is focused on implementing the newest ERP technologies either on-premise or cloud including financial, supply chain , human resources and CX management, working closely with its clients in the Middle East and Africa.",
    ],
    stats: [
      { to: 20, suffix: "+", label: "Years of business solutions" },
      { to: 3, label: "Regional offices: Egypt, Saudi Arabia, UAE" },
    ],
  },
  {
    id: "raya-data-center",
    name: "Raya Data Center",
    accent: "Data Center",
    image: "/images/businesses/raya-data-center.webp",
    paragraphs: [
      "Raya Data Center is the leading data center service provider in the Egyptian market with a large portfolio of outsourcing services including co-location, enterprise cloud solutions, virtual hosting, e-mail hosting, data center security and consulting, professional services – just to name a few. Since its official establishment in 2012, Raya Data Center enjoys the trust of more than 32 local and international clients from manufacturing, pharmaceutical, distribution, real estate and government sectors.",
      "With a data center facility that features highest standards of disaster recovery and secure network environment, Raya Data Center is committed to highest levels of compliance with international standards and quality management certifications.",
    ],
    stats: [
      { to: 2012, label: "Officially established", },
      { to: 32, suffix: "+", label: "Local and international clients" },
    ],
  },
  {
    id: "raya-networks-services",
    name: "Raya Networks Services",
    accent: "Networks Services",
    image: "/images/businesses/raya-networks-services.webp",
    paragraphs: [
      "Raya Network Services has 18 years of experience in building data centers for many customers across different industries with a long record of customer satisfaction. Our years of experience in the market enabled us to master the art of building data centers that are safe, secure and cater to the needs of each of our customer to help them achieve business efficiency and reach their targets.",
      "Since Uptime Institute is the IT industry’s most trusted and adopted global standard for the proper design, build and operation of data centers, RNS ensured its design team is also UPTIME certified to ensure our customers’ Data Centers are built up to international standards in terms of reliability and overall performance.",
    ],
    stats: [{ to: 18, label: "Years building data centers" }],
  },
];
