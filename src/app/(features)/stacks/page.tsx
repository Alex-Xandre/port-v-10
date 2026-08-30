import { Container } from "@/components/container";
import { STACK_DATA } from "./stacks-data";

const itemsOf = (group: string) => STACK_DATA.filter((s) => s.group === group);

function TreeGroup({ group, dim = false }: { group: string; dim?: boolean }) {
  const items = itemsOf(group);
  if (items.length === 0) return null;
  const pad = Math.max(...items.map((i) => i.name.length)) + 2;

  return (
    <div>
      <p>
        <span className="font-medium text-accent">{group}/</span>
      </p>
      {items.map((item, ii) => {
        const lastItem = ii === items.length - 1;
        const name = item.name.toLowerCase();
        return (
          <p key={item.name} className="flex min-w-0">
            <span className="flex-none whitespace-pre text-accent-muted">
              {lastItem ? "└── " : "├── "}
            </span>
            <span
              className={[
                "flex-none",
                dim ? "text-text-secondary" : "text-text-primary",
              ].join(" ")}
            >
              <span className="hidden whitespace-pre sm:inline">
                {item.note ? name.padEnd(pad) : name}
              </span>
              <span className="sm:hidden">{name}</span>
            </span>
            {item.note && (
              <span className="min-w-0 truncate pl-2 text-text-secondary sm:pl-0">
                <span className="text-accent-muted"># </span>
                {item.note}
              </span>
            )}
          </p>
        );
      })}
    </div>
  );
}

export default function StackPage() {
  return (
    <Container className="flex-col pt-12 md:pt-16" animate={false}>
      <header className="mb-8">
        <p className="text-sm text-accent-muted">
          xandre@sh:~ ${" "}
          <span className="text-accent">npm ls xandre --depth=1</span>
        </p>
        <p className="mt-1.5 text-xs text-text-secondary">
          The tools behind 30+ shipped projects and four years of production
          work
        </p>
      </header>

      <p className="mb-5 text-sm font-semibold text-text-primary">
        xandre<span className="text-accent-muted">@2026</span>
      </p>

      <div className="grid w-full gap-x-12 gap-y-8 text-sm leading-7 md:grid-cols-[1.3fr_1fr]">
        <TreeGroup group="core" />
        <div className="flex flex-col gap-8">
          <TreeGroup group="comfortable" dim />
          <TreeGroup group="tools" dim />
        </div>
      </div>

      <p className="mt-12 max-w-xl font-sans text-sm leading-relaxed text-text-secondary">
        Node and Mongo on almost everything, Postgres when it matters, and
        TypeScript on all of it. If you need one engineer who can take a rough
        idea and ship the whole thing, this is the toolbox it ships with.
      </p>
    </Container>
  );
}