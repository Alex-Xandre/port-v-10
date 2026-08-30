import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { getAllPosts, getAllTags } from "@/lib/posts";

const flag = (s: string) => `--${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

const isoMonth = (d: string) => {
  const date = new Date(d);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${m}`;
};

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
    <Container className="flex-col overflow-hidden pt-12 md:pt-16 min-h-[calc(100dvh-100px)]">
      <header className="mb-6 shrink-0">
        <p className="text-sm text-accent-muted">
          xandre@sh:~ ${" "}
          <span className="text-accent">
            ls blog/{tag ? ` ${flag(tag)}` : ""}
          </span>
        </p>
        <p className="mt-1.5 text-xs text-text-secondary">
          {tag
            ? `${filtered.length} of ${posts.length} posts`
            : "Notes on what I build and what breaks"}
        </p>
      </header>

      <div className="mb-10 flex w-full shrink-0 flex-wrap items-center gap-2">
        <FlagLink href="/blogs" active={!tag}>
          --all
        </FlagLink>

        {tagFilters.map((t) => {
          const active = tag?.toLowerCase() === t.toLowerCase();
          const params = new URLSearchParams();
          if (!active) params.set("tag", t);
          return (
            <FlagLink
              key={t}
              href={`/blogs${params.size ? `?${params}` : ""}`}
              active={active}
            >
              {flag(t)}
            </FlagLink>
          );
        })}
      </div>

      <div className="min-h-0 w-full flex-1 overflow-y-auto pb-8 pr-3 scrollbar-thin scrollbar-gutter-stable">
        {filtered.length > 0 ? (
          <div className="w-full overflow-hidden border border-border bg-secondary-background">
            {filtered.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className={[
                  "group flex flex-col gap-1 px-4 py-3.5 transition-colors hover:bg-secondary-background-hover sm:px-5",
                  i > 0 ? "border-t border-dashed border-border" : "",
                ].join(" ")}
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium text-text-primary transition-colors group-hover:text-accent">
                    {post.slug}.md
                  </span>
                  <span className="shrink-0 text-[12.5px] tabular-nums text-text-secondary">
                    {isoMonth(post.date)}
                  </span>
                </span>
                <span className="font-sans text-[12.5px] leading-relaxed text-text-secondary">
                  {post.excerpt}
                </span>
                <span className="mt-0.5 text-[11px] text-accent-muted">
                  {post.readingMinutes} min ·{" "}
                  {post.tags.map((t) => flag(t)).join(" ")}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-secondary">
            <span className="text-negative">ls:</span> no posts tagged{" "}
            {tag ? flag(tag) : ""} —{" "}
            <Link
              href="/blogs"
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
