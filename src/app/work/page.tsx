import type { Metadata } from "next";
import { IconArrowUpRight, IconBriefcase2, IconWallet } from "@tabler/icons-react";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work — Aaqif Shafi",
  description: "Case studies from Aaqif Shafi's engineering work at Designfolio, Gistr, and Payoll.",
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

type WorkEntry = {
  slug: string;
  company: string;
  role: string;
  period: string;
  active?: boolean;
  description: string;
  tags: string[];
  liveUrl?: string;
  featured?: boolean;
  Icon: React.ComponentType<{ className?: string }>;
};

const workEntries: WorkEntry[] = [
  {
    slug: "designfolio",
    company: "Designfolio",
    role: "Full-Stack Product Engineer",
    period: "05.2026 — Now",
    active: true,
    featured: true,
    description:
      "Portfolio builder for designers and developers. Built the full jobs board (scraping, Kanban + AI match scoring), mock interview, resume tailor, cover letter generation, Tiptap case study editor, and dynamic templates.",
    tags: ["Next.js", "NestJS", "TypeScript", "Tiptap", "PostgreSQL", "AI"],
    liveUrl: "https://designfolio.me",
    Icon: IconBriefcase2,
  },
  {
    slug: "gistr",
    company: "Gistr Technologies",
    role: "Fullstack Product Engineer",
    period: "01.2025 — 04.2026",
    description:
      "AI knowledge workspace. Shipped multi-format file ingestion (PDF, EPUB, DOCX, podcasts, web), a credit-based billing system with Dodo Payments, BullMQ job queues, PostHog analytics, and core AI features across the product.",
    tags: ["NestJS", "TypeScript", "Next.js", "BullMQ", "PostHog", "MongoDB"],
    liveUrl: "https://gistr.so",
    Icon: GistrIcon,
  },
  {
    slug: "payoll",
    company: "Payoll Payments LLC",
    role: "Software Engineering Intern",
    period: "09.2024 — 01.2025",
    description:
      "B2B payment consolidation API. Built full-stack features for the multi-biller platform and contributed to Ared — an AI carbon footprint calculator with a carbon credit marketplace.",
    tags: ["Express", "Vite", "PostgreSQL", "JavaScript", "Redux", "Redis"],
    Icon: IconWallet,
  },
];

function WorkCard({ entry }: { entry: WorkEntry }) {
  return (
    <Reveal>
      <Link
        href={`/work/${entry.slug}`}
        className={cn(
          "group flex flex-col gap-4 rounded-xl border border-border bg-surface/40 p-5 transition-colors hover:border-outline sm:p-6",
          entry.featured && "sm:p-7",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex shrink-0 items-center justify-center rounded-lg border border-border bg-surface",
                entry.featured ? "size-9" : "size-7",
              )}
            >
              <entry.Icon
                className={cn(
                  "text-on-surface-variant",
                  entry.featured ? "size-4.5" : "size-3.5",
                )}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-pixel text-primary",
                    entry.featured ? "text-base" : "text-sm",
                  )}
                >
                  {entry.company}
                </span>
                {entry.active && (
                  <span className="flex shrink-0 items-center gap-1 font-technical text-[10px] text-[hsl(var(--color-success))]">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-current" />
                    </span>
                    now
                  </span>
                )}
              </div>
              <span className="font-technical text-[11px] text-outline">
                {entry.role} · {entry.period}
              </span>
            </div>
          </div>
          <IconArrowUpRight className="size-4 shrink-0 text-outline transition-transform duration-200 ease-snappy group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>

        <p
          className={cn(
            "font-technical leading-relaxed text-on-surface-variant",
            entry.featured ? "text-xs sm:text-sm" : "text-xs",
          )}
        >
          {entry.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border px-2 py-0.5 font-technical text-[11px] text-outline"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </Reveal>
  );
}

export default function WorkPage() {
  const [featured, ...rest] = workEntries;

  return (
    <>
      <TopNav />
      <main className="mx-auto w-full max-w-2xl grow px-5 sm:px-6">
        <div className="flex flex-col gap-16 py-14 sm:py-20">
          <Reveal className="flex flex-col gap-1">
            <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
              {"// selected work"}
            </span>
            <h1 className="font-pixel text-2xl text-primary sm:text-3xl">Work</h1>
            <p className="mt-2 font-technical text-xs text-on-surface-variant">
              Things I have shipped, systems I have built.
            </p>
          </Reveal>

          <div className="flex flex-col gap-4">
            <WorkCard entry={featured} />
            {rest.map((entry) => (
              <WorkCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
