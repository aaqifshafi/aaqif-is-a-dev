"use client";

import { getCalApi } from "@calcom/embed-react";
import {
  IconArrowUpRight,
  IconBook,
  IconBrandGithub,
  IconCalendarEvent,
  IconCheck,
  IconCopy,
  IconCpu,
  IconFileText,
  IconHome,
  IconMail,
  IconMoon,
  IconRosetteDiscountCheck,
  IconSearch,
  IconStack2,
  IconSun,
  IconTimeline,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { type ComponentType, useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { workIcons } from "@/components/icons/work-icons";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  certifications,
  profile,
  socialLinks,
  work,
} from "@/lib/portfolio-data";
import { setThemeWithTransition } from "@/lib/theme";
import { cn } from "@/lib/utils";

type IconType = ComponentType<{ className?: string }>;

type Section = { id: string; label: string; icon: IconType; keywords?: string[] };

/** Homepage sections, in page order. `id` matches each SectionShell's id. */
const sections: Section[] = [
  { id: "stack", label: "Tech Stack", icon: IconCpu, keywords: ["tools", "skills"] },
  { id: "contributions", label: "Contributions", icon: IconTimeline, keywords: ["github", "activity", "commits"] },
  { id: "work", label: "Work", icon: IconStack2, keywords: ["experience", "projects", "jobs"] },
  { id: "certifications", label: "Certifications", icon: IconRosetteDiscountCheck, keywords: ["credentials", "courses"] },
  { id: "contact", label: "Contact", icon: IconMail, keywords: ["get in touch", "message", "hire"] },
];

const projects = work.filter((project) => !project.hidden);

/** Radix returns focus to the trigger after the dialog closes (on a 0ms timer); wait past that. */
const AFTER_CLOSE_MS = 50;

const iconClass = "size-4 shrink-0 text-outline";

// The platform never changes after load, so there's nothing to subscribe to.
const noopSubscribe = () => () => {};
/** ⌘ on Apple devices, Ctrl elsewhere. Server render assumes ⌘ (the common case here). */
function useIsMac() {
  return useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.userAgent),
    () => true,
  );
}

