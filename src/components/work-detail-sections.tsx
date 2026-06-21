import { Reveal } from "@/components/reveal";
import type { WorkProject } from "@/types/portfolio";

export type WorkDetailSectionsProps = {
  sections: WorkProject["sections"];
};

export function WorkDetailSections({ sections }: WorkDetailSectionsProps) {
  return (
    <div className="flex flex-col gap-8">
      <Reveal>
        <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
          {"// what I built"}
        </span>
      </Reveal>

      {sections.map((section) => (
        <Reveal key={section.title} className="flex flex-col gap-3">
          <h2 className="font-pixel text-base text-primary">{section.title}</h2>
          <p className="font-technical text-xs leading-relaxed text-on-surface-variant">
            {section.context}
          </p>
          <ul className="flex flex-col gap-1.5 pl-1">
            {section.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-2 font-technical text-xs text-on-surface-variant"
              >
                <span className="mt-px shrink-0 text-outline">–</span>
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
