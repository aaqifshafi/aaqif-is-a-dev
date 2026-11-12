import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

import { ActiveBadge } from "@/components/active-badge";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/sections/section-shell";
import { TagChip } from "@/components/tag-chip";
import { WorkMedia } from "@/components/work-media";
import { WorkLogoTile } from "@/components/work-logo-tile";
import { work } from "@/lib/portfolio-data";
import { hoverSound, sound } from "@/lib/sound";
import type { WorkProject } from "@/types/portfolio";

/**
 * One project. The company name is the card's link, stretched over the whole
 * card with `::after`, so the full card is clickable while the link keeps a
 * short, clear accessible name — and the video's pause button can sit above it
 * without nesting interactive elements.
 */
function WorkCard({ project }: { project: WorkProject }) {
  const external = Boolean(project.liveUrl);
  const href = project.liveUrl ?? `/work/${project.slug}`;

  return (
    <Reveal>
      <article className="group relative overflow-hidden rounded-xl border border-border bg-surface/40 transition-colors hover:border-outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring">
        <WorkMedia project={project} className="border-b border-border" />

        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <WorkLogoTile icon={project.icon} />
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-pixel text-sm text-primary">
                    <Link
                      href={href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      {...sound("click")}
                      {...hoverSound}
                      className="outline-none after:absolute after:inset-0 after:content-['']"
                    >
                      {project.company}
                      {external && (
                        <span className="sr-only">
                          {`, opens ${project.liveLabel ?? "the live product"} in a new tab`}
                        </span>
                      )}
                    </Link>
                  </h3>
                  {project.active && <ActiveBadge />}
                </div>
                <span className="font-technical text-[11px] text-outline">
                  {project.role} · {project.period}
                </span>
              </div>
            </div>
            <IconArrowUpRight
              aria-hidden
              className="size-4 shrink-0 text-outline transition-transform duration-200 ease-snappy group-hover:text-primary [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5"
            />
          </div>

          <p className="font-technical text-xs leading-relaxed text-on-surface-variant">
            {project.blurb}
          </p>

          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.tags.map((tag) => (
              <li key={tag}>
                <TagChip tag={tag} />
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <SectionShell id="work" kicker="experience" title="Work">
      <div className="flex flex-col gap-4">
        {work
          .filter((project) => !project.hidden)
          .map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
      </div>
    </SectionShell>
  );
}
