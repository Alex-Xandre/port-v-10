import { cn } from "@/lib/utils";
import type { StackItem } from "@/app/(features)/stacks/stacks-data";

type Size = "md" | "sm";

interface StackTileProps {
  item: StackItem;
  size?: Size;
  dim?: boolean;
  showNote?: boolean;
  className?: string;
}

export function StackTile({
  item,
  size = "md",
  dim = false,
  showNote = true,
  className,
}: StackTileProps) {
  const { name, icon: Icon, note } = item;

  return (
    <div
      className={cn(
        "group flex flex-col items-center gap-2 rounded-xl border border-neutral-200 px-3 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-900",
        size === "md" ? "py-5" : "py-4",
        dim && "opacity-80 hover:opacity-100",
        className,
      )}
    >
      <Icon
        className={cn(
          "transition-colors",
          size === "md" ? "h-7 w-7" : "h-5 w-5",
          dim
            ? "text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-200"
            : "text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-100",
        )}
        aria-hidden
      />
      <span
        className={cn(
          size === "md"
            ? "text-[13px] font-medium text-neutral-900 dark:text-neutral-100"
            : "text-xs text-neutral-700 dark:text-neutral-300",
        )}
      >
        {name}
      </span>
      {showNote && note && size === "md" && (
        <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
          {note}
        </span>
      )}
    </div>
  );
}
