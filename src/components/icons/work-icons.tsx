import {
  IconBoxMultiple,
  IconTerminal2,
  IconWallet,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

import {
  type BrandLogoProps,
  DesignfolioIcon,
  DesignfolioLogo,
  GistrIcon,
  PeopleOfBengaluruIcon,
  TapawayIcon,
} from "@/components/icons/custom-icons";
import type { ExperienceIcon } from "@/types/portfolio";

type IconProps = { className?: string };

/** Maps a work entry's `icon` key to its rendered icon component. */
export const workIcons: Record<ExperienceIcon, ComponentType<IconProps>> = {
  boxes: IconBoxMultiple,
  terminal: IconTerminal2,
  gistr: GistrIcon,
  wallet: IconWallet,
  designfolio: DesignfolioIcon,
  tapaway: TapawayIcon,
  peopleofbengaluru: PeopleOfBengaluruIcon,
};

export type WorkBrandLogo = {
  /** The real logo: its `mono` variant at rest, `color` on hover. */
  Logo: ComponentType<BrandLogoProps>;
  /** Tile shape matching the logo's own silhouette, so the border hugs it. */
  tileClassName?: string;
};

/**
 * Marks whose real logo is a full-color asset (gradients, effects) rather than
 * a flat two-color tile. The tile shows this logo itself — black & white at rest,
 * blooming to color on card hover — instead of the recolored glyph.
 */
export const workBrandLogos: Partial<Record<ExperienceIcon, WorkBrandLogo>> = {
  designfolio: { Logo: DesignfolioLogo, tileClassName: "rounded-full" },
};

/**
 * Each flat mark's real app-icon colors, as `--logo-bg` / `--logo-fg` for the
 * logo tile to bloom into on card hover. Marks without an entry fall back to
 * the neutral surface + primary.
 */
export const workIconBrand: Partial<Record<ExperienceIcon, string>> = {
  peopleofbengaluru: "[--logo-bg:var(--brand-pob-bg)] [--logo-fg:var(--brand-pob-fg)]",
  tapaway: "[--logo-bg:var(--brand-tapaway-bg)] [--logo-fg:var(--brand-tapaway-fg)]",
  gistr: "[--logo-bg:var(--brand-gistr-bg)] [--logo-fg:var(--brand-gistr-fg)]",
};
