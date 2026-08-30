import { Container } from "@/components/container";

import { TIMELINE_DATA, type TimelineEntry } from "./timeline-data";
import { TimelineCard } from "./experience-card";
import Highlights from "./experience-description";
import TimelineList from "./timeline-list";

const MILESTONES = new Set([
  "Graduation",
  "Code Start",
  "First Freelance Project",
]);

const isMilestone = (e: TimelineEntry) => MILESTONES.has(e.title);

const WORKFLOW: [string, string][] = [
  ["discover", "What's actually broken, who feels it, and what it's costing."],
  [
    "gather",
    "Requirements, existing data, access, constraints — everything on the table.",
  ],
  [
    "scope & design",
    "What we're building, what done looks like, and rough shape of the UI. In writing.",
  ],
  [
    "build & ship weekly",
    "Working software every week, feedback folded in as we go.",
  ],
  [
    "deploy & polish",
    "Production launch, then a review pass — performance, edge cases, rough corners.",
  ],
  ["handover", "Docs, a walkthrough, and 30 days of post-launch fixes."],
];

export default function ExperiencePage() {
  return (
    <Container
      className="overflow-hidden min-h-[calc(100dvh-100px)] pt-12 md:pt-16 "
      animate={false}
    >
      <div className="grid h-full w-full gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="flex min-h-0 flex-col">
          <header className="mb-8 shrink-0">
            <p className="text-sm text-accent-muted">
              xandre@sh:~ ${" "}
              <span className="text-accent">git log --career</span>
            </p>
            <p className="mt-1.5 max-w-md text-xs leading-relaxed text-text-secondary">
              Eight years from first line of code to senior full-stack work,
              across teams in Belgium, Germany, Canada, and the US
            </p>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto pr-4 scrollbar-thin bg-background">
            <TimelineList />
          </div>
        </div>

        <div className="block">
          <div className="flex flex-col items-center gap-10 ">
            <Highlights />
            <div className="w-full max-w-md pb-10">
              <p className="mb-4 text-xs text-accent-muted"># how i work</p>
              <ol className="relative">
                <div
                  className="absolute bottom-3 left-2.75 top-3 w-px bg-border"
                  aria-hidden
                />
                {WORKFLOW.map(([step, desc], i) => (
                  <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                    <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center border border-border bg-background text-[11px] tabular-nums text-accent-muted">
                      {i + 1}
                    </span>
                    <span className="font-sans text-[13px] leading-relaxed">
                      <span className="font-mono font-medium text-text-primary">
                        {step}.
                      </span>{" "}
                      <span className="text-text-secondary">{desc}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
