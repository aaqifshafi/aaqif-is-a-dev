"use client";

import { useState } from "react";
import { MorphIcon } from "@/components/morph-icon";
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
      <MorphIcon
        name={copied ? "check" : "copy"}
        className={cn(
          "size-3 transition-colors duration-200 ease-snappy",
          copied && "text-emerald-500",
        )}
      />
      {copied ? "Copied" : "Email"}
    </button>
  );
}
