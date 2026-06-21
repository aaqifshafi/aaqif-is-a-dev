import type { Metadata } from "next";
import { IconArrowUpRight, IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";

export const metadata: Metadata = {
  title: "Gistr Technologies — Aaqif Shafi",
  description:
    "How Aaqif Shafi built file ingestion, pricing infrastructure, BullMQ job queues, and core AI features for Gistr's knowledge workspace.",
};

function GistrIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 20" fill="none" aria-hidden="true" className={className}>
      <g fill="currentColor">
        <path d="M12.994.476l-.31 4.449c0 .107-.06.214-.134.291l-2.027 1.948a.409.409 0 01-.68-.184c-.37-1.196-1.361-3.574-3.506-3.574-2.146 0-4.04 2.101-2.856 5.292 1.021 2.746 4.069 1.534 5.104 1.059 2.412-1.09 5.282-4.633 6.614-6.397.577-1.028.577-1.028.68-1.12.148 0 .119.36.119.399l-.06 4.817a.497.497 0 01-.118.307c-.784.828-5.282 5.43-8.255 6.013-2.412.476-6.333-.629-7.353-5.292C-.81 3.82 2.09 1.334 4.088.644 5.198.261 7.964.537 9 .814c1.035.275.503-.124.517-.4 0-.23.193-.414.415-.414h2.633c.237 0 .43.215.414.46l.015.016z" />
        <path d="M.817 14.19H3.51c.118 0 .222.062.281.169.31.537 1.258 1.933 2.767 2.163 1.215.185 2.507-.537 3.27-1.488.59-.736.636-.936.62-1.197-.002-.042-.073-.306.075-.383l2.367-1.703a.333.333 0 01.518.23c.222 1.672.4 6.689-5.193 7.931H8.2c-.281.046-6.687 1.074-7.693-5.308-.03-.214.118-.398.325-.398l-.015-.016z" />
      </g>
    </svg>
  );
}

type CaseSection = {
  title: string;
  context: string;
  bullets: string[];
};

const sections: CaseSection[] = [
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
      "Invite collaborators to a thread",
      "Source in context — AI always knows which source it is reading",
    ],
  },
];

const techTags = [
  "NestJS",
  "TypeScript",
  "Next.js",
  "BullMQ",
  "Dodo Payments",
  "PostHog",
  "MongoDB",
  "AWS Lambda",
];

export default function GistrPage() {
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
                  <GistrIcon className="size-5 text-on-surface-variant" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h1 className="font-pixel text-xl text-primary sm:text-2xl">
                    Gistr Technologies
                  </h1>
                  <span className="font-technical text-[11px] text-outline">
                    Fullstack Product Engineer · 01.2025 — 04.2026
                  </span>
                </div>
              </div>
              <a
                href="https://gistr.so"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex shrink-0 items-center gap-1 font-technical text-[11px] text-outline transition-colors hover:text-primary"
              >
                gistr.so
                <IconArrowUpRight className="size-3.5 transition-transform duration-200 ease-snappy group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          {/* What is Gistr */}
          <Reveal className="flex flex-col gap-3">
            <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
              {"// product"}
            </span>
            <p className="font-technical text-xs leading-relaxed text-on-surface-variant sm:text-sm">
              Gistr is an AI knowledge workspace — not a chatbot. You add sources (PDFs, podcasts,
              web pages, EPUB, DOCX, PPTX) and Gistr builds a context-aware thread for each one.
              Inside each thread: smart questions, AI toolkits, response editing, highlights, notes,
              and export. The goal is to let you think inside the source, not copy it into a
              separate tool.
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
