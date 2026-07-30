import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/container";
import Title from "@/components/title";
import { getAllPosts, getAllTags } from "@/lib/posts";

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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;

  // Read per-request, not at module scope — a module-level fs read is cached
  // when the dev server loads the file, so new posts wouldn't appear.
  const posts = getAllPosts();
  const tagFilters = getAllTags();

  const filtered = posts.filter(
    (p) => !tag || p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );

  return (
    <Container className="flex-col items-start overflow-hidden md:pt-16 min-h-[calc(100dvh-100px)]">
      <header className="mb-6 shrink-0">
        <Title title="Blogs" />
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {tag
            ? `${filtered.length} of ${posts.length} posts — ${tag}.`
            : "Notes on what I build and what breaks."}
        </p>
      </header>

      <div className="mb-10 flex w-full shrink-0 flex-wrap items-center gap-2">
        <PillLink href="/blogs" active={!tag}>
          All
        </PillLink>

        {tagFilters.map((t) => {
          const active = tag?.toLowerCase() === t.toLowerCase();
          const params = new URLSearchParams();
          if (!active) params.set("tag", t);
          return (
            <PillLink
              key={t}
              href={`/blogs${params.size ? `?${params}` : ""}`}
              active={active}
            >
              {t}
            </PillLink>
          );
        })}
      </div>

      <div className="min-h-0 w-full flex-1 overflow-y-auto pb-8 pr-3 scrollbar-thin scrollbar-gutter-stable">
        {filtered.length > 0 ? (
          <div className="w-full  overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background">
            {filtered.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className={[
                  "flex flex-col gap-1 px-4 py-3.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900 sm:px-5",
                  i > 0
                    ? "border-t border-neutral-200 dark:border-neutral-800"
                    : "",
                ].join(" ")}
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {post.title}
                  </span>
                  <span className="shrink-0 text-[12.5px] tabular-nums text-neutral-400 dark:text-neutral-500">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </span>
                <span className="text-[12.5px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {post.excerpt}
                </span>
                <span className="mt-0.5 text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  {post.readingMinutes} min · {post.tags.join(" · ")}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No posts tagged that yet —{" "}
            <Link
              href="/blogs"
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
