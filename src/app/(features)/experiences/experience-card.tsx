import { cn } from "@/lib/utils";
import { TimelineEntry } from "./timeline-data";

type Variant = "current" | "role" | "milestone";

const DOT: Record<Variant, string> = {
  current:
    "border-neutral-900 bg-neutral-900 dark:border-neutral-100 dark:bg-neutral-100",
  role: "border-neutral-400 bg-neutral-400 dark:border-neutral-600 dark:bg-neutral-600",
  milestone:
    "border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950",
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
  const period = entry.endYear === null ? "Present" : String(entry.endYear);

  return (
    <li className={cn("relative pb-10 pl-8 last:pb-0", className)}>
      <span
        className={cn(
          "absolute left-0 top-1.75 h-2.75 w-2.75 rounded-full border-2",
          DOT[variant],
        )}
        aria-hidden
      />

      <div className="flex items-baseline justify-between gap-4 ">
        <h2
          className={cn(
            "font-medium",
            milestone
              ? "text-sm text-neutral-600 dark:text-neutral-400"
              : "text-base text-neutral-900 dark:text-neutral-100",
          )}
        >
          {entry.title}
        </h2>
        <span className="shrink-0 text-[13px] tabular-nums text-neutral-400 dark:text-neutral-500">
          {period}
        </span>
      </div>

      <p className="mt-0.5 text-[13px] text-neutral-500 dark:text-neutral-400">
        {entry.company}
        {entry.client && ` · ${entry.client.trim()}`}
        <span className="mx-1.5 text-neutral-300 dark:text-neutral-700">—</span>
        {entry.date}
      </p>

      <p
        className={cn(
          "mt-3 max-w-prose text-[13px] leading-relaxed",
          milestone
            ? "text-neutral-400 dark:text-neutral-500"
            : "text-neutral-600 dark:text-neutral-400",
        )}
      >
        {entry.description}
      </p>
    </li>
  );
}
