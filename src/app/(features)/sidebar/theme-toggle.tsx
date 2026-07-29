"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
] as const;

const emptySubscribe = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();

  if (!hydrated) return <div className="h-8" />;

  return (
    <div className="flex w-fit gap-1 rounded-full border border-border/10 p-1">
      {OPTIONS.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={`${value} theme`}
          aria-pressed={theme === value}
          className={cn(
            "cursor-pointer rounded-full p-1 transition-colors",
            theme === value
              ? "text-text-primary"
              : "text-text-primary/40 hover:text-text-primary/70",
          )}
        >
          <Icon size={14} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
