import { ProfileHeader } from "@/components/profile-header";
import { Workspace } from "@/components/workspace";

/** The framed single-column page: intro header + stacked sections. */
export function PortfolioShell() {
  return (
    <main className="flex w-full grow flex-col">
      <ProfileHeader />
      <Workspace className="grow" />
    </main>
  );
}
