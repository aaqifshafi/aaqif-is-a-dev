import { IconArrowUpRight } from "@tabler/icons-react";

import { ActiveBadge } from "@/components/active-badge";
import { workIcons } from "@/components/icons/work-icons";
import { Reveal } from "@/components/reveal";
import { ScrambleLink } from "@/components/scramble-link";
import type { WorkProject } from "@/types/portfolio";

export type WorkDetailHeaderProps = { project: WorkProject };

export function WorkDetailHeader({ project }: WorkDetailHeaderProps) {
  const Icon = workIcons[project.icon];

  return (
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
              {project.active && <ActiveBadge />}
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
  );
}
