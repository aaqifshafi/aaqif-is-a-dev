import { Reveal } from "@/components/reveal";
import { TagChip } from "@/components/tag-chip";

export type WorkDetailStackProps = { tags: string[] };

export function WorkDetailStack({ tags }: WorkDetailStackProps) {
  return (
    <Reveal className="flex flex-col gap-3">
      <span className="font-technical text-[11px] uppercase tracking-widest text-outline">
        {"// stack"}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>
    </Reveal>
  );
}
