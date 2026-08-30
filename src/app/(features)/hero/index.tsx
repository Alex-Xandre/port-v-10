"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/container";
import { SOCIAL_DATA } from "./links";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/button";

const CMD = "whoami --verbose";

export default function Hero() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [typed, setTyped] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? CMD
      : "";
  });
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const type = () => {
      i += 1;
      setTyped(CMD.slice(0, i));
      if (i < CMD.length)
        timer.current = setTimeout(type, 42 + Math.random() * 55);
      else timer.current = setTimeout(() => setDone(true), 240);
    };
    timer.current = setTimeout(type, 420);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <Container className="flex-col gap-0 py-16 md:py-24 bg-background">
      <div className="flex  flex-col">
        <button
          onClick={() => window.dispatchEvent(new Event("open-shell"))}
          aria-label={`Open shell — command: ${CMD}`}
          className="group cursor-text text-left text-sm text-accent-muted"
        >
          xandre@sh:~ $ <span className="text-accent">{typed}</span>
          <span className="cursor-block ml-0.5" aria-hidden="true" />
          <span className="ml-3 text-xs text-text-secondary opacity-0 transition-opacity group-hover:opacity-100">
            click to type
          </span>
        </button>
        {/* output — fades in once the command finishes typing */}
        <div
          className={`transition-opacity duration-500 ${
            done ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-text-primary md:text-4xl">
            One engineer.
            <br />
            <span className="text-accent text-shadow-(--glow-accent)">
              The whole thing shipped.
            </span>
          </h1>

          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-text-secondary md:text-lg">
            30+ web and mobile apps since 2021, usually as the only engineer on
            the thing. Lately I build trading tooling that runs without me
            watching it.
          </p>

          <p className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-positive [box-shadow:var(--glow-positive)]"
              aria-hidden="true"
            />
            Open to freelance — I reply inside a day.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {SOCIAL_DATA.map((x, index: number) => (
              <a
                key={index}
                href={x.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-0.5 text-sm lowercase text-text-secondary transition-colors hover:text-accent"
              >
                {x.name}
                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-start gap-3">
            <Button
              variant="primary"
              href="https://calendly.com/xndrmcua22/30min"
            >
              ./book-meeting --30min
            </Button>
            <Button variant="secondary" href="/projects">
              ls projects/
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
