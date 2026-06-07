import { IconArrowUpRight } from "@tabler/icons-react";

import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/sections/section-shell";
import { projects } from "@/lib/portfolio-data";

export function Projects() {
  return (
    <SectionShell id="projects" kicker="selected work" title="Projects">
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <Reveal key={project.index}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-xl border border-border bg-surface/40 p-5 transition-colors hover:border-outline sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-technical text-[11px] text-outline">{project.index}</span>
                  <h3 className="font-pixel text-base text-primary">{project.title}</h3>
                </div>
                <IconArrowUpRight className="size-4 shrink-0 text-outline transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>

              <p className="font-technical text-xs leading-relaxed text-on-surface-variant">
                {project.description}
              </p>

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
            </a>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
