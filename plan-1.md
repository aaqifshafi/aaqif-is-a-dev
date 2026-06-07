# Implementation Plan — aaqif.is-a.dev

A step-by-step plan to set up the portfolio repo and implement a design in it. `CLAUDE.md` holds the permanent rules; this file is the one-time-ish workflow.

---

## Phase 1 — Scaffold the project

Use the shadcn CLI to scaffold Next.js + shadcn + Tailwind v4 in one pass, with bun as the package manager.

```bash
# From an empty folder
bunx shadcn@latest init
```

When prompted:

- Template: **Next.js**
- Package manager: **bun**
- Base color: your brand base (or **Neutral**)
- CSS variables: **enabled** (required for clean token-based theming)

Prefer the `src/` directory and App Router so paths match `CLAUDE.md`. If you'd rather scaffold Next.js yourself first:

```bash
bunx create-next-app@latest aaqif-portfolio --typescript --tailwind --eslint --app --src-dir
cd aaqif-portfolio
bunx shadcn@latest init
```

Drop `CLAUDE.md` into the repo root before you start building so Claude Code follows the rules from the first task.

Add primitives on demand (not all at once):

```bash
bunx shadcn@latest add button card dialog
```

---

## Phase 2 — Connect the Stitch MCP server

The design lives in Google Stitch. Connect it via the Stitch MCP server (`@_davideast/stitch-mcp`) so Claude Code can read the design directly instead of you copy-pasting.

Easiest path — interactive wizard (handles gcloud, login, project, API activation, MCP config):

```bash
bunx @_davideast/stitch-mcp init
```

Or register directly with Claude Code (user scope, available across projects):

```bash
claude mcp add -e GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID -s user stitch -- bunx -y @_davideast/stitch-mcp proxy
```

Or project-local `.mcp.json` (config lives with the repo):

```json
{
  "mcpServers": {
    "stitch": {
      "command": "bunx",
      "args": ["-y", "@_davideast/stitch-mcp", "proxy"]
    }
  }
}
```

After editing `.mcp.json`, reload the editor window (Developer: Reload Window). Verify with `/mcp` — `stitch` should show a healthy status. Smoke-test by asking Claude Code: **"List my Stitch projects."** It should return projects and IDs.

Available Stitch tools: `get_screen_code`, `get_screen_image`, `extract_design_context`, `build_site`.

---

## Phase 3 — Extract the design system FIRST

Before implementing any screen, pull the tokens so everything stays consistent.

Prompt to Claude Code:

> Use the Stitch MCP to fetch my "[project name]" project. Extract the design system into a `DESIGN.md` in the project root, then map its color tokens and typography into my Tailwind v4 CSS variables in `globals.css`.

`DESIGN.md` becomes the single source of truth for colors, typography, and spacing. Read it before generating UI.

---

## Phase 4 — Implement screens (componentized + animated)

Per screen, instruct Claude Code explicitly. Example:

> Connect to my Stitch project "[name]" and implement the [screen] screen. Rules: use the tokens from `DESIGN.md`; **rebuild using my shadcn primitives — do NOT paste Stitch's raw HTML/CSS**; extract every section into its own typed component under `src/components/`; keep `page.tsx` as composition only; default to Server Components and add `"use client"` only where interactivity or animation requires it; add tasteful entrance/hover motion that respects `prefers-reduced-motion`.

For multi-screen designs, map screens to routes in one instruction (e.g. `hero` → `/`, `projects` → `/projects`, `contact` → `/contact`). Each route's UI is composed from components.

**Key consistency note:** Stitch can emit raw markup in several frameworks. Always have Claude Code translate it into this repo's shadcn component system so you end up with one styling system, not two.

---

## Animation guidance for this build

- Tasteful and purposeful only — guide attention, reward interaction, smooth transitions. Never decorate for its own sake.
- Subtle defaults: scroll reveals, soft hovers, smooth route/layout transitions, micro-interactions.
- Honor `prefers-reduced-motion`; provide a reduced/no-motion path.
- Reuse a small shared set of easing curves + durations so the whole site feels cohesive.
- Isolate motion in small `"use client"` components; keep parents as Server Components.

---

## Pulling components from the shadcn ecosystem

You'll likely want polished pieces (e.g. animated backgrounds, fancy cards) from the broader shadcn ecosystem for a portfolio.

- Install via the registry/CLI rather than copy-paste:
  ```bash
  bunx shadcn@latest add <component-or-registry-url>
  ```
- After adding, refactor to this repo's rules: typed props, token-based styling, correct Server/Client split, correct directory.
- Confirm accessibility and that any built-in animation follows the animation guidance before adopting.
- Don't let an ecosystem component introduce a second styling system or hardcoded values.

---

## First-session checklist

1. [ ] Scaffold with `bunx shadcn@latest init` (Next.js, bun, src dir, CSS vars)
2. [ ] Add `CLAUDE.md` to repo root
3. [ ] Connect Stitch MCP and verify with `/mcp`
4. [ ] "Extract my Stitch design system into `DESIGN.md` and map tokens into `globals.css`"
5. [ ] Implement screens one at a time, componentized, with tasteful motion
6. [ ] Lint + typecheck before considering any screen done
