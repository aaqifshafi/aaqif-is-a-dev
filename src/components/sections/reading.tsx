import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/sections/section-shell";
import { readingList } from "@/lib/portfolio-data";

export function Reading() {
  if (!readingList.length) return null;

  return (
    <SectionShell id="reading" kicker="bookshelf" title="Currently Reading">
      <Reveal>
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface/40 overflow-hidden">
          {readingList.map((book) => (
            <div key={book.title} className="flex items-center justify-between gap-4 px-5 py-4">
              <p className="font-technical text-xs text-primary">{book.title}</p>
              <p className="font-technical text-[11px] text-outline shrink-0">{book.author}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
