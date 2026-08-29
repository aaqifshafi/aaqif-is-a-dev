"use client";

import { useEffect, useRef, useState } from "react";
import { IconEye } from "@tabler/icons-react";
import { motion } from "motion/react";
import { duration, easeSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Public CountAPI instance: https://github.com/syntaxerror019/countapi */
const API_BASE = "https://countapi.mileshilliard.com/api/v1";
/** Counters on the host are public and keyed only by name, so namespace it. */
const COUNTER_KEY = "aaqif-is-a-dev-views";
const SESSION_FLAG = "aaqif-view-counted";

export type VisitorCountProps = {
  className?: string;
  /** Which side its separator sits on. Leading in a row, trailing before the version. */
  separator?: "leading" | "trailing";
};

/**
 * Visit count for the footer bar. Increments once per browser session, then
 * reads. Renders nothing while loading or on failure — a third-party ornament
 * should leave no trace when it breaks, and it owns its own separator because
 * the parent cannot know whether it will render.
 */
export function VisitorCount({
  className,
  separator = "leading",
}: VisitorCountProps) {
  const [views, setViews] = useState<number | null>(null);
  const requested = useRef(false);

  useEffect(() => {
    // StrictMode runs effects twice in dev; without this every load counts twice.
    if (requested.current) return;
    requested.current = true;

    let cancelled = false;
    let counted = false;
    try {
      counted = window.sessionStorage.getItem(SESSION_FLAG) === "1";
    } catch {
      // Storage can throw when blocked; recounting is the harmless failure.
    }

    fetch(`${API_BASE}/${counted ? "get" : "hit"}/${COUNTER_KEY}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { value?: number }) => {
        if (cancelled || typeof data.value !== "number") return;
        setViews(data.value);
        try {
          window.sessionStorage.setItem(SESSION_FLAG, "1");
        } catch {}
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (views === null) return null;

  const dot = (
    <span className="text-outline" aria-hidden>
      ·
    </span>
  );

  return (
    <>
      {separator === "leading" ? dot : null}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.base, ease: easeSnappy }}
        className={cn("inline-flex items-center gap-1.5", className)}
      >
        <IconEye className="size-3 shrink-0" aria-hidden />
        <span className="tabular-nums">{views.toLocaleString("en-US")}</span>
        <span>{views === 1 ? "view" : "views"}</span>
      </motion.span>
      {separator === "trailing" ? dot : null}
    </>
  );
}
