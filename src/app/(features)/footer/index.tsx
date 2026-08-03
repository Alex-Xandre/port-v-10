// components/site-footer.tsx
"use client";

import { useState } from "react";
import { Check, Copy, Phone } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Button from "@/components/button";
import { LiaLinkedin } from "react-icons/lia";

const EMAIL = "xndrmcua22@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Alex-Xandre", icon: SiGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alexander-micua-04657a217/",
    icon: LiaLinkedin,
  },
];

const MARKETPLACES = [
  { label: "Fiverr", href: "https://www.fiverr.com/s/7Y4Q2Eye" },
  {
    label: "Upwork",
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
    <footer className=" border-t border-neutral-200 dark:border-neutral-800  2xl:px-100 xl:px-54 md:px-32 px-4 w-full  ">
      <div className="mx-auto w-full max-w-[2000px]">
        <div className="flex flex-col gap-8 py-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="max-w-xl text-2xl leading-snug text-neutral-900 dark:text-neutral-100 md:text-3xl italic">
              Let&apos;s build something
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Have a project in mind, or just want to talk shop? I usually reply
              within a day.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              onClick={copyEmail}
              icon={copied ? <Check /> : <Copy />}
              aria-live="polite"
            >
              {copied ? "Copied!" : EMAIL}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-neutral-200 py-6 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-neutral-400 dark:text-neutral-500">
            © {new Date().getFullYear()} Xandre Micua
          </p>

          <div className="flex flex-wrap items-center gap-5">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </a>
            ))}
            {MARKETPLACES.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
