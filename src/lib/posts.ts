import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blogs");

export type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingMinutes: number;
  body: string;
};

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parse(filename: string): Post | null {
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  if (data.draft) return null;
  if (!data.title || !data.date) return null;

  return {
    slug: data.slug ?? filename.replace(/\.mdx?$/, ""),
    title: data.title,
    date:
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date),
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt ?? "",
    readingMinutes: readingMinutes(content),
    body: content.trim(),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parse)
    .filter((p): p is Post => p !== null)
    .filter((p) => new Date(p.date) <= new Date())
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap((p) => p.tags))].sort();
}

export function getAdjacent(slug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };

  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null,
  };
}