function openExternal(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

/**
 * Trailing "opens in a new tab" arrow. Wrapped in CommandShortcut so it takes
 * the item's right edge: CommandItem renders its own hidden `ml-auto` check
 * icon, and two auto margins would split the space and strand the arrow mid-row.
 */
function NewTabHint() {
  return (
    <CommandShortcut className="flex items-center tracking-normal">
      <IconArrowUpRight aria-hidden className="size-3.5 text-outline" />
      <span className="sr-only">, opens in a new tab</span>
    </CommandShortcut>
  );
}

export type CommandMenuProps = { className?: string };

/**
 * ⌘K / Ctrl+K palette: every section, project, case study, certificate,
 * link and action on the site, searchable by name and keywords. It opens and
 * closes instantly — it's a keyboard tool used repeatedly, so it doesn't animate.
 */
export function CommandMenu({ className }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isMac = useIsMac();
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  /**
   * Jump to a homepage section. On the homepage it scrolls (smoothly, unless
   * reduced motion is on — handled in globals.css) and moves focus into the
   * section so keyboard and screen-reader users land there too. From any other
   * page it navigates home with the hash.
   */
  const goToSection = useCallback(
    (id: string) => {
      close();
      if (pathname !== "/") {
        router.push(id === "top" ? "/" : `/#${id}`);
        return;
      }
      if (id === "top") {
        window.scrollTo({ top: 0 });
        history.replaceState(null, "", "/");
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ block: "start" });
      history.replaceState(null, "", `#${id}`);
      window.setTimeout(() => target.focus({ preventScroll: true }), AFTER_CLOSE_MS);
    },
    [close, pathname, router],
  );

  // Popups must open synchronously inside the select event, or browsers block them.
  const goExternal = useCallback(
    (href: string) => {
      close();
      openExternal(href);
    },
    [close],
  );

  const goInternal = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      // Leave the menu open briefly so the confirmation is seen (and announced).
      window.setTimeout(() => {
        setOpen(false);
        setCopied(false);
      }, 900);
    } catch {
      // Clipboard blocked: fall back to the mail client.
      goExternal(`mailto:${profile.email}`);
    }
  }, [goExternal]);

  const bookCall = useCallback(async () => {
    close();
    const cal = await getCalApi({ namespace: "book-call" });
    cal("modal", { calLink: profile.calLink, config: { layout: "month_view" } });
  }, [close]);

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        className={cn(
          "group flex cursor-pointer items-center gap-2 border border-outline-variant bg-surface p-2.5 text-outline transition-[color,border-color,transform] duration-150 ease-snappy hover:border-outline hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97] md:px-3 md:py-1.5",
          className,
        )}
      >
        <IconSearch aria-hidden className="size-4" />
        <span aria-hidden className="hidden font-technical text-[10px] md:inline">
          Search...
        </span>
        <span aria-hidden className="ml-4 hidden items-center gap-0.5 md:flex">
          <kbd className="border border-outline-variant bg-surface-container px-1 font-technical text-[10px] text-on-surface-variant">
            {isMac ? "⌘" : "Ctrl"}
          </kbd>
          <kbd className="border border-outline-variant bg-surface-container px-1 font-technical text-[10px] text-on-surface-variant">
            K
          </kbd>
        </span>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Search sections, projects, case studies, certificates and links. Use the arrow keys to move and Enter to select."
        className="data-open:animate-none data-closed:animate-none"
      >
        <Command>
          <CommandInput placeholder="Search projects, sections, links…" aria-label="Search" />
          <CommandList>
            <CommandEmpty>Nothing matches that. Try a project, a section, or a certificate.</CommandEmpty>

            <CommandGroup heading="Sections">
              <CommandItem value="Home" keywords={["top", "start", "about"]} onSelect={() => goToSection("top")}>
                <IconHome aria-hidden className={iconClass} />
                Home
              </CommandItem>
              {sections.map((section) => (
                <CommandItem
                  key={section.id}
                  value={section.label}
                  keywords={section.keywords}
                  onSelect={() => goToSection(section.id)}
                >
                  <section.icon aria-hidden className={iconClass} />
                  {section.label}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Projects">
              {projects.map((project) => {
                const Icon = workIcons[project.icon];
                const href = project.liveUrl ?? `/work/${project.slug}`;
                return (
                  <CommandItem
                    key={project.slug}
                    value={project.company}
                    keywords={[project.role, project.liveLabel ?? "", ...project.tags]}
                    onSelect={() =>
                      project.liveUrl ? goExternal(href) : goInternal(href)
                    }
                  >
                    <Icon aria-hidden className={iconClass} />
                    <span className="truncate">{project.company}</span>
                    <span className="truncate font-technical text-[11px] text-outline">
                      {project.liveLabel ?? project.role}
                    </span>
                    {project.liveUrl && <NewTabHint />}
                  </CommandItem>
                );
              })}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Case studies">
              {projects.map((project) => {
                const Icon = workIcons[project.icon];
                return (
                  <CommandItem
                    key={project.slug}
                    value={`${project.company} case study`}
                    keywords={["case study", project.role, ...project.tags]}
                    onSelect={() => goInternal(`/work/${project.slug}`)}
                  >
                    <Icon aria-hidden className={iconClass} />
                    <span className="truncate">{project.company}</span>
                    <span className="font-technical text-[11px] text-outline">case study</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem value="Copy email" keywords={[profile.email, "mail", "contact"]} onSelect={copyEmail}>
                {copied ? (
                  <IconCheck aria-hidden className="size-4 shrink-0 text-emerald-500" />
                ) : (
                  <IconCopy aria-hidden className={iconClass} />
                )}
                {copied ? "Email copied" : "Copy email"}
                <CommandShortcut className="truncate font-technical text-[11px] tracking-normal text-outline">
                  {profile.email}
                </CommandShortcut>
              </CommandItem>
              <CommandItem value="Book a call" keywords={["schedule", "meeting", "cal", "chat"]} onSelect={bookCall}>
                <IconCalendarEvent aria-hidden className={iconClass} />
                Book a call
              </CommandItem>
              <CommandItem
                value={`Switch to ${nextTheme} theme`}
                keywords={["theme", "dark", "light", "mode", "appearance"]}
                onSelect={() => {
                  close();
                  setThemeWithTransition(setTheme, nextTheme);
                }}
              >
                {nextTheme === "light" ? (
                  <IconSun aria-hidden className={iconClass} />
                ) : (
                  <IconMoon aria-hidden className={iconClass} />
                )}
                {`Switch to ${nextTheme} theme`}
                <CommandShortcut aria-hidden className="font-technical text-[10px] text-outline">
                  <kbd>T</kbd>
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Pages & links">
              <CommandItem value="Blog" keywords={["writing", "posts", "articles"]} onSelect={() => goInternal("/blog")}>
                <IconBook aria-hidden className={iconClass} />
                Blog
              </CommandItem>
              {socialLinks
                .filter((link) => !link.booking)
                .map((link) => (
                  <CommandItem key={link.label} value={`${link.label} profile`} keywords={["social", link.label]} onSelect={() => goExternal(link.href)}>
                    {link.label === "GitHub" ? (
                      <IconBrandGithub aria-hidden className={iconClass} />
                    ) : (
                      <IconArrowUpRight aria-hidden className={iconClass} />
                    )}
                    {link.label}
                    <NewTabHint />
                  </CommandItem>
                ))}
              <CommandItem value="llms.txt" keywords={["ai", "llm", "summary"]} onSelect={() => goExternal("/llms.txt")}>
                <IconFileText aria-hidden className={iconClass} />
                llms.txt
                <NewTabHint />
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Certifications">
              {certifications.map((cert) => (
                <CommandItem
                  key={cert.index}
                  value={cert.title}
                  keywords={[cert.issuer, cert.year, "certificate", "certification"]}
                  onSelect={() => (cert.href ? goExternal(cert.href) : goToSection("certifications"))}
                >
                  <IconRosetteDiscountCheck aria-hidden className={iconClass} />
                  <span className="truncate">{cert.title}</span>
                  <span className="shrink-0 font-technical text-[11px] text-outline">{cert.issuer}</span>
                  {cert.href && <NewTabHint />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <p role="status" aria-live="polite" className="sr-only">
            {copied ? `Email address ${profile.email} copied` : ""}
          </p>
        </Command>
      </CommandDialog>
    </>
  );
}
