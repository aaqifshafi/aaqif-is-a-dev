"use client";

import Link from "next/link";
import { useScramble } from "@/hooks/use-scramble";

export type ScrambleLinkProps = {
  href: string;
  children: string;
  className?: string;
  /** Render a plain external anchor (new tab) instead of a client-routed link. */
  external?: boolean;
};

/** A link whose (monospace) label decodes with a scramble on hover. */
export function ScrambleLink({ href, children, className, external }: ScrambleLinkProps) {
  const [display, scramble] = useScramble(children);
  const shared = { className, onPointerEnter: scramble, "aria-label": children };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
        {display}
      </a>
    );
  }

  return (
    <Link href={href} {...shared}>
      {display}
    </Link>
  );
}
