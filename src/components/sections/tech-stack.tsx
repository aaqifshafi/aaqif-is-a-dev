import type { ComponentType } from "react";
import {
  IconBrandAws,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandFramerMotion,
  IconBrandGithub,
  IconBrandJavascript,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandUbuntu,
  IconBrandVercel,
  IconBrandVite,
  IconBrandVscode,
  IconDatabase,
  IconGitBranch,
  IconTerminal,
} from "@tabler/icons-react";

import { BunIcon, ClaudeIcon, CursorIcon, RedisIcon } from "@/components/icons/custom-icons";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/sections/section-shell";
import { techStack } from "@/lib/portfolio-data";
import type { TechIconKey } from "@/types/portfolio";

type TechIcon = ComponentType<{ className?: string }>;
type TablerIcon = ComponentType<{ className?: string; color?: string }>;

function withColor(Icon: TablerIcon, hex: string): TechIcon {
  return function ColoredIcon({ className }) {
    return <Icon className={className} color={hex} />;
  };
}

const techIcons: Record<TechIconKey, TechIcon> = {
  typescript: withColor(IconBrandTypescript, "#3178C6"),
  javascript: withColor(IconBrandJavascript, "#F7DF1E"),
  react:      withColor(IconBrandReact,      "#61DAFB"),
  next:       IconBrandNextjs,
  tailwind:   withColor(IconBrandTailwind,   "#06B6D4"),
  motion:     withColor(IconBrandFramerMotion, "#FF4154"),
  figma:      withColor(IconBrandFigma,      "#F24E1E"),
  node:       withColor(IconBrandNodejs,     "#339933"),
  vercel:     IconBrandVercel,
  mongodb:    withColor(IconBrandMongodb,    "#47A248"),
  docker:     withColor(IconBrandDocker,     "#2496ED"),
  aws:        withColor(IconBrandAws,        "#FF9900"),
  postgres:   withColor(IconDatabase,        "#4169E1"),
  git:        withColor(IconGitBranch,       "#F05032"),
  github:     IconBrandGithub,
  python:     withColor(IconBrandPython,     "#3776AB"),
  vscode:     withColor(IconBrandVscode,     "#007ACC"),
  vite:       withColor(IconBrandVite,       "#646CFF"),
  linux:      withColor(IconBrandUbuntu,     "#E95420"),
  redis:      RedisIcon,
  bun:        BunIcon,
  claude:     ClaudeIcon,
  cursor:     CursorIcon,
  terminal:   withColor(IconTerminal,        "#4EAA25"),
};

export function TechStack() {
  return (
    <SectionShell id="stack" kicker="tools" title="Tech Stack">
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => {
            const Icon = techIcons[tech.icon];
            const chipClass =
              "flex items-center gap-1.5 rounded-md border border-border bg-surface/60 px-2.5 py-1.5 font-technical text-xs text-on-surface-variant transition-colors hover:border-outline hover:text-primary";

            if (tech.url) {
              return (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={chipClass}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{tech.name}</span>
                </a>
              );
            }

            return (
              <div key={tech.name} className={chipClass}>
                <Icon className="size-4 shrink-0" />
                <span>{tech.name}</span>
              </div>
            );
          })}
        </div>
      </Reveal>
    </SectionShell>
  );
}
