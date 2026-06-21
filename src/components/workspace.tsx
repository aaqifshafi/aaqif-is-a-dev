import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { ContributionsHeatmap } from "@/components/sections/contributions-heatmap";
import { Reading } from "@/components/sections/reading";
import { TechStack } from "@/components/sections/tech-stack";
import { Work } from "@/components/sections/work";

/** Stacked content sections in the single column, with generous vertical rhythm. */
export function Workspace() {
  return (
    <div className="flex flex-col gap-16 pb-24 sm:gap-20">
      <Work />
      <TechStack />
      <ContributionsHeatmap />
      <Certifications />
      <Reading />
      <Contact />
    </div>
  );
}
