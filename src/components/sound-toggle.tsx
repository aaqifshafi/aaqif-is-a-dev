"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

import { MorphIcon } from "@/components/morph-icon";
import { play, setSoundEnabled, soundPreference, unlockAudio } from "@/lib/sound";
import { cn } from "@/lib/utils";

export type SoundToggleProps = { className?: string };

/**
 * Turns the site's interaction sounds on or off (on by default; the choice is
 * remembered). Turning on plays a soft rising toggle as confirmation; turning
 * off is silent. `M` toggles it from the keyboard, like `T` for the theme.
 */
export function SoundToggle({ className }: SoundToggleProps) {
  const enabled = useSyncExternalStore(
    soundPreference.subscribe,
    soundPreference.getSnapshot,
    soundPreference.getServerSnapshot,
  );

  const toggle = useCallback(async () => {
    if (enabled) {
      setSoundEnabled(false);
      return;
    }
    setSoundEnabled(true);
    // Start audio inside this gesture; confirm only if the browser allowed it.
    if (await unlockAudio()) play("toggle-on");
  }, [enabled]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "m" || e.key === "M") void toggle();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  return (
    <button
      type="button"
      aria-label="Interface sounds"
      aria-pressed={enabled}
      onClick={() => void toggle()}
      className={cn(
        "flex size-8 items-center justify-center text-on-surface-variant transition-[color,transform] duration-150 ease-snappy hover:text-primary active:scale-90",
        className,
      )}
    >
      <MorphIcon name={enabled ? "volume" : "volumeOff"} className="size-4.5" />
    </button>
  );
}
