"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";
import { MorphIcon } from "@/components/morph-icon";
import { useMounted } from "@/hooks/use-mounted";
import { click003Sound } from "@/lib/click-003";
import { playSound } from "@/lib/sound-engine";
import { setThemeWithTransition } from "@/lib/theme";
import { cn } from "@/lib/utils";

export type ThemeToggleProps = { className?: string };

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = !mounted || resolvedTheme === "dark";

  const toggle = useCallback(() => {
    const next = isDark ? "light" : "dark";
    void playSound(click003Sound.dataUri, { volume: 0.4 });
    setThemeWithTransition(setTheme, next);
  }, [isDark, setTheme]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement).isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "t" || e.key === "T") toggle();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggle}
      className={cn(
        "flex size-8 items-center justify-center text-on-surface-variant transition-[color,transform] duration-150 ease-snappy hover:text-primary active:scale-90",
        className,
      )}
    >
      <MorphIcon name={isDark ? "moon" : "sun"} className="size-4.5" />
    </button>
  );
}
