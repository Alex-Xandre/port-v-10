import { Container } from "@/components/container";

import { TIMELINE_DATA, type TimelineEntry } from "./timeline-data";
import { TimelineCard } from "./experience-card";
import Title from "@/components/title";
import Highlights from "./experience-description";
import { Globe } from "../hero/world-map";

const MILESTONES = new Set([
  "Graduation",
  "Code Start",
  "First Freelance Project",
]);

const isMilestone = (e: TimelineEntry) => MILESTONES.has(e.title);

export default function ExperiencePage() {
  return (
    <Container className="items-start overflow-hidden min-h-[calc(100dvh-100px)]">
      <div className="grid h-full w-full gap-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="flex min-h-0 flex-col">
          <header className="mb-8 shrink-0">
            <Title title="Experience" />
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Eight years from first line of code to senior full-stack work,
              across teams in Belgium, Germany, Canada, and the US.
            </p>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto pr-4 scrollbar-thin bg-background pb-20">
            <ol className="relative">
              <div
                className="absolute bottom-2 left-1.25 top-2 w-px bg-neutral-200 dark:bg-neutral-800"
                aria-hidden
              />

              {TIMELINE_DATA.map((entry) => (
                <TimelineCard
                  key={`${entry.company}-${entry.date}`}
                  entry={entry}
                  variant={
                    entry.endYear === null
                      ? "current"
                      : isMilestone(entry)
                        ? "milestone"
                        : "role"
                  }
                />
              ))}
            </ol>
          </div>
        </div>
        <div className="block">
          <div className="hidden lg:block">
            <Globe />
          </div>
          <div className="lg:mt-20 flex flex-col items-center gap-10">
            <Highlights />
            <div className="w-full max-w-md pb-10">
              <div className="w-full max-w-md">
                <p className="mb-4 text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  How I work
                </p>
                <ol className="relative">
                  <div
                    className="absolute bottom-3 left-2.75 top-3 w-px bg-neutral-200 dark:bg-neutral-800"
                    aria-hidden
                  />
                  {[
                    [
                      "Discover",
                      "What's actually broken, who feels it, and what it's costing.",
                    ],
                    [
                      "Gather",
                      "Requirements, existing data, access, constraints — everything on the table.",
                    ],
                    [
                      "Scope & design",
                      "What we're building, what done looks like, and rough shape of the UI. In writing.",
                    ],
                    [
                      "Build & ship weekly",
                      "Working software every week, feedback folded in as we go.",
                    ],
                    [
                      "Deploy & polish",
                      "Production launch, then a review pass — performance, edge cases, rough corners.",
                    ],
                    [
                      "Handover",
                      "Docs, a walkthrough, and 30 days of post-launch fixes.",
                    ],
                  ].map(([step, desc], i) => (
                    <li
                      key={step}
                      className="relative flex gap-4 pb-6 last:pb-0"
                    >
                      <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-[11px] tabular-nums text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
                        {i + 1}
                      </span>
                      <span className="text-[13px] leading-relaxed">
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                          {step}.
                        </span>{" "}
                        <span className="text-neutral-500 dark:text-neutral-400">
                          {desc}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
