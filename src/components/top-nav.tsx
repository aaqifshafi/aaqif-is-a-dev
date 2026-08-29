import Link from "next/link";
import { GridColumn } from "@/components/grid-frame";
import { NavActions } from "@/components/nav-actions";
import { Reveal } from "@/components/reveal";
import { ScrambleLink } from "@/components/scramble-link";
import { bootDelay } from "@/lib/motion";
import { navLinks } from "@/lib/portfolio-data";

const underline =
  "relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-snappy hover:after:scale-x-100";

/** Slim sticky header: pixel wordmark + in-page nav, ⌘K and theme toggle. */
export function TopNav() {
  return (
    <nav className="sticky top-0 z-[60] w-full border-b border-border/60 bg-background/70 backdrop-blur-md">
      <GridColumn className="flex items-center justify-between py-3">
        <Reveal immediate delay={bootDelay.nav} className="flex items-center gap-5">
          <Link
            href="/"
            className="font-pixel text-base text-primary transition-opacity hover:opacity-70"
          >
            AQ
          </Link>
          <div className="hidden items-center gap-5 sm:flex">
            {navLinks.map((link) => (
              <ScrambleLink
                key={link.label}
                href={link.href}
                className={`font-technical text-[11px] text-on-surface-variant transition-colors hover:text-primary ${underline}`}
              >
                {link.label}
              </ScrambleLink>
            ))}
          </div>
        </Reveal>
        <NavActions />
      </GridColumn>
    </nav>
  );
}
