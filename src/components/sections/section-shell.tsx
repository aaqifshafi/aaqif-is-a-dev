import type { ReactNode } from "react";

import { GridBand, GridColumn } from "@/components/grid-frame";
import { Reveal } from "@/components/reveal";

export type SectionShellProps = {
  id: string;
  /** Short category label rendered above the title. */
  kicker: string;
  title: string;
  children: ReactNode;
};

export function SectionShell({ id, kicker, title, children }: SectionShellProps) {
  return (
    // tabIndex -1 lets the ⌘K menu move focus here after jumping, so keyboard
    // and screen-reader users land in the section, not just scroll past it.
    <section id={id} aria-labelledby={`${id}-title`} tabIndex={-1} className="outline-none">
      <GridBand>
        <Reveal className="flex flex-col gap-0.5 py-5">
          <span aria-hidden className="font-technical text-[11px] uppercase tracking-widest text-outline">
            {"// "}{kicker}
          </span>
          <h2 id={`${id}-title`} className="font-pixel text-xl text-primary sm:text-2xl">{title}</h2>
        </Reveal>
      </GridBand>
      <GridColumn className="flex flex-col gap-6 py-10 sm:py-14">
        {children}
      </GridColumn>
    </section>
  );
}
