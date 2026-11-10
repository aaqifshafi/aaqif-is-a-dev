"use client";

import { useEffect, useState } from "react";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const DEPLOYED_AT = process.env.NEXT_PUBLIC_DEPLOYED_AT ?? "";
const COMMIT_SHA = process.env.NEXT_PUBLIC_COMMIT_SHA ?? "";

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto", style: "short" });

/** "just now", "6 min. ago", "3 hr. ago", "2 days ago", … */
function since(iso: string, now: number): string {
  const seconds = Math.round((new Date(iso).getTime() - now) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 60) return "just now";
  if (abs < 3600) return relative.format(Math.round(seconds / 60), "minute");
  if (abs < 86400) return relative.format(Math.round(seconds / 3600), "hour");
  if (abs < 86400 * 30) return relative.format(Math.round(seconds / 86400), "day");
  return relative.format(Math.round(seconds / (86400 * 30)), "month");
}

export type LastDeployProps = { className?: string };

/**
 * "last deployed 6 min. ago", for the footer's bottom bar. Hovering the time
 * shows the exact date and commit. Relative time depends on the visitor's
 * clock, so it renders only after hydration (no server/client mismatch) and
 * ticks once a minute.
 */
export function LastDeploy({ className }: LastDeployProps) {
  const mounted = useMounted();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!DEPLOYED_AT) return null;

  const absolute = new Date(DEPLOYED_AT).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const tooltip = COMMIT_SHA ? `${absolute} · ${COMMIT_SHA}` : absolute;

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-emerald-500/80" />
      <span>
        last deployed{" "}
        <time dateTime={DEPLOYED_AT} title={tooltip}>
          {mounted ? since(DEPLOYED_AT, now) : "recently"}
        </time>
      </span>
    </span>
  );
}
