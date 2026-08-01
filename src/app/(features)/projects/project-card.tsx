import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";

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

  return (
    <article className="group relative w-full max-w-md md:max-w-sm overflow-hidden rounded-xl bg-background  transition-colors duration-300 hover:shadow-sm  border border-neutral-200 dark:border-neutral-600 ">
      <div className="relative aspect-video overflow-hidden bg-neutral-900">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes="(min-width: 1024px) 384px, 100vw"
          className="object-cover object-left transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {project.year != null && (
          <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] text-neutral-100 backdrop-blur-sm">
            {project.year}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.name}
            </Link>
          </h3>
          <span className="max-w-[45%] truncate text-xs text-neutral-400 dark:text-neutral-500">
            {project.category}
          </span>
        </div>

        <p className="mb-3.5 line-clamp-2 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          {project.description}
        </p>

        <ul className="mb-4 flex flex-wrap gap-1.5">
          {chips.map((t) => (
            <li
              key={t}
              className="rounded bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
            >
              {t}
            </li>
          ))}
          {extra > 0 && (
            <li className="rounded bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
              +{extra}
            </li>
          )}
        </ul>

        {(project.liveUrl || project.repoUrl) && (
          <div className="relative z-10 flex items-center gap-4  pt-3 ">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[13px] text-neutral-900 hover:underline dark:text-neutral-100"
              >
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
                Live site
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[13px] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                <GitBranch className="h-3.5 w-3.5" aria-hidden />
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
