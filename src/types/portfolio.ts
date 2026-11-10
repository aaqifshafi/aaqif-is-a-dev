/** Shared content types for the portfolio. Content lives in `src/lib/portfolio-data.ts`. */

export type NavLink = {
  /** Displayed in JetBrains Mono, prefixed with `//` in the UI. */
  label: string;
  href: string;
};

export type SocialLink = {
  /** Two-digit index shown beside the label (e.g. "01"). */
  index: string;
  label: string;
  href: string;
  /** Open the Cal.com booking modal in-page instead of following `href`. */
  booking?: boolean;
};

export type ManifestItem = {
  /** Terminal-style sigil rendered in the left column (e.g. "~", "@", ">"). */
  sigil: string;
  value: string;
};

export type Book = {
  title: string;
  author: string;
};

export type ExperienceIcon =
  | "boxes"
  | "terminal"
  | "gistr"
  | "wallet"
  | "designfolio"
  | "tapaway"
  | "peopleofbengaluru";

/** A silent, looping product clip. Shown in place of the screenshot when present. */
export type WorkVideoSource = {
  /** Path under `/public`, e.g. "/work/people-of-bengaluru.mp4". */
  src: string;
  /** MIME type with codecs, so the browser skips files it can't decode. */
  type: string;
};

export type WorkVideo = {
  /** Best codec first (AV1, then H.264 as the universal fallback). */
  sources: WorkVideoSource[];
  /** First-frame still shown before playback (and under reduced motion). */
  poster: string;
  /** Intrinsic pixel size — reserves the clip's aspect ratio before it loads. */
  width: number;
  height: number;
};

/** A grouped block of work within a case study (hybrid: one line of context + bullets). */
export type WorkSection = {
  title: string;
  context: string;
  bullets: string[];
};

/**
 * A role / company. Powers both the homepage Work cards and the
 * `/work/[slug]` case study pages — single source of truth.
 */
export type WorkProject = {
  /** URL slug for `/work/[slug]`. */
  slug: string;
  company: string;
  role: string;
  /** Employment type, e.g. "Full-time" / "Intern". */
  type: string;
  /** Date range, e.g. "01.2025 — 04.2026" or "05.2026 — Now". */
  period: string;
  icon: ExperienceIcon;
  /** Marks the current role (renders the glowing status dot). */
  active?: boolean;
  /** Keeps the entry (and its `/work/[slug]` page) but leaves it off the homepage Work list. */
  hidden?: boolean;
  /** Short summary shown on the homepage card. */
  blurb: string;
  /** Live product URL (rendered as an external link on the detail page). */
  liveUrl?: string;
  /** Label for the live link, e.g. "designfolio.me". Defaults to the URL host. */
  liveLabel?: string;
  /** Product clip. Takes priority over `image`; falls back to it when absent. */
  video?: WorkVideo;
  /**
   * Screenshot path under `/public` (same image for light + dark), e.g.
   * "/work/gistr.png". Omit when there's no screenshot — the card/hero collapses.
   */
  image?: string;
  /** What the product is — the opening paragraph on the detail page. */
  product: string;
  /** Grouped detail of what was built. */
  sections: WorkSection[];
  tags: string[];
};

export type TechIconKey =
  | "react"
  | "next"
  | "tailwind"
  | "motion"
  | "figma"
  | "node"
  | "postgres"
  | "git"
  | "docker"
  | "aws"
  | "vercel"
  | "mongodb"
  | "python"
  | "vscode"
  | "vite"
  | "linux"
  | "typescript"
  | "javascript"
  | "github"
  | "terminal"
  | "redis"
  | "claude"
  | "cursor"
  | "bun";

export type TechItem = {
  name: string;
  /** Tabler or custom icon key — maps to an icon in the tech-stack icon registry. */
  icon: TechIconKey;
  /** Homepage URL — opens in a new tab when the chip is clicked. */
  url?: string;
};

export type Certification = {
  index: string;
  title: string;
  issuer: string;
  year: string;
  href?: string;
};
