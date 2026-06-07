"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { playToggleSound } from "@/lib/sound";
import { setThemeWithTransition } from "@/lib/theme";
import { cn } from "@/lib/utils";

export type ThemeToggleProps = { className?: string };

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = !mounted || resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    playToggleSound(isDark);
    setThemeWithTransition(setTheme, next);
  };

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
