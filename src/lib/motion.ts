import type { Transition, Variants } from "motion/react";

/**
 * Single source of motion values for the whole site. Mirrors the CSS easing
 * tokens in globals.css (DESIGN.md §7) so JS-driven and CSS-driven motion share
 * the same feel. Animate transform / opacity / filter only.
 */

/** Easing curves (cubic-bezier control points), matching the CSS `--ease-*` tokens. */
export const easeSnappy = [0.23, 1, 0.32, 1] as const;
export const easeFluid = [0.77, 0, 0.175, 1] as const;
export const easeDrawer = [0.32, 0.72, 0, 1] as const;

/** Duration scale, in seconds. */
export const duration = {
  fast: 0.18,
  base: 0.32,
  slow: 0.6,
  reveal: 0.7,
} as const;

/** The default entrance transition (used by Reveal and friends). */
export const revealTransition: Transition = {
  duration: duration.reveal,
  ease: easeSnappy,
};

/** Entrance: rise + fade + de-blur. States only — consumers supply the transition. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/**
 * Coordinated delays (ms) for the opening "boot sequence" so the above-the-fold
 * cascade reads as one orchestrated entrance instead of scattered magic numbers:
 * nav → sidebar rows → hero name → hero tagline → first section.
 */
export const bootDelay = {
  nav: 0,
  navActions: 90,
  profile: 60,
  manifest: 150,
  social: 240,
  reading: 330,
  heroName: 140,
  heroTagline: 260,
} as const;

/** A container whose children animate in on a stagger (pair with `staggerItem`). */
export const staggerContainer = (stagger = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  shown: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** A single staggered child (inherits the container's run, no per-item delay). */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 6, filter: "blur(4px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.base, ease: easeSnappy },
  },
};
