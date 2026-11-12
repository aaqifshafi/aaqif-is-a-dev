import { Fragment } from "react";
import { GridColumn, GridDivider } from "@/components/grid-frame";
import { Signature } from "@/components/ui/signature";
import { ScrambleLink } from "@/components/scramble-link";
import { VisitorCount } from "@/components/visitor-count";
import { footer } from "@/lib/portfolio-data";

const inspirations = [
  { label: "ui.shadcn.com", href: "https://ui.shadcn.com" },
  { label: "chanhdai.com", href: "https://chanhdai.com" },
  { label: "vercel.com", href: "https://vercel.com" },
  { label: "ui.aceternity.com", href: "https://ui.aceternity.com" },
];

const underline =
  "relative transition-colors hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-snappy hover:after:scale-x-100";

export function SiteFooter() {
  return (
    <footer className="w-full">
      <GridDivider />

      {/* Inspired by */}
      <GridColumn className="overflow-hidden pt-8 pb-2">
        <div className="flex flex-wrap items-baseline gap-x-0 gap-y-0.5 font-technical text-[11px] leading-relaxed text-outline/50">
          <span className="mr-1">Inspired by</span>
          {inspirations.map((item, i) => (
            <Fragment key={item.href}>
              <ScrambleLink
                href={item.href}
                external
                className={`text-outline ${underline}`}
              >
                {item.label}
              </ScrambleLink>
              {i < inspirations.length - 1 && (
                <span className="mx-1.5 select-none text-outline-variant">/</span>
              )}
            </Fragment>
          ))}
        </div>
      </GridColumn>

      {/* Signature */}
      <GridColumn className="flex justify-center pb-6 pt-6">
        <Signature
          text="Aaqif Shafi"
          fontSize={11}
          inView
          className="my-3 cursor-default text-outline/60 transition-colors duration-500 hover:text-outline"
        />
      </GridColumn>

      {/* Bottom bar */}
      <GridColumn className="flex flex-col items-center justify-between gap-4 border-t border-t-border/40 py-5 font-technical text-[11px] text-outline sm:flex-row sm:items-center">
        <div className="flex flex-wrap justify-center gap-4">
          {footer.links.map((link) => (
            <ScrambleLink key={link.label} href={link.href} external className={underline}>
              {link.label}
            </ScrambleLink>
          ))}
          <ScrambleLink href="/llms.txt" external className={underline}>
            llms.txt
          </ScrambleLink>
        </div>
        <div className="flex items-center gap-3">
          <VisitorCount separator="trailing" />
          <span>{footer.version}</span>
        </div>
      </GridColumn>
    </footer>
  );
}
