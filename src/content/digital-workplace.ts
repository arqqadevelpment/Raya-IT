// Digital Workplace Solutions.
// Collaboration and Integrated Low Current text: https://raya-it.net/collaboration-solutions/ and
// https://raya-it.net/low-current-solution/ (wording kept as published).
// Customer Experience: no source page was supplied — the summary re-uses the "Contact Center and
// Self Services" paragraph from the Collaboration page. PROPOSED, please review.

export type WorkplaceSection = {
  slug: string;
  title: string;
  accent: string;
  summary: string;
  highlights: string[];
  image: string;
  /** Full page exists (otherwise the section links to the placeholder page). */
  href: string;
};

export const digitalWorkplace = {
  intro:
    "Enable connected, productive work experiences through collaboration platforms, workplace technologies, and smarter digital environments.",
  sections: [
    {
      slug: "collaboration",
      title: "Collaboration",
      accent: "Collaboration",
      summary:
        "The way we work together has changed. Your employees, customers, suppliers and business partners are teaming up from all over the world, whenever they want, from any device. Raya IT provides consultancy, design and implementation for better collaboration in the age of digital transformation.",
      highlights: [
        "Unified Communication",
        "Tele-presence and Video Conferencing",
        "Contact Center and Self Services",
        "Digital Media Signage",
        "IPTV and Content Delivery",
      ],
      image: "/images/workplace/collaboration.webp",
      href: "/solutions/digital-workplace/collaboration",
    },
    {
      slug: "customer-experience",
      title: "Customer Experience",
      accent: "Experience",
      summary:
        "Your contact center platform should enable your organization to be agile in the way you interact with customers, deliver a truly connected customer journey across all types of interactions, and be easy to deploy and intuitive to use. Raya IT designs and deploys it for you.",
      highlights: ["Contact Center Solutions", "CX Solutions", "Raya Solutions (Coming Soon)"],
      image: "/images/workplace/customer-experience.webp",
      href: "/solutions/digital-workplace/customer-experience",
    },
    {
      slug: "integrated-low-current",
      title: "Integrated Low Current",
      accent: "Low Current",
      summary:
        "Raya’s integrated Low Current offering is an integrated solution that offers customers a range of audiovisual, physical security and automation technologies that allow them to utilize a single IP-based platform to operate their services, while reducing installation and operation costs.",
      highlights: [
        "Audiovisual Solutions",
        "Physical Security Advanced Solution",
        "Command & Control Solutions",
        "Building Management Systems",
        "Smart Cities & Smart Homes",
      ],
      image: "/images/workplace/integrated-low-current.webp",
      href: "/solutions/digital-workplace/integrated-low-current",
    },
  ] satisfies WorkplaceSection[],
};

export type DetailItem = { title?: string; text?: string; icon?: string };

export type WorkplaceDetail = {
  title: string;
  topic: string;
  image: string;
  introTitle?: string;
  questions?: string[];
  intro: string[];
  componentsTitle: string;
  components: DetailItem[];
  useCases?: DetailItem[];
  valueTitle?: string;
  value?: DetailItem[];
  industries: string[];
};

