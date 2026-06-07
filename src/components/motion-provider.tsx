"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export type MotionProviderProps = { children: ReactNode };

/**
 * App-wide motion context. `reducedMotion="user"` makes every `motion` component
 * honor the OS "reduce motion" setting automatically (transforms collapse, only
 * opacity remains), complementing the CSS guard in globals.css. Children are
 * passed through untouched, so Server Components stay server-rendered.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
