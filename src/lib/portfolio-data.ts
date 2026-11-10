import type {
  Book,
  Certification,
  ManifestItem,
  NavLink,
  SocialLink,
  TechItem,
  WorkProject,
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
  bookingUrl: "https://cal.com/aaqifshafi/quick-chat-with-aaqif",
  /** Cal.com event slug (`user/event`) used by the in-page booking embed. */
  calLink: "aaqifshafi/quick-chat-with-aaqif",
  tagline:
    "I ship products that work — APIs, event-driven pipelines, modern frontends, and everything in between. Building full-stack from Kashmir.",
} as const;

export const navLinks: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Blog", href: "/blog" },
];

export const manifest: ManifestItem[] = [
  { sigil: "~", value: "Kashmir, IN" },
  { sigil: "@", value: "aaqifshafi@gmail.com" },
  { sigil: ">", value: "Fullstack Eng @Designfolio" },
];

export const socialLinks: SocialLink[] = [
  { index: "01", label: "GitHub", href: "https://github.com/aaqifshafi" },
  {
    index: "02",
    label: "LinkedIn",
    href: "https://linkedin.com/in/aaqifshafi",
  },
  { index: "03", label: "Twitter / X", href: "https://x.com/aaqifshafi" },
  {
    index: "04",
    label: "Book a call",
    href: profile.bookingUrl,
    booking: true,
  },
];

export const readingList: Book[] = [];

