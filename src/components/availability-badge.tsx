import { cn } from "@/lib/utils";

export type AvailabilityBadgeProps = {
  available?: boolean;
  label?: string;
  className?: string;
};

/**
 * Status indicator with a soft pulsing dot. Pure presentational Server Component.
 * Green reads as "available/online" universally; it's the one status color the
 * otherwise near-monochrome palette allows.
 */
export function AvailabilityBadge({
  available = true,
  label,
  className,
}: AvailabilityBadgeProps) {
  const text = label ?? (available ? "Available for work" : "Not available");

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex size-2 items-center justify-center">
        {available ? (
          <span className="absolute inline-flex size-full rounded-full bg-emerald-500/70 motion-safe:animate-ping" />
        ) : null}
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            available ? "bg-emerald-500" : "bg-outline",
          )}
        />
      </span>
      <span className="font-technical text-on-surface-variant">{text}</span>
    </span>
  );
}
