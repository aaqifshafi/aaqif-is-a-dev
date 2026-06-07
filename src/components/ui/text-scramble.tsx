"use client";

import { type ElementType, useEffect, useRef, useState } from "react";

export type TextScrambleProps = {
  children: string;
  className?: string;
  /** Element to render as (e.g. "h1", "span"). */
  as?: ElementType;
  /** Total scramble duration in seconds. */
  duration?: number;
  /** Seconds between scramble steps. */
  speed?: number;
  characterSet?: string;
  /** Run the scramble when true (default true → on mount). */
  trigger?: boolean;
};

const defaultChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Terminal-style "decode" effect: briefly scrambles characters, then resolves
 * left-to-right to the final text. SSR-safe (renders the real text first) and
 * reduced-motion safe (skips the scramble entirely).
 */
export function TextScramble({
  children,
  className,
  as: Component = "span",
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  trigger = true,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(children);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // initial state already shows the final text
    }

    const text = children;
    const steps = Math.max(1, Math.round(duration / speed));
    let step = 0;
    let intervalId: number | undefined;

    // Defer the first state update off the effect body (animation, not sync render).
    rafRef.current = requestAnimationFrame(() => {
      intervalId = window.setInterval(() => {
        const progress = step / steps;
        let scrambled = "";
        for (let i = 0; i < text.length; i += 1) {
          if (text[i] === " ") {
            scrambled += " ";
          } else if (progress * text.length > i) {
            scrambled += text[i];
          } else {
            scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
          }
        }
        setDisplay(scrambled);
        step += 1;
        if (step > steps) {
          if (intervalId) window.clearInterval(intervalId);
          setDisplay(text);
        }
      }, speed * 1000);
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [children, trigger, duration, speed, characterSet]);

  return (
    <Component className={className} aria-label={children}>
      {display}
    </Component>
  );
}
