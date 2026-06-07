"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";

export type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Max px the element shifts toward the cursor. */
  strength?: number;
};

/**
 * Pointer-tracking "magnetic" pull, spring-smoothed for a natural feel (per Emil
 * Kowalski — tying transforms directly to the mouse feels artificial without a
 * spring). Active only on fine-pointer (mouse) devices and disabled entirely
 * under reduced motion.
 */
export function Magnetic({
  children,
  className,
  strength = 12,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 15, mass: 0.4 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const onPointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clamp = (v: number) => Math.max(-strength, Math.min(strength, v));
    x.set(clamp((event.clientX - (rect.left + rect.width / 2)) * 0.4));
    y.set(clamp((event.clientY - (rect.top + rect.height / 2)) * 0.4));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-flex" }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
