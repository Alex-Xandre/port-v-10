import { cn } from "@/lib/utils";

export function DottedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-background">
      {/* dot grid */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] bg-size-[20px_20px]",
          "dark:bg-[radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div className="absolute inset-0 bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
}
