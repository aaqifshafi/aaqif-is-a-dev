"use client";

import { IconArrowUpRight, IconCalendar } from "@tabler/icons-react";
import { BookCallButton } from "@/components/book-call-button";
import { Magnetic } from "@/components/magnetic";
import { useScramble } from "@/hooks/use-scramble";

export type SocialChipProps = {
  label: string;
  href: string;
  /** Open the in-page Cal.com booking modal instead of linking out. */
  booking?: boolean;
};

const chipClass =
  "group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 font-technical text-[11px] text-on-surface-variant transition-[color,border-color,transform] duration-150 ease-snappy hover:border-outline hover:text-primary active:scale-[0.97]";

const iconClass =
  "size-3 transition-transform duration-200 ease-snappy group-hover:-translate-y-0.5 group-hover:translate-x-0.5";

/** Magnetic contact pill whose label scrambles on hover. */
export function SocialChip({ label, href, booking }: SocialChipProps) {
  const [display, scramble] = useScramble(label);

  if (booking) {
    return (
      <Magnetic strength={2}>
        <BookCallButton
          onPointerEnter={scramble}
          aria-label={label}
          className={chipClass}
        >
          {display}
          <IconCalendar className={iconClass} />
        </BookCallButton>
      </Magnetic>
    );
  }

  return (
    <Magnetic strength={2}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerEnter={scramble}
        aria-label={label}
        className={chipClass}
      >
        {display}
        <IconArrowUpRight className={iconClass} />
      </a>
    </Magnetic>
  );
}
