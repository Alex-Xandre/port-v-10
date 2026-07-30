import { Hammer, MapPin, FileText } from "lucide-react";
import { heroMeta } from "./meta";

const rows = [
  { icon: Hammer, label: "Building", value: heroMeta.building },
  { icon: MapPin, label: "Based in", value: heroMeta.location },
  {
    icon: FileText,
    label: "Latest post",
    value: "",
    href: "#",
  },
];

export default function StatusCard() {
  return (
    <div className="w-full  bg-background rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
      <div className="mb-5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
        <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
          {heroMeta.availability}
        </span>
      </div>

      <dl className="space-y-2.5">
        {rows.map(({ icon: Icon, label, value, href }) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-4"
          >
            <dt className="flex items-center gap-2 text-[13px] text-neutral-500 dark:text-neutral-400">
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {label}
            </dt>
            <dd className="truncate text-right text-[13px] text-neutral-900 dark:text-neutral-100">
              {href ? (
                <a href={href} className="hover:underline">
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
