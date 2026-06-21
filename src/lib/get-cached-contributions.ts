import { unstable_cache } from "next/cache"

import type { Activity } from "@/components/contribution-graph"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

export const getCachedContributions = unstable_cache(
  async (username: string) => {
    try {
      const res = await fetch(
        `${process.env.GITHUB_CONTRIBUTIONS_API_URL || `https://github-contributions-api.jogruber.de`}/v4/${username}?y=last`
      )
      const data = (await res.json()) as GitHubContributionsResponse
      return data.contributions
    } catch {
      return [] as Activity[]
    }
  },
  ["github-contributions"],
  { revalidate: 86400 }
)
