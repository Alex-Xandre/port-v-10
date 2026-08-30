import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Markdown } from "@/components/markdown";
import { getAllPosts, getPost, getAdjacent } from "@/lib/posts";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

const SITE = "https://xandremicua.vercel.app";

const flag = (s: string) => `--${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

const isoDate = (d: string) => {
  const date = new Date(d);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${day}`;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE}/blogs/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `${SITE}/blogs/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacent(slug);

  return (
    <Container className="flex-col overflow-hidden pt-12 md:pt-16 min-h-[calc(100dvh-200px)]">
      <header className="mb-8 w-full shrink-0">
        <Link
          href="/blogs"
          className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-text-secondary transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          cd ..
        </Link>

        <p className="text-sm text-accent-muted">
          xandre@sh:~ $ <span className="text-accent">cat {slug}.md</span>
        </p>

        <h1 className="mt-5 max-w-2xl text-2xl font-semibold leading-snug text-text-primary md:text-3xl">
          {post.title}
        </h1>
        <p className="mt-3 text-xs text-text-secondary">
          <time dateTime={post.date} className="tabular-nums">
            {isoDate(post.date)}
          </time>
          {` · ${post.readingMinutes} min · `}
          {post.tags.map((t, i) => (
            <span key={t}>
              {i > 0 && " "}
              <Link
                href={`/blogs?tag=${encodeURIComponent(t)}`}
                className="text-accent-muted transition-colors hover:text-accent"
              >
                {flag(t)}
              </Link>
            </span>
          ))}
        </p>
      </header>

      <div className="min-h-0 w-full flex-1 overflow-y-auto pb-8 pr-3 scrollbar-thin scrollbar-gutter-stable">
        <article className="w-full max-w-5xl font-sans">
          <Markdown>{post.body}</Markdown>
        </article>

        {(prev || next) && (
          <nav
            aria-label="Post navigation"
            className="mt-16 flex w-full items-stretch justify-between gap-4 border-t border-border pt-8"
          >
            {prev ? (
              <Link
                href={`/blogs/${prev.slug}`}
                className="group flex items-center gap-2 text-[13px] text-text-secondary transition-colors hover:text-accent"
              >
                <ArrowLeft
                  className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden
                />
                {prev.slug}.md
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blogs/${next.slug}`}
                className="group flex items-center gap-2 text-right text-[13px] text-text-secondary transition-colors hover:text-accent"
              >
                {next.slug}.md
                <ArrowRight
                  className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </Container>
  );
}
