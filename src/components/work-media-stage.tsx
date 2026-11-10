import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type WorkMediaStageProps = {
  children: ReactNode;
  className?: string;
};

/**
 * The one frame every project's media sits in: a fixed 16:10 box that the
 * clip or screenshot fills edge to edge. Videos are encoded at 16:10 already,
 * so nothing is cropped in practice — this just guarantees every card is the
 * same shape.
 */
export function WorkMediaStage({ children, className }: WorkMediaStageProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden bg-surface-container",
        className,
      )}
    >
      {children}
    </div>
  );
}
