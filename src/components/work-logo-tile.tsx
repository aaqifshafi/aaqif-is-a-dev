import { workBrandLogos, workIconBrand, workIcons } from "@/components/icons/work-icons";
import { cn } from "@/lib/utils";
import type { ExperienceIcon } from "@/types/portfolio";

export type WorkLogoTileProps = {
  icon: ExperienceIcon;
  className?: string;
};

/**
 * A work card's company mark. Muted (monochrome) at rest; when the enclosing
 * `.group` card is hovered or its link focused, the full-color mark fades in on
 * top as ONE layer, so tile, glyph and border all arrive together. The color
 * layer sits over the tile's border (`-inset-px`), so the logo's own edge
 * replaces the neutral border instead of sitting inside it. Slow in (1s),
 * quicker out (0.5s) so it never lingers. Opacity-only, so it stays cheap; the
 * global reduced-motion rule makes it an instant swap.
 */
export function WorkLogoTile({ icon, className }: WorkLogoTileProps) {
  const Icon = workIcons[icon];
  const brandLogo = workBrandLogos[icon];

  const colorLayer =
    "absolute -inset-px flex items-center justify-center rounded-[inherit] opacity-0 transition-opacity duration-500 ease-[ease] group-hover:opacity-100 group-hover:duration-1000 group-has-[a:focus-visible]:opacity-100";

  if (brandLogo) {
    const { Logo, tileClassName } = brandLogo;
    return (
      <div
        className={cn(
          "relative flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface",
          tileClassName,
          className,
        )}
      >
        <Logo variant="mono" className="size-full" />
        <div aria-hidden className={colorLayer}>
          <Logo className="size-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-on-surface-variant",
        workIconBrand[icon],
        className,
      )}
    >
      <Icon className="size-4" />
      <div
        aria-hidden
        className={cn(
          colorLayer,
          "bg-[var(--logo-bg,var(--surface))] text-[var(--logo-fg,var(--primary))]",
        )}
      >
        <Icon className="size-4" />
      </div>
    </div>
  );
}
