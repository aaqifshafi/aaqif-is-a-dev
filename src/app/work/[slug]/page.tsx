import type { Metadata } from "next";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GridColumn } from "@/components/grid-frame";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { TopNav } from "@/components/top-nav";
import { WorkDetailHeader } from "@/components/work-detail-header";
import { WorkDetailSections } from "@/components/work-detail-sections";
import { WorkDetailStack } from "@/components/work-detail-stack";
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

  return (
    <>
      <TopNav />
      <main className="flex w-full grow flex-col">
        <GridColumn className="flex grow flex-col gap-12 py-14 sm:py-20">

          <Reveal immediate>
            <Link
              href="/#work"
              className="inline-flex items-center gap-1.5 font-technical text-[11px] text-outline transition-colors hover:text-primary"
            >
              <IconChevronLeft className="size-3.5" />
              Work
            </Link>
          </Reveal>

          <WorkDetailHeader project={project} />

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

          <Reveal className="flex flex-col gap-3">
            <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
              {"// product"}
            </span>
            <p className="font-technical text-xs leading-relaxed text-on-surface-variant sm:text-sm">
              {project.product}
            </p>
          </Reveal>

          <WorkDetailSections sections={project.sections} />

          <WorkDetailStack tags={project.tags} />

        </GridColumn>
      </main>
      <SiteFooter />
    </>
  );
}
