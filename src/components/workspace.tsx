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
 * the vertical rhythm lives inside each section's own padding, so each header
 * band's top border becomes the divider between one section and the last.
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
    </div>
  );
}
