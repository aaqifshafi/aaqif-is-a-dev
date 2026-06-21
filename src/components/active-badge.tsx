export type ActiveBadgeProps = Record<string, never>;

export function ActiveBadge() {
  return (
    <span className="flex shrink-0 items-center gap-1 font-technical text-[10px] text-[hsl(var(--color-success))]">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-current" />
      </span>
      now
    </span>
  );
}
