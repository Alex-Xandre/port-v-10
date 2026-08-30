"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SIDEBAR_MENU } from "./sidebar-content-data";
import Ticker from "./ticker";
import { GithubStats } from "@/lib/github";

const Appbar = ({ gh }: { gh: GithubStats }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => href !== "#" && pathname.startsWith(href);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex flex-nowrap items-center justify-between gap-4 whitespace-nowrap py-3 text-sm">
          <Link
            href="/"
            aria-label="Xandre Micua — home"
            className="flex select-none items-center gap-2.5 [-webkit-tap-highlight-color:transparent] touch-manipulation"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 flex-none rounded-full bg-positive [box-shadow:var(--glow-positive)]"
            />
            <span className="text-sm text-text-secondary">
              xandre<span className="text-accent-muted">@sh</span>:~
            </span>
          </Link>

          <nav className="hidden items-center gap-4 lg:flex">
            {SIDEBAR_MENU.map((item) => {
              const href = item.href ?? "#";
              const active = isActive(href);
              return (
                <Link
                  key={item.text}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "lowercase transition-colors",
                    active
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {item.text}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="text-text-secondary transition-colors hover:text-text-primary lg:hidden"
          >
            {open ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>

        <nav
          className={cn(
            "flex flex-col overflow-hidden border-t text-sm transition-all duration-200 lg:hidden",
            open
              ? "max-h-96 border-border bg-secondary-background py-2"
              : "max-h-0 border-transparent py-0",
          )}
        >
          {SIDEBAR_MENU.map((item) => {
            const href = item.href ?? "#";
            const active = isActive(href);
            return (
              <Link
                key={item.text}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "px-2 py-2 lowercase transition-colors",
                  active
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                <span aria-hidden="true" className="mr-2 text-accent-muted">
                  &gt;
                </span>
                {item.text}
              </Link>
            );
          })}
        </nav>
      </div>

      <Ticker gh={gh} />
    </header>
  );
};

export default Appbar;
