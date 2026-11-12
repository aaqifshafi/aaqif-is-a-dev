import { IconArrowUpRight } from "@tabler/icons-react";

import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/sections/section-shell";
import { certifications } from "@/lib/portfolio-data";
import type { Certification } from "@/types/portfolio";
import { hoverSound, sound } from "@/lib/sound";

type CertRowProps = { cert: Certification };

function CertRow({ cert }: CertRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-baseline gap-2 min-w-0">
        <span aria-hidden className="font-technical text-[11px] text-outline shrink-0">{cert.index}</span>
        <div className="min-w-0">
          <p className="font-technical text-xs text-primary truncate">{cert.title}</p>
          <p className="font-technical text-[11px] text-outline">{cert.issuer}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-technical text-[11px] text-outline">{cert.year}</span>
        {cert.href && (
          <>
            <IconArrowUpRight
              aria-hidden
              className="size-3 text-outline opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <span className="sr-only">, opens in a new tab</span>
          </>
        )}
      </div>
    </div>
  );
}

export function Certifications() {
  return (
    <SectionShell id="certifications" kicker="credentials" title="Certifications">
      <Reveal>
        <ul className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface/40 overflow-hidden">
          {certifications.map((cert) => {
            if (cert.href) {
              return (
                <li key={cert.index}>
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...sound("tap")}
                    {...hoverSound}
                    className="group block transition-colors hover:bg-surface/60 focus-visible:bg-surface/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                  >
                    <CertRow cert={cert} />
                  </a>
                </li>
              );
            }

            return (
              <li key={cert.index}>
                <CertRow cert={cert} />
              </li>
            );
          })}
        </ul>
      </Reveal>
    </SectionShell>
  );
}
