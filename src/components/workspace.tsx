import { GridColumn } from "@/components/grid-frame";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { ContributionsHeatmap } from "@/components/sections/contributions-heatmap";
import { Reading } from "@/components/sections/reading";
import { TechStack } from "@/components/sections/tech-stack";
import { Work } from "@/components/sections/work";
import { cn } from "@/lib/utils";

export type WorkspaceProps = {
  className?: string;
};

/**
 * Stacked content sections. They butt directly against each other with no gap:
 * the vertical rhythm lives inside each section's own padding, so the grid
 * rails stay unbroken and each header band's top border becomes the divider.
 */
export function Workspace({ className }: WorkspaceProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <TechStack />
      <ContributionsHeatmap />
      <Work />
      <Certifications />
      <Reading />
      <Contact />
      {/* absorbs leftover height so the rails always reach the footer */}
      <GridColumn className="grow" />
    </div>
  );
}
