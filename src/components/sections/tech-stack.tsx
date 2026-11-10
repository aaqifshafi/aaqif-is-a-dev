import { techIcons, type TechIcon } from "@/components/icons/tech-icons";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/sections/section-shell";
import { techStack } from "@/lib/portfolio-data";

type TechChipProps = { icon: TechIcon; name: string; url?: string };

function TechChip({ icon: Icon, name, url }: TechChipProps) {
  const className =
    "flex items-center gap-1.5 rounded-md border border-border bg-surface/60 px-2.5 py-1.5 font-technical text-xs text-on-surface-variant transition-colors hover:border-outline hover:text-primary";

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        <Icon className="size-4 shrink-0" aria-hidden />
        <span>{name}</span>
        <span className="sr-only">, opens in a new tab</span>
      </a>
    );
  }

  return (
    <span className={className}>
      <Icon className="size-4 shrink-0" aria-hidden />
      <span>{name}</span>
    </span>
  );
}

export function TechStack() {
  return (
    <SectionShell id="stack" kicker="tools" title="Tech Stack">
      <Reveal>
        <ul className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <li key={tech.name} className="flex">
              <TechChip icon={techIcons[tech.icon]} name={tech.name} url={tech.url} />
            </li>
          ))}
        </ul>
      </Reveal>
    </SectionShell>
  );
}
