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

export type ExperienceIcon = "boxes" | "terminal" | "gistr" | "wallet" | "designfolio";

export type ExperienceRole = {
  company: string;
  role: string;
  /** Employment type, e.g. "Full-time" / "Contract". */
  type: string;
  /** Date range, e.g. "01.2026 — ∞". */
  period: string;
  icon: ExperienceIcon;
  /** URL slug for the /work case study page. */
  slug: string;
  /** Marks the current role (renders the glowing blue status dot). */
  active?: boolean;
  /** One-line summary shown in the homepage accordion. */
  blurb?: string;
  highlights: string[];
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

export type Project = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
};

export type Certification = {
  index: string;
  title: string;
  issuer: string;
  year: string;
  href?: string;
};
