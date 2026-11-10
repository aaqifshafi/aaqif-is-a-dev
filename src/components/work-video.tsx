"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import type { WorkVideo as WorkVideoData } from "@/types/portfolio";

export type WorkVideoProps = {
  video: WorkVideoData;
  /** Accessible description of what the clip shows. */
  label: string;
  /** Start fetching immediately (true for an above-the-fold hero). */
  priority?: boolean;
  className?: string;
};

/**
 * A silent, looping product clip that plays inline. It only downloads and
 * plays while on screen, and under `prefers-reduced-motion` it stays on its
 * poster. Sources are listed best-codec first (AV1, then H.264), so each
 * browser picks the smallest file it can decode. Fills its parent stage.
 */
export function WorkVideo({ video, label, priority, className }: WorkVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduce) {
      el.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // Autoplay can be refused (e.g. Low Power Mode); the poster stays up.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      poster={video.poster}
      width={video.width}
      height={video.height}
      aria-label={label}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload={priority ? "auto" : "none"}
      className={cn("absolute inset-0 size-full object-cover", className)}
    >
      {video.sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
