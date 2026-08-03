"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { Container } from "@/components/container";
import type { Project } from "@/app/(features)/projects/project-card";
import { PROJECT_DATA } from "@/app/(features)/projects/project-data";
import Title from "@/components/title";
import Highlights from "../experiences/experience-description";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const PROJECTS: Project[] = PROJECT_DATA.slice(0, 3).map((p) => ({
  slug: slugify(p.title),
  name: p.title,
  category: p.type,
  year: p.year,
  description: p.description,
  tech: p.stack,
  image: p.banner[0],
  liveUrl: p.web_link,
  repoUrl: p.github,
}));

const AUTO_MS = 6000;

export default function HomeProjectPreview() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = PROJECTS.length;

  const next = useCallback(() => setActive((a) => (a + 1) % count), [count]);
  const prev = useCallback(
    () => setActive((a) => (a - 1 + count) % count),
    [count],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(next, AUTO_MS);
    return () => clearInterval(id);
  }, [paused, reducedMotion, active, next]);

  const p = PROJECTS[active];

  return (
    <Container className="h-auto flex-col items-center py-12">
      <div className="mb-10 flex w-full items-baseline justify-between">
        <Title title="Recent works" />
        <Link
          href="/projects"
          className="text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          All projects →
        </Link>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected projects"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="relative w-full max-w-4xl outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 dark:focus-visible:ring-neutral-100 dark:focus-visible:ring-offset-neutral-950"
      >
        <div
          className="absolute inset-x-0 -top-4 flex flex-col items-center"
          aria-hidden
        >
          {[2, 1].map((depth) => (
            <div
              key={depth}
              className="h-4 rounded-t-xl border border-b-0 border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
              style={{
                width: `calc(100% - ${depth * 40}px)`,
                marginBottom: "-8px",
                opacity: depth === 2 ? 0.5 : 0.75,
              }}
            />
          ))}
        </div>

        <div className="relative grid overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.2)] dark:border-neutral-800 dark:bg-neutral-950 md:grid-cols-[1fr_1.15fr]">
          <div
            key={`text-${p.slug}`}
            className="flex flex-col justify-center p-8 md:p-10"
            style={
              reducedMotion
                ? undefined
                : { animation: "fadeSlide 400ms ease-out" }
            }
          >
            <p className="mb-2 text-xs text-neutral-400 dark:text-neutral-500">
              {p.category}
            </p>
            <h3 className="mb-3 text-xl font-medium text-neutral-900 dark:text-neutral-100">
              {p.name}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {p.description}
            </p>

            <ul className="mb-8 flex flex-wrap gap-1.5">
              {p.tech.slice(0, 4).map((t) => (
                <li
                  key={t}
                  className="rounded bg-neutral-100 px-2 py-0.5 text-[11.5px] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5">
              <Link
                href={`/projects/${p.slug}`}
                className="text-[13px] font-medium text-neutral-900 hover:underline dark:text-neutral-100"
              >
                View project →
              </Link>
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[13px] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  Live
                </a>
              )}
              {p.repoUrl && (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[13px] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  <GitBranch className="h-3.5 w-3.5" aria-hidden />
                  Code
                </a>
              )}
            </div>
          </div>

          <div className="relative min-h-65 bg-neutral-900 md:min-h-85">
            {PROJECTS.map((proj, i) => (
              <Image
                key={proj.slug}
                src={proj.image}
                alt={i === active ? `${proj.name} screenshot` : ""}
                fill
                sizes="(min-width: 768px) 520px, 100vw"
                className="object-cover object-top-left transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0 }}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-1.5" role="tablist" aria-label="Projects">
        {PROJECTS.map((proj, i) => (
          <button
            key={proj.slug}
            role="tab"
            aria-selected={i === active}
            aria-label={`Show ${proj.name}`}
            onClick={() => setActive(i)}
            className={[
              "h-1.5 rounded-full transition-all duration-300",
              i === active
                ? "w-6 bg-neutral-900 dark:bg-neutral-100"
                : "w-1.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600",
            ].join(" ")}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Container>
  );
}
