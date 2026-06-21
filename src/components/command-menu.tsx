"use client";

import {
  IconArrowUpRight,
  IconBook,
  IconCpu,
  IconFileText,
  IconFolderCode,
  IconMoon,
  IconRosetteDiscountCheck,
  IconSearch,
  IconStack2,
  IconSun,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { socialLinks } from "@/lib/portfolio-data";
import { setThemeWithTransition } from "@/lib/theme";
import { cn } from "@/lib/utils";

const sections = [
  { id: "stack", label: "Tech Stack", icon: IconCpu },
  { id: "projects", label: "Projects", icon: IconFolderCode },
  { id: "certifications", label: "Certifications", icon: IconRosetteDiscountCheck },
] as const;

export type CommandMenuProps = { className?: string };

export function CommandMenu({ className }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const runCommand = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className={cn(
          "group hidden items-center gap-2 border border-outline-variant bg-surface px-3 py-1.5 text-outline transition-colors hover:border-outline md:flex",
          className,
        )}
      >
        <IconSearch className="size-4" />
        <span className="font-technical text-[10px]">Search...</span>
        <span className="ml-4 flex items-center gap-0.5">
          <kbd className="border border-outline-variant bg-surface-container px-1 font-technical text-[10px] text-on-surface-variant">
            ⌘
          </kbd>
          <kbd className="border border-outline-variant bg-surface-container px-1 font-technical text-[10px] text-on-surface-variant">
            K
          </kbd>
        </span>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command Menu"
        description="Jump to a section, page, or link."
      >
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
            {sections.map((section) => (
              <CommandItem
                key={section.id}
                value={section.label}
                onSelect={() => runCommand(() => scrollToSection(section.id))}
              >
                <section.icon className="size-4 text-outline" />
                {section.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Pages">
            <CommandItem value="Work" onSelect={() => runCommand(() => router.push("/work"))}>
              <IconStack2 className="size-4 text-outline" />
              Work
            </CommandItem>
            <CommandItem value="Blog" onSelect={() => runCommand(() => router.push("/blog"))}>
              <IconBook className="size-4 text-outline" />
              Blog
            </CommandItem>
            <CommandItem
              value="llms.txt"
              onSelect={() =>
                runCommand(() => window.open("/llms.txt", "_blank", "noopener,noreferrer"))
              }
            >
              <IconFileText className="size-4 text-outline" />
              llms.txt
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Links">
            {socialLinks.map((link) => (
              <CommandItem
                key={link.label}
                value={link.label}
                onSelect={() =>
                  runCommand(() => {
                    if (link.href.startsWith("http")) {
                      window.open(link.href, "_blank", "noopener,noreferrer");
                    }
                  })
                }
              >
                <IconArrowUpRight className="size-4 text-outline" />
                {link.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem
              value="Toggle theme"
              onSelect={() =>
                runCommand(() =>
                  setThemeWithTransition(setTheme, resolvedTheme === "dark" ? "light" : "dark"),
                )
              }
            >
              {resolvedTheme === "dark" ? (
                <IconSun className="size-4 text-outline" />
              ) : (
                <IconMoon className="size-4 text-outline" />
              )}
              Toggle theme
            </CommandItem>
          </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
