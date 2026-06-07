"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type CopyEmailProps = {
  email: string;
  className?: string;
};

/** Pill button that copies the email to the clipboard with a check-mark swap. */
export function CopyEmail({ email, className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Copy email address ${email}`}
      className={cn(
        "group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 font-technical text-[11px] text-on-surface-variant transition-[color,border-color,transform] duration-150 ease-snappy hover:border-outline hover:text-primary active:scale-[0.97]",
        className,
      )}
    >
      <span className="relative inline-flex size-3 items-center justify-center">
        <IconCopy
          className={cn(
            "absolute size-3 transition-[transform,opacity] duration-200 ease-snappy",
            copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
          )}
        />
        <IconCheck
          className={cn(
            "absolute size-3 text-emerald-500 transition-[transform,opacity] duration-200 ease-snappy",
            copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        />
      </span>
      {copied ? "Copied" : "Email"}
    </button>
  );
}
