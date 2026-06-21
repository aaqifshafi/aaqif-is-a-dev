"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
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

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    void playSound(click003Sound.dataUri, { volume: 0.4 });
    setThemeWithTransition(setTheme, next);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement).isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "t" || e.key === "T") toggle();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

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
      <span className="relative inline-flex size-4.5 items-center justify-center">
        <IconMoon
          className={cn(
            "absolute size-4.5 transition-[transform,opacity] duration-300 ease-snappy",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
          )}
        />
        <IconSun
          className={cn(
            "absolute size-4.5 transition-[transform,opacity] duration-300 ease-snappy",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100",
          )}
        />
      </span>
    </button>
  );
}
