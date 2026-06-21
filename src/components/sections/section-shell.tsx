import type { ReactNode } from "react";
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
    <section id={id} className="flex flex-col gap-6">
      <Reveal className="flex flex-col gap-0.5">
        <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
          {"// "}{kicker}
        </span>
        <h2 className="font-pixel text-xl text-primary sm:text-2xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}
