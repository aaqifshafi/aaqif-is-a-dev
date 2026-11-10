"use client";

import Image from "next/image";
import { useState } from "react";

import { WorkMediaStage } from "@/components/work-media-stage";

export type WorkImageProps = {
  src: string;
  alt: string;
  /** Tailwind sizes for next/image. */
  sizes?: string;
  /** Eager-load (true for an above-the-fold hero). */
  priority?: boolean;
  /** Classes for the outer 16:10 stage (borders, radius). */
  className?: string;
};

/**
 * A product screenshot filling the shared 16:10 stage.
 * Same asset serves light + dark mode. If the file is missing, it collapses to
 * nothing rather than showing a broken image — drop the file in `/public/work/`.
 */
export function WorkImage({ src, alt, sizes, priority, className }: WorkImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <WorkMediaStage className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        quality={90}
        sizes={sizes ?? "(max-width: 672px) 100vw, 640px"}
        priority={priority}
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </WorkMediaStage>
  );
}
