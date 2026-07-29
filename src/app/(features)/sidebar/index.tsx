"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SIDEBAR_MENU } from "./sidebar-content-data";
import ThemeToggle from "./theme-toggle";

const Appbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/10 bg-background 2xl:px-52 ">
      <div className="flex items-center justify-between px-5 py-3 text-sm">
        <h1 className="text-base font-medium text-text-primary">
          Xandre Micua
        </h1>

        {/* Desktop nav — hidden below md */}
        <nav className="hidden items-center gap-1 md:flex">
          {SIDEBAR_MENU.map((item) => {
            const href = item.href ?? "#";
            const isActive = pathname === href;
            return (
              <Link
                key={item.text}
                href={href}
                className={cn(
                  "rounded-md px-2 py-2 transition-colors",
                  isActive
                    ? "text-text-primary"
                    : "text-text-primary/60 hover:text-text-primary",
                )}
              >
                {item.text}
              </Link>
            );
          })}
        </nav>

        {/* Right components */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Burger — only below md */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="text-text-primary/60 transition-colors hover:text-text-primary md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <nav
        className={cn(
          "flex flex-col gap-1 overflow-hidden border-t border-border/10 px-5 text-sm transition-all duration-200 md:hidden",
          open ? "max-h-96 py-3" : "max-h-0 border-t-0 py-0",
        )}
      >
        {SIDEBAR_MENU.map((item) => {
          const href = item.href ?? "#";
          const isActive = pathname === href;
          return (
            <Link
              key={item.text}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-2 py-2 transition-colors",
                isActive
                  ? "text-text-primary"
                  : "text-text-primary/60 hover:text-text-primary",
              )}
            >
              {item.text}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Appbar;
