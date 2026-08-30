"use client";

import { useState } from "react";
import { TIMELINE_DATA, type TimelineEntry } from "./timeline-data";
import { TimelineCard } from "./experience-card";

const MILESTONES = new Set([
  "Graduation",
  "Code Start",
  "First Freelance Project",
]);

const isMilestone = (e: TimelineEntry) => MILESTONES.has(e.title);

const COLLAPSED_COUNT = 4;

const variantOf = (entry: TimelineEntry) =>
  entry.endYear === null
    ? ("current" as const)
    : isMilestone(entry)
      ? ("milestone" as const)
      : ("role" as const);

export default function TimelineList() {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded
    ? TIMELINE_DATA
    : TIMELINE_DATA.slice(0, COLLAPSED_COUNT);
  const hidden = TIMELINE_DATA.length - COLLAPSED_COUNT;

  return (
    <div>
      <ol className="relative">
        <div
          className="absolute bottom-2 left-1.25 top-2 w-px bg-border"
          aria-hidden
        />
        {visible.map((entry) => (
          <TimelineCard
            key={`${entry.company}-${entry.date}`}
            entry={entry}
            variant={variantOf(entry)}
          />
        ))}
      </ol>

      {!expanded && hidden > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-2 pl-8 text-left text-[13px] text-text-secondary transition-colors hover:text-accent"
        >
          <span className="text-accent-muted">⋮</span>
          <span className="ml-3">
            {hidden} earlier entries —{" "}
            <span className="text-accent-muted">git log --all</span>
          </span>
        </button>
      )}

      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-4 pl-8 text-left text-[13px] text-text-secondary transition-colors hover:text-accent"
        >
          collapse — <span className="text-accent-muted">git log -n {COLLAPSED_COUNT}</span>
        </button>
      )}
    </div>
  );
}