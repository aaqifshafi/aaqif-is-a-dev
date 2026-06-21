type IconProps = { className?: string };

/** Designfolio mark — starburst glyph (inline SVG so it inherits currentColor). */
export const DesignfolioIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 124.5 124.5"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M67.437 15.5625H57.062V49.7263L32.9046 25.5688L25.5683 32.9051L49.7258 57.0625H15.562V67.4375H49.7258L25.5684 91.5949L32.9046 98.9311L57.062 74.7737V108.937H67.437V74.7737L91.5944 98.9312L98.9307 91.5949L74.7732 67.4375H108.937V57.0625H74.7732L98.9307 32.9051L91.5944 25.5688L67.437 49.7263V15.5625Z"
      fill="currentColor"
    />
  </svg>
);

/** Gistr wordmark glyph (inline SVG so it inherits currentColor). */
export const GistrIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 20" fill="none" aria-hidden="true" className={className}>
    <g fill="currentColor">
      <path d="M12.994.476l-.31 4.449c0 .107-.06.214-.134.291l-2.027 1.948a.409.409 0 01-.68-.184c-.37-1.196-1.361-3.574-3.506-3.574-2.146 0-4.04 2.101-2.856 5.292 1.021 2.746 4.069 1.534 5.104 1.059 2.412-1.09 5.282-4.633 6.614-6.397.577-1.028.577-1.028.68-1.12.148 0 .119.36.119.399l-.06 4.817a.497.497 0 01-.118.307c-.784.828-5.282 5.43-8.255 6.013-2.412.476-6.333-.629-7.353-5.292C-.81 3.82 2.09 1.334 4.088.644 5.198.261 7.964.537 9 .814c1.035.275.503-.124.517-.4 0-.23.193-.414.415-.414h2.633c.237 0 .43.215.414.46l.015.016z" />
      <path d="M.817 14.19H3.51c.118 0 .222.062.281.169.31.537 1.258 1.933 2.767 2.163 1.215.185 2.507-.537 3.27-1.488.59-.736.636-.936.62-1.197-.002-.042-.073-.306.075-.383l2.367-1.703a.333.333 0 01.518.23c.222 1.672.4 6.689-5.193 7.931H8.2c-.281.046-6.687 1.074-7.693-5.308-.03-.214.118-.398.325-.398l-.015-.016z" />
    </g>
  </svg>
);

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
