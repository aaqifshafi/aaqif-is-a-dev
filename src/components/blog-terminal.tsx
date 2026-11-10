"use client";

import { IconArrowUpRight, IconCornerDownLeft } from "@tabler/icons-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useMounted } from "@/hooks/use-mounted";
import { duration, easeSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FIRST_COMMAND = "cat status.md";
const SECOND_COMMAND = "cd ~";
const OUTPUT = ["Blog: coming soon. No ETA.", "Might write about software. Might just keep building it."];

/** Timeline (ms). One orchestrated sequence; nothing else on the page moves. */
const timing = {
  /** Let the window land before the first keystroke. */
  start: 650,
  /** Base gap between keystrokes. */
  key: 52,
  /** The beat where you'd hit Return. */
  enter: 340,
  /** Gap between printed output lines. */
  line: 90,
  /** Pause after the output before typing the next command. */
  read: 700,
} as const;

/** Uneven keystroke offsets so typing reads as human, not metronomic. Deterministic: no hydration drift. */
const jitter = [0, 22, -12, 34, -8, 14, 46, -4, 18, 6, -14, 28, 2];
const keyDelay = (i: number) => timing.key + jitter[i % jitter.length];

type Phase = "idle" | "typing-1" | "output" | "typing-2" | "done";

type Caret = "blink" | "solid" | "settle";

export type BlogTerminalProps = { className?: string };

/**
 * The /blog placeholder as a terminal that "runs" itself once: types
 * `cat status.md`, prints the status, then types `cd ~` — which is the real
 * link home (press Return or click it).
 *
 * Motion is reserved for this single, rarely-seen moment. Screen readers get
 * the whole message at once (the typed copy is aria-hidden), and reduced
 * motion shows the finished state with no typing.
 */
export function BlogTerminal({ className }: BlogTerminalProps) {
  // Only trust the motion preference after hydration, so the server and the
  // first client render agree (the server can't know it).
  const mounted = useMounted();
  const reduce = useReducedMotion() === true && mounted;
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [typed1, setTyped1] = useState(0);
  const [typed2, setTyped2] = useState(0);
  const [typing, setTyping] = useState(false);
  const [printed, setPrinted] = useState(0);

  const finished = reduce || phase === "done";
  const shown1 = reduce ? FIRST_COMMAND.length : typed1;
  const shown2 = reduce ? SECOND_COMMAND.length : typed2;
  const linesShown = reduce ? OUTPUT.length : printed;
  const secondPromptVisible = reduce || phase === "typing-2" || phase === "done";

  // The typing script. Runs once after hydration; every timer is cleared on unmount.
  useEffect(() => {
    if (!mounted || reduce) return;
    const timers: number[] = [];
    let t = timing.start;
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const typeOut = (text: string, set: (n: number) => void) => {
      at(t, () => setTyping(true));
      for (let i = 1; i <= text.length; i++) {
        t += keyDelay(i);
        at(t, () => set(i));
      }
      // Real terminals hold the caret solid while keys land; it resumes blinking at rest.
      at(t + 1, () => setTyping(false));
    };

    at(t, () => setPhase("typing-1"));
    typeOut(FIRST_COMMAND, setTyped1);
    t += timing.enter;
    at(t, () => setPhase("output"));
    // Output prints line by line on the timeline: terminals print, they don't slide.
    OUTPUT.forEach((_, i) => at(t + i * timing.line, () => setPrinted(i + 1)));
    t += timing.read;
    at(t, () => setPhase("typing-2"));
    typeOut(SECOND_COMMAND, setTyped2);
    t += timing.enter;
    at(t, () => setPhase("done"));

    return () => timers.forEach(window.clearTimeout);
  }, [mounted, reduce]);

  // Once the prompt is waiting, Return runs it — unless focus is in something else.
  useEffect(() => {
    if (!finished) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const active = document.activeElement;
      if (active && active !== document.body && active !== linkRef.current) return;
      event.preventDefault();
      router.push("/");
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [finished, router]);

  const caretFor = (line: 1 | 2): Caret | null => {
    if (reduce) return line === 2 ? "solid" : null;
    const onLine1 = phase === "idle" || phase === "typing-1";
    const onLine2 = phase === "typing-2" || phase === "done";
    if (line === 1 && !onLine1) return null;
    if (line === 2 && !onLine2) return null;
    if (typing) return "solid";
    return phase === "done" ? "settle" : "blink";
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      {/* The message, all at once, for assistive tech. */}
      <h1 className="sr-only">Blog — coming soon</h1>
      <p className="sr-only">{OUTPUT.join(" ")}</p>

      {/* The window lands once: a short rise and fade, then the terminal takes over. */}
      <motion.div
        initial={{ opacity: 0, transform: "translateY(12px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: reduce ? duration.fast : duration.slow, ease: easeSnappy }}
        className="overflow-hidden rounded-xl border border-border bg-surface"
      >
        <div aria-hidden className="flex items-center gap-2 border-b border-border bg-surface-container-low px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-outline/60" />
            <span className="size-2 rounded-full bg-outline/40" />
            <span className="size-2 rounded-full bg-outline/30" />
          </span>
          <span className="ml-1 font-technical text-[10px] text-outline">~/blog — zsh</span>
        </div>

        <div className="space-y-4 p-6 font-technical text-[11px] leading-relaxed text-on-surface-variant sm:p-8">
          <p aria-hidden className="flex items-center">
            <span className="mr-2 text-outline">$</span>
            <span className="text-on-surface">{FIRST_COMMAND.slice(0, shown1)}</span>
            <TerminalCaret state={caretFor(1)} />
          </p>

          <div aria-hidden className="space-y-4">
            {OUTPUT.map((line, i) => (
              <p
                key={line}
                className={cn(
                  "transition-opacity duration-200 ease-snappy",
                  i === 0 && "text-base text-primary",
                  i < linesShown ? "opacity-100" : "opacity-0",
                )}
              >
                {line}
              </p>
            ))}
          </div>

          <p
            className={cn(
              "flex items-center transition-opacity duration-200 ease-snappy",
              secondPromptVisible ? "opacity-100" : "opacity-0",
            )}
          >
            <span aria-hidden className="mr-2 text-outline">$</span>
            <Link
              ref={linkRef}
              href="/"
              aria-label="Back to home"
              tabIndex={finished ? 0 : -1}
              className="group/cd inline-flex items-center gap-1 rounded-sm text-on-surface outline-none transition-[color,transform] duration-150 ease-snappy hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:scale-[0.97]"
            >
              <span aria-hidden>{SECOND_COMMAND.slice(0, shown2)}</span>
              <TerminalCaret state={caretFor(2)} />
              <IconArrowUpRight
                aria-hidden
                className={cn(
                  "size-3 transition-[opacity,transform] duration-200 ease-snappy [@media(hover:hover)]:group-hover/cd:-translate-y-0.5 [@media(hover:hover)]:group-hover/cd:translate-x-0.5",
                  finished ? "opacity-100" : "opacity-0",
                )}
              />
            </Link>
            <span
              aria-hidden
              className={cn(
                "ml-auto hidden items-center gap-1 text-[10px] text-outline transition-opacity duration-200 ease-snappy [@media(pointer:fine)]:inline-flex",
                finished ? "opacity-100" : "opacity-0",
              )}
            >
              press <IconCornerDownLeft className="size-3" />
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

type TerminalCaretProps = { state: Caret | null };

/** Block caret. Solid while keys land, blinking at rest, then settles solid after 4 blinks. */
function TerminalCaret({ state }: TerminalCaretProps) {
  if (!state) return null;
  return (
    <span
      // Re-keying restarts the blink from "on" whenever the state changes.
      key={state}
      aria-hidden
      className={cn(
        "ml-px inline-block h-[1.15em] w-[0.6em] translate-y-px bg-primary",
        state === "blink" && "animate-caret-blink",
        state === "settle" && "animate-caret-settle",
      )}
    />
  );
}
