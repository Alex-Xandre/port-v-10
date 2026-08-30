export default function Highlights({ isHome }: { isHome?: boolean }) {
  const stats = [
    { k: "5+", v: "years coding" },
    { k: "10+", v: "countries" },
    { k: "30+", v: "projects shipped" },
    ...(isHome
      ? [
          { k: "850+", v: "commits this year" },
          { k: "<1 day", v: "reply time" },
        ]
      : []),
  ];

  return (
    <dl
      className={`grid w-full gap-3 ${
        isHome
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          : "max-w-md grid-cols-3"
      }`}
    >
      {stats.map(({ k, v }, i) => (
        <div
          key={v}
          className={`border border-border bg-secondary-background px-4 py-5 text-center ${
            isHome && i === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""
          }`}
        >
          <dt className="text-2xl font-medium tabular-nums text-accent">
            {k}
          </dt>
          <dd className="mt-1 text-xs leading-tight text-text-secondary">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}