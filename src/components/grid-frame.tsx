import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type GridColumnProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * The centered content column. Every block on the page renders one, and their
 * shared side borders stack into the two continuous vertical rails that frame
 * the site. Rails only appear from `md` up, where there is margin to show them.
 */
export function GridColumn({ children, className }: GridColumnProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-2xl px-5 sm:px-6 md:border-x md:border-x-grid-line",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type GridBandProps = {
  children: ReactNode;
  className?: string;
};

/**
 * A full-bleed row that hatches the page margins and lets the content column
 * read as a clean window cut through them. Its top border doubles as the rule
 * that separates one section from the one above it.
 */
export function GridBand({ children, className }: GridBandProps) {
  return (
    <div className="border-y border-y-grid-line md:bg-hatch">
      <GridColumn className={cn("bg-background", className)}>
        {children}
      </GridColumn>
    </div>
  );
}
