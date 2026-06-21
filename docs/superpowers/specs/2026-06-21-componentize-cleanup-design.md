# Componentize & Cleanup — Design Spec

**Date:** 2026-06-21
**Scope:** Code quality only — no visual changes.

## Goal

Remove duplication, enforce the "pages are composition only" rule, and clean up awkward internal patterns. Zero visual change to the running site.

---

## 1. New shared primitives

### `src/components/active-badge.tsx`
- **Type:** Server Component
- **Props:** none (always the same markup)
- **Renders:** pulsing green dot + "now" text (`text-[hsl(var(--color-success))]`)
- **Replaces:** copy-pasted markup at `sections/work.tsx:38–45` and `work/[slug]/page.tsx:74–81`

### `src/components/tag-chip.tsx`
- **Type:** Server Component
- **Props:** `{ tag: string }`
- **Renders:** `rounded-md border border-border px-2 py-0.5 font-technical text-[11px] text-outline` pill
- **Replaces:** copy-pasted markup at `sections/work.tsx:61–68` and `work/[slug]/page.tsx:162–170`

---

## 2. `work/[slug]/page.tsx` decomposition

The page currently has ~130 lines of inline JSX. After extraction it becomes ~40 lines of pure composition.

### `src/components/work-detail-header.tsx`
- **Type:** Server Component
- **Props:** `{ project: WorkProject }`
- **Renders:** company icon + name + `ActiveBadge` + role/period line + optional `ScrambleLink` live URL
- **Source lines:** `work/[slug]/page.tsx:63–102`

### `src/components/work-detail-sections.tsx`
- **Type:** Server Component
- **Props:** `{ sections: WorkProject['sections'] }`
- **Renders:** `// what I built` kicker + mapped list of section title / context / bullet list
- **Source lines:** `work/[slug]/page.tsx:128–154`

### `src/components/work-detail-stack.tsx`
- **Type:** Server Component
- **Props:** `{ tags: string[] }`
- **Renders:** `// stack` kicker + flex-wrap grid of `<TagChip>` items
- **Source lines:** `work/[slug]/page.tsx:157–171`

**Stays inline in the page:**
- Back link (trivial, unique)
- Screenshot block with `WorkImage` (trivial, unique)
- `// product` kicker + paragraph (6 lines, not reused)

---

## 3. In-file cleanups

### `src/components/sections/tech-stack.tsx`
- Extract internal (non-exported) `TechChip` function that takes `{ icon: TechIcon, name: string, url?: string }` and conditionally renders `<a>` or `<div>`.
- Remove the duplicated `chipClass` string constant (folded into `TechChip`).

### `src/components/sections/certifications.tsx`
- Replace the `inner` variable pattern with an internal (non-exported) `CertRow` component.
- Each cert maps to `<a><CertRow /></a>` or `<div><CertRow /></div>` — no more hoisted `inner` variable.

### `src/app/layout.tsx`
- Fix misaligned indentation around `MotionProvider` / `TooltipProvider` (lines 58–59).

---

## Constraints

- No new `"use client"` directives — all new components are Server Components.
- No style changes — all token/class strings carry over verbatim.
- No new dependencies.
- Lint and typecheck must pass after all changes.
