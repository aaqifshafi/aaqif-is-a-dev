"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { fadeRise, revealTransition } from "@/lib/motion";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in ms for cascading reveals. */
  delay?: number;
  /**
   * Animate immediately on mount (for the above-the-fold opening orchestration)
   * instead of waiting to scroll into view.
   */
  immediate?: boolean;
};

/**
 * Entrance reveal — content rises, fades, and sharpens from a soft blur
 * (transform/opacity/filter only). When the user prefers reduced motion the
 * content renders plainly and fully visible, so it is never gated behind an
 * animation that might not run.
 */
export function Reveal({ children, className, delay = 0, immediate = false }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const transition = { ...revealTransition, delay: delay / 1000 };
  const trigger = immediate
    ? { animate: "shown" as const }
    : {
        whileInView: "shown" as const,
        viewport: { once: true, margin: "0px 0px -48px 0px" },
      };

  return (
    <motion.div
      className={className}
      variants={fadeRise}
      initial="hidden"
      transition={transition}
      {...trigger}
    >
      {children}
    </motion.div>
  );
}
