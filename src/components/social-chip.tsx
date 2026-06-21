"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { Magnetic } from "@/components/magnetic";
import { useScramble } from "@/hooks/use-scramble";

export type SocialChipProps = {
  label: string;
  href: string;
};

/** Magnetic contact pill whose label scrambles on hover. */
export function SocialChip({ label, href }: SocialChipProps) {
  const [display, scramble] = useScramble(label);

  return (
    <Magnetic strength={2}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerEnter={scramble}
        aria-label={label}
        className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 font-technical text-[11px] text-on-surface-variant transition-[color,border-color,transform] duration-150 ease-snappy hover:border-outline hover:text-primary active:scale-[0.97]"
      >
        {display}
        <IconArrowUpRight className="size-3 transition-transform duration-200 ease-snappy group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </Magnetic>
  );
}
