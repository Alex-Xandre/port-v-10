import { PROJECT_DATA, type ProjectEntry } from "./project-data";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export type ProjectWithSlug = ProjectEntry & { slug: string };

export const PROJECTS: ProjectWithSlug[] = PROJECT_DATA.map((p) => ({
  ...p,
  slug: slugify(p.title),
}));

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const getAdjacent = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? PROJECTS[i - 1] : null,
    next: i < PROJECTS.length - 1 ? PROJECTS[i + 1] : null,
  };
};

export const displayUrl = (url?: string) =>
  url ? url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : "";
