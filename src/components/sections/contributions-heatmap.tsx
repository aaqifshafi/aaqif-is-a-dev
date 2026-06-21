import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
  GitHubContributionsError,
} from "@/components/github-contributions";
import { SectionShell } from "@/components/sections/section-shell";
import { getCachedContributions } from "@/lib/get-cached-contributions";

const GITHUB_USERNAME = "aaqifshafi";

export function ContributionsHeatmap() {
  const contributions = getCachedContributions(GITHUB_USERNAME);

  return (
    <SectionShell id="contributions" kicker="activity" title="Contributions">
      <div className="overflow-x-auto rounded-xl border border-border bg-surface/40 p-5 sm:p-6">
        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions
            contributions={contributions}
            githubProfileUrl={`https://github.com/${GITHUB_USERNAME}`}
            errorFallback={<GitHubContributionsError />}
          />
        </Suspense>
      </div>
    </SectionShell>
  );
}
