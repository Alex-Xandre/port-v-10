import { Container } from "@/components/container";
import { PLATFORMS, SETUP, BUILT, type TradingPlatform } from "./trading-data";
import { TRADING_POSTS } from "./trading-blog-post";
import Link from "next/link";

const GROUPS: TradingPlatform["group"][] = ["Forex", "Crypto", "Prop"];

const isoMonth = (d: string) => {
  const date = new Date(d);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${m}`;
};

const slugifyTool = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function TradingPage() {
  return (
    <Container className="flex-col pt-12 md:pt-16 pb-12" animate={false}>
      <header className="mb-10">
        <p className="text-sm text-accent-muted">
          xandre@sh:~ $ <span className="text-accent">./trading --status</span>
        </p>
        <p className="mt-2 max-w-lg font-sans text-sm leading-relaxed text-text-secondary">
          Engineer who trades — and builds his own tooling. This is my setup,
          the platforms I actually use, and what I&apos;ve automated.
        </p>
        <p className="mt-2 text-xs text-text-secondary">
          <span className="text-accent-muted"># </span>
          not financial advice — a record of what I do, not what you should
        </p>
      </header>

      <div className="grid w-full gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-10">
          <div>
            <p className="mb-3 text-xs text-accent-muted"># how i trade</p>
            <dl>
              {SETUP.map(({ k, v }) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-4 border-t border-dashed border-border py-3"
                >
                  <dt className="shrink-0 text-[13px] lowercase text-text-secondary">
                    {k}
                  </dt>
                  <dd className="text-right text-[13px] text-text-primary">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="mb-3 text-xs text-accent-muted">
              # built for trading
            </p>
            <div>
              {BUILT.map(({ name, desc }) => (
                <div
                  key={name}
                  className="border-t border-dashed border-border py-4"
                >
                  <p className="text-sm font-medium text-accent">
                    ./{slugifyTool(name)}
                  </p>
                  <p className="mt-1 font-sans text-[13px] leading-relaxed text-text-secondary">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs text-accent-muted"># platforms i use</p>
          <p className="mb-5 text-xs text-text-secondary">
            Only what I actually use
          </p>

          <div>
            {GROUPS.map((group) => (
              <div key={group} className="mb-6">
                <p className="mb-1 text-xs lowercase text-accent">{group}/</p>
                <ul>
                  {PLATFORMS.filter((p) => p.group === group).map((p) => (
                    <li
                      key={p.name}
                      className="flex flex-col gap-1 border-t border-dashed border-border py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span className="min-w-0 truncate text-sm font-medium text-text-primary">
                        {p.name}
                      </span>
                      <span className="text-[12.5px] text-text-secondary">
                        {p.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {TRADING_POSTS.length > 0 && (
            <div className="mt-10">
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <p className="text-xs text-accent-muted"># writing</p>
                <Link
                  href="/blogs?tag=trading"
                  className="text-[12.5px] text-text-secondary transition-colors hover:text-accent"
                >
                  cd /blogs --trading →
                </Link>
              </div>
              <div>
                {TRADING_POSTS.slice(0, 3).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className="group flex flex-col gap-2 border-t border-dashed border-border py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-text-primary transition-colors group-hover:text-accent sm:truncate">
                        {post.slug}.md
                      </span>
                      <span className="mt-0.5 line-clamp-2 block font-sans text-[12.5px] text-text-secondary sm:line-clamp-1">
                        {post.excerpt}
                      </span>
                    </span>
                    <span className="shrink-0 text-[12.5px] tabular-nums text-text-secondary">
                      {isoMonth(post.date)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