export const work: WorkProject[] = [
  {
    slug: "designfolio",
    company: "Designfolio",
    role: "Full-Stack Product Engineer",
    type: "Full-time",
    period: "05.2026 — Now",
    icon: "designfolio",
    video: {
      sources: [
        { src: "/work/designfolio.av1.mp4", type: 'video/mp4; codecs="av01.0.08M.10"' },
        { src: "/work/designfolio.mp4", type: "video/mp4" },
      ],
      poster: "/work/designfolio-poster.jpg",
      width: 1280,
      height: 800,
    },
    active: true,
    liveUrl: "https://designfolio.me",
    liveLabel: "designfolio.me",
    blurb:
      "Portfolio builder for designers and developers. Built the full jobs board (scraping, Kanban + AI match scoring), mock interview, resume tailor, cover letter generation, the Tiptap case study editor, and dynamic templates.",
    product:
      "Designfolio is a portfolio builder for designers, developers, and anyone building a career in tech. Write case studies in a rich editor, pick from multiple beautiful templates, and let the AI handle the rest — matching you to jobs, tailoring your resume for each application, prepping you for interviews. Everything is grounded in your actual portfolio, not a generic profile.",
    sections: [
      {
        title: "Jobs Board",
        context:
          "Built the entire jobs system from zero — ingestion through display through AI-powered ranking. This is the feature I'm most proud of on this product.",
        bullets: [
          "Job scraping and aggregation pipeline — pulls listings from multiple sources into a unified feed",
          "Kanban board for tracking application stages (Applied → Interview → Offer → Rejected)",
          "AI match scoring: compares job requirements against the user's portfolio, experience, and skills",
          "Match reasons: explains why the user is (or isn't) a strong fit for each role",
          "Saved jobs, per-job notes, and stage transitions with history",
        ],
      },
      {
        title: "AI-Powered Career Tools",
        context:
          "Three context-aware AI tools that know the user's full portfolio — not just their resume. The AI reads their actual case studies, experience, and projects before generating anything.",
        bullets: [
          "Mock interview: generates role-specific questions, evaluates answers, and gives feedback",
          "Resume tailor: rewrites and optimises the resume for each specific job posting",
          "Cover letter generation: writes targeted letters grounded in the user's real work",
        ],
      },
      {
        title: "Portfolio Editor & Templates",
        context:
          "Contributed to the core editing experience — the thing users actually spend their time in.",
        bullets: [
          "Tiptap-based case study editor with rich text, embedded media, and image handling",
          "Dynamic field system for structured portfolio sections (role, outcomes, process, etc.)",
          "Multiple designed portfolio templates with live preview and instant switching",
        ],
      },
    ],
    tags: [
      "Next.js",
      "Express.js",
      "JavaScript",
      "MongoDB",
      "Vertex AI",
      "Razorpay",
      "Tiptap",
      "Vercel",
      "AWS",
    ],
  },
  {
    slug: "people-of-bengaluru",
    company: "People of Bengaluru",
    role: "Full-Stack Product Engineer",
    type: "Freelance",
    period: "10.2026 — Now",
    icon: "peopleofbengaluru",
    video: {
      sources: [
        { src: "/work/people-of-bengaluru.av1.mp4", type: 'video/mp4; codecs="av01.0.08M.10"' },
        { src: "/work/people-of-bengaluru.mp4", type: "video/mp4" },
      ],
      poster: "/work/people-of-bengaluru-poster.jpg",
      width: 1280,
      height: 800,
    },
    liveUrl: "https://peopleofbengaluru.com",
    liveLabel: "peopleofbengaluru.com",
    blurb:
      "A stylized 3D Bengaluru you walk through to discover the city's designers and builders. Built the game world, live multiplayer on Cloudflare Durable Objects, in-city chat and connections, invites, applications with Dodo Payments, and the admin.",
    product:
      "People of Bengaluru is a living game world — a stylized, game-quality 3D Bengaluru where designers and builders exist as characters. Instead of scrolling a feed, you walk the city, approach people, open their profiles, see what they're building, and connect. The city is the interface; the people are the network.",
    sections: [
      {
        title: "The 3D City",
        context:
          "Built the world in React Three Fiber — a recognisable but stylized Bengaluru that runs smoothly on phones as well as desktops.",
        bullets: [
          "Districts (Koramangala, HSR) with travel between them via portals",
          "Characters with floating nameplates, online dots, and status bubbles",
          "Day and night that follows Bengaluru's real clock",
          "Touch controls, full screen, and an iPhone Home Screen web app mode",
          "Performance tuning across portrait, landscape, and iPad",
        ],
      },
      {
        title: "Live City & Realtime",
        context:
          "Every member you see is a real person, live. Designed the realtime layer to keep positions, presence, and chat in sync across everyone in the city.",
        bullets: [
          "Cloudflare Workers + Durable Objects for real-time member positions",
          "One live tab per member with a clear 'live in another tab' state",
          "Idle members drop off the live map after ten minutes",
          "Load and abuse testing with simulated bot clients",
        ],
      },
      {
        title: "Connect, Chat & Missions",
        context:
          "The social layer — turning discovering someone into actually talking to them, without leaving the city.",
        bullets: [
          "Connect flow: intent, optional note, mutual match, and introduction",
          "Chat inside the city, with batched unread-message emails",
          "Search for people, profile panels, and unmatching with a cooldown",
          "Day Zero missions to guide new members through the world",
        ],
      },
      {
        title: "Membership, Invites & Admin",
        context:
          "The whole path from stranger to member — applying, reviewing, inviting, and signing in.",
        bullets: [
          "One-question application and admin review, with Dodo Payments",
          "Founder invites and member invite codes, tracked in the HUD",
          "Sign in by emailed six-digit code; transactional email via Resend",
          "Supabase auth and Postgres with separate staging and production",
          "Admin on its own subdomain, SEO, analytics, and CI checks on every PR",
        ],
      },
    ],
    tags: [
      "Next.js",
      "React Three Fiber",
      "TypeScript",
      "Cloudflare Workers",
      "Supabase",
      "Dodo Payments",
    ],
  },
  {
    slug: "tapaway",
    company: "Tapaway",
    role: "iOS & Full-Stack Engineer",
    type: "Freelance",
    period: "08.2026 — Now",
    icon: "tapaway",
    video: {
      sources: [
        { src: "/work/tapaway.av1.mp4", type: 'video/mp4; codecs="av01.0.08M.10"' },
        { src: "/work/tapaway.mp4", type: "video/mp4" },
      ],
      poster: "/work/tapaway-poster.jpg",
      width: 1280,
      height: 800,
    },
    liveUrl: "https://apps.apple.com/us/app/tapaway-digital-detox/id6801114477",
    liveLabel: "App Store",
    blurb:
      "iOS app that locks your chosen apps behind a physical NFC tag — tap to lock, tap again to unlock. Built the SwiftUI app, Screen Time and Core NFC integration, schedules and auto re-lock, Supabase sync, and the web store. Live on the App Store.",
    product:
      "Tapaway is a digital-detox app for iPhone. You pick the apps that distract you, and a physical NFC tag becomes the only way to lock and unlock them — the tag has to leave your hand to get your apps back. It's friction, not security: a deliberate pause between you and the scroll.",
    sections: [
      {
        title: "Lock Engine & Screen Time",
        context:
          "Built the core of the app — a single engine that owns lock state, so shields, sessions, and haptics never disagree.",
        bullets: [
          "FamilyControls + ManagedSettings app shielding with the system app picker",
          "Custom Shield Configuration extension for the locked-app screen",
          "Device Activity monitor extension for auto re-lock and schedules",
          "Sessions that survive relaunch, persisted with SwiftData in an App Group",
        ],
      },
      {
        title: "NFC Tags",
        context:
          "The physical tag is required in both directions, so tag handling had to be fast and reliable.",
        bullets: [
          "Core NFC scanning and provisioning of password-protected NTAG213 tags",
          "Keychain-stored secrets with constant-time verification",
          "Tag registration, sharing a tag across accounts, and Face ID to end a session",
        ],
      },
      {
        title: "App Experience",
        context:
          "Shipped every screen in the app to a dark-only design system with shared motion and haptic timing.",
        bullets: [
          "Onboarding, sign-in, Home (Ready / Locked / Set up), Modes, and Settings",
          "Schedules with time-first cards and day strips",
          "Activity screen with animated, inspectable usage statistics",
          "Core Haptics and synthesized sound feedback",
        ],
      },
      {
        title: "Backend, Store & Release",
        context:
          "Everything around the app — accounts, sync, selling tags, and getting through App Review.",
        bullets: [
          "Supabase auth and sync engine for tags, sessions, and profiles",
          "Next.js web store for NFC tags with Dodo Payments checkout and an admin",
          "Privacy manifests, account deletion, and App Store submission",
          "Swift Testing suite with simulator mocks for NFC and Screen Time",
        ],
      },
    ],
    tags: ["Swift", "SwiftUI", "SwiftData", "Core NFC", "Screen Time", "Supabase"],
  },
  {
    slug: "gistr",
    company: "Gistr Technologies",
    role: "Fullstack Product Engineer",
    type: "Full-time",
    period: "01.2025 — 04.2026",
    icon: "gistr",
    video: {
      sources: [
        { src: "/work/gistr.av1.mp4", type: 'video/mp4; codecs="av01.0.08M.10"' },
        { src: "/work/gistr.mp4", type: "video/mp4" },
      ],
      poster: "/work/gistr-poster.jpg",
      width: 1280,
      height: 800,
    },
    liveUrl: "https://gistr.so",
    liveLabel: "gistr.so",
    blurb:
      "AI knowledge workspace. Shipped multi-format ingestion (PDF, EPUB, DOCX, PPTX, podcasts, web), a credit-based billing system with Dodo Payments, BullMQ job queues, PostHog analytics, and core AI features across the product.",
    product:
      "Gistr is an AI knowledge workspace — not a chatbot. You add sources (PDFs, podcasts, web pages, EPUB, DOCX, PPTX) and Gistr builds a context-aware thread for each one. Inside each thread: smart questions, AI toolkits, response editing, highlights, notes, and export. The goal is to let you think inside the source, not copy it into a separate tool.",
    sections: [
      {
        title: "File Ingestion & Source Processing",
        context:
          "Each source type has a completely different structure — a podcast is not a PDF. Built separate extraction and chunking paths per format so the AI always gets clean, queryable context.",
        bullets: [
          "PDF text extraction, page chunking, and OCR support for scanned documents",
          "EPUB and MOBI parsing — navigating spine, chapters, and metadata",
          "DOCX and PPTX content extraction (text, headings, slide content)",
          "Markdown and TXT ingestion with frontmatter awareness",
          "Web page scraping with content cleanup and noise removal",
          "Podcast feed parsing and audio transcript handling",
        ],
      },
      {
        title: "Pricing System",
        context:
          "Designed and built the full billing stack — from the credit engine in the backend to the pricing UI and plan enforcement on the frontend.",
        bullets: [
          "Credit-based billing backend in NestJS — tracks usage, deducts on actions, handles top-ups",
          "Dodo Payments integration for subscriptions and one-time purchases",
          "Frontend pricing page with plan comparison and upgrade flows",
          "Plan restriction enforcement — feature gates, usage locks, and upgrade prompts across the product",
        ],
      },
      {
        title: "Background Infrastructure",
        context:
          "Heavy operations like file processing and AI generation can't block the request cycle. Set up the async job layer and analytics to handle this cleanly.",
        bullets: [
          "BullMQ job queues for file ingestion, AI response generation, and export tasks",
          "Job retry logic, failure handling, and queue monitoring",
          "PostHog integration for user interaction tracking, funnel analysis, and feature usage insights",
        ],
      },
      {
        title: "Profile & State Management",
        context:
          "Built the user profile dashboard — the identity layer of the product — with complex editing flows and real-time state.",
        bullets: [
          "Profile editor with real-time state management across multiple editable fields",
          "Avatar upload, metadata, timezone, and preference management",
          "Dashboard showing credit usage, plan status, and activity",
        ],
      },
      {
        title: "Core Product Features",
        context:
          "Contributed to most of the active features inside the knowledge workspace — the things users actually spend their time in.",
        bullets: [
          "Smart questions and AI toolkits (guided prompts per source type)",
          "Auto-highlight and select-ask (highlight text → ask AI about it)",
          "Chapters and timestamps for navigating long documents",
          "Highlights, PDF annotations, and note editor",
          "Easy follow-ups and moments (save key AI exchanges)",
          "Language translation for AI responses",
          "YouTube screenshots for video sources",
          "Export as PDF, image, or Markdown",
          "Source in context — AI always knows which source it is reading",
        ],
      },
    ],
    tags: [
      "NestJS",
      "TypeScript",
      "Next.js",
      "BullMQ",
      "Dodo Payments",
      "PostHog",
      "MongoDB",
    ],
  },
  {
    slug: "payoll",
    company: "Payoll Payments LLC",
    role: "Software Engineering Intern",
    type: "Intern",
    period: "09.2024 — 01.2025",
    icon: "wallet",
    hidden: true,
    blurb:
      "B2B payment consolidation API. Built full-stack features for the multi-biller platform and contributed to Ared — an AI carbon footprint calculator with a carbon credit marketplace.",
    product:
      "Payoll is a B2B payment service that consolidates multiple billers into a single API — one integration for business clients instead of maintaining separate connections to each biller. I also contributed to Ared, a sister product: an AI-powered carbon footprint calculator with an integrated carbon credit marketplace.",
    sections: [
      {
        title: "Payoll API",
        context:
          "Payoll consolidates multiple billers into a single API for business clients — one integration instead of many. Built full-stack features across the platform.",
        bullets: [
          "Payment routing and biller integration features for the multi-biller consolidation layer",
          "API endpoints handling multi-biller transaction flows",
          "Frontend dashboard features for business client account management",
        ],
      },
      {
        title: "Ared — Carbon Footprint Platform",
        context:
          "Ared is an AI-powered carbon footprint calculator with an integrated carbon credit marketplace. Contributed to both the calculator and the marketplace side.",
        bullets: [
          "AI-powered carbon footprint estimation from user activity inputs",
          "Carbon credit marketplace integration for offset purchasing",
          "Data visualisation for emissions tracking and progress over time",
        ],
      },
    ],
    tags: ["Express", "Vite", "PostgreSQL", "JavaScript", "Redux", "Redis"],
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
