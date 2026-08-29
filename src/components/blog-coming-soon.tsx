import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

import { GridColumn } from "@/components/grid-frame";

export function BlogComingSoon() {
  return (
    <main className="flex w-full grow flex-col">
      <GridColumn className="flex grow items-center justify-center py-24">
        <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex items-center gap-2 border-b border-border bg-surface-container-low px-4 py-2.5">
            <span className="flex gap-1.5">
              <span className="size-2 rounded-full bg-outline/60" />
              <span className="size-2 rounded-full bg-outline/40" />
              <span className="size-2 rounded-full bg-outline/30" />
            </span>
            <span className="ml-1 font-technical text-[10px] text-outline">
              ~/blog
            </span>
          </div>
          <div className="space-y-4 p-6 font-technical text-[11px] leading-relaxed text-on-surface-variant sm:p-8">
            <p>
              <span className="text-outline">$</span> cat status.md
            </p>
            <p className="text-base text-primary">Blog: coming soon.No ETA</p>
            <p>Might write about software. Might just keep building it.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-on-surface transition-colors hover:text-primary"
            >
              cd ~ <IconArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </GridColumn>
    </main>
  );
}
