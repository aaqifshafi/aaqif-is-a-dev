"use client";

import {
  IconBoxMultiple,
  IconBriefcase2,
  IconChevronUp,
  IconTerminal2,
  IconWallet,
} from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import type { ComponentType } from "react";

import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/sections/section-shell";
import { experience } from "@/lib/portfolio-data";
import { easeSnappy } from "@/lib/motion";
import type { ExperienceIcon } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type IconProps = { className?: string; size?: number };
type AnyIcon = ComponentType<IconProps>;

function GistrIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 20" fill="none" aria-hidden="true" className={className}>
      <g fill="currentColor">
        <path d="M12.994.476l-.31 4.449c0 .107-.06.214-.134.291l-2.027 1.948a.409.409 0 01-.68-.184c-.37-1.196-1.361-3.574-3.506-3.574-2.146 0-4.04 2.101-2.856 5.292 1.021 2.746 4.069 1.534 5.104 1.059 2.412-1.09 5.282-4.633 6.614-6.397.577-1.028.577-1.028.68-1.12.148 0 .119.36.119.399l-.06 4.817a.497.497 0 01-.118.307c-.784.828-5.282 5.43-8.255 6.013-2.412.476-6.333-.629-7.353-5.292C-.81 3.82 2.09 1.334 4.088.644 5.198.261 7.964.537 9 .814c1.035.275.503-.124.517-.4 0-.23.193-.414.415-.414h2.633c.237 0 .43.215.414.46l.015.016z" />
        <path d="M.817 14.19H3.51c.118 0 .222.062.281.169.31.537 1.258 1.933 2.767 2.163 1.215.185 2.507-.537 3.27-1.488.59-.736.636-.936.62-1.197-.002-.042-.073-.306.075-.383l2.367-1.703a.333.333 0 01.518.23c.222 1.672.4 6.689-5.193 7.931H8.2c-.281.046-6.687 1.074-7.693-5.308-.03-.214.118-.398.325-.398l-.015-.016z" />
      </g>
    </svg>
  );
}

const experienceIcons: Record<ExperienceIcon, AnyIcon> = {
  boxes: IconBoxMultiple,
  terminal: IconTerminal2,
  gistr: GistrIcon,
  wallet: IconWallet,
  designfolio: IconBriefcase2,
};

type ItemProps = {
  role: (typeof experience)[number];
  defaultOpen?: boolean;
};

function ExperienceItem({ role, defaultOpen = true }: ItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const Icon = experienceIcons[role.icon];

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-center justify-between gap-3 py-3 text-left"
      >
        <div className="flex min-w-0 items-center gap-3">
          <motion.div
            animate={{ rotate: open ? 0 : 180 }}
            transition={{ duration: 0.2, ease: easeSnappy }}
          >
            <IconChevronUp className="size-3 shrink-0 text-outline transition-colors group-hover:text-on-surface-variant" />
          </motion.div>

          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-surface">
            <Icon className="size-3.5 text-on-surface-variant" />
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <Link
              href={`/work/${role.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="font-pixel text-sm text-primary transition-opacity hover:opacity-70"
            >
              {role.company}
            </Link>
            {role.active && (
              <span className="flex shrink-0 items-center gap-1 font-technical text-[10px] text-[hsl(var(--color-success))]">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-current" />
                </span>
                now
              </span>
            )}
          </div>
        </div>

        <span className="hidden shrink-0 font-technical text-[11px] text-outline sm:block">
          {role.role} · {role.period}
        </span>
      </button>

      {/* Mobile: role + period below the header row */}
      <span className="mb-1 pl-[52px] font-technical text-[11px] text-outline sm:hidden">
        {role.role} · {role.period}
      </span>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: easeSnappy }}
            className="overflow-hidden"
          >
            <p
              className={cn(
                "pb-3 font-technical text-xs leading-relaxed text-on-surface-variant",
                "pl-[52px]", // indent: chevron(12) + gap(12) + icon(28) = 52px
              )}
            >
              {role.blurb ?? role.highlights[0]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Experience() {
  return (
    <SectionShell id="experience" kicker="work" title="Experience">
      <Reveal>
        <div className="divide-y divide-border rounded-xl border border-border bg-surface/40 px-5 sm:px-6">
          {experience.map((role) => (
            <ExperienceItem key={role.company} role={role} />
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
