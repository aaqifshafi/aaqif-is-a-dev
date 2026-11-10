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
import type { TechIconKey } from "@/types/portfolio";

export type TechIcon = ComponentType<{ className?: string }>;
type TablerIcon = ComponentType<{ className?: string; color?: string }>;

function withColor(Icon: TablerIcon, hex: string): TechIcon {
  return function ColoredIcon({ className }) {
    // Brand marks sit beside their visible name, so they're decorative.
    return <Icon className={className} color={hex} aria-hidden />;
  };
}

/** Maps a tech item's `icon` key to its (brand-coloured) icon. */
export const techIcons: Record<TechIconKey, TechIcon> = {
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
