import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { displayUrl } from "./adapt";

export type Project = {
  slug: string;
  name: string;
  category: string;
  year?: number;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
};

const MAX_CHIPS = 4;

export function ProjectCard({ project }: { project: Project }) {
  const chips = project.tech.slice(0, MAX_CHIPS);
  const extra = project.tech.length - chips.length;
  const path = displayUrl(project.liveUrl) || `~/projects/${project.slug}`;

  return (
    <article className="group relative w-full overflow-hidden border border-border bg-secondary-background transition-colors duration-300 hover:border-secondary-border">
      <div className="flex items-center gap-2 border-b border-border px-3.5 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-negative/70" />
          <span className="h-2 w-2 rounded-full bg-accent/70" />
          <span className="h-2 w-2 rounded-full bg-positive/70" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center text-[11px] text-text-secondary">
          {path}
        </span>
        {project.year != null && (
          <span className="text-[11px] text-text-secondary">
            {project.year}
          </span>
        )}
      </div>

      <div className="relative aspect-video overflow-hidden border-b border-border bg-background">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes="(min-width: 1024px) 384px, 100vw"
          className="object-cover object-left opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
        />
      </div>

      <div className="p-5">
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-semibold text-accent">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.slug}/
            </Link>
          </h3>
          <span className="max-w-[45%] truncate text-xs lowercase text-text-secondary">
            {project.category}
          </span>
        </div>

        <p className="mb-3.5 line-clamp-2 font-sans text-[13px] leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <ul className="mb-4 flex flex-wrap gap-1.5">
          {chips.map((t) => (
            <li
              key={t}
              className="border border-border px-2 py-0.5 text-[11px] text-accent-muted"
            >
              {t}
            </li>
          ))}
          {extra > 0 && (
            <li className="border border-border px-2 py-0.5 text-[11px] text-accent-muted">
              +{extra}
            </li>
          )}
        </ul>

        {(project.liveUrl || project.repoUrl) && (
          <div className="relative z-10 flex items-center gap-4 pt-1">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[13px] text-text-primary transition-colors hover:text-accent"
              >
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[13px] text-text-secondary transition-colors hover:text-accent"
              >
                <GitBranch className="h-3.5 w-3.5" aria-hidden />
                code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
