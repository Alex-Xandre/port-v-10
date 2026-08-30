"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import Button from "@/components/button";

const EMAIL = "xndrmcua22@gmail.com";

const LINKS: { key: string; label: string; href: string; note?: string }[] = [
  {
    key: "meeting",
    label: "calendly.com/xndrmcua22/30min",
    href: "https://calendly.com/xndrmcua22/30min",
    note: "— thirty minutes",
  },
  {
    key: "github",
    label: "github.com/Alex-Xandre",
    href: "https://github.com/Alex-Xandre",
  },
  {
    key: "linkedin",
    label: "linkedin.com/in/alexander-micua",
    href: "https://www.linkedin.com/in/alexander-micua-04657a217/",
  },
  {
    key: "fiverr",
    label: "fiverr.com/xandre",
    href: "https://www.fiverr.com/s/99m591E",
  },
  {
    key: "upwork",
    label: "upwork.com/xandre",
    href: "https://www.upwork.com/freelancers/~017a385ecea9ff4281",
  },
];

export function SiteFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer className="w-full border-t border-border">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 py-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-lg">
            <p className="text-2xl leading-snug text-text-primary md:text-3xl">
              Let&apos;s build something
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-text-secondary">
              Tell me what you&apos;re building and I&apos;ll tell you whether
              I&apos;m the right fit. I usually reply within a day.
            </p>

            <div className="mt-6 flex flex-col gap-1.5 text-sm">
              {LINKS.map(({ key, label, href, note }) => (
                <p key={key}>
                  <span className="inline-block min-w-[9ch] text-text-secondary">
                    {key}
                  </span>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-muted transition-colors hover:text-accent"
                  >
                    {label}
                  </a>
                  {note && (
                    <span className="ml-2 hidden text-text-secondary sm:inline">
                      {note}
                    </span>
                  )}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              onClick={copyEmail}
              icon={copied ? <Check /> : <Copy />}
              aria-live="polite"
            >
              {copied ? "copied!" : EMAIL}
            </Button>
          </div>
        </div>

        <div className="border-t border-border py-6">
          <p className="text-[12.5px] text-text-secondary">
            <span className="text-accent-muted">process exited 0</span>
            {" · "}© {new Date().getFullYear()} xandre micua
          </p>
        </div>
      </div>
    </footer>
  );
}