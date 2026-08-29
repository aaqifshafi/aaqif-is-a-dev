"use client";

import { CommandMenu } from "@/components/command-menu";
import { Reveal } from "@/components/reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { bootDelay } from "@/lib/motion";

/**
 * The ⌘K and theme controls, with their reveal and tooltips in one client module.
 *
 * This must stay a single client component. When a Server Component passes the
 * Radix `Tooltip` elements as children *through* the separate client `Reveal`
 * module, the two client chunks hydrate independently and React can reach the
 * reveal before the tooltip trigger is ready — it then finds the server-rendered
 * trigger unclaimed and throws a hydration mismatch. Keeping the motion wrapper
 * and the tooltips in the same module removes that race.
 */
export function NavActions() {
  return (
    <Reveal immediate delay={bootDelay.navActions} className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <CommandMenu />
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          <span className="font-technical text-[10px]">Search</span>
          <kbd data-slot="kbd" className="ml-1 font-technical text-[10px] opacity-70">⌘K</kbd>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <ThemeToggle />
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          <span className="font-technical text-[10px]">Toggle theme</span>
          <kbd data-slot="kbd" className="ml-1 font-technical text-[10px] opacity-70">T</kbd>
        </TooltipContent>
      </Tooltip>
    </Reveal>
  );
}
