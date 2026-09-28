"use client";

import { useEffect, type ComponentProps } from "react";
import { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";

import { profile } from "@/lib/portfolio-data";

const NAMESPACE = "book-call";

export type BookCallButtonProps = Omit<ComponentProps<"button">, "type">;

/** Reads a design token from :root so the Cal iframe matches the active theme. */
function token(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Opens the Cal.com booker in a modal over the page instead of navigating away.
 * The embed script is loaded lazily from Cal and themed from our CSS tokens.
 */
export function BookCallButton(props: BookCallButtonProps) {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const theme = resolvedTheme === "light" ? "light" : "dark";

    let cancelled = false;
    getCalApi({ namespace: NAMESPACE }).then((cal) => {
      if (cancelled) return;
      const vars = {
        "cal-brand": token("--primary"),
        "cal-brand-emphasis": token("--foreground"),
        "cal-brand-text": token("--primary-foreground"),
        "cal-bg": token("--background"),
        "cal-bg-muted": token("--surface"),
        "cal-bg-emphasis": token("--surface-container"),
        "cal-border": token("--border"),
        "cal-border-subtle": token("--outline-variant"),
        "cal-text": token("--foreground"),
        "cal-text-emphasis": token("--primary"),
        "cal-text-subtle": token("--on-surface-variant"),
        "cal-text-muted": token("--outline"),
      };
      cal("ui", {
        theme,
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: { light: vars, dark: vars },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [resolvedTheme]);

  return (
    <button
      type="button"
      data-cal-namespace={NAMESPACE}
      data-cal-link={profile.calLink}
      data-cal-config={JSON.stringify({ layout: "month_view" })}
      {...props}
    />
  );
}
