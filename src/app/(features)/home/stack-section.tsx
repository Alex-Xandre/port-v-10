import Link from "next/link";
import { Container } from "@/components/container";
import { StackTile } from "../stacks/stack-card";
import { STACK_DATA } from "../stacks/stacks-data";
import Title from "@/components/title";

const CORE = STACK_DATA.filter((s) => s.group === "core").slice(0, 6);

export default function HomeStackPreview() {
  return (
    <Container className="h-auto flex-col items-start pb-20">
      <div className="mb-8 flex w-full items-baseline justify-between">
        <Title title="Stack" />
        <Link
          href="/stacks"
          className="text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          All stack →
        </Link>
      </div>
      <div className="grid w-full grid-cols-3 gap-3 sm:grid-cols-6">
        {CORE.map((item) => (
          <StackTile key={item.name} item={item} showNote={false} />
        ))}
      </div>
    </Container>
  );
}
