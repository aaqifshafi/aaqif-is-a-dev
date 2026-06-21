# Componentize & Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract duplicated markup into shared components, decompose `work/[slug]/page.tsx` from ~130 lines of inline JSX to ~40 lines of composition, and clean up internal patterns in `tech-stack.tsx`, `certifications.tsx`, and `layout.tsx`.

**Architecture:** Pure refactor — no logic changes, no visual changes. New components are Server Components that carry over class strings verbatim. The work detail page is the biggest violation of the "pages are composition only" rule and is the primary target.

**Tech Stack:** Next.js App Router, TypeScript strict, Tailwind CSS v4, `bun` for all commands.

## Global Constraints

- No `"use client"` on any new component — all new files are Server Components.
- No style changes — all Tailwind class strings carry over verbatim from the source.
- No new dependencies.
- `bun run lint` and `bun run build` must pass after every task.
- Package manager: `bun` only — never `npm`, `pnpm`, or `yarn`.

---

### Task 1: Create `ActiveBadge` and `TagChip` shared primitives

**Files:**
- Create: `src/components/active-badge.tsx`
- Create: `src/components/tag-chip.tsx`

**Interfaces:**
- Produces:
  - `ActiveBadge()` — no props, returns the pulsing "now" indicator
  - `TagChip({ tag: string })` — returns a single tag pill

- [ ] **Step 1: Create `active-badge.tsx`**

```tsx
// src/components/active-badge.tsx

export function ActiveBadge() {
  return (
    <span className="flex items-center gap-1 font-technical text-[10px] text-[hsl(var(--color-success))]">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-current" />
      </span>
      now
    </span>
  );
}
```

- [ ] **Step 2: Create `tag-chip.tsx`**

```tsx
// src/components/tag-chip.tsx

export type TagChipProps = { tag: string };

export function TagChip({ tag }: TagChipProps) {
  return (
    <span className="rounded-md border border-border px-2 py-0.5 font-technical text-[11px] text-outline">
      {tag}
    </span>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `bunx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/active-badge.tsx src/components/tag-chip.tsx
git commit -m "feat: add ActiveBadge and TagChip shared primitives"
```

---

### Task 2: Create `WorkDetailHeader`

**Files:**
- Create: `src/components/work-detail-header.tsx`

**Interfaces:**
- Consumes: `ActiveBadge` from `@/components/active-badge`, `workIcons` from `@/components/icons/work-icons`, `Reveal` from `@/components/reveal`, `ScrambleLink` from `@/components/scramble-link`, `WorkProject` from `@/types/portfolio`
- Produces: `WorkDetailHeader({ project: WorkProject })` — renders the company icon, name, active badge, role/period, and live URL

- [ ] **Step 1: Create `work-detail-header.tsx`**

This extracts lines 63–102 from `src/app/work/[slug]/page.tsx` and replaces the inline active-badge markup with `<ActiveBadge />`.

```tsx
// src/components/work-detail-header.tsx

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
```

- [ ] **Step 2: Typecheck**

Run: `bunx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/work-detail-header.tsx
git commit -m "feat: add WorkDetailHeader component"
```

---

### Task 3: Create `WorkDetailSections` and `WorkDetailStack`

**Files:**
- Create: `src/components/work-detail-sections.tsx`
- Create: `src/components/work-detail-stack.tsx`

**Interfaces:**
- Consumes: `Reveal` from `@/components/reveal`, `TagChip` from `@/components/tag-chip`, `WorkProject` from `@/types/portfolio`
- Produces:
  - `WorkDetailSections({ sections: WorkProject['sections'] })` — renders the `// what I built` kicker + section list
  - `WorkDetailStack({ tags: string[] })` — renders the `// stack` kicker + tag chip grid

- [ ] **Step 1: Create `work-detail-sections.tsx`**

Extracts lines 128–154 from `src/app/work/[slug]/page.tsx`.

```tsx
// src/components/work-detail-sections.tsx

import { Reveal } from "@/components/reveal";
import type { WorkProject } from "@/types/portfolio";

export type WorkDetailSectionsProps = {
  sections: WorkProject["sections"];
};

export function WorkDetailSections({ sections }: WorkDetailSectionsProps) {
  return (
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
  );
}
```

- [ ] **Step 2: Create `work-detail-stack.tsx`**

Extracts lines 157–171 from `src/app/work/[slug]/page.tsx`.

```tsx
// src/components/work-detail-stack.tsx

import { Reveal } from "@/components/reveal";
import { TagChip } from "@/components/tag-chip";

export type WorkDetailStackProps = { tags: string[] };

export function WorkDetailStack({ tags }: WorkDetailStackProps) {
  return (
    <Reveal className="flex flex-col gap-3">
      <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
        {"// stack"}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>
    </Reveal>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `bunx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/components/work-detail-sections.tsx src/components/work-detail-stack.tsx
