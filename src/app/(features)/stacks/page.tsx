import { Container } from "@/components/container";
import { STACK_DATA } from "./stacks-data";
import { StackTile } from "./stack-card";
import Title from "@/components/title";

export default function StackPage() {
  const core = STACK_DATA.filter((s) => s.group === "core");
  const comfortable = STACK_DATA.filter((s) => s.group === "comfortable");
  const tools = STACK_DATA.filter((s) => s.group === "tools");

  return (
    <Container className="h-auto flex-col items-start md:py-20  pb-10 md:pb-20">
      <header className="mb-10">
        <Title title="Stack" />

        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          The tools behind nine shipped projects and four years of production
          work.
        </p>
      </header>

      <p className="mb-4 text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
        Core
      </p>
      <div className="mb-12 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {core.map((item) => (
          <StackTile key={item.name} item={item} />
        ))}
      </div>

      {comfortable.length > 0 && (
        <>
          <p className="mb-4 text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Comfortable
          </p>
          <div className="mb-12 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {comfortable.map((item) => (
              <StackTile key={item.name} item={item} dim />
            ))}
          </div>
        </>
      )}

      <p className="mb-4 text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
        Tools
      </p>
      <div className="grid w-full grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {tools.map((item) => (
          <StackTile key={item.name} item={item} size="sm" dim />
        ))}
      </div>
    </Container>
  );
}