export const collaborationDetail: WorkplaceDetail = {
  title: "Collaboration Solutions",
  topic: "Collaboration Solutions",
  image: "/images/workplace/collaboration.webp",
  questions: [
    "Does your company need strong communication & collaboration internally with employees and externally with stakeholders?",
    "Are you looking for a solution to unify your company’s communication?",
    "Is you company in need of better collaboration between teams?",
    "Is your company in need of a simple solution to provide easy communication channels at a lower cost?",
  ],
  intro: [
    "The way we work together has changed. Your employees, customers, suppliers and business partners are teaming up from all over the world, whenever they want, from any device. RAYA IT, provides consultancy, Design and Implementation for better collaboration in the age of digital transformation.",
    "We help you to design the most beneficial solutions for your business that will bring flexibility and simplicity in your work processes, while eliminating risk, increasing security and maintaining your budget.",
  ],
  componentsTitle: "Solution Components",
  components: [
    {
      title: "Unified Communication", icon: "messages",
      text: "Consolidate your communications infrastructure and enable your people and teams to communicate simply with a unified communication solution featuring IP telephony, high definition video, unified messaging, instant messaging and presence, plus much more.",
    },
    {
      title: "Tele-presence and Video Conferencing", icon: "video",
      text: "Raya IT/ Cisco have the Complete Video Conferencing Solution portfolio, Starting from the Mobile apps, Endpoints down to the infrastructure level, not only this but also Cisco provide a lot of APIs for integration with 3rd part Apps and vendors, adding to this cisco solution is all in one consolidated Video Solution that provide several VC infrastructure component into one box.",
    },
    {
      title: "Contact Center and Self Services", icon: "headset",
      text: "We believe that your contact center platform should enable your organization to be agile in the way you interact with customers, should deliver a truly connected customer journey across all types of interactions and should be easy to deploy and intuitive to use. Whether you are creating a new contact center or looking to upgrade an existing platform you have grown out of, Raya IT/ Cisco provides you with an effective way to start delivering tomorrow’s customer collaboration today. You simply select the features and options that aligns to your contact center needs and we will design & deploy it for you.",
    },
    {
      title: "Digital Media Signage", icon: "signage",
      text: "Digital Media Signage is a solution for creating, managing and deploying digital content. It is a reliable and user-friendly software system that gives marketers and retailers total control over how and where content is played across a network of screens, ensuring relevance to current audiences. We approach each project by focusing on flexible solutions. Our professional customized solutions come with everything you need including solution design, installation assistance, customer service and support options to fit any project requirements. We have the in-house expertise, tools and capabilities to successfully tackle any project, no matter the size or complexity.",
    },
    {
      title: "IPTV and Content Delivery", icon: "tv",
      text: "IPTV Solution delivers television services over a local access network (LAN) or the Internet via a communication method called Internet Protocol (IP). These secure packet-switched networks are access agnostic, meaning that all transmitted content including audio, video, text, images, and data, can be viewed on any connected device. Television services offered through IPTV server technology are subscription based and fall under three broad categories: live TV optionally featuring interactivity with the show currently broadcasted; time-shifted TV which includes catch-up TV that replays a show from a video streaming server that was broadcasted hours or days earlier; and video on demand (VOD), which allows subscribers to select and view videos of interest from a catalog, or library.",
    },
  ],
  useCases: [
    {
      title: "Collaborate with External Organization",
      icon: "handshake",
      text: "Easily share information, interact in real time, and communicate across channels beyond e-mail and telephone.",
    },
    {
      title: "Help Enable Meetings with Remote Participants",
      icon: "remote",
      text: "Use web conferencing so employees or customers can attend meetings any time, any where.",
    },
    {
      title: "Incorporate Video into Meetings",
      icon: "video",
      text: "Improve communications, relationships, and productivity by making it easier to meet face-to-face over distance.",
    },
    {
      title: "Use Team Workspaces to Collaborate",
      icon: "team",
      text: "Eliminate organization and geographic boundaries by bringing dispersed groups together in secured virtual rooms.",
    },
    {
      title: "Provide OmniChannel Customer Service",
      icon: "headset",
      text: "Move past typical customer-interaction to create more interactive and collaborative relationships.",
    },
    {
      title: "Support Teleworkers and Branch Offices",
      icon: "laptop",
      text: "Give employees the flexibility to work from multiple locations, more securely and productively.",
    },
  ],
  // The first three titles are PROPOSED (the published text has no headings for these points).
  valueTitle: "Raya Added Value",
  value: [
    {
      icon: "award",
      title: "Cisco Gold Partner",
      text: "Being Cisco’s Gold Partner Raya IT provides all Cisco solutions required to implement the right solution for your company by delivering a complete integrated Unified Communication, Video/ Web Conferencing & Contact center solutions.",
    },
    {
      icon: "team",
      title: "Consultancy, Design & Implementation",
      text: "Our team deliver the Consultancy, Design and Implementation for Raya IT Unified Collaboration & Multimedia portfolio.",
    },
    {
      icon: "wrench",
      title: "Revamp & Renovate",
      text: "We also provide high professional services to revamp/renovate your existing Unified Collaboration and Multimedia equipment to ensure optimal usage of your current solutions.",
    },
    {
      icon: "reliability",
      title: "Reliability",
      text: "Hold your meeting regardless of weather, flight delays…etc.",
    },
    {
      icon: "productivity",
      title: "Increase Productivity",
      // PROPOSED EDIT (requested by client): shortened from the published wording.
      text: "Less time lost travelling and recovering, more time getting the job done, solving problems and building stronger working relationships for better decisions.",
    },
    { icon: "efficiency", title: "Efficiency", text: "Be in two places at the same time." },
    {
      icon: "morale",
      title: "Improve Employee Morale",
      text: "A lot of traveling can be tiring and your team might be overwhelmed with other meetings & project deliveries.",
    },
    { icon: "savings", title: "Save time & money" },
    {
      icon: "convenience",
      title: "Convenience",
      text: "You can easily add key personnel, interns, or a unplanned speaker with the click of a button and at no added cost.",
    },
  ],
  industries: ["Banking", "Commercial", "Telecom", "Oil & Gas"],
};

export const lowCurrentDetail: WorkplaceDetail = {
  title: "Low Current Solutions",
  topic: "Integrated Low Current",
  image: "/images/workplace/integrated-low-current.webp",
  intro: [
    "Raya’s integrated Low Current offering is an integrated solution that offers customers a range of audiovisual, physical security and automation technologies that allow them to utilize a single IP-based platform to operate their services, while reducing installation and operation costs.",
    "Capitalizing on the leading technology vendors, Raya IT provides customers with a single point of contact to design, plan, install and operate the proposed solutions.",
  ],
  componentsTitle: "Solution Components",
  components: [
    { title: "Audiovisual Solutions", icon: "audiovisual" },
    { title: "Physical Security Advanced Solution", icon: "security" },
    { title: "Command & Control Solutions", icon: "command" },
    { title: "Building Management Systems", icon: "building" },
    { title: "Smart Cities & Smart Homes", icon: "smart" },
    { title: "Room Management System", icon: "room" },
    { title: "Automation Solutions", icon: "automation" },
    { title: "Parking Systems Solutions", icon: "parking" },
  ],
  industries: ["Banking", "Telecom", "Government", "Hospitality", "Commercial", "Oil & Gas"],
};
