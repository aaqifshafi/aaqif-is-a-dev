# Design System: Aaqif — Design Engineer Portfolio

> Single source of truth for this build. Read it before generating or editing any UI.
> Tokens live in `src/app/globals.css`. The site is a **hybrid**: a clean, spacious,
> modern portfolio (in the spirit of chanhdai.com / creativesky.me) that keeps a few
> deliberate "design-engineer" signatures rather than a full terminal/IDE costume.

## 1. Visual theme & atmosphere

Clean, calm, **single-column** personal portfolio. Modern and tasteful first; personality
second. The few signatures that carry the "builds software" identity: a **Geist Pixel**
wordmark/name, small **mono `//` kickers** above section headings, a **single electric-blue
accent**, an emerald **live-status** color, a ⌘K command menu, and a GitHub-style contribution
graph. A **very faint** blueprint grid sits behind everything as texture (masked so it fades),
never as structure. Density is **low-to-moderate** — whitespace does the work.

History: this replaced an earlier dense "Monolith Engine" terminal aesthetic (blueprint grid,
line-number gutter, `const x = [ … ];` code-bar section framing, sharp 0px corners, two-column
app shell). All of that was intentionally retired for the calmer, more modern direction.

## 2. Color & roles

Near-monochrome with **two semantic colors**. Light and dark both first-class.

- **Background / surface ramp:** `--background` → `--surface` → `--surface-container` give depth
  by tonal layering plus 1px `--border` lines. Dark base `#0e0e0e`; light base `#fbfbfa`.
- **Text:** `--primary` (headings/active), `--on-surface` (body), `--on-surface-variant`
  (secondary, ≤65ch), `--outline` (mono meta). Verify body ≥4.5:1 in both themes.
- **Blue — `--accent-blue` `#0070f3`:** the single *interactive/marker* accent — section `//`
  kickers, focus rings, the certifications check, links. <5% of surface.
- **Emerald — `#10b981`:** the *live-status* color only — availability dot, the active-job dot.
  Reserving a separate hue for "live/available" reads instantly and keeps blue meaning "interactive".
- **Heatmap ramp:** `--heat-0…4` (less → more). Tech-stack glyphs may carry incidental brand tints
  at ≤14px; those are glyph colors, not palette.

## 3. Typography — the Geist superfamily

Loaded via the official `geist` npm package (self-hosted, zero layout shift). One family, three roles:

- **Display / body — Geist Sans:** headings `text-xl`–`3xl`, semibold, `tracking-tight`,
  `text-balance`. Body 16px+, `leading-relaxed`, `text-pretty`, measure ≤65ch.
- **Technical — Geist Mono (`font-technical`):** the small layer — `//` kickers, metadata, dates,
  tags, nav, footer, the live clock (with `tabular-nums`). Sizes 10–12px.
- **Signature — Geist Pixel Square (`font-pixel`):** used **sparingly, ≥16px** — the `AQ`
  wordmark (nav + avatar) and the hero name (through the `TextScramble` decode). Never at 9–11px.
- **Banned:** Inter; serifs; system-font display fallbacks; any family outside the Geist superfamily.

## 4. Layout

- **Single centered column:** `mx-auto max-w-2xl` (~672px), `px-5 sm:px-6`. Top nav and footer
  share the same max-width. Content is left-aligned.
- **Structure:** sticky slim `TopNav` (pixel wordmark + in-page links · ⌘K · theme toggle) →
  `ProfileHeader` (monogram + name, status line, bio, contact row) → stacked sections
  (`gap-16 sm:gap-20`) → `SiteFooter`.
- **Sections:** each is a `SectionShell` — a mono `// kicker` (accent-blue) over a Geist heading,
  then content. No code-bar framing, no closing brackets.
- **Cards:** soft-cornered (`rounded-xl`), 1px `--border`, `bg-surface/40`, hover → `bg-surface`
  (tonal, not shadow). Cards top out at ~14px radius; pills are `rounded-full`. **No** nested cards.
- **Radius:** `--radius: 0.625rem` (10px); shadcn `sm/md/lg/xl` scale derives from it.

## 5. Signature features

- **Live clock** (`live-clock.tsx`): real local time for `profile.timezone`, mono + `tabular-nums`
  so it never jitters; hydration-safe, ticks each second. In the header status line.
- **Availability** (`availability-badge.tsx`): `● Available for work` with a soft pulsing emerald
  dot (`motion-safe:animate-ping`). Header + footer.
- **Magnetic** (`magnetic.tsx`): spring-smoothed pointer pull on contact chips; **fine-pointer only**
  and disabled under reduced motion.
- **⌘K command menu** and **contribution heatmap** carry over from before.

## 6. Motion

- Shared values in `src/lib/motion.ts`; app-wide `MotionProvider` (`reducedMotion="user"`). The CSS
  guard in `globals.css` is the no-JS fallback.
- Principles (Emil Kowalski): transform/opacity/blur only; UI durations <300ms; ease-out for
  entrances (`--ease-snappy` = `cubic-bezier(0.23,1,0.32,1)`); exits faster than enters; springs for
  the magnetic/“alive” bits; **never** animate the ⌘K keyboard action; press feedback `active:scale-[0.97]`.
- Page-load: a coordinated boot cascade (`bootDelay` in motion.ts) reveals nav → header → first
  section. On scroll: gentle `Reveal` (rise+fade+de-blur), tech-pill stagger, heatmap wave. Every
  effect has a reduced-motion path (collapse to instant/opacity; content always visible).

## 7. Responsive

- Mobile-first. Single column throughout; nav links collapse `< sm`. Touch targets ≥44px.
- Headlines scale via `clamp()`/responsive steps; body ≥16px. No horizontal overflow (heatmap keeps
  its own `overflow-x-auto`). Test 360 / 768 / 1280 / 1440.

## 8. Routes

- `/` → `TopNav` + `PortfolioShell` (`ProfileHeader` + `Experience`, `Projects`, `TechStack`,
  `ContributionsHeatmap`, `Certifications`, `Reading`) + `SiteFooter`.
- `/blog` → terminal-window placeholder card (the one place the terminal motif still earns its keep).
- Nav links are in-page anchors (`#experience`, `#projects`) plus `/blog`.

## 9. Anti-patterns (banned)

No emojis. No Inter/serif. No second styling system or font family outside Geist. No gradient display
text. No nested cards. No over-rounding (cards ≤14px). No reviving the line-number gutter, `const=[]`
section bars, or the two-column app shell. No em dashes in copy. Keep the accent discipline: blue =
interactive, emerald = live status, everything else neutral.
