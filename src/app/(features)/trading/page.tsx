import { Container } from "@/components/container";
import Title from "@/components/title";
import {
  PLATFORMS,
  SETUP,
  BUILT,
  type TradingPlatform,
  GROUP_ICONS,
} from "./trading-data";
import { TRADING_POSTS } from "./trading-blog-post";
import Link from "next/link";

const GROUPS: TradingPlatform["group"][] = ["Forex", "Crypto", "Prop"];

export default function TradingPage() {
  return (
    <Container className="h-auto flex-col items-start  md:py-20 lg:py-20 pb-10 md:pb-20 lg:pb-20">
      <header className="mb-10">
        <Title title="Trading" />
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          Engineer who trades — and builds his own tooling. This is my setup,
          the platforms I actually use, and what I&apos;ve automated.
        </p>
        <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
          Not financial advice — a record of what I do, not what you should.
        </p>
      </header>

      <div className="grid w-full gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-10">
          <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
              <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
                How I trade
              </span>
            </div>
            <dl className="space-y-2.5">
              {SETUP.map(({ k, v }) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-4"
                >
                  <dt className="shrink-0 text-[13px] text-neutral-500 dark:text-neutral-400">
                    {k}
                  </dt>
                  <dd className="text-right text-[13px] text-neutral-900 dark:text-neutral-100">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Built for trading
            </p>
            <div className="grid gap-3">
              {BUILT.map(({ name, desc }) => (
                <div
                  key={name}
                  className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
                >
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {name}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="mb-1 text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Platforms I use
          </p>
          <p className="mb-4 text-xs text-neutral-400 dark:text-neutral-500">
            I only list what I actually use.
          </p>

          <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            {GROUPS.map((group, gi) => (
              <div key={group}>
                <p
                  className={[
                    "bg-neutral-50 px-4 py-2 text-[10.5px] uppercase tracking-wider text-neutral-400 dark:bg-neutral-900 dark:text-neutral-500 sm:px-5",
                    gi > 0
                      ? "border-t border-neutral-200 dark:border-neutral-800"
                      : "",
                  ].join(" ")}
                >
                  {group}
                </p>
                <ul>
                  {PLATFORMS.filter((p) => p.group === group).map((p) => {
                    const Icon = p.icon ?? GROUP_ICONS[p.group];
                    return (
                      <li
                        key={p.name}
                        className="flex flex-col gap-1 border-t border-neutral-200 px-4 py-3 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
                      >
                        <span className="flex min-w-0 items-center gap-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          <Icon
                            className="h-4 w-4 shrink-0 text-neutral-400 dark:text-neutral-500"
                            aria-hidden
                          />
                          <span className="truncate">{p.name}</span>
                        </span>
                        <span className="pl-7 text-[12.5px] text-neutral-500 dark:text-neutral-400 sm:pl-0">
                          {p.note}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {TRADING_POSTS.length > 0 && (
            <div className="mt-10">
              <div className="mb-4 flex items-baseline justify-between">
                <p className="text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Writing
                </p>
                <Link
                  href="/blogs?tag=trading"
                  className="text-[12.5px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  All posts →
                </Link>
              </div>
              <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                {TRADING_POSTS.slice(0, 3).map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/blogs/${post.slug}`}
                    className={[
                      "group flex flex-col gap-2 px-4 py-3.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:px-5",
                      i > 0
                        ? "border-t border-neutral-200 dark:border-neutral-800"
                        : "",
                    ].join(" ")}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 sm:truncate">
                        {post.title}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-[12.5px] text-neutral-500 dark:text-neutral-400 sm:line-clamp-1">
                        {post.excerpt}
                      </span>
                    </span>
                    <span className="shrink-0 text-[12.5px] tabular-nums text-neutral-400 dark:text-neutral-500">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
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
