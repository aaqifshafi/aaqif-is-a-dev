import { unstable_cache } from "next/cache"

import type { Activity } from "@/components/contribution-graph"

type GitHubContributionDay = {
  contributionCount: number
  date: string
}

type GitHubGraphQLResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: Array<{
            contributionDays: GitHubContributionDay[]
          }>
        }
      }
    }
  }
  errors?: Array<{ message: string }>
}

function countToLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

export const getCachedContributions = unstable_cache(
  async (username: string): Promise<Activity[] | null> => {
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      console.error("[contributions] GITHUB_TOKEN env var is not set")
      return null
    }

    const from = new Date()
    from.setFullYear(from.getFullYear() - 1)

    const query = `query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }`

    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            username,
            from: from.toISOString(),
            to: new Date().toISOString(),
          },
        }),
      })

      if (!res.ok) {
        console.error(`[contributions] GitHub API responded with ${res.status}`)
        return null
      }

      const json = (await res.json()) as GitHubGraphQLResponse

      if (json.errors?.length) {
        console.error("[contributions] GitHub GraphQL errors:", json.errors)
        return null
      }

      const weeks =
        json.data.user.contributionsCollection.contributionCalendar.weeks

      return weeks.flatMap((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: countToLevel(day.contributionCount),
        }))
      )
    } catch (err) {
      console.error("[contributions] fetch failed:", err)
      return null
    }
  },
  ["github-contributions"],
  { revalidate: 86400 }
)
