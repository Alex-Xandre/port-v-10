import { ArrowRight } from "lucide-react";
import {
  TIMELINE_DATA,
  type TimelineEntry,
} from "../experiences/timeline-data";
import StatusCard from "./status-card";

const isRole = (e: TimelineEntry) =>
  !["Graduation", "Code Start"].includes(e.title);

const current = TIMELINE_DATA.find((e) => e.endYear === null);
const previous = TIMELINE_DATA.filter(
  (e) => e.endYear !== null && isRole(e),
).slice(0, 2);

export default function CurrentlyCard({
  href = "/experiences",
}: {
  href?: string;
}) {
  if (!current) return null;

  return (
    <div className="w-full max-w-md space-y-5">
      <StatusCard />
      <div className=" rounded-xl border border-neutral-200 p-6 dark:border-neutral-800 bg-background ">
        <div className="mb-5 flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
          </span>
          <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
            Currently
          </span>
        </div>

        <div className="mb-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
              {current.title}
            </h3>
            <span className="shrink-0 rounded border border-neutral-200 px-2 py-0.5 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              Present
            </span>
          </div>
          <p className="mt-0.5 text-[13px] text-neutral-500 dark:text-neutral-400">
            {current.company}
            {current.client && ` · ${current.client}`}
          </p>
          <p className="mt-2.5 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            {current.description}
          </p>
        </div>

        <ul className="space-y-1 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          {previous.map((role) => (
            <li
              key={`${role.company}-${role.date}`}
              className="flex items-baseline justify-between gap-4"
            >
              <span className="truncate text-sm text-neutral-900 dark:text-neutral-100">
                {role.title}
                <span className="text-neutral-500 dark:text-neutral-400">
                  {" · "}
                  {role.company}
                </span>
              </span>
              <span className="shrink-0 text-[13px] tabular-nums text-neutral-400 dark:text-neutral-500">
                {role.endYear}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <a
            href={href}
            className="group inline-flex items-center gap-1.5 text-[13px] text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Full experience
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </div>
  );
}
