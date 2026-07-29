import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  GitBranch,
  KeyRound,
  Lock,
} from "lucide-react";
import { Container } from "@/components/container";
import { getProject, getAdjacent, displayUrl, PROJECTS } from "../adapt";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Xandre Micua`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacent(slug);

  return (
    <Container className="h-auto flex-col items-start py-16">
      {/* breadcrumb */}
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        All projects
      </Link>

      {/* header */}
      <header className="mb-10 w-full">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="font-script text-3xl text-neutral-900 dark:text-neutral-100 md:text-4xl">
            {project.title}
          </h1>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">
            {project.type}
            {project.year ? ` · ${project.year}` : ""}
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.web_link && (
            <a
              href={project.web_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-neutral-900 px-4 text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
            >
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              Live site
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-neutral-200 px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              <GitBranch className="h-3.5 w-3.5" aria-hidden />
              Source
            </a>
          )}
        </div>
      </header>

      {/* screenshots in browser chrome */}
      <div className="mb-12 grid w-full gap-6">
        {project.banner.map((src, i) => (
          <div
            key={src}
            className="overflow-hidden rounded-xl border border-neutral-200 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)] dark:border-neutral-800"
          >
            <div className="flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              </div>
              <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1 dark:border-neutral-800 dark:bg-neutral-900">
                <Lock
                  className="h-3 w-3 shrink-0 text-neutral-400"
                  aria-hidden
                />
                <span className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                  {displayUrl(project.web_link)}
                </span>
              </div>
              <div className="w-10 shrink-0" />
            </div>
            <div className="relative aspect-video bg-neutral-900">
              <Image
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover object-top"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* features + sidebar */}
      <div className="grid w-full gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          {project.features.length > 0 && (
            <>
              <p className="mb-4 text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                What it does
              </p>
              <ul className="space-y-3">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 text-[13.5px] leading-relaxed text-neutral-600 dark:text-neutral-400"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400 dark:text-neutral-500"
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Built with
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <li
                  key={t}
                  className="rounded bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
{/* 
          {project.testAccount && (
            <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
              <p className="mb-3 flex items-center gap-2 text-[13px] font-medium text-neutral-900 dark:text-neutral-100">
                <KeyRound className="h-3.5 w-3.5" aria-hidden />
                Try it yourself
              </p>
              <dl className="space-y-1.5 text-[13px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500 dark:text-neutral-400">
                    Username
                  </dt>
                  <dd className="font-mono text-neutral-900 dark:text-neutral-100">
                    {project.testAccount[0]}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500 dark:text-neutral-400">
                    Password
                  </dt>
                  <dd className="font-mono text-neutral-900 dark:text-neutral-100">
                    {project.testAccount[1]}
                  </dd>
                </div>
              </dl>
            </div>
          )} */}
        </div>
      </div>

      {/* prev / next */}
      <nav
        aria-label="Project navigation"
        className="mt-16 flex w-full items-stretch justify-between gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex items-center gap-2 text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden
            />
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center gap-2 text-right text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            {next.title}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Container>
  );
}
