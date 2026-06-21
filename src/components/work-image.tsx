"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type WorkImageProps = {
  src: string;
  alt: string;
  /** Tailwind sizes for next/image. */
  sizes?: string;
  /** Eager-load (true for an above-the-fold hero). */
  priority?: boolean;
  className?: string;
};

/**
 * A 16:10 product screenshot. Same asset serves light + dark mode.
 * If the file is missing (e.g. not added yet), it collapses to nothing
 * rather than showing a broken image — drop the file in `/public/work/`.
 */
export function WorkImage({ src, alt, sizes, priority, className }: WorkImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-surface-container", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 672px) 100vw, 640px"}
        priority={priority}
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
