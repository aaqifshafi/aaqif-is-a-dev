import { WorkImage } from "@/components/work-image";
import { WorkMediaStage } from "@/components/work-media-stage";
import { WorkVideo } from "@/components/work-video";
import type { WorkProject } from "@/types/portfolio";

export type WorkMediaProps = {
  project: Pick<WorkProject, "company" | "video" | "image">;
  /** Eager-load (true for an above-the-fold hero). */
  priority?: boolean;
  /** Tailwind sizes for next/image (screenshot fallback only). */
  sizes?: string;
  /** Classes for the outer 16:10 stage (borders, radius). */
  className?: string;
};

/**
 * A project's hero media in the shared 16:10 stage: the video if there is
 * one, otherwise the screenshot, otherwise nothing at all.
 */
export function WorkMedia({ project, priority, sizes, className }: WorkMediaProps) {
  if (project.video) {
    return (
      <WorkMediaStage className={className}>
        <WorkVideo
          video={project.video}
          label={`${project.company} product walkthrough`}
          priority={priority}
        />
      </WorkMediaStage>
    );
  }

  if (project.image) {
    return (
      <WorkImage
        src={project.image}
        alt={`${project.company} product screenshot`}
        priority={priority}
        sizes={sizes}
        className={className}
      />
    );
  }

  return null;
}
