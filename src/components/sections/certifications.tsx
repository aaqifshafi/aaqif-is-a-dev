import { IconArrowUpRight } from "@tabler/icons-react";

import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/sections/section-shell";
import { certifications } from "@/lib/portfolio-data";
import type { Certification } from "@/types/portfolio";

type CertRowProps = { cert: Certification };

function CertRow({ cert }: CertRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-baseline gap-2 min-w-0">
        <span className="font-technical text-[11px] text-outline shrink-0">{cert.index}</span>
        <div className="min-w-0">
          <p className="font-technical text-xs text-primary truncate">{cert.title}</p>
          <p className="font-technical text-[11px] text-outline">{cert.issuer}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-technical text-[11px] text-outline">{cert.year}</span>
        {cert.href && (
          <IconArrowUpRight className="size-3 text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </div>
  );
}

export function Certifications() {
  return (
    <SectionShell id="certifications" kicker="credentials" title="Certifications">
      <Reveal>
        <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface/40 overflow-hidden">
          {certifications.map((cert) => {
            if (cert.href) {
              return (
                <a
                  key={cert.index}
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:bg-surface/60 transition-colors"
                >
                  <CertRow cert={cert} />
                </a>
              );
            }

            return (
              <div key={cert.index}>
                <CertRow cert={cert} />
              </div>
            );
          })}
        </div>
      </Reveal>
    </SectionShell>
  );
}
