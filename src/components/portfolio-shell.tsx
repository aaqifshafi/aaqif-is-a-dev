import { ProfileHeader } from "@/components/profile-header";
import { Workspace } from "@/components/workspace";

/** The centered single-column page: intro header + stacked sections. */
export function PortfolioShell() {
  return (
    <main className="mx-auto w-full max-w-2xl grow px-5 sm:px-6">
      <ProfileHeader />
      <Workspace />
    </main>
  );
}
