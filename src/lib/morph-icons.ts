import { __iconNode as check } from "@tabler/icons-react/dist/esm/icons/IconCheck.mjs";
import { __iconNode as copy } from "@tabler/icons-react/dist/esm/icons/IconCopy.mjs";
import { __iconNode as loader } from "@tabler/icons-react/dist/esm/icons/IconLoader2.mjs";
import { __iconNode as moon } from "@tabler/icons-react/dist/esm/icons/IconMoon.mjs";
import { __iconNode as send } from "@tabler/icons-react/dist/esm/icons/IconSend.mjs";
import { __iconNode as sun } from "@tabler/icons-react/dist/esm/icons/IconSun.mjs";
import { __iconNode as volume } from "@tabler/icons-react/dist/esm/icons/IconVolume.mjs";
import { __iconNode as volumeOff } from "@tabler/icons-react/dist/esm/icons/IconVolume3.mjs";

/**
 * Tabler icon data for icons that morph between states. Only icons that swap
 * on a state change live here; static icons stay as @tabler/icons-react components.
 */
export const morphIcons = { check, copy, loader, moon, send, sun, volume, volumeOff } as const;

export type MorphIconName = keyof typeof morphIcons;
