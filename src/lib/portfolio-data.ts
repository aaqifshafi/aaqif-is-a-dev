import type {
  Book,
  Certification,
  ExperienceRole,
  ManifestItem,
  NavLink,
  Project,
  SocialLink,
  TechItem,
} from "@/types/portfolio";

/** Single source of content for the portfolio. */

export const profile = {
  name: "Aaqif Shafi",
  handle: "@aaqifshafi",
  title: "Full-Stack Product Engineer",
  photo: "/avatar.png",
  location: "Kashmir, India",
  timezone: "Asia/Kolkata",
  available: true,
  email: "aaqifshafi@gmail.com",
  tagline:
    "I ship products that work — APIs, event-driven pipelines, modern frontends, and everything in between. Building full-stack from Kashmir.",
} as const;

export const navLinks: NavLink[] = [
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
];

export const manifest: ManifestItem[] = [
  { sigil: "~", value: "Kashmir, IN" },
  { sigil: "@", value: "aaqifshafi@gmail.com" },
  { sigil: ">", value: "Fullstack Eng @Gistr" },
];

export const socialLinks: SocialLink[] = [
  { index: "01", label: "GitHub", href: "https://github.com/aaqifshafi" },
  {
    index: "02",
    label: "LinkedIn",
    href: "https://linkedin.com/in/aaqifshafi",
  },
  { index: "03", label: "Twitter / X", href: "#" },
];

export const readingList: Book[] = [];

export const experience: ExperienceRole[] = [
  {
    company: "Gistr Technologies",
    role: "Fullstack Product Engineer",
    type: "Full-time",
    period: "01.2025 — ∞",
    icon: "gistr",
    active: true,
    highlights: [
      "Own end-to-end product features across frontend and backend for the core Gistr platform.",
      "Integrated payment gateways for secure subscription and billing flows; built async job queues with BullMQ.",
      "Built the AI-powered Gistr product with Next.js SSR/SSG, monorepo architecture, and CI/CD pipelines.",
      "Integrated PostHog for product analytics, user interaction tracking, and performance insights.",
    ],
    tags: [
      "NestJS",
      "TypeScript",
      "Next.js",
      "BullMQ",
      "AWS Lambda",
      "PostHog",
      "MongoDB",
    ],
  },
  {
    company: "Payoll Payments LLC",
    role: "Software Engineering Intern",
    type: "Intern",
    period: "09.2024 — 01.2025",
    icon: "wallet",
    highlights: [
      "Built full-stack features for Payoll API — a B2B payment service consolidating multiple billers into one platform.",
      "Contributed to Ared, an AI-powered carbon footprint calculator with integrated carbon credit marketplace.",
    ],
    tags: ["express", "Vite", "PostgreSQL", "javascript", "Redux", "Redis"],
  },
];

export const techStack: TechItem[] = [
  {
    name: "TypeScript",
    icon: "typescript",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "JavaScript",
    icon: "javascript",
    url: "https://developer.mozilla.org/docs/Web/JavaScript",
  },
  { name: "React", icon: "react", url: "https://react.dev" },
  { name: "Next.js", icon: "next", url: "https://nextjs.org" },
  { name: "Tailwind CSS", icon: "tailwind", url: "https://tailwindcss.com" },
  { name: "Motion", icon: "motion", url: "https://motion.dev" },
  { name: "Node.js", icon: "node", url: "https://nodejs.org" },
  { name: "PostgreSQL", icon: "postgres", url: "https://www.postgresql.org" },
  { name: "MongoDB", icon: "mongodb", url: "https://www.mongodb.com" },
  { name: "Redis", icon: "redis", url: "https://redis.io" },
  { name: "AWS", icon: "aws", url: "https://aws.amazon.com" },
  { name: "Vercel", icon: "vercel", url: "https://vercel.com" },
  { name: "Vite", icon: "vite", url: "https://vitejs.dev" },
  { name: "Bun", icon: "bun", url: "https://bun.sh" },
  { name: "Git", icon: "git", url: "https://git-scm.com" },
  { name: "GitHub", icon: "github", url: "https://github.com" },
  { name: "VS Code", icon: "vscode", url: "https://code.visualstudio.com" },
  { name: "Claude Code", icon: "claude", url: "https://claude.ai/code" },
  { name: "Cursor", icon: "cursor", url: "https://cursor.com" },
];

export const projects: Project[] = [
  {
    index: "01",
    title: "Chat With PDF",
    description:
      "Conversational AI platform for semantic document search and PDF understanding, built with LangChain, Pinecone, and OpenAI.",
    tags: ["Next.js", "LangChain", "Pinecone"],
    href: "https://github.com/aaqifshafi/chat-with-pdf",
  },
  {
    index: "02",
    title: "College Management System",
    description:
      "Full-stack educational platform with student and admin portals, fee payments via Stripe, results management, and AI-generated question papers.",
    tags: ["Next.js", "Express", "MongoDB", "Stripe"],
    href: "https://github.com/aaqifshafi/G-CET",
  },
];

export const certifications: Certification[] = [
  {
    index: "01",
    title: "Next.js SEO Fundamentals",
    issuer: "Vercel / Next.js",
    year: "2025",
    href: "https://nextjs.org/learn/certificate?course=seo&user=96351&certId=seo-96351-1756570830061",
  },
  {
    index: "02",
    title: "Python with Data Science & Machine Learning",
    issuer: "NIELIT",
    year: "2023",
    href: "https://drive.google.com",
  },
  {
    index: "03",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2023",
    href: "https://www.freecodecamp.org/certification/aaqifshafi/responsive-web-design",
  },
  {
    index: "04",
    title: "The Complete 2023 Web Development Bootcamp",
    issuer: "Udemy",
    year: "2023",
    href: "https://www.udemy.com/certificate/UC-5cc6a295-a354-4817-b93b-aca290fbc7d5/",
  },
  {
    index: "05",
    title: "HTML, CSS, and Javascript for Web Developers",
    issuer: "Johns Hopkins University",
    year: "2022",
    href: "https://www.coursera.org/account/accomplishments/verify/DYPGW6U9ZE3B?utm_product=course",
  },
  {
    index: "06",
    title: "Fundamentals of Digital Marketing",
    issuer: "Google",
    year: "2021",
    href: "https://drive.google.com",
  },
];

export const footer = {
  tagline: "Open source.",
  sourceUrl: "https://github.com/aaqifshafi/aaqif.is-a.dev",
  links: [
    { label: "GITHUB", href: "https://github.com/aaqifshafi" },
    { label: "LINKEDIN", href: "https://linkedin.com/in/aaqifshafi" },
  ],
  version: "v0.1.0.6",
} as const;
