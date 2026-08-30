import Link from "next/link";
import { Container } from "@/components/container";
import { PROJECT_DATA } from "@/app/(features)/projects/project-data";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const FEATURED = PROJECT_DATA.slice(0, 3);

export default function HomeProjectPreview() {
  return (
    <Container className="flex-col py-12" animate={false}>
      <div className="mb-7 flex w-full items-baseline justify-between gap-4">
        <p className="text-sm text-accent-muted">
          xandre@sh:~ ${" "}
          <span className="text-accent">ls -l projects/ --featured</span>
          <span className="mt-1 block text-xs text-text-secondary">
            total 30+ · showing pinned
          </span>
        </p>
        <Link
          href="/projects"
          className="flex-none text-[13px] text-text-secondary transition-colors hover:text-accent"
        >
          cd /projects →
        </Link>
      </div>

      <div className="flex w-full flex-col">
        {FEATURED.map((p) => (
          <Link
            key={p.title}
            href={`/projects/${slugify(p.title)}`}
            className="group mb-4 block border border-border bg-secondary-background px-6 py-5 transition-all duration-150 last:mb-0 hover:translate-x-1 hover:border-secondary-border"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-xs text-text-secondary">drwx——</span>
              <span className="font-semibold text-accent">
                {slugify(p.title)}/
              </span>
              <span className="ml-auto text-xs text-text-secondary">
                {p.type}
                {p.year ? ` · ${p.year}` : ""}
              </span>
            </div>
            <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-text-secondary">
              {p.description}
            </p>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {p.stack.slice(0, 4).map((t) => (
                <li
                  key={t}
                  className="border border-border px-2 py-0.5 text-[11px] text-accent-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </Container>
  );
}
