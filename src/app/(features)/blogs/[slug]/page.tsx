import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Markdown } from "@/components/markdown";
import { getAllPosts, getPost, getAdjacent } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Xandre Micua`, description: post.excerpt };
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
    <Container className="flex-col items-start overflow-hidden md:pt-16 min-h-[calc(100dvh-200px)]">
      <header className="mb-6 shrink-0">
        <Link
          href="/blogs"
          className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          All posts
        </Link>

        <h1 className="max-w-2xl font-script text-3xl leading-tight text-neutral-900 dark:text-neutral-100 md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          {` · ${post.readingMinutes} min · ${post.tags.join(" · ")}`}
        </p>
      </header>

      <div className="min-h-0 w-full flex-1 overflow-y-auto pb-8 pr-3 scrollbar-thin scrollbar-gutter-stable">
        <article className="w-full ">
          <Markdown>{post.body}</Markdown>
        </article>

        {(prev || next) && (
          <nav
            aria-label="Post navigation"
            className="mt-16 flex w-full  items-stretch justify-between gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800"
          >
            {prev ? (
              <Link
                href={`/blogs/${prev.slug}`}
                className="group flex items-center gap-2 text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                <ArrowLeft
                  className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden
                />
                {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blogs/${next.slug}`}
                className="group flex items-center gap-2 text-right text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {next.title}
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
