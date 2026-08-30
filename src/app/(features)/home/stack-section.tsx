import Link from "next/link";
import { Container } from "@/components/container";
import { STACK_DATA } from "../stacks/stacks-data";

const CORE = STACK_DATA.filter((s) => s.group === "core").slice(0, 6);

export default function HomeStackPreview() {
  return (
    <Container className="flex-col py-12" animate={false}>
      <div className="mb-6 flex w-full items-baseline justify-between gap-4">
        <p className="text-sm text-accent-muted">
          xandre@sh:~ $ <span className="text-accent">npm ls --depth=0</span>
        </p>
        <Link
          href="/stacks"
          className="flex-none text-[13px] text-text-secondary transition-colors hover:text-accent"
        >
          cd /stacks →
        </Link>
      </div>

      <ul className="flex w-full flex-wrap gap-2.5">
        {CORE.map((item, i) => (
          <li
            key={item.name}
            className="border border-border bg-secondary-background px-3 py-1.5 text-[13px] text-text-primary transition-colors hover:border-secondary-border"
          >
            <span className="mr-1.5 text-accent-muted">
              {i === CORE.length - 1 ? "└──" : "├──"}
            </span>
            {item.name.toLowerCase()}
          </li>
        ))}
      </ul>
    </Container>
  );
}
