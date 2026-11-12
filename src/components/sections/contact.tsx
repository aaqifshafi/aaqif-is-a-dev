"use client";

import { useActionState, useEffect, useRef } from "react";
import { IconCalendar, IconCheck } from "@tabler/icons-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookCallButton } from "@/components/book-call-button";
import { Reveal } from "@/components/reveal";
import { MorphIcon } from "@/components/morph-icon";
import { SectionShell } from "@/components/sections/section-shell";
import {
  sendContactMessage,
  type ContactState,
} from "@/app/actions/contact";
import { play, typeSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

const fieldLabel =
  "font-technical text-[10px] uppercase tracking-widest text-outline";

const inputClass =
  "font-technical text-xs placeholder:text-outline/40 focus-visible:border-b-outline";

export function Contact() {
  const [state, action, isPending] = useActionState(sendContactMessage, initial);

  // Sound the outcome once it lands.
  useEffect(() => {
    if (state.status === "success") play("success");
    else if (state.status === "error") play("error");
  }, [state]);

  // A failed native validation fires `invalid` once per bad field; sound it
  // once per submit attempt.
  const lastInvalid = useRef(0);
  const onInvalid = () => {
    const now = performance.now();
    if (now - lastInvalid.current < 300) return;
    lastInvalid.current = now;
    play("error");
  };

  if (state.status === "success") {
    return (
      <SectionShell id="contact" kicker="reach out" title="Get in Touch">
        <Reveal>
          <div className="flex items-start gap-3 rounded-xl border border-border bg-surface/40 p-5 sm:p-6">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
              <IconCheck className="size-3 text-emerald-500" />
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="font-technical text-sm text-primary">
                Message sent!
              </p>
              <p className="font-technical text-xs text-on-surface-variant">
                I&apos;ll get back to you soon.
              </p>
            </div>
          </div>
        </Reveal>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="contact" kicker="reach out" title="Get in Touch">
      <Reveal>
        <form
          action={action}
          onSubmit={() => play("send")}
          onInvalidCapture={onInvalid}
          className="rounded-xl border border-border bg-surface/40 p-5 sm:p-6"
        >
          <p className="mb-6 max-w-[52ch] font-technical text-sm leading-relaxed text-on-surface-variant">
            Open to new opportunities, collaborations, and interesting conversations.
          </p>

          <div className="flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className={fieldLabel}>
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  {...typeSound}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={fieldLabel}>
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  {...typeSound}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className={fieldLabel}>
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="What's on your mind?"
                required
                rows={5}
                {...typeSound}
                className={inputClass}
              />
            </div>
          </div>

          {state.status === "error" && (
            <p className="mt-4 font-technical text-[11px] text-destructive">
              {state.message}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
            <BookCallButton className="inline-flex cursor-pointer items-center gap-2 font-technical text-xs text-outline transition-colors hover:text-primary">
              <IconCalendar className="size-3.5" />
              or book a quick call
            </BookCallButton>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-technical text-xs text-on-surface-variant transition-[color,border-color,opacity] hover:border-outline hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MorphIcon
                name={isPending ? "loader" : "send"}
                className={cn("size-3.5", isPending && "animate-spin")}
              />
              {isPending ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>
      </Reveal>
    </SectionShell>
  );
}
