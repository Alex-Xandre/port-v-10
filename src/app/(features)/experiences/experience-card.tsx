import { cn } from "@/lib/utils";
import { TimelineEntry } from "./timeline-data";

type Variant = "current" | "role" | "milestone";

const DOT: Record<Variant, string> = {
  current: "border-accent bg-accent [box-shadow:var(--glow-accent)]",
  role: "border-accent-muted bg-accent-muted",
  milestone: "border-border bg-background",
};

interface TimelineItemProps {
  entry: TimelineEntry;
  variant?: Variant;
  className?: string;
}

export function TimelineCard({
  entry,
  variant = "role",
  className,
}: TimelineItemProps) {
  const milestone = variant === "milestone";
  const current = variant === "current";
  const period = entry.endYear === null ? "HEAD" : String(entry.endYear);

  return (
    <li className={cn("relative pb-10 pl-8 last:pb-0", className)}>
      <span
        className={cn(
          "absolute left-0 top-1.75 h-2.75 w-2.75 rounded-full border-2",
          DOT[variant],
        )}
        aria-hidden
      />

      <div className="flex items-baseline justify-between gap-4">
        <h2
          className={cn(
            "font-medium",
            milestone ? "text-sm text-text-secondary" : "text-base text-text-primary",
          )}
        >
          {entry.title}
          {milestone && (
            <span className="ml-2 text-xs text-accent-muted">tag</span>
          )}
        </h2>
        <span
          className={cn(
            "shrink-0 text-[13px] tabular-nums",
            current ? "font-medium text-accent" : "text-text-secondary",
          )}
        >
          {period}
        </span>
      </div>

      <p className="mt-0.5 text-[13px] text-text-secondary">
        {entry.company}
        {entry.client && ` · ${entry.client.trim()}`}
        <span className="mx-1.5 text-accent-muted">—</span>
        {entry.date}
      </p>

      <p
        className={cn(
          "mt-3 max-w-prose font-sans text-[13px] leading-relaxed",
          milestone ? "text-text-secondary/80" : "text-text-secondary",
        )}
      >
        {entry.description}
      </p>
    </li>
  );
}