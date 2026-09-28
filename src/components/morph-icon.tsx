"use client";

import {
  MorphIcon as BaseMorphIcon,
  type MorphIconProps as BaseMorphIconProps,
} from "morphicons/react";

import { morphIcons, type MorphIconName } from "@/lib/morph-icons";

export type MorphIconProps = Omit<BaseMorphIconProps, "icon" | "from" | "to" | "progress"> & {
  name: MorphIconName;
};

/**
 * Icon that morphs into the next shape whenever `name` changes. Uses the
 * site-wide spring and honors `prefers-reduced-motion` (jumps instead of morphing).
 */
export function MorphIcon({ name, ...props }: MorphIconProps) {
  return (
    <BaseMorphIcon
      icon={morphIcons[name]}
      spring="snappy"
      reducedMotion="user"
      {...props}
    />
  );
}
