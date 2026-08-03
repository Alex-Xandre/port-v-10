import Link from "next/link";
import { Container } from "@/components/container";
import Title from "@/components/title";
import { getAllPosts } from "@/lib/posts";

export default function HomeWritingPreview() {
  const posts = getAllPosts();
  return (
    <Container className="h-auto flex-col py-12 bg-background/90">
      <div className="mb-6 flex w-full items-baseline justify-between">
        <Title title="Notes" />
        <Link
          href="/blogs"
          className="text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          All posts →
        </Link>
      </div>

      <div className="w-full">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group flex items-start justify-between gap-6 border-t border-neutral-200 py-4 dark:border-neutral-800"
          >
            <div className="min-w-0">
              <div className="text-sm font-medium text-neutral-900 group-hover:underline dark:text-neutral-100">
                {post.title}
              </div>
              <div className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                {post.excerpt}
              </div>
            </div>
            <span className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">
              {post.date}
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
