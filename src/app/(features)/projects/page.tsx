import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { ProjectCard, type Project } from "./project-card";
import { PROJECT_DATA } from "./project-data";
import Title from "@/components/title";
import { slugify } from "./adapt";

const PROJECTS: Project[] = PROJECT_DATA.map((p) => ({
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

const TYPE_FILTERS = (() => {
  const set = new Set<string>();
  for (const p of PROJECTS)
    for (const part of p.category.split("·")) set.add(part.trim());
  return [...set].sort();
})();

const TECH_FILTERS = (() => {
  const counts = new Map<string, number>();
  for (const p of PROJECTS)
    for (const t of p.tech) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .filter(([, n]) => n >= 2 && n < PROJECTS.length)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name]) => name);
})();

function PillLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "rounded-full border px-3 py-1 text-[13px] transition-colors",
        active
          ? "border-neutral-900 bg-neutral-900 text-neutral-50 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
          : "border-neutral-200 text-neutral-600 hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tech?: string; type?: string }>;
}) {
  const { tech, type } = await searchParams;

  const filtered = PROJECTS.filter((p) => {
    const techOk =
      !tech || p.tech.some((t) => t.toLowerCase() === tech.toLowerCase());
    const typeOk =
      !type ||
      p.category
        .split("·")
        .some((c) => c.trim().toLowerCase() === type.toLowerCase());
    return techOk && typeOk;
  });

  const activeLabel = [type, tech].filter(Boolean).join(" + ");

  return (
    <Container className="flex-col items-start overflow-hidden md:pt-16 min-h-[calc(100dvh-100px)]">
      <header className="mb-6 shrink-0">
        <Title title="Projects" />
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {activeLabel
            ? `${filtered.length} of ${PROJECTS.length} featured projects — ${activeLabel}.`
            : "30+ shipped since 2021 — these are the highlights."}
        </p>
      </header>

      <div className="mb-10 flex w-full shrink-0 flex-wrap items-center gap-2">
        <PillLink href="/projects" active={!tech && !type}>
          All
        </PillLink>

        {TYPE_FILTERS.map((t) => {
          const active = type?.toLowerCase() === t.toLowerCase();
          const params = new URLSearchParams();
          if (!active) params.set("type", t);
          if (tech) params.set("tech", tech);
          return (
            <PillLink
              key={t}
              href={`/projects${params.size ? `?${params}` : ""}`}
              active={active}
            >
              {t}
            </PillLink>
          );
        })}

        <span
          className="mx-1 h-4 w-px bg-neutral-200 dark:bg-neutral-800"
          aria-hidden
        />

        {TECH_FILTERS.map((t) => {
          const active = tech?.toLowerCase() === t.toLowerCase();
          const params = new URLSearchParams();
          if (!active) params.set("tech", t);
          if (type) params.set("type", type);
          return (
            <PillLink
              key={t}
              href={`/projects${params.size ? `?${params}` : ""}`}
              active={active}
            >
              {t}
            </PillLink>
          );
        })}
      </div>

      <div className="min-h-0 w-full flex-1 overflow-y-auto pb-8 pr-3 scrollbar-thin scrollbar-gutter-stable">
        {filtered.length > 0 ? (
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No featured projects match that combination —{" "}
            <Link
              href="/projects"
              className="underline hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              clear filters
            </Link>
            .
          </p>
        )}
      </div>
    </Container>
  );
}
