"use client"

import React, { use } from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrambleLink } from "@/components/scramble-link"
import type { Activity } from "@/components/contribution-graph"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph"

const linkClass =
  "relative font-technical text-[11px] text-outline transition-colors hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-snappy hover:after:scale-x-100"

export function GitHubContributions({
  contributions,
  githubProfileUrl,
  errorFallback,
  className,
}: {
  contributions: Promise<Activity[] | null>
  githubProfileUrl: string
  errorFallback?: React.ReactNode
  className?: string
}) {
  const data = use(contributions)

  if (data === null) {
    return <>{errorFallback ?? null}</>
  }

  return (
    <ContributionGraph
      className={cn("w-full", className)}
      data={data}
      blockSize={11}
      blockMargin={3}
      blockRadius={2}
      fontSize={10}
    >
      <ContributionGraphCalendar className="no-scrollbar w-full">
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <g>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                  className="cursor-default transition-opacity duration-150 hover:opacity-70"
                />
              </g>
            </TooltipTrigger>
            <TooltipContent
              className="font-technical text-[11px]"
              side="top"
            >
              {activity.count === 0
                ? `No contributions on ${format(new Date(activity.date), "MMM d, yyyy")}`
                : `${activity.count} contribution${activity.count > 1 ? "s" : ""} on ${format(new Date(activity.date), "MMM d, yyyy")}`}
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="mt-1 items-center">
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <span className="font-technical text-[11px] text-outline">
              {totalCount.toLocaleString("en")} contributions in {year} on{" "}
              <ScrambleLink
                href={githubProfileUrl}
                external
                className={linkClass}
              >
                GitHub
              </ScrambleLink>
            </span>
          )}
        </ContributionGraphTotalCount>

        <ContributionGraphLegend className="font-technical text-[11px] text-outline" />
      </ContributionGraphFooter>
    </ContributionGraph>
  )
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-[164px] w-full items-center justify-center">
      <Spinner className="text-outline" />
    </div>
  )
}

export function GitHubContributionsError() {
  return (
    <div className="flex h-[164px] w-full items-center justify-center">
      <span className="font-technical text-[11px] text-outline">
        Could not load contribution data.
      </span>
    </div>
  )
}
