import Link from "next/link";
import { Container } from "@/components/container";
import { getAllPosts } from "@/lib/posts";

const isoMonth = (d: string) => {
  const date = new Date(d);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${m}`;
};

export default function HomeWritingPreview() {
  const posts = getAllPosts();
  return (
    <Container className="flex-col py-12" animate={false}>
      <div className="mb-4 flex w-full items-baseline justify-between gap-4">
        <p className="text-sm text-accent-muted">
          xandre@sh:~ ${" "}
          <span className="text-accent">cat blog/*.md | head -3</span>
        </p>
        <Link
          href="/blogs"
          className="flex-none text-[13px] text-text-secondary transition-colors hover:text-accent"
        >
          cd /blogs →
        </Link>
      </div>

      <div className="w-full">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group flex items-start justify-between gap-6 border-b border-dashed border-border py-4 last:border-b-0"
          >
            <div className="min-w-0">
              <div className="text-sm font-medium text-text-primary transition-colors group-hover:text-accent">
                {post.slug}.md
              </div>
              <div className="mt-1 font-sans text-sm text-text-secondary">
                {post.excerpt}
              </div>
            </div>
            <span className="shrink-0 text-xs text-text-secondary">
              {isoMonth(post.date)}
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
