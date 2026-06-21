import type { Metadata } from "next";
import { IconChevronLeft, IconWallet } from "@tabler/icons-react";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";

export const metadata: Metadata = {
  title: "Payoll Payments — Aaqif Shafi",
  description:
    "Aaqif Shafi's internship at Payoll — building features for a B2B payment consolidation API and the Ared carbon credit platform.",
};

type CaseSection = {
  title: string;
  context: string;
  bullets: string[];
};

const sections: CaseSection[] = [
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
];

const techTags = ["Express", "Vite", "PostgreSQL", "JavaScript", "Redux", "Redis"];

export default function PayollPage() {
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
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
                <IconWallet className="size-5 text-on-surface-variant" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h1 className="font-pixel text-xl text-primary sm:text-2xl">
                  Payoll Payments LLC
                </h1>
                <span className="font-technical text-[11px] text-outline">
                  Software Engineering Intern · 09.2024 — 01.2025
                </span>
              </div>
            </div>
          </Reveal>

          {/* What is Payoll */}
          <Reveal className="flex flex-col gap-3">
            <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
              {"// product"}
            </span>
            <p className="font-technical text-xs leading-relaxed text-on-surface-variant sm:text-sm">
              Payoll is a B2B payment service that consolidates multiple billers into a single API
              — one integration for business clients instead of maintaining separate connections to
              each biller. I also contributed to Ared, a sister product: an AI-powered carbon
              footprint calculator with an integrated carbon credit marketplace.
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
