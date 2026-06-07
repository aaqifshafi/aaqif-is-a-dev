import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { ContributionsHeatmap } from "@/components/sections/contributions-heatmap";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Reading } from "@/components/sections/reading";
import { TechStack } from "@/components/sections/tech-stack";

/** Stacked content sections in the single column, with generous vertical rhythm. */
export function Workspace() {
  return (
    <div className="flex flex-col gap-16 pb-24 sm:gap-20">
      <Experience />
      <Projects />
      <TechStack />
      <ContributionsHeatmap />
      <Certifications />
      <Reading />
      <Contact />
    </div>
  );
}
