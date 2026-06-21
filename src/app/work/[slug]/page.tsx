import type { Metadata } from "next";
import { IconArrowUpRight, IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { workIcons } from "@/components/icons/work-icons";
import { Reveal } from "@/components/reveal";
import { ScrambleLink } from "@/components/scramble-link";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";
import { WorkImage } from "@/components/work-image";
import { work } from "@/lib/portfolio-data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return work.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = work.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.company} — Aaqif Shafi`,
    description: project.blurb,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = work.find((p) => p.slug === slug);
  if (!project) notFound();

  const Icon = workIcons[project.icon];

  return (
    <>
      <TopNav />
      <main className="mx-auto w-full max-w-2xl grow px-5 sm:px-6">
        <div className="flex flex-col gap-12 py-14 sm:py-20">

          {/* Back */}
          <Reveal immediate>
            <Link
              href="/#work"
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
                <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface">
                  <Icon className="size-5 text-on-surface-variant" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <h1 className="font-pixel text-xl text-primary sm:text-2xl">
                      {project.company}
                    </h1>
                    {project.active && (
                      <span className="flex items-center gap-1 font-technical text-[10px] text-[hsl(var(--color-success))]">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-current" />
                        </span>
                        now
                      </span>
                    )}
                  </div>
                  <span className="font-technical text-[11px] text-outline">
                    {project.role} · {project.period}
                  </span>
                </div>
              </div>
              {project.liveUrl && (
                <span className="group flex shrink-0 items-center gap-1 font-technical text-[11px] text-outline">
                  <ScrambleLink
                    href={project.liveUrl}
                    external
                    className="transition-colors hover:text-primary"
                  >
                    {project.liveLabel ?? project.liveUrl}
                  </ScrambleLink>
                  <IconArrowUpRight className="size-3.5 text-outline transition-[transform,color] duration-200 ease-snappy group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </span>
              )}
            </div>
          </Reveal>

          {/* Screenshot */}
          {project.image && (
            <Reveal>
              <WorkImage
                src={project.image}
                alt={`${project.company} product screenshot`}
                priority
                sizes="(max-width: 672px) 100vw, 640px"
                className="rounded-xl border border-border"
              />
            </Reveal>
          )}

          {/* Product */}
          <Reveal className="flex flex-col gap-3">
            <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
              {"// product"}
            </span>
            <p className="font-technical text-xs leading-relaxed text-on-surface-variant sm:text-sm">
              {project.product}
            </p>
          </Reveal>

          {/* What I built */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
                {"// what I built"}
              </span>
            </Reveal>

            {project.sections.map((section) => (
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

          {/* Stack */}
          <Reveal className="flex flex-col gap-3">
            <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
              {"// stack"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
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
