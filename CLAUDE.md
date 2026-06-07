# CLAUDE.md

This file gives Claude Code persistent guidance for working in this repository. Read it before starting any task and follow it on every change.

## Project overview

This is **aaqif.is-a.dev** — a personal portfolio website. It is built with Next.js, styled with shadcn/ui and Tailwind CSS v4, and aims to be a clean, fully componentized codebase with one consistent styling system and tasteful, purposeful motion. Designs come from an external design tool and are rebuilt here as typed, componentized React (see the separate implementation plan).

## Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (inline theming via CSS variables in `globals.css` — there is no `tailwind.config.ts`)
- **Component library:** shadcn/ui (source-owned, lives in the repo)
- **Package manager:** bun (use it for every install and script — do not introduce npm/pnpm/yarn lockfiles)
- **Icons:** @tabler/icons-react
- **Animation:** tasteful motion only (see "Animation" below)

## Directory conventions

- `src/app/` — routes only. Pages **compose** components; they must not contain raw UI markup beyond top-level layout. No business logic inline.
- `src/components/ui/` — shadcn/ui primitives. Do **not** hand-edit these unless intentionally restyling a primitive across the whole app. Add new ones with the CLI, never by pasting.
- `src/components/` — composed feature/section components built **from** the `ui/` primitives. This is where most new UI code goes.
- `src/lib/` — utilities. The `cn` helper already lives here; reuse it for class merging.
- `src/hooks/` — custom React hooks.
- `src/types/` — shared types. Component-specific types are co-located with the component.

## Componentization rules (non-negotiable)

1. **Pages are composition only.** A `page.tsx` imports and arranges components. If a `page.tsx` is growing inline JSX, extract it.
2. **Extract every repeated or self-contained visual block** into its own component under `src/components/`. A hero, a project card, an about section, a nav bar — each is its own file.
3. **Build from shadcn primitives.** Compose `Button`, `Card`, `Dialog`, etc. from `components/ui/`. Do not reinvent primitives that shadcn already provides.
4. **Server Components by default.** Only add `"use client"` to the smallest component that actually needs interactivity, state, browser APIs, or animation. Never mark a whole page client just to make one button or one animated element interactive.
5. **Type everything.** Every component has an explicit, exported `Props` type. No `any`. Co-locate component-specific types in the same file; promote shared types to `src/types/`.
6. **One styling system.** All styling goes through Tailwind utilities and the design tokens in `globals.css`. Do not introduce inline `style={{}}` for theming, CSS modules, or a second styling approach.
7. **Tokens, not hardcoded values.** Use the CSS variables / Tailwind tokens. Do not hardcode hex colors, font sizes, or spacing that already exist as tokens.
8. **Accessibility.** Preserve the semantics shadcn/Radix give you. Keep labels, roles, focus states, and keyboard handling intact.

## Animation

This is a portfolio — motion is part of the impression it makes. Use animation deliberately.

- **Tasteful and purposeful.** Animate to guide attention, reward interaction, or smooth transitions — never decoration for its own sake. When in doubt, less is more.
- **Subtle defaults:** gentle entrance/reveal on scroll, soft hover states, smooth route/layout transitions, micro-interactions on interactive elements.
- **Respect performance and accessibility.** Honor `prefers-reduced-motion` and provide a reduced/no-motion path. Prefer transform/opacity-based animations; avoid layout-thrashing properties.
- **Keep it cohesive.** Reuse a small set of easing curves and durations so the whole site feels like one piece. Define shared motion values rather than scattering magic numbers.
- **Isolate motion in client components.** Animated pieces are `"use client"`; keep their non-animated parents as Server Components where possible.

## Using the shadcn ecosystem for components

Beyond core shadcn/ui primitives, this project may pull components, blocks, and animated backgrounds from the broader shadcn ecosystem (e.g. registries and component sites that expose a shadcn-compatible registry/CLI or MCP).

- **Prefer the CLI/registry install** over copy-paste so dependencies and versions stay correct:
  ```bash
  bunx shadcn@latest add <component-or-registry-url>
  ```
- After adding an ecosystem component, **review and refactor it to match this repo's rules**: typed props, token-based styling, Server/Client split, and our directory conventions. Do not let an imported component introduce a second styling system or hardcoded values.
- Ecosystem primitives go in `src/components/ui/`; anything you compose from them goes in `src/components/`.
- When evaluating an ecosystem component, confirm it's accessible and that its animation (if any) follows the Animation rules above before adopting it.

## Adding shadcn components

Always use the CLI so the registry version and dependencies stay correct:

```bash
bunx shadcn@latest add <component>
```

Never paste a shadcn component's source by hand. Components land in `src/components/ui/`.

## Definition of done for a UI task

- [ ] `page.tsx` contains composition only, no inline UI blocks
- [ ] Each section is its own typed component in `src/components/`
- [ ] Built from `components/ui/` primitives (or ecosystem components refactored to our rules), not reinvented
- [ ] `"use client"` only where strictly required
- [ ] All colors/typography/spacing use design tokens from `globals.css`
- [ ] Any animation is tasteful, respects `prefers-reduced-motion`, and uses shared motion values
- [ ] No `any`, no second styling system
- [ ] Lint and typecheck pass

## Commands

```bash
bun dev # start dev server
bun run build # production build
bun run lint # eslint
bunx shadcn@latest add <component> # add a shadcn primitive or ecosystem component
```
