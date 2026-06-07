"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type LiveClockProps = {
  /** IANA timezone, e.g. "America/Los_Angeles". */
  timeZone: string;
  className?: string;
};

function formatTime(timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  }).format(new Date());
}

/**
 * Real-time local clock for a fixed timezone. Mono + tabular figures so the width
 * never shifts as digits change. Hydration-safe: the server-rendered time is
 * replaced on mount, then ticks every second.
 */
export function LiveClock({ timeZone, className }: LiveClockProps) {
  const [time, setTime] = useState(() => formatTime(timeZone));

  useEffect(() => {
    const tick = () => setTime(formatTime(timeZone));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <span
      className={cn("font-technical tabular-nums", className)}
      suppressHydrationWarning
      aria-label="Current local time"
    >
      {time}
    </span>
  );
}
