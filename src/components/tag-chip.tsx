export type TagChipProps = { tag: string };

export function TagChip({ tag }: TagChipProps) {
  return (
    <span className="rounded-md border border-border px-2 py-0.5 font-technical text-[11px] text-outline">
      {tag}
    </span>
  );
}
