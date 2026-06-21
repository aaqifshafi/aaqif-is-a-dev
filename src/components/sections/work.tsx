import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

import { ActiveBadge } from "@/components/active-badge";
import { workIcons } from "@/components/icons/work-icons";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/sections/section-shell";
import { TagChip } from "@/components/tag-chip";
import { WorkImage } from "@/components/work-image";
import { work } from "@/lib/portfolio-data";
import type { WorkProject } from "@/types/portfolio";

function WorkCard({ project }: { project: WorkProject }) {
  const Icon = workIcons[project.icon];

  return (
    <Reveal>
      <Link
        href={`/work/${project.slug}`}
        className="group block overflow-hidden rounded-xl border border-border bg-surface/40 transition-colors hover:border-outline"
      >
        {project.image && (
          <WorkImage
            src={project.image}
            alt={`${project.company} product screenshot`}
            className="border-b border-border"
          />
        )}

        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface">
                <Icon className="size-4 text-on-surface-variant" />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-sm text-primary">{project.company}</span>
                  {project.active && <ActiveBadge />}
                </div>
                <span className="font-technical text-[11px] text-outline">
                  {project.role} · {project.period}
                </span>
              </div>
            </div>
            <IconArrowUpRight className="size-4 shrink-0 text-outline transition-transform duration-200 ease-snappy group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>

          <p className="font-technical text-xs leading-relaxed text-on-surface-variant">
            {project.blurb}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function Work() {
  return (
    <SectionShell id="work" kicker="experience" title="Work">
      <div className="flex flex-col gap-4">
        {work.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionShell>
  );
}
