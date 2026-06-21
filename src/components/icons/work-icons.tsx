import { IconBoxMultiple, IconTerminal2, IconWallet } from "@tabler/icons-react";
import type { ComponentType } from "react";

import { DesignfolioIcon, GistrIcon } from "@/components/icons/custom-icons";
import type { ExperienceIcon } from "@/types/portfolio";

type IconProps = { className?: string };

/** Maps a work entry's `icon` key to its rendered icon component. */
export const workIcons: Record<ExperienceIcon, ComponentType<IconProps>> = {
  boxes: IconBoxMultiple,
  terminal: IconTerminal2,
  gistr: GistrIcon,
  wallet: IconWallet,
  designfolio: DesignfolioIcon,
};
