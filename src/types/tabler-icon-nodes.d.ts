/**
 * Per-icon ESM files in @tabler/icons-react export their raw SVG data as
 * `__iconNode`. We read it to feed `morphicons` so morphs use the exact same
 * Tabler shapes as our static icons (and stay in sync on upgrades).
 */
declare module "@tabler/icons-react/dist/esm/icons/*.mjs" {
  import type { IconNode } from "morphicons/react";

  export const __iconNode: IconNode;
}
