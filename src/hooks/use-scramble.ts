"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Returns `[display, scramble]`. Call `scramble()` (e.g. on pointer enter) to run a
 * left-to-right "decode" of the text, then settle back to it. Best on monospace text
 * so the width never shifts. Skipped entirely under `prefers-reduced-motion`.
 */
export function useScramble(text: string, speed = 30) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    const reveal = 3;
    const total = text.length + 8;
    let step = 0;

    intervalRef.current = window.setInterval(() => {
      let out = "";
      for (let i = 0; i < text.length; i += 1) {
        const ch = text[i];
        if (ch === " ") {
          out += " ";
        } else if (i < step - reveal) {
          out += ch;
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(out);
      step += 1;
      if (step > total) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, speed);
  }, [text, speed]);

  useEffect(
    () => () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    },
    [],
  );

  return [display, scramble] as const;
}
