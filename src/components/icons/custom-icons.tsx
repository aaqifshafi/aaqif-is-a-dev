type IconProps = { className?: string };

export const ClaudeIcon = ({ className }: IconProps) => (
  <img
    src="/assets/brandLogos/claude.svg"
    className={className}
    alt=""
    aria-hidden="true"
  />
);

export const CursorIcon = ({ className }: IconProps) => (
  <img
    src="/assets/brandLogos/cursor.svg"
    className={className}
    alt=""
    aria-hidden="true"
  />
);

export const BunIcon = ({ className }: IconProps) => (
  <img
    src="/assets/brandLogos/bun.svg"
    className={className}
    alt=""
    aria-hidden="true"
  />
);

/** Redis — three stacked data layers (no official SVG available). */
export const RedisIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#DC382D"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="4" rx="2" />
    <rect x="2" y="10" width="20" height="4" rx="2" />
    <rect x="2" y="16" width="20" height="4" rx="2" />
  </svg>
);