git commit -m "feat: add WorkDetailSections and WorkDetailStack components"
```

---

### Task 4: Refactor `work/[slug]/page.tsx` to use new components

**Files:**
- Modify: `src/app/work/[slug]/page.tsx` (full rewrite — from ~130 lines to ~45 lines)

**Interfaces:**
- Consumes: `WorkDetailHeader` from `@/components/work-detail-header`, `WorkDetailSections` from `@/components/work-detail-sections`, `WorkDetailStack` from `@/components/work-detail-stack`

- [ ] **Step 1: Replace the full file content**

```tsx
// src/app/work/[slug]/page.tsx

import type { Metadata } from "next";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
      <main className="mx-auto w-full max-w-2xl grow px-5 sm:px-6">
        <div className="flex flex-col gap-12 py-14 sm:py-20">

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

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `bunx tsc --noEmit && bun run lint`
Expected: no errors

- [ ] **Step 3: Build**

Run: `bun run build`
Expected: build completes with no errors, all three `/work/[slug]` routes generated statically

- [ ] **Step 4: Commit**

```bash
git add src/app/work/[slug]/page.tsx
git commit -m "refactor: decompose work detail page into composed components"
```

---

### Task 5: Update `sections/work.tsx` to use `ActiveBadge` and `TagChip`

**Files:**
- Modify: `src/components/sections/work.tsx`

**Interfaces:**
- Consumes: `ActiveBadge` from `@/components/active-badge`, `TagChip` from `@/components/tag-chip`

- [ ] **Step 1: Replace the full file content**

```tsx
// src/components/sections/work.tsx

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
```

- [ ] **Step 2: Typecheck and lint**

Run: `bunx tsc --noEmit && bun run lint`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/work.tsx
git commit -m "refactor: use ActiveBadge and TagChip in WorkCard"
```

---

### Task 6: Clean up `tech-stack.tsx` — extract internal `TechChip`

**Files:**
- Modify: `src/components/sections/tech-stack.tsx`

- [ ] **Step 1: Replace the full file content**

The `TechChip` function is internal (not exported). It takes over the duplicated `<a>` / `<div>` branches and the `chipClass` string.

```tsx
// src/components/sections/tech-stack.tsx

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

type TechChipProps = { icon: TechIcon; name: string; url?: string };

function TechChip({ icon: Icon, name, url }: TechChipProps) {
  const className =
    "flex items-center gap-1.5 rounded-md border border-border bg-surface/60 px-2.5 py-1.5 font-technical text-xs text-on-surface-variant transition-colors hover:border-outline hover:text-primary";

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        <Icon className="size-4 shrink-0" />
        <span>{name}</span>
      </a>
    );
  }

  return (
    <div className={className}>
      <Icon className="size-4 shrink-0" />
      <span>{name}</span>
    </div>
  );
}

export function TechStack() {
  return (
    <SectionShell id="stack" kicker="tools" title="Tech Stack">
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechChip
              key={tech.name}
              icon={techIcons[tech.icon]}
              name={tech.name}
              url={tech.url}
            />
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `bunx tsc --noEmit && bun run lint`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/tech-stack.tsx
git commit -m "refactor: extract internal TechChip in tech-stack"
```

---

### Task 7: Clean up `certifications.tsx` and fix `layout.tsx` indentation

**Files:**
- Modify: `src/components/sections/certifications.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace `certifications.tsx`**

Replace the `inner` variable pattern with a `CertRow` internal component. `CertRow` is not exported.

```tsx
// src/components/sections/certifications.tsx

import { IconArrowUpRight } from "@tabler/icons-react";

import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/sections/section-shell";
import { certifications } from "@/lib/portfolio-data";
import type { Certification } from "@/types/portfolio";

type CertRowProps = { cert: Certification };

function CertRow({ cert }: CertRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-baseline gap-2 min-w-0">
        <span className="font-technical text-[11px] text-outline shrink-0">{cert.index}</span>
        <div className="min-w-0">
          <p className="font-technical text-xs text-primary truncate">{cert.title}</p>
          <p className="font-technical text-[11px] text-outline">{cert.issuer}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-technical text-[11px] text-outline">{cert.year}</span>
        {cert.href && (
          <IconArrowUpRight className="size-3 text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </div>
  );
}

export function Certifications() {
  return (
    <SectionShell id="certifications" kicker="credentials" title="Certifications">
      <Reveal>
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface/40 overflow-hidden">
          {certifications.map((cert) => {
            if (cert.href) {
              return (
                <a
                  key={cert.index}
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:bg-surface/60 transition-colors"
                >
                  <CertRow cert={cert} />
                </a>
              );
            }

            return (
              <div key={cert.index}>
                <CertRow cert={cert} />
              </div>
            );
          })}
        </div>
      </Reveal>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Fix indentation in `layout.tsx`**

In `src/app/layout.tsx`, lines 57–59 currently read (with extra leading spaces on lines 58–59):

```tsx
          <MotionProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </MotionProvider>
```

Fix to consistent 2-space nesting:

```tsx
          <MotionProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </MotionProvider>
```

- [ ] **Step 3: Typecheck and lint**

Run: `bunx tsc --noEmit && bun run lint`
Expected: no errors

- [ ] **Step 4: Final build**

Run: `bun run build`
Expected: clean build, all pages generated

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/certifications.tsx src/app/layout.tsx
git commit -m "refactor: extract CertRow in certifications, fix layout indentation"
```
