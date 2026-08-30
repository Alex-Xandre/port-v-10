import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  GitBranch,
  Lock,
} from "lucide-react";
import { Container } from "@/components/container";
import Button from "@/components/button";
import { getProject, getAdjacent, displayUrl, PROJECTS } from "../adapt";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

const SITE = "https://xandremicua.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `${SITE}/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      url: `${SITE}/projects/${slug}`,
      images: project.banner[0] ? [{ url: project.banner[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.banner[0] ? [project.banner[0]] : undefined,
    },
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
    <Container className="flex-col py-16" animate={false}>
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-text-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        cd ..
      </Link>

      <header className="mb-10 w-full">
        <p className="text-sm text-accent-muted">
          xandre@sh:~ ${" "}
          <span className="text-accent">cat {slug}/README.md</span>
        </p>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="text-2xl font-semibold leading-snug text-accent md:text-3xl">
            {slug}/
          </h1>
          <span className="text-xs lowercase text-text-secondary">
            {project.type}
            {project.year ? ` · ${project.year}` : ""}
          </span>
        </div>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.web_link && (
            <Button
              variant="primary"
              href={project.web_link}
              icon={<ArrowUpRight />}
            >
              ./open --live
            </Button>
          )}
          {project.github && (
            <Button
              variant="secondary"
              href={project.github}
              icon={<GitBranch />}
            >
              git clone
            </Button>
          )}
        </div>
      </header>

      <div className="mb-12 grid w-full gap-6">
        {project.banner.map((src, i) => (
          <div key={src} className="overflow-hidden border border-border">
            <div className="flex items-center gap-3 border-b border-border bg-secondary-background px-4 py-2.5">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-negative/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-positive/70" />
              </div>
              <div className="mx-auto flex min-w-0 items-center gap-1.5 border border-border bg-background px-3 py-1">
                <Lock
                  className="h-3 w-3 shrink-0 text-accent-muted"
                  aria-hidden
                />
                <span className="truncate text-xs text-text-secondary">
                  {displayUrl(project.web_link) || `~/projects/${slug}`}
                </span>
              </div>
              <div className="w-10 shrink-0" />
            </div>
            <div className="relative aspect-video bg-background">
              <Image
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover object-left"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid w-full gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          {project.features.length > 0 && (
            <>
              <p className="mb-4 text-xs text-accent-muted"># what it does</p>
              <ul className="space-y-3">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 font-sans text-[13.5px] leading-relaxed text-text-secondary"
                  >
                    <span
                      className="mt-px shrink-0 font-mono text-xs text-positive"
                      aria-hidden="true"
                    >
                      [x]
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-3 text-xs text-accent-muted"># built with</p>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <li
                  key={t}
                  className="border border-border px-2.5 py-1 text-xs text-accent-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <nav
        aria-label="Project navigation"
        className="mt-16 flex w-full items-stretch justify-between gap-4 border-t border-border pt-8"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group flex items-center gap-2 text-[13px] text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden
            />
            cd ../{prev.slug}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center gap-2 text-right text-[13px] text-text-secondary transition-colors hover:text-accent"
          >
            cd ../{next.slug}
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
