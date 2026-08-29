import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type GridColumnProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * The centered content column. Every block on the page renders one, and they
 * all share the same width, so the two dashed rails drawn by `GridRails` land
 * exactly on their edges.
 */
export function GridColumn({ children, className }: GridColumnProps) {
  return (
    <div className={cn("mx-auto w-full max-w-2xl px-5 sm:px-6", className)}>
      {children}
    </div>
  );
}

/**
 * The two dashed vertical rails framing the page, drawn `md:` and up.
 *
 * One element spanning the document, not a border per block: a dashed border
 * restarts its phase on every element, stuttering at each section seam. It
 * lives in `<body>` rather than being `fixed` so its width tracks the content
 * width, clear of the scrollbar. `z-[45]` puts it over the sticky nav (`z-40`)
 * but under dialogs (`z-50`).
 */
export function GridRails() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 left-0 z-[45] mx-auto hidden w-full max-w-2xl md:block"
    >
      <span className="bg-rail absolute inset-y-0 left-0 w-px" />
      <span className="bg-rail absolute inset-y-0 right-0 w-px" />
    </div>
  );
}

export type GridBandProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * The four points where this band's rules cross the rails. Each is nudged half
 * a pixel off its box corner because neither line runs through it: the rules
 * are borders outside the padding box, the rails sit inside the column edge.
 */
const nodeCorners = [
  "top-0 left-0 translate-x-[calc(-50%_+_0.5px)] translate-y-[calc(-50%_-_0.5px)]",
  "top-0 right-0 translate-x-[calc(50%_-_0.5px)] translate-y-[calc(-50%_-_0.5px)]",
  "bottom-0 left-0 translate-x-[calc(-50%_+_0.5px)] translate-y-[calc(50%_+_0.5px)]",
  "bottom-0 right-0 translate-x-[calc(50%_-_0.5px)] translate-y-[calc(50%_+_0.5px)]",
] as const;

/**
 * A full-bleed row that hatches the page margins and lets the content column
 * read as a clean window cut through them. Its top border doubles as the rule
 * dividing this section from the last, and stays solid against the dashed
 * rails. Nodes sit at `z-[46]` so a passing dash never lightens them.
 */
export function GridBand({ children, className }: GridBandProps) {
  return (
    <div className="relative border-y border-y-grid-line md:bg-hatch">
      <GridColumn className={cn("bg-background", className)}>
        {children}
      </GridColumn>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[46] mx-auto hidden w-full max-w-2xl md:block"
      >
        {nodeCorners.map((corner) => (
          <span
            key={corner}
            className={cn("absolute size-1 bg-grid-node", corner)}
          />
        ))}
      </div>
    </div>
  );
}

export type GridDividerProps = {
  className?: string;
};

/**
 * A band with no content: two rules with a hatched strip between them, for a
 * seam that carries no heading of its own (above the footer).
 */
export function GridDivider({ className }: GridDividerProps) {
  return <GridBand className={cn("h-6", className)} />;
}
