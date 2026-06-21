import type { Metadata } from "next";
import { IconArrowUpRight, IconBriefcase2, IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";

export const metadata: Metadata = {
  title: "Designfolio — Aaqif Shafi",
  description:
    "How Aaqif Shafi built the jobs board, AI career tools, and portfolio editor at Designfolio.",
};

type CaseSection = {
  title: string;
  context: string;
  bullets: string[];
};

const sections: CaseSection[] = [
  {
    title: "Jobs Board",
    context:
      "Built the entire jobs system from zero — ingestion through display through AI-powered ranking. This is the feature I'm most proud of on this product.",
    bullets: [
      "Job scraping and aggregation pipeline — pulls listings from multiple sources into a unified feed",
      "Kanban board for tracking application stages (Applied → Interview → Offer → Rejected)",
      "AI match scoring: compares job requirements against the user's portfolio, experience, and skills",
      "Match reasons: explains *why* the user is (or isn't) a strong fit for each role",
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
];

const techTags = [
  "Next.js",
  "NestJS",
  "TypeScript",
  "Tiptap",
  "PostgreSQL",
  "shadcn/ui",
  "AI",
];

export default function DesignfolioPage() {
  return (
    <>
      <TopNav />
      <main className="mx-auto w-full max-w-2xl grow px-5 sm:px-6">
        <div className="flex flex-col gap-12 py-14 sm:py-20">

          {/* Back */}
          <Reveal immediate>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 font-technical text-[11px] text-outline transition-colors hover:text-primary"
            >
              <IconChevronLeft className="size-3.5" />
              Work
            </Link>
          </Reveal>

          {/* Header */}
          <Reveal className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
                  <IconBriefcase2 className="size-5 text-on-surface-variant" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <h1 className="font-pixel text-xl text-primary sm:text-2xl">Designfolio</h1>
                    <span className="flex items-center gap-1 font-technical text-[10px] text-[hsl(var(--color-success))]">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-current" />
                      </span>
                      now
                    </span>
                  </div>
                  <span className="font-technical text-[11px] text-outline">
                    Full-Stack Product Engineer · 05.2026 — Now
                  </span>
                </div>
              </div>
              <a
                href="https://designfolio.me"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex shrink-0 items-center gap-1 font-technical text-[11px] text-outline transition-colors hover:text-primary"
              >
                designfolio.me
                <IconArrowUpRight className="size-3.5 transition-transform duration-200 ease-snappy group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          {/* What is Designfolio */}
          <Reveal className="flex flex-col gap-3">
            <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
              {"// product"}
            </span>
            <p className="font-technical text-xs leading-relaxed text-on-surface-variant sm:text-sm">
              Designfolio is a portfolio builder for designers, developers, and anyone building a
              career in tech. Write case studies in a rich editor, pick from multiple beautiful
              templates, and let the AI handle the rest — matching you to jobs, tailoring your
              resume for each application, prepping you for interviews. Everything is grounded in
              your actual portfolio, not a generic profile.
            </p>
          </Reveal>

          {/* What I built */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
                {"// what I built"}
              </span>
            </Reveal>

            {sections.map((section) => (
              <Reveal key={section.title} className="flex flex-col gap-3">
                <h2 className="font-pixel text-base text-primary">{section.title}</h2>
                <p className="font-technical text-xs leading-relaxed text-on-surface-variant">
                  {section.context}
                </p>
                <ul className="flex flex-col gap-1.5 pl-1">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 font-technical text-xs text-on-surface-variant"
                    >
                      <span className="mt-px shrink-0 text-outline">–</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* Tech */}
          <Reveal className="flex flex-col gap-3">
            <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
              {"// stack"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border px-2 py-0.5 font-technical text-[11px] text-outline"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
