// Directors' names, roles, photos and biographies are taken from https://raya-it.net/directors/
// (wording kept as published; check spellings and details before launch).

export type Director = {
  slug: string;
  name: string;
  role: string;
  org: string;
  /** Photo in public/images/leadership/<slug>.webp — omit when none is available (initials are shown). */
  photo?: string;
  bio: string[];
};

export const directors: Director[] = [
  {
    slug: "marwa-abbas",
    name: "Marwa Abbas",
    role: "CEO",
    org: "Raya Information Technology",
    photo: "/images/leadership/marwa-abbas.webp",
    bio: [
      "Marwa Abbas is the Chief Executive Officer of Raya Information Technology, one of the region’s leading digital transformation and system integrators.",
      "With more than 30 years of experience in the ICT industry, Marwa leads the company’s strategic vision, driving sustainable growth, accelerating innovation, strengthening customer-centric transformation, and expanding Raya IT’s regional presence across the Middle East and Africa.",
    ],
  },
  {
    slug: "ali-el-miligy",
    name: "Ali El Miligy",
    role: "Senior Director Sales",
    org: "Raya Integration",
    photo: "/images/leadership/ali-el-miligy.webp",
    bio: [
      "Ali El Meligy brings over 25 years of experience in enterprise technology, sales leadership, and digital transformation across Egypt and Saudi Arabia. He has held senior leadership positions at leading global technology companies, including Nutanix, OpenText, and Hewlett Packard Enterprise (HPE).",
    ],
  },
  {
    slug: "mohamed-naeim",
    name: "Mohamed Naeim",
    role: "Managing Director",
    org: "Raya International Services",
    photo: "/images/leadership/mohamed-naeim.webp",
    bio: [
      "Mohamed Naeim is the managing director Raya International Services",
      "Naeim has a wide international experience in project and general management by working in those fields for over 27 years. Naeim joined Raya Information Technology in April 2010, where he successfully held different positions in project management. Naeim then worked in a number of reputable companies in Australia in his field of experience. His expertise and his valued track record lead him to rejoin Raya Information Technology as the managing director of Raya International Services in March 2017, where he has been leading this subsidiary successfully.",
      "Naeim hold a Bachelor degree from Sadat Academy in Management Sciences and a Diploma from in Project Management from the Regional IT Institute.",
    ],
  },
  {
    slug: "mohamed-el-rewany",
    name: "Mohamed El Rewany",
    role: "Managing Director",
    org: "Raya Data Center",
    photo: "/images/leadership/mohamed-el-rewany.webp",
    bio: [
      "Mohamed El Rewany brings over 20 years of experience in telecommunications, enterprise technology, commercial leadership, and digital transformation. He has held senior leadership positions at leading telecom operators, including Etisalat Egypt, Orange Wholesale, and Vodafone Egypt and Group.",
      "Most recently, he served as Enterprise Digital Solutions Senior Director at Etisalat Egypt, driving enterprise solutions across cloud, connectivity, cybersecurity, and IoT. Throughout his career, he has led business growth, strategic partnerships, and commercial operations across Egypt and the wider Middle East.",
    ],
  },
  {
    slug: "yasser-kotb",
    name: "Yasser Kotb",
    role: "Director",
    org: "Raya Networks Services",
    photo: "/images/leadership/yasser-kotb.webp",
    bio: [
      "Yasser Kotb in his capacity as a Director of Raya Network Services, a subsidiary of Raya Information Technology is valued for his 25+ years’ experience in ICT Information Communication Technology field, planning and directing administrative functions to meet time-critical deadlines.",
      "His ability to combine dynamic organizational and communication skills with the capability to independently multitask, plan and direct demanding administrative operations and complex schedules, enable him to lead Raya Netwok service successfully since 2014.",
    ],
  },
  {
    slug: "muhammed-karam",
    name: "Muhammed Karam",
    role: "Managing Director",
    org: "Raya Digital",
    photo: "/images/leadership/muhammed-karam.webp",
    bio: [
      "Mohamed brings a proven track record with more than 29 years of leadership experience in driving large-scale digital transformation initiatives, building high-performing teams, and leading growth across emerging technology domains.",
      "His career having led high-impact roles at multiple multinationals locally & regionally, where he consistently delivered strategic growth, built new business units from the ground up, and spearheaded large, complex technology programs for government, healthcare, and enterprise clients. Mohamed leads the creation and growth of Raya Digital subsidiary; the innovation and next-generation technology arm of Raya IT with a mandate to shape the future of the company’s digital capabilities.",
    ],
  },
  {
    slug: "atef-magdy",
    name: "Atef Magdy",
    role: "Managing Director",
    org: "KSA",
    photo: "/images/leadership/atef-magdy.webp",
    bio: [
      "Atef brings 27+ years of experience across the FinTech, IT, and telecommunications industries, including 18+ years in business and technical leadership and 9+ years in technical and technical sales roles across Egypt, the Middle East, and Africa.",
      "With a proven track record in delivering revenue, profitability, operational excellence, and sustainable growth, Atef has led business transformation initiatives aligned with evolving market needs while strengthening organizational capabilities. He is also passionate about developing high-performing teams and supporting individuals in achieving their professional and business goals.",
      "Atef holds an MBA from the University of Warwick, UK, and a Bachelor’s degree in Electrical Engineering, Communications and Electronics, from Cairo University.",
    ],
  },
];
