import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { ProjectCard, type Project } from "./project-card";
import { PROJECT_DATA } from "./project-data";
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

const PINNED_TECH = ["Next JS", "Postgres"];

const TECH_FILTERS = (() => {
  const counts = new Map<string, number>();
  for (const p of PROJECTS)
    for (const t of p.tech) counts.set(t, (counts.get(t) ?? 0) + 1);

  const auto = [...counts.entries()]
    .filter(
      ([name, n]) =>
        n >= 2 && n < PROJECTS.length && !PINNED_TECH.includes(name),
    )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name]) => name);

  const pinned = PINNED_TECH.filter((t) => counts.has(t));
  return [...pinned, ...auto];
})();

const flag = (s: string) => `--${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

function FlagLink({
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
        "border px-2.5 py-1 text-[12.5px] transition-colors",
        active
          ? "border-accent bg-accent text-background"
          : "border-border text-text-secondary hover:border-secondary-border hover:text-text-primary",
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

  const activeFlags = [type, tech].filter(Boolean).map((f) => flag(f!));

  return (
    <Container className="flex-col overflow-hidden pt-12 md:pt-16 min-h-[calc(100dvh-100px)]">
      <header className="mb-6 shrink-0">
        <p className="text-sm text-accent-muted">
          xandre@sh:~ ${" "}
          <span className="text-accent">
            ls projects/{activeFlags.length ? ` ${activeFlags.join(" ")}` : ""}
          </span>
        </p>
        <p className="mt-1.5 text-xs text-text-secondary">
          {activeFlags.length
            ? `${filtered.length} of ${PROJECTS.length} featured`
            : "30+ shipped since 2021 — these are the highlights"}
        </p>
      </header>

      <div className="mb-10 flex w-full shrink-0 flex-wrap items-center gap-2">
        <FlagLink href="/projects" active={!tech && !type}>
          --all
        </FlagLink>

        {TYPE_FILTERS.map((t) => {
          const active = type?.toLowerCase() === t.toLowerCase();
          const params = new URLSearchParams();
          if (!active) params.set("type", t);
          if (tech) params.set("tech", tech);
          return (
            <FlagLink
              key={t}
              href={`/projects${params.size ? `?${params}` : ""}`}
              active={active}
            >
              {flag(t)}
            </FlagLink>
          );
        })}

        <span className="mx-1 h-4 w-px bg-border" aria-hidden />

        {TECH_FILTERS.map((t) => {
          const active = tech?.toLowerCase() === t.toLowerCase();
          const params = new URLSearchParams();
          if (!active) params.set("tech", t);
          if (type) params.set("type", type);
          return (
            <FlagLink
              key={t}
              href={`/projects${params.size ? `?${params}` : ""}`}
              active={active}
            >
              {flag(t)}
            </FlagLink>
          );
        })}
      </div>

      <div className="min-h-0 w-full flex-1 overflow-y-auto pb-8 pr-3 scrollbar-thin scrollbar-gutter-stable">
        {filtered.length > 0 ? (
          <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">
            <span className="text-negative">ls:</span> no matches for{" "}
            {activeFlags.join(" ")} —{" "}
            <Link
              href="/projects"
              className="text-accent-muted transition-colors hover:text-accent"
            >
              clear filters
            </Link>
          </p>
        )}
      </div>
    </Container>
  );
}
