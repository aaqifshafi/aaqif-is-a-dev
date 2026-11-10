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

/** Tapaway logomark (from the tapaway web repo; inline SVG so it inherits currentColor). */
export const TapawayIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 721 715" fill="none" aria-hidden="true" className={className}>
    <g fill="currentColor">
      <path d="M373.533 0C413.193 1.13669 454.598 -0.189815 494.52 0.319029C484.6 31.4242 472.248 65.3043 462.036 96.454C410.55 253.49 391.33 371.85 435.45 533.933C445.509 570.808 456.576 607.398 468.657 643.66C476.161 666.043 486.344 692.792 492.856 714.701L371.453 714.679C369.526 707.415 365.693 696.982 363.219 689.47L345.809 636.622C332.246 594.542 319.654 552.153 308.042 509.491C294.868 526.047 279.681 548.456 267.268 565.856L173.324 698.881C143.059 675.41 113.125 649.997 83.0375 626.109C93.947 611.136 105.055 594.549 115.758 579.24L229.215 417.391C204.008 416.451 174.779 417.104 149.4 417.1L0 417.107L0.0430396 297.342C76.4968 296.819 153.578 298.153 229.898 297.172C181.8 230.181 133.182 163.564 84.0492 97.3272C113.625 72.642 142.618 47.0786 172.372 22.5023C184.252 37.3215 196.436 55.2026 208.017 70.4811C241.637 114.833 273.964 162.053 308.098 205.852C329.426 137.082 351.238 68.4632 373.533 0Z" />
      <path d="M596.652 0.162851L674.446 0.191324C689.301 0.167232 705.557 -0.18246 720.318 0.421291C714.514 15.7319 707.901 31.0147 702.039 46.4399C686.293 86.8926 672.65 128.13 661.145 169.988C606.55 370.261 646.911 521.986 718.485 710.138C719.157 711.861 719.537 712.533 719.61 714.416C708.718 715.314 688.571 714.752 676.862 714.752L595.652 714.694C578.285 665.342 561.897 620.765 548.342 569.569C510.258 431.243 510.12 285.215 547.94 146.817C561.78 94.7246 577.869 50.3165 596.652 0.162851Z" />
    </g>
  </svg>
);

/** People of Bengaluru mark (from the repo's app icon; slanted tile with two cut slots, currentColor). */
export const PeopleOfBengaluruIcon = ({ className }: IconProps) => (
  <svg viewBox="12 10 40 44" fill="none" aria-hidden="true" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 52 L22 12 H50 L42 52 Z M26 22 H40 L38.5 30 H24.5 Z M23.5 35 H37.5 L36 43 H22 Z"
      fill="currentColor"
    />
  </svg>
);

export const ClaudeIcon = ({ className }: IconProps) => (
  <img
    src="/assets/brandlogos/claude.svg"
    className={className}
    alt=""
    aria-hidden="true"
  />
);

export const CursorIcon = ({ className }: IconProps) => (
  <img
    src="/assets/brandlogos/cursor.svg"
    className={className}
    alt=""
    aria-hidden="true"
  />
);

export const BunIcon = ({ className }: IconProps) => (
  <img
    src="/assets/brandlogos/bun.svg"
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
